/**
 * HapticManager Utility
 * Handles cross-browser vibration feedback for mobile devices.
 */

let pulseInterval: any = null;

export const HapticManager = {
  /**
   * Triggers an ultra-short 'impact' vibration (15ms)
   * Good for dragging or subtle movement
   */
  impact: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(15);
    }
  },

  /**
   * Triggers a 'selection' click vibration (30ms)
   * Perfect for button taps and UI toggles
   */
  selection: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(30);
    }
  },

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
   * Triggers a 'notification' double pulse 
   * Good for completions and match success
   */
  notification: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([40, 50, 40]);
    }
  },

  /**
   * Starts a repeated pulsing vibration (for holding)
   */
  startPulse: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      if (pulseInterval) return;
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
   * Triggers a complex pattern
   */
  pattern: (p: number[]) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(p);
    }
  }
};
