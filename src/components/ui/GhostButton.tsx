// src/components/ui/GhostButton.tsx
// Ghost button — transparent bg, 1px solid #292d30, white text, 6px radius
// hover border → #ffffff. Both <a> and <button> variants.

'use client';

import Link from 'next/link';
import { type ReactNode, type MouseEventHandler } from 'react';

interface GhostButtonBaseProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

interface GhostButtonLinkProps extends GhostButtonBaseProps {
  href: string;
  onClick?: undefined;
  type?: undefined;
  disabled?: undefined;
}

interface GhostButtonActionProps extends GhostButtonBaseProps {
  href?: undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

type GhostButtonProps = GhostButtonLinkProps | GhostButtonActionProps;

const sizeStyles: Record<string, React.CSSProperties> = {
  sm: { padding: '6px 14px', fontSize: '13px', minHeight: '36px' },
  md: { padding: '10px 20px', fontSize: '14px', minHeight: '44px' },
  lg: { padding: '12px 28px', fontSize: '15px', minHeight: '48px' },
};

const baseStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  background: 'var(--btn-ghost-bg, var(--surface-inner, transparent))',
  border: '1px solid var(--btn-ghost-border, var(--border-subtle, #292d30))',
  color: 'var(--btn-ghost-text, var(--text-heading, #ffffff))',
  boxShadow: 'var(--shadow-subtle, none)',
  fontFamily: 'var(--font-inter)',
  fontWeight: 500,
  borderRadius: '6px', /* buttons always 6px — design rule */
  cursor: 'pointer',
  textDecoration: 'none',
  letterSpacing: '-0.01em',
  transition: 'border-color 150ms ease-out, background-color 150ms ease-out, color 150ms ease-out, box-shadow 150ms ease-out',
  outline: 'none',
  position: 'relative',
};

export default function GhostButton({
  children,
  href,
  onClick,
  className,
  size = 'md',
  type = 'button',
  disabled,
}: GhostButtonProps) {
  const style: React.CSSProperties = { ...baseStyle, ...sizeStyles[size] };

  if (href !== undefined) {
    return (
      <Link
        href={href}
        className={className}
        style={style}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = 'var(--btn-ghost-hover-border, #ffffff)';
          el.style.backgroundColor = 'var(--btn-ghost-hover-bg, var(--surface-card-hover, transparent))';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = 'var(--btn-ghost-border, var(--border-subtle, #292d30))';
          el.style.backgroundColor = 'var(--btn-ghost-bg, var(--surface-inner, transparent))';
        }}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        ...style,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = 'var(--btn-ghost-hover-border, #ffffff)';
          el.style.backgroundColor = 'var(--btn-ghost-hover-bg, var(--surface-card-hover, transparent))';
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'var(--btn-ghost-border, var(--border-subtle, #292d30))';
        el.style.backgroundColor = 'var(--btn-ghost-bg, var(--surface-inner, transparent))';
      }}
    >
      {children}
    </button>
  );
}
