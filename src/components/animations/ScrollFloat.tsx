import { motion, type Variants } from 'framer-motion';

interface Props {
  text: string;
  className?: string;
}

export default function ScrollFloat({ text, className }: Props) {
  const words = text.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.04 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 25, filter: 'blur(8px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', damping: 20, stiffness: 100 } }
  };

  return (
    <motion.div 
      className={className}
      variants={container} 
      initial="hidden" 
      whileInView="show" 
      viewport={{ once: true, amount: 0.1 }} 
      style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.25em', justifyContent: 'center' }}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={item} style={{ display: 'inline-block', background: 'inherit', WebkitBackgroundClip: 'inherit', WebkitTextFillColor: 'inherit' }}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
