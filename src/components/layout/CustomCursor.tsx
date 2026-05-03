import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const curRef = useRef<HTMLDivElement>(null);
  const cur2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cur = curRef.current;
    const cur2 = cur2Ref.current;
    if (!cur || !cur2) return;

    let mx = 0, my = 0, fx = 0, fy = 0;
    
    // Set initial off-screen or center to avoid jump
    cur.style.transform = `translate3d(-100px, -100px, 0) translate(-50%, -50%)`;
    cur2.style.transform = `translate3d(-100px, -100px, 0) translate(-50%, -50%)`;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    };

    const onMouseDown = () => {
      cur.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%) scale(0.45)`;
    };

    const onMouseUp = () => {
      cur.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%) scale(1)`;
    };

    const tick = () => {
      fx += (mx - fx) * 0.13;
      fy += (my - fy) * 0.13;
      cur2.style.transform = `translate3d(${fx}px, ${fy}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    
    const animationFrame = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <div id="cur" ref={curRef}></div>
      <div id="cur2" ref={cur2Ref}></div>
    </>
  );
}
