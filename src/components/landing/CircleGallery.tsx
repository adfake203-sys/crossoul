import { motion } from 'framer-motion';
import DomeGallery from '../animations/DomeGallery';



export default function CircleGallery() {
  return (
    <section style={{ padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, amount: 0.3 }}
           transition={{ duration: 0.8 }}
           style={{ marginBottom: '1.5rem', textAlign: 'center' }}
        >
          <h2 style={{ 
            fontFamily: 'var(--font-accent)', 
            fontSize: '3rem', 
            fontStyle: 'italic',
            color: 'var(--accent-side-b)'
          }}>
            Snapshots of Resonance
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.5rem', fontWeight: 400 }}>
            Real moments from our past "Threads of Thoughts" sessions.
          </p>
        </motion.div>

        <div style={{ width: '100%', height: '700px', position: 'relative' }}>
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
