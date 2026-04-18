import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, Repeat, Heart } from 'lucide-react';
import Interactive3DTile from './Interactive3DTile';

export default function TheResonanceProtocol() {
  const steps = [
    {
      title: "Focused Groups",
      desc: "Around 20 participants ensure meaningful interaction and diversity without the noise of a crowd.",
      deepInfo: "Cognitive limit research suggests 20 is the sweet spot for deep, democratic engagement where every voice is audible.",
      icon: <Users size={24} />
    },
    {
      title: "Zero Anxiety",
      desc: "Present your idea without extreme time pressure in an environment designed for clarity.",
      deepInfo: "By removing formal judging panels, we switch the brain from survival mode (competition) to creative mode (contribution).",
      icon: <Heart size={24} />
    },
    {
      title: "The Evolution Loop",
      desc: "19 collective evaluators ask, challenge, and refine. Your idea evolves through 19 different perspectives.",
      deepInfo: "It's not about validation—it's about refinement. Each perspective adds a new layer of resilience to your concept.",
      icon: <Repeat size={24} />
    }
  ];

  const { scrollYProgress } = useScroll();
  const yContent = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section id="chapter-2" style={{ minHeight: '60dvh', display: 'flex', alignItems: 'center', background: '#000', position: 'relative', overflow: 'hidden', padding: '2rem 0' }}>
      <motion.div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', width: '100%', y: yContent, position: 'relative', zIndex: 1 }}>
        
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ color: 'var(--accent-gold)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase' }}
          >
            Chapter II
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, color: '#fff', marginTop: '1rem', lineHeight: 1.1, letterSpacing: '-1px' }}
          >
            The Protocol of <span style={{ color: 'var(--accent-gold)' }}>Resonance</span>.
          </motion.h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', marginTop: '2rem', lineHeight: 1.6 }}>
            Crossoul removes the idea of centralized authority and replaces it with collective intelligence.
          </p>
        </div>

        <div className="protocol-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
               <Interactive3DTile 
                title={step.title}
                desc={step.desc}
                deepInfo={step.deepInfo}
                icon={step.icon}
                accentColor="var(--accent-gold)"
               />
            </motion.div>
          ))}
        </div>

      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .protocol-container {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
