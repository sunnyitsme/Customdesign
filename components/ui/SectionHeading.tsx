import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { DatumGrid } from "./Container";
import { Eyebrow } from "./Eyebrow";

/**
 * The page's one section-header pattern: a label in the datum rail and a
 * display heading in the content column. Used by every section below the hero
 * so their openings align on the same left margin.
 *
 * It also carries the shared heading sequence — label, heading, supporting
 * column, 110ms apart — so every section that uses it opens the same way
 * without repeating the motion at each call site.
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
      <Reveal>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </Reveal>
      <div
        className={
          aside
            ? "grid gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]"
            : undefined
        }
      >
        <Reveal index={1} stagger={110}>
          <h2
            {...(id ? { id } : {})}
            className="max-w-[19ch] text-display-2 font-medium text-balance"
          >
            {children}
          </h2>
        </Reveal>
        {aside ? (
          <Reveal index={2} stagger={110} className="lg:pt-2">
            {aside}
          </Reveal>
        ) : null}
      </div>
    </DatumGrid>
  );
}
