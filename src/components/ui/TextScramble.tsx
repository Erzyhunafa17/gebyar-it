// src/components/ui/TextScramble.tsx
// Hacker / Cipher decode text scramble effect on viewport enter or hover
// GPU-accelerated and respects prefers-reduced-motion

'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

const CHARS = '0123456789ABCDEF#*+=_[]';

interface TextScrambleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  scrambleOnHover?: boolean;
  duration?: number;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

export default function TextScramble({
  text,
  className,
  style,
  scrambleOnHover = true,
  duration = 600,
  as: Component = 'span',
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const elementRef = useRef<HTMLElement>(null);
  const isScramblingRef = useRef(false);
  const hasAnimatedRef = useRef(false);

  const startScramble = useCallback(() => {
    if (isScramblingRef.current) return;
    
    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayText(text);
      return;
    }

    isScramblingRef.current = true;
    const startTime = performance.now();
    const length = text.length;

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Number of characters resolved so far
      const resolvedCount = Math.floor(progress * length);

      let result = '';
      for (let i = 0; i < length; i++) {
        if (text[i] === ' ') {
          result += ' ';
        } else if (i < resolvedCount) {
          result += text[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setDisplayText(text);
        isScramblingRef.current = false;
      }
    };

    requestAnimationFrame(frame);
  }, [text, duration]);

  // Trigger once when element enters viewport
  useEffect(() => {
    const el = elementRef.current;
    if (!el || hasAnimatedRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          startScramble();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [startScramble]);

  return (
    <Component
      ref={elementRef as any}
      className={className}
      style={{
        display: Component === 'span' ? 'inline' : 'block',
        overflowWrap: 'break-word',
        wordBreak: 'normal',
        ...style,
      }}
      onMouseEnter={() => {
        if (scrambleOnHover && !isScramblingRef.current) startScramble();
      }}
    >
      {displayText}
    </Component>
  );
}

