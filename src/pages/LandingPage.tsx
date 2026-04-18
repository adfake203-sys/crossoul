import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import '../styles/landing.css';
import '../styles/transitions.css';

// Components

import LiquidHero from '../components/landing/LiquidHero';
import DigitalEcosystemManifesto from '../components/landing/DigitalEcosystemManifesto';
import JourneySection from '../components/landing/JourneySection';
import EcosystemFocus from '../components/landing/EcosystemFocus';
import FoundersSection from '../components/landing/FoundersSection';
import LaunchCountdown from '../components/landing/LaunchCountdown';
import ModernFooter from '../components/landing/ModernFooter';
import CrossoverToggle from '../components/landing/CrossoverToggle';
import { HapticManager } from '../lib/HapticManager';
import ThreadsHero from '../components/landing/ThreadsHero';
import CircleGallery from '../components/landing/CircleGallery';
import CircleOutcome from '../components/landing/CircleOutcome';
import IdeathonProblem from '../components/landing/IdeathonProblem';
import TheResonanceProtocol from '../components/landing/TheResonanceProtocol';
import HumanPsychology from '../components/landing/HumanPsychology';
import RefinedOutcome from '../components/landing/RefinedOutcome';
import SideStoryProgress from '../components/landing/SideStoryProgress';
import FloatingThreads from '../components/landing/FloatingThreads';

import StickyHeader from '../components/landing/StickyHeader';
import PopupModal from '../components/landing/PopupModal';

interface Props {
  onShowAuth: () => void;
}

const VISION_CHAPTERS = [
  { id: 'prologue', title: 'Start: The Core Belief' },
  { id: 'chapter-1', title: 'The Dead End' },
  { id: 'chapter-2', title: 'Protocol of Resonance' },
  { id: 'chapter-3', title: 'The Human Drive' },
  { id: 'chapter-4', title: 'Scientific Recognition' },
  { id: 'epilogue', title: 'The Execution Bridge' },
  { id: 'gallery', title: 'Visual Archive' }
];

export default function LandingPage({ onShowAuth }: Props) {
  const [viewMode, setViewMode] = useState<'side-a' | 'side-b'>('side-a');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Legal & Contact Modal State
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'privacy' | 'terms' | 'contact' }>({
    isOpen: false,
    type: 'privacy'
  });

  const openLegal = (type: 'privacy' | 'terms' | 'contact') => {
    setLegalModal({ isOpen: true, type });
    document.body.classList.add('popup-active');
  };

  const closeLegal = () => {
    setLegalModal(prev => ({ ...prev, isOpen: false }));
    document.body.classList.remove('popup-active');
  };

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
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  };

  return (
    <div className={`landing-page-wrapper ${viewMode === 'side-b' ? 'side-b-theme' : ''}`}>
      <div className="mesh-bg" style={{ display: viewMode === 'side-b' ? 'block' : 'none' }}></div>
      
      <StickyHeader onJoin={onShowAuth} />
      
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
              background: viewMode === 'side-a' 
                ? 'linear-gradient(135deg, #d4af37 0%, #8b6914 100%)' // Gold
                : 'linear-gradient(135deg, #f4f4f5 0%, #a1a1aa 100%)', // Silver
              zIndex: 99999,
              userSelect: 'none'
            }}
          />
        )}
      </AnimatePresence>
      
      <CrossoverToggle mode={viewMode} onToggle={handleToggle} isScrolled={scrolled} />

      {viewMode === 'side-b' && <SideStoryProgress chapters={VISION_CHAPTERS} />}

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
              <DigitalEcosystemManifesto />
              <JourneySection />
              <EcosystemFocus onJoin={onShowAuth} />
              <LaunchCountdown />
              <FoundersSection />
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
              <FloatingThreads />
              <ThreadsHero />
              <IdeathonProblem />
              <TheResonanceProtocol />
              <HumanPsychology />
              <RefinedOutcome />
              <CircleOutcome />
              <CircleGallery />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <ModernFooter 
        onJoin={onShowAuth} 
        mode={viewMode} 
        openPrivacy={() => openLegal('privacy')}
        openTerms={() => openLegal('terms')}
        openContact={() => openLegal('contact')}
      />

      <PopupModal 
        isOpen={legalModal.isOpen}
        onClose={closeLegal}
        type={legalModal.type}
      />
    </div>
  )
}
