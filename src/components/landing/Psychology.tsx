
import ScrollReveal from '../animations/ScrollReveal';

export default function Psychology() {
  return (
    <section id="psychology" data-sl="04 Psychology">
      <div className="ch">
        <ScrollReveal className="ch-header">
          <span className="kicker g">Chapter III</span>
          <div className="ch-title">Channeling the <span className="g" style={{ fontStyle: 'italic', fontWeight: 400 }}>Human Drive.</span></div>
        </ScrollReveal>
        <div className="psy-grid">
          <ScrollReveal className="psy-orb">
            <div className="psy-ring">
              <div className="psy-ring-pulse"></div>
              <div className="psy-ego">EGO</div>
              <div className="psy-orb-lbl" style={{ top: '-14%', left: '50%', transform: 'translateX(-50%)' }}>EXPRESSION</div>
              <div className="psy-orb-lbl" style={{ bottom: '-14%', left: '50%', transform: 'translateX(-50%)' }}>BELONGING</div>
            </div>
          </ScrollReveal>
          <ScrollReveal className="psy-t">
            <p style={{ color: 'rgba(255,255,255,.8)', fontSize: 'clamp(1rem,1.8vw,1.3rem)', lineHeight: 1.6 }}>
              Crossoul leverages two key human tendencies: <span style={{ color: 'var(--gold)' }}>the desire to stand out</span> and <span style={{ color: 'var(--gold)' }}>the desire to belong</span>.
            </p>
            <p style={{ color: 'rgba(255,255,255,.48)', fontSize: '1rem', lineHeight: 1.7, marginTop: '1.5rem' }}>
              Instead of letting ego create competition, Crossoul channels it into thoughtful feedback and meaningful participation.
            </p>
            <div className="block-quote">
              <p className="bq-text">"Motivation is shifted from simply speaking — to adding insight."</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
