import { useState, useRef } from 'react';

import ScrollReveal from '../animations/ScrollReveal';

const PROBLEMS = [
  { kicker: 'Problem 1', title: 'Lack of Freedom of Expression.', desc: 'Students fear college authorities and peer judgment. With no safe space to talk openly, opinions are suppressed and discussions never happen.', solution: 'A semi-private campus space where students can speak freely.', r: false },
  { kicker: 'Problem 2', title: 'Fragmented Communities.', desc: 'Students are scattered across WhatsApp groups, Instagram, and random chats. No central hub means no unified community and no discoverability.', solution: 'A single digital campus where everyone is discoverable.', r: true },
  { kicker: 'Problem 3', title: 'Weak Real Connections.', desc: 'Students interact online but rarely meet offline. Platforms keep everything digital, leading to shallow connections with no real friendships.', solution: 'Turning online interactions into real-life meetups.', r: false },
  { kicker: 'Problem 4', title: 'Awkward Networking.', desc: 'Meeting new people is awkward and no platform organises it organically. Students don\'t know where to go or how to meet.', solution: 'A natural, interest-based way to meet people.', r: true },
  { kicker: 'Problem 5', title: 'Missed Opportunities.', desc: 'Students and entrepreneurs struggle to find co-founders, collaborators, and opportunities. Everything is random and luck-based.', solution: 'A network where opportunities emerge from conversations.', r: false },
  { kicker: 'Problem 6', title: 'Digital-Physical Divide.', desc: 'Social apps are online only, business apps are transactional. No connection between digital conversations and real-world actions.', solution: 'The bridge between online communities and offline experiences.', r: true },
];

function ProblemItem({ p }: { p: any }) {
  const [holding, setH] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = () => {
    t.current = setTimeout(() => setH(true), 280);
  };
  const end = () => {
    if (t.current) clearTimeout(t.current);
    setH(false);
  };

  return (
    <div className={`prob${p.r ? ' r' : ''}`}>
      <div 
        className="prob-inner" 
        onMouseDown={start} 
        onMouseUp={end} 
        onMouseLeave={end} 
        onTouchStart={start} 
        onTouchEnd={end}
      >
        <div className="prob-k">{p.kicker}</div>
        <h2 className="prob-t">{p.title}</h2>
        <p className="prob-d">{p.desc}</p>
        <div className="prob-hint">[Hold to Reveal Solution]</div>
        <div className={`prob-sol${holding ? ' on' : ''}`}>
          <div className="sol-l">We Solve This</div>
          <div className="sol-t">"{p.solution}"</div>
        </div>
      </div>
    </div>
  );
}

export default function Manifesto() {
  return (
    <section id="manifesto">
      <ScrollReveal className="mf-center">
        <span className="kicker a">The Vision</span>
        <div className="mf-big wm">THE BIG ONE.</div>
        <p className="mf-sub">Students don't have a safe, campus-level space to express and connect. Reddit is anonymous. LinkedIn is formal. There is no middle ground.</p>
        <div className="result-pill">Result: No true "campus voice."</div>
      </ScrollReveal>

      <div className="probs" id="probs">
        {PROBLEMS.map((p, i) => (
          <ScrollReveal key={i}>
             <ProblemItem p={p} />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="bridge">
        <span className="kicker a">The Final Insight</span>
        <div className="bridge-big wm">THE BRIDGE.</div>
        <p className="bridge-sub">Bridging the gap between a conversation on a phone and an experience in the real world.</p>
        <div className="bridge-row">
          <div className="bnode"><div className="bnode-l">FROM</div><div className="bnode-v" style={{ color: '#fff' }}>DIGITAL</div></div>
          <div className="barrow">→</div>
          <div className="bnode"><div className="bnode-l">TO</div><div className="bnode-v" style={{ color: 'var(--gold)' }}>PHYSICAL</div></div>
        </div>
      </ScrollReveal>
    </section>
  );
}
