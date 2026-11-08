// src/app/page.tsx
// Beranda (Home) — 4 sections:
// 1. Hero — 96px Playfair, 3D cube, ghost CTAs
// 2. Prodi Overview Terminal
// 3. 4 Labs Bento Grid (intentionally varied)
// 4. CLI Lab Recommender (interactive terminal widget)

'use client';

import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import SpotlightCard from '@/components/ui/SpotlightCard';
import TerminalWindow, { TerminalLine } from '@/components/ui/TerminalWindow';
import GhostButton from '@/components/ui/GhostButton';
import StatusDot from '@/components/ui/StatusDot';
import ParallaxHero from '@/components/ui/ParallaxHero';
import ParticleDrift from '@/components/ui/ParticleDrift';
import TextScramble from '@/components/ui/TextScramble';
import { labsData } from '@/data/labsData';
import { ChevronRight } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

// Dynamic import of HeroCube — WebGL only on client
const HeroCube = dynamic(() => import('@/components/ui/HeroCube'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: '100%',
        height: 420,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 120,
          height: 120,
          border: '1px solid #292d30',
          borderRadius: '16px',
        }}
      />
    </div>
  ),
});

// Motion variants — prefers-reduced-motion respected via CSS
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/** ── Section 1: Hero ── */
/** ── Section 1: Hero (with Infinite Looping Typewriter) ── */
function HeroSection() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const words = [
    { text: 'Software Engineering', dark: '#baa7ff', light: '#4338ca' },
    { text: 'Computing System & Network', dark: '#70b8ff', light: '#1d4ed8' },
    { text: 'Geospatial Information Tech', dark: '#3ad389', light: '#047857' },
    { text: 'Artificial Intelligence & KERIS', dark: '#ffd60a', light: '#b45309' },
    { text: 'Smart Campus Innovation', dark: '#baa7ff', light: '#0e7490' },
  ];

  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const activeColor = isLight ? words[currentWordIdx].light : words[currentWordIdx].dark;

  useEffect(() => {
    const fullText = words[currentWordIdx].text;
    const typingSpeed = isDeleting ? 45 : 90;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        const nextText = fullText.slice(0, currentText.length + 1);
        setCurrentText(nextText);

        if (nextText === fullText) {
          // Pause when word completes before deleting
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        // Deleting backward
        const nextText = fullText.slice(0, currentText.length - 1);
        setCurrentText(nextText);

        if (nextText === '') {
          setIsDeleting(false);
          setCurrentWordIdx((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIdx]);

  return (
    <section
      aria-label="Hero — Laboratorium Peminatan TI UIKA"
      style={{
        position: 'relative',
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '20px',
        paddingBottom: '48px',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Animated Particle Drift */}
      <ParticleDrift />

      <div
        className="section-container"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '920px',
          margin: '0 auto',
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          {/* Headline — Playfair Display + Dynamic Looping Typewriter */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(44px, 6.5vw, 84px)',
              fontWeight: 400,
              color: 'var(--text-heading, #ffffff)',
              letterSpacing: '-0.015em',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Laboratorium Peminatan
            <br />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(28px, 4.2vw, 56px)',
                fontWeight: 500,
                color: activeColor,
                letterSpacing: '-0.02em',
                display: 'inline-block',
                marginTop: '8px',
                minHeight: '1.25em',
                transition: 'color 200ms ease',
              }}
            >
              {currentText}
              <span
                style={{
                  display: 'inline-block',
                  width: '3px',
                  height: '0.85em',
                  backgroundColor: activeColor,
                  marginLeft: '6px',
                  verticalAlign: 'baseline',
                  animation: 'typewriterBlink 700ms infinite',
                }}
              />
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(15px, 1.8vw, 17px)',
              color: 'var(--text-body)',
              lineHeight: 1.65,
              margin: 0,
              maxWidth: '680px',
            }}
          >
            Program Studi Teknik Informatika Universitas Ibn Khaldun Bogor
            memiliki empat laboratorium peminatan aktif: SE/RPL, CSN, GIT,
            dan KERIS. Pilih jalur karir dan riset yang sesuai dengan minatmu.
          </motion.p>

          {/* Ghost CTAs */}
          <motion.div
            variants={fadeUp}
            style={{
              display: 'flex',
              gap: '14px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginTop: '4px',
            }}
          >
            <GhostButton href="/#labs">
              Jelajahi Laboratorium
            </GhostButton>
            <GhostButton href="/#prodi">
              Tentang Prodi
            </GhostButton>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes typewriterBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}

/** ── Section 2: Prodi Overview Terminal (with Live Typewriter Scroll Animation) ── */
function ProdiTerminalSection() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const keyColor = isLight ? '#6d28d9' : '#9281f7';
  const strColor = isLight ? '#047857' : '#3ad389';
  const blueColor = isLight ? '#1d4ed8' : '#70b8ff';
  const amberColor = isLight ? '#b45309' : '#ffca16';

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [typedLines, setTypedLines] = useState<number>(0);

  const totalLines = 17;

  useEffect(() => {
    if (!inView) return;

    let current = 0;
    const interval = setInterval(() => {
      current++;
      setTypedLines(current);
      if (current >= totalLines) {
        clearInterval(interval);
      }
    }, 75);

    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section
      id="prodi"
      ref={ref}
      aria-label="Profil Program Studi"
      style={{ paddingBottom: '96px' }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div style={{ marginBottom: '32px' }}>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-faint)',
                margin: '0 0 12px 0',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <TextScramble text="$ WHOAMI" />
              <span className="terminal-cursor-block" />
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(28px, 4vw, 56px)',
                fontWeight: 400,
                color: 'var(--text-heading, #ffffff)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Program Studi Teknik Informatika
            </h2>
          </div>

          <TerminalWindow title="ti.uika — bash">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--terminal-cmd, #3ad389)', userSelect: 'none', flexShrink: 0 }}>
                  ~$
                </span>
                <span style={{ color: 'var(--text-muted, #a1a4a5)' }}>cat prodi-info.json</span>
                <span className="terminal-cursor-block" />
              </div>
              <div style={{ height: '8px' }} />

              {typedLines >= 1 && (
                <TerminalLine color="var(--text-faint)">{'{'}</TerminalLine>
              )}

              {typedLines >= 2 && (
                <TerminalLine indent={1} color="var(--terminal-text)">
                  <span style={{ color: keyColor }}>"universitas"</span>
                  {': '}
                  <span style={{ color: strColor }}>"Universitas Ibn Khaldun (UIKA) Bogor"</span>
                  {','}
                </TerminalLine>
              )}

              {typedLines >= 3 && (
                <TerminalLine indent={1} color="var(--terminal-text)">
                  <span style={{ color: keyColor }}>"prodi"</span>
                  {': '}
                  <span style={{ color: strColor }}>"Teknik Informatika"</span>
                  {','}
                </TerminalLine>
              )}

              {typedLines >= 4 && (
                <TerminalLine indent={1} color="var(--terminal-text)">
                  <span style={{ color: keyColor }}>"visi"</span>
                  {': '}
                  <span style={{ color: strColor }}>"Smart Campus berbasis riset dan inovasi teknologi"</span>
                  {','}
                </TerminalLine>
              )}

              {typedLines >= 5 && (
                <TerminalLine indent={1} color="var(--terminal-text)">
                  <span style={{ color: keyColor }}>"akreditasi"</span>
                  {': '}
                  <span style={{ color: amberColor }}>"Terakreditasi"</span>
                  {','}
                </TerminalLine>
              )}

              {typedLines >= 6 && <div style={{ height: '4px' }} />}

              {typedLines >= 7 && (
                <TerminalLine indent={1} color="var(--terminal-text)">
                  <span style={{ color: keyColor }}>"mitra_industri"</span>
                  {': ['}
                </TerminalLine>
              )}

              {typedLines >= 8 && (
                <TerminalLine indent={2} color={blueColor}>
                  "PT TalentHub Digital Indonesia",
                </TerminalLine>
              )}
              {typedLines >= 9 && (
                <TerminalLine indent={2} color={blueColor}>
                  "PT Telkom Indonesia",
                </TerminalLine>
              )}
              {typedLines >= 10 && (
                <TerminalLine indent={2} color={blueColor}>
                  "BPS Kabupaten Bogor",
                </TerminalLine>
              )}
              {typedLines >= 11 && (
                <TerminalLine indent={2} color={blueColor}>
                  "Korlantas POLRI",
                </TerminalLine>
              )}
              {typedLines >= 12 && (
                <TerminalLine indent={2} color={blueColor}>
                  "Bangkit Academy by Google",
                </TerminalLine>
              )}

              {typedLines >= 13 && (
                <TerminalLine indent={1} color="var(--terminal-text)">{'],'}</TerminalLine>
              )}

              {typedLines >= 14 && <div style={{ height: '4px' }} />}

              {typedLines >= 15 && (
                <TerminalLine indent={1} color="var(--terminal-text)">
                  <span style={{ color: keyColor }}>"laboratorium"</span>
                  {': ['}
                </TerminalLine>
              )}

              {typedLines >= 16 && (
                <>
                  <TerminalLine indent={2} color={keyColor}>
                    "SE / RPL",
                  </TerminalLine>
                  <TerminalLine indent={2} color={blueColor}>
                    "CSN / NCC",
                  </TerminalLine>
                  <TerminalLine indent={2} color={strColor}>
                    "GIT",
                  </TerminalLine>
                  <TerminalLine indent={2} color={amberColor}>
                    "KERIS",
                  </TerminalLine>
                  <TerminalLine indent={1} color="var(--terminal-text)">{']'}</TerminalLine>
                </>
              )}

              {typedLines >= 17 && (
                <>
                  <TerminalLine color="var(--text-faint)">{'}'}</TerminalLine>
                  <div style={{ height: '8px' }} />
                  <TerminalLine prompt="~$" color={strColor}>
                    echo "4 labs operational ✓"
                  </TerminalLine>
                </>
              )}
            </div>
          </TerminalWindow>
        </motion.div>
      </div>

      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}

/** ── Section 3: 4 Labs Bento Grid ── */
function LabsBentoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const accentVariant: Record<string, 'violet' | 'blue' | 'green' | 'amber'> = {
    se: 'violet',
    csn: 'blue',
    git: 'green',
    keris: 'amber',
  };

  return (
    <section
      id="labs"
      ref={ref}
      aria-label="Empat Laboratorium Peminatan"
      style={{ paddingBottom: '96px' }}
    >
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '48px' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-faint)',
              margin: '0 0 12px 0',
            }}
          >
            <TextScramble text="PEMINATAN" />
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(32px, 4vw, 56px)',
              fontWeight: 400,
              color: 'var(--text-heading, #ffffff)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Empat Jalur Riset & Karir
          </h2>
        </motion.div>

        {/* Intentionally varied bento grid — NOT uniform 4-column */}
        {/* Row 1: SE (large) + CSN (compact) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.6fr 1fr',
            gap: '16px',
            marginBottom: '16px',
          }}
          className="bento-row-1"
        >
          {/* SE — large featured card with Blue/Cyan spotlight glow */}
          {labsData.slice(0, 1).map((lab) => (
            <motion.div
              key={lab.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <SpotlightCard glowColor="#00d8ff" style={{ height: '100%' }}>
                <LabCard lab={lab} featured />
              </SpotlightCard>
            </motion.div>
          ))}

          {/* CSN — compact with Emerald/Green spotlight glow */}
          {labsData.slice(1, 2).map((lab) => (
            <motion.div
              key={lab.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SpotlightCard glowColor="#10b981" style={{ height: '100%' }}>
                <LabCard lab={lab} />
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Row 2: GIT (compact) + KERIS (large) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.6fr',
            gap: '16px',
          }}
          className="bento-row-2"
        >
          {/* GIT — compact with Amber/Orange spotlight glow */}
          {labsData.slice(2, 3).map((lab) => (
            <motion.div
              key={lab.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <SpotlightCard glowColor="#f59e0b" style={{ height: '100%' }}>
                <LabCard lab={lab} />
              </SpotlightCard>
            </motion.div>
          ))}

          {/* KERIS — large with Purple/Violet spotlight glow */}
          {labsData.slice(3, 4).map((lab) => (
            <motion.div
              key={lab.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <SpotlightCard glowColor="#a855f7" style={{ height: '100%' }}>
                <LabCard lab={lab} featured />
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .bento-row-1,
          .bento-row-2 {
            grid-template-columns: 1fr !important;
          }
        }
        .lab-thumbnail-frame:hover .lab-thumbnail-img {
          transform: scale(1.08) !important;
          filter: contrast(1.06) brightness(1.04) !important;
        }
        .lab-thumbnail-frame:hover {
          border-color: var(--border-active, #464a4d) !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25) !important;
        }
      `}</style>
    </section>
  );
}

/** Lab card inner content */
function LabCard({ lab, featured = false }: { lab: typeof labsData[0]; featured?: boolean }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const accentLight: Record<string, string> = {
    se: '#2563eb',
    csn: '#059669',
    git: '#d97706',
    keris: '#9333ea',
  };
  const activeAccent = isLight ? (accentLight[lab.id] || lab.accentColor) : lab.accentColor;

  const dotVariant: Record<string, 'violet' | 'blue' | 'green' | 'amber'> = {
    se: 'violet', csn: 'blue', git: 'green', keris: 'amber',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '20px' }}>
      {/* Lab name + status dot */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-faint)',
            backgroundColor: 'var(--surface-inner)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '6px',
            padding: '2px 8px',
            boxShadow: 'var(--shadow-subtle, none)',
          }}
        >
          {lab.id.toUpperCase()}
        </span>
        <div
          style={{
            backgroundColor: 'var(--surface-inner)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '9999px',
            padding: '3px 10px',
            boxShadow: 'var(--shadow-subtle, none)',
          }}
        >
          <StatusDot variant={dotVariant[lab.id]} label={`${lab.name} Aktif`} size={7} />
        </div>
      </div>

      {/* Full name with TextScramble */}
      <h3
        style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: featured ? '28px' : '22px',
          fontWeight: 400,
          color: 'var(--text-heading, #ffffff)',
          lineHeight: 1.2,
          margin: 0,
        }}
      >
        <TextScramble text={lab.fullName} duration={650} />
      </h3>

      {/* Alt name / identity */}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          color: activeAccent,
          margin: 0,
          fontWeight: 500,
        }}
      >
        {lab.altName}
      </p>

      {/* Profile excerpt */}
      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '14px',
          color: 'var(--text-body)',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {lab.profile.slice(0, featured ? 160 : 110)}
        {lab.profile.length > (featured ? 160 : 110) ? '...' : ''}
      </p>

      {/* Facility Image Thumbnail Preview with smooth hover zoom & HUD */}
      <Link
        href={`/lab/${lab.slug}#facility-room`}
        style={{
          position: 'relative',
          width: '100%',
          height: featured ? '180px' : '140px',
          borderRadius: '10px',
          overflow: 'hidden',
          border: '1px solid var(--border-subtle, #292d30)',
          textDecoration: 'none',
          display: 'block',
          backgroundColor: '#000000',
          transition: 'border-color 250ms ease, box-shadow 250ms ease',
        }}
        className="group lab-thumbnail-frame"
        aria-label={`Lihat fasilitas ruang ${lab.name}`}
      >
        <Image
          src={lab.facilityImage}
          alt={lab.facilityTitle}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            transition: 'transform 500ms cubic-bezier(0.25, 1, 0.5, 1), filter 500ms ease',
          }}
          className="lab-thumbnail-img"
        />
        {/* Subtle dark gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 80%)',
            pointerEvents: 'none',
          }}
        />
        {/* Badge in thumbnail */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '12px',
            right: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              color: '#ffffff',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              padding: '3px 8px',
              borderRadius: '4px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: activeAccent }} />
            Ruang Lab // {lab.id.toUpperCase()}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'rgba(255, 255, 255, 0.85)',
              backgroundColor: 'rgba(0, 0, 0, 0.55)',
              padding: '3px 8px',
              borderRadius: '4px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            Lihat Ruang &rarr;
          </span>
        </div>
      </Link>

      {/* Head of lab */}
      <div
        style={{
          borderTop: '1px solid var(--border-subtle, #292d30)',
          paddingTop: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--surface-inner)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '6px 12px',
            boxShadow: 'var(--shadow-subtle, none)',
          }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-faint)', margin: '0 0 2px 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Kepala Lab
          </p>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--text-body)', margin: 0, fontWeight: 500 }}>
            {lab.head.name.split(',')[0]}
          </p>
        </div>

        <Link
          href={`/lab/${lab.slug}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontFamily: 'var(--font-inter)',
            fontSize: '13px',
            color: 'var(--text-heading)',
            backgroundColor: 'var(--surface-inner)',
            textDecoration: 'none',
            padding: '6px 14px',
            border: '1px solid var(--border-subtle, #292d30)',
            borderRadius: '6px',
            boxShadow: 'var(--shadow-subtle, none)',
            transition: 'border-color 150ms ease-out, color 150ms ease-out, background-color 150ms ease-out',
            whiteSpace: 'nowrap',
            minHeight: '36px',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = 'var(--border-active)';
            el.style.backgroundColor = 'var(--surface-card-hover)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = 'var(--border-subtle)';
            el.style.backgroundColor = 'var(--surface-inner)';
          }}
          aria-label={`Lihat detail laboratorium ${lab.fullName}`}
        >
          Lihat Detail
          <ChevronRight size={13} strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}

/** ── Section 4: CLI Lab Recommender ── */
const interests = [
  { key: 'web', label: 'Web & Mobile Dev', lab: 'SE / RPL', href: '/lab/se', color: '#9281f7' },
  { key: 'network', label: 'Jaringan & Cloud', lab: 'CSN / NCC', href: '/lab/csn', color: '#70b8ff' },
  { key: 'gis', label: 'Peta, GIS & Drone', lab: 'GIT', href: '/lab/git', color: '#3ad389' },
  { key: 'ai', label: 'AI & Data Science', lab: 'KERIS', href: '/lab/keris', color: '#ffca16' },
];

const careerMap: Record<string, string[]> = {
  web: ['Fullstack Web Developer', 'Mobile Dev (Android/iOS)', 'UI/UX Designer', 'Software Engineer'],
  network: ['Network Engineer', 'Cloud Architect', 'Cybersecurity Specialist', 'IoT System Designer'],
  gis: ['GIS Analyst', 'WebGIS Developer', 'Remote Sensing Analyst', 'GeoAI Engineer'],
  ai: ['AI & ML Specialist', 'Data Scientist', 'Knowledge Engineer', 'Business Intelligence Analyst'],
};

function CliRecommender() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [selected, setSelected] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [commandInput, setCommandInput] = useState('');
  const [cliHistory, setCliHistory] = useState<Array<{ cmd: string; output: React.ReactNode }>>([]);

  const accentMap: Record<string, string> = {
    web: isLight ? '#2563eb' : '#9281f7',
    network: isLight ? '#059669' : '#70b8ff',
    gis: isLight ? '#d97706' : '#3ad389',
    ai: isLight ? '#9333ea' : '#ffca16',
  };

  const selectedInterest = interests.find((i) => i.key === selected);
  const selectedAccent = selected ? accentMap[selected] : undefined;

  function handleSelect(key: string) {
    if (isSimulating) return;
    setSelected(key);
    setIsSimulating(true);
    setProgress(0);

    const steps = [20, 50, 75, 100];
    steps.forEach((val, idx) => {
      setTimeout(() => {
        setProgress(val);
        if (val === 100) {
          setTimeout(() => {
            setIsSimulating(false);
          }, 350);
        }
      }, (idx + 1) * 140);
    });
  }

  const executeCommand = useCallback((rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode = null;

    if (cmd === 'clear') {
      setCliHistory([]);
      setCommandInput('');
      return;
    } else if (cmd === 'help') {
      output = (
        <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
          Available commands:{' '}
          <span style={{ color: isLight ? '#047857' : '#3ad389', fontWeight: 600 }}>help</span>,{' '}
          <span style={{ color: isLight ? '#047857' : '#3ad389', fontWeight: 600 }}>ls</span>,{' '}
          <span style={{ color: isLight ? '#047857' : '#3ad389', fontWeight: 600 }}>clear</span>,{' '}
          <span style={{ color: isLight ? '#1d4ed8' : '#70b8ff', fontWeight: 600 }}>se</span>,{' '}
          <span style={{ color: isLight ? '#1d4ed8' : '#70b8ff', fontWeight: 600 }}>csn</span>,{' '}
          <span style={{ color: isLight ? '#1d4ed8' : '#70b8ff', fontWeight: 600 }}>git</span>,{' '}
          <span style={{ color: isLight ? '#1d4ed8' : '#70b8ff', fontWeight: 600 }}>keris</span>
        </div>
      );
    } else if (cmd === 'ls') {
      output = (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', color: 'var(--terminal-text)', fontSize: '12px' }}>
          <span style={{ color: isLight ? '#2563eb' : '#9281f7', fontWeight: 600 }}>se/</span>
          <span style={{ color: isLight ? '#059669' : '#70b8ff', fontWeight: 600 }}>csn/</span>
          <span style={{ color: isLight ? '#d97706' : '#3ad389', fontWeight: 600 }}>git/</span>
          <span style={{ color: isLight ? '#9333ea' : '#ffca16', fontWeight: 600 }}>keris/</span>
        </div>
      );
    } else if (['se', 'csn', 'git', 'keris'].includes(cmd)) {
      const match = labsData.find((l) => l.slug === cmd);
      if (match) {
        const labColor = isLight
          ? (match.slug === 'se' ? '#2563eb' : match.slug === 'csn' ? '#059669' : match.slug === 'git' ? '#d97706' : '#9333ea')
          : match.accentColor;
        output = (
          <div style={{ fontSize: '12px', color: 'var(--terminal-text)' }}>
            <span style={{ color: labColor, fontWeight: 600 }}>[{match.name}]</span> {match.fullName} — {match.motto}
            <div style={{ marginTop: '4px' }}>
              <Link href={`/lab/${match.slug}`} style={{ color: isLight ? '#047857' : '#3ad389', textDecoration: 'underline' }}>
                Open /lab/{match.slug} &rarr;
              </Link>
            </div>
          </div>
        );
      }
    } else {
      output = (
        <span style={{ color: isLight ? '#b91c1c' : '#ff6465', fontSize: '12px' }}>
          Command not found: "{cmd}". Type <span style={{ color: 'var(--terminal-text)' }}>help</span> for commands.
        </span>
      );
    }

    setCliHistory((prev) => [...prev, { cmd: rawCmd, output }]);
    setCommandInput('');
  }, [isLight]);

  const hasTypedDemo = useRef(false);
  const userHasInteracted = useRef(false);
  const [isDemoTyping, setIsDemoTyping] = useState(false);

  // Rotating placeholder suggestions so commands remain permanently visible and animated
  const placeholderSuggestions = useMemo(() => [
    "Ketik 'help' untuk panduan daftar perintah...",
    "Ketik 'ls' untuk melihat direktori laboratorium...",
    "Ketik 'csn' untuk profil Lab Computing & Network...",
    "Ketik 'se' untuk profil Lab Software Engineering...",
    "Ketik 'git' untuk profil Lab Geospasial...",
    "Ketik 'keris' untuk profil Lab Artificial Intelligence...",
    "Ketik 'clear' untuk membersihkan layar terminal...",
  ], []);

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderSuggestions.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [placeholderSuggestions.length]);

  const replayDemo = useCallback((cmdToRun = 'help') => {
    setIsDemoTyping(true);
    setCommandInput('');
    let i = 0;
    const typeTimer = setInterval(() => {
      i++;
      setCommandInput(cmdToRun.slice(0, i));
      if (i >= cmdToRun.length) {
        clearInterval(typeTimer);
        setTimeout(() => {
          executeCommand(cmdToRun);
          setIsDemoTyping(false);
        }, 400);
      }
    }, 120);
  }, [executeCommand]);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  // Auto-typing simulation when the terminal enters the viewport
  useEffect(() => {
    if (!inView || hasTypedDemo.current || userHasInteracted.current) return;
    hasTypedDemo.current = true;

    const demoCmd = 'help';
    let i = 0;

    const initialDelay = setTimeout(() => {
      if (userHasInteracted.current) return;
      setIsDemoTyping(true);

      const typeTimer = setInterval(() => {
        if (userHasInteracted.current) {
          clearInterval(typeTimer);
          setIsDemoTyping(false);
          return;
        }

        i++;
        setCommandInput(demoCmd.slice(0, i));

        if (i >= demoCmd.length) {
          clearInterval(typeTimer);
          setTimeout(() => {
            if (userHasInteracted.current) {
              setIsDemoTyping(false);
              return;
            }
            executeCommand(demoCmd);
            setIsDemoTyping(false);
          }, 450);
        }
      }, 140);
    }, 700);

    return () => clearTimeout(initialDelay);
  }, [inView, executeCommand]);

  function handleCommandSubmit(e: React.FormEvent) {
    e.preventDefault();
    userHasInteracted.current = true;
    executeCommand(commandInput);
  }

  return (
    <section
      ref={ref}
      aria-label="CLI Lab Recommender — temukan laboratorium yang tepat"
      style={{ paddingBottom: '96px' }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '32px' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-faint)',
              margin: '0 0 12px 0',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextScramble text="$ LAB-MATCH --INTERACTIVE" />
            <span className="terminal-cursor-block" />
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              fontWeight: 400,
              color: 'var(--text-heading, #ffffff)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Temukan Lab yang Tepat
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '16px',
              color: 'var(--text-body)',
              marginTop: '12px',
              lineHeight: 1.5,
            }}
          >
            Pilih minat utamamu, dan kami rekomendasikan laboratorium yang sesuai.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <TerminalWindow title="lab-recommender — bash">
            {/* Interest selection */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ color: 'var(--text-body)', marginBottom: '12px', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                <span style={{ color: 'var(--terminal-cmd, #3ad389)' }}>~$ </span>
                Pilih minat utamamu:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {interests.map((item) => {
                  const itemColor = accentMap[item.key];
                  const isSelected = selected === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => handleSelect(item.key)}
                      disabled={isSimulating}
                      aria-pressed={isSelected}
                      style={{
                        padding: '7px 14px',
                        background: isSelected
                          ? 'var(--surface-inner, #ffffff)'
                          : 'var(--surface-terminal, transparent)',
                        border: `1px solid ${isSelected ? itemColor : 'var(--border-subtle, #292d30)'}`,
                        borderRadius: '6px',
                        boxShadow: isSelected ? 'var(--shadow-subtle, none)' : 'none',
                        color: isSelected ? itemColor : 'var(--text-body)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        fontWeight: isSelected ? 600 : 400,
                        cursor: isSimulating ? 'wait' : 'pointer',
                        transition: 'border-color 150ms, color 150ms, background-color 150ms, box-shadow 150ms',
                        minHeight: '44px',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.borderColor = 'var(--border-active)';
                          e.currentTarget.style.backgroundColor = 'var(--surface-inner)';
                          e.currentTarget.style.color = 'var(--text-heading)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.borderColor = 'var(--border-subtle)';
                          e.currentTarget.style.backgroundColor = 'var(--surface-terminal, transparent)';
                          e.currentTarget.style.color = 'var(--text-body)';
                        }
                      }}
                    >
                      [{item.key}] {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simulation in progress */}
            {isSimulating && (
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <TerminalLine color={isLight ? '#047857' : '#3ad389'}>
                  {`> Analyzing interest... [${'█'.repeat(Math.floor(progress / 10))}${'░'.repeat(10 - Math.floor(progress / 10))}] ${progress}%`}
                </TerminalLine>
                {progress >= 75 && (
                  <TerminalLine color={isLight ? '#1d4ed8' : '#70b8ff'}>
                    {'> Match found! Fetching lab profile...'}
                  </TerminalLine>
                )}
              </div>
            )}

            {/* Result output */}
            {!isSimulating && selected && selectedInterest && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <TerminalLine color={isLight ? '#047857' : '#3ad389'}>
                    {`> Analyzing interest... [██████████] 100%`}
                  </TerminalLine>
                  <TerminalLine color={isLight ? '#1d4ed8' : '#70b8ff'}>
                    {'> Match found! Fetching lab profile...'}
                  </TerminalLine>
                  <div style={{ height: '4px' }} />
                  <TerminalLine color="var(--terminal-text)">
                    {'Rekomendasi: '}
                    <span style={{ color: selectedAccent, fontWeight: 600 }}>
                      Lab {selectedInterest.lab}
                    </span>
                  </TerminalLine>
                  <div style={{ height: '4px' }} />
                  <TerminalLine color="var(--text-muted)">Jalur karir yang terbuka:</TerminalLine>
                  {careerMap[selected].map((career) => (
                    <TerminalLine key={career} indent={1} color={isLight ? '#1d4ed8' : '#70b8ff'}>
                      {'- '}{career}
                    </TerminalLine>
                  ))}
                  <div style={{ height: '8px' }} />
                  <TerminalLine color={isLight ? '#047857' : '#3ad389'}>
                    {'Rekomendasi selesai. Kunjungi halaman lab untuk detail lengkap.'}
                  </TerminalLine>
                  <div style={{ marginTop: '12px' }}>
                    <Link
                      href={selectedInterest.href}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px',
                        background: 'var(--surface-inner, #ffffff)',
                        border: `1px solid ${selectedAccent}`,
                        borderRadius: '6px',
                        boxShadow: 'var(--shadow-subtle, none)',
                        color: selectedAccent,
                        fontFamily: 'var(--font-mono)',
                        fontSize: '13px',
                        fontWeight: 500,
                        textDecoration: 'none',
                        transition: 'opacity 150ms, background-color 150ms',
                        minHeight: '44px',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.opacity = '0.85';
                        el.style.backgroundColor = 'var(--surface-card-hover)';
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.opacity = '1';
                        el.style.backgroundColor = 'var(--surface-inner, #ffffff)';
                      }}
                      aria-label={`Kunjungi halaman laboratorium ${selectedInterest.lab}`}
                    >
                      cd /lab/{selectedInterest.href.split('/').pop()}
                      <ChevronRight size={13} strokeWidth={1.5} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Default state — no selection yet */}
            {!selected && !isSimulating && (
              <div style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', fontSize: '13px', borderTop: '1px solid var(--terminal-border)', paddingTop: '14px' }}>
                # Pilih salah satu minat di atas atau gunakan CLI interaktif di bawah
              </div>
            )}

            {/* Easter Egg CLI History & Input */}
            <div style={{ marginTop: '20px', borderTop: '1px solid var(--terminal-border)', paddingTop: '16px' }}>
              {cliHistory.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '8px' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '12px', display: 'flex', gap: '6px' }}>
                    <span style={{ color: 'var(--terminal-cmd, #3ad389)' }}>guest@uika:~$</span>
                    <span style={{ color: 'var(--terminal-text)' }}>{item.cmd}</span>
                  </div>
                  <div style={{ marginTop: '2px', paddingLeft: '12px' }}>
                    {item.output}
                  </div>
                </div>
              ))}

              {/* Interactive Prompt Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ 
                    display: 'inline-block', 
                    width: '6px', 
                    height: '6px', 
                    borderRadius: '50%', 
                    backgroundColor: isLight ? '#059669' : '#3ad389',
                    boxShadow: isLight ? '0 0 6px rgba(5, 150, 105, 0.4)' : '0 0 8px rgba(58, 211, 137, 0.6)'
                  }} />
                  <span style={{ 
                    fontSize: '11px', 
                    fontFamily: 'var(--font-mono)', 
                    color: isLight ? '#0f766e' : '#3ad389', 
                    letterSpacing: '0.04em',
                    fontWeight: 600
                  }}>
                    {isDemoTyping ? 'SIMULASI KETIK AKTIF...' : 'CLI INTERAKTIF • KETIK SENDIRI DI BAWAH'}
                  </span>
                </div>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-faint)' }}>
                  Perintah: <code style={{ color: isLight ? '#047857' : '#3ad389', fontWeight: 600 }}>help</code>, <code style={{ color: isLight ? '#047857' : '#3ad389', fontWeight: 600 }}>ls</code>, <code style={{ color: isLight ? '#047857' : '#3ad389', fontWeight: 600 }}>csn</code>, <code style={{ color: isLight ? '#047857' : '#3ad389', fontWeight: 600 }}>se</code>, <code style={{ color: isLight ? '#047857' : '#3ad389', fontWeight: 600 }}>clear</code>
                </span>
              </div>

              <form
                onSubmit={handleCommandSubmit}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  background: isLight ? 'rgba(241, 245, 249, 0.75)' : 'rgba(15, 23, 42, 0.45)',
                  border: isLight ? '1px solid rgba(203, 213, 225, 0.85)' : '1px solid rgba(58, 211, 137, 0.25)',
                  borderRadius: '6px',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
              >
                <span style={{ color: 'var(--terminal-cmd, #3ad389)', fontFamily: 'var(--font-mono)', fontSize: '12px', userSelect: 'none', fontWeight: 600 }}>
                  guest@uika:~$
                </span>
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => {
                    userHasInteracted.current = true;
                    setCommandInput(e.target.value);
                  }}
                  onFocus={() => {
                    userHasInteracted.current = true;
                  }}
                  placeholder={isDemoTyping ? "Memulai simulasi ketik..." : placeholderSuggestions[placeholderIndex]}
                  aria-label="Terminal command input"
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'var(--terminal-text, #f0f0f0)',
                  }}
                />
                <span className="terminal-cursor-block" style={{ width: '7px', height: '14px' }} />
              </form>

              {/* Persistent Clickable Command Chips — always visible throughout user session */}
              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', userSelect: 'none', marginRight: '2px' }}>
                  Aksi Cepat:
                </span>
                {[
                  { cmd: 'help', label: '⚡ help', color: isLight ? '#059669' : '#3ad389' },
                  { cmd: 'ls', label: '📁 ls', color: isLight ? '#2563eb' : '#70b8ff' },
                  { cmd: 'se', label: '💻 se', color: isLight ? '#2563eb' : '#9281f7' },
                  { cmd: 'csn', label: '🌐 csn', color: isLight ? '#059669' : '#3ad389' },
                  { cmd: 'git', label: '🗺️ git', color: isLight ? '#d97706' : '#ffca16' },
                  { cmd: 'keris', label: '🤖 keris', color: isLight ? '#9333ea' : '#d946ef' },
                  { cmd: 'clear', label: '🧹 clear', color: 'var(--text-muted)' },
                ].map((item) => (
                  <button
                    key={item.cmd}
                    type="button"
                    onClick={() => {
                      userHasInteracted.current = true;
                      executeCommand(item.cmd);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 9px',
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      borderRadius: '5px',
                      background: isLight ? 'rgba(241, 245, 249, 0.95)' : 'rgba(30, 41, 59, 0.65)',
                      border: `1px solid ${isLight ? 'rgba(203, 213, 225, 0.9)' : 'rgba(255, 255, 255, 0.12)'}`,
                      color: item.color,
                      cursor: 'pointer',
                      fontWeight: 500,
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                      (e.currentTarget as HTMLElement).style.borderColor = item.color;
                      (e.currentTarget as HTMLElement).style.background = isLight ? 'rgba(226, 232, 240, 1)' : 'rgba(30, 41, 59, 0.95)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                      (e.currentTarget as HTMLElement).style.borderColor = isLight ? 'rgba(203, 213, 225, 0.9)' : 'rgba(255, 255, 255, 0.12)';
                      (e.currentTarget as HTMLElement).style.background = isLight ? 'rgba(241, 245, 249, 0.95)' : 'rgba(30, 41, 59, 0.65)';
                    }}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => replayDemo('help')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 9px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    borderRadius: '5px',
                    background: 'transparent',
                    border: '1px dashed var(--text-faint)',
                    color: 'var(--text-faint)',
                    cursor: 'pointer',
                    marginLeft: 'auto',
                    transition: 'color 0.15s ease, border-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = isLight ? '#059669' : '#3ad389';
                    (e.currentTarget as HTMLElement).style.color = isLight ? '#059669' : '#3ad389';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--text-faint)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-faint)';
                  }}
                  title="Putar ulang simulasi ketik otomatis"
                >
                  ↺ Ulangi Demo
                </button>
              </div>
            </div>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  );
}

/** ── Page Root ── */
export default function HomePage() {
  useEffect(() => {
    // Reset scroll restoration so refreshing the page always lands at the top of Home
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <>
      <div className="navbar-offset" />
      <HeroSection />
      <ProdiTerminalSection />
      <LabsBentoSection />
      <ParallaxHero
        title="Laboratorium & Peminatan Teknik Informatika"
        subtitle="Dari Software Engineering, Cloud & Security, Geospasial hingga Kecerdasan Buatan terdepan di UIKA Bogor."
      />
      <CliRecommender />
    </>
  );
}
