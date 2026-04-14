import { motion } from 'framer-motion';
import { FileText, Users, Lightbulb, Rocket } from 'lucide-react';
import { HapticManager } from '../../lib/HapticManager';
import OutcomePerspective from './OutcomePerspective';

const outcomes = [
  {
    icon: <FileText size={40} />,
    title: "The Refined Idea Sheet",
    desc: "Every participant rewrites their own idea after absorbing 90 minutes of collective engagement. It captures the 'Before and After' of your thinking.",
    color: "#3b82f6"
  },
  {
    icon: <Users size={40} />,
    title: "Peer Recognition Sheet",
    desc: "Participants vote for the most resonant idea (not their own). This surfaces the most impactful thoughts in a diverse room.",
    color: "#f59e0b"
  },
  {
    icon: <Lightbulb size={40} />,
    title: "Incubation Pathways",
    desc: "Selected ideas are forwarded to partnered incubation cells for mentorship, structured support, and potential funding.",
    color: "#10b981"
  },
  {
    icon: <Rocket size={40} />,
    title: "Execution Network",
    desc: "Gain access to internships and collaborative networks within the Crossoul ecosystem to bring your ideas to life.",
    color: "#8b5cf6"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1]
    }
  }
};

export default function CircleOutcome() {
  return (
    <section style={{ padding: '2.5rem 1rem', color: 'var(--text-primary)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, amount: 0.3 }}
           transition={{ duration: 0.8 }}
           style={{ textAlign: 'center', marginBottom: '2rem' }}
        >
          <h2 style={{ 
            fontFamily: 'var(--font-accent)', 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontStyle: 'italic',
            color: 'var(--accent-side-b)'
          }}>
            What happens after the Circle?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '1rem', maxWidth: '750px', margin: '1rem auto', fontWeight: 400 }}>
            Crossoul doesn't stop at discussion. Every session produces four tangible outputs 
            that fuel the next stage of your journey.
          </p>
        </motion.div>

        <div style={{ minHeight: '500px', display: 'flex', alignItems: 'center' }}>
          <OutcomePerspective outcomes={outcomes} />
        </div>
      </div>
    </section>
  );
}
