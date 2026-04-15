import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeoHead from '../lib/SeoHead';

const KISHAN_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Kishan Kasula',
  jobTitle: 'CEO',
  url: 'https://crossoul.com/kishan-kasula',
  image: 'https://crossoul.com/ceo.jpg',
  sameAs: [
    'https://www.linkedin.com/in/kishankasula',
    'https://crossoul.com',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Crossoul',
    url: 'https://crossoul.com',
  },
  description:
    'Kishan Kasula is the CEO and Founder of Crossoul, a platform where ideas evolve into real-world communities. He is the visionary behind the Crossoul ecosystem.',
};

export default function KishanKasulaPage() {
  return (
    <>
      <SeoHead
        title="Kishan Kasula | CEO & Founder of Crossoul"
        description="Kishan Kasula is the CEO and Founder of Crossoul, a platform where ideas evolve into real-world communities. Visionary behind the Crossoul ecosystem."
        ogTitle="Kishan Kasula | CEO & Founder of Crossoul"
        ogDescription="Kishan Kasula is the CEO and Founder of Crossoul, a platform where ideas evolve into real-world communities."
        ogImage="https://crossoul.com/ceo.jpg"
        ogUrl="https://crossoul.com/kishan-kasula"
        jsonLd={KISHAN_JSON_LD}
      />

      <div style={{
        minHeight: '100vh',
        background: '#080808',
        color: '#f0f0f0',
        fontFamily: "'Inter', system-ui, sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle radial gradient top */}
        <div style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,255,255,0.05) 0%, transparent 70%)',
        }} />

        {/* Horizontal rule top accent */}
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: '1px', zIndex: 20,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 70%, transparent 100%)',
        }} />

        {/* Nav */}
        <nav style={{
          position: 'relative', zIndex: 10,
          padding: '1.75rem 2.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <Link to="/" style={{
            display: 'flex', alignItems: 'center', gap: '0.6rem',
            color: 'rgba(240,240,240,0.45)', textDecoration: 'none',
            fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.05em',
            textTransform: 'uppercase', transition: 'color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = '#f0f0f0')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240,240,240,0.45)')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Crossoul
          </Link>
          <span style={{
            fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'rgba(240,240,240,0.2)',
          }}>
            Founder
          </span>
        </nav>

        <main style={{
          position: 'relative', zIndex: 10,
          maxWidth: 960,
          margin: '0 auto',
          padding: 'clamp(3rem, 8vw, 7rem) clamp(1.5rem, 4vw, 2.5rem)',
        }}>

          {/* — Hero — */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: 'clamp(2rem, 5vw, 4rem)',
              alignItems: 'flex-start',
              paddingBottom: '4rem',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              marginBottom: '4rem',
            }}
          >
            {/* Photo */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                width: 'clamp(100px, 16vw, 160px)',
                height: 'clamp(100px, 16vw, 160px)',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 0 0 4px rgba(255,255,255,0.03), 0 20px 60px rgba(0,0,0,0.6)',
              }}>
                <img
                  src="/ceo.jpg"
                  alt="Kishan Kasula"
                  width={400}
                  height={400}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', filter: 'grayscale(0.15)' }}
                />
              </div>
            </div>

            {/* Text */}
            <div style={{ paddingTop: '0.5rem' }}>
              <p style={{
                fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'rgba(240,240,240,0.35)',
                margin: '0 0 1rem',
              }}>
                CEO &nbsp;&amp;&nbsp; Founder
              </p>

              <h1 style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                fontWeight: 700, lineHeight: 1.05,
                margin: '0 0 1.25rem',
                background: 'linear-gradient(160deg, #ffffff 0%, #a0a0a0 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                letterSpacing: '-0.02em',
              }}>
                Kishan Kasula
              </h1>

              <p style={{
                fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
                color: 'rgba(240,240,240,0.55)',
                lineHeight: 1.8, margin: '0 0 2rem', maxWidth: 520,
                fontWeight: 400,
              }}>
                Kishan Kasula is the CEO and Founder of Crossoul — a platform where ideas evolve 
                into real-world communities. Raised in a tier-2 city with a lot to say and nowhere 
                to say it, he founded Crossoul to give every ambitious young person a place to 
                express, refine, and ultimately connect offline. Under his leadership, Crossoul 
                is building the social infrastructure that millions of young Indians have been 
                waiting for.
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a
                  href="https://www.linkedin.com/in/kishankasula"
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.65rem 1.4rem',
                    background: '#ffffff',
                    color: '#080808',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontSize: '0.8rem', fontWeight: 600,
                    letterSpacing: '0.04em',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                  LinkedIn
                </a>
                <Link to="/" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.65rem 1.4rem',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(240,240,240,0.55)',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontSize: '0.8rem', fontWeight: 500,
                  letterSpacing: '0.04em',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#f0f0f0'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(240,240,240,0.55)'; }}
                >
                  crossoul.com
                </Link>
              </div>
            </div>
          </motion.div>

          {/* — Stats row — */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0',
              marginBottom: '4rem',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '6px',
              overflow: 'hidden',
            }}
          >
            {[
              { label: 'Role', value: 'CEO' },
              { label: 'Company', value: 'Crossoul' },
              { label: 'Focus', value: 'Ecosystem' },
            ].map((item, i) => (
              <div key={item.label} style={{
                padding: '2rem 1.75rem',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                background: i === 1 ? 'rgba(255,255,255,0.02)' : 'transparent',
              }}>
                <p style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,240,240,0.3)', margin: '0 0 0.5rem', fontWeight: 500 }}>{item.label}</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#f0f0f0', margin: 0, letterSpacing: '-0.01em' }}>{item.value}</p>
              </div>
            ))}
          </motion.div>

          {/* — Detail cards — */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1px',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '6px',
              overflow: 'hidden',
              marginBottom: '4rem',
            }}
          >
            {[
              { label: 'Mission', text: 'Turn ambition into action — connecting people offline around shared ideas and lived experience.' },
              { label: 'Origin', text: 'A tier-2 city founder who saw the gap first-hand. Built the platform he needed but no one created.' },
              { label: 'Vision', text: 'Every idea deserves a real-world community. Crossoul is the infrastructure for that future.' },
            ].map(item => (
              <div key={item.label} style={{ padding: '2rem 1.75rem', background: '#080808' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 600, color: 'rgba(240,240,240,0.3)', textTransform: 'uppercase', letterSpacing: '0.14em', margin: '0 0 0.75rem' }}>{item.label}</p>
                <p style={{ fontSize: '0.95rem', color: 'rgba(240,240,240,0.6)', lineHeight: 1.7, margin: 0, fontWeight: 400 }}>{item.text}</p>
              </div>
            ))}
          </motion.div>

          {/* — About Crossoul — */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              padding: 'clamp(2rem, 4vw, 3rem)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '6px',
              background: 'rgba(255,255,255,0.02)',
              marginBottom: '2rem',
            }}
          >
            <p style={{ fontSize: '0.7rem', fontWeight: 600, color: 'rgba(240,240,240,0.3)', textTransform: 'uppercase', letterSpacing: '0.14em', margin: '0 0 1rem' }}>About Crossoul</p>
            <p style={{ fontSize: '1rem', color: 'rgba(240,240,240,0.6)', lineHeight: 1.8, margin: '0 0 1rem', fontWeight: 400 }}>
              <strong style={{ color: '#f0f0f0', fontWeight: 600 }}>Crossoul is a platform where ideas turn into real-world communities.</strong>{' '}
              Express thoughts, refine them through peer resonance, and connect offline. Built for 
              students and young professionals in emerging Indian cities. Co-founded with{' '}
              <Link to="/aditya-phanidar-vungarala" style={{ color: '#f0f0f0', textDecoration: 'underline', textUnderlineOffset: '3px', textDecorationColor: 'rgba(255,255,255,0.3)' }}>
                Aditya Phanidar Vungarala
              </Link>.
            </p>
            <Link to="/" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              fontSize: '0.85rem', fontWeight: 500, color: 'rgba(240,240,240,0.45)',
              textDecoration: 'none', transition: 'color 0.2s', letterSpacing: '0.02em',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f0f0f0')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240,240,240,0.45)')}
            >
              Visit Crossoul
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </motion.div>

        </main>

        <footer style={{
          position: 'relative', zIndex: 10,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '1.75rem 2.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '0.5rem',
        }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(240,240,240,0.2)', margin: 0 }}>
            Kishan Kasula — CEO &amp; Founder of <a href="https://crossoul.com" style={{ color: 'inherit', textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.2)' }}>Crossoul</a>
          </p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(240,240,240,0.2)', margin: 0 }}>
            &copy; {new Date().getFullYear()} Crossoul
          </p>
        </footer>
      </div>
    </>
  );
}
