import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Rocket, GraduationCap, Network, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';

export default function CircleOutcome() {
  const opportunities = [
    {
      id: 0,
      icon: <Lightbulb size={32} />,
      title: "Incubation Pathway",
      desc: "Selected resonant ideas are forwarded to partnered incubation cells for mentorship and potential seed funding.",
      deepInfo: "Our partners include early-stage VCs and academic incubation centers that specialize in non-linear innovation."
    },
    {
      id: 1,
      icon: <GraduationCap size={32} />,
      title: "Internship Access",
      desc: "Participants can access exclusive internships through the Crossoul network to gain practical collaborative experience.",
      deepInfo: "Work with startups and social enterprises that value collective thinking over traditional hierarchy."
    },
    {
      id: 2,
      icon: <Network size={32} />,
      title: "Collaborative Networks",
      desc: "Form lasting connections with peers who resonate with your vision beyond the session.",
      deepInfo: "Access a private discord/circle where the 20-Mind protocol continues to evolve your future concepts."
    },
    {
      id: 3,
      icon: <Rocket size={32} />,
      title: "Execution Support",
      desc: "We bridge the gap between discussion and reality, helping improved ideas find their highest potential.",
      deepInfo: "From POC development to market-ready refinement, the Crossoul team supports the 'Refined Idea Sheet' journey."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const timerRef = useRef<any>(null);

  const startHold = () => {
    timerRef.current = setTimeout(() => setIsHolding(true), 400);
  };
  const endHold = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsHolding(false);
  };

  const active = opportunities[activeIndex];

  return (
    <section id="epilogue" style={{ minHeight: '60dvh', display: 'flex', alignItems: 'center', background: '#000', position: 'relative', overflow: 'hidden', padding: '4rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', width: '100%', position: 'relative', zIndex: 10 }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ color: 'var(--accent-gold)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase' }}
          >
            Epilogue
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', fontWeight: 900, color: '#fff', marginTop: '0.8rem', letterSpacing: '-1.5px', lineHeight: 1.1 }}
          >
            The Execution <span style={{ color: 'var(--accent-gold)' }}>Bridge</span>.
          </motion.h2>
        </div>

        <div className="wheel-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          
          {/* THE WHEEL */}
          <div style={{ position: 'relative', width: 'clamp(300px, 40vw, 500px)', height: 'clamp(300px, 40vw, 500px)', margin: '0 auto' }}>
             {/* Center Glow */}
             <div style={{ position: 'absolute', inset: '20%', background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)', filter: 'blur(40px)', borderRadius: '50%' }} />
             
             {/* Segments */}
             {opportunities.map((item, i) => {
               const angle = (i * 360) / opportunities.length;
               const isActive = activeIndex === i;
               
               return (
                 <motion.div
                   key={i}
                   onMouseEnter={() => setActiveIndex(i)}
                   onClick={() => setActiveIndex(i)}
                   className="wheel-segment"
                   style={{
                     position: 'absolute',
                     top: '50%',
                     left: '50%',
                     width: '45%',
                     height: '100px',
                     transformOrigin: '0% 50%',
                     transform: `translate(0, -50%) rotate(${angle}deg) translate(30px, 0)`,
                     cursor: 'pointer',
                     zIndex: isActive ? 10 : 1
                   }}
                 >
                   <motion.div
                    animate={{ 
                      scale: isActive ? 1.1 : 1,
                      x: isActive ? 20 : 0,
                      backgroundColor: isActive ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.03)',
                      borderColor: isActive ? 'var(--accent-gold)' : 'rgba(255,255,255,0.1)'
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '20px',
                      border: '1px solid',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isActive ? 'var(--accent-gold)' : '#fff',
                      rotate: `-${angle}deg`, // Un-rotate the icon
                      boxShadow: isActive ? '0 0 30px rgba(212,175,55,0.2)' : 'none'
                    }}
                   >
                     {item.icon}
                   </motion.div>
                 </motion.div>
               );
             })}

             {/* Inner Ring Connector UI */}
             <div style={{ position: 'absolute', inset: '15%', border: '2px dashed rgba(212,175,55,0.1)', borderRadius: '50%', pointerEvents: 'none' }} />
          </div>

          {/* CENTRAL CONTENT PANEL (GTA Style Info) */}
          <div style={{ position: 'relative' }}>
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeIndex}
                 initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                 animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                 exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                 onMouseDown={startHold}
                 onMouseUp={endHold}
                 onTouchStart={startHold}
                 onTouchEnd={endHold}
                 style={{
                   background: 'rgba(255,255,255,0.02)',
                   backdropFilter: 'blur(20px)',
                   border: `1px solid ${isHolding ? 'var(--accent-gold)' : 'rgba(255,255,255,0.1)'}`,
                   borderRadius: '40px',
                   padding: '3rem',
                   position: 'relative',
                   overflow: 'hidden',
                   cursor: 'pointer',
                   minHeight: '350px',
                   display: 'flex',
                   flexDirection: 'column',
                   justifyContent: 'center',
                   transition: 'border-color 0.3s ease'
                 }}
               >
                 {/* Hold Ring UI */}
                 {timerRef.current && (
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: isHolding ? '100%' : '0%' }}
                      style={{ position: 'absolute', bottom: 0, left: 0, height: '4px', background: 'var(--accent-gold)' }}
                    />
                 )}

                 <div style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem', opacity: 0.8 }}>
                    {active.icon}
                 </div>
                 <h3 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', marginBottom: '1rem', letterSpacing: '-1px' }}>
                    {active.title}
                 </h3>
                 <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                    {active.desc}
                 </p>
                 
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '2px' }}>
                    HOLD TO VISION <ChevronRight size={14} />
                 </div>

                 {/* Deep Vision Overlay */}
                 <AnimatePresence>
                   {isHolding && (
                     <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.95)',
                        padding: '3rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        zIndex: 20
                      }}
                     >
                       <span style={{ color: 'var(--accent-gold)', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Strategic Insight</span>
                       <p style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 500, lineHeight: 1.4 }}>
                        {active.deepInfo}
                       </p>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </motion.div>
             </AnimatePresence>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 991px) {
          .wheel-layout {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .wheel-layout > div:first-child {
            width: 280px !important;
            height: 280px !important;
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
