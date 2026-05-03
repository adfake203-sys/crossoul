import { useState, useEffect, useRef } from 'react';

import ScrollReveal from './ScrollReveal';
import MagneticButton from '../layout/MagneticButton';

const MVP_LABELS = ['IDEA', 'PLANNING', 'DISCUSSION', 'SAME VIBE', 'BUILD TOGETHER'];
const COMEDY_ERRORS = [
  "You just tried to build a unicorn without a horn. Let's try that again.",
  "Skipping steps? That's how we end up with 'Coming Soon' forever.",
  "Trying to build together without a vibe check? Error 404: Synergy Not Found.",
  "Woah! You're building a rocket with no fuel. Planning is key, buddy.",
  "The IDEA node is lonely. Start there.",
];

interface Node {
  id: number;
  x: number;
  y: number;
  label: string;
}

interface MVPGameProps {
  onJoinWaitlist: () => void;
  onError: (msg: string) => void;
}

export default function MVPGame({ onJoinWaitlist, onError }: MVPGameProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connected, setConnected] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [ptr, setPtr] = useState<{ x: number; y: number } | null>(null);
  const [done, setDone] = useState(false);
  
  const connRef = useRef(0);
  const dragRef = useRef(false);
  const doneRef = useRef(false);

  const generateNodes = () => {
    const zones = [
      { x: 18, y: 22 }, { x: 50, y: 18 }, { x: 82, y: 22 },
      { x: 20, y: 55 }, { x: 50, y: 55 }, { x: 80, y: 55 },
      { x: 20, y: 82 }, { x: 50, y: 82 }, { x: 80, y: 82 }
    ];
    const shuffled = [...zones].sort(() => Math.random() - 0.5);
    return MVP_LABELS.map((lbl, i) => {
      const z = shuffled[i];
      return { id: i, x: z.x + (Math.random() - 0.5) * 12, y: z.y + (Math.random() - 0.5) * 12, label: lbl };
    });
  };

  useEffect(() => {
    setNodes(generateNodes());
  }, []);

  const getCoords = (e: React.PointerEvent) => {
    const c = canvasRef.current;
    if (!c) return null;
    const r = c.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 };
  };

  const triggerError = () => {
    const msg = COMEDY_ERRORS[Math.floor(Math.random() * COMEDY_ERRORS.length)];
    onError(msg);
    connRef.current = 0;
    setConnected(0);
    dragRef.current = false;
    setDragging(false);
    setPtr(null);
    setNodes(generateNodes());
  };

  const onDown = (e: React.PointerEvent, idx: number) => {
    if (doneRef.current) return;
    e.preventDefault();
    if (idx !== connRef.current) {
      triggerError();
      return;
    }
    if (canvasRef.current && canvasRef.current.setPointerCapture) {
      canvasRef.current.setPointerCapture(e.pointerId);
    }
    const next = connRef.current + 1;
    connRef.current = next;
    setConnected(next);
    dragRef.current = true;
    setDragging(true);
    const n = nodes[idx];
    setPtr({ x: n.x, y: n.y });
  };

  const onMove = (e: React.PointerEvent) => {
    if (!dragRef.current || doneRef.current) return;
    e.preventDefault();
    const co = getCoords(e);
    if (!co) return;
    setPtr(co);
    
    for (const n of nodes) {
      if (n.id < connRef.current) continue;
      // Calculate distance in pixel roughly (assuming 100% is full size, so we convert back approx)
      // Actually the original logic used 8 percentage units as distance
      const dx = co.x - n.x;
      const dy = co.y - n.y;
      if (Math.hypot(dx, dy) < 8) {
        if (n.id === connRef.current) {
          const next = connRef.current + 1;
          connRef.current = next;
          setConnected(next);
          setPtr({ x: n.x, y: n.y });
          if (next === nodes.length) {
            doneRef.current = true;
            setDone(true);
            dragRef.current = false;
            setDragging(false);
            setPtr(null);
            
            setTimeout(() => {
              // Trigger confetti via an event
              window.dispatchEvent(new CustomEvent('LAUNCH_CONFETTI'));
            }, 600);
          }
        } else if (n.id > connRef.current) {
          triggerError();
        }
        break;
      }
    }
  };

  const onUp = () => {
    if (dragRef.current && !doneRef.current) {
      connRef.current = 0;
      setConnected(0);
      dragRef.current = false;
      setDragging(false);
      setPtr(null);
    }
  };

  const pts = nodes.slice(0, connected).map(n => `${n.x},${n.y}`);
  if (dragging && ptr && !done) pts.push(`${ptr.x},${ptr.y}`);
  const polyPts = pts.join(' ');

  return (
    <section id="mvp">
      <ScrollReveal className="mvp-title">
        <span className="kicker a">Interactive Challenge</span>
        <div className="sec-title" id="mvp-heading">
          {done ? 'WE ARE INFINITE' : 'MISSION: BUILD YOUR MVP'}
        </div>
        {!done && (
          <p className="mvp-sub">
            Drag from <strong style={{ color: '#fff' }}>IDEA</strong> through each stage in order. Skip a step and face the consequences.
          </p>
        )}
      </ScrollReveal>

      <div 
        ref={canvasRef} 
        className="mvp-canvas" 
        onPointerMove={onMove} 
        onPointerUp={onUp} 
        onPointerCancel={onUp}
        style={{ touchAction: 'none' }}
      >
        <div className="mvp-grid"></div>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {pts.length > 1 && (
            <polyline 
              points={polyPts} 
              stroke="#fff" 
              strokeWidth="3.5" 
              vectorEffect="non-scaling-stroke"
              strokeLinejoin="round" 
              strokeLinecap="round" 
              fill="none"
              style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,.5))' }}
            />
          )}
        </svg>
        {nodes.map(n => {
          const reached = n.id < connected;
          const isStart = n.id === 0 && connected === 0;
          return (
            <div 
              key={n.id} 
              className="mvp-node" 
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              onPointerDown={e => onDown(e, n.id)}
            >
              <div className={`mn-circle${reached ? ' reached' : ''}`}>
                {isStart && (
                  <div style={{ position: 'absolute', top: '-36px', left: '50%', transform: 'translateX(-50%)', background: '#fff', color: '#000', padding: '3px 8px', borderRadius: '5px', fontSize: '.55rem', fontWeight: 900, whiteSpace: 'nowrap' }}>
                    START
                    <div style={{ position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)', borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '4px solid #fff' }}></div>
                  </div>
                )}
                {(reached || (n.id === 0 && connected === 0)) && (
                  <div style={{ position: 'absolute', width: '10px', height: '10px', background: '#fff', borderRadius: '50%', filter: 'blur(3px)', animation: n.id === 0 && connected === 0 ? 'pulse 1.5s infinite' : undefined, opacity: reached ? 0 : 0.6 }}></div>
                )}
              </div>
              <div className="mn-label">{n.label}</div>
            </div>
          );
        })}
      </div>

      {done && (
        <div className="mvp-badge" id="mvp-badge" style={{ display: 'flex' }}>
          <MagneticButton className="btn btn-w" onClick={onJoinWaitlist} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem', width: '100%', maxWidth: '320px' }}>
            JOIN THE MOVEMENT 
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </MagneticButton>
          <p style={{ color: '#a1a1aa', fontSize: '.88rem', fontStyle: 'italic', textAlign: 'center', padding: '0 1rem' }}>
            "Access Granted. Welcome to the Crossoul Inner Circle."
          </p>
        </div>
      )}
    </section>
  );
}
