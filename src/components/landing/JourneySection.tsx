import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { UserPlus, MessageSquare, Link, Zap } from 'lucide-react';

const steps = [
  {
    kicker: "ACT I",
    title: "THE ENTRY.",
    icon: <UserPlus size={28} />,
    teaser: "A sealed perimeter. You search. You join. You are now inside the digital college space.",
    isFinal: false
  },
  {
    kicker: "ACT II",
    title: "THE CORE.",
    icon: <MessageSquare size={28} />,
    teaser: "Thoughts are posted. Friction happens. In the noise, micro-groups begin to form.",
    isFinal: false
  },
  {
    kicker: "ACT III",
    title: "THE NETWORK.",
    icon: <Link size={28} />,
    teaser: "The content fades into the background. Pure relationships start to take over.",
    isFinal: false
  },
  {
    kicker: "ACT IV",
    title: "THE TRIGGER.",
    icon: <Zap size={28} />,
    teaser: "The digital illusion shatters. The network demands to meet in the real world.",
    isFinal: true
  }
];

export default function JourneySection() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax Transforms
    const titleY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
    
    return (
        <section ref={containerRef} className="journey-section-container" style={{ position: 'relative', zIndex: 10, overflow: 'hidden' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{ textAlign: 'center', marginBottom: '8rem', y: titleY }}
                >
                    <span style={{ color: 'var(--accent-side-a)', fontWeight: 800, letterSpacing: '8px', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'block', fontSize: '0.8rem' }}>
                        The Architecture of Trust
                    </span>
                    <h2 className="frosted-silver-text" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 950, lineHeight: 0.9, letterSpacing: '-0.05em' }}>
                        THE SEQUENCE.
                    </h2>
                </motion.div>

                <div style={{ position: 'relative' }}>
                    {/* Central Line */}
                    <div className="journey-central-line"></div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
                        {steps.map((step, idx) => {
                            // Alternate parallax direction slightly per item
                            const yOffset = useTransform(scrollYProgress, [0, 1], [80 + (idx * 20), -(80 + (idx * 20))]);
                            
                            return (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false, amount: 0.1 }}
                                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="journey-node-row"
                                >
                                    {/* Timeline Node */}
                                    <motion.div 
                                        className="journey-icon-box"
                                        style={{ 
                                            background: step.isFinal ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255,255,255,0.03)', 
                                            border: `1px solid ${step.isFinal ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255,255,255,0.1)'}`,
                                            color: step.isFinal ? '#fff' : 'rgba(255,255,255,0.8)',
                                            boxShadow: step.isFinal ? '0 0 40px rgba(255, 255, 255, 0.2)' : '0 0 30px rgba(255,255,255,0.05)',
                                            y: yOffset
                                        }}
                                    >
                                        {step.icon}
                                    </motion.div>

                                    {/* Content Box */}
                                    <motion.div className="journey-text-box" style={{ y: useTransform(scrollYProgress, [0, 1], [40, -40]) }}>
                                        <span style={{ color: step.isFinal ? '#fff' : 'rgba(255,255,255,0.4)', fontWeight: 800, fontSize: '1rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>
                                            {step.kicker}
                                        </span>
                                        <h3 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: '#fff', marginBottom: '1.5rem', letterSpacing: '-0.03em', lineHeight: 1 }}>
                                            {step.title}
                                        </h3>
                                        
                                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', lineHeight: 1.4, fontWeight: 500, maxWidth: '600px' }}>
                                            {step.teaser}
                                        </p>
                                    </motion.div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}
