// Web Audio API Sound Effects and Synthesizer

let audioCtx = null;
let bgmInterval = null;

export function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Tone sound generator for cake candles
export function playTone(freq, startTime, duration = 0.4) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    const start = startTime || ctx.currentTime;
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0.2, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + duration);
  } catch (e) {}
}

// Comic "POP!" Sound Effect (synthesized bubble / pop-out sound)
export function playComicPopSound(frequency = 520, volume = 0.35) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Rapid pitch sweep upwards to give the authentic cartoon "pop" feel
    osc.frequency.setValueAtTime(frequency * 0.7, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(frequency * 1.8, ctx.currentTime + 0.04);
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.9, ctx.currentTime + 0.09);

    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {}
}

// Staggered Pop-Out Entrance Sound Sequence (1 per animation bounce)
export function playEntrancePopSequence() {
  const delays = [
    { time: 150, freq: 440 }, // Special For You
    { time: 350, freq: 560 }, // Happy Birthday Maxi!
    { time: 550, freq: 680 }, // I have a surprise for you...
    { time: 750, freq: 820 }, // START button
    { time: 950, freq: 1050 } // PRESS ME!
  ];

  delays.forEach(item => {
    setTimeout(() => {
      playComicPopSound(item.freq, 0.4);
    }, item.time);
  });
}

// "THWIP!" Web-shooting sound effect
export function playThwipSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const bufferSize = ctx.sampleRate * 0.15;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(3800, ctx.currentTime + 0.12);
    filter.Q.setValueAtTime(3, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.7, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.14);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    whiteNoise.start();
    whiteNoise.stop(ctx.currentTime + 0.15);
  } catch (e) {
    console.error(e);
  }
}

// Confetti burst
export function triggerSpiderConfetti(originX = 0.5, originY = 0.5) {
  if (window.confetti) {
    window.confetti({
      particleCount: 75,
      spread: 85,
      origin: { x: originX, y: originY },
      colors: ['#FF3366', '#38BDF8', '#FEF08A', '#FFD1DC', '#0F172A'],
      shapes: ['circle', 'square'],
      scalar: 1.1,
    });
  }
}

// Romantic floral petal confetti burst
export function triggerPetalConfetti() {
  if (window.confetti) {
    window.confetti({
      particleCount: 60,
      spread: 100,
      origin: { x: 0.5, y: 0.6 },
      colors: ['#FF758F', '#FFB3C1', '#FF4D6D', '#FFF0F3', '#FFCCD5', '#FEF08A'],
      shapes: ['circle'],
      scalar: 1.3,
      ticks: 300,
      gravity: 0.6,
      drift: 0.2
    });
  }
}

// Celestial flower blooming chime harp arpeggio
export function playFlowerBloomChimes() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Pentatonic romantic notes (Hz): C5, D5, E5, G5, A5, C6, E6, G6
    const notes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1318.51, 1567.98];
    
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.type = 'triangle'; // Sweet chime/celeste tone
          const now = ctx.currentTime;
          osc.frequency.setValueAtTime(freq, now);
          
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.18, now + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start(now);
          osc.stop(now + 1.25);
        } catch (e) {}
      }, idx * 160);
    });
  } catch (e) {}
}

// Cartoon Pig "OINK OINK!" Sound Effect
export function playPigOinkSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    [0, 0.16].forEach((delay, idx) => {
      const startTime = ctx.currentTime + delay;
      
      const osc = ctx.createOscillator();
      const modOsc = ctx.createOscillator();
      const modGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140 + idx * 30, startTime);
      osc.frequency.exponentialRampToValueAtTime(340 + idx * 40, startTime + 0.05);
      osc.frequency.exponentialRampToValueAtTime(110, startTime + 0.14);

      modOsc.type = 'sine';
      modOsc.frequency.setValueAtTime(38, startTime);
      modGain.gain.setValueAtTime(50, startTime);
      modOsc.connect(modGain);
      modGain.connect(osc.frequency);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(560, startTime);
      filter.Q.setValueAtTime(3.8, startTime);

      gain.gain.setValueAtTime(0.45, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.14);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      modOsc.start(startTime);
      osc.start(startTime);
      modOsc.stop(startTime + 0.15);
      osc.stop(startTime + 0.15);
    });
  } catch (e) {}
}

