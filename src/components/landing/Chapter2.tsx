
import ScrollReveal from '../animations/ScrollReveal';
import Tile from './Tile';

const CH2_DATA = [
  { icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>', title: 'Focused Groups', desc: 'Around 20 participants ensure meaningful interaction and diversity without the noise of a crowd.', deep: 'Cognitive limit research suggests 20 is the sweet spot for deep, democratic engagement where every voice is audible.' },
  { icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a5 5 0 0 1 5 5c0 1.5-.6 2.8-1.5 3.8A5 5 0 0 1 17 15c0 2.2-1.3 4.1-3.2 5H10.2C8.3 19.1 7 17.2 7 15a5 5 0 0 1 1.5-3.6A5 5 0 0 1 7 7a5 5 0 0 1 5-5z"/><line x1="12" y1="12" x2="12" y2="17"/></svg>', title: 'Zero Anxiety', desc: 'Present your idea without extreme time pressure in an environment designed for clarity and openness.', deep: 'By removing formal judging panels, we switch the brain from survival mode (competition) to creative mode (contribution).' },
  { icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>', title: 'The Evolution Loop', desc: '19 collective evaluators ask, challenge, and refine. Your idea evolves through 19 different perspectives.', deep: 'It\'s not about validation — it\'s about refinement. Each perspective adds a new layer of resilience to your concept.' },
];

export default function Chapter2() {
  return (
    <div className="ch" id="ch2" data-sl="03 Resonance">
      <ScrollReveal className="ch-header">
        <span className="kicker g">Chapter II</span>
        <div className="ch-title">The Protocol of <span className="g">Resonance</span>.</div>
        <p className="ch-sub">Crossoul removes centralized authority and replaces it with collective intelligence.</p>
      </ScrollReveal>
      <div className="tgrid">
        {CH2_DATA.map((d, i) => (
          <Tile key={i} d={d} />
        ))}
      </div>
    </div>
  );
}
