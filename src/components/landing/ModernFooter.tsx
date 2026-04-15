import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail } from 'lucide-react';
import ScrollFloat from '../animations/ScrollFloat';
import { HapticManager } from '../../lib/HapticManager';

export default function ModernFooter({ onJoin, mode }: { onJoin?: () => void, mode?: 'side-a' | 'side-b' }) {
  return (
    <footer className="modern-footer">
      <div style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        {mode === 'side-a' && (
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              HapticManager.success();
              if (onJoin) onJoin();
            }}
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
              color: '#fff',
              border: 'none',
              padding: '1rem 2.5rem',
              borderRadius: '100px',
              fontSize: '1rem',
              fontWeight: 900,
              letterSpacing: '1px',
              cursor: 'pointer',
              boxShadow: '0 15px 30px rgba(99, 102, 241, 0.3)',
              marginBottom: '2.5rem'
            }}
          >
            JOIN THE MOVEMENT
          </motion.button>
        )}
        <ScrollFloat className="footer-brand" text="CROSSOUL" />
        <p style={{ color: '#52525b', fontSize: '1rem', fontWeight: 600, marginTop: '0.8rem', letterSpacing: '0.5px' }}>Connect. Meet. Grow.</p>
      </div>
      
      <div className="footer-links">
        <a href="#" className="footer-link" onMouseEnter={() => HapticManager.light()}>Privacy</a>
        <a href="#" className="footer-link" onMouseEnter={() => HapticManager.light()}>Terms</a>
        <a href="mailto:crossoul15@gmail.com" className="footer-link" onMouseEnter={() => HapticManager.light()}>Contact</a>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', margin: '1rem 0' }}>
        <a href="https://www.instagram.com/_crossoul_?igsh=MXhwcDQyYTBwM2N2Zg==" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onMouseEnter={() => HapticManager.light()}>
          <Instagram size={18} />
        </a>
        <a href="https://www.linkedin.com/company/crossoul/" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onMouseEnter={() => HapticManager.light()}>
          <Linkedin size={18} />
        </a>
        <a href="mailto:crossoul15@gmail.com" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onMouseEnter={() => HapticManager.light()}>
          <Mail size={18} />
        </a>
      </div>
      
      <div className="legal-text" style={{ marginBottom: '0.4rem' }}>
        Built by{' '}
        <Link to="/kishan-kasula" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '2px', opacity: 0.7 }}>
          Kishan Kasula
        </Link>
        {' '}&amp;{' '}
        <Link to="/aditya-phanidar-vungarala" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '2px', opacity: 0.7 }}>
          Aditya Phanidar Vungarala
        </Link>
      </div>
      <div className="legal-text">
        &copy; {new Date().getFullYear()} Crossoul Private Limited Company. All rights reserved.
      </div>
    </footer>
  )
}
