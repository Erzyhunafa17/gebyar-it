// src/components/lab/LabAchievementsTerminal.tsx
// Interactive Reusable Achievements Terminal for all 4 lab pages (/lab/se, /lab/csn, /lab/git, /lab/keris)
// Features:
// 1. Dynamic lab theme mapping (SE: Cyan/Blue, CSN: Emerald/Green, GIT: Amber/Orange, KERIS: Purple/Gold)
// 2. Staggered log streaming reveal on viewport enter (~120ms per block)
// 3. Dynamic CLI flag filtering: `~$ grep --category:` with [--all] and category flags
// 4. Auto syntax-highlighting for metrics, years, currencies, and honors with animated count-up numbers
// 5. IDE-style active block hover (focus highlighting, dimming unhovered blocks to opacity-60)

'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useTheme } from '@/components/providers/ThemeProvider';
import type { LabData, Achievement } from '@/data/labsData';
import { Terminal, Filter, CheckCircle2, ChevronRight, Hash } from 'lucide-react';

/* ── 1. Lab Theme Configuration ── */
export interface LabTheme {
  primary: string;       // CLI prompt, active border, main accent
  secondary: string;     // Secondary highlight / metric color
  glow: string;          // Subtle glow on active elements
  border: string;        // Border accent
  activeBg: string;      // Block hover background
  tagBg: string;         // Filter tag background
  badgeText: string;     // Pill text color
}

export const labThemes: Record<string, LabTheme> = {
  se: {
    primary: '#38bdf8',       // Blue / Cyan
    secondary: '#818cf8',
    glow: 'rgba(56, 189, 248, 0.25)',
    border: 'rgba(56, 189, 248, 0.35)',
    activeBg: 'rgba(56, 189, 248, 0.04)',
    tagBg: 'rgba(56, 189, 248, 0.10)',
    badgeText: '#7dd3fc',
  },
  csn: {
    primary: '#3ad389',      // Emerald / Green
    secondary: '#34d399',
    glow: 'rgba(58, 211, 137, 0.25)',
    border: 'rgba(58, 211, 137, 0.35)',
    activeBg: 'rgba(58, 211, 137, 0.04)',
    tagBg: 'rgba(58, 211, 137, 0.10)',
    badgeText: '#6ee7b7',
  },
  git: {
    primary: '#f59e0b',      // Amber / Orange
    secondary: '#fb923c',
    glow: 'rgba(245, 158, 11, 0.25)',
    border: 'rgba(245, 158, 11, 0.35)',
    activeBg: 'rgba(245, 158, 11, 0.04)',
    tagBg: 'rgba(245, 158, 11, 0.10)',
    badgeText: '#fcd34d',
  },
  keris: {
    primary: '#c084fc',      // Purple / Violet
    secondary: '#ffca16',    // Yellow-Gold
    glow: 'rgba(192, 132, 252, 0.25)',
    border: 'rgba(192, 132, 252, 0.35)',
    activeBg: 'rgba(192, 132, 252, 0.04)',
    tagBg: 'rgba(192, 132, 252, 0.10)',
    badgeText: '#e9d5ff',
  },
};

/* ── Light Mode Themes (Technical Blueprint / GitHub Light IDE) ── */
export const labThemesLight: Record<string, LabTheme> = {
  se: {
    primary: '#2563eb',       // blue-600
    secondary: '#0e7490',     // cyan-700
    glow: 'rgba(37, 99, 235, 0.15)',
    border: '#bfdbfe',        // blue-200
    activeBg: '#eff6ff',      // blue-50
    tagBg: '#eff6ff',
    badgeText: '#1d4ed8',
  },
  csn: {
    primary: '#059669',       // emerald-600
    secondary: '#047857',     // emerald-700
    glow: 'rgba(5, 150, 105, 0.15)',
    border: '#a7f3d0',        // emerald-200
    activeBg: '#ecfdf5',      // emerald-50
    tagBg: '#ecfdf5',
    badgeText: '#047857',
  },
  git: {
    primary: '#d97706',       // amber-600
    secondary: '#c2410c',     // orange-700
    glow: 'rgba(217, 119, 6, 0.15)',
    border: '#fde68a',        // amber-200
    activeBg: '#fffbeb',      // amber-50
    tagBg: '#fffbeb',
    badgeText: '#b45309',
  },
  keris: {
    primary: '#9333ea',       // purple-600
    secondary: '#6d28d9',     // violet-700
    glow: 'rgba(147, 51, 234, 0.15)',
    border: '#e9d5ff',        // purple-200
    activeBg: '#faf5ff',      // purple-50
    tagBg: '#faf5ff',
    badgeText: '#7e22ce',
  },
};

