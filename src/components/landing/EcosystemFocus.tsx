import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HapticManager } from '../../lib/HapticManager';

// --- Confetti Utility (10s Version) ---
const ConfettiRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsActive(false), 8000); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];
    const colors = ['#6366f1', '#a5b4fc', '#4f46e5', '#818cf8', '#ffffff'];

    const createParticle = () => {
      if (!isActive) return;
      particles.push({
        x: Math.random() * canvas.width,
        y: -20,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 3 + 2,
        angle: Math.random() * 360,
        spin: Math.random() * 0.2 - 0.1
      });
    }

    // Initial burst
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 2,
            angle: Math.random() * 360,
            spin: Math.random() * 0.2 - 0.1
          });
    }

    let animationId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (isActive && particles.length < 200) createParticle();
      particles.forEach((p, index) => {
        p.y += p.speed;
        p.angle += p.spin;
        ctx.fillStyle = p.color;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
        if (p.y > canvas.height) {
            if (isActive) {
                p.y = -20;
                p.x = Math.random() * canvas.width;
            } else {
                particles.splice(index, 1);
            }
        }
      });
      animationId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animationId);
  }, [isActive]);

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1000 }} />;
};

// --- Comedy Error Modal ---
const ComedyErrorModal = ({ isOpen, onClose, message, memeSrc }: { isOpen: boolean, onClose: () => void, message: string, memeSrc: string }) => (
  <AnimatePresence>
    {isOpen && (
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          zIndex: 50, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '1rem'
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: 'absolute', inset: 0, background: 'rgba(9, 9, 11, 0.9)', backdropFilter: 'blur(8px)', borderRadius: '32px' }}
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          style={{ 
            position: 'relative', 
            background: 'linear-gradient(135deg, #1e1e2e 0%, #09090b 100%)', 
            padding: '2.5rem', 
            borderRadius: '24px', 
            border: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center',
            maxWidth: '400px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
          }}
        >
          <img src={memeSrc} alt="Oops!" style={{ width: '120px', marginBottom: '1.5rem', borderRadius: '12px' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', marginBottom: '1rem' }}>OOPS! 🫠</h2>
          <p style={{ color: '#a1a1aa', fontSize: '1rem', lineHeight: 1.5, marginBottom: '2rem' }}>
            {message}
          </p>
          <button 
            onClick={onClose}
            style={{
              background: '#6366f1',
              color: '#fff',
              border: 'none',
              padding: '0.75rem 2rem',
              borderRadius: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            LET'S DEBUG THIS
          </button>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// --- MVP Content & Randomization ---
const MVP_LABELS = ['IDEA', 'PLANNING', 'DISCUSSION', 'SAME VIBE', 'BUILD TOGETHER'];

const generateRandomNodes = () => {
  // Define 9 grid zones (3x3) to ensure spread
  const zones = [
    { x: 20, y: 20 }, { x: 50, y: 20 }, { x: 80, y: 20 },
    { x: 20, y: 50 }, { x: 50, y: 50 }, { x: 80, y: 50 },
    { x: 20, y: 80 }, { x: 50, y: 80 }, { x: 80, y: 80 }
  ];

  // Shuffle zones
  const shuffledZones = zones.sort(() => Math.random() - 0.5);

  return MVP_LABELS.map((label, i) => {
    // Pick a unique zone for each node
    const zone = shuffledZones[i];
    // Add a small jitter within the zone (±8)
    const jitterX = (Math.random() - 0.5) * 16;
    const jitterY = (Math.random() - 0.5) * 16;
    
    return {
      id: i,
      x: zone.x + jitterX,
      y: zone.y + jitterY,
      label
    };
  });
};

const comedyErrors = [
  "You just tried to build a unicorn without a horn. Let's try that again.",
  "Skipping steps? That's how we end up with a 'Coming Soon' page for 3 years.",
  "Woah! You're building a rocket with no fuel. Planning is key, buddy.",
  "Wait, you haven't even talked to your users yet. Discussion first!",
  "Trying to build together without a vibe check? Error 404: Synergy Not Found.",
];

export default function EcosystemFocus({ onJoin }: { onJoin?: () => void }) {
  const [connectedCount, setConnectedCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: '' });
  const [showBadge, setShowBadge] = useState(false);
  const [activeNodes, setActiveNodes] = useState(generateRandomNodes());
  
  // Drag Pattern State
  const [isDragging, setIsDragging] = useState(false);
  const [pointerPos, setPointerPos] = useState<{ x: number, y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const MEME_SRC = "/funny_startup_fail_meme.png";

  const triggerError = () => {
    const randomMsg = comedyErrors[Math.floor(Math.random() * comedyErrors.length)];
    setErrorModal({ isOpen: true, message: randomMsg });
    HapticManager.notification(); // Smoother error feel
    
    // Total reset for early lift or mistake
    setConnectedCount(0); 
    setIsDragging(false);
    HapticManager.stopResonance();
    setPointerPos(null);
    setActiveNodes(generateRandomNodes());
  };

  const getRelativeCoords = (clientX: number, clientY: number) => {
    if (!containerRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    return { x, y };
  };

  const startDrag = (e: React.PointerEvent, index: number) => {
    if (isCompleted || errorModal.isOpen) return;
    
    // Check if we are starting from the REQUIRED next node
    if (index !== connectedCount) {
        // If they click a different node than the next one, reset if they had progress
        if (connectedCount > 0) {
            setConnectedCount(0);
            setPointerPos(null);
            HapticManager.light();
        }
        return;
    }

    // LOCK POINTER TO CONTAINER: This ensures the drag keeps working even if finger leaves the dot
    if (containerRef.current) {
        containerRef.current.setPointerCapture(e.pointerId);
    }

    setIsDragging(true);
    setConnectedCount(connectedCount + 1);
    const targetNode = activeNodes[index];
    setPointerPos({ x: targetNode.x, y: targetNode.y });
    HapticManager.light();
    HapticManager.startResonance(0);
  };

  useEffect(() => {
    let interval: any = null;
    let localHoldTime = 0;
    
    if (isDragging && !isCompleted) {
        interval = setInterval(() => {
            localHoldTime += 0.05;
            HapticManager.startResonance(Math.min(1, localHoldTime / 2)); 
        }, 50);
    } else {
        HapticManager.stopResonance();
    }
    return () => {
        if (interval) clearInterval(interval);
        HapticManager.stopResonance();
    };
  }, [isDragging, isCompleted]);

  const trackDrag = (e: React.PointerEvent) => {
    if (!isDragging || isCompleted) return;

    const coords = getRelativeCoords(e.clientX, e.clientY);
    if (!coords) return;
    setPointerPos(coords);
    HapticManager.impact(); // Subtle movement feedback

    // Check distance against ALL unconnected nodes
    for (const node of activeNodes) {
      if (node.id < connectedCount) continue; // Already connected

      const dx = coords.x - node.x;
      const dy = coords.y - node.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 8) { // Auto-select radius
        if (node.id === connectedCount) {
          // VALID SNAP
          const nextCount = connectedCount + 1;
          setConnectedCount(nextCount);
          setPointerPos({ x: node.x, y: node.y });
          HapticManager.light(); // Subtle tick

          if (nextCount === activeNodes.length) {
            // FULLY COMPLETE
            setIsCompleted(true);
            setIsDragging(false);
            setPointerPos(null);
            HapticManager.success();
            HapticManager.stopResonance();
            setTimeout(() => setShowBadge(true), 1500);
          }
          break;
        } else if (node.id > connectedCount) {
          // SKIPPED A NODE - ERROR!
          triggerError();
          break;
        }
      }
    }
  };

  const endDrag = () => {
    if (isDragging && !isCompleted) {
      // Released finger early -> Drop the pattern!
      setConnectedCount(0);
      setIsDragging(false);
      setPointerPos(null);
      HapticManager.stopResonance();
      HapticManager.notification(); // smoother disappointed feel
    }
  };

  const nodes = activeNodes;

  return (
    <section className="ecosystem-section" style={{ padding: '6rem 1rem', background: 'transparent', position: 'relative', overflow: 'hidden' }}>
      <AnimatePresence>
        {isCompleted && <ConfettiRain />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '3rem' }}>
          <h2 style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
            fontWeight: 900, 
            color: isCompleted ? '#6366f1' : '#fff',
            textShadow: isCompleted ? '0 0 30px rgba(99, 102, 241, 0.5)' : 'none',
            transition: 'all 0.5s ease',
            lineHeight: 1,
            letterSpacing: '-2px'
          }}>
            {isCompleted ? 'WE ARE INFINITE' : 'BUILD THE MOVEMENT.'}
          </h2>
          {!isCompleted && (
            <p style={{ color: '#a1a1aa', marginTop: '1.2rem', fontSize: '1rem', maxWidth: '600px', margin: '1rem auto', lineHeight: 1.5 }}>
              A movement isn't built in a day, and it's never a straight line. <br/> 
              <span style={{ color: '#818cf8', fontWeight: 700 }}>Discover the Path:</span> Swipe through the stages in the order a real-world MVP is born.
            </p>
          )}
        </div>

        <div 
          ref={containerRef}
          className="eco-map" 
          onPointerMove={trackDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          style={{ 
            height: '450px', 
            width: '100%', 
            maxWidth: '800px',
            margin: '0 auto', 
            position: 'relative',
            background: 'rgba(99, 102, 241, 0.02)',
            borderRadius: '32px',
            border: '1px solid rgba(99, 102, 241, 0.1)',
            backdropFilter: 'blur(2px)',
            touchAction: 'auto' // Allow scrolling on the background
          }}
        >
          {/* Background Grid */}
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            opacity: 0.05, 
            background: 'radial-gradient(circle, #6366f1 1px, transparent 1px) 0 0 / 24px 24px',
            borderRadius: '32px'
          }}></div>

          <ComedyErrorModal 
            isOpen={errorModal.isOpen} 
            message={errorModal.message} 
            memeSrc={MEME_SRC}
            onClose={() => setErrorModal({ ...errorModal, isOpen: false })} 
          />

          <svg 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
          >
            <motion.g>
              {/* Single Continuous Polyline Path */}
              {(() => {
                if (connectedCount === 0) return null;
                const pts = nodes.slice(0, connectedCount).map(n => `${n.x},${n.y}`);
                if (isDragging && pointerPos && !isCompleted) {
                  pts.push(`${pointerPos.x},${pointerPos.y}`);
                }
                const currentPoints = pts.join(" ");

                return (
                  <motion.polyline
                    points={currentPoints}
                    stroke="#818cf8"
                    strokeWidth="4"
                    vectorEffect="non-scaling-stroke"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fill="none"
                    style={{ filter: 'drop-shadow(0 0 4px rgba(129, 140, 248, 0.8))' }}
                  />
                );
              })()}
            </motion.g>
          </svg>

          {nodes.map((node) => {
            const isReached = node.id < connectedCount;

            return (
              <motion.div
                key={node.id}
                onPointerDown={(e) => startDrag(e, node.id)}
                animate={{
                    scale: isReached ? 1.2 : 1, // Increased scale mask for a sturdy visual lock
                    boxShadow: isReached ? '0 0 30px rgba(99,102,241,0.6)' : 'none',
                    opacity: errorModal.isOpen ? 0 : 1
                }}
                style={{
                  position: 'absolute',
                  top: `${node.y}%`,
                  left: `${node.x}%`,
                  transform: 'translate(-50%, -50%)',
                  cursor: isCompleted ? 'default' : 'pointer',
                  zIndex: 30, // Elevated to ensure it perfectly masks the SVG lines beneath
                  pointerEvents: isCompleted ? 'none' : 'auto',
                  touchAction: 'none' // DISBALE SCROLL ONLY ON NODES
                }}
              >
                <div style={{
                  width: '24px', // Slightly larger to fully occlude the 4px stroke cap beneath
                  height: '24px',
                  background: isReached ? '#6366f1' : '#1e1e2e',
                  border: `3px solid ${isReached ? '#818cf8' : '#3f3f46'}`,
                  borderRadius: '50%',
                  transition: 'background 0.3s ease, border 0.3s ease',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Subtle Inner Glow Pulse to visually anchor the exact center */}
                  <AnimatePresence>
                    {isReached && (
                      <motion.div
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 1.8, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
                        style={{
                          position: 'absolute',
                          width: '12px',
                          height: '12px',
                          background: '#fff',
                          borderRadius: '50%',
                          filter: 'blur(3px)',
                          zIndex: 35
                        }}
                      />
                    )}
                  </AnimatePresence>
                  
                  <span style={{
                    position: 'absolute',
                    top: '35px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    whiteSpace: 'nowrap',
                    fontSize: '0.65rem',
                    color: isReached ? '#fff' : '#52525b',
                    fontWeight: 800,
                    letterSpacing: '0.5px',
                    fontFamily: 'var(--font-body)'
                  }}>
                    {node.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA REWARD */}
        <AnimatePresence>
          {showBadge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                marginTop: '3rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <motion.button 
                onClick={onJoin}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    textDecoration: 'none',
                    background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
                    padding: '1.25rem 3rem',
                    borderRadius: '16px',
                    color: '#fff',
                    fontWeight: 900,
                    fontSize: '1.1rem',
                    letterSpacing: '1px',
                    boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    cursor: 'pointer'
                }}
              >
                JOIN THE MOVEMENT
              </motion.button>
              <p style={{ color: '#a1a1aa', marginTop: '1.2rem', fontSize: '0.9rem', fontStyle: 'italic', maxWidth: '400px' }}>
                "Access Granted. You have proven your vision. Welcome to the Crossoul Inner Circle."
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
