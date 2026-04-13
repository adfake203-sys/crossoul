import { Instagram, Linkedin, Mail } from 'lucide-react';
import ScrollFloat from '../animations/ScrollFloat';

export default function ModernFooter() {
  return (
    <footer className="modern-footer">
      <div style={{ marginBottom: '1rem' }}>
        <ScrollFloat className="footer-brand" text="CROSSOUL" />
        <p style={{ color: '#52525b', fontSize: '0.9rem', fontWeight: 600, marginTop: '0.5rem' }}>Connect. Meet. Grow.</p>
      </div>
      
      <div className="footer-links">
        <a href="#" className="footer-link">Privacy</a>
        <a href="#" className="footer-link">Terms</a>
        <a href="mailto:crossoul15@gmail.com" className="footer-link">Contact</a>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', margin: '1rem 0' }}>
        <a href="https://www.instagram.com/_crossoul_?igsh=MXhwcDQyYTBwM2N2Zg==" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Instagram size={18} />
        </a>
        <a href="https://www.linkedin.com/company/crossoul/" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Linkedin size={18} />
        </a>
        <a href="mailto:crossoul15@gmail.com" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Mail size={18} />
        </a>
      </div>
      
      <div className="legal-text">
        &copy; {new Date().getFullYear()} Crossoul Private Limited Company. All rights reserved.
      </div>
    </footer>
  )
}
