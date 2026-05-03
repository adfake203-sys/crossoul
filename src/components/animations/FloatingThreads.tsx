import { useEffect, useRef } from 'react';


interface FloatingThreadsProps {
  show: boolean;
}

export default function FloatingThreads({ show }: FloatingThreadsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;

    const ctx = cv.getContext('2d');
    if (!ctx) return;

    let tmx = 0.5, tmy = 0.5;
    const nodes: { x: number, y: number, vx: number, vy: number, r: number }[] = [];

    const resize = () => {
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    for (let i = 0; i < 20; i++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 3 + 1.5
      });
    }

    const onMouseMove = (e: MouseEvent) => {
      tmx = e.clientX / window.innerWidth;
      tmy = e.clientY / window.innerHeight;
    };
    document.addEventListener('mousemove', onMouseMove, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      if (!show) {
        animationRef.current = requestAnimationFrame(draw);
        return; // Pause drawing but keep loop alive or just skip heavy lifting
      }

      const mx = tmx * cv.width;
      const my = tmy * cv.height;

      nodes.forEach(n => {
        n.x += n.vx + (mx - n.x) * 0.00025;
        n.y += n.vy + (my - n.y) * 0.00025;
        if (n.x < 0 || n.x > cv.width) n.vx *= -1;
        if (n.y < 0 || n.y > cv.height) n.vy *= -1;
      });

      nodes.forEach((a, i) => {
        nodes.forEach((b, j) => {
          if (j <= i) return;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 230) {
            const al = (1 - dist / 230) * 0.22;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(212,175,55,${al})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        });
      });

      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(212,175,55,.45)';
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [show]);

  return (
    <canvas 
      id="tc" 
      ref={canvasRef} 
      className={show ? 'show' : ''}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        opacity: show ? 1 : 0,
        transition: 'opacity 0.6s'
      }}
    ></canvas>
  );
}
