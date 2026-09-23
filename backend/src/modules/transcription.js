// Toki no longer sends audio to a paid cloud transcription API.
// Speech-to-text runs locally in the browser using Transformers.js/Whisper.
// This module is kept only as a compatibility stub for older imports.
export async function transcribeAudio() {
  const error = new Error('Cloud transcription is disabled. Toki uses local browser transcription.');
  error.statusCode = 410;
  throw error;
}
