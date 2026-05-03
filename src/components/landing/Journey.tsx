
import ScrollReveal from '../animations/ScrollReveal';

const JOURNEY = [
  { act: 'ACT I', title: 'THE ENTRY.', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>', final: false, desc: 'A sealed perimeter. You search. You join. You are now inside the digital college space.' },
  { act: 'ACT II', title: 'THE CORE.', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>', final: false, desc: 'Thoughts are posted. Friction happens. In the noise, micro-groups begin to form.' },
  { act: 'ACT III', title: 'THE NETWORK.', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>', final: false, desc: 'The content fades into the background. Pure relationships start to take over.' },
  { act: 'ACT IV', title: 'THE TRIGGER.', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>', final: true, desc: 'The digital illusion shatters. The network demands to meet in the real world.' },
];

export default function Journey() {
  return (
    <section id="journey">
      <ScrollReveal className="j-title">
        <span className="kicker a">The Architecture of Trust</span>
        <div className="sec-title">THE SEQUENCE.</div>
      </ScrollReveal>
      <div className="j-track">
        <div className="j-spine"></div>
        <div id="jrows">
          {JOURNEY.map((j, i) => (
            <ScrollReveal key={i} className="j-item" delay={i * 0.12}>
              <div className="j-node"><div className="j-dot"></div></div>
              <div className={`j-icon${j.final ? ' final' : ''}`} dangerouslySetInnerHTML={{ __html: j.icon }}></div>
              <div className="j-body">
                <div className="j-act">{j.act}</div>
                <div className="j-head">{j.title}</div>
                <p className="j-desc">{j.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
