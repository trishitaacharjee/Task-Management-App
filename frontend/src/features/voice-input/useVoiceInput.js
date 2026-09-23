import { useRef, useState } from 'react';
import { pipeline, env } from '@huggingface/transformers';
import { playVoiceStart } from '../../shared/lib/sound';

// Toki voice is intentionally local: no API key and no browser-specific
// SpeechRecognition API. Audio is recorded with MediaRecorder and transcribed
// by Whisper running locally in the browser.
env.allowLocalModels = false;
env.useBrowserCache = true;

let transcriberPromise = null;

function getTranscriber(setProgress) {
  if (!transcriberPromise) {
    transcriberPromise = pipeline('automatic-speech-recognition', 'onnx-community/whisper-tiny.en', {
      device: 'wasm',
      dtype: 'q8',
      progress_callback: (info) => {
        if (info?.status === 'progress' && Number.isFinite(info.progress)) {
          setProgress(Math.round(info.progress));
        }
      },
    });
  }
  return transcriberPromise;
}

export function useVoiceInput({ onResult }) {
  const [listening, setListening] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [supported, setSupported] = useState(() => typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia && typeof MediaRecorder !== 'undefined');
  const [error, setError] = useState(null);
  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);

  async function start() {
    if (listening || transcribing) return;
    setError(null);
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setSupported(false);
      setError('This browser cannot record microphone audio.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
      streamRef.current = stream;
      chunksRef.current = [];
      const mime = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/ogg;codecs=opus',
        'audio/mp4',
      ].find((type) => MediaRecorder.isTypeSupported(type));
      const recorder = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      recorderRef.current = recorder;
      recorder.ondataavailable = (event) => { if (event.data.size) chunksRef.current.push(event.data); };
      recorder.onerror = () => setError('Recording failed. Please try again.');
      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        recorderRef.current = null;
        setListening(false);
        if (!blob.size) {
          setError("I didn't receive any audio. Please try again.");
          return;
        }
        setTranscribing(true);
        setProgress(0);
        try {
          const transcriber = await getTranscriber(setProgress);
          // Decode the recorded Blob with the browser's native Web Audio API.
          // This avoids relying on a load_audio export that is not available in
          // every Transformers.js v3 build. Whisper expects mono float samples
          // at 16 kHz, so we resample the decoded audio below.
          const arrayBuffer = await blob.arrayBuffer();
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (!AudioContextClass) throw new Error('This browser does not support audio decoding.');
          const audioContext = new AudioContextClass();
          try {
            const decoded = await audioContext.decodeAudioData(arrayBuffer.slice(0));
            const channelCount = decoded.numberOfChannels;
            const sourceLength = decoded.length;
            const sourceRate = decoded.sampleRate;
            const targetRate = 16000;
            const targetLength = Math.max(1, Math.round(decoded.duration * targetRate));
            const audio = new Float32Array(targetLength);

            // Convert to mono by averaging channels.
            const channels = Array.from({ length: channelCount }, (_, i) => decoded.getChannelData(i));
            for (let i = 0; i < targetLength; i += 1) {
              const sourcePosition = i * sourceRate / targetRate;
              const left = Math.floor(sourcePosition);
              const right = Math.min(left + 1, sourceLength - 1);
              const fraction = sourcePosition - left;
              let sample = 0;
              for (const channel of channels) {
                const a = channel[left] ?? 0;
                const b = channel[right] ?? a;
                sample += a + (b - a) * fraction;
              }
              audio[i] = sample / channelCount;
            }

            const result = await transcriber(audio, {
              return_timestamps: false,
              chunk_length_s: 20,
              stride_length_s: 4,
            });
            const text = typeof result?.text === 'string' ? result.text.trim() : '';
            if (!text) throw new Error("I couldn't understand that. Please try again.");
            onResult(text);
          } finally {
            await audioContext.close().catch(() => {});
          }
          return;
        } catch (err) {
          setError(err?.message || 'Local speech transcription failed. Please try again.');
        } finally {
          setTranscribing(false);
        }
      };
      recorder.start();
      setListening(true);
      void playVoiceStart();
    } catch (err) {
      setListening(false);
      const message = err?.name === 'NotAllowedError'
        ? 'Microphone access is blocked. Allow Microphone for localhost in your browser settings and try again.'
        : err?.name === 'NotFoundError'
          ? 'No microphone was found. Connect a microphone and try again.'
          : 'Could not access the microphone. Please check browser permissions.';
      setError(message);
    }
  }

  function stop() {
    if (recorderRef.current?.state === 'recording') {
      recorderRef.current.stop();
      return;
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    recorderRef.current = null;
    setListening(false);
  }

  return { listening, transcribing, progress, supported, error, start, stop };
}
