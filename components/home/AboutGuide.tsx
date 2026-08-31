import Link from "next/link";
import { Container, DatumGrid } from "@/components/ui/Container";
import { DrawingPlate } from "@/components/ui/DrawingPlate";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PendingContent } from "@/components/ui/PendingContent";
import { about } from "@/content/about";

/**
 * Company positioning.
 *
 * Image-led and asymmetric, so it reads differently from the divisions index
 * above it: a tall plate holding the left of the grid, the argument set against
 * it on the right. The eyebrow sits in the datum rail so the section still
 * opens on the page's shared left margin.
 */
export function AboutGuide() {
  return (
    <section
      aria-labelledby="about-heading"
      className="border-t border-line py-[var(--section-md)]"
    >
      <Container>
        <DatumGrid>
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center">
            <div className="relative aspect-4/5 w-full lg:aspect-[4/4.4]">
              <DrawingPlate
                label="Image required — premium architectural / private-client interior"
                tone="light"
              />
            </div>

            <div className="lg:pt-2">
              <PendingContent label="about.copy — approved headline required">
                <h2
                  id="about-heading"
                  className="max-w-[17ch] text-display-2 font-medium text-balance"
                >
                  Four disciplines, advised as one.
                </h2>
              </PendingContent>

              <p className="mt-8 max-w-[54ch] text-body-lg text-ink-secondary">
                {about.lead}
              </p>
              <p className="mt-5 max-w-[54ch] text-body-lg text-ink-secondary">
                {about.supporting}
              </p>

              <Link
                href={about.cta.href}
                className="mt-9 inline-block border-b border-line-interactive pb-1 text-body-sm font-medium text-ink transition-colors duration-base hover:border-accent hover:text-accent"
              >
                {about.cta.label}
              </Link>
            </div>
          </div>
        </DatumGrid>
      </Container>
    </section>
  );
}
