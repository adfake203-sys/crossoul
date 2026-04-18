import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Chapter {
  id: string;
  title: string;
}

interface Props {
  chapters: Chapter[];
}

export default function SideStoryProgress({ chapters }: Props) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeChapter, setActiveChapter] = useState(chapters[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = chapters.map(c => document.getElementById(c.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && scrollPosition >= el.offsetTop) {
          setActiveChapter(chapters[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapters]);

  return (
    <>
      {/* Top Progress Bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'var(--accent-gold, #d4af37)',
          transformOrigin: '0%',
          zIndex: 10001,
          scaleX
        }}
      />

      {/* Floating Story Menu */}
      <div className="story-nav-container" style={{
        position: 'fixed',
        left: '2.5rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        pointerEvents: 'none'
      }}>
        {chapters.map((chapter, index) => (
          <div 
            key={chapter.id}
            className="story-nav-item"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1.25rem',
              pointerEvents: 'auto',
              cursor: 'pointer'
            }}
            onClick={() => {
              const el = document.getElementById(chapter.id);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div style={{
              width: activeChapter === chapter.id ? '10px' : '6px',
              height: activeChapter === chapter.id ? '10px' : '6px',
              borderRadius: '50%',
              background: activeChapter === chapter.id ? 'var(--accent-gold)' : 'rgba(255,255,255,0.15)',
              border: activeChapter === chapter.id ? '4px solid rgba(212, 175, 55, 0.2)' : 'none',
              transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
              boxSizing: 'content-box'
            }} />
            <motion.span 
              initial={false}
              animate={{ 
                opacity: activeChapter === chapter.id ? 1 : 0,
                x: activeChapter === chapter.id ? 0 : -5,
                filter: activeChapter === chapter.id ? 'blur(0px)' : 'blur(4px)'
              }}
              className="chapter-label"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.7rem',
                fontWeight: 900,
                color: '#fff',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap'
              }}
            >
              CH {index + 1}: {chapter.title}
            </motion.span>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .story-nav-container {
            left: 1.5rem !important;
            gap: 1.5rem !important;
          }
          .chapter-label {
            display: none !important;
          }
          .story-nav-item:hover .chapter-label {
            display: block !important;
            opacity: 1 !important;
            position: absolute;
            left: 2rem;
            background: rgba(0,0,0,0.8);
            padding: 0.5rem 1rem;
            border-radius: 8px;
            pointer-events: none;
          }
        }
      `}</style>
    </>
  );
}
