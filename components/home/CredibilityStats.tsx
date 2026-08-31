import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PendingContent } from "@/components/ui/PendingContent";
import { PendingValue } from "@/components/ui/PendingValue";
import { stats } from "@/content/stats";

/**
 * Credibility proof.
 *
 * The page's first dark band after the hero, and deliberately short: a quiet
 * heading over one hairline-separated row of figures, closer to an annual
 * report than a dashboard. No cards, no icons, no rounded containers.
 *
 * Every figure is unverified, so each slot holds a large neutral rule in the
 * display position — which keeps the composition legible and the rhythm intact
 * — with the label beneath it and an explicit [VERIFIED FIGURE REQUIRED] tag.
 * Nothing here is a plausible-looking invented number.
 */
export function CredibilityStats() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="on-deep bg-deep py-[var(--section-md)] text-ink-inverse"
    >
      <Container>
        <DatumGrid>
          <Eyebrow tone="dark">Proof</Eyebrow>
          <h2
            id="stats-heading"
            className="max-w-[24ch] text-heading-1 font-medium text-balance"
          >
            The figures behind the advice.
          </h2>
        </DatumGrid>

        <PendingContent
          tone="dark"
          label="stats.figures — every figure needs a value, source, as-at date and approver"
        >
          <dl className="mt-12 m-0 grid grid-cols-1 border-t border-line-inverse sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="border-b border-line-inverse px-0 py-8 sm:px-6 sm:first:pl-0 lg:border-b-0 lg:border-l lg:first:border-l-0 lg:py-10"
              >
                <dt className="text-body-sm font-medium text-ink-inverse">
                  {stat.label}
                </dt>
                <dd className="m-0 mt-6">
                  {stat.value ? (
                    <span className="block text-display-2 leading-none font-medium tabular text-ink-inverse">
                      {stat.value}
                    </span>
                  ) : (
                    <PendingValue
                      label="Verified figure required"
                      tone="dark"
                    />
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </PendingContent>
      </Container>
    </section>
  );
}
