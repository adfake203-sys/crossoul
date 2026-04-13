import { motion } from 'framer-motion';

interface Props {
  name: string;
  role: string;
  logoSrc: string;
  photoSrc?: string;
  color?: string;
  forceFlip?: boolean;
  bioPoints?: string[];
}

const STATIC_RANDOM_ID = Math.floor(Math.random() * 9 + 1);

export default function TeamLanyard({ name, role, photoSrc, color = '#6366f1', forceFlip = false, bioPoints = [] }: Omit<Props, 'logoSrc'> & { logoSrc?: string }) {
  return (
      <motion.div
        className="lanyard-card"
        style={{
          width: '240px',
          height: '340px',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
        animate={{ rotateY: forceFlip ? 180 : 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 80 }}
      >
        {/* FRONT SIDE */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: '#fff',
          border: `1px solid rgba(0,0,0,0.05)`,
          borderRadius: '16px',
          backfaceVisibility: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '2rem',
          boxShadow: `0 10px 30px rgba(0,0,0,0.1)`,
          overflow: 'hidden',
          transform: 'translateZ(1px)'
        }}>
          {/* Top Hole */}
          <div style={{ 
            width: '40px', 
            height: '14px', 
            background: '#09090b', 
            borderRadius: '100px',
            marginTop: '-15px',
            border: '1px solid rgba(255,255,255,0.1)'
          }} />

          {/* Logo Area (Removed as requested) */}
          <div style={{ width: '100px', height: '60px', position: 'relative' }}>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h4 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 950, color: '#000' }}>{name}</h4>
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', fontWeight: 700, color: '#6366f1', letterSpacing: '2px', textTransform: 'uppercase' }}>
              {role}
            </p>
          </div>

          <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)' }} />
          
          <div style={{ fontSize: '0.7rem', color: '#52525b', fontWeight: 600 }}>
             ID: CROSS-00{STATIC_RANDOM_ID}
          </div>
        </div>

        {/* BACK SIDE (PHOTO) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'transparent',
          border: `1px solid rgba(0,0,0,0.05)`,
          borderRadius: '16px',
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg) translateZ(2px)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
           {photoSrc ? (
             <img src={photoSrc} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
           ) : (
             <div style={{ width: '100%', height: '100%', background: `linear-gradient(45deg, #18181b, ${color}22)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', opacity: 0.3 }}>
                   <div style={{ fontSize: '2.5rem' }}>👤</div>
                   <div style={{ fontSize: '0.7rem', marginTop: '0.5rem', fontWeight: 600 }}>PHOTO SECURE</div>
                </div>
             </div>
           )}
           <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', padding: '0.5rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#000' }}>{name}</div>
                <div style={{ fontSize: '0.6rem', opacity: 0.6, marginBottom: '0.5rem', color: '#000' }}>AUTHORIZED PERSONNEL ONLY</div>
               
               {bioPoints.length > 0 && (
                 <div style={{ 
                   textAlign: 'left', 
                   borderTop: '1px solid rgba(0,0,0,0.1)', 
                   paddingTop: '0.5rem', 
                   marginTop: '0.2rem' 
                 }}>
                   {bioPoints.map((point, i) => (
                     <div key={i} style={{ 
                       fontSize: '0.65rem', 
                       color: '#27272a', 
                       display: 'flex', 
                       gap: '0.4rem', 
                       marginBottom: '0.2rem',
                       lineHeight: 1.2
                     }}>
                       <span style={{ color: color }}>•</span>
                       <span>{point}</span>
                     </div>
                   ))}
                 </div>
               )}
            </div>
        </div>
      </motion.div>
  );
}
