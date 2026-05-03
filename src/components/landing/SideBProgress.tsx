import { useState, useEffect } from 'react';


const SB_IDS = ['th-hero', 'ch1', 'ch2', 'psychology', 'ch4', 'epilogue', 'gallery'];
const SB_TITLES = ['Vision', 'Dead End', 'Resonance', 'Psychology', 'Recognition', 'Epilogue', 'Gallery'];

interface SideBProgressProps {
  isVisible: boolean;
}

export default function SideBProgress({ isVisible }: SideBProgressProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      let act = 0;
      SB_IDS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (el.getBoundingClientRect().top < window.innerHeight * 0.5) {
          act = i;
        }
      });
      setActiveIdx(act);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
    }
  };

  return (
    <div id="sb-prog" className={isVisible ? 'show' : ''}>
      {SB_IDS.map((id, i) => (
        <div 
          key={id}
          className={`sp ${i === activeIdx ? 'on' : ''}`}
          onClick={() => goTo(id)}
          title={SB_TITLES[i]}
        ></div>
      ))}
    </div>
  );
}
