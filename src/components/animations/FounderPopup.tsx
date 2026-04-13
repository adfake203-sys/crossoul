import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Linkedin } from 'lucide-react';

interface FounderPopupProps {
  isOpen: boolean;
  onClose: () => void;
  founder: {
    name: string;
    role: string;
    photoSrc: string;
    bioPoints: string[];
    type: string;
    linkedIn?: string;
  } | null;
  logoSrc: string;
}

const FounderPopup: React.FC<FounderPopupProps> = ({ isOpen, onClose, founder, logoSrc }) => {
  if (!founder) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          style={{ 
            position: 'fixed', 
            inset: 0, 
            zIndex: 1000, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '1.5rem'
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ 
              position: 'absolute', 
              inset: 0, 
              backgroundColor: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(12px)'
            }}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{ 
              position: 'relative', 
              width: '100%', 
              maxWidth: '360px', 
              background: 'linear-gradient(160deg, rgba(24, 24, 27, 0.95) 0%, rgba(9, 9, 11, 0.98) 100%)', 
              backdropFilter: 'blur(24px)',
              borderRadius: '28px', 
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.9)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff'
            }}
          >
            {/* Minimal Top Glow */}
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: '60px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)', filter: 'blur(15px)', pointerEvents: 'none' }} />

            {/* Close Button */}
            <button 
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'rgba(255,255,255,0.05)',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                color: '#fff',
                transition: 'background 0.2s'
              }}
            >
              <X size={16} />
            </button>

            <div style={{ padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              {/* Scaled-down Logo */}
              <img 
                src={logoSrc} 
                alt="CROSSOUL" 
                style={{ width: '36px', marginBottom: '1.5rem', filter: 'brightness(0) invert(1)', opacity: 0.6 }} 
              />

              {/* Compact Passport Style Photo */}
              <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                <div style={{ position: 'absolute', inset: '-10px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%)', filter: 'blur(8px)', zIndex: 0 }} />
                <div style={{
                  position: 'relative',
                  width: '130px',
                  height: '155px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  zIndex: 1
                }}>
                  <img 
                    src={founder.photoSrc} 
                    alt={founder.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${founder.name}&background=6366f1&color=fff`;
                    }}
                  />
                </div>
              </div>

              {/* Identity */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ 
                  margin: 0, 
                  fontSize: '1.5rem', 
                  fontWeight: 900, 
                  color: '#fff',
                  letterSpacing: '-0.5px'
                }}>
                  {founder.name}
                </h2>
                <div style={{ 
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
                  color: '#fff',
                  padding: '0.35rem 0.8rem',
                  borderRadius: '10px',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  marginTop: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)'
                }}>
                  {founder.role}
                </div>
              </div>

              {/* Bio Points with Gradient Box */}
              <div style={{ 
                width: '100%', 
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)', 
                padding: '1.25rem', 
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                marginBottom: '1.5rem'
              }}>
                {founder.bioPoints.slice(0, 2).map((point, i) => (
                  <div key={i} style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: '0.75rem',
                    marginBottom: i === 0 ? '0.75rem' : 0
                  }}>
                    <div style={{ 
                      width: '5px', 
                      height: '5px', 
                      background: '#6366f1', 
                      borderRadius: '50%',
                      marginTop: '0.45rem',
                      flexShrink: 0,
                      boxShadow: '0 0 6px #6366f1'
                    }} />
                    <p style={{ 
                      margin: 0, 
                      fontSize: '0.85rem', 
                      color: 'rgba(255,255,255,0.7)', 
                      lineHeight: 1.4,
                      fontWeight: 500
                    }}>
                      {point}
                    </p>
                  </div>
                ))}
              </div>

              {/* Compact Career Action */}
              {founder.linkedIn && (
                <div style={{ width: '100%', marginBottom: '1rem' }}>
                  <a 
                    href={founder.linkedIn} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.6rem',
                      background: 'rgba(255,255,255,0.03)',
                      color: '#fff',
                      padding: '0.8rem',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      border: '1px solid rgba(255,255,255,0.08)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Linkedin size={18} color="#0077b5" /> Career Profile
                  </a>
                </div>
              )}
              
              {/* Minimal Branding Footer */}
              <p style={{ 
                fontSize: '0.6rem', 
                color: 'rgba(255,255,255,0.25)', 
                letterSpacing: '1.5px', 
                textTransform: 'uppercase',
                fontWeight: 700
              }}>
                Official Crossoul Dossier
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FounderPopup;
