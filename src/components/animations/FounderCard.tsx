import React from 'react';

interface FounderCardProps {
  name: string;
  role: string;
  photoSrc: string;
  bioPoints: string[];
  type: 'Founder' | 'Co-Founder';
  logoSrc: string;
}

const FounderCard: React.FC<FounderCardProps> = ({ type, logoSrc }) => {
  return (
    <div className="card-front" style={{ 
      padding: '0.4rem', 
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.3rem',
      height: '100%',
      width: '100%',
      borderRadius: '8px'
    }}>
      <img 
        src={logoSrc} 
        alt="CROSSOUL" 
        style={{ width: 'clamp(18px, 20%, 30px)', opacity: 0.8, marginBottom: '0.15rem' }} 
      />
      <h2 style={{ 
        margin: 0, 
        fontSize: 'clamp(0.5rem, 1.2vw + 0.35rem, 0.75rem)', 
        fontWeight: 900, 
        color: '#1a1a1a', 
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        width: '100%',
        textAlign: 'center',
        lineHeight: 1,
        wordBreak: 'break-word',
        padding: '0 0.15rem'
      }}>
        {type === 'Co-Founder' ? (
          <>CO-<br/>FOUNDER</>
        ) : (
          type
        )}
      </h2>
      <div style={{ 
        marginTop: '0.3rem', 
        width: '10px', 
        height: '2px', 
        background: '#6366f1',
        borderRadius: '1px',
        opacity: 0.5
      }}></div>
    </div>
  );
};

export default FounderCard;
