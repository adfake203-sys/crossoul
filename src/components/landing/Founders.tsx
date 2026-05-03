import { useState } from 'react';

import ScrollReveal from '../animations/ScrollReveal';
import FounderFlipCard from './FounderFlipCard';

export default function Founders() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFounders = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        const el = document.getElementById('founders');
        if (el) {
          window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
        }
      }, 120);
    }
  };

  return (
    <section id="founders">
      <ScrollReveal className="f-toggle-wrap">
        <button className={`f-toggle ${isOpen ? 'open' : ''}`} onClick={toggleFounders}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Meet the Founders
          <span className="f-toggle-arrow">v</span>
        </button>
      </ScrollReveal>

      <div className={`f-drawer ${isOpen ? 'open' : ''}`} id="f-drawer">
        <div className="f-drawer-inner">
          <p className="f-quote">
            "We built this because <em>we were these students.</em> Sitting in a tier-2 city, with things to say and nowhere to say them. Crossoul is the platform we needed and nobody built. <em>So we did.</em>"
          </p>
          <div className="f-grid">
            <FounderFlipCard
              name="Kishan Kasula"
              role="CEO & Founder"
              imgSrc="/assets/ceo.jpg"
              pointsFront={[
                'Founder of CROSSOUL',
                'Visionary behind the ecosystem',
              ]}
              pointsBack={[
                'Author of the Thread of Thoughts',
                'Vision behind the 20-Mind Protocol',
                'CEO & Founder of CROSSOUL',
              ]}
              bio="The philosophy behind Crossoul. Kishan authored the Thread of Thoughts, the manifesto on collective intelligence, idea evolution, and real-world community."
              linkedin="https://www.linkedin.com/in/kishankasula"
            />

            <FounderFlipCard
              name="Aditya Phanidar Vungarala"
              role="CTO & Co-Founder"
              imgSrc="/assets/cto.jpg"
              pointsFront={[
                'Co-Founder of CROSSOUL',
                'CTO of CROSSOUL',
              ]}
              pointsBack={[
                'Building the Crossoul digital platform',
                'Head of engineering and architecture',
                'CTO & Co-Founder of CROSSOUL',
              ]}
              bio="The product and platform behind Crossoul. Aditya builds the digital side, architecture, and experience that bridges ideas to real-world execution."
              linkedin="https://www.linkedin.com/in/aditya-vungarala-813163291"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
