import MagneticButton from './MagneticButton';

interface TogglePillProps {
  currentSide: 'a' | 'b';
  onSwitch: (side: 'a' | 'b') => void;
}

export default function TogglePill({ currentSide, onSwitch }: TogglePillProps) {
  return (
    <div id="pill">
      <MagneticButton 
        className={`pb ${currentSide === 'a' ? 'digi' : 'dim'}`} 
        onClick={() => onSwitch('a')}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
        DIGITAL
      </MagneticButton>
      <MagneticButton 
        className={`pb ${currentSide === 'b' ? 'offli' : 'dim'}`} 
        onClick={() => onSwitch('b')}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        THREAD OF THOUGHTS
      </MagneticButton>
    </div>
  );
}
