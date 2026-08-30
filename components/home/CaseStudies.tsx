import Link from "next/link";
import { Container, DatumGrid } from "@/components/ui/Container";
import { DrawingPlate } from "@/components/ui/DrawingPlate";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PendingContent } from "@/components/ui/PendingContent";
import { PendingValue } from "@/components/ui/PendingValue";
import { cases } from "@/content/cases";

/**
 * Selected client cases.
 *
 * The page's second dark band and its longest section: alternating full-width
 * rows, each one image-led, so a case reads as a story rather than a tile in a
 * grid. This is the section that has to carry property-finance credibility, so
 * it is given the most room.
 *
 * The current site has no case-study content whatsoever. `discipline` is real —
 * it names the service line the slot belongs to — and everything that would
 * describe a transaction is [APPROVED CASE STUDY REQUIRED]. Publishing past
 * outcomes at all needs compliance sign-off before any of this is filled.
 */
export function CaseStudies() {
  return (
    <section
      aria-labelledby="cases-heading"
      className="on-deep bg-deep py-[var(--section-lg)] text-ink-inverse"
    >
      <Container>
        <DatumGrid>
          <Eyebrow tone="dark">Selected cases</Eyebrow>
          <div className="grid gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
            <h2
              id="cases-heading"
              className="max-w-[19ch] text-display-2 font-medium text-balance"
            >
              Selected client cases.
            </h2>
            <p className="max-w-[42ch] font-prose text-body-lg text-ink-inverse-secondary lg:pt-2">
              Cases are published only where the client has agreed and
              compliance has approved the wording.
            </p>
          </div>
        </DatumGrid>

        <PendingContent
          label="cases.approved — no case-study content exists on the current site; publishing past outcomes needs sign-off"
          className="mt-[var(--section-sm)]"
        >
          <ol className="m-0 list-none border-t border-line-inverse p-0">
            {cases.map((entry, index) => (
              <li
                key={entry.id}
                className="border-b border-line-inverse py-10 lg:py-12"
              >
                <div
                  className={`grid items-center gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] ${
                    index % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                  }`}
                >
                  <figure className="relative m-0 aspect-16/10 w-full">
                    <DrawingPlate
                      label={`${entry.discipline} — photography required`}
                      tone="dark"
                    />
                  </figure>

                  <div>
                    <p className="text-eyebrow font-medium tracking-[0.16em] text-accent-bright uppercase">
                      {entry.discipline}
                    </p>

                    <div className="mt-8">
                      {entry.figure ? (
                        <>
                          <span className="block text-display-1 leading-none font-medium tabular">
                            {entry.figure}
                          </span>
                          <span className="mt-4 block text-body-sm font-medium">
                            {entry.figureLabel}
                          </span>
                        </>
                      ) : (
                        <PendingValue
                          label="Approved case study required"
                          tone="dark"
                        />
                      )}
                    </div>

                    {entry.narrative ? (
                      <p className="mt-8 max-w-[48ch] font-prose text-body-lg text-ink-inverse-secondary">
                        {entry.narrative}
                      </p>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </PendingContent>

        <Link
          href="/property-finance"
          className="mt-14 inline-block border-b border-line-inverse pb-1 text-body-sm font-medium text-ink-inverse transition-colors duration-base hover:border-accent-bright hover:text-accent-bright"
        >
          Explore property finance
        </Link>
      </Container>
    </section>
  );
}
