// src/components/ui/ParticleDrift.tsx
// Particle Drift ASCII background canvas effect from 21st.dev
// Clean, native React canvas implementation (no iframes / external CDN scripts)
// Tuned for Dual Theme:
// Dark: #000000 void black canvas, #292d30 lines, Iris Violet & Sky Blue accents
// Light: #fafafa paper canvas, high-contrast Slate (#1e293b / #334155) letters & crisp blueprint mesh lines

'use client';

import React, { useEffect, useRef } from 'react';

interface ParticleDriftProps {
  className?: string;
  style?: React.CSSProperties;
  accentColor?: string;
}

export default function ParticleDrift({
  className,
  style,
  accentColor = '#9281f7', // Iris Violet accent
}: ParticleDriftProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ{}<>;/!*#@'.split('');
    const mouse = { x: -1000, y: -1000 };

    interface Node {
      x: number;
      y: number;
      vy: number;
      char: string;
    }

    interface Beam {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
    }

    let nodes: Node[] = [];
    let beams: Beam[] = [];

    const resize = () => {
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const initParticles = () => {
      nodes = Array.from({ length: 65 }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vy: Math.random() * 0.35 + 0.1,
        char: chars[Math.floor(Math.random() * chars.length)],
      }));

      beams = Array.from({ length: 18 }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 90 + 40,
        speed: Math.random() * 4 + 2,
        opacity: Math.random() * 0.35 + 0.15,
      }));
    };

    resize();
    initParticles();

    const onResize = () => {
      resize();
      initParticles();
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);

    // Dynamic accent resolver for light vs dark mode
    const getResolvedAccent = (isLight: boolean) => {
      if (!isLight) return accentColor;
      if (accentColor === '#9281f7') return '#4338ca'; // Deep Indigo/Violet
      if (accentColor === '#70b8ff') return '#0369a1'; // Deep Sky Blue
      if (accentColor === '#3ad389') return '#047857'; // Deep Emerald Green
      if (accentColor === '#ffca16') return '#b45309'; // Deep Amber
      return accentColor;
    };

    const draw = () => {
      const isLight = document.documentElement.classList.contains('light');
      const activeAccent = getResolvedAccent(isLight);
      ctx.clearRect(0, 0, width, height);

      // 1. Upward glowing code beams
      beams.forEach((b) => {
        b.y -= b.speed;
        if (b.y + b.length < 0) {
          b.y = height + 80;
          b.x = Math.random() * width;
        }

        const g = ctx.createLinearGradient(b.x, b.y, b.x, b.y + b.length);
        if (isLight) {
          g.addColorStop(0, `rgba(67, 56, 202, ${b.opacity * 0.75})`);
          g.addColorStop(1, 'transparent');
          ctx.lineWidth = 1.4;
        } else {
          g.addColorStop(0, `rgba(146, 129, 247, ${b.opacity * 0.6})`);
          g.addColorStop(1, 'transparent');
          ctx.lineWidth = 1.0;
        }
        ctx.strokeStyle = g;
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(b.x, b.y + b.length);
        ctx.stroke();
      });

      // 2. Proximity mesh lines between nodes (Technical Blueprint in Light Mode)
      ctx.lineWidth = isLight ? 0.9 : 0.5;
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const d = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          if (d < 115) {
            ctx.strokeStyle = isLight
              ? `rgba(71, 85, 105, ${0.55 * (1 - d / 115)})` // Clear slate-600 blueprint lines
              : `rgba(65, 70, 75, ${0.25 * (1 - d / 115)})`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // 3. Floating ASCII nodes with mouse connection
      ctx.font = isLight ? '600 12px "JetBrains Mono", monospace' : '500 11px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      nodes.forEach((n) => {
        n.y += n.vy; // Slow upward drift
        if (n.y > height + 20) {
          n.y = -20;
          n.x = Math.random() * width;
        }

        const dist = Math.hypot(mouse.x - n.x, mouse.y - n.y);

        // Dynamic char flip on proximity
        if (dist < 150 || Math.random() > 0.99) {
          n.char = chars[Math.floor(Math.random() * chars.length)];
        }

        // Connection line to mouse cursor
        if (dist < 150) {
          ctx.strokeStyle = isLight
            ? `rgba(67, 56, 202, ${0.75 * (1 - dist / 150)})`
            : `rgba(146, 129, 247, ${0.5 * (1 - dist / 150)})`;
          ctx.lineWidth = isLight ? 1.1 : 0.8;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        // High contrast for floating characters on light background
        ctx.fillStyle = dist < 150
          ? activeAccent
          : (isLight ? 'rgba(30, 41, 59, 0.72)' : 'rgba(161, 164, 165, 0.40)');
        ctx.fillText(n.char, n.x, n.y);
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [accentColor]);

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
      {/* Matte gradient fade out at bottom for clean content transition */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '140px',
          background: 'linear-gradient(to top, var(--bg-canvas) 20%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
