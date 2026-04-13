import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CardSwap({ children }: { children: React.ReactNode[] }) {
  const [cards, setCards] = useState(() => children.map((_, i) => i));

  const handleSwap = () => {
    setCards((prev) => {
      const newCards = [...prev];
      const top = newCards.shift();
      if (top !== undefined) newCards.push(top);
      return newCards;
    });
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '340px', height: '320px', margin: '4rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '1rem', color: '#a1a1aa', fontSize: '0.9rem', fontWeight: 600 }}>
        Tap or Swipe below
      </div>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {children.map((child, index) => {
          const position = cards.indexOf(index);
          const isTop = position === 0;

          if (position > 2) return null;

          return (
            <motion.div
              key={index}
              layout
              onClick={isTop ? handleSwap : undefined}
              initial={false}
              animate={{
                y: position * 20,
                scale: 1 - position * 0.06,
                zIndex: children.length - position,
                opacity: 1 - position * 0.2,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                cursor: isTop ? 'grab' : 'default',
                transformOrigin: 'top center',
                willChange: 'transform'
              }}
              drag={isTop ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(_, { offset, velocity }) => {
                if (Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 300) {
                  handleSwap();
                }
              }}
              whileTap={isTop ? { cursor: 'grabbing' } : {}}
            >
              {child}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