/* ── 2. Category Inference Helper ── */
export interface CategorizedAchievement extends Achievement {
  categorySlug: string;
  categoryLabel: string;
}

function inferCategory(title: string): { slug: string; label: string } {
  const lower = title.toLowerCase();
  if (lower.includes('hibah') || lower.includes('penelitian')) {
    return { slug: 'hibah-riset', label: '--hibah-riset' };
  }
  if (lower.includes('mbkm') || lower.includes('magang')) {
    return { slug: 'mbkm-magang', label: '--mbkm-magang' };
  }
  if (lower.includes('proyek')) {
    return { slug: 'proyek', label: '--proyek' };
  }
  if (lower.includes('drone') || lower.includes('perangkat') || lower.includes('hardware')) {
    return { slug: 'hardware', label: '--hardware' };
  }
  if (lower.includes('lulusan')) {
    return { slug: 'lulusan', label: '--lulusan' };
  }
  return { slug: 'prestasi', label: '--prestasi' };
}

/* ── 3. Animated Number Counter Hook & Component ── */
function AnimatedCounter({
  target,
  decimals = 0,
  inView,
  prefix = '',
  suffix = '',
}: {
  target: number;
  decimals?: number;
  inView: boolean;
  prefix?: string;
  suffix?: string;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;

    // Respect prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(target);
      return;
    }

    let startTime: number | null = null;
    const duration = 500; // ms

    const step = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = ease * target;
      setCurrent(val);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCurrent(target);
      }
    };

    const anim = requestAnimationFrame(step);
    return () => cancelAnimationFrame(anim);
  }, [inView, target]);

  return (
    <span>
      {prefix}
      {current.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ── 4. Tokenizer & Syntax Highlighting Engine ── */
// Parses a sub-point text into syntax tokens (Years, Numbers/Currencies, Recognizable Honors, normal text)
function HighlightedItemText({
  text,
  theme,
  inView,
}: {
  text: string;
  theme: LabTheme;
  inView: boolean;
}) {
  // Regex rules to capture specific keywords:
  // 1. Rp 140 Juta
  // 2. IPK 3.94 / IPK 3.91
  // 3. 2 mahasiswa
  // 4. 5 Besar Nasional / 10 Besar Hackathon Nasional
  // 5. Juara I, II, dan III / Juara 2
  // 6. Years (2019, 2020, 2022, 2024, 2025)
  // 7. Notable entities & programs
  const tokens = useMemo(() => {
    // Patterns for metric pills with animated count
    const patterns = [
      {
        regex: /(Rp\s*)(140)(\s*Juta)/gi,
        render: (match: string, p1: string, p2: string, p3: string, key: number) => (
          <span
            key={key}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '1px 7px',
              margin: '0 3px',
              borderRadius: '4px',
              backgroundColor: theme.tagBg,
              border: `1px solid ${theme.border}`,
              color: theme.primary,
              fontWeight: 600,
              fontSize: '12px',
              letterSpacing: '0.01em',
            }}
          >
            {p1}
            <AnimatedCounter target={140} decimals={0} inView={inView} />
            {p3}
          </span>
        ),
      },
      {
        regex: /(IPK\s*)(3\.9[14])/gi,
        render: (match: string, p1: string, p2: string, key: number) => (
          <span
            key={key}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '1px 7px',
              margin: '0 3px',
              borderRadius: '4px',
              backgroundColor: theme.tagBg,
              border: `1px solid ${theme.border}`,
              color: theme.secondary,
              fontWeight: 600,
              fontSize: '12px',
            }}
          >
            {p1}
            <AnimatedCounter target={parseFloat(p2)} decimals={2} inView={inView} />
          </span>
        ),
      },
      {
        regex: /(2)(\s+mahasiswa)/gi,
        render: (match: string, p1: string, p2: string, key: number) => (
          <span
            key={key}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '1px 7px',
              margin: '0 3px',
              borderRadius: '4px',
              backgroundColor: theme.tagBg,
              border: `1px solid ${theme.border}`,
              color: theme.primary,
              fontWeight: 600,
              fontSize: '12px',
            }}
          >
            <AnimatedCounter target={2} decimals={0} inView={inView} />
            {p2}
          </span>
        ),
      },
      {
        regex: /((?:Juara\s+(?:I,\s*II,\s*dan\s*III|2)|5\s+Besar\s+Nasional|10\s+Besar))/gi,
        render: (match: string, p1: string, key: number) => (
          <span
            key={key}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '1px 6px',
              margin: '0 2px',
              borderRadius: '4px',
              backgroundColor: 'rgba(255, 202, 22, 0.12)',
              border: '1px solid rgba(255, 202, 22, 0.35)',
              color: '#ffca16',
              fontWeight: 600,
              fontSize: '12px',
            }}
          >
            {match}
          </span>
        ),
      },
      {
        regex: /\b(2019|2020|2022|2024|2025)\b/g,
        render: (match: string, key: number) => (
          <span
            key={key}
            style={{
              color: theme.primary,
              fontWeight: 600,
              textDecoration: 'underline',
              textDecorationColor: `${theme.primary}55`,
              textUnderlineOffset: '3px',
            }}
          >
            {match}
          </span>
        ),
      },
      {
        regex: /(Best Capstone Project|Google Student Ambassador \(GSA\)|Bangkit Academy by Google|Bangkit Academy|Distinction Graduate|LLDIKTI|UNISEL Malaysia|PT Telkom Bandung|PT Telkom Jakarta|PT Telkom|Mahasiswa Teladan|DJI Phantom 4 Pro|DJI Phantom 4 Multispectral|LoRa\/NB-IoT|Hybrid Cloud Networking)/gi,
        render: (match: string, key: number) => (
          <span
            key={key}
            style={{
              color: 'var(--text-heading, #ffffff)',
              fontWeight: 500,
              letterSpacing: '0.01em',
            }}
          >
            {match}
          </span>
        ),
      },
    ];

    // Simple multi-pass tokenizer
    let parts: (string | React.ReactNode)[] = [text];

    // Helper to replace text matches with rendered elements
    const replacePattern = (
      inputParts: (string | React.ReactNode)[],
      regex: RegExp,
      renderFn: (...args: any[]) => React.ReactNode
    ) => {
      const output: (string | React.ReactNode)[] = [];
      let keyCounter = 0;

      inputParts.forEach((part) => {
        if (typeof part !== 'string') {
          output.push(part);
          return;
        }

        let lastIndex = 0;
        let match: RegExpExecArray | null;
        // reset regex
        regex.lastIndex = 0;

        while ((match = regex.exec(part)) !== null) {
          const matchStart = match.index;
          const matchEnd = regex.lastIndex;

          if (matchStart > lastIndex) {
            output.push(part.substring(lastIndex, matchStart));
          }

          output.push(renderFn(...match, ++keyCounter));
          lastIndex = matchEnd;

          if (!regex.global) break;
        }

        if (lastIndex < part.length) {
          output.push(part.substring(lastIndex));
        }
      });

      return output;
    };

    // Apply all patterns sequentially
    patterns.forEach((p) => {
      parts = replacePattern(parts, p.regex, p.render);
    });

    return parts;
  }, [text, theme, inView]);

  return <>{tokens}</>;
}

