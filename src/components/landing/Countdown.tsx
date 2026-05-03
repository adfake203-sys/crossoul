import { useState, useEffect } from 'react';

import ScrollReveal from '../animations/ScrollReveal';
import MagneticButton from '../layout/MagneticButton';
import { ordinal, useResonanceCount } from '../../lib/useResonanceCount';

const TGT = Date.now() + 1e3 * 60 * 60 * 24 * 180; // 180 days from now (or a fixed date)

interface CountdownProps {
  onJoinWaitlist: () => void;
}

export default function Countdown({ onJoinWaitlist }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ d: '00', h: '00', m: '00', s: '00' });
  const [animating, setAnimating] = useState({ d: false, h: false, m: false, s: false });
  const memberCount = useResonanceCount();

  useEffect(() => {
    const updateCD = () => {
      const diff = Math.max(0, TGT - Date.now());
      const p = (n: number) => String(n).padStart(2, '0');
      
      const newD = p(Math.floor(diff / 864e5));
      const newH = p(Math.floor(diff / 36e5) % 24);
      const newM = p(Math.floor(diff / 6e4) % 60);
      const newS = p(Math.floor(diff / 1e3) % 60);

      setTimeLeft(prev => {
        const nextAnim = { ...animating };
        let changed = false;

        if (prev.d !== newD) { nextAnim.d = true; changed = true; }
        if (prev.h !== newH) { nextAnim.h = true; changed = true; }
        if (prev.m !== newM) { nextAnim.m = true; changed = true; }
        if (prev.s !== newS) { nextAnim.s = true; changed = true; }

        if (changed) {
          setAnimating(nextAnim);
          setTimeout(() => {
            setTimeLeft({ d: newD, h: newH, m: newM, s: newS });
            setAnimating({ d: false, h: false, m: false, s: false });
          }, 140);
          return prev; // Return prev, effect happens in timeout
        }
        
        return { d: newD, h: newH, m: newM, s: newS };
      });
    };

    updateCD();
    const interval = setInterval(updateCD, 1000);
    return () => clearInterval(interval);
  }, []);

  const getStyle = (unit: keyof typeof animating) => ({
    transform: animating[unit] ? 'translateY(-6px)' : 'none',
    opacity: animating[unit] ? 0 : 1,
    transition: 'all 0.14s ease'
  });

  return (
    <section id="countdown">
      <div className="cd-glow"></div>
      <ScrollReveal>
        <span className="kicker a">Founder Admittance</span>
        <div className="sec-title">THE FINAL<br/>COUNTDOWN.</div>
      </ScrollReveal>
      <div className="cd-digits">
        <div className="cd-unit"><div className="cd-val" style={getStyle('d')}>{timeLeft.d}</div><div className="cd-lbl">Days</div></div>
        <div className="cd-col">:</div>
        <div className="cd-unit"><div className="cd-val" style={getStyle('h')}>{timeLeft.h}</div><div className="cd-lbl">Hours</div></div>
        <div className="cd-col">:</div>
        <div className="cd-unit"><div className="cd-val" style={getStyle('m')}>{timeLeft.m}</div><div className="cd-lbl">Mins</div></div>
        <div className="cd-col">:</div>
        <div className="cd-unit"><div className="cd-val" style={getStyle('s')}>{timeLeft.s}</div><div className="cd-lbl">Secs</div></div>
      </div>
      <div style={{ marginTop: '3rem' }}>
        <ScrollReveal className="resonance-fomo">
          <span>{memberCount} members joined the resonance.</span>
          <strong>Be the {ordinal(memberCount + 1)}.</strong>
        </ScrollReveal>
        <MagneticButton className="btn btn-w" onClick={onJoinWaitlist} style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
          Secure Your Spot 
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </MagneticButton>
      </div>
    </section>
  );
}
