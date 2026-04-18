import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HapticManager } from '../../lib/HapticManager';
import { db } from '../../lib/firebase';
import { collection, getCountFromServer } from 'firebase/firestore';

interface Props {
  onJoin: () => void;
}

export default function StickyHeader({ onJoin }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  const [memberCount, setMemberCount] = useState(121);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);

    const handleGameEvent = ((e: CustomEvent) => {
        setIsGameActive(!!e.detail);
    }) as EventListener;
    window.addEventListener('GAME_STATUS', handleGameEvent);

    const handleWaitlistJoin = () => {
        setMemberCount(prev => prev + 1);
    };
    window.addEventListener('WAITLIST_JOINED', handleWaitlistJoin);

    const fetchCount = async () => {
      try {
        const coll = collection(db, 'waitlist');
        const snapshot = await getCountFromServer(coll);
        setMemberCount(120 + snapshot.data().count + 1);
      } catch (err) {
        console.error("Failed to fetch waitlist count:", err);
      }
    };
    fetchCount();

    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('GAME_STATUS', handleGameEvent);
        window.removeEventListener('WAITLIST_JOINED', handleWaitlistJoin);
    };
  }, []);

  return (
    <AnimatePresence>
      {scrolled && !isGameActive && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 24, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            margin: '0 auto',
            width: 'max-content',
            maxWidth: 'calc(100% - 2rem)',
            height: '60px',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            padding: '0 0.5rem 0 1.5rem',
            background: 'rgba(24, 24, 27, 0.6)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '100px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <div style={{ color: '#e4e4e7', fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.2px' }}>
              <span className="hide-on-mobile">Join </span>
              <strong style={{ color: '#fff', fontWeight: 800 }}>{memberCount - 1}</strong> members<span className="hide-on-mobile"> registered</span>
            </div>

            <motion.button
              className="glass-button-premium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                HapticManager.notification();
                onJoin();
              }}
              style={{
                color: '#000',
                background: '#ffffff',
                border: 'none',
                padding: '0.65rem 1.4rem',
                borderRadius: '100px',
                fontSize: '0.8rem',
                fontWeight: 900,
                letterSpacing: '0.5px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(255,255,255,0.2)'
              }}
            >
              WAITLIST
            </motion.button>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
