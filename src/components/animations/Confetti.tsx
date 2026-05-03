import { useState, useEffect, useRef } from 'react';


export default function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [show, setShow] = useState(false);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const handleLaunch = () => {
      const cv = canvasRef.current;
      if (!cv) return;
      
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
      setShow(true);
      
      const ctx = cv.getContext('2d');
      if (!ctx) return;

      const colors = ['#d4af37', '#fff', '#e4e4e7', '#a1a1aa', '#f5e6b2', '#c8c8c8', '#fafafa'];
      const pieces: any[] = [];
      
      for (let i = 0; i < 160; i++) {
        pieces.push({
          x: Math.random() * cv.width,
          y: -10 - Math.random() * cv.height * 0.5,
          w: 6 + Math.random() * 8,
          h: 3 + Math.random() * 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          rot: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.18,
          vx: (Math.random() - 0.5) * 4,
          vy: 2.5 + Math.random() * 3.5,
          alpha: 1,
          decay: 0.008 + Math.random() * 0.006
        });
      }

      const draw = () => {
        ctx.clearRect(0, 0, cv.width, cv.height);
        let alive = 0;
        
        for (const p of pieces) {
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.rotSpeed;
          p.alpha -= p.decay;
          
          if (p.alpha <= 0) continue;
          alive++;
          
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
        
        if (alive > 0) {
          animationRef.current = requestAnimationFrame(draw);
        } else {
          setShow(false);
          ctx.clearRect(0, 0, cv.width, cv.height);
        }
      };

      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      draw();

      setTimeout(() => {
        setShow(false);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      }, 4200);
    };

    window.addEventListener('LAUNCH_CONFETTI', handleLaunch);
    return () => {
      window.removeEventListener('LAUNCH_CONFETTI', handleLaunch);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas 
      id="confetti-cv" 
      ref={canvasRef}
      className={show ? 'show' : ''}
    ></canvas>
  );
}
