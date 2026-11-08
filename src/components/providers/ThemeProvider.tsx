// src/components/providers/ThemeProvider.tsx
// Dual Theme System: Cyber Terminal (Dark) & Technical Blueprint / GitHub Light IDE (Light)
// Persists user choice in localStorage with default 'dark'
// Circular Reveal / Circular Wipe transition originating smoothly from Theme Toggle button

'use client';

import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { flushSync } from 'react-dom';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (x?: number, y?: number) => void;
  setTheme: (theme: Theme) => void;
}

interface CircularReveal {
  x: number;
  y: number;
  maxRadius: number;
  color: string;
  phase: 'expanding' | 'done';
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);
  const [reveal, setReveal] = useState<CircularReveal | null>(null);
  const revealTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Clear all pending timers on unmount
  useEffect(() => {
    return () => revealTimers.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme') as Theme | null;
      const initialTheme = saved === 'light' ? 'light' : 'dark';
      setThemeState(initialTheme);
      applyTheme(initialTheme);
    } catch {
      applyTheme('dark');
    }
    setMounted(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    if (t === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    }
    window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme: t } }));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch {}
  };

  const toggleTheme = useCallback((x?: number, y?: number) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const nextColor = nextTheme === 'light' ? '#fafafa' : '#000000';

    // Check prefers-reduced-motion
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || x === undefined || y === undefined) {
      // Skip animation — apply directly
      setTheme(nextTheme);
      return;
    }

    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // 1. Native View Transitions API with ultra-smooth circular reveal
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      try {
        const transition = (document as unknown as {
          startViewTransition: (cb: () => void) => { ready: Promise<void> };
        }).startViewTransition(() => {
          flushSync(() => {
            setThemeState(nextTheme);
            applyTheme(nextTheme);
          });
          try {
            localStorage.setItem('theme', nextTheme);
          } catch {}
        });

        transition.ready.then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${maxRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 850,
              // Gentle start that blossoms from the button and spreads smoothly across the viewport
              easing: 'cubic-bezier(0.35, 0, 0.25, 1)',
              pseudoElement: '::view-transition-new(root)',
            }
          );
        });
        return;
      } catch {
        // Fallback below if startViewTransition throws
      }
    }

    // 2. Fallback Circular Reveal Overlay
    setReveal({ x, y, maxRadius, color: nextColor, phase: 'expanding' });

    // Mid-wipe DOM theme application
    const t1 = setTimeout(() => {
      setThemeState(nextTheme);
      applyTheme(nextTheme);
      try { localStorage.setItem('theme', nextTheme); } catch {}
    }, 400);

    // Remove overlay after animation completes
    const t2 = setTimeout(() => {
      setReveal(null);
    }, 900);

    revealTimers.current = [t1, t2];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}

      {/* Fallback Circular Reveal Overlay */}
      {reveal && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: reveal.color,
            pointerEvents: 'none',
            clipPath: `circle(0px at ${reveal.x}px ${reveal.y}px)`,
            animation: 'circularReveal 850ms cubic-bezier(0.35, 0, 0.25, 1) forwards',
            willChange: 'clip-path',
            ['--reveal-x' as string]: `${reveal.x}px`,
            ['--reveal-y' as string]: `${reveal.y}px`,
            ['--reveal-radius' as string]: `${reveal.maxRadius}px`,
          }}
        />
      )}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
