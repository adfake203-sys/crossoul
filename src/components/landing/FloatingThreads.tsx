import { motion, useScroll, useTransform } from 'framer-motion';

export default function FloatingThreads() {
  const { scrollYProgress } = useScroll();
  
  // Create several layers of fragments moving at different speeds
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Layer 1: Fast fragments */}
      <motion.div style={{ position: 'absolute', inset: 0, y: y1 }}>
        {[...Array(12)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: '1px',
            height: Math.random() * 100 + 50 + 'px',
            background: 'linear-gradient(to bottom, transparent, var(--accent-gold), transparent)',
            left: Math.random() * 100 + '%',
            top: Math.random() * 200 + '%',
            opacity: 0.1,
            filter: 'blur(1px)'
          }} />
        ))}
      </motion.div>

      {/* Layer 2: Medium slow fragments */}
      <motion.div style={{ position: 'absolute', inset: 0, y: y2 }}>
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: '2px',
            height: Math.random() * 200 + 100 + 'px',
            background: 'linear-gradient(to bottom, transparent, var(--accent-gold), transparent)',
            left: Math.random() * 100 + '%',
            top: Math.random() * 200 + '%',
            opacity: 0.05,
            transform: 'rotate(5deg)',
            filter: 'blur(3px)'
          }} />
        ))}
      </motion.div>

      {/* Layer 3: Slow large glows */}
      <motion.div style={{ position: 'absolute', inset: 0, y: y3 }}>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: '30vw',
            height: '30vw',
            background: 'radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)',
            left: Math.random() * 100 + '%',
            top: Math.random() * 200 + '%',
            filter: 'blur(60px)'
          }} />
        ))}
      </motion.div>
    </div>
  );
}
