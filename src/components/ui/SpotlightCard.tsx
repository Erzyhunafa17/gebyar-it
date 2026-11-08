// src/components/ui/SpotlightCard.tsx
// Black card with 1px solid #292d30, 16px radius
// Mouse-tracking spotlight: CSS variables --mouse-x & --mouse-y with customizable color-coded glow

'use client';

import React, { useRef, useState, type ReactNode, type CSSProperties } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  accent?: string; // lab accent color for spotlight tint
  glowColor?: string; // hover border & spotlight color
  style?: CSSProperties;
  as?: 'div' | 'article' | 'section';
}

export default function SpotlightCard({
  children,
  className,
  accent = '#9281f7',
  glowColor,
  style,
  as: Tag = 'div',
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const activeColor = glowColor || accent;

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCoords({ x, y });
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  return (
    <Tag
      ref={cardRef as React.RefObject<HTMLDivElement>}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        position: 'relative',
        background: isHovered
          ? 'var(--surface-card-hover, var(--surface-card, #000000))'
          : 'var(--surface-card, var(--bg-surface-card, #000000))',
        border: `1px solid ${isHovered ? activeColor + '88' : 'var(--color-graphite-hairline, var(--border-subtle, #292d30))'}`,
        boxShadow: 'var(--card-shadow, var(--shadow-subtle, none))',
        borderRadius: '16px',
        padding: '32px',
        overflow: 'hidden',
        isolation: 'isolate',
        transition: 'border-color 200ms ease-out, background-color 200ms ease-out, box-shadow 200ms ease-out',
        ...style,
      }}
    >
      {/* Radial spotlight following cursor */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '16px',
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(420px circle at ${coords.x}px ${coords.y}px, ${activeColor}15, transparent 70%)`,
          transition: 'opacity 250ms ease-out',
          pointerEvents: 'none',
          zIndex: 0,
          willChange: 'background, opacity',
        }}
      />

      {/* Card Content Slot */}
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {children}
      </div>
    </Tag>
  );
}
