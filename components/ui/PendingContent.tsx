import type { ReactNode } from "react";

/**
 * Marks unapproved content so it is impossible to mistake for production copy.
 *
 * The label sits in normal flow rather than absolutely positioned: an absolute
 * marker collided with the fixed header and forced horizontal overflow at
 * mobile widths. In flow it can do neither.
 *
 * Visible in development only; the content gate (scripts/check-pending.ts)
 * refuses a production build under GUIDE_STRICT_CONTENT=1, so unresolved
 * placeholders cannot ship silently.
 */
export function PendingContent({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  if (process.env.NODE_ENV === "production")
    return <div className={className}>{children}</div>;

  return (
    <div className={className}>
      <span className="mb-2 inline-block bg-accent px-1.5 py-0.5 text-[9px] leading-snug font-medium tracking-[0.12em] text-ink-inverse uppercase">
        Placeholder · {label}
      </span>
      <div className="outline-1 outline-dashed outline-offset-4 outline-accent/35">
        {children}
      </div>
    </div>
  );
}
