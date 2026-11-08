// src/components/ui/StatusDot.tsx
// 2-3px filled circle dot + label in JetBrains Mono with live pulsing server monitoring ring

import React from 'react';

type StatusVariant = 'green' | 'violet' | 'blue' | 'amber' | 'red';

const colorMap: Record<StatusVariant, string> = {
  green: '#3ad389',
  violet: '#9281f7',
  blue: '#70b8ff',
  amber: '#ffca16',
  red: '#ff9592',
};

interface StatusDotProps {
  variant: StatusVariant;
  label: string;
  size?: number;
  pulse?: boolean;
}

export default function StatusDot({
  variant,
  label,
  size = 7,
  pulse = true,
}: StatusDotProps) {
  const color = colorMap[variant];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        color: '#a1a4a5',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: `${size + 8}px`,
          height: `${size + 8}px`,
          flexShrink: 0,
        }}
      >
        {/* Pulsing ring */}
        {pulse && (
          <span
            style={{
              position: 'absolute',
              width: `${size + 6}px`,
              height: `${size + 6}px`,
              borderRadius: '50%',
              backgroundColor: color,
              opacity: 0.45,
              animation: 'statusPulse 2s cubic-bezier(0, 0, 0.2, 1) infinite',
            }}
          />
        )}
        {/* Core solid dot */}
        <span
          style={{
            position: 'relative',
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            backgroundColor: color,
            display: 'inline-block',
          }}
        />
      </span>
      <span style={{ color }}>{label}</span>
    </span>
  );
}
