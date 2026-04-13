import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Folder from '../animations/Folder';
import FounderCard from '../animations/FounderCard';
import FounderPopup from '../animations/FounderPopup';

interface FounderData {
  name: string;
  role: string;
  type: 'Founder' | 'Co-Founder';
  photoSrc: string;
  bioPoints: string[];
  linkedIn?: string;
}

const founders: FounderData[] = [
  {
    name: "Kishan Kasula",
    role: "CEO & Founder",
    type: "Founder",
    photoSrc: "/kishan.jpg",
    linkedIn: "https://www.linkedin.com/in/kishankasula?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    bioPoints: ["Founder of CROSSOUL", "Visionary behind the Ecosystem"]
  },
  {
    name: "Aditya Phanidar Vungarala",
    role: "CTO & Co-Founder",
    type: "Co-Founder",
    photoSrc: "/aditya.jpg",
    linkedIn: "https://www.linkedin.com/in/aditya-vungarala-813163291?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    bioPoints: ["Co-Founder of CROSSOUL", "Head of Engineering & Tech Architecture"]
  }
];

const LOGO_SRC = "/logo-removebg-preview.png";

export default function FoundersSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedFounder, setSelectedFounder] = useState<FounderData | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCardClick = (index: number) => {
    setSelectedFounder(founders[index]);
    setIsPopupOpen(true);
  };

  const founderItems = founders.map((f) => (
    <FounderCard 
      key={f.name}
      name={f.name}
      role={f.role}
      type={f.type}
      photoSrc={f.photoSrc}
      bioPoints={f.bioPoints}
      logoSrc={LOGO_SRC}
    />
  ));

  return (
    <section className="founders-section" style={{ padding: isMobile ? '6rem 1rem' : '10rem 2rem', background: 'transparent', overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Founders Quote Header */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           style={{ textAlign: 'center', marginBottom: isMobile ? '3rem' : '4rem' }}
        >
          <h2 style={{ 
            fontSize: 'clamp(1.2rem, 4vw, 2.2rem)', 
            fontWeight: 800, 
            color: '#fff', 
            lineHeight: 1.4, 
            maxWidth: '1000px', 
            margin: '0 auto',
            letterSpacing: '-0.5px',
            fontStyle: 'italic',
            opacity: 0.9
          }}>
            "We built this because <span style={{ color: '#6366f1' }}>we were these students.</span> Sitting in a tier-2 city, with things to say and nowhere to say them. Crossoul is the platform we needed and nobody built. <span style={{ color: '#6366f1' }}>So we did.</span>"
          </h2>
        </motion.div>

        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: isMobile ? '400px' : '550px',
          position: 'relative',
          gap: isMobile ? '2.5rem' : '4rem'
        }}>
          {/* Sized container to account for the scaled folder dimensions */}
          <div style={{ 
            width: isMobile ? '260px' : '420px', 
            height: isMobile ? '200px' : '320px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <Folder 
              size={isMobile ? 2.2 : 3.5} 
              color="#6366f1" 
              items={founderItems}
              title="The Pulse Behind the Movement"
              onCardClick={handleCardClick}
              className="founders-folder"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', maxWidth: '600px' }}
          >
            <p style={{ 
              color: '#71717a', 
              fontSize: isMobile ? '0.85rem' : '1rem', 
              lineHeight: 1.6, 
              letterSpacing: '0.5px',
              fontStyle: 'italic',
              margin: 0
            }}>
              "Meet the visionaries who built CROSSOUL. Click the folder to reveal cards, then click a card to see the profile."
            </p>
          </motion.div>
        </div>
      </div>

      {/* Profile Popup */}
      <FounderPopup 
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        founder={selectedFounder}
        logoSrc={LOGO_SRC}
      />
    </section>
  );
}
