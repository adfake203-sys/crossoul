import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LaunchCountdown() {
  // Target date: 6 months from now
  const [targetDate] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 6);
    return d.getTime();
  });

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = targetDate - new Date().getTime();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const CountdownUnit = ({ value, label }: { value: number, label: string }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '80px' }}>
      <motion.div
        key={value}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 900, color: '#fff', letterSpacing: '-2px' }}
      >
        {value.toString().padStart(2, '0')}
      </motion.div>
      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-side-a)', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.8 }}>
        {label}
      </div>
    </div>
  );

  return (
    <section style={{ padding: '4rem 1rem 0', background: 'transparent', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <span style={{ 
            display: 'block',
            fontSize: '0.8rem', 
            fontWeight: 800, 
            color: 'var(--accent-side-a)',
            letterSpacing: '5px',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            textShadow: '0 0 20px var(--accent-side-a-glow)'
          }}>
            FOUNDER ADMITTANCE
          </span>
          <h2 style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: 'clamp(2.5rem, 8vw, 6rem)', 
            fontWeight: 950, 
            color: '#fff', 
            lineHeight: 0.9, 
            letterSpacing: '-3px' 
          }}>
            THE <span className="frosted-silver-text">FINAL</span> <br/> COUNTDOWN
          </h2>
        </motion.div>
      </div>

      {/* Countdown Numbers */}
      <div style={{ 
        display: 'flex', 
        gap: 'min(3vw, 2rem)', 
        justifyContent: 'center', 
        perspective: '1000px',
        marginTop: '3rem'
      }}>
        <CountdownUnit value={timeLeft.days} label="DAYS" />
        <CountdownUnit value={timeLeft.hours} label="HOURS" />
        <CountdownUnit value={timeLeft.minutes} label="MINS" />
        <CountdownUnit value={timeLeft.seconds} label="SECS" />
      </div>

      {/* Energy Aura */}
      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          position: 'absolute',
          inset: -50,
          background: 'radial-gradient(circle at 50% 50%, var(--accent-side-a-glow) 0%, transparent 70%)',
          zIndex: -1,
          filter: 'blur(40px)'
        }}
      />
    </section>
  );
}
