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

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '80px' }}>
      <motion.div
        key={value}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 900, color: '#fff', letterSpacing: '-2px' }}
      >
        {value.toString().padStart(2, '0')}
      </motion.div>
      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6366f1', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.8 }}>
        {label}
      </div>
    </div>
  );

  return (
    <section style={{ padding: '4rem 1rem 0', background: 'transparent', position: 'relative', overflow: 'hidden' }}>
      {/* Glow effect */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <p style={{ color: '#71717a', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '2rem' }}>
            The Countdown Begins
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <TimeUnit value={timeLeft.days} label="Days" />
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <TimeUnit value={timeLeft.minutes} label="Minutes" />
            <TimeUnit value={timeLeft.seconds} label="Seconds" />
          </div>

          <p style={{ 
            color: '#fff', 
            fontSize: '1.2rem', 
            fontStyle: 'italic', 
            maxWidth: '500px', 
            margin: '0 auto', 
            opacity: 0.8,
            lineHeight: 1.6
          }}>
            "Building something worth the wait takes time. Resonance isn't forced; it's grown."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
