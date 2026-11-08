// src/components/lab/LabPageClient.tsx
// Shared lab page layout — used by all 4 lab pages (SE, CSN, GIT, KERIS)
// Sections: Hero, Team, Courses, Careers, Achievements, Activities
// Responsive Dual Theme support (Cyber Terminal Dark & Technical Blueprint Light)

'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import SpotlightCard from '@/components/ui/SpotlightCard';
import TerminalWindow, { TerminalLine } from '@/components/ui/TerminalWindow';
import GhostButton from '@/components/ui/GhostButton';
import StatusDot from '@/components/ui/StatusDot';
import ParticleDrift from '@/components/ui/ParticleDrift';
import TextScramble from '@/components/ui/TextScramble';
import LabAchievementsTerminal from '@/components/lab/LabAchievementsTerminal';
import LabFacilityShowcase from '@/components/lab/LabFacilityShowcase';
import { useTheme } from '@/components/providers/ThemeProvider';
import type { LabData, LabAccent } from '@/data/labsData';
import { ChevronRight, Users, Briefcase, BookOpen, Award, Activity } from 'lucide-react';

// Dynamic 3D shape imports
const LabShape = dynamic(() => import('@/components/lab/LabShape'), {
  ssr: false,
  loading: () => <div style={{ width: '100%', height: 360 }} />,
});

const dotVariant: Record<LabAccent, 'violet' | 'blue' | 'green' | 'amber'> = {
  violet: 'violet',
  blue: 'blue',
  green: 'green',
  amber: 'amber',
};

const lightAccentMap: Record<string, string> = {
  se: '#2563eb',    // royal blue
  csn: '#059669',   // deep emerald
  git: '#d97706',   // deep amber
  keris: '#9333ea', // deep purple
};

export function useLabAccent(lab: LabData) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const accent = isLight ? (lightAccentMap[lab.id] || lab.accentColor) : lab.accentColor;
  return { accent, isLight, theme };
}

interface LabPageClientProps {
  lab: LabData;
}

export default function LabPageClient({ lab }: LabPageClientProps) {
  return (
    <>
      <div className="navbar-offset" />
      <HeroSection lab={lab} />
      <TeamSection lab={lab} />
      <CoursesAndCareers lab={lab} />
      <LabFacilityShowcase lab={lab} />
      <AchievementsSection lab={lab} />
      {lab.hardware && <HardwareSection lab={lab} />}
      {lab.sectors && <SectorsSection lab={lab} />}
      {lab.thesisTopics && <ThesisSection lab={lab} />}
      <ActivitiesSection lab={lab} />
    </>
  );
}

/** ── Hero Section ── */
function HeroSection({ lab }: { lab: LabData }) {
  const { accent, isLight } = useLabAccent(lab);

  return (
    <section
      aria-label={`Hero — Laboratorium ${lab.fullName}`}
      style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px',
        paddingBottom: '64px',
        overflow: 'hidden',
      }}
    >
      {/* Background Animated Particle Drift customized per lab accent */}
      <ParticleDrift accentColor={accent} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 0.75fr)',
            gap: '48px',
            alignItems: 'center',
          }}
          className="lab-hero-grid"
        >
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              maxWidth: '640px',
              width: '100%',
            }}
          >
            {/* Lab badge */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '5px 14px',
                  border: `1px solid ${isLight ? accent + '55' : accent + '33'}`,
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: accent,
                  backgroundColor: isLight ? (accent + '12') : 'rgba(0,0,0,0.5)',
                }}
              >
                {lab.id.toUpperCase()} Lab
              </span>
              <StatusDot variant={dotVariant[lab.accent]} label="Operational" size={6} />
            </div>

            {/* Headline with TextScramble */}
            <h1
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(32px, 4.6vw, 62px)',
                fontWeight: 400,
                color: 'var(--text-heading, #ffffff)',
                letterSpacing: '-0.015em',
                lineHeight: 1.1,
                margin: 0,
                maxWidth: '620px',
                wordBreak: 'break-word',
              }}
            >
              <TextScramble text={lab.fullName} duration={650} as="span" />
            </h1>

            {/* Alt name */}
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '15px',
                fontWeight: 500,
                color: accent,
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              {lab.altName}
            </p>

            {/* Motto */}
            <blockquote
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                color: 'var(--text-body)',
                margin: 0,
                padding: '12px 16px',
                borderLeft: `3px solid ${accent}`,
                background: isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
                borderRadius: '0 6px 6px 0',
                lineHeight: 1.5,
              }}
            >
              &ldquo;{lab.motto}&rdquo;
            </blockquote>

            {/* Profile */}
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '16px',
                color: 'var(--text-body)',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {lab.profile}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <GhostButton href="#team">Lihat Tim</GhostButton>
              <GhostButton href="#achievements">Prestasi</GhostButton>
            </div>
          </motion.div>

          {/* Right: 3D shape */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              overflow: 'hidden',
              pointerEvents: 'none',
            }}
          >
            <LabShape labId={lab.id} accentColor={accent} height={300} />
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .lab-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}

