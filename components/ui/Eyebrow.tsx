import type { ReactNode } from "react";

/**
 * A section label. Sits in the datum rail at lg+, inline above content below.
 * Uppercase with generous tracking does the technical-label job without
 * introducing a third typeface.
 */
export function Eyebrow({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={`block text-eyebrow font-medium uppercase ${
        tone === "dark" ? "text-ink-inverse-secondary" : "text-ink-tertiary"
      }`}
    >
      {children}
    </span>
  );
}
