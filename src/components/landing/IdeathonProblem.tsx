import { motion, useScroll, useTransform } from 'framer-motion';
import Interactive3DTile from './Interactive3DTile';

export default function IdeathonProblem() {
  const problems = [
    {
      title: "The Recognition Trap",
      desc: "Hundreds of participants compete, but only a few are recognized. Potential is often lost in the noise.",
      deepInfo: "When 90% of ideas are discarded at the gates, ecosystems lose their most diverse innovations. Crossoul ensures no thought is left behind.",
      id: "01"
    },
    {
      title: "Performance Anxiety",
      desc: "Strict time limits create pressure, making participants nervous and hiding their best ideas.",
      deepInfo: "Brilliant thinkers are often silenced by the stage. We remove the performance and focus entirely on the logic of the thought itself.",
      id: "02"
    },
    {
      title: "The Panel Bias",
      desc: "A small panel of judges decides outcomes, influenced by subjective factors, perspective, and bias.",
      deepInfo: "No small group can mirror the wisdom of the crowd. We replace singular judgment with collective resonance.",
      id: "03"
    }
  ];

  const { scrollYProgress } = useScroll();
  const yContent = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="chapter-1" style={{ minHeight: '60dvh', display: 'flex', alignItems: 'center', background: '#050505', position: 'relative', overflow: 'hidden', padding: '4rem 0' }}>
      <motion.div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', y: yContent }}>
        
        <div className="vision-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          
          {/* Header Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span style={{ color: '#eb4432', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase' }}>Chapter I</span>
            <h2 style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: 'clamp(2.4rem, 7vw, 5rem)', 
              fontWeight: 900, 
              color: '#fff', 
              lineHeight: 1, 
              marginTop: '1.2rem', 
              letterSpacing: '-1.5px' 
            }}>
              The <span style={{ color: '#eb4432' }}>Dead End</span> <br/> of Competition.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(0.95rem, 2vw, 1.2rem)', marginTop: '2rem', lineHeight: 1.6, maxWidth: '400px' }}>
              Traditional ideathons focus more on winning than on improving ideas. They create a system where potentially strong thoughts are overlooked.
            </p>
          </motion.div>

          {/* Tiles Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {problems.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + (i * 0.15) }}
              >
                <Interactive3DTile 
                  id={p.id}
                  title={p.title}
                  desc={p.desc}
                  deepInfo={p.deepInfo}
                  accentColor="#eb4432"
                />
              </motion.div>
            ))}
          </div>

        </div>

      </motion.div>

      <style>{`
        @media (max-width: 991px) {
          .vision-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          section#chapter-1 {
            height: auto !important;
            min-height: 100dvh !important;
          }
        }
      `}</style>
    </section>
  );
}
