import { useState, useEffect } from 'react';

import MagneticButton from './MagneticButton';

interface NavProps {
  onJoinWaitlist: () => void;
}

export default function Nav({ onJoinWaitlist }: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 55);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav id="nav" className={scrolled ? 'sc' : ''}>
      <div className="logo">CROSSOUL</div>
      <MagneticButton className="nav-btn" onClick={onJoinWaitlist}>
        Join Waitlist
      </MagneticButton>
    </nav>
  );
}
