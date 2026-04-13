let resonanceInterval: any = null;

export const HapticManager = {
  /**
   * Triggers an ultra-sharp 'pop' (8ms)
   * Feels like a high-end physical click
   */
  impact: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(8);
    }
  },

  /**
   * Triggers a slightly more present 'selection' tick (12ms)
   */
  selection: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(12);
    }
  },

  /**
   * Triggers a crisp 'light' feedback (20ms)
   */
  light: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(20);
    }
  },

  /**
   * Triggers a smooth, present 'success' wave
   */
  success: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([30, 40, 60]);
    }
  },

  /**
   * High-end double-tap notification
   */
  notification: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([10, 30, 10]);
    }
  },

  /**
   * RESONANCE ENGINE:
   * Fires ultra-short pulses (5ms) at a specific frequency.
   * intensity: 0 to 1
   */
  startResonance: (intensity: number) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      if (resonanceInterval) clearInterval(resonanceInterval);
      
      // Map intensity to frequency (100ms down to 30ms)
      const delay = Math.max(30, 100 - (intensity * 70));
      
      resonanceInterval = setInterval(() => {
        navigator.vibrate(5); // Ultra-short resonance tick
      }, delay);
    }
  },

  stopResonance: () => {
    if (resonanceInterval) {
      clearInterval(resonanceInterval);
      resonanceInterval = null;
    }
  },

  /**
   * LEGACY: Custom pattern support
   */
  pattern: (p: number[]) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(p);
    }
  }
};
