import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { divisions } from "@/content/services";
import { site } from "@/content/site";

/**
 * The page's closing moment.
 *
 * Dark, tall and deliberately quiet — one statement, the four disciplines named
 * as a hairline-separated index, and two real ways to make contact. Confident
 * rather than salesy: no urgency device, no form, no countdown.
 *
 * Only verified contact detail is used. Note the address and email both conflict
 * between the public site and the legal PDFs, so neither is repeated here — the
 * footer carries that conflict where it is flagged.
 */
export function ConsultationCta() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="on-deep bg-deep py-[var(--section-lg)] text-ink-inverse"
    >
      <Container>
        <DatumGrid>
          <Eyebrow tone="dark">Speak to Guide</Eyebrow>
          <div>
            <h2
              id="cta-heading"
              className="max-w-[16ch] text-display-1 font-medium text-balance"
            >
              Let&rsquo;s discuss what you&rsquo;re looking to achieve.
            </h2>

            <p className="mt-8 max-w-[46ch] font-prose text-body-lg text-ink-inverse-secondary">
              A conversation about the property, the timing, and the
              circumstances behind them — across mortgages, property finance,
              protection, and wills and estate planning.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-sm bg-ink-inverse px-7 py-4 text-body-sm font-medium text-ink transition-colors duration-base hover:bg-accent-bright"
              >
                Speak to an adviser
              </a>
              <a
                href={site.phoneHref}
                className="text-body-lg font-medium tabular text-ink-inverse underline decoration-line-inverse underline-offset-[6px] transition-colors duration-base hover:decoration-accent-bright"
              >
                {site.phone}
              </a>
            </div>

            <ul className="m-0 mt-16 grid list-none grid-cols-1 border-t border-line-inverse p-0 sm:grid-cols-2 lg:grid-cols-4">
              {divisions.map((division) => (
                <li
                  key={division.id}
                  className="border-b border-line-inverse py-5 lg:border-b-0 lg:border-l lg:px-6 lg:py-6 lg:first:border-l-0 lg:first:pl-0"
                >
                  <a
                    href={division.href}
                    className="text-body-sm font-medium text-ink-inverse transition-colors duration-base hover:text-accent-bright"
                  >
                    {division.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </DatumGrid>
      </Container>
    </section>
  );
}
