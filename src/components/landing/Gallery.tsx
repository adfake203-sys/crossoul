import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import ScrollReveal from '../animations/ScrollReveal';

const circlePhotos = [
  {
    src: '/circlepics/WhatsApp Image 2026-04-14 at 10.03.13.jpeg',
    alt: 'Crossoul circle group session',
    title: 'Opening Circle',
    meta: 'Group energy',
    className: 'feature',
  },
  {
    src: '/circlepics/WhatsApp Image 2026-04-14 at 10.02.54.jpeg',
    alt: 'Crossoul circle discussion',
    title: 'Room in Motion',
    meta: 'Live session',
    className: 'tall',
  },
  {
    src: '/circlepics/WhatsApp Image 2026-04-14 at 09.58.22.jpeg',
    alt: 'Crossoul participants collaborating',
    title: 'Ideas on the Floor',
    meta: 'Collaboration',
  },
  {
    src: '/circlepics/WhatsApp Image 2026-04-14 at 09.58.34.jpeg',
    alt: 'Crossoul idea circle',
    title: 'Peer Exchange',
    meta: 'Discussion',
  },
  {
    src: '/circlepics/WhatsApp Image 2026-04-14 at 09.58.43.jpeg',
    alt: 'Crossoul peer discussion',
    title: 'Shared Thinking',
    meta: 'Circle moment',
    className: 'wide',
  },
  {
    src: '/circlepics/WhatsApp Image 2026-04-14 at 09.58.53.jpeg',
    alt: 'Crossoul offline circle moment',
    title: 'Offline Pulse',
    meta: 'Connection',
  },
  {
    src: '/circlepics/WhatsApp Image 2026-04-14 at 09.58.55.jpeg',
    alt: 'Crossoul group activity',
    title: 'Active Room',
    meta: 'Participation',
  },
  {
    src: '/circlepics/WhatsApp Image 2026-04-14 at 09.58.58.jpeg',
    alt: 'Crossoul discussion in action',
    title: 'Breakout Thought',
    meta: 'Reflection',
  },
  {
    src: '/circlepics/WhatsApp Image 2026-04-14 at 09.59.02.jpeg',
    alt: 'Crossoul students connecting offline',
    title: 'The Circle Forms',
    meta: 'Community',
    className: 'wide',
  },
  {
    src: '/circlepics/WhatsApp Image 2026-04-14 at 09.59.06.jpeg',
    alt: 'Crossoul circle participation',
    title: 'Resonance',
    meta: 'Listening',
  },
  {
    src: '/circlepics/WhatsApp Image 2026-04-14 at 09.59.07.jpeg',
    alt: 'Crossoul community session',
    title: 'People First',
    meta: 'Offline circle',
  },
  {
    src: '/circlepics/WhatsApp Image 2026-04-14 at 10.03.14.jpeg',
    alt: 'Crossoul archive photo',
    title: 'Archive Close',
    meta: 'Session memory',
    className: 'tall',
  },
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activePhoto = activeIndex === null ? null : circlePhotos[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowRight') setActiveIndex((activeIndex + 1) % circlePhotos.length);
      if (event.key === 'ArrowLeft') setActiveIndex((activeIndex - 1 + circlePhotos.length) % circlePhotos.length);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex]);

  const move = (direction: 1 | -1) => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + direction + circlePhotos.length) % circlePhotos.length);
  };

  return (
    <section id="gallery" data-sl="07 Gallery">
      <div className="ch" style={{ paddingBottom: 0 }}>
        <ScrollReveal className="ch-header">
          <span className="kicker g">Visual Archive</span>
          <div className="ch-title">THE CIRCLE<br/><span style={{ fontSize: '.6em', opacity: .35 }}>in action.</span></div>
          <p className="gallery-sub">A real archive of sessions, faces, and moments. Tap any photo to open the story larger.</p>
        </ScrollReveal>

        <div className="gallery-rail" aria-hidden="true">
          <span>12 real moments</span>
          <span>Offline circle</span>
          <span>Tap to open</span>
        </div>

        <div className="g-grid" aria-label="Crossoul circle photo archive">
          {circlePhotos.map((photo, index) => (
            <button
              className={`gi ${photo.className ?? ''}`}
              key={photo.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open ${photo.title}`}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <span className="gi-shade" />
              <span className="gi-copy">
                <span>{photo.meta}</span>
                <strong>{photo.title}</strong>
              </span>
              <span className="gi-open"><Maximize2 size={15} /></span>
            </button>
          ))}
        </div>
      </div>

      {activePhoto && (
        <div className="gallery-viewer" role="dialog" aria-modal="true" aria-label={activePhoto.title}>
          <button className="gv-backdrop" type="button" onClick={() => setActiveIndex(null)} aria-label="Close photo viewer" />
          <div className="gv-panel">
            <button className="gv-close" type="button" onClick={() => setActiveIndex(null)} aria-label="Close">
              <X size={20} />
            </button>
            <button className="gv-nav prev" type="button" onClick={() => move(-1)} aria-label="Previous photo">
              <ChevronLeft size={24} />
            </button>
            <img src={activePhoto.src} alt={activePhoto.alt} />
            <button className="gv-nav next" type="button" onClick={() => move(1)} aria-label="Next photo">
              <ChevronRight size={24} />
            </button>
            <div className="gv-caption">
              <span>{activePhoto.meta}</span>
              <strong>{activePhoto.title}</strong>
              <small>{(activeIndex ?? 0) + 1} / {circlePhotos.length}</small>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
