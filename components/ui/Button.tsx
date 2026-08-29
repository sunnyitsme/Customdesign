import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'tertiary';
type Tone = 'light' | 'dark';

/**
 * Three button variants, no more. Squared (radius caps at 2px), so the
 * rounded-pill look is unavailable by construction.
 */
const styles: Record<Variant, Record<Tone, string>> = {
  primary: {
    light: 'bg-ink text-ink-inverse hover:bg-accent',
    dark: 'bg-ink-inverse text-ink hover:bg-accent-bright',
  },
  secondary: {
    light: 'border border-line-interactive text-ink hover:border-ink hover:bg-surface',
    dark: 'border border-line-inverse text-ink-inverse hover:border-ink-inverse',
  },
  tertiary: {
    light: 'text-ink underline decoration-line-interactive underline-offset-[6px] hover:decoration-accent',
    dark: 'text-ink-inverse underline decoration-line-inverse underline-offset-[6px] hover:decoration-accent-bright',
  },
};

export function Button({
  href,
  children,
  variant = 'primary',
  tone = 'light',
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  tone?: Tone;
  className?: string;
}) {
  const base =
    variant === 'tertiary'
      ? 'inline-flex items-center text-body-sm font-medium transition-colors duration-base'
      : 'inline-flex items-center justify-center rounded-sm px-6 py-3.5 text-body-sm font-medium transition-colors duration-base';

  return (
    <Link href={href} className={`${base} ${styles[variant][tone]} ${className}`}>
      {children}
    </Link>
  );
}
