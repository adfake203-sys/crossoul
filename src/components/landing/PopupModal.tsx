import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, FileText, Mail, Instagram, Linkedin, ExternalLink } from 'lucide-react';
import { HapticManager } from '../../lib/HapticManager';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms' | 'contact';
}

export default function PopupModal({ isOpen, onClose, type }: Props) {
  const content = {
    privacy: {
      title: 'Privacy Policy',
      icon: <Shield className="text-indigo-400" size={32} />,
      text: `Your privacy is important to us. This policy explains how we collect, use, and protect your data within the Crossoul ecosystem. We focus on mindful data handling, ensuring your digital footprint is used only to enhance your peer resonance and local connectivity. We never sell your data to third parties.`
    },
    terms: {
      title: 'Terms of Service',
      icon: <FileText className="text-indigo-400" size={32} />,
      text: `By using Crossoul, you agree to participate in a mindful, respectful community. Our platform is designed for authentic expression and peer resonance. We maintain a zero-tolerance policy for harassment or bad-faith actors. Users are responsible for the content they share and the offline connections they form.`
    },
    contact: {
      title: 'Contact Us',
      icon: <Mail className="text-indigo-400" size={32} />,
      text: `Have a thought to share or a question about the movement? Reach out to our founders directly. We are always listening.`
    }
  };

  const current = content[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ 
              position: 'absolute', 
              inset: 0, 
              background: 'rgba(0,0,0,0.85)', 
              backdropFilter: 'blur(10px)' 
            }}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '550px',
              background: 'rgba(28, 28, 30, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '32px',
              padding: '3rem',
              boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
              overflow: 'hidden',
              backdropFilter: 'blur(20px)'
            }}
          >
            {/* Close Button */}
            <button 
              onClick={() => {
                HapticManager.light();
                onClose();
              }}
              style={{ 
                position: 'absolute', 
                top: '1.5rem', 
                right: '1.5rem', 
                background: 'rgba(255,255,255,0.08)', 
                border: 'none', 
                borderRadius: '50%', 
                width: '36px', 
                height: '36px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: '#fff',
                zIndex: 10
              }}
            >
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '72px', 
                height: '72px', 
                background: 'rgba(99, 102, 241, 0.1)', 
                borderRadius: '24px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 2rem',
                color: '#818cf8'
              }}>
                {current.icon}
              </div>

              <h2 style={{ 
                fontSize: '2.5rem', 
                fontWeight: 900, 
                color: '#fff', 
                marginBottom: '1.5rem', 
                letterSpacing: '-1.5px',
                fontFamily: 'var(--font-heading)'
              }}>
                {current.title}
              </h2>
              
              <p style={{ 
                color: 'rgba(255,255,255,0.7)', 
                fontSize: '1.1rem', 
                lineHeight: 1.6, 
                marginBottom: '2.5rem' 
              }}>
                {current.text}
              </p>

              {type === 'contact' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                   <a 
                    href="mailto:crossoul15@gmail.com" 
                    style={{ 
                      background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                      color: '#fff',
                      padding: '1.2rem',
                      borderRadius: '16px',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.8rem'
                    }}
                  >
                    Email Our Team <ExternalLink size={18} />
                  </a>
                  
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                    <SocialIcon href="https://www.instagram.com/_crossoul_" icon={<Instagram />} />
                    <SocialIcon href="https://www.linkedin.com/company/crossoul/" icon={<Linkedin />} />
                  </div>
                </div>
              ) : (
                <button 
                  onClick={onClose}
                  style={{ 
                    padding: '1rem 3rem', 
                    background: 'rgba(255,255,255,0.1)', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '100px', 
                    fontWeight: 700 
                  }}
                >
                  I Understand
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function SocialIcon({ href, icon }: { href: string, icon: any }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      style={{
        width: '48px',
        height: '48px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff'
      }}
    >
      {icon}
    </a>
  );
}
