/**
 * HapticManager Utility
 * Handles cross-browser vibration feedback for mobile devices.
 */

let pulseInterval: any = null;

export const HapticManager = {
  /**
   * Triggers a light 'pop' vibration (50ms)
   */
  light: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  },

  /**
   * Triggers a strong 'success' vibration (200ms)
   */
  success: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(200);
    }
  },

  /**
   * Starts a repeated pulsing vibration (for holding)
   */
  startPulse: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      if (pulseInterval) return;
      // Pulse every 150ms: 70ms on, 80ms off
      pulseInterval = setInterval(() => {
        navigator.vibrate(70);
      }, 150);
    }
  },

  /**
   * Stops the repeated pulsing
   */
  stopPulse: () => {
    if (pulseInterval) {
      clearInterval(pulseInterval);
      pulseInterval = null;
    }
  },

  /**
   * Triggers a complex pattern (e.g. for triple tap or error)
   */
  pattern: (p: number[]) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(p);
    }
  }
};
