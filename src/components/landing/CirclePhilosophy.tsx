import { motion } from 'framer-motion';
import { Award, Brain, Users2, Zap } from 'lucide-react';
import PhilosophyStack from './PhilosophyStack';

const philosophyPoints = [
  {
    icon: <Users2 size={32} />,
    title: "20 Minds, One Room",
    description: "We bring together exactly twenty students. Small enough for intimacy, large enough for diversity. In this room, every voice is heard."
  },
  {
    icon: <Zap size={32} />,
    title: "No Judges, Only Peers",
    description: "Traditional ideathons optimize for spectacle. Crossoul Circles optimize for growth. You aren't here to impress a panel; you're here to refine your vision with people who actually care."
  },
  {
    icon: <Brain size={32} />,
    title: "The Refinement Loop",
    description: "Every participant acts as both a presenter and an evaluator. Your idea evolves in real-time as nineteen other brains challenge your assumptions and offer new perspectives."
  },
  {
    icon: <Award size={32} />,
    title: "Peer Recognition",
    description: "At the end, everyone identifies the one idea that resonated most deeply. Not the best slides, but the most impactful thought. That is the soul of resonance."
  }
];

export default function CirclePhilosophy() {
  return (
    <section style={{ padding: '2.5rem 1rem', color: 'var(--text-primary)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '1.5rem' }}
        >
          <h2 style={{ 
            fontFamily: 'var(--font-accent)',
            fontSize: '3rem',
            fontStyle: 'italic',
            color: 'var(--accent-side-b)'
          }}>
            The Soul of the Circle
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.5rem', fontWeight: 400 }}>
            We believe that collective intelligence is more powerful than competitive judgment. 
            Crossoul Circles are designed to make every idea better, not just pick one winner.
          </p>
        </motion.div>
 
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '420px'
        }}>
          <PhilosophyStack points={philosophyPoints} />
        </div>
      </div>
    </section>
  );
}
