import { useState, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { HapticManager } from '../../lib/HapticManager';

interface Point {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Props {
  points: Point[];
}

export default function PhilosophyStack({ points }: Props) {
  const [stack, setStack] = useState(points);

  const handleDragEnd = (event: any, info: any) => {
    // If swiped far enough
    if (Math.abs(info.offset.x) > 100 || Math.abs(info.offset.y) > 100) {
      HapticManager.notification();
      // Move top item to the back
      setStack((prev) => {
        const newStack = [...prev];
        const top = newStack.shift();
        if (top) newStack.push(top);
        return newStack;
      });
    }
  };

  return (
    <div style={{ 
      position: 'relative', 
      height: '500px', 
      width: '100%', 
      maxWidth: '400px', 
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <AnimatePresence>
        {stack.map((point, index) => (
          <PhilosophyCard 
            key={point.title} 
            point={point} 
            index={index} 
            total={stack.length}
            onDragEnd={handleDragEnd}
            isTop={index === 0}
          />
        ))}
      </AnimatePresence>
      
      {/* Interaction Hint */}
      <motion.div 
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '-3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--accent-side-b)',
          fontSize: '0.8rem',
          fontWeight: 800,
          letterSpacing: '3px'
        }}
      >
        SWIPE TO EXPLORE THE SOUL
      </motion.div>
    </div>
  );
}

function PhilosophyCard({ point, index, total, onDragEnd, isTop }: { point: Point, index: number, total: number, onDragEnd: any, isTop: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Springy Tilt Logic
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]));
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]));
  
  // Fade and scale based on stack position
  const scale = 1 - index * 0.05;
  const zIndex = total - index;
  const translateY = index * -15;
  const opacity = 1 - index * 0.2;

  return (
    <motion.div
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={onDragEnd}
      onDrag={() => isTop && HapticManager.impact()}
      style={{
        position: 'absolute',
        width: '100%',
        maxWidth: '350px',
        background: '#18181b',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '32px',
        padding: '2.5rem',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        cursor: isTop ? 'grab' : 'default',
        zIndex,
        x,
        y,
        rotateX,
        rotateY,
        perspective: 1000,
      }}
      initial={{ scale: 0.8, opacity: 0, y: 50 }}
      animate={{ 
        scale, 
        opacity, 
        y: translateY,
        rotate: index % 2 === 0 ? index * 1.5 : index * -1.5 // Cluster effect
      }}
      exit={{ 
        x: x.get() > 0 ? 500 : -500, 
        opacity: 0, 
        scale: 0.5,
        transition: { duration: 0.4 } 
      }}
      whileTap={isTop ? { scale: 0.98, cursor: 'grabbing' } : {}}
    >
      <div style={{ color: 'var(--accent-side-b)', marginBottom: '1.5rem' }}>
        {point.icon}
      </div>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem', color: 'var(--text-primary)' }}>
        {point.title}
      </h3>
      <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem', fontWeight: 400 }}>
        {point.description}
      </p>
    </motion.div>
  );
}