/* ── 5. Main Component ── */
interface LabAchievementsTerminalProps {
  lab: LabData;
  className?: string;
}

export default function LabAchievementsTerminal({ lab, className }: LabAchievementsTerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const inView = useInView(terminalRef, { once: true, margin: '-60px' });
  const { theme: currentTheme } = useTheme();
  const isLight = currentTheme === 'light';

  // Get color theme for this lab (dark or light)
  const theme = isLight
    ? (labThemesLight[lab.id] ?? labThemesLight.se)
    : (labThemes[lab.id] ?? labThemes.se);
  const fileName = `${lab.id}-achievements.log`;

  // Categorize achievements
  const categorizedAchievements: CategorizedAchievement[] = useMemo(() => {
    return lab.achievements.map((item) => {
      const { slug, label } = inferCategory(item.title);
      return {
        ...item,
        categorySlug: slug,
        categoryLabel: label,
      };
    });
  }, [lab.achievements]);

  // Extract available unique category flags
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    categorizedAchievements.forEach((a) => set.add(a.categorySlug));
    return Array.from(set);
  }, [categorizedAchievements]);

  // CLI Flag filter state
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Filtered achievements
  const displayedAchievements = useMemo(() => {
    if (activeFilter === 'all') return categorizedAchievements;
    return categorizedAchievements.filter((a) => a.categorySlug === activeFilter);
  }, [categorizedAchievements, activeFilter]);

  return (
    <div
      ref={terminalRef}
      className={className}
      style={{
        width: '100%',
        backgroundColor: 'var(--surface-terminal, var(--terminal-bg, #000000))',
        border: '1px solid var(--color-graphite-hairline, var(--terminal-border, #292d30))',
        borderRadius: '16px',
        overflow: 'hidden',
        fontFamily: 'var(--font-mono)',
        boxShadow: isLight ? 'var(--card-shadow, var(--shadow-subtle))' : `0 0 40px ${theme.activeBg}`,
        transition: 'background-color 200ms ease, border-color 200ms ease, box-shadow 200ms ease',
      }}
    >
      {/* ── Terminal Header with Traffic Light Dots & Active File Tab ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 18px',
          borderBottom: '1px solid var(--color-graphite-hairline, var(--terminal-border, #292d30))',
          backgroundColor: 'var(--surface-terminal-header, var(--terminal-header-bg, #000000))',
          transition: 'background-color 200ms ease, border-color 200ms ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Traffic-light dots */}
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff6465', display: 'inline-block' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffca16', display: 'inline-block' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#3ad389', display: 'inline-block' }} />
          
          <div
            style={{
              marginLeft: '12px',
              padding: '2px 10px',
              borderRadius: '4px',
              border: '1px solid var(--border-subtle, #292d30)',
              backgroundColor: 'var(--surface-inner)',
              boxShadow: 'var(--shadow-subtle, none)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Terminal size={12} style={{ color: theme.primary }} />
            <span style={{ fontSize: '11px', color: 'var(--text-muted, #a1a4a5)', letterSpacing: '0.02em' }}>
              {fileName}
            </span>
          </div>
        </div>

        {/* Live Lab Indicator Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: theme.primary,
              boxShadow: `0 0 8px ${theme.primary}`,
              display: 'inline-block',
            }}
          />
          <span style={{ fontSize: '11px', color: 'var(--text-faint, #6e727a)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {lab.id.toUpperCase()} // ACTIVE
          </span>
        </div>
      </div>

      {/* ── CLI Command Bar & Dynamic Filter Flags ── */}
      <div
        style={{
          padding: '12px 20px',
          borderBottom: '1px solid var(--terminal-border, #292d30)',
          backgroundColor: 'var(--surface-terminal)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginRight: '6px' }}>
          <span style={{ color: theme.primary, fontWeight: 600 }}>~$</span>
          <span style={{ color: 'var(--text-muted, #6e727a)', fontSize: '12px' }}>grep --category:</span>
        </div>

        {/* [--all] Flag */}
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            padding: '3px 10px',
            borderRadius: '4px',
            border: activeFilter === 'all' ? `1px solid ${theme.primary}` : '1px solid var(--border-subtle, #292d30)',
            backgroundColor: activeFilter === 'all' ? theme.tagBg : 'var(--surface-inner)',
            boxShadow: 'var(--shadow-subtle, none)',
            color: activeFilter === 'all' ? theme.primary : 'var(--text-muted, #6e727a)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          [--all]
        </button>

        {/* Dynamic Category Flags */}
        {availableCategories.map((slug) => {
          const isActive = activeFilter === slug;
          return (
            <button
              key={slug}
              type="button"
              onClick={() => setActiveFilter(slug)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                padding: '3px 10px',
                borderRadius: '4px',
                border: isActive ? `1px solid ${theme.primary}` : '1px solid var(--border-subtle, #292d30)',
                backgroundColor: isActive ? theme.tagBg : 'var(--surface-inner)',
                boxShadow: 'var(--shadow-subtle, none)',
                color: isActive ? theme.primary : 'var(--text-muted, #6e727a)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              [--{slug}]
            </button>
          );
        })}

        {/* Showing entries count */}
        <div style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--text-faint, #464a4d)' }}>
          matches: {displayedAchievements.length} of {categorizedAchievements.length}
        </div>
      </div>

      {/* ── Terminal Body (Staggered Log Streaming & IDE Hover Blocks) ── */}
      <div
        style={{
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          overflowX: 'auto',
        }}
      >
        {/* Terminal Execution Prompt */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-faint, #6e727a)', fontSize: '12px' }}>
          <span style={{ color: theme.primary }}>guest@uika:~$</span>
          <span>cat {fileName}</span>
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '14px',
              backgroundColor: theme.primary,
              animation: 'termBlink 800ms infinite',
              verticalAlign: 'middle',
            }}
          />
        </div>

        {/* Achievement Blocks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <AnimatePresence mode="popLayout">
            {displayedAchievements.map((achievement, idx) => {
              const isHovered = hoveredIndex === idx;
              const isAnyHovered = hoveredIndex !== null;

              return (
                <motion.div
                  key={achievement.title}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={
                    inView
                      ? {
                          opacity: isAnyHovered ? (isHovered ? 1 : 0.45) : 1,
                          y: 0,
                        }
                      : {}
                  }
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{
                    duration: 0.35,
                    delay: inView ? idx * 0.12 : 0,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    position: 'relative',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    backgroundColor: isHovered ? theme.activeBg : 'transparent',
                    borderTopWidth: '1px',
                    borderRightWidth: '1px',
                    borderBottomWidth: '1px',
                    borderLeftWidth: '3px',
                    borderTopStyle: 'solid',
                    borderRightStyle: 'solid',
                    borderBottomStyle: 'solid',
                    borderLeftStyle: 'solid',
                    borderTopColor: isHovered ? theme.border : 'transparent',
                    borderRightColor: isHovered ? theme.border : 'transparent',
                    borderBottomColor: isHovered ? theme.border : 'transparent',
                    borderLeftColor: isHovered ? theme.primary : 'var(--border-subtle, #292d30)',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    cursor: 'default',
                  }}
                >
                  {/* Header Line: Prompt + Title + Category Badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginBottom: '10px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          color: isHovered ? theme.primary : 'var(--text-faint, #464a4d)',
                          userSelect: 'none',
                          fontSize: '11px',
                        }}
                      >
                        [0{idx + 1}]
                      </span>
                      <span
                        style={{
                          color: theme.primary,
                          fontWeight: 600,
                          fontSize: '14px',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        $ {achievement.title}
                      </span>
                    </div>

                    <span
                      style={{
                        fontSize: '10px',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        border: '1px solid var(--border-subtle, #292d30)',
                        color: 'var(--text-faint, #6e727a)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                      }}
                    >
                      {achievement.categorySlug}
                    </span>
                  </div>

                  {/* Sub-item lines */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      paddingLeft: '16px',
                    }}
                  >
                    {achievement.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          gap: '8px',
                          fontSize: '13px',
                          lineHeight: 1.6,
                          color: 'var(--text-body, #a1a4a5)',
                        }}
                      >
                        <span style={{ color: theme.secondary, userSelect: 'none' }}>-</span>
                        <div>
                          <HighlightedItemText
                            text={item}
                            theme={theme}
                            inView={inView}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ── Terminal Footer Status Line ── */}
        <div
          style={{
            marginTop: '12px',
            paddingTop: '14px',
            borderTop: '1px solid var(--terminal-border, #292d30)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '11px',
            color: 'var(--text-muted, #464a4d)',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={12} style={{ color: theme.primary }} />
            <span>[STATUS 200] Log stream synced -- 100% verified data</span>
          </div>
          <div>
            <span>Encoding: UTF-8</span> &bull; <span>Terminal: TI.UIKA-CLI</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes termBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

