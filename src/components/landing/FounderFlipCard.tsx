import { useState } from 'react';

interface FounderFlipCardProps {
  name: string;
  role: string;
  imgSrc: string;
  pointsFront: string[];
  pointsBack: string[];
  bio: string;
  linkedin: string;
}

export default function FounderFlipCard({ name, role, imgSrc, pointsBack, bio, linkedin }: FounderFlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const frontLabel = role.toLowerCase().includes('co-founder') ? 'Co-Founder' : 'Founder';

  const toggleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFlipped(!flipped);
  };

  return (
    <div className={`fc ${flipped ? 'flipped' : ''}`} onClick={toggleFlip}>
      <div className="fc-inner">
        <div className="fc-front">
          <div className="fc-front-role">{frontLabel}</div>
        </div>

        <div className="fc-back">
          <div className="fc-back-photo">
            <img src={imgSrc} alt="" />
          </div>
          <div className="fc-back-name">{name}</div>
          <div className="fc-back-role">{role}</div>
          <div className="fc-back-bio">{bio}</div>
          <div className="fc-back-pts">
            {pointsBack.map((p, i) => (
              <div key={i} className="fc-back-pt">- {p}</div>
            ))}
          </div>
          <a
            className="li-btn"
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{ marginTop: '.5rem' }}
          >
            LinkedIn
          </a>
          <div className="fc-back-close">tap again to flip back</div>
        </div>
      </div>
    </div>
  );
}
