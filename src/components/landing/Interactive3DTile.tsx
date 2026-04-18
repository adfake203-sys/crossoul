import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

interface Props {
  title: string;
  desc: string;
  id?: string;
  accentColor: string;
  deepInfo?: string;
  icon?: React.ReactNode;
}

export default function Interactive3DTile({ title, desc, id, accentColor, deepInfo, icon }: Props) {
  const [isHolding, setIsHolding] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHolding(false);
  };

  // Hold logic for revealing deep info
  const timerRef = useRef<any>(null);

  const startHold = () => {
    timerRef.current = setTimeout(() => {
      setIsHolding(true);
    }, 400); // 400ms hold to reveal
  };

  const endHold = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsHolding(false);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={startHold}
      onMouseUp={endHold}
      onTouchStart={startHold}
      onTouchEnd={endHold}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
        width: '100%',
        cursor: 'pointer'
      }}
      className="interactive-tile-root interactive-card"
    >
      <motion.div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
          background: 'rgba(255, 255, 255, 0.03)',
          border: `1px solid ${isHolding ? accentColor : 'rgba(255,255,255,0.08)'}`,
          borderRadius: '32px',
          padding: '2.5rem',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          position: 'relative',
          overflow: 'hidden',
          transition: 'border-color 0.3s ease'
        }}
      >
        {/* Glow behind */}
        <div style={{
          position: 'absolute',
          inset: -20,
          background: `radial-gradient(circle at 50% 50%, ${accentColor}15 0%, transparent 70%)`,
          opacity: isHolding ? 1 : 0.3,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', transform: "translateZ(20px)" }}>
           {id && <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 900, color: `${accentColor}40` }}>{id}</span>}
           {icon && <div style={{ color: accentColor }}>{icon}</div>}
        </div>

        <motion.h3 
          style={{ 
            fontSize: '1.4rem', 
            fontWeight: 800, 
            color: '#fff', 
            transform: "translateZ(30px)",
            letterSpacing: '-0.5px' 
          }}
        >
          {title}
        </motion.h3>

        <motion.div
          animate={{ opacity: isHolding ? 0 : 1, y: isHolding ? -10 : 0 }}
          style={{ transform: "translateZ(10px)" }}
        >
          <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, fontSize: '0.95rem' }}>
            {desc}
          </p>
        </motion.div>

        {/* Deep Info Overlay */}
        {deepInfo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isHolding ? 1 : 0, scale: isHolding ? 1 : 0.9 }}
            style={{
              position: 'absolute',
              inset: 0,
              padding: '2.5rem',
              background: 'rgba(0,0,0,0.9)',
              backdropFilter: 'blur(10px)',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              pointerEvents: isHolding ? 'auto' : 'none'
            }}
          >
            <span style={{ color: accentColor, fontWeight: 800, fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>Deep Vision</span>
            <p style={{ color: '#fff', fontSize: '1.1rem', lineHeight: 1.5, fontWeight: 500 }}>
              {deepInfo}
            </p>
          </motion.div>
        )}

        {/* Interaction Prompt (only visible if not holding) */}
        {!isHolding && (
           <div style={{ marginTop: 'auto', paddingTop: '1rem', opacity: 0.2, fontSize: '0.6rem', letterSpacing: '1px' }}>
              HOLD FOR DETAIL
           </div>
        )}
      </motion.div>
    </motion.div>
  );
}
