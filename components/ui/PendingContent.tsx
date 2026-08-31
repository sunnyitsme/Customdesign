import type { ReactNode } from "react";

/**
 * Marks unapproved content so it is impossible to mistake for production copy.
 *
 * Deliberately quiet: a hairline rule and a small tinted label rather than a
 * solid bar. The earlier treatment dominated every screenshot and made the page
 * read as a wireframe, which made the design hard to judge. It still cannot be
 * mistaken for production content, and the gate behind it is unchanged.
 *
 * Visible everywhere EXCEPT a production deployment. A preview deployment is a
 * review environment, so the markers travel with it — otherwise the reviewer
 * cannot tell approved content from a placeholder. Only VERCEL_ENV==="production"
 * strips the chrome, and that build is refused anyway while launch-blocking
 * items remain (scripts/check-pending.ts).
 */
export function PendingContent({
  label,
  children,
  className = "",
  tone = "light",
}: {
  label: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  if (process.env.VERCEL_ENV === "production")
    return <div className={className}>{children}</div>;

  return (
    <div className={className}>
      <span
        className={`mb-3 flex items-center gap-2 text-[9px] font-medium tracking-[0.14em] uppercase ${
          tone === "dark" ? "text-accent-bright" : "text-accent"
        }`}
      >
        <span
          aria-hidden="true"
          className={`h-px w-4 ${tone === "dark" ? "bg-accent-bright" : "bg-accent"}`}
        />
        {label}
      </span>
      {children}
    </div>
  );
}
