import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  texts: string[];
  interval?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function RotatingText({ texts, interval = 2500, className, style }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % texts.length), interval);
    return () => clearInterval(id);
  }, [texts, interval]);

  // Find the longest string to keep width stable if we want, 
  // but it's simpler to just block-align or use flex. 
  // For absolute positioning, an invisible spacer is perfect.
  const maxChars = Math.max(...texts.map(t => t.length));
  const longestText = texts.find(t => t.length === maxChars);

  return (
    <span className={className} style={{ position: 'relative', display: 'inline-flex', overflow: 'hidden', verticalAlign: 'bottom', padding: '0.1em 0', ...style }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={index}
          initial={{ y: 50, opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -50, opacity: 0, filter: 'blur(8px)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{ position: 'absolute', display: 'inline-block', whiteSpace: 'nowrap', left: 0, right: 0, textAlign: 'center', color: 'inherit' }}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
      <span style={{ visibility: 'hidden', pointerEvents: 'none', paddingRight: '0.1em' }}>
        {longestText}
      </span>
    </span>
  );
}
