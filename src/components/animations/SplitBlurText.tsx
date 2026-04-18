import { motion, type Variants } from 'framer-motion';

export default function SplitBlurText({ text, style, className }: { text: string, style?: React.CSSProperties, className?: string }) {
  const words = text.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const item: Variants = {
    hidden: { opacity: 0, filter: 'blur(10px)', y: 20 },
    show: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { type: 'spring', damping: 12, stiffness: 100 } }
  };

  return (
    <motion.div 
      className={`hero-title ${className || ''}`}
      variants={container}
      initial="hidden"
      animate="show"
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25em', justifyContent: 'center', ...style }}
    >
      {words.map((word, i) => {
        if (word === '<br/>') {
          return <div key={i} style={{ flexBasis: '100%', height: 0 }} />
        }
        return (
          <motion.span key={i} variants={item} className={className} style={{ display: 'inline-block' }}>
            {word}
          </motion.span>
        )
      })}
    </motion.div>
  );
}
