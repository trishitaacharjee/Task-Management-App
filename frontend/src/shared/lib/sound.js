let audioContext = null;

function getContext() {
  if (typeof window === 'undefined') return null;
  if (!audioContext) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    audioContext = new Ctx();
  }
  return audioContext;
}

export async function playTone({ frequency = 740, duration = 0.22, volume = 0.035, type = 'sine' } = {}) {
  try {
    const ctx = getContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') await ctx.resume();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(Math.max(volume, 0.0001), ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);
    oscillator.onended = () => {
      try { oscillator.disconnect(); gain.disconnect(); } catch {}
    };
  } catch {
    // Sound is decorative; never let it break task functionality.
  }
}

export function playTaskComplete() {
  void playTone({ frequency: 740, duration: 0.16, volume: 0.025 });
  window.setTimeout(() => void playTone({ frequency: 988, duration: 0.2, volume: 0.022 }), 90);
}

export function playTaskAdded() {
  return playTone({ frequency: 620, duration: 0.12, volume: 0.018 });
}

export function playVoiceStart() {
  return playTone({ frequency: 520, duration: 0.1, volume: 0.016 });
}
