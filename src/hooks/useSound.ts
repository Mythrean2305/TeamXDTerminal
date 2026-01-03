
import { useCallback, useRef } from 'react';

type SoundType = 'click' | 'hover' | 'success' | 'error' | 'typing';

export const useSound = () => {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initCtx = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const play = useCallback((type: SoundType) => {
    try {
      const ctx = initCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      switch (type) {
        case 'hover':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(1200, now);
          gain.gain.setValueAtTime(0.015, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
          osc.start(now);
          osc.stop(now + 0.05);
          break;
        case 'click':
          osc.type = 'square';
          osc.frequency.setValueAtTime(150, now);
          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
          osc.start(now);
          osc.stop(now + 0.1);
          break;
        case 'typing':
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(400 + Math.random() * 100, now);
          gain.gain.setValueAtTime(0.01, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
          osc.start(now);
          osc.stop(now + 0.02);
          break;
        case 'success':
          osc.type = 'sine';
          [440, 554.37, 659.25, 880].forEach((freq, i) => {
            const time = now + i * 0.08;
            osc.frequency.setValueAtTime(freq, time);
          });
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
          osc.start(now);
          osc.stop(now + 0.5);
          break;
        case 'error':
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(110, now);
          osc.frequency.linearRampToValueAtTime(55, now + 0.3);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
          osc.start(now);
          osc.stop(now + 0.3);
          break;
      }
    } catch (e) {
      console.warn('Audio feedback failed:', e);
    }
  }, []);

  return { play };
};
