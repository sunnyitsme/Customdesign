import type { ReactNode } from "react";
import { DatumGrid } from "./Container";
import { Eyebrow } from "./Eyebrow";

/**
 * The page's one section-header pattern: a label in the datum rail and a
 * display heading in the content column. Used by every section below the hero
 * so their openings align on the same left margin.
 */
export function SectionHeading({
  eyebrow,
  id,
  tone = "light",
  children,
  aside,
}: {
  eyebrow: string;
  id?: string;
  tone?: "light" | "dark";
  children: ReactNode;
  /** Optional supporting column, set beside the heading at lg and up. */
  aside?: ReactNode;
}) {
  return (
    <DatumGrid>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <div
        className={
          aside
            ? "grid gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]"
            : undefined
        }
      >
        <h2
          {...(id ? { id } : {})}
          className="max-w-[19ch] text-display-2 font-medium text-balance"
        >
          {children}
        </h2>
        {aside ? <div className="lg:pt-2">{aside}</div> : null}
      </div>
    </DatumGrid>
  );
}
