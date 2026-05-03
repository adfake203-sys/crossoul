import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeoHead from '../lib/SeoHead';

const KISHAN_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Kishan Kasula',
  jobTitle: 'CEO and Founder',
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
    'Kishan Kasula is the CEO and Founder of Crossoul, a platform where ideas evolve into real-world communities.',
};

export default function KishanKasulaPage() {
  return (
    <>
      <SeoHead
        title="Kishan Kasula | CEO and Founder of Crossoul"
        description="Kishan Kasula is the CEO and Founder of Crossoul, a platform where ideas evolve into real-world communities."
        ogTitle="Kishan Kasula | CEO and Founder of Crossoul"
        ogDescription="Kishan Kasula is the CEO and Founder of Crossoul, a platform where ideas evolve into real-world communities."
        ogImage="https://crossoul.com/ceo.jpg"
        ogUrl="https://crossoul.com/kishan-kasula"
        canonical="https://crossoul.com/kishan-kasula"
        jsonLd={KISHAN_JSON_LD}
      />

      <div className="profile-page">
        <div className="profile-glow" />
        <nav className="profile-nav">
          <Link to="/" className="profile-back">Crossoul</Link>
          <span>Founder</span>
        </nav>

        <main className="profile-shell">
          <motion.section
            className="profile-hero"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="profile-photo-wrap">
              <img
                src="/ceo.jpg"
                alt="Kishan Kasula"
                width={400}
                height={400}
                className="profile-photo"
              />
            </div>

            <div>
              <p className="profile-kicker">CEO and Founder</p>
              <h1>Kishan Kasula</h1>
              <p className="profile-lede">
                Kishan Kasula is the CEO and Founder of Crossoul, a platform where ideas evolve into real-world communities.
              </p>
              <p className="profile-bio">
                Kishan built the philosophy behind Crossoul from a simple observation: ambitious young people often have meaningful ideas but no real place to express, refine, and act on them. Crossoul gives those ideas a path from raw thought to peer resonance to offline circles. His focus is shaping Crossoul into social infrastructure for students, creators, and young professionals across emerging Indian cities.
              </p>
              <div className="profile-actions">
                <a href="https://www.linkedin.com/in/kishankasula" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <Link to="/">Visit Crossoul</Link>
              </div>
            </div>
          </motion.section>

          <motion.section
            className="profile-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            <article>
              <span>Company</span>
              <strong>Crossoul</strong>
            </article>
            <article>
              <span>Focus</span>
              <strong>Ecosystem vision</strong>
            </article>
            <article>
              <span>Principle</span>
              <strong>Every strong idea deserves a real-world community.</strong>
            </article>
          </motion.section>

          <motion.section
            className="profile-note"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>
              <strong>Crossoul is a platform where ideas turn into real-world communities.</strong>{' '}
              Built by Kishan Kasula and <Link to="/aditya-phanidar-vungarala">Aditya Phanidar Vungarala</Link>.
            </p>
          </motion.section>
        </main>
      </div>
    </>
  );
}
