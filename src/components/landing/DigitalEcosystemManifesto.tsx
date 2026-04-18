import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

const problems = [
  {
    kicker: "Problem 1",
    title: "Lack of Freedom of Expression.",
    desc: "Students fear college authorities and peer judgment. With no safe space to talk openly, opinions are suppressed and discussions never happen.",
    solution: "A semi-private campus space where students can speak freely.",
    align: "left"
  },
  {
    kicker: "Problem 2",
    title: "Fragmented Communities.",
    desc: "Students are scattered across WhatsApp groups, Instagram, and random chats. There is no central hub, meaning no unified community and no discoverability.",
    solution: "A single digital campus where everyone is discoverable.",
    align: "right"
  },
  {
    kicker: "Problem 3",
    title: "Weak Real Connections.",
    desc: "Students interact online but rarely meet offline. Platforms like Reddit keep everything online, leading to shallow connections with no real friendships or networks.",
    solution: "Turning online interactions into real-life meetups.",
    align: "left"
  },
  {
    kicker: "Problem 4",
    title: "Awkward Networking.",
    desc: "Meeting new people is awkward and no platform organizes it organically. Students don't know where to go or how to meet.",
    solution: "A natural, interest-based way to meet people.",
    align: "right"
  },
  {
    kicker: "Problem 5",
    title: "Missed Opportunities.",
    desc: "Students and entrepreneurs struggle to find co-founders, collaborators, and opportunities. Everything is random and luck-based.",
    solution: "A network where opportunities emerge from conversations.",
    align: "left"
  },
  {
    kicker: "Problem 6",
    title: "Digital-Physical Divide.",
    desc: "Social apps are online only, business apps are transactional. There is no connection between digital conversations and real-world actions.",
    solution: "The bridge between online communities and offline experiences.",
    align: "right"
  }
];

