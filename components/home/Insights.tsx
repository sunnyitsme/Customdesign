import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DrawingPlate } from "@/components/ui/DrawingPlate";
import { PendingContent } from "@/components/ui/PendingContent";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { insights } from "@/content/insights";

/**
 * Insights.
 *
 * One dominant lead and two substantial supporting pieces. The supporting
 * stories previously used narrow thumbnails beside their titles, which read as
 * an afterthought; they now carry proper 3:2 images and real title weight, so
 * all three feel published rather than listed.
 *
 * The current site has no insights section at all, so no title, standfirst,
 * author or date is invented. `category` is real — it names one of Guide's
 * documented service lines.
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
            <p className="max-w-[40ch] text-body-lg text-ink-secondary">
              Commentary on lending conditions, property finance and protection.
            </p>
          }
        >
          Knowledge, published.
        </SectionHeading>

        <PendingContent
          label="insights.articles — three approved articles required, or confirm the section launches hidden"
          className="mt-11"
        >
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            {lead ? (
              <Reveal as="article" className="group">
                <div className="relative aspect-3/2 w-full">
                  <DrawingPlate
                    label="Image required — editorial finance / property"
                    tone="light"
                  />
                </div>
                <p className="mt-7 text-eyebrow font-medium tracking-[0.16em] text-accent uppercase">
                  {lead.category}
                </p>
                <h3 className="mt-4 max-w-[20ch] text-display-2 font-medium tracking-tight text-balance">
                  {lead.title ?? "[APPROVED ARTICLE REQUIRED]"}
                </h3>
                <p className="mt-5 max-w-[52ch] font-prose text-body-lg text-ink-secondary">
                  {lead.standfirst ??
                    "Title, standfirst, author and date supplied by the firm before publication."}
                </p>
                <p className="mt-4 text-body-sm text-ink-tertiary">
                  {lead.publishedAt ? (
                    <time dateTime={lead.publishedAt}>{lead.publishedAt}</time>
                  ) : (
                    "Author and date [TBC]"
                  )}
                </p>
              </Reveal>
            ) : null}

            <div className="flex flex-col gap-8">
              {rest.map((insight, restIndex) => (
                <Reveal
                  as="article"
                  key={insight.id}
                  index={restIndex}
                  stagger={90}
                  delay={140}
                  distance="1rem"
                  className="border-t border-line pt-7 first:border-t-0 first:pt-0"
                >
                  <div className="relative aspect-16/10 w-full">
                    <DrawingPlate
                      label="Image required — editorial"
                      tone="light"
                    />
                  </div>
                  <p className="mt-6 text-eyebrow font-medium tracking-[0.16em] text-accent uppercase">
                    {insight.category}
                  </p>
                  <h3 className="mt-3 max-w-[24ch] text-heading-1 font-medium tracking-tight text-balance">
                    {insight.title ?? "[APPROVED ARTICLE REQUIRED]"}
                  </h3>
                  <p className="mt-3 max-w-[40ch] font-prose text-body text-ink-secondary">
                    {insight.standfirst ?? "Standfirst required."}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </PendingContent>

        <Link
          href="/insights"
          className="mt-12 inline-block border-b border-line-interactive pb-1 text-body-sm font-medium text-ink transition-colors duration-base hover:border-accent hover:text-accent"
        >
          Explore insights
        </Link>
      </Container>
    </section>
  );
}
