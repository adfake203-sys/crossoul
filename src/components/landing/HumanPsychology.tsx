import { motion } from 'framer-motion';

export default function HumanPsychology() {
  return (
    <section id="chapter-3" style={{ minHeight: '60dvh', display: 'flex', alignItems: 'center', background: '#080808', position: 'relative', overflow: 'hidden', padding: '4rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
        
        <div className="psych-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', gap: '6rem', alignItems: 'center' }}>
          
          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ 
              position: 'relative',
              width: '100%',
              aspectRatio: '1',
              background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div style={{
              width: 'clamp(160px, 35vw, 220px)',
              height: 'clamp(160px, 35vw, 220px)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              background: 'rgba(212, 175, 55, 0.02)'
            }}>
               <motion.div 
                animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: 'absolute', inset: -20, border: '1px solid rgba(212, 175, 55, 0.15)', borderRadius: '50%' }}
               />
               <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 900, color: 'var(--accent-gold)', letterSpacing: '4px' }}>EGO</span>
               
               {/* Orbital labels */}
               <div style={{ position: 'absolute', top: '-15%', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontSize: '0.65rem', fontWeight: 800, color: 'rgba(212, 175, 55, 0.5)', letterSpacing: '3px' }}>EXPRESSION</div>
               <div style={{ position: 'absolute', bottom: '-15%', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontSize: '0.65rem', fontWeight: 800, color: 'rgba(212, 175, 55, 0.5)', letterSpacing: '3px' }}>BELONGING</div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <span style={{ color: 'var(--accent-gold)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase' }}>Chapter III</span>
            <h2 style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', 
              fontWeight: 900, 
              color: '#fff', 
              lineHeight: 1.1, 
              marginTop: '1.2rem', 
              marginBottom: '2.5rem',
              letterSpacing: '-1.5px'
            }}>
              Channeling the <br/> <span style={{ fontStyle: 'italic', fontWeight: 400, fontFamily: 'var(--font-accent)', color: 'var(--accent-gold)' }}>Human Drive.</span>
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'clamp(1rem, 1.8vw, 1.35rem)', lineHeight: 1.6 }}>
                Crossoul leverages two key human tendencies: <span style={{ color: 'var(--accent-gold)' }}>the desire to stand out</span> and <span style={{ color: 'var(--accent-gold)' }}>the desire to belong</span>.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', lineHeight: 1.7 }}>
                Instead of letting ego create competition, Crossoul channels it into thoughtful feedback and meaningful participation. 
              </p>
              <div style={{ borderLeft: '3px solid var(--accent-gold)', paddingLeft: '2.5rem', marginTop: '1.5rem', background: 'linear-gradient(to right, rgba(212, 175, 55, 0.05), transparent)' }}>
                <p style={{ color: 'var(--accent-gold)', fontWeight: 800, fontSize: '1.3rem', fontStyle: 'italic', lineHeight: 1.4 }}>"Motivation is shifted from simply speaking—to adding insight."</p>
              </div>
            </div>
          </motion.div>

        </div>

      </div>

      <style>{`
        @media (max-width: 991px) {
          .psych-grid {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
            text-align: center;
          }
          .psych-grid > div:first-child {
            margin: 0 auto;
            max-width: 400px;
          }
          .psych-grid > div:last-child {
            max-width: 600px;
            margin: 0 auto;
          }
          div[style*="borderLeft"] {
            border-left: none !important;
            border-top: 3px solid var(--accent-gold);
            padding: 2rem 0 0 0 !important;
            background: linear-gradient(to bottom, rgba(212, 175, 55, 0.05), transparent) !important;
          }
        }
      `}</style>
    </section>
  );
}
