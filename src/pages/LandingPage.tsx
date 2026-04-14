import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import '../styles/landing.css';
import '../styles/transitions.css';

// Components
import LiquidHero from '../components/landing/LiquidHero';
import JourneySection from '../components/landing/JourneySection';
import EcosystemFocus from '../components/landing/EcosystemFocus';
import FoundersSection from '../components/landing/FoundersSection';
import LaunchCountdown from '../components/landing/LaunchCountdown';
import ModernFooter from '../components/landing/ModernFooter';
import CrossoverToggle from '../components/landing/CrossoverToggle';
import { HapticManager } from '../lib/HapticManager';
import ThreadsHero from '../components/landing/ThreadsHero';
import CirclePhilosophy from '../components/landing/CirclePhilosophy';
import CircleGallery from '../components/landing/CircleGallery';
import CircleOutcome from '../components/landing/CircleOutcome';

interface Props {
  onShowAuth: () => void;
}

export default function LandingPage({ onShowAuth }: Props) {
  const [viewMode, setViewMode] = useState<'side-a' | 'side-b'>('side-a');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleToggle = () => {
    HapticManager.notification();
    setIsTransitioning(true);
    // Timing for the "Portal" to cover the screen
    setTimeout(() => {
      setViewMode(prev => prev === 'side-a' ? 'side-b' : 'side-a');
      window.scrollTo(0, 0);
    }, 500);
    
    // Total duration of transition
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  };

  return (
    <div className={`landing-page-wrapper ${viewMode === 'side-b' ? 'side-b-theme' : ''}`}>
      <div className="mesh-bg"></div>
      
      {/* Super Transition Portal Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div 
            className="portal-transition-overlay"
            initial={{ clipPath: 'circle(0% at 50% 90%)' }}
            animate={{ clipPath: 'circle(150% at 50% 90%)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.6, 0.05, 0.1, 0.99] }}
            style={{ 
              background: viewMode === 'side-a' ? '#f59e0b' : '#6366f1',
              zIndex: 99999
            }}
          />
        )}
      </AnimatePresence>
      
      <CrossoverToggle mode={viewMode} onToggle={handleToggle} isScrolled={scrolled} />

      <main>
        <AnimatePresence mode="wait">
          {viewMode === 'side-a' ? (
            <motion.div
              key="side-a"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LiquidHero />
              <JourneySection />
              <EcosystemFocus onJoin={onShowAuth} />
              <FoundersSection />
              <LaunchCountdown />
            </motion.div>
          ) : (
            <motion.div
              key="side-b"
              className="side-b-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ThreadsHero />
              <CirclePhilosophy />
              <CircleGallery />
              <CircleOutcome />
              <FoundersSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <ModernFooter onJoin={onShowAuth} />
    </div>
  )
}