function ProblemSection({ prob, idx }: { prob: any, idx: number }) {
    const [isHolding, setIsHolding] = useState(false);
    const timerRef = useRef<any>(null);

    const startHold = () => {
        timerRef.current = setTimeout(() => {
            setIsHolding(true);
        }, 300); // 300ms hold to reveal
    };

    const endHold = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setIsHolding(false);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: prob.align === 'center' ? 'center' : prob.align === 'left' ? 'flex-start' : 'flex-end',
                textAlign: prob.align as any,
                width: '100%',
                cursor: 'pointer',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                WebkitTouchCallout: 'none',
                WebkitTapHighlightColor: 'transparent'
            }}
            onMouseDown={startHold}
            onMouseUp={endHold}
            onMouseLeave={endHold}
            onTouchStart={startHold}
            onTouchEnd={endHold}
        >
            <motion.div 
                style={{ 
                    maxWidth: '700px', 
                    position: 'relative',
                    padding: '2rem',
                    borderRadius: '24px',
                    transition: 'all 0.4s ease',
                    transformStyle: 'preserve-3d'
                }}
                animate={{ 
                    scale: isHolding ? 0.95 : 1,
                    background: isHolding ? 'rgba(255,255,255,0.02)' : 'transparent',
                    boxShadow: isHolding ? '0 0 40px rgba(255, 255, 255, 0.05)' : 'none'
                }}
            >
                {/* Default Visible Content */}
                <motion.div animate={{ opacity: isHolding ? 0 : 1, y: isHolding ? -10 : 0 }}>
                    <span style={{ color: 'var(--accent-side-a)', fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'block', fontSize: '0.85rem' }}>
                        {prob.kicker}
                    </span>
                    <h2 className="frosted-silver-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                        {prob.title}
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '2.5rem', lineHeight: 1.6, fontSize: '1.25rem' }}>
                        {prob.desc}
                    </p>
                    <div style={{ marginTop: '2rem', opacity: 0.3, fontSize: '0.75rem', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase' }}>
                        [Hold to Reveal Solution]
                    </div>
                </motion.div>

                {/* Hold to Reveal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: isHolding ? 1 : 0, scale: isHolding ? 1 : 0.9 }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        padding: '2.5rem',
                        background: 'rgba(0,0,0,0.85)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        pointerEvents: isHolding ? 'auto' : 'none',
                        zIndex: 10,
                        textAlign: 'center'
                    }}
                >
                    <strong style={{ display: 'block', color: 'rgba(255,255,255,0.9)', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '3px' }}>
                        We Solve This
                    </strong>
                    <span style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: 'var(--accent-side-a)', fontWeight: 800, lineHeight: 1.2 }}>
                        "{prob.solution}"
                    </span>
                </motion.div>

            </motion.div>
        </motion.div>
    );
}

export default function DigitalEcosystemManifesto() {
    return (
        <section className="manifesto-section" style={{ position: 'relative', width: '100%', overflow: 'hidden', paddingBottom: '8rem' }}>
            
            {/* Background Ambient Glow */}
            <div style={{ 
                position: 'fixed', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                width: '100vw', 
                height: '100vh', 
                pointerEvents: 'none', 
                zIndex: 0,
                opacity: 0.15
            }}>
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    style={{
                        position: 'absolute',
                        top: '10%',
                        left: '20%',
                        width: '60vw',
                        height: '60vw',
                        background: 'radial-gradient(circle, var(--accent-side-a) 0%, transparent 60%)',
                        filter: 'blur(120px)',
                        borderRadius: '50%'
                    }}
                />
            </div>

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                
                {/* The Big One */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ minHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '2rem 0 6rem 0' }}
                >
                    <span style={{ color: 'var(--accent-side-a)', fontWeight: 800, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1.5rem', fontSize: '0.85rem' }}>The Vision</span>
                    <h2 className="frosted-silver-text" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 950, lineHeight: 0.9, letterSpacing: '-0.05em' }}>
                        THE BIG ONE.
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', marginTop: '2.5rem', lineHeight: 1.5, maxWidth: '800px' }}>
                        Students don't have a safe, campus-level space to express and connect. Reddit is anonymous. LinkedIn is formal. There is no middle ground.
                    </p>
                    <div style={{ marginTop: '3.5rem', fontSize: '1.4rem', fontWeight: 700, color: '#fff', background: 'rgba(255, 255, 255, 0.05)', padding: '1rem 2rem', borderRadius: '100px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                        Result: No true "campus voice."
                    </div>
                </motion.div>

                {/* The 6 Problems */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem', padding: '4rem 0' }}>
                    {problems.map((prob, idx) => (
                        <ProblemSection key={idx} prob={prob} idx={idx} />
                    ))}
                </div>

                {/* The Final Insight / Bridge */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '10rem 0' }}
                >
                    <span style={{ color: 'var(--accent-side-a)', fontWeight: 800, letterSpacing: '8px', textTransform: 'uppercase', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                        THE FINAL INSIGHT
                    </span>
                    <h2 className="frosted-silver-text" style={{ fontSize: 'clamp(4rem, 12vw, 9rem)', fontWeight: 950, lineHeight: 0.85, letterSpacing: '-0.07em' }}>
                        THE BRIDGE.
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', marginTop: '3.5rem', lineHeight: 1.3, fontWeight: 700, maxWidth: '900px' }}>
                        Bridging the gap between a conversation on a phone and an experience in the real world.
                    </p>
                    
                    <div style={{ marginTop: '5rem', display: 'flex', gap: '3rem', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ opacity: 0.4, fontSize: '0.85rem', letterSpacing: '3px', marginBottom: '0.5rem' }}>FROM</div>
                            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#fff' }}>DIGITAL</div>
                        </div>
                        <div style={{ fontSize: '2.5rem', opacity: 0.3, color: '#fff' }}>→</div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ opacity: 0.4, fontSize: '0.85rem', letterSpacing: '3px', marginBottom: '0.5rem' }}>TO</div>
                            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-side-a)' }}>PHYSICAL</div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
