
import ScrollReveal from '../animations/ScrollReveal';
import Tile from './Tile';

const CH4_DATA = [
  { title: 'Refined Idea Sheet', desc: 'Participants rewrite their idea after incorporating 19 perspectives. Captures the before-vs-after evolution.', deep: 'Serves as proof of evolution, showing exactly how a concept became more resilient through collective stress-testing.' },
  { title: 'Peer Recognition Sheet', desc: 'A democratic vote for the most innovative thought. Surfaces resonance, not just "winning".', deep: 'By removing centralized judging, the winner is determined by those who actually engaged with the thought.' },
];

export default function Chapter4() {
  return (
    <div className="ch" id="ch4" data-sl="05 Recognition">
      <div className="ch4-grid">
        <ScrollReveal>
          <span className="kicker g">Chapter IV</span>
          <div className="ch-title">The Science of <span className="g">Recognition</span>.</div>
          <p style={{ color: 'rgba(255,255,255,.5)', fontSize: '1.05rem', marginTop: '1.5rem', lineHeight: 1.65, maxWidth: '440px' }}>
            At the end of each session, the evolution of an idea is made tangible through two formal sheets.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '3rem' }}>
            {CH4_DATA.map((d, i) => (
              <Tile key={i} d={d} />
            ))}
          </div>
        </ScrollReveal>
        <ScrollReveal className="shift-box">
          <div className="shift-item dim">
            <div className="shift-label" style={{ color: 'rgba(255,255,255,.35)' }}>Traditional</div>
            <div className="shift-text" style={{ color: 'rgba(255,255,255,.5)' }}>"Who deserves to win?"</div>
          </div>
          <div className="shift-divider"></div>
          <div className="shift-item">
            <div className="shift-label" style={{ color: 'var(--gold)' }}>Crossoul</div>
            <div className="shift-text" style={{ color: '#fff', fontSize: '1.4rem', fontFamily: 'var(--fh)', fontWeight: 900, letterSpacing: '-1px' }}>
              "How can every idea reach its highest potential?"
            </div>
          </div>
          <div className="shift-bottom">
            <div className="shift-stat">
              <div style={{ color: 'var(--gold)', marginBottom: '.6rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              </div>
              <div>Improved Ideas &amp; Collaborative Networks</div>
            </div>
            <div className="shift-stat">
              <div style={{ color: 'var(--gold)', marginBottom: '.6rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
              </div>
              <div>Incubation Pathways &amp; Internships</div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
