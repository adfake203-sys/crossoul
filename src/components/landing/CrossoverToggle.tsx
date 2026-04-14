import { motion } from 'framer-motion';
import { HapticManager } from '../../lib/HapticManager';
import { Zap, Users } from 'lucide-react';

interface Props {
  mode: 'side-a' | 'side-b';
  onToggle: () => void;
  isScrolled: boolean;
}

export default function CrossoverToggle({ mode, onToggle, isScrolled }: Props) {
  const isDigital = mode === 'side-a';

  const handleClick = () => {
    HapticManager.notification();
    onToggle();
  };

  return (
    <motion.div 
      className="crossover-toggle-container"
      initial={false}
      animate={{
        top: isScrolled ? 'calc(100svh - 6rem)' : '0.75rem',
        scale: isScrolled ? 1 : 1,
        background: isScrolled ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.05)',
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 260, 
        damping: 20,
        mass: 0.8
      }}
      style={{
        position: 'fixed',
        left: '50%',
        x: '-50%',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.4rem',
        backdropFilter: 'blur(20px)',
        borderRadius: '100px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: isScrolled ? '0 20px 50px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.2)',
        userSelect: 'none'
      }}
    >
      <motion.button
        onClick={handleClick}
        onMouseEnter={() => HapticManager.light()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: '100px',
          cursor: 'pointer',
          background: isDigital ? 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)' : 'transparent',
          color: isDigital ? '#fff' : '#71717a',
          fontWeight: 800,
          fontSize: '0.85rem',
          letterSpacing: '1px',
          transition: 'all 0.3s ease',
        }}
      >
        <Zap size={16} fill={isDigital ? "currentColor" : "none"} />
        DIGITAL
      </motion.button>

      <motion.button
        onClick={handleClick}
        onMouseEnter={() => HapticManager.light()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: '100px',
          cursor: 'pointer',
          background: !isDigital ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'transparent',
          color: !isDigital ? '#fff' : '#71717a',
          fontWeight: 800,
          fontSize: '0.85rem',
          letterSpacing: '1px',
          transition: 'all 0.3s ease',
        }}
      >
        <Users size={16} fill={!isDigital ? "currentColor" : "none"} />
        OFFLINE
      </motion.button>
    </motion.div>
  );
}
