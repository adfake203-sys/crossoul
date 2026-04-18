import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HapticManager } from '../../lib/HapticManager';

interface Props {
  onJoin: () => void;
  brandText?: string;
}

export default function StickyHeader({ onJoin, brandText = "CROSSOUL" }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '72px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        padding: '0 2rem',
        background: scrolled ? 'var(--glass-bg)' : 'transparent',
        backdropFilter: scrolled ? 'var(--glass-blur)' : 'none',
        borderBottom: scrolled ? '1px solid var(--glass-border)' : 'none',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-bottom 0.4s ease',
      }}
    >
      <div style={{ 
        maxWidth: '1200px', 
        width: '100%', 
        margin: '0 auto', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        {/* Brand Logo / Text */}
        <motion.div 
          role="button"
          style={{ 
            fontSize: '1.2rem', 
            fontWeight: 900, 
            letterSpacing: '5px', 
            color: '#fff',
            cursor: 'pointer'
          }}
          whileHover={{ scale: 1.05 }}
          onClick={() => window.scrollTo(0, 0)}
        >
          {brandText}
        </motion.div>

        {/* Global CTA */}
        <AnimatePresence>
          {scrolled && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              className="glass-button-premium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                HapticManager.notification();
                onJoin();
              }}
              style={{
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '0.6rem 1.8rem',
                borderRadius: '100px',
                fontSize: '0.8rem',
                fontWeight: 800,
                letterSpacing: '1px'
              }}
            >
              JOIN THE CIRCLE
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
