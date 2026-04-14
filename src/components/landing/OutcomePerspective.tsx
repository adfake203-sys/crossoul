import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { HapticManager } from '../../lib/HapticManager';

interface Outcome {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
}

interface Props {
  outcomes: Outcome[];
}

export default function OutcomePerspective({ outcomes }: Props) {
  const [isHolding, setIsHolding] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedOutcome, setSelectedOutcome] = useState<Outcome | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef<number | null>(null);
  const lastTickIndex = useRef<number | null>(null);

  useEffect(() => {
    if (selectedOutcome) {
      document.body.classList.add('popup-active');
    } else {
      document.body.classList.remove('popup-active');
    }
  }, [selectedOutcome]);

  // Radial selection logic
  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Blind zone: don't select if too close to center (GTA style)
    if (distance < 40) {
      activeIndexRef.current = null;
      setActiveIndex(null);
      return;
    }

    // Calculate angle in degrees
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    angle = (angle + 90 + 360) % 360; // Normalize so 0 is Up

    let index: number | null = null;
    if (angle >= 270 && angle < 315) index = 0;
    else if (angle >= 315 && angle <= 360) index = 1;
    else if (angle >= 0 && angle < 45) index = 2;
    else if (angle >= 45 && angle <= 90) index = 3;

    if (index !== activeIndexRef.current) {
      activeIndexRef.current = index;
      setActiveIndex(index);
      if (index !== null && index !== lastTickIndex.current) {
        HapticManager.light();
        lastTickIndex.current = index;
      }
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    if (activeIndexRef.current !== null) {
      HapticManager.success();
      setSelectedOutcome(outcomes[activeIndexRef.current]);
    }
    setIsHolding(false);
    setActiveIndex(null);
    activeIndexRef.current = null;
    lastTickIndex.current = null;
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
  }, [handlePointerMove, outcomes]);

  const handlePointerDown = () => {
    if (selectedOutcome) return;
    HapticManager.impact();
    setIsHolding(true);
    // Wait for the next tick to ensure state has started before move tracking
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  return (
    <div 
      ref={containerRef}
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '500px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        userSelect: 'none',
        touchAction: isHolding ? 'none' : 'pan-y'
      }}
    >
      {/* Cinematic Blur Backdrop */}
      <AnimatePresence>
        {isHolding && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: 'fixed', 
              inset: 0, 
              background: 'rgba(0,0,0,0.4)', 
              backdropFilter: 'blur(15px)', 
              zIndex: 1000,
              pointerEvents: 'none'
            }} 
          />
        )}
      </AnimatePresence>

      {/* Selector Trigger Button */}
      <motion.div
        onPointerDown={handlePointerDown}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: isHolding ? 'var(--accent-side-b)' : 'rgba(245, 158, 11, 0.1)',
          border: '2px solid var(--accent-side-b)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 1010, // Higher than cards
          boxShadow: isHolding ? '0 0 50px rgba(245, 158, 11, 0.4)' : 'none',
          transition: 'background 0.3s ease, box-shadow 0.3s ease'
        }}
      >
        <span style={{ 
          fontSize: '0.8rem', 
          fontWeight: 900, 
          letterSpacing: '2px', 
          color: isHolding ? '#000' : 'var(--accent-side-b)' 
        }}>
          {isHolding ? 'SELECT' : 'HOLD'}
        </span>
        <span style={{ 
          fontSize: '1.4rem', 
          fontWeight: 900, 
          color: isHolding ? '#000' : '#fff' 
        }}>
          OUTCOME
        </span>
      </motion.div>

      {/* The Fan Gear */}
      <AnimatePresence>
        {isHolding && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              position: 'absolute',
              zIndex: 1000, // Lower than button
              pointerEvents: 'none'
            }}
          >
            {outcomes.map((item, i) => {
              // Position cards in a fan arc - Compact Peacock 
              const angle = (i - 1.5) * 40; // Reduced spread for mobile safety
              const isActive = activeIndex === i;
              
              return (
                <motion.div
                  key={item.title}
                  animate={{ 
                    rotateZ: angle,
                    y: isActive ? -220 : -170, // Slightly more compact
                    scale: isActive ? 1.2 : 1,
                    zIndex: isActive ? 10 : 1
                  }}
                  style={{
                    position: 'absolute',
                    width: '160px',
                    height: '240px',
                    background: isActive ? '#fff' : '#18181b',
                    border: `2px solid ${isActive ? 'var(--accent-side-b)' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '24px',
                    left: '-80px',
                    top: '-120px',
                    transformOrigin: '50% 250px', // Wider swing
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: isActive ? `0 20px 60px rgba(245, 158, 11, 0.4)` : 'none',
                    transition: 'background 0.2s ease, border 0.2s ease'
                  }}
                >
                  <div style={{ color: isActive ? 'var(--accent-side-b)' : '#71717a' }}>
                    {item.icon}
                  </div>
                  <h4 style={{ 
                    color: isActive ? '#000' : '#fff', 
                    fontSize: '1rem', 
                    fontWeight: 900,
                    lineHeight: 1.2
                  }}>
                    {item.title}
                  </h4>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detailed Modal */}
      <AnimatePresence>
        {selectedOutcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <motion.div
              layoutId={`outcome-${selectedOutcome.title}`}
              style={{
                width: '100%',
                maxWidth: '480px',
                background: '#18181b',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '35px',
                padding: '3rem',
                position: 'relative',
                textAlign: 'center',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
              }}
            >
              <button 
                onClick={() => {
                  HapticManager.impact();
                  setSelectedOutcome(null);
                }}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: 'none',
                  color: '#fff',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={24} />
              </button>

              <div style={{ 
                color: 'var(--accent-side-b)', 
                marginBottom: '2rem',
                background: 'rgba(245, 158, 11, 0.1)',
                display: 'inline-flex',
                padding: '2rem',
                borderRadius: '32px'
              }}>
                {selectedOutcome.icon}
              </div>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem', color: '#fff' }}>
                {selectedOutcome.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: 1.6 }}>
                {selectedOutcome.desc}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
