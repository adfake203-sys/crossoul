import { motion, useScroll, useTransform } from 'framer-motion';
import { FileText, Users, TrendingUp, Briefcase } from 'lucide-react';
import Interactive3DTile from './Interactive3DTile';

export default function RefinedOutcome() {
  const { scrollYProgress } = useScroll();
  const yContent = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const outcomes = [
    {
      title: "Refined Idea Sheet",
      desc: "Participants rewrite their own idea after incorporating 19 perspectives. This captures the before-vs-after evolution.",
      deepInfo: "This document serves as proof of evolution, showing exactly how a concept became more resilient through collective stress-testing.",
      icon: <FileText />
    },
    {
      title: "Peer Recognition Sheet",
      desc: "A democratic vote for the most innovative thought. Surfaces resonance, not just 'winning'.",
      deepInfo: "By removing centralized judging, the 'winner' is determined by those who actually engaged with the thought, ensuring authentic recognition.",
      icon: <Users />
    }
  ];

  return (
    <section id="chapter-4" style={{ minHeight: '60dvh', display: 'flex', alignItems: 'center', background: '#000', position: 'relative', overflow: 'hidden', padding: '4rem 0' }}>
      <motion.div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', width: '100%', y: yContent }}>
        
        <div className="outcome-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '5rem', alignItems: 'start' }}>
          
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{ color: 'var(--accent-gold)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase' }}
            >
              Chapter IV
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', fontWeight: 900, color: '#fff', marginTop: '1.2rem', lineHeight: 1.1, letterSpacing: '-1px' }}
            >
              The Science of <span style={{ color: 'var(--accent-gold)' }}>Recognition</span>.
            </motion.h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(0.95rem, 2vw, 1.2rem)', marginTop: '2rem', lineHeight: 1.6 }}>
              At the end of each session, the evolution of an idea is made tangible through two formal sheets.
            </p>

            <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {outcomes.map((o, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                >
                  <Interactive3DTile 
                    title={o.title}
                    desc={o.desc}
                    deepInfo={o.deepInfo}
                    icon={o.icon}
                    accentColor="var(--accent-gold)"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ 
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '48px',
              padding: 'clamp(2rem, 5vw, 4rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '1.5rem', letterSpacing: '1px' }}>The Core Shift</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ opacity: 0.4 }}>
                  <p style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Traditional</p>
                  <p style={{ fontSize: '1.2rem', fontStyle: 'italic', fontFamily: 'var(--font-accent)' }}>"Who deserves to win?"</p>
                </div>
                <div style={{ width: '1px', height: '40px', background: 'var(--accent-gold)', opacity: 0.3 }} />
                <div>
                  <p style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', color: 'var(--accent-gold)' }}>Crossoul</p>
                  <p style={{ fontSize: '1.7rem', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1.1 }}>"How can every idea reach its highest potential?"</p>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2.5rem', display: 'flex', gap: '2rem' }}>
               <div style={{ flex: 1 }}>
                  <TrendingUp style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }} />
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Improved Ideas & Collaborative Networks</p>
               </div>
               <div style={{ flex: 1 }}>
                  <Briefcase style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }} />
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Incubation Pathways & Internships</p>
               </div>
            </div>
          </motion.div>

        </div>

      </motion.div>

      <style>{`
        @media (max-width: 991px) {
          .outcome-grid {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
        }
      `}</style>
    </section>
  );
}
