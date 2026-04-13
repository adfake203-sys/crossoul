import { motion } from 'framer-motion'
import RotatingText from '../animations/RotatingText'
import SplitBlurText from '../animations/SplitBlurText'

interface Props {
  // onJoin removed as requested
}

export default function LiquidHero({}: Props) {
  return (
    <section className="hero-content">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >

        
        <div className="hero-title-container" style={{ margin: '2rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3em' }}>
            <SplitBlurText 
                text="CROSSOUL" 
                style={{ 
                    fontFamily: 'var(--font-heading)', 
                    fontSize: 'clamp(4rem, 15vw, 10rem)', 
                    fontWeight: 950, 
                    letterSpacing: '-6px' 
                }} 
            />
            <SplitBlurText 
                text="for" 
                style={{ 
                    fontFamily: 'var(--font-heading)', 
                    fontSize: 'clamp(1rem, 3vw, 2.5rem)', 
                    opacity: 0.5, 
                    fontWeight: 600,
                    letterSpacing: '-1px'
                }} 
            />
          </div>
          
          <RotatingText 
            texts={['students.', 'business owners.', 'entrepreneurs.', 'employees.', 'people who want FUN.']} 
            style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: 'clamp(1.5rem, 5vw, 4rem)', 
                fontWeight: 800, 
                color: '#a5b4fc', 
                marginTop: '0.5rem',
                letterSpacing: '-1.5px'
            }} 
          />
          <p style={{ 
            fontFamily: 'var(--font-body)',
            color: '#71717a', 
            fontSize: '1.2rem', 
            marginTop: '1.5rem', 
            fontWeight: 500, 
            opacity: 0.8,
            letterSpacing: '-0.2px'
          }}>
            Build your ecosystem. Meet your tribe. Go offline.
          </p>
        </div>
        


        {/* Join button removed as requested */}
      </motion.div>
    </section>
  )
}
