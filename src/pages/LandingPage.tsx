import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CustomCursor from '../components/layout/CustomCursor';
import AmbientLayers from '../components/layout/AmbientLayers';
import FloatingThreads from '../components/animations/FloatingThreads';
import Nav from '../components/layout/Nav';
import TogglePill from '../components/layout/TogglePill';
import SideA from '../components/landing/SideA';
import SideB from '../components/landing/SideB';
import SideBProgress from '../components/landing/SideBProgress';
import Confetti from '../components/animations/Confetti';
import PopupModal from '../components/landing/PopupModal';

interface LandingPageProps {
  onShowAuth: () => void;
}

export default function LandingPage({ onShowAuth }: LandingPageProps) {
  const [side, setSide] = useState<'a' | 'b'>('a');
  const [busy, setBusy] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'privacy' | 'terms' | 'contact' }>({
    isOpen: false,
    type: 'privacy',
  });

  useEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>('.fiu, .j-item'));
    if (!revealTargets.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealTargets.forEach((el) => el.classList.add('on'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => entry.target.classList.add('on'));
          } else {
            entry.target.classList.remove('on');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    );

    revealTargets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [side]);

  const switchSide = (to: 'a' | 'b') => {
    if (busy || to === side) return;
    setBusy(true);

    const overlay = document.getElementById('portal');
    if (overlay) {
      overlay.dataset.to = to;
      const label = overlay.querySelector<HTMLElement>('#portal-label');
      if (label) label.textContent = to === 'b' ? 'Thread of Thoughts' : 'Digital Ecosystem';
      overlay.classList.remove('go');
      void overlay.offsetWidth;
      overlay.classList.add('go');
    }

    setTimeout(() => {
      setSide(to);
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 640);

    setTimeout(() => {
      if (overlay) overlay.classList.remove('go');
      setBusy(false);
    }, 1550);
  };

  return (
    <>
      <CustomCursor />
      <AmbientLayers />
      <FloatingThreads show={side === 'b'} />
      <Confetti />

      <Nav onJoinWaitlist={onShowAuth} />
      <SideBProgress isVisible={side === 'b'} />
      <TogglePill currentSide={side} onSwitch={switchSide} />

      <SideA
        isVisible={side === 'a'}
        onJoinWaitlist={onShowAuth}
        onSwitchSide={() => switchSide('b')}
        onError={setErrMsg}
      />
      <SideB
        isVisible={side === 'b'}
        onJoinWaitlist={onShowAuth}
      />

      <footer>
        <div className="f-logo">CROSSOUL</div>
        <div className="f-legal">
          <button onClick={() => setLegalModal({ isOpen: true, type: 'privacy' })}>Privacy</button>
          <button onClick={() => setLegalModal({ isOpen: true, type: 'terms' })}>Terms & Conditions</button>
          <button onClick={() => setLegalModal({ isOpen: true, type: 'contact' })}>Contact</button>
        </div>
        <p className="f-copy f-clear">Crossoul is a platform where ideas turn into real-world communities.</p>
        <p className="f-copy">
          Built by{' '}
          <Link to="/kishan-kasula">Kishan Kasula</Link>
          {' '}and{' '}
          <Link to="/aditya-phanidar-vungarala">Aditya Phanidar Vungarala</Link>
        </p>
        <p className="f-copy">&copy; 2026 Crossoul. All rights reserved. Collective Thinking. Real Execution.</p>
      </footer>

      <PopupModal
        isOpen={legalModal.isOpen}
        type={legalModal.type}
        onClose={() => setLegalModal((prev) => ({ ...prev, isOpen: false }))}
      />

      {errMsg && (
        <div
          id="err-modal"
          style={{ position: 'fixed', inset: 0, zIndex: 99985, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,.85)', backdropFilter: 'blur(8px)', padding: '1.5rem' }}
          onClick={(e) => { if (e.target === e.currentTarget) setErrMsg(null); }}
        >
          <div style={{ background: 'linear-gradient(135deg,#1e1e2e,#09090b)', padding: '2.5rem', borderRadius: '22px', border: '1px solid rgba(255,255,255,.1)', textAlign: 'center', maxWidth: '380px', width: '100%', boxShadow: '0 25px 50px rgba(0,0,0,.6)' }}>
            <div style={{ marginBottom: '1rem', color: '#f87171' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 15s1.5-2 4-2 4 2 4 2"/><line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3"/><line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3"/></svg>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, fontFamily: 'var(--fh)', marginBottom: '.8rem' }}>OOPS!</div>
            <p style={{ color: '#a1a1aa', fontSize: '.98rem', lineHeight: 1.5, marginBottom: '2rem' }}>{errMsg}</p>
            <button className="btn btn-o" onClick={() => setErrMsg(null)} style={{ padding: '.7rem 2rem' }}>LET'S DEBUG THIS</button>
          </div>
        </div>
      )}
    </>
  );
}
