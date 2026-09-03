import Link from "next/link";
import { Container, DatumGrid } from "@/components/ui/Container";
import { DrawingPlate } from "@/components/ui/DrawingPlate";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { divisions } from "@/content/services";
import { site } from "@/content/site";

/**
 * The page's closing moment.
 *
 * Roughly 60/40: the statement and the two ways to make contact on the left, a
 * tall architectural crop as counterweight on the right. Without the image the
 * right half read as unfinished rather than calm.
 *
 * The four disciplines run full width beneath both columns as a hairline index.
 * Inside the left column they were squeezed into four narrow cells and the
 * longer labels wrapped.
 *
 * Only verified contact detail is used. The address and email both conflict
 * between the public site and the legal PDFs, so neither is repeated here — the
 * footer carries that conflict where it is flagged.
 */
export function ConsultationCta() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="on-deep bg-deep py-[var(--section-md)] text-ink-inverse"
    >
      <Container>
        <DatumGrid>
          <Reveal>
            <Eyebrow tone="dark">Speak to Guide</Eyebrow>
          </Reveal>

          <div className="grid gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
            <div>
              <Reveal index={1} stagger={120}>
                <h2
                  id="cta-heading"
                  className="max-w-[16ch] text-display-1 font-medium text-balance"
                >
                  Let&rsquo;s discuss what you&rsquo;re looking to achieve.
                </h2>
              </Reveal>

              <Reveal
                index={2}
                stagger={120}
                className="mt-9 max-w-[46ch]"
              >
                <p className="text-body-lg text-ink-inverse-secondary">
                A conversation about the property, the timing, and the
                circumstances behind them — across mortgages, property finance,
                  protection, and wills and estate planning.
                </p>
              </Reveal>

              <Reveal
                index={3}
                stagger={120}
                distance="0.75rem"
                className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-sm bg-ink-inverse px-7 py-4 text-body-sm font-medium text-ink transition-colors duration-base hover:bg-accent-bright"
                >
                  Speak to an adviser
                </Link>
                <a
                  href={site.phoneHref}
                  className="text-body-lg font-medium tabular text-ink-inverse underline decoration-line-inverse-interactive underline-offset-[6px] transition-colors duration-base hover:decoration-accent-bright"
                >
                  {site.phone}
                </a>
              </Reveal>
            </div>

            {/* Counterweight — London or property architectural crop. */}
            {/* Image holds still apart from the same restrained drift used on
                the About plate. The content is what arrives. */}
            <div
              data-parallax=""
              className="relative aspect-4/5 w-full lg:aspect-3/4"
            >
              <DrawingPlate
                label="Image required — London or property architectural crop"
                tone="dark"
              />
            </div>
          </div>
        </DatumGrid>

        <DatumGrid className="mt-14">
          <div />
          <ul className="m-0 grid list-none grid-cols-2 border-t border-line-inverse p-0 lg:grid-cols-4">
            {divisions.map((division) => (
              <li
                key={division.id}
                className="border-b border-line-inverse py-4 lg:border-b-0 lg:border-l lg:px-6 lg:py-5 lg:first:border-l-0 lg:first:pl-0"
              >
                <Link
                  href={division.href}
                  className="text-body-sm font-medium whitespace-nowrap text-ink-inverse transition-colors duration-base hover:text-accent-bright"
                >
                  {division.label}
                </Link>
              </li>
            ))}
          </ul>
        </DatumGrid>
      </Container>
    </section>
  );
}
