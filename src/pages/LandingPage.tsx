import { useEffect } from 'react';
import '../styles/landing.css';
import LiquidHero from '../components/landing/LiquidHero';
import JourneySection from '../components/landing/JourneySection';
import EcosystemFocus from '../components/landing/EcosystemFocus';
import FoundersSection from '../components/landing/FoundersSection';
import LaunchCountdown from '../components/landing/LaunchCountdown';
import ModernFooter from '../components/landing/ModernFooter';

interface Props {
  onShowAuth: () => void;
}

export default function LandingPage({ onShowAuth }: Props) {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="landing-page-wrapper">
      <div className="mesh-bg"></div>
      
      {/* Navigation removed as requested */}

      <main>
        <LiquidHero />
        <JourneySection />
        <EcosystemFocus onJoin={onShowAuth} />
        <FoundersSection />
        <LaunchCountdown />
      </main>

      <ModernFooter />
    </div>
  )
}