/** ── Team Section ── */
function TeamSection({ lab }: { lab: LabData }) {
  const { accent, isLight } = useLabAccent(lab);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="team"
      ref={ref}
      aria-label="Struktur Organisasi Lab"
      style={{ paddingBottom: '80px' }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '40px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <Users size={16} strokeWidth={1.5} style={{ color: 'var(--text-faint)' }} />
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)', margin: 0 }}>
              Struktur Organisasi
            </p>
          </div>
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
            Tim Pengajar
          </h2>
        </motion.div>

        {/* Head of Lab */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ marginBottom: '24px' }}
        >
          <SpotlightCard accent={accent}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <div
                  style={{
                    position: 'relative',
                    width: '76px',
                    height: '76px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '1px solid var(--border-subtle, #292d30)',
                    backgroundColor: 'var(--surface-inner, #0b0e14)',
                    boxShadow: 'var(--shadow-subtle, none)',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {lab.head.image ? (
                    <Image
                      src={lab.head.image}
                      alt={lab.head.name}
                      fill
                      sizes="76px"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', color: 'var(--text-muted)' }}>
                      {lab.head.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: accent, margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                    Kepala Laboratorium
                  </p>
                  <h3 style={{ fontFamily: 'var(--font-inter)', fontSize: '20px', fontWeight: 600, color: 'var(--text-heading, #ffffff)', margin: '0 0 6px 0' }}>
                    {lab.head.name}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: accent, margin: 0, fontWeight: 500 }}>
                    {lab.head.specialization}
                  </p>
                </div>
              </div>
              <StatusDot variant={dotVariant[lab.accent]} label="Kepala Lab" />
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Members grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {lab.members.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
            >
              <SpotlightCard accent={accent}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      position: 'relative',
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '1px solid var(--border-subtle, #292d30)',
                      backgroundColor: 'var(--surface-inner, #0b0e14)',
                      boxShadow: 'var(--shadow-subtle, none)',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="56px"
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', color: 'var(--text-faint)' }}>
                        {member.name.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-faint)', margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Dosen Anggota
                    </p>
                    <p style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', fontWeight: 600, color: 'var(--text-heading, #f0f0f0)', margin: '0 0 4px 0', lineHeight: 1.3 }}>
                      {member.name}
                    </p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
                      {member.specialization}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** ── Courses & Careers ── */
function CoursesAndCareers({ lab }: { lab: LabData }) {
  const { accent } = useLabAccent(lab);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      aria-label="Mata Kuliah dan Prospek Karir"
      style={{ paddingBottom: '80px' }}
    >
      <div className="section-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
          }}
          className="courses-careers-grid"
        >
          {/* Courses */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <SpotlightCard accent={accent} style={{ height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <BookOpen size={15} strokeWidth={1.5} style={{ color: 'var(--text-faint)' }} />
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)', margin: 0 }}>
                  Mata Kuliah Unggulan
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {lab.courses.map((course) => (
                  <div
                    key={course}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 0',
                      borderBottom: '1px solid var(--border-subtle, #292d30)',
                    }}
                  >
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: accent, flexShrink: 0 }} aria-hidden="true" />
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: 'var(--text-body)' }}>
                      {course}
                    </span>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Careers */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SpotlightCard accent={accent} style={{ height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <Briefcase size={15} strokeWidth={1.5} style={{ color: 'var(--text-faint)' }} />
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)', margin: 0 }}>
                  Prospek Karir
                </p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {lab.careers.map((career) => (
                  <span
                    key={career}
                    style={{
                      padding: '6px 12px',
                      border: '1px solid var(--border-subtle, #292d30)',
                      borderRadius: '6px',
                      background: 'var(--surface-inner)',
                      boxShadow: 'var(--shadow-subtle, none)',
                      fontFamily: 'var(--font-inter)',
                      fontSize: '13px',
                      color: 'var(--text-body)',
                    }}
                  >
                    {career}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .courses-careers-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/** ── Achievements Section ── */
function AchievementsSection({ lab }: { lab: LabData }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="achievements"
      ref={ref}
      aria-label="Prestasi dan Portofolio"
      style={{ paddingBottom: '80px' }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '40px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <Award size={16} strokeWidth={1.5} style={{ color: 'var(--text-faint)' }} />
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)', margin: 0 }}>
              Prestasi & Portofolio
            </p>
          </div>
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
            Pencapaian Lab {lab.name}
          </h2>
        </motion.div>

        <LabAchievementsTerminal lab={lab} />
      </div>
    </section>
  );
}

/** ── Hardware Section (optional) ── */
function HardwareSection({ lab }: { lab: LabData }) {
  const { accent } = useLabAccent(lab);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  if (!lab.hardware || lab.hardware.length === 0) return null;

  return (
    <section
      ref={ref}
      aria-label="Fasilitas Hardware"
      style={{ paddingBottom: '80px' }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '32px' }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)', margin: '0 0 12px 0' }}>
            Fasilitas
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(24px, 3vw, 40px)',
              fontWeight: 400,
              color: 'var(--text-heading, #ffffff)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Perangkat & Hardware Lab
          </h2>
        </motion.div>

        <TerminalWindow title="hardware-specs.txt">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {lab.hardware!.map((hw, i) => (
              <motion.div
                key={hw.name}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.15 }}
              >
                <TerminalLine color={accent}>
                  {'>> '}{hw.name}
                </TerminalLine>
                <TerminalLine indent={1} color="var(--text-muted)">
                  {hw.specs}
                </TerminalLine>
              </motion.div>
            ))}
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}

/** ── Sectors Section (GIT only) ── */
function SectorsSection({ lab }: { lab: LabData }) {
  const { accent } = useLabAccent(lab);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  if (!lab.sectors) return null;

  return (
    <section
      ref={ref}
      aria-label="Sektor Pengguna Lulusan"
      style={{ paddingBottom: '80px' }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '32px' }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)', margin: '0 0 12px 0' }}>
            Penempatan Lulusan
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(24px, 3vw, 40px)',
              fontWeight: 400,
              color: 'var(--text-heading, #ffffff)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Sektor Industri
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="sectors-grid">
          <SpotlightCard accent={accent}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: accent, margin: '0 0 16px 0', fontWeight: 600 }}>
              Instansi Pemerintah
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {lab.sectors.govt.map((s) => (
                <span key={s} style={{ padding: '6px 12px', border: '1px solid var(--border-subtle, #292d30)', borderRadius: '6px', background: 'var(--bg-surface)', fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--text-body)' }}>
                  {s}
                </span>
              ))}
            </div>
          </SpotlightCard>
          <SpotlightCard accent={accent}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: accent, margin: '0 0 16px 0', fontWeight: 600 }}>
              Sektor Swasta
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {lab.sectors.private.map((s) => (
                <span key={s} style={{ padding: '6px 12px', border: '1px solid var(--border-subtle, #292d30)', borderRadius: '6px', background: 'var(--bg-surface)', fontFamily: 'var(--font-inter)', fontSize: '13px', color: 'var(--text-body)' }}>
                  {s}
                </span>
              ))}
            </div>
          </SpotlightCard>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .sectors-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/** ── Thesis Topics (GIT only) ── */
function ThesisSection({ lab }: { lab: LabData }) {
  const { accent } = useLabAccent(lab);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  if (!lab.thesisTopics || lab.thesisTopics.length === 0) return null;

  return (
    <section
      ref={ref}
      aria-label="Contoh Topik Skripsi"
      style={{ paddingBottom: '80px' }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)', margin: '0 0 12px 0' }}>
            Topik Penelitian
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(24px, 3vw, 40px)',
              fontWeight: 400,
              color: 'var(--text-heading, #ffffff)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '0 0 24px 0',
            }}
          >
            Contoh Topik Skripsi
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {lab.thesisTopics!.map((topic, i) => (
              <motion.div
                key={topic}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '14px 16px',
                  border: '1px solid var(--border-subtle, #292d30)',
                  borderRadius: '6px',
                  borderLeft: `3px solid ${accent}`,
                  backgroundColor: 'var(--surface-card, var(--bg-surface-card))',
                  boxShadow: 'var(--card-shadow, none)',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: accent, fontWeight: 600, flexShrink: 0 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.5 }}>
                  {topic}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** ── Activities Section ── */
function ActivitiesSection({ lab }: { lab: LabData }) {
  const { accent, isLight } = useLabAccent(lab);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      aria-label="Dokumentasi Kegiatan"
      style={{ paddingBottom: '96px' }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '32px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <Activity size={16} strokeWidth={1.5} style={{ color: 'var(--text-faint)' }} />
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)', margin: 0 }}>
              Dokumentasi Kegiatan
            </p>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(24px, 3vw, 40px)',
              fontWeight: 400,
              color: 'var(--text-heading, #ffffff)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Aktivitas Lab
          </h2>
        </motion.div>

        {/* Terminal Asset Inspector style */}
        <TerminalWindow title="lab-activities.log">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <TerminalLine color="var(--text-muted)">
              <span style={{ color: isLight ? '#047857' : 'var(--terminal-cmd, #3ad389)' }}>~$ </span>
              ls -la activities/
            </TerminalLine>
            <div style={{ height: '8px' }} />
            {lab.activities.map((activity, i) => (
              <motion.div
                key={activity}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              >
                <TerminalLine indent={1} color="var(--terminal-text)">
                  <span style={{ color: 'var(--text-faint)', marginRight: '8px' }}>{String(i + 1).padStart(2, '0')}.</span>
                  {activity}
                </TerminalLine>
              </motion.div>
            ))}
            <div style={{ height: '4px' }} />
            <TerminalLine color="var(--text-faint)">
              {lab.activities.length} kegiatan terdokumentasi
            </TerminalLine>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}
