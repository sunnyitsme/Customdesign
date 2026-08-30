import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DrawingPlate } from "@/components/ui/DrawingPlate";
import { PendingContent } from "@/components/ui/PendingContent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { insights } from "@/content/insights";

/**
 * Insights.
 *
 * Unequal weighting rather than three matching cards: the lead piece takes a
 * wide 16:10 plate and the two behind it run as a stacked list with narrow
 * plates, so the section reads like a publication front rather than a blog
 * grid.
 *
 * The current site has no insights section at all, so no title, standfirst,
 * author or date is invented. `category` is real — it names one of Guide's
 * documented service lines — and everything else is a placeholder.
 */
export function Insights() {
  const [lead, ...rest] = insights;

  return (
    <section
      aria-labelledby="insights-heading"
      className="border-t border-line py-[var(--section-md)]"
    >
      <Container>
        <SectionHeading
          eyebrow="Insights"
          id="insights-heading"
          aside={
            <p className="max-w-[42ch] font-prose text-body-lg text-ink-secondary">
              Commentary on lending conditions, property finance and protection.
            </p>
          }
        >
          Knowledge, published.
        </SectionHeading>

        <PendingContent
          label="insights.articles — supply three approved articles, or confirm the section launches hidden"
          className="mt-[var(--section-sm)]"
        >
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
            {lead ? (
              <article>
                <div className="relative aspect-16/10 w-full">
                  <DrawingPlate
                    label="Lead insight — editorial photography required"
                    tone="light"
                  />
                </div>
                <p className="mt-6 text-eyebrow font-medium tracking-[0.16em] text-accent uppercase">
                  {lead.category}
                </p>
                <h3 className="mt-4 max-w-[22ch] text-heading-1 font-medium tracking-tight text-balance">
                  {lead.title ?? "[APPROVED ARTICLE REQUIRED]"}
                </h3>
                <p className="mt-4 max-w-[52ch] font-prose text-body-lg text-ink-secondary">
                  {lead.standfirst ??
                    "Title, standfirst, author and date supplied by the firm before publication."}
                </p>
              </article>
            ) : null}

            <ul className="m-0 list-none border-t border-line p-0">
              {rest.map((insight) => (
                <li key={insight.id} className="border-b border-line py-8">
                  <div className="grid grid-cols-[minmax(0,1fr)_7rem] items-start gap-6 sm:grid-cols-[minmax(0,1fr)_10rem]">
                    <div>
                      <p className="text-eyebrow font-medium tracking-[0.16em] text-accent uppercase">
                        {insight.category}
                      </p>
                      <h3 className="mt-3 text-heading-2 font-medium tracking-tight text-balance">
                        {insight.title ?? "[APPROVED ARTICLE REQUIRED]"}
                      </h3>
                      <p className="mt-3 max-w-[38ch] font-prose text-body-sm text-ink-secondary">
                        {insight.standfirst ?? "Standfirst required."}
                      </p>
                    </div>
                    <div className="relative aspect-4/5 w-full">
                      <DrawingPlate label="Image required" tone="light" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </PendingContent>

        <Link
          href="/insights"
          className="mt-14 inline-block border-b border-line-interactive pb-1 text-body-sm font-medium text-ink transition-colors duration-base hover:border-accent hover:text-accent"
        >
          Explore insights
        </Link>
      </Container>
    </section>
  );
}
