// src/components/ui/ParallaxHero.tsx
// Parallax Scrolling component from 21st.dev / Osmo Supply
// Adapted for Resend Style aesthetic: #000000 void black, #292d30 hairline borders, Playfair Display typography

'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ParallaxHeroProps {
  title?: string;
  subtitle?: string;
}

export function ParallaxHero({
  title = "Informatika UIKA",
  subtitle = "Pusat Unggulan Riset, Rekayasa Perangkat Lunak & Sistem Cerdas",
}: ParallaxHeroProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector<HTMLElement>('[data-parallax-layers]');

    let ctx: gsap.Context | undefined;

    if (triggerElement) {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerElement,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        const layers = [
          { layer: "1", yPercent: 30 },
          { layer: "2", yPercent: 15 },
          { layer: "3", yPercent: 0 },
        ];

        layers.forEach((layerObj, idx) => {
          tl.to(
            triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
            {
              yPercent: layerObj.yPercent,
              ease: "none",
            },
            idx === 0 ? undefined : "<"
          );
        });
      }, parallaxRef);
    }

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <div
      ref={parallaxRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: 'var(--bg-canvas, #000000)',
        color: 'var(--text-body, #ffffff)',
        borderTop: '1px solid var(--border-subtle, #292d30)',
        borderBottom: '1px solid var(--border-subtle, #292d30)',
        overflow: 'hidden',
        margin: '24px 0',
        transition: 'background-color 200ms ease, border-color 200ms ease',
      }}
    >
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '50vh',
          minHeight: '360px',
          maxHeight: '460px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          data-parallax-layers
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
        >
          {/* Layer 1: Background mountain / atmospheric layer */}
          <div
            data-parallax-layer="1"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '115%',
              backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(146, 129, 247, 0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Layer 2: Geometric wireframe landscape */}
          <div
            data-parallax-layer="2"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '110%',
              backgroundImage: 'linear-gradient(rgba(41, 45, 48, 0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(41, 45, 48, 0.35) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              opacity: 0.45,
              maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            }}
          />

          {/* Layer 3: Central Headline & Typography (Always on top with zIndex: 10) */}
          <div
            data-parallax-layer="3"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 24px',
              textAlign: 'center',
              zIndex: 10,
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(32px, 4.8vw, 56px)',
                fontWeight: 400,
                color: 'var(--text-heading, #ffffff)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                margin: '0 0 16px 0',
                maxWidth: '860px',
                textShadow: '0 4px 20px rgba(0,0,0,0.2)',
              }}
            >
              {title}
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(14px, 1.8vw, 17px)',
                color: 'var(--text-muted, #b0b4b8)',
                maxWidth: '680px',
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Layer 4: Foreground subtle vignette and matte bottom gradient (Behind text with zIndex: 1) */}
          <div
            data-parallax-layer="4"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '60px',
              background: 'linear-gradient(to top, var(--bg-canvas) 30%, transparent 100%)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />
        </div>
      </section>
    </div>
  );
}

export default ParallaxHero;

