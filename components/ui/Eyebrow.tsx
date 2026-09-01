import type { ReactNode } from "react";

/**
 * A section label. Sits in the datum rail at lg+, inline above content below.
 * Uppercase with generous tracking does the technical-label job without
 * introducing a third typeface.
 *
 * The dark tone carries the gold. This is the one systematic use of it in the
 * palette, and it is confined here on purpose: a small uppercase label on a
 * navy ground is 7.74:1 (AAA), whereas the same gold on the light ground is
 * 2.11:1 and would fail outright. Gold therefore never crosses onto a light
 * surface as text, and never becomes a heading, a button or a background.
 * See the ration note in app/globals.css.
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
        tone === "dark" ? "text-premium" : "text-ink-tertiary"
      }`}
    >
      {children}
    </span>
  );
}
