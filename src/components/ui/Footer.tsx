// src/components/ui/Footer.tsx
// Global footer — 3-column layout, real contact info for Prodi TI UIKA Bogor
// Responsive Dual Theme support (Cyber Terminal Dark & Technical Blueprint Light)

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, Phone } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

const labLinks = [
  { label: 'SE / RPL — Software Engineering', href: '/lab/se' },
  { label: 'CSN — Computing System & Network', href: '/lab/csn' },
  { label: 'GIT — Geospatial Information Technology', href: '/lab/git' },
  { label: 'KERIS — Knowledge Engineering & Intelligent Systems', href: '/lab/keris' },
];

export default function Footer() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const operationalColor = isLight ? '#047857' : '#3ad389';
  const brandViolet = isLight ? '#4338ca' : '#9281f7';

  const statusLabs = [
    { label: 'SE / RPL', color: isLight ? '#2563eb' : '#9281f7' },
    { label: 'CSN / NCC', color: isLight ? '#059669' : '#70b8ff' },
    { label: 'GIT', color: isLight ? '#d97706' : '#3ad389' },
    { label: 'KERIS', color: isLight ? '#9333ea' : '#ffca16' },
  ];

  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: '1px solid var(--border-subtle, #292d30)',
        backgroundColor: 'var(--bg-canvas, #000000)',
        paddingTop: '64px',
        paddingBottom: '48px',
        transition: 'background-color 200ms ease, border-color 200ms ease',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* ── 3-column grid ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '48px',
            marginBottom: '48px',
          }}
        >
          {/* Column 1: Address & Contact */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div
                style={{
                  position: 'relative',
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px',
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/logo/logo_uika.png"
                  alt="Logo Universitas Ibn Khaldun Bogor"
                  width={28}
                  height={28}
                  style={{
                    objectFit: 'contain',
                    filter: isLight
                      ? 'none'
                      : 'brightness(1.15) contrast(1.1) drop-shadow(0 0 8px rgba(146, 129, 247, 0.35))',
                  }}
                />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--text-faint)',
                    margin: 0,
                  }}
                >
                  Program Studi
                </p>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: brandViolet,
                  }}
                >
                  UIKA BOGOR
                </span>
              </div>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: '20px',
                fontWeight: 400,
                color: 'var(--text-heading, #ffffff)',
                margin: '0 0 8px 0',
                lineHeight: 1.3,
              }}
            >
              Teknik Informatika
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '13px',
                color: 'var(--text-muted)',
                margin: '0 0 20px 0',
                lineHeight: 1.5,
              }}
            >
              Universitas Ibn Khaldun Bogor
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Address */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <MapPin
                  size={14}
                  strokeWidth={1.5}
                  style={{ color: 'var(--text-faint)', flexShrink: 0, marginTop: '2px' }}
                />
                <address
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '13px',
                    color: 'var(--text-body)',
                    fontStyle: 'normal',
                    lineHeight: 1.5,
                  }}
                >
                  Jl. KH. Sholeh Iskandar Km.2,
                  <br />
                  Kedung Badak, Tanah Sareal,
                  <br />
                  Kota Bogor, Jawa Barat 16162
                </address>
              </div>

              {/* Email badge */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Mail
                  size={14}
                  strokeWidth={1.5}
                  style={{ color: 'var(--text-faint)', flexShrink: 0 }}
                />
                <a
                  href="mailto:informatika@uika-bogor.ac.id"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    color: brandViolet,
                    fontWeight: 500,
                    textDecoration: 'none',
                    letterSpacing: '-0.01em',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.textDecoration = 'underline')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.textDecoration = 'none')}
                >
                  informatika@uika-bogor.ac.id
                </a>
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Phone
                  size={14}
                  strokeWidth={1.5}
                  style={{ color: 'var(--text-faint)', flexShrink: 0 }}
                />
                <a
                  href="tel:+625187940777"
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '13px',
                    color: 'var(--text-body)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.textDecoration = 'underline')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.textDecoration = 'none')}
                >
                  (0251) 8940777
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick links to 4 labs */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-faint)',
                marginBottom: '16px',
                marginTop: 0,
              }}
            >
              Laboratorium Peminatan
            </p>
            <nav aria-label="Tautan laboratorium" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {labLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '14px',
                    color: 'var(--text-body)',
                    textDecoration: 'none',
                    lineHeight: 1.4,
                    minHeight: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'color 150ms ease-out',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--text-heading)')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--text-body)')}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Status indicator */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-faint)',
                marginBottom: '16px',
                marginTop: 0,
              }}
            >
              Status Sistem
            </p>

            {/* System status — All 4 labs operational with pulsing ring */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '20px',
              }}
            >
              {/* Pulsing status dot */}
              <span
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '16px',
                  height: '16px',
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                <span
                  style={{
                    position: 'absolute',
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: operationalColor,
                    opacity: 0.5,
                    animation: 'statusPulse 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                  }}
                />
                <span
                  style={{
                    position: 'relative',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: operationalColor,
                    display: 'inline-block',
                  }}
                />
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  color: operationalColor,
                  fontWeight: 600,
                }}
              >
                All 4 Research Labs Operational
              </span>
            </div>

            <div
              style={{
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              {statusLabs.map(({ label, color }) => (
                <div
                  key={label}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: color,
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: 'var(--text-body)',
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle, #292d30)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '13px',
              color: 'var(--text-muted)',
              margin: 0,
            }}
          >
            &copy; {new Date().getFullYear()} Program Studi Teknik Informatika, Universitas Ibn Khaldun Bogor.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--text-body)',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ color: 'var(--text-faint)' }}>//</span> Made by{' '}
              <span
                style={{
                  color: brandViolet,
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                }}
              >
                Erzy Hunafa
              </span>
            </p>

            <span
              style={{
                display: 'inline-block',
                width: '1px',
                height: '12px',
                backgroundColor: 'var(--border-subtle)',
              }}
              aria-hidden="true"
            />

            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--text-faint)',
                margin: 0,
              }}
            >
              Lomba Website Gebyar IT 2026
            </p>
          </div>
        </div>
      </div>

      {/* ── Keyframe for pulsing status dot ── */}
      <style>{`
        @keyframes statusPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </footer>
  );
}
