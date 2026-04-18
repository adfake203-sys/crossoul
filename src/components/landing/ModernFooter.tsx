import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail } from 'lucide-react';
import ScrollFloat from '../animations/ScrollFloat';
import { HapticManager } from '../../lib/HapticManager';

export default function ModernFooter({ 
  onJoin, 
  mode,
  openPrivacy,
  openTerms,
  openContact
}: { 
  onJoin?: () => void, 
  mode?: 'side-a' | 'side-b',
  openPrivacy?: () => void,
  openTerms?: () => void,
  openContact?: () => void
}) {
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
            className="glass-button-premium"
            style={{
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '1rem 2.5rem',
              borderRadius: '100px',
              fontSize: '1rem',
              fontWeight: 900,
              letterSpacing: '1px',
              cursor: 'pointer',
              marginBottom: '2.5rem'
            }}
          >
            JOIN THE MOVEMENT
          </motion.button>
        )}
        <ScrollFloat className="footer-brand" text="CROSSOUL" />
        <p style={{ color: '#a1a1aa', fontSize: '1rem', fontWeight: 600, marginTop: '0.8rem', letterSpacing: '0.5px' }}>Connect. Meet. Grow.</p>
      </div>
      
      <div className="footer-links">
        <button className="footer-link-btn" onClick={openPrivacy}>Privacy</button>
        <button className="footer-link-btn" onClick={openTerms}>Terms</button>
        <button className="footer-link-btn" onClick={openContact}>Contact</button>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', margin: '1.5rem 0' }}>
        <a href="https://www.instagram.com/_crossoul_" target="_blank" rel="noopener noreferrer" className="footer-social-link">
          <Instagram size={20} />
        </a>
        <a href="https://www.linkedin.com/company/crossoul/" target="_blank" rel="noopener noreferrer" className="footer-social-link">
          <Linkedin size={20} />
        </a>
        <a href="mailto:crossoul15@gmail.com" className="footer-social-link">
          <Mail size={20} />
        </a>
      </div>
      
      <div className="legal-text" style={{ marginBottom: '0.4rem', opacity: 0.6 }}>
        Built by{' '}
        <Link to="/kishan-kasula" className="footer-author">
          Kishan Kasula
        </Link>
        {' '}&{' '}
        <Link to="/aditya-phanidar-vungarala" className="footer-author">
          Aditya Phanidar Vungarala
        </Link>
      </div>
      <div className="legal-text" style={{ opacity: 0.4, fontSize: '0.75rem' }}>
        &copy; {new Date().getFullYear()} Crossoul Private Limited Company. All rights reserved.
      </div>
    </footer>
  )
}
