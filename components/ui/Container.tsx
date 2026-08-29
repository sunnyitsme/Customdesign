import type { ReactNode } from 'react';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[var(--container-max)] px-[var(--gutter)] ${className}`}>
      {children}
    </div>
  );
}

/**
 * The datum grid.
 *
 * The project's signature device: a left rail carrying section indices and
 * labels, mirroring the title block on an architectural elevation. The rail
 * collapses to zero below lg (--datum-rail), where labels sit inline above
 * their content instead — so this is one grid, not two layouts.
 */
export function DatumGrid({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`grid gap-x-8 gap-y-4 [grid-template-columns:1fr] lg:[grid-template-columns:var(--datum-rail)_minmax(0,1fr)] ${className}`}
    >
      {children}
    </div>
  );
}
