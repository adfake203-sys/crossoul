
import ScrollReveal from '../animations/ScrollReveal';
import Tile from './Tile';

const CH1_DATA = [
  { id: '01', title: 'The Recognition Trap', desc: 'Hundreds of participants compete, but only a few are recognized. Potential is often lost in the noise.', deep: 'When 90% of ideas are discarded at the gates, ecosystems lose their most diverse innovations. Crossoul ensures no thought is left behind.' },
  { id: '02', title: 'Performance Anxiety', desc: 'Strict time limits create pressure, making participants nervous and hiding their best ideas.', deep: 'Brilliant thinkers are often silenced by the stage. We remove the performance and focus entirely on the logic of the thought itself.' },
  { id: '03', title: 'The Panel Bias', desc: 'A small panel of judges decides outcomes, influenced by subjective factors, perspective, and bias.', deep: 'No small group can mirror the wisdom of the crowd. We replace singular judgment with collective resonance.' },
];

export default function Chapter1() {
  return (
    <div className="ch" id="ch1" data-sl="02 Dead End">
      <div className="ch1-grid">
        <ScrollReveal className="ch1-intro">
          <span className="kicker r">Chapter I</span>
          <div className="ch-title">The <span className="r">Dead End</span><br/>of Competition.</div>
          <p>Traditional ideathons focus more on winning than on improving ideas. They create a system where potentially strong thoughts are overlooked.</p>
        </ScrollReveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {CH1_DATA.map((d, i) => (
            <Tile key={i} d={d} red={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
