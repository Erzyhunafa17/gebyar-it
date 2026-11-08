// src/components/ui/ThemeToggle.tsx
// Minimalist CLI Theme Switcher — triggers Circular Reveal / Circular Wipe on click

'use client';

import React from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Use center of button as origin for the circular wipe
    const x = Math.round(rect.left + rect.width / 2);
    const y = Math.round(rect.top + rect.height / 2);
    toggleTheme(x, y);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.94 }}
      type="button"
      onClick={handleClick}
      aria-label={isLight ? 'Ganti ke tema Cyber Terminal (Dark)' : 'Ganti ke tema Technical Blueprint (Light)'}
      title={isLight ? 'Switch to Cyber Terminal (Dark)' : 'Switch to Technical Blueprint (Light)'}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '7px',
        padding: '6px 10px',
        backgroundColor: 'var(--btn-ghost-bg, var(--surface-inner, var(--bg-surface)))',
        border: '1px solid var(--border-subtle, #292d30)',
        borderRadius: '6px',
        boxShadow: 'var(--shadow-subtle, none)',
        color: 'var(--text-body, #a1a4a5)',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        letterSpacing: '0.04em',
        cursor: 'pointer',
        minHeight: '36px',
        transition: 'border-color 150ms ease, color 150ms ease, background-color 150ms ease, box-shadow 150ms ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'var(--border-active)';
        el.style.backgroundColor = 'var(--btn-ghost-hover-bg, var(--surface-card-hover))';
        el.style.color = 'var(--text-heading)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'var(--border-subtle)';
        el.style.backgroundColor = 'var(--btn-ghost-bg, var(--surface-inner))';
        el.style.color = 'var(--text-body)';
      }}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {isLight ? (
          <Sun size={13} strokeWidth={1.8} style={{ color: '#d97706' }} />
        ) : (
          <Moon size={13} strokeWidth={1.8} style={{ color: '#38bdf8' }} />
        )}
      </motion.div>
      <span style={{ fontWeight: 500 }}>
        {isLight ? 'LIGHT' : 'DARK'}
      </span>
    </motion.button>
  );
}
