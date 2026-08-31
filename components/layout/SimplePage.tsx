import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Opening for informational routes — team, locations, legal, calculators.
 *
 * Deliberately lighter than a hub hero: these pages are read, not browsed, so
 * they open with a trail, a heading and a standfirst rather than media.
 */
export function PageOpening({
  eyebrow,
  headingId,
  title,
  standfirst,
  crumbs,
  children,
}: {
  eyebrow: string;
  headingId: string;
  title: string;
  standfirst?: string;
  crumbs: readonly Crumb[];
  children?: ReactNode;
}) {
  return (
    <section
      aria-labelledby={headingId}
      className="on-deep bg-deep pt-[calc(var(--header-height)+var(--section-sm))] pb-[var(--section-md)] text-ink-inverse"
    >
      <Container>
        <Breadcrumbs items={crumbs} />
        <DatumGrid className="mt-10">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <div>
            <h1
              id={headingId}
              className="max-w-[20ch] text-display-1 font-medium text-balance"
            >
              {title}
            </h1>
            {standfirst && (
              <p className="mt-8 max-w-[58ch] text-body-lg text-ink-inverse-secondary">
                {standfirst}
              </p>
            )}
            {children}
          </div>
        </DatumGrid>
      </Container>
    </section>
  );
}
