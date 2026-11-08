// src/components/ui/TerminalWindow.tsx
// Black terminal window — traffic-light dots, JetBrains Mono content
// Design: #000000 bg, 1px solid #292d30, 16px radius, monospace syntax colors

import type { ReactNode } from 'react';

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

/** Dot colors: red #ff6465, amber #ffca16, green #3ad389 — macOS traffic lights */
const trafficLights = [
  { color: '#ff6465', label: 'Tutup' },
  { color: '#ffca16', label: 'Perkecil' },
  { color: '#3ad389', label: 'Perbesar' },
];

export default function TerminalWindow({ title, children, className }: TerminalWindowProps) {
  return (
    <div
      className={className}
      style={{
        background: 'var(--surface-terminal, var(--terminal-bg, #000000))',
        border: '1px solid var(--color-graphite-hairline, var(--terminal-border, #292d30))',
        borderRadius: '16px', /* cards always 16px */
        overflow: 'hidden',
        fontFamily: 'var(--font-mono)',
        boxShadow: 'var(--card-shadow, var(--shadow-subtle, none))',
        transition: 'background-color 200ms ease, border-color 200ms ease, box-shadow 200ms ease',
      }}
    >
      {/* ── Terminal header with traffic-light dots ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 16px',
          borderBottom: '1px solid var(--color-graphite-hairline, var(--terminal-border, #292d30))',
          backgroundColor: 'var(--surface-terminal-header, var(--terminal-header-bg, #000000))',
          transition: 'background-color 200ms ease, border-color 200ms ease',
        }}
      >
        {/* Traffic-light dots */}
        <div
          role="presentation"
          aria-hidden="true"
          style={{ display: 'flex', gap: '7px', marginRight: '4px' }}
        >
          {trafficLights.map(({ color, label }) => (
            <span
              key={label}
              title={label}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: color,
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        {/* Optional window title */}
        {title && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--text-muted, #6e727a)',
              flex: 1,
              textAlign: 'center',
              letterSpacing: '0.01em',
            }}
          >
            {title}
          </span>
        )}
      </div>

      {/* ── Terminal body ── */}
      <div
        style={{
          padding: '20px 24px',
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          lineHeight: 1.7,
          color: 'var(--terminal-text, #f0f0f0)',
          overflowX: 'auto',
          transition: 'color 200ms ease',
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** TerminalLine — single line helper with optional prompt and syntax color */
export function TerminalLine({
  prompt,
  children,
  color,
  indent = 0,
}: {
  prompt?: string;
  children: ReactNode;
  color?: string;
  indent?: number;
}) {
  return (
    <div style={{ display: 'flex', gap: '8px', paddingLeft: `${indent * 16}px` }}>
      {prompt && (
        <span style={{ color: 'var(--terminal-cmd, #3ad389)', userSelect: 'none', flexShrink: 0 }}>
          {prompt}
        </span>
      )}
      <span style={{ color: color ?? 'var(--terminal-text, #f0f0f0)' }}>{children}</span>
    </div>
  );
}
