import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeroMedia } from "@/components/ui/HeroMedia";
import type { HeroImage } from "@/content/media";

/**
 * Opening for informational routes — team, locations, legal, calculators.
 *
 * Deliberately lighter than a hub hero: a trail, a heading and a standfirst.
 *
 * `image` is optional and stays that way. The pages people navigate to — about,
 * contact, locations, insights — earn a photograph; the pages people are sent
 * to in order to read something exactly (privacy, terms, complaints, an
 * individual calculator) do not, and putting atmospheric media above a legal
 * notice would be the wrong signal. Passing no image renders the original
 * single-column opening unchanged.
 */
export function PageOpening({
  eyebrow,
  headingId,
  title,
  standfirst,
  crumbs,
  image,
  children,
}: {
  eyebrow: string;
  headingId: string;
  title: string;
  standfirst?: string;
  crumbs: readonly Crumb[];
  /** From content/media.ts. Omit on read-only routes. */
  image?: HeroImage;
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
          <div
            className={
              image
                ? "grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start"
                : ""
            }
          >
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

            {image && (
              <div className="relative aspect-4/3 w-full lg:aspect-4/5">
                <HeroMedia
                  image={image}
                  tone="dark"
                  priority
                  sizes="(min-width: 1024px) 36vw, 100vw"
                />
              </div>
            )}
          </div>
        </DatumGrid>
      </Container>
    </section>
  );
}
