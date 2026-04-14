import { motion } from 'framer-motion';

export default function ThreadsHero() {
  return (
    <section 
      style={{ 
        minHeight: '65vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '5rem 2rem 2rem 2rem',
        textAlign: 'center',
        position: 'relative'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <span style={{ 
          fontSize: '0.9rem', 
          fontWeight: 700, 
          letterSpacing: '4px', 
          color: 'var(--accent-side-b)',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
          display: 'block'
        }}>
          Side B — The Physical Soul
        </span>
        
        <h1 style={{ 
          fontFamily: 'var(--font-accent)', 
          fontSize: 'clamp(3.5rem, 12vw, 8rem)', 
          fontWeight: 400, 
          lineHeight: 0.9,
          color: 'var(--text-primary)',
          margin: '0.5rem 0',
          fontStyle: 'italic'
        }}>
          Threads of <br/> Thoughts
        </h1>
 
        <p style={{ 
          maxWidth: '600px', 
          margin: '1.5rem auto', 
          fontSize: 'clamp(1rem, 2vw, 1.25rem)', 
          color: 'var(--text-muted)',
          lineHeight: 1.6,
          fontWeight: 400
        }}>
          A movement is built in person. Step into our offline circles where ideas are refined, 
          voices are amplified, and community is the only judge.
        </p>
 
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center', 
          marginTop: '2rem' 
        }}>
          <div style={{ 
            padding: '1rem 2rem', 
            border: '2px solid var(--accent-side-b)', 
            borderRadius: '100px',
            color: 'var(--accent-side-b)',
            fontSize: '0.9rem',
            fontWeight: 900
          }}>
            REFINED IDEAS
          </div>
          <div style={{ 
            padding: '1rem 2rem', 
            border: '2px solid var(--accent-side-b)', 
            borderRadius: '100px',
            color: 'var(--accent-side-b)',
            fontSize: '0.9rem',
            fontWeight: 900
          }}>
            PEER RECOGNITION
          </div>
        </div>
      </motion.div>
 
      {/* Background element */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at center, rgba(245, 158, 11, 0.05) 0%, transparent 70%)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />
    </section>
  );
}
