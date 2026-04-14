import { motion } from 'framer-motion'
import { MessageSquare, Zap, MapPin } from 'lucide-react'
import SpotlightCard from '../animations/SpotlightCard'
import CardSwap from '../animations/CardSwap'

export default function JourneySection() {

  return (
    <motion.div 
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0 },
        show: { 
          opacity: 1, 
          transition: { 
            staggerChildren: 0.2
          } 
        }
      }}
      style={{ textAlign: 'center', marginBottom: '4rem', padding: '0 1rem' }}
    >
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', marginBottom: '1rem' }}>
        THE 3-STEP FLOW.
      </h2>
      <p style={{ color: '#71717a', fontSize: '1.2rem', maxWidth: '600px', margin: '1rem auto' }}>
        From raw narrative to real-world resonance. This is how we take your thoughts offline.
      </p>

      <div style={{ marginTop: '4rem' }}>
        <CardSwap>
        <SpotlightCard className="journey-step" style={{ background: '#18181b', height: '100%' }}>
          <div className="step-icon-wrapper">
            <MessageSquare size={32} />
          </div>
          <h3 className="step-title">1. Express</h3>
          <p className="step-desc">
            Share your deepest thoughts and wild ideas freely in a mindful space. No prejudice, just your raw narrative.
          </p>
        </SpotlightCard>

        <SpotlightCard className="journey-step" style={{ background: '#18181b', height: '100%' }}>
          <div className="step-icon-wrapper">
            <Zap size={32} />
          </div>
          <h3 className="step-title">2. Resonate</h3>
          <p className="step-desc">
            Connect with minds that vibrate at your frequency. When thoughts align, the resonance builds momentum.
          </p>
        </SpotlightCard>

        <SpotlightCard className="journey-step" style={{ background: '#18181b', height: '100%' }}>
          <div className="step-icon-wrapper">
            <MapPin size={32} />
          </div>
          <h3 className="step-title">3. Connect</h3>
          <p className="step-desc">
            Take the best digital conversations offline. Step out of the screen and into authentic real-world encounters.
          </p>
        </SpotlightCard>
      </CardSwap>
      </div>
    </motion.div>
  )
}
