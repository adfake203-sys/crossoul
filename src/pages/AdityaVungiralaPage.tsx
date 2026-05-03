import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeoHead from '../lib/SeoHead';

const ADITYA_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Aditya Phanidar Vungarala',
  jobTitle: 'CTO and Co-Founder',
  url: 'https://crossoul.com/aditya-phanidar-vungarala',
  image: 'https://crossoul.com/aditya-phanidar-vungarala.jpg',
  sameAs: [
    'https://www.linkedin.com/in/aditya-vungarala-813163291',
    'https://crossoul.com',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Crossoul',
    url: 'https://crossoul.com',
  },
  description:
    'Aditya Phanidar Vungarala is the CTO and Co-Founder of Crossoul, a platform where ideas evolve into real-world communities.',
};

export default function AdityaVungiralaPage() {
  return (
    <>
      <SeoHead
        title="Aditya Phanidar Vungarala | CTO and Co-Founder of Crossoul"
        description="Aditya Phanidar Vungarala is the CTO and Co-Founder of Crossoul, a platform where ideas evolve into real-world communities."
        ogTitle="Aditya Phanidar Vungarala | CTO and Co-Founder of Crossoul"
        ogDescription="Aditya Phanidar Vungarala is the CTO and Co-Founder of Crossoul, a platform where ideas evolve into real-world communities."
        ogImage="https://crossoul.com/aditya-phanidar-vungarala.jpg"
        ogUrl="https://crossoul.com/aditya-phanidar-vungarala"
        canonical="https://crossoul.com/aditya-phanidar-vungarala"
        jsonLd={ADITYA_JSON_LD}
      />

      <div className="profile-page">
        <div className="profile-glow" />
        <nav className="profile-nav">
          <Link to="/" className="profile-back">Crossoul</Link>
          <span>Co-Founder</span>
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
                src="/aditya-phanidar-vungarala.jpg"
                alt="Aditya Phanidar Vungarala"
                width={400}
                height={400}
                className="profile-photo"
              />
            </div>

            <div>
              <p className="profile-kicker">CTO and Co-Founder</p>
              <h1>Aditya Phanidar Vungarala</h1>
              <p className="profile-lede">
                Aditya Phanidar Vungarala is the CTO and Co-Founder of Crossoul, a platform where ideas evolve into real-world communities.
              </p>
              <p className="profile-bio">
                Aditya works across product, engineering, and technical architecture for Crossoul. As CTO and Co-Founder, his focus is building the systems that let people express raw ideas, refine them through community resonance, and move meaningful connections offline. Crossoul is designed for students and young professionals in emerging Indian cities who need more than another feed. It gives their thoughts a path toward real conversations, real circles, and real-world community.
              </p>
              <div className="profile-actions">
                <a href="https://www.linkedin.com/in/aditya-vungarala-813163291" target="_blank" rel="noopener noreferrer">LinkedIn</a>
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
              <strong>CTO and Co-Founder</strong>
            </article>
            <article>
              <span>Principle</span>
              <strong>Digital expression should create offline connection.</strong>
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
              Built by <Link to="/kishan-kasula">Kishan Kasula</Link> and Aditya Phanidar Vungarala.
            </p>
          </motion.section>
        </main>
      </div>
    </>
  );
}
