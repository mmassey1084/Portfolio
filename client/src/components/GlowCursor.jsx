import { useEffect, useRef } from "react";

export default function GlowCursor() {
  const dots = useRef([]);

  useEffect(() => {
    const SIZE = 42;
    const elements = dots.current.filter(Boolean);

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;

    // start at target so it doesn't "fly in"
    let x = targetX;
    let y = targetY;

    const move = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    let rafId;

    const animate = () => {
      // lead position 
      x += (targetX - x) * 0.25;
      y += (targetY - y) * 0.25;

      elements.forEach((el, i) => {
        // each dot lags more 
        const speed = Math.max(0.06, 0.22 - i * 0.02);

        const prevX = el._x ?? x;
        const prevY = el._y ?? y;

        el._x = prevX + (x - prevX) * speed;
        el._y = prevY + (y - prevY) * speed;

        // ✅ center the dot on the cursor so it reaches screen edges
        const left = el._x - SIZE / 2;
        const top = el._y - SIZE / 2;

        el.style.transform = `translate3d(${left}px, ${top}px, 0)`;

        el.style.filter = `blur(${i * 2.5}px)`;
      });

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="glow-cursor"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 999999,
      }}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (dots.current[i] = el)}
          className="glow-dot"
          style={{
            opacity: 1 - i * 0.12,
          }}
        />
      ))}
    </div>
  );
}
