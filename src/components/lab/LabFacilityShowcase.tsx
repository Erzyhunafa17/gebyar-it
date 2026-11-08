// src/components/lab/LabFacilityShowcase.tsx
// Interactive Facility & Lab Room Showcase with Developer HUD, Viewfinder Reticles & Scanline Animation
// Dual Theme ready with smooth scale, scanline sweep, and fullscreen modal inspection

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLabAccent } from '@/components/lab/LabPageClient';
import type { LabData } from '@/data/labsData';
import { Camera, Maximize2, X, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

interface LabFacilityShowcaseProps {
  lab: LabData;
  className?: string;
}

export default function LabFacilityShowcase({ lab, className }: LabFacilityShowcaseProps) {
  const { accent, isLight } = useLabAccent(lab);
  const [isHovered, setIsHovered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <section
      id="facility-room"
      aria-label="Dokumentasi Fasilitas dan Ruang Laboratorium"
      className={className}
      style={{ paddingBottom: '96px' }}
    >
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '36px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <Camera size={16} strokeWidth={1.5} style={{ color: accent }} />
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
              Fasilitas Fisik & Ruang Kerja
            </p>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 400,
              color: 'var(--text-heading, #ffffff)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              margin: '0 0 12px 0',
            }}
          >
            Ruang Laboratorium {lab.name}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '15px',
              color: 'var(--text-muted)',
              maxWidth: '680px',
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Dokumentasi ruang laboratorium dan studio kerja mahasiswa untuk praktikum, riset skripsi, serta kolaborasi proyek nyata.
          </p>
        </motion.div>

        {/* ── Interactive Viewport Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            backgroundColor: 'var(--surface-card, #000000)',
            border: `1px solid ${isHovered ? accent : 'var(--border-subtle, #292d30)'}`,
            boxShadow: isHovered
              ? `0 12px 40px ${isLight ? 'rgba(0,0,0,0.1)' : accent + '22'}`
              : 'var(--card-shadow, none)',
            transition: 'border-color 300ms ease, box-shadow 300ms ease',
          }}
        >
          {/* Top Terminal HUD Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 18px',
              backgroundColor: 'var(--surface-terminal-header, #0b0e14)',
              borderBottom: '1px solid var(--border-subtle, #292d30)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              flexWrap: 'wrap',
              gap: '10px',
              zIndex: 3,
              position: 'relative',
            }}
          >
            {/* Traffic-light dots + filename */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#ff6465', display: 'inline-block' }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#ffca16', display: 'inline-block' }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#3ad389', display: 'inline-block' }} />
              </div>
              <span style={{ color: 'var(--text-faint)', marginLeft: '6px' }}>
                ~$ cat facilities/{lab.id}-room.raw
              </span>
            </div>

            {/* Live Camera Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'var(--surface-inner)',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-subtle, none)',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: '#059669',
                    boxShadow: '0 0 8px #059669',
                    display: 'inline-block',
                    animation: 'pulseDot 1.6s infinite',
                  }}
                />
                <span
                  style={{
                    fontSize: '10.5px',
                    color: isLight ? '#047857' : '#34d399',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  LIVE // FACILITY_VIEW
                </span>
              </div>

              <span style={{ color: 'var(--text-faint)', fontSize: '11px' }}>
                UIKA_TI // {lab.id.toUpperCase()}
              </span>
            </div>
          </div>

          {/* ── Main Photo Frame with Interactive Viewfinder HUD ── */}
          <div
            onClick={() => setIsFullscreen(true)}
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(360px, 50vw, 540px)',
              cursor: 'zoom-in',
              overflow: 'hidden',
              backgroundColor: '#000000',
            }}
          >
            {/* The Image with smooth scale hover */}
            <motion.div
              animate={{
                scale: isHovered ? 1.04 : 1,
              }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
              }}
            >
              <Image
                src={lab.facilityImage}
                alt={lab.facilityTitle}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  filter: isHovered ? 'contrast(1.05) brightness(1.02)' : 'contrast(1.0) brightness(0.96)',
                  transition: 'filter 400ms ease',
                }}
              />
            </motion.div>

            {/* Subtle Vignette & Gradient Shadows */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: isLight
                  ? 'linear-gradient(to top, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.15) 50%, rgba(15, 23, 42, 0.25) 100%)'
                  : 'linear-gradient(to top, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%)',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />

            {/* Scanline Sweep Laser Animation on Hover */}
            <motion.div
              initial={false}
              animate={{
                top: isHovered ? ['0%', '100%'] : '0%',
                opacity: isHovered ? [0, 0.8, 0.8, 0] : 0,
              }}
              transition={{
                duration: 2.2,
                repeat: isHovered ? Infinity : 0,
                ease: 'linear',
              }}
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: '3px',
                background: `linear-gradient(90deg, transparent 0%, ${accent} 50%, transparent 100%)`,
                boxShadow: `0 0 14px ${accent}`,
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />

            {/* Corner Viewfinder Crosshairs (HUD Reticles) */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: '20px',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            >
              {/* Top-Left */}
              <motion.span
                animate={{
                  x: isHovered ? 4 : 0,
                  y: isHovered ? 4 : 0,
                  borderColor: isHovered ? accent : 'rgba(255, 255, 255, 0.35)',
                }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '24px',
                  height: '24px',
                  borderTop: '2px solid',
                  borderLeft: '2px solid',
                }}
              />
              {/* Top-Right */}
              <motion.span
                animate={{
                  x: isHovered ? -4 : 0,
                  y: isHovered ? 4 : 0,
                  borderColor: isHovered ? accent : 'rgba(255, 255, 255, 0.35)',
                }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '24px',
                  height: '24px',
                  borderTop: '2px solid',
                  borderRight: '2px solid',
                }}
              />
              {/* Bottom-Left */}
              <motion.span
                animate={{
                  x: isHovered ? 4 : 0,
                  y: isHovered ? -4 : 0,
                  borderColor: isHovered ? accent : 'rgba(255, 255, 255, 0.35)',
                }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '24px',
                  height: '24px',
                  borderBottom: '2px solid',
                  borderLeft: '2px solid',
                }}
              />
              {/* Bottom-Right */}
              <motion.span
                animate={{
                  x: isHovered ? -4 : 0,
                  y: isHovered ? -4 : 0,
                  borderColor: isHovered ? accent : 'rgba(255, 255, 255, 0.35)',
                }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '24px',
                  height: '24px',
                  borderBottom: '2px solid',
                  borderRight: '2px solid',
                }}
              />

              {/* Center Crosshair appearing on hover */}
              <motion.div
                animate={{ opacity: isHovered ? 0.75 : 0, scale: isHovered ? 1 : 0.8 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '40px',
                  height: '40px',
                  pointerEvents: 'none',
                }}
              >
                <div style={{ position: 'absolute', top: '19px', left: 0, right: 0, height: '2px', backgroundColor: accent }} />
                <div style={{ position: 'absolute', left: '19px', top: 0, bottom: 0, width: '2px', backgroundColor: accent }} />
                <div style={{ position: 'absolute', inset: '8px', border: `1px dashed ${accent}`, borderRadius: '50%' }} />
              </motion.div>
            </div>

            {/* Click to Inspect Prompt Badge */}
            <motion.div
              animate={{ opacity: isHovered ? 1 : 0.85, y: isHovered ? 0 : 4 }}
              transition={{ duration: 0.25 }}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                zIndex: 3,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '6px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.04em',
                pointerEvents: 'none',
              }}
            >
              <Maximize2 size={12} strokeWidth={1.8} style={{ color: accent }} />
              <span>KLIK // PERBESAR</span>
            </motion.div>

            {/* Bottom Telemetry Overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '24px',
                zIndex: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10.5px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: accent,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    border: `1px solid ${accent}55`,
                  }}
                >
                  ROOM_IDENTIFIER // {lab.id.toUpperCase()}_01
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10.5px',
                    color: 'rgba(255, 255, 255, 0.75)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}
                >
                  PRODI TEKNIK INFORMATIKA UIKA
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(20px, 2.5vw, 28px)',
                  fontWeight: 400,
                  color: '#ffffff',
                  margin: 0,
                  textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                  lineHeight: 1.25,
                }}
              >
                {lab.facilityTitle}
              </h3>
            </div>
          </div>

          {/* ── Bottom Information & Equipment Specifications Bar ── */}
          <div
            style={{
              padding: '20px 24px',
              backgroundColor: 'var(--surface-card, #000000)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '14px',
                color: 'var(--text-body)',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {lab.facilityDescription}
            </p>

            {/* Equipment / Feature Pills */}
            {lab.facilityTags && lab.facilityTags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text-faint)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginRight: '4px',
                  }}
                >
                  Fitur Fasilitas:
                </span>
                {lab.facilityTags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      backgroundColor: 'var(--surface-inner)',
                      border: '1px solid var(--border-subtle)',
                      boxShadow: 'var(--shadow-subtle, none)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11.5px',
                      color: 'var(--text-heading)',
                    }}
                  >
                    <CheckCircle2 size={12} strokeWidth={1.8} style={{ color: accent }} />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* ── Fullscreen Lightbox Modal ── */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullscreen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100000,
              backgroundColor: 'rgba(0, 0, 0, 0.94)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              cursor: 'zoom-out',
            }}
          >
            {/* Modal Top Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '1200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 0',
                color: '#ffffff',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: accent, fontWeight: 600 }}>[INSPECTION_MODE]</span>
                <span>{lab.facilityTitle}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                aria-label="Tutup pratinjau foto"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                <X size={14} />
                <span>TUTUP [ESC]</span>
              </button>
            </div>

            {/* Modal Image Box */}
            <motion.div
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '1200px',
                height: 'calc(100vh - 160px)',
                borderRadius: '12px',
                overflow: 'hidden',
                border: `1px solid ${accent}66`,
                boxShadow: `0 0 60px ${accent}25`,
              }}
            >
              <Image
                src={lab.facilityImage}
                alt={lab.facilityTitle}
                fill
                priority
                sizes="1200px"
                style={{
                  objectFit: 'contain',
                  objectPosition: 'center',
                }}
              />
            </motion.div>

            {/* Modal Caption */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '1200px',
                textAlign: 'center',
                paddingTop: '12px',
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: 'var(--font-inter)',
                fontSize: '13px',
              }}
            >
              {lab.facilityDescription}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
      `}</style>
    </section>
  );
}

