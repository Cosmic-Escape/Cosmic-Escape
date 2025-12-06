"use client";
/**
 * ParallaxLayer.jsx
 * - Wrap elements to give layered parallax effect driven by pointer or device tilt.
 * - Small, dependency-free, supports nested layers with `depth` prop.
 *
 * API:
 * <ParallaxLayer depth={0.08}><div>...</div></ParallaxLayer>
 * Depth: 0 (no effect) to ~0.2 (strong)
 */

import { useRef, useEffect } from "react";

export default function ParallaxLayer({ children, depth = 0.06, strength = 30, className = "" }) {
  const elRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    let lastX = 0, lastY = 0;
    let targetX = 0, targetY = 0;
    let running = true;

    function onMove(e) {
      const nx = (e.clientX / window.innerWidth) - 0.5;
      const ny = (e.clientY / window.innerHeight) - 0.5;
      targetX = nx * strength * depth;
      targetY = ny * strength * depth;
    }

    function tick() {
      if (!running) return;
      lastX += (targetX - lastX) * 0.12;
      lastY += (targetY - lastY) * 0.12;
      el.style.transform = `translate3d(${lastX}px, ${lastY}px, 0)`;
      rafRef.current = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", onMove);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onMove);
    };
  }, [depth, strength]);

  return (
    <div ref={elRef} className={className} style={{ willChange: "transform", transform: "translate3d(0,0,0)" }}>
      {children}
    </div>
  );
}
