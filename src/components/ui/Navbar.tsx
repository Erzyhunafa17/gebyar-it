// src/components/ui/Navbar.tsx
// Global sticky navbar — #000000f2 bg + blur(25px), mobile-responsive
// Design: Resend aesthetic — TI.UIKA // LABS wordmark, ghost nav links

'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, Search } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';

const navLinks = [
  { label: 'Beranda', href: '/' },
  { label: 'SE / RPL', href: '/lab/se' },
  { label: 'CSN', href: '/lab/csn' },
  { label: 'GIT', href: '/lab/git' },
  { label: 'KERIS', href: '/lab/keris' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close on Escape key — keyboard accessibility
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && mobileOpen) {
      setMobileOpen(false);
    }
  }, [mobileOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        role="banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: '64px',
          backgroundColor: 'var(--header-bg)',
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
          borderBottom: '1px solid var(--header-border)',
          transition: 'background-color 200ms ease, border-color 200ms ease',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          {/* ── Wordmark & Logo ── */}
          <Link
            href="/"
            aria-label="TI.UIKA Labs — Beranda"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                padding: '4px',
              }}
            >
              <Image
                src="/logo/logo_uika.png"
                alt="Logo UIKA Bogor"
                width={26}
                height={26}
                style={{
                  objectFit: 'contain',
                  filter: 'brightness(1.15) contrast(1.1) drop-shadow(0 0 6px rgba(146, 129, 247, 0.35))',
                }}
                priority
              />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--text-heading)',
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
              }}
            >
              TI.UIKA{' '}
              <span style={{ color: '#9281f7' }}>//</span>
              {' '}LABS
            </span>
          </Link>

          {/* ── Desktop nav links ── */}
          <nav
            role="navigation"
            aria-label="Navigasi utama"
            style={{
              alignItems: 'center',
              gap: '4px',
            }}
            className="nav-desktop-links"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: '6px 12px',
                    fontSize: '14px',
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 400,
                    color: isActive ? 'var(--text-heading)' : 'var(--text-muted)',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    transition: 'color 150ms ease-out',
                    minHeight: '44px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.target as HTMLElement).style.color = 'var(--text-heading)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.target as HTMLElement).style.color = 'var(--text-muted)';
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Right: ThemeToggle + Cmd+K + CTA + Burger ── */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}
          >
            {/* Minimalist CLI Theme Switcher */}
            <ThemeToggle />

            {/* Cmd+K search trigger — opens Command Palette */}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
              aria-label="Buka pencarian cepat (Cmd K)"
              style={{
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                background: 'var(--btn-ghost-bg, var(--surface-inner, transparent))',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                boxShadow: 'var(--shadow-subtle, none)',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                cursor: 'pointer',
                minHeight: '44px',
                whiteSpace: 'nowrap',
                transition: 'border-color 150ms ease-out, color 150ms ease-out, background-color 150ms ease-out, box-shadow 150ms ease-out',
              }}
              className="nav-desktop-links"
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'var(--border-active)';
                el.style.backgroundColor = 'var(--btn-ghost-hover-bg, var(--surface-card-hover))';
                el.style.color = 'var(--text-heading)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'var(--border-subtle)';
                el.style.backgroundColor = 'var(--btn-ghost-bg, var(--surface-inner, transparent))';
                el.style.color = 'var(--text-muted)';
              }}
            >
              <Terminal size={13} strokeWidth={1.5} />
              <span>Cmd K</span>
            </button>

            {/* Ghost CTA */}
            <Link
              href="/#labs"
              className="nav-desktop-links btn-ghost"
              style={{ minWidth: 'unset', padding: '8px 16px', fontSize: '14px' }}
            >
              Jelajahi Lab
            </Link>

            {/* Mobile hamburger with rotation/scale animation */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              aria-label={mobileOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: mobileOpen ? 'rgba(146, 129, 247, 0.1)' : 'var(--bg-surface, transparent)',
                border: mobileOpen ? '1px solid #9281f7' : '1px solid var(--border-subtle)',
                borderRadius: '6px',
                color: mobileOpen ? 'var(--text-heading)' : 'var(--text-muted)',
                padding: '8px',
                cursor: 'pointer',
                minHeight: '44px',
                minWidth: '44px',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'border-color 150ms ease-out, background 150ms ease-out',
              }}
              className="nav-mobile-btn"
            >
              <motion.div
                initial={false}
                animate={{ rotate: mobileOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </header>

      {/* ── Mobile nav overlay with smooth slide & fade animation ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi mobile"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: '64px',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99,
              backgroundColor: 'var(--header-bg)',
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
              borderTop: '1px solid var(--header-border)',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              overflowY: 'auto',
            }}
          >
            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                window.dispatchEvent(new CustomEvent('open-command-palette'));
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                backgroundColor: 'var(--surface-inner)',
                color: 'var(--text-body)',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                cursor: 'pointer',
                marginBottom: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search size={14} style={{ color: '#3ad389' }} />
                <span>Pencarian Cepat</span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-faint)', backgroundColor: 'var(--surface-card)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                Cmd K
              </span>
            </button>

            {/* Mobile Theme Switcher Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-surface)',
                marginBottom: '8px',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
                MODE TEMA
              </span>
              <ThemeToggle />
            </div>

            {navLinks.map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      padding: '14px 16px',
                      fontSize: '16px',
                      fontFamily: 'var(--font-inter)',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'var(--text-heading)' : 'var(--text-muted)',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      border: isActive ? '1px solid #9281f7' : '1px solid var(--border-subtle)',
                      backgroundColor: isActive ? 'rgba(146, 129, 247, 0.08)' : 'var(--bg-surface)',
                      minHeight: '52px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'border-color 150ms ease, background 150ms ease, color 150ms ease',
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: '#9281f7',
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.2 }}
              style={{ marginTop: '16px', borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}
            >
              <Link
                href="/#labs"
                onClick={() => setMobileOpen(false)}
                className="btn-ghost"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  minHeight: '48px',
                  fontSize: '15px',
                }}
              >
                Jelajahi Laboratorium
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
