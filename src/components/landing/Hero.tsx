import { useState, useEffect, useRef } from 'react';

import ScrollReveal from '../animations/ScrollReveal';
import MagneticButton from '../layout/MagneticButton';

const ROTS = ['students.', 'business owners.', 'entrepreneurs.', 'employees.', 'people who want FUN.'];

interface HeroProps {
  onJoinWaitlist: () => void;
  onSwitchSide: () => void;
}

export default function Hero({ onJoinWaitlist, onSwitchSide }: HeroProps) {
  const [rotIndex, setRotIndex] = useState(0);
  const [rotFade, setRotFade] = useState(false);
  const wmRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotFade(true);
      setTimeout(() => {
        setRotIndex((prev) => (prev + 1) % ROTS.length);
        setRotFade(false);
      }, 350);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const wm = wmRef.current;
      if (!wm) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 5;
      wm.style.transform = `translate(${x}px, ${y}px)`;
    };
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero">
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '.25em', flexWrap: 'wrap', justifyContent: 'center' }}>
        <span className="hero-wm wm" id="hwm" ref={wmRef}>CROSSOUL</span>
        <span className="hero-for">for</span>
      </div>
      <div 
        className="hero-rot" 
        id="hrot"
        style={{
          opacity: rotFade ? 0 : 1,
          transform: rotFade ? 'translateY(8px)' : 'none'
        }}
      >
        {ROTS[rotIndex]}
      </div>
      <p className="hero-sub">Build your ecosystem. Meet your tribe. Go offline.</p>
      <div className="cta-row">
        <MagneticButton className="btn btn-w" onClick={onJoinWaitlist} style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
          Join Waitlist 
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </MagneticButton>
        <MagneticButton className="btn btn-o" onClick={onSwitchSide}>
          Thread of Thoughts
        </MagneticButton>
      </div>
      <div className="scroll-hint"><div className="sh-line"></div><span>scroll</span></div>
    </section>
  );
}
