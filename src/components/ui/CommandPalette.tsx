// src/components/ui/CommandPalette.tsx
// Global Interactive Spotlight Command Palette (Cmd + K / Ctrl + K)
// Developer/CLI Luxury aesthetic with instant fuzzy search for Labs, Lecturers, Careers, Facilities & Actions

'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { labsData } from '@/data/labsData';
import { useTheme } from '@/components/providers/ThemeProvider';
import {
  Search,
  Terminal,
  User,
  Cpu,
  Compass,
  ArrowRight,
  Sun,
  Moon,
  Copy,
  Check,
  Building,
  Camera,
  Award,
  BookOpen,
  Sparkles,
  CornerDownLeft,
  X,
} from 'lucide-react';

export interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Laboratorium' | 'Dosen & Tim' | 'Minat & Karir' | 'Aksi Cepat';
  badge: string;
  accent?: string;
  icon: React.ReactNode;
  keywords: string;
  onSelect: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Open / Close helper
  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setQuery('');
  }, []);

  // Listen for Cmd+K / Ctrl+K and custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        handleClose();
      }
    };

    const handleCustomOpen = () => handleOpen();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, [isOpen, handleOpen, handleClose]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Generate searchable commands
  const allCommands = useMemo<CommandItem[]>(() => {
    const items: CommandItem[] = [];

    // 1. Laboratorium items
    labsData.forEach((lab) => {
      items.push({
        id: `lab-${lab.id}`,
        title: `${lab.name} — ${lab.fullName}`,
        subtitle: lab.motto,
        category: 'Laboratorium',
        badge: lab.id.toUpperCase(),
        accent: lab.accentColor,
        icon: <Cpu size={16} style={{ color: lab.accentColor }} />,
        keywords: `${lab.name} ${lab.fullName} ${lab.altName} ${lab.motto} ${lab.id} lab laboratorium`,
        onSelect: () => {
          router.push(`/lab/${lab.slug}`);
          handleClose();
        },
      });

      // Lab facility photo shortcut
      items.push({
        id: `facility-${lab.id}`,
        title: `Ruang & Fasilitas ${lab.name}`,
        subtitle: lab.facilityTitle,
        category: 'Laboratorium',
        badge: 'FASILITAS',
        accent: lab.accentColor,
        icon: <Camera size={16} style={{ color: lab.accentColor }} />,
        keywords: `fasilitas ruang foto gedung peralatan ${lab.name} ${lab.id}`,
        onSelect: () => {
          router.push(`/lab/${lab.slug}#facility-room`);
          handleClose();
        },
      });
    });

    // 2. Dosen & Struktur Organisasi
    labsData.forEach((lab) => {
      // Kepala lab
      items.push({
        id: `head-${lab.id}`,
        title: lab.head.name,
        subtitle: `Kepala Lab ${lab.name} • Spesialisasi: ${lab.head.specialization}`,
        category: 'Dosen & Tim',
        badge: 'KEPALA LAB',
        accent: lab.accentColor,
        icon: <User size={16} style={{ color: lab.accentColor }} />,
        keywords: `${lab.head.name} ${lab.head.specialization} kepala lab ${lab.name}`,
        onSelect: () => {
          router.push(`/lab/${lab.slug}#team`);
          handleClose();
        },
      });

      // Anggota lab
      lab.members.forEach((m, idx) => {
        items.push({
          id: `member-${lab.id}-${idx}`,
          title: m.name,
          subtitle: `Dosen Lab ${lab.name} • Spesialisasi: ${m.specialization}`,
          category: 'Dosen & Tim',
          badge: lab.id.toUpperCase(),
          accent: lab.accentColor,
          icon: <User size={16} style={{ color: 'var(--text-muted)' }} />,
          keywords: `${m.name} ${m.specialization} dosen pengajar ${lab.name}`,
          onSelect: () => {
            router.push(`/lab/${lab.slug}#team`);
            handleClose();
          },
        });
      });
    });

    // 3. Minat & Prospek Karir
    const careersSet = new Map<string, { labName: string; slug: string; accent: string }>();
    labsData.forEach((lab) => {
      lab.careers.forEach((c) => {
        if (!careersSet.has(c)) {
          careersSet.set(c, { labName: lab.name, slug: lab.slug, accent: lab.accentColor });
        }
      });
    });

    careersSet.forEach((val, career) => {
      items.push({
        id: `career-${career}`,
        title: career,
        subtitle: `Jalur Karir Unggulan di Lab ${val.labName}`,
        category: 'Minat & Karir',
        badge: val.labName,
        accent: val.accent,
        icon: <Compass size={16} style={{ color: val.accent }} />,
        keywords: `karir profesi pekerjaan lulusan ${career} ${val.labName}`,
        onSelect: () => {
          router.push(`/lab/${val.slug}#courses-careers`);
          handleClose();
        },
      });
    });

    // 4. Aksi Cepat (Quick Actions)
    items.push({
      id: 'action-theme',
      title: `Beralih ke Tema ${theme === 'dark' ? 'Technical Blueprint (Light)' : 'Cyber Terminal (Dark)'}`,
      subtitle: 'Ganti tampilan visual antarmuka sistem secara instan',
      category: 'Aksi Cepat',
      badge: 'THEME',
      icon: theme === 'dark' ? <Sun size={16} style={{ color: '#d97706' }} /> : <Moon size={16} style={{ color: '#38bdf8' }} />,
      keywords: 'ganti tema switch theme dark light mode siang malam',
      onSelect: () => {
        toggleTheme();
        handleClose();
      },
    });

    items.push({
      id: 'action-copy-email',
      title: 'Salin Email Resmi Prodi TI UIKA',
      subtitle: 'informatika@uika-bogor.ac.id',
      category: 'Aksi Cepat',
      badge: 'KONTAK',
      icon: copied ? <Check size={16} style={{ color: '#3ad389' }} /> : <Copy size={16} style={{ color: 'var(--text-muted)' }} />,
      keywords: 'salin copy email kontak hubungi surat surat resmi uika',
      onSelect: () => {
        if (typeof navigator !== 'undefined') {
          navigator.clipboard.writeText('informatika@uika-bogor.ac.id');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      },
    });

    items.push({
      id: 'action-match',
      title: 'CLI Interactive Lab Matcher',
      subtitle: 'Simulasi pemilihan laboratorium berdasarkan minat & bakat',
      category: 'Aksi Cepat',
      badge: 'REKOMENDASI',
      icon: <Terminal size={16} style={{ color: '#3ad389' }} />,
      keywords: 'rekomendasi lab match cli terminal interactive minat bakat karir',
      onSelect: () => {
        router.push('/#lab-match');
        handleClose();
      },
    });

    items.push({
      id: 'action-prodi',
      title: 'Tentang Program Studi Teknik Informatika',
      subtitle: 'Visi smart campus, akreditasi, dan mitra industri teknologi',
      category: 'Aksi Cepat',
      badge: 'PRODI',
      icon: <Building size={16} style={{ color: '#70b8ff' }} />,
      keywords: 'profil prodi visi akreditasi uika bogor teknik informatika',
      onSelect: () => {
        router.push('/#prodi');
        handleClose();
      },
    });

    return items;
  }, [theme, toggleTheme, router, handleClose, copied]);

  // Filter items based on query
  const filteredCommands = useMemo(() => {
    if (!query.trim()) {
      return allCommands.slice(0, 16); // Show top suggestions
    }
    const q = query.toLowerCase().trim();
    return allCommands.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        item.keywords.toLowerCase().includes(q)
    );
  }, [allCommands, query]);

  // Arrow key navigation
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].onSelect();
      }
    }
  };

  // Auto-scroll selected item into view
  useEffect(() => {
    const el = listRef.current?.children[selectedIndex] as HTMLElement | undefined;
    if (el) {
      el.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={handleClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            backgroundColor: 'rgba(0, 0, 0, 0.72)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: 'clamp(48px, 12vh, 120px)',
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          {/* Palette Dialog Box */}
          <motion.div
            initial={{ scale: 0.96, y: -16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: -16, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
            style={{
              width: '100%',
              maxWidth: '640px',
              backgroundColor: 'var(--surface-card, #000000)',
              border: '1px solid var(--border-active, #464a4d)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.5), var(--shadow-subtle, none)',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: 'min(580px, 80vh)',
            }}
          >
            {/* Search Input Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 20px',
                borderBottom: '1px solid var(--border-subtle, #292d30)',
                backgroundColor: 'var(--surface-terminal-header, #0b0e14)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#3ad389', fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600 }}>
                  ~$
                </span>
                <Search size={16} strokeWidth={1.8} style={{ color: 'var(--text-faint)' }} />
              </div>

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari lab, dosen, karir, teknologi, atau jalankan aksi..."
                aria-label="Cari di TI.UIKA Labs"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text-heading, #ffffff)',
                  fontFamily: 'var(--font-inter)',
                  fontSize: '15px',
                }}
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-faint)',
                    cursor: 'pointer',
                    padding: '2px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  title="Hapus pencarian"
                >
                  <X size={15} />
                </button>
              )}

              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-faint)',
                  backgroundColor: 'var(--surface-inner)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '4px',
                  padding: '2px 6px',
                }}
              >
                ESC
              </span>
            </div>

            {/* Results List */}
            <div
              ref={listRef}
              role="listbox"
              style={{
                overflowY: 'auto',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                flex: 1,
              }}
            >
              {filteredCommands.length === 0 ? (
                <div
                  style={{
                    padding: '36px 20px',
                    textAlign: 'center',
                    color: 'var(--text-faint)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                  }}
                >
                  <Terminal size={24} style={{ margin: '0 auto 10px', opacity: 0.5 }} />
                  <div>Tidak ada hasil untuk "{query}"</div>
                  <div style={{ fontSize: '11px', marginTop: '6px', color: 'var(--text-muted)' }}>
                    Coba kata kunci lain: "se", "csn", "dosen", "ai", "drone", atau "tema"
                  </div>
                </div>
              ) : (
                filteredCommands.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      role="option"
                      aria-selected={isSelected}
                      onClick={item.onSelect}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        backgroundColor: isSelected
                          ? 'var(--surface-inner, rgba(255, 255, 255, 0.06))'
                          : 'transparent',
                        borderLeft: isSelected
                          ? `3px solid ${item.accent || '#9281f7'}`
                          : '3px solid transparent',
                        transition: 'background-color 100ms ease, border-left-color 100ms ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            backgroundColor: 'var(--surface-terminal, rgba(255, 255, 255, 0.03))',
                            border: '1px solid var(--border-subtle)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {item.icon}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div
                            style={{
                              fontFamily: 'var(--font-inter)',
                              fontSize: '14px',
                              fontWeight: isSelected ? 500 : 400,
                              color: isSelected ? 'var(--text-heading, #ffffff)' : 'var(--text-body)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {item.title}
                          </div>
                          {item.subtitle && (
                            <div
                              style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '11px',
                                color: 'var(--text-faint)',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                marginTop: '2px',
                              }}
                            >
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10px',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            border: '1px solid var(--border-subtle)',
                            color: item.accent || 'var(--text-faint)',
                            backgroundColor: 'var(--surface-card, transparent)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                          }}
                        >
                          {item.badge}
                        </span>
                        {isSelected && (
                          <CornerDownLeft size={13} style={{ color: 'var(--text-faint)' }} />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Keyboard Navigation Hints Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 18px',
                borderTop: '1px solid var(--border-subtle, #292d30)',
                backgroundColor: 'var(--surface-terminal, rgba(0, 0, 0, 0.4))',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-faint)',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <kbd style={{ padding: '1px 5px', borderRadius: '3px', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--surface-inner)' }}>↑</kbd>
                  <kbd style={{ padding: '1px 5px', borderRadius: '3px', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--surface-inner)' }}>↓</kbd>
                  <span>navigasi</span>
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <kbd style={{ padding: '1px 5px', borderRadius: '3px', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--surface-inner)' }}>↵</kbd>
                  <span>pilih</span>
                </span>
              </div>
              <span style={{ color: 'var(--text-faint)' }}>
                TI.UIKA // SPOTLIGHT
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

