
import ScrollReveal from '../animations/ScrollReveal';
import MagneticButton from '../layout/MagneticButton';

interface ThreadsHeroProps {
  onJoinWaitlist: () => void;
}

export default function ThreadsHero({ onJoinWaitlist }: ThreadsHeroProps) {
  return (
    <section id="th-hero" data-sl="01 Vision">
      <ScrollReveal className="kicker g" style={{ letterSpacing: '6px' }}>
        Thread of Thoughts — The Manifesto
      </ScrollReveal>
      <ScrollReveal className="th-wm wm-gold">
        A New Model<br/>for <em style={{ fontStyle: 'italic', fontWeight: 400 }}>Idea Evolution.</em>
      </ScrollReveal>
      <ScrollReveal className="th-div"></ScrollReveal>
      <ScrollReveal className="th-p" style={{ maxWidth: '680px', margin: '0 auto', fontSize: 'clamp(1rem, 2.2vw, 1.5rem)', color: 'rgba(255,255,255,.65)', lineHeight: 1.55, fontWeight: 500 }}>
        Crossoul is built on a simple but powerful belief:<br/>
        <span style={{ color: '#fff' }}>Ideas grow better through collective thinking than through competitive judgment.</span>
      </ScrollReveal>
      <ScrollReveal style={{ marginTop: '3rem' }}>
        <MagneticButton className="btn btn-g" onClick={onJoinWaitlist}>
          Enter the Circle
        </MagneticButton>
      </ScrollReveal>
      <ScrollReveal className="th-scroll">
        SCROLL TO UNLOCK THE VISION
      </ScrollReveal>
      <div className="scroll-hint" style={{ color: 'var(--gold)' }}>
        <div className="sh-line"></div>
        <span>explore</span>
      </div>
    </section>
  );
}
