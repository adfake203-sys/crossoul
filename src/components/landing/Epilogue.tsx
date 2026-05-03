import { useState, useRef } from 'react';

import ScrollReveal from '../animations/ScrollReveal';

const EPI = [
  { icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.96 4.96 0 0 0 18 8a6 6 0 0 0-12 0c0 1.35.51 2.58 1.5 3.5.76.76 1.23 1.52 1.41 2.5"/></svg>', title: 'Incubation Pathway', desc: 'Selected resonant ideas are forwarded to partnered incubation cells for mentorship and potential seed funding.', deep: 'Our partners include early-stage VCs and academic incubation centers that specialize in non-linear innovation.' },
  { icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>', title: 'Internship Access', desc: 'Participants access exclusive internships through the Crossoul network to gain practical collaborative experience.', deep: 'Work with startups and social enterprises that value collective thinking over traditional hierarchy.' },
  { icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>', title: 'Collaborative Networks', desc: 'Form lasting connections with peers who resonate with your vision beyond the session.', deep: 'Access a private circle where the 20-Mind protocol continues to evolve your future concepts.' },
  { icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.5-1.5 4 0 4s4-1.5 4-4M12 3c0 0-4 2-5 8l5 5c6-1 8-5 8-5L12 3z"/><circle cx="15" cy="9" r="1"/><path d="M3 21l4-4"/></svg>', title: 'Execution Support', desc: 'We bridge the gap between discussion and reality, helping improved ideas find their highest potential.', deep: 'From POC development to market-ready refinement, the Crossoul team supports the Refined Idea Sheet journey.' },
];

export default function Epilogue() {
  const [active, setActive] = useState(0);
  const [holding, setH] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = () => { t.current = setTimeout(() => setH(true), 380); };
  const end = () => { if (t.current) clearTimeout(t.current); setH(false); };

  const a = EPI[active];
  
  const positions = [
    { top: '6%', left: '50%', tx: '-50%', ty: '0%' },
    { top: '50%', left: '94%', tx: '-100%', ty: '-50%' },
    { top: '94%', left: '50%', tx: '-50%', ty: '-100%' },
    { top: '50%', left: '6%', tx: '0%', ty: '-50%' },
  ];

  return (
    <div className="ch" id="epilogue" data-sl="06 Epilogue">
      <ScrollReveal className="ch-header">
        <span className="kicker g">Epilogue</span>
        <div className="ch-title">The Execution <span className="g">Bridge</span>.</div>
        <p className="ch-sub">What happens after the circle closes.</p>
      </ScrollReveal>
      <div className="epi-layout">
        <div className="wheel-wrap">
          <div className="wheel-center-glow"></div>
          <div className="wheel-ring"></div>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', pointerEvents: 'none' }}>
            <div style={{ fontFamily: 'var(--fh)', fontSize: 'clamp(.6rem,1.5vw,.75rem)', fontWeight: 900, color: 'var(--gold)', opacity: .5, letterSpacing: '2px', textTransform: 'uppercase' }}>THE<br/>BRIDGE</div>
          </div>
          {EPI.map((item, i) => {
            const pos = positions[i];
            const isAct = active === i;
            return (
              <div 
                key={i}
                onClick={() => setActive(i)}
                style={{
                  position: 'absolute',
                  top: pos.top,
                  left: pos.left,
                  transform: `translate(${pos.tx},${pos.ty})`,
                  zIndex: 2,
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  width: 'clamp(52px,10vw,64px)',
                  height: 'clamp(52px,10vw,64px)',
                  borderRadius: '16px',
                  border: isAct ? '1.5px solid var(--gold)' : '1px solid rgba(255,255,255,.1)',
                  background: isAct ? 'rgba(212,175,55,.14)' : 'rgba(255,255,255,.025)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isAct ? 'var(--gold)' : 'rgba(255,255,255,.5)',
                  boxShadow: isAct ? '0 0 22px rgba(212,175,55,.22)' : 'none',
                  transition: 'all .3s',
                  transform: isAct ? 'scale(1.15)' : 'scale(1)',
                }} dangerouslySetInnerHTML={{ __html: item.icon }}></div>
                <div style={{
                  textAlign: 'center',
                  fontSize: '.55rem',
                  fontWeight: 800,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: isAct ? 'var(--gold)' : 'rgba(255,255,255,.25)',
                  marginTop: '.35rem',
                  maxWidth: '70px',
                  lineHeight: 1.2,
                }}>{item.title.split(' ')[0]}</div>
              </div>
            );
          })}
        </div>
        <div 
          className="epi-panel" 
          onMouseDown={start} 
          onMouseUp={end} 
          onMouseLeave={end} 
          onTouchStart={start} 
          onTouchEnd={end}
        >
          <div className="epi-icon" dangerouslySetInnerHTML={{ __html: a.icon }}></div>
          <div className="epi-name">{a.title}</div>
          <div className="epi-desc">{a.desc}</div>
          <div className="epi-hint" style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
            HOLD TO REVEAL 
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
          <div className={`epi-reveal${holding ? ' on' : ''}`}>
            <div className="epi-rev-l">Strategic Insight</div>
            <div className="epi-rev-t">{a.deep}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
