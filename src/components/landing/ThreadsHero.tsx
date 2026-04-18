import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollFloat from '../animations/ScrollFloat';

export default function ThreadsHero() {
  const { scrollYProgress } = useScroll();
  const yText = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section 
      id="prologue"
      style={{ 
        minHeight: '100dvh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '2rem',
        textAlign: 'center',
        position: 'relative',
        background: '#000',
        overflow: 'hidden'
      }}
    >
      <motion.div
        style={{ maxWidth: '900px', zIndex: 1, y: yText }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        <motion.span 
          initial={{ opacity: 0, letterSpacing: '20px' }}
          whileInView={{ opacity: 1, letterSpacing: '5px' }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ 
            fontSize: '0.85rem', 
            fontWeight: 800, 
            color: 'var(--accent-gold)',
            textTransform: 'uppercase',
            marginBottom: '2rem',
            display: 'block'
          }}
        >
          Thread of Thoughts — The Manifesto
        </motion.span>
        
        <h1 style={{ 
          fontFamily: 'var(--font-heading)', 
          fontSize: 'clamp(2.5rem, 10vw, 6.5rem)', 
          fontWeight: 900, 
          lineHeight: 1,
          color: '#fff',
          margin: '1.5rem 0',
          letterSpacing: '-2px'
        }}>
          <ScrollFloat text="A New Model for" /> <br/> 
          <span style={{ 
            fontStyle: 'italic', 
            fontWeight: 400, 
            fontFamily: 'var(--font-accent)', 
            background: 'linear-gradient(135deg, #f59e0b 0%, #d4af37 50%, #78350f 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Idea Evolution.
          </span>
        </h1>
  
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          style={{ width: '60px', height: '2px', background: 'var(--accent-gold)', margin: '3rem auto' }} 
        />

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ 
            maxWidth: '700px', 
            margin: '0 auto', 
            fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', 
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.5,
            fontWeight: 500,
            fontFamily: 'var(--font-body)'
          }}
        >
          Crossoul is built on a simple but powerful belief: <br/>
          <span style={{ color: '#fff' }}>Ideas grow better through collective thinking than through competitive judgment.</span>
        </motion.p>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ marginTop: '5rem', color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', letterSpacing: '3px' }}
        >
          SCROLL TO UNLOCK THE VISION
        </motion.div>
      </motion.div>

      {/* Gilded Mesh Backdrop */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '100%',
        height: '40%',
        background: 'linear-gradient(to top, rgba(212, 175, 55, 0.05), transparent)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />
    </section>
  );
}
