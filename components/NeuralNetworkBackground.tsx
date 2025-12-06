'use client';

import { useEffect, useRef, useState } from 'react';

interface NeuralNetworkBackgroundProps {
  nodeCount?: number;
  connectionDistance?: number;
  depthLayers?: number;
  palette?: 'techBlue' | 'cyberGrape' | 'emeraldTech';
}

interface Node {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  pulse: number;
}

export default function NeuralNetworkBackground({
  nodeCount = 68,
  connectionDistance = 240,
  depthLayers = 4,
  palette = 'techBlue',
}: NeuralNetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return; // don't run animation on server

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const palettes: Record<string, { node: string; nodeGlow: string; link: string; bg: string }> = {
      techBlue: {
        node: '#8ab4ff',
        nodeGlow: 'rgba(138,180,255,0.45)',
        link: 'rgba(138,180,255,0.28)',
        bg: 'rgba(10, 20, 40, 0.45)',
      },
      cyberGrape: {
        node: '#c084fc',
        nodeGlow: 'rgba(192,132,252,0.45)',
        link: 'rgba(192,132,252,0.28)',
        bg: 'rgba(20, 10, 30, 0.45)',
      },
      emeraldTech: {
        node: '#6ee7b7',
        nodeGlow: 'rgba(110,231,183,0.45)',
        link: 'rgba(110,231,183,0.22)',
        bg: 'rgba(0, 30, 20, 0.45)',
      },
    };

    const colors = palettes[palette] || palettes.techBlue;

    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        z: Math.random() * depthLayers,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        pulse: Math.random() * 2 * Math.PI,
      });
    }

    const pointer = { x: W / 2, y: H / 2 };

    function onMove(e: MouseEvent) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    }

    function onResize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
    }

    window.addEventListener('pointermove', onMove);
    window.addEventListener('resize', onResize);

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      ctx!.fillStyle = colors.bg;
      ctx!.fillRect(0, 0, W, H);

      // connections & nodes rendering (same as your original logic)
      nodes.forEach((n, i) => {
        const depthScale = 1 + n.z * 0.35;
        const px = (pointer.x - W / 2) * (n.z * 0.02);
        const py = (pointer.y - H / 2) * (n.z * 0.02);

        n.x += n.vx * depthScale;
        n.y += n.vy * depthScale;

        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;

        n.pulse += 0.02;

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n2.x - n.x;
          const dy = n2.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            const alpha = 1 - dist / connectionDistance;
            ctx!.strokeStyle = colors.link.replace(/0\.\d+/, alpha.toFixed(3));
            ctx!.lineWidth = 1.2 * (1 - n.z * 0.18);
            ctx!.beginPath();
            ctx!.moveTo(n.x + px, n.y + py);
            ctx!.lineTo(n2.x + px, n2.y + py);
            ctx!.stroke();
          }
        }

        const size = 3.2 * (1 + n.z * 0.4) + Math.sin(n.pulse) * 1.2;
        ctx!.beginPath();
        ctx!.fillStyle = colors.nodeGlow;
        ctx!.shadowBlur = 18 * (1 + n.z * 0.4);
        ctx!.shadowColor = colors.nodeGlow;
        ctx!.arc(n.x + px, n.y + py, size * 1.6, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.beginPath();
        ctx!.fillStyle = colors.node;
        ctx!.shadowBlur = 0;
        ctx!.arc(n.x + px, n.y + py, size, 0, Math.PI * 2);
        ctx!.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current!);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, [mounted, nodeCount, connectionDistance, depthLayers, palette]);

  if (!mounted) return null; // don't render on server

  return <canvas ref={canvasRef} className="fixed inset-0 -z-40 w-full h-full pointer-events-none" aria-hidden="true" />;
}
