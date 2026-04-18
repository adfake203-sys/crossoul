import { motion } from 'framer-motion';
import DomeGallery from '../animations/DomeGallery';

export default function CircleGallery() {
  return (
    <section id="gallery" style={{ padding: '6rem 1rem', background: '#000' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           style={{ marginBottom: '4rem', textAlign: 'center' }}
        >
          <span style={{ color: 'var(--accent-gold)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase' }}>Visual Archive</span>
          <h2 style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
            fontWeight: 900,
            color: '#fff',
            marginTop: '1.5rem',
            letterSpacing: '-1.5px'
          }}>
            Snapshots of <span style={{ color: 'var(--accent-gold)' }}>Resonance</span>.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto' }}>
            Real moments from our past "Threads of Thoughts" sessions where ideas evolved into reality.
          </p>
        </motion.div>

        <div style={{ width: '100%', height: 'clamp(400px, 60vh, 700px)', position: 'relative' }}>
          <DomeGallery
            fit={0.8}
            minRadius={600}
            maxVerticalRotationDeg={0}
            segments={20}
            dragDampening={2}
            grayscale={false}
            openedImageWidth="min(95vw, 1200px)"
            openedImageHeight="auto"
          />
        </div>
      </div>
    </section>
  );
}
