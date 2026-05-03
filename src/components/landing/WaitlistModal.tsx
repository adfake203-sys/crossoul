import { useEffect, useState } from 'react';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { HapticManager } from '../../lib/HapticManager';
import { ordinal, useResonanceCount } from '../../lib/useResonanceCount';
import MagneticButton from '../layout/MagneticButton';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: Props) {
  const memberCount = useResonanceCount();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [region, setRegion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: 'error' | 'success' } | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName || !region) {
      setMsg({ text: 'Please fill in all fields.', type: 'error' });
      return;
    }

    setIsLoading(true);
    setMsg(null);

    try {
      await addDoc(collection(db, 'waitlist'), {
        email: email.toLowerCase().trim(),
        fullName: fullName.trim(),
        region: region.trim(),
        source: 'landing_v2',
        createdAt: serverTimestamp(),
      });

      setMsg({
        text: `You're in. ${memberCount + 1} members logged in. The next one becomes the ${ordinal(memberCount + 2)}.`,
        type: 'success',
      });
      window.dispatchEvent(new CustomEvent('WAITLIST_JOINED'));
      HapticManager.notification();

      setTimeout(() => {
        setMsg(null);
        setEmail('');
        setFullName('');
        setRegion('');
        onClose();
      }, 2600);
    } catch (err) {
      console.error('Error adding document: ', err);
      setMsg({ text: 'Something went wrong. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 99980, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,.8)', backdropFilter: 'blur(12px)', padding: '1.5rem' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="wl-box">
        <button className="wl-close" onClick={onClose}>x</button>
        <div style={{ marginBottom: '1.2rem', color: '#fff', display: 'flex', justifyContent: 'center' }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 16.5c-1.5 1.5-1.5 4 0 4s4-1.5 4-4M12 3c0 0-4 2-5 8l5 5c6-1 8-5 8-5L12 3z"/>
            <circle cx="15" cy="9" r="1.5"/>
            <path d="M3 21l4-4"/>
          </svg>
        </div>
        <div className="wl-title">Join the Waitlist</div>
        <p className="wl-sub">
          {memberCount} members joined the resonance. Be the {ordinal(memberCount + 1)}.
          <br />No spam, ever.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            className="wl-in"
            type="text"
            placeholder="Your name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={isLoading}
            required
          />
          <input
            className="wl-in"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
          <input
            className="wl-in"
            type="text"
            placeholder="Your city / region (e.g. Hyderabad, India)"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            disabled={isLoading}
            required
          />

          <MagneticButton
            type="submit"
            className="wl-sub-btn"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem', marginTop: '.5rem', opacity: isLoading ? 0.7 : 1 }}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : `Become the ${ordinal(memberCount + 1)}`}
            {!isLoading && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            )}
          </MagneticButton>
        </form>

        {msg && (
          <p className="wl-msg" style={{ color: msg.type === 'error' ? '#f87171' : '#a3e635' }}>
            {msg.text}
          </p>
        )}
      </div>
    </div>
  );
}
