import type { Metadata } from "next";
import Link from "next/link";
import { PageOpening } from "@/components/layout/SimplePage";
import { Container, DatumGrid } from "@/components/ui/Container";
import { DrawingPlate } from "@/components/ui/DrawingPlate";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PendingContent } from "@/components/ui/PendingContent";
import { insights } from "@/content/insights";

export const metadata: Metadata = { title: "Insights" };

const categories = [
  {
    href: "/insights/guides",
    label: "Guides",
    body: "Explanations of how products and processes work.",
  },
  {
    href: "/insights/case-studies",
    label: "Case studies",
    body: "Transactions Guide has arranged, published with approval.",
  },
  { href: "/insights/news", label: "News", body: "Firm and market updates." },
  {
    href: "/insights/faqs",
    label: "FAQs",
    body: "Common questions, grouped by service.",
  },
];

/**
 * Insights hub.
 *
 * Editorial, continuing the homepage's register. The category index is real
 * navigation; the article grid is placeholder because the current site has no
 * insights content at all and none will be invented to fill it.
 */
export default function InsightsPage() {
  const [lead, ...rest] = insights;
  return (
    <>
      <PageOpening
        eyebrow="Insights"
        headingId="insights-heading"
        title="Knowledge, published."
        standfirst="Commentary on lending conditions, property finance and protection — written by the people giving the advice."
        crumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
      />

      <section
        aria-labelledby="insights-cats-heading"
        className="border-b border-line py-[var(--section-sm)]"
      >
        <Container>
          <h2 id="insights-cats-heading" className="sr-only">
            Categories
          </h2>
          <ul className="m-0 grid list-none grid-cols-1 gap-px border-t border-line bg-line p-0 sm:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => (
              <li
                key={category.href}
                className="bg-ground py-7 sm:px-6 sm:first:pl-0"
              >
                <Link href={category.href} className="group block">
                  <span className="block text-heading-2 font-medium tracking-tight text-ink transition-colors duration-base group-hover:text-accent">
                    {category.label}
                  </span>
                  <span className="mt-2 block max-w-[30ch] text-body-sm text-ink-secondary">
                    {category.body}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="insights-latest-heading"
        className="py-[var(--section-md)]"
      >
        <Container>
          <DatumGrid>
            <Eyebrow>Latest</Eyebrow>
            <h2
              id="insights-latest-heading"
              className="max-w-[20ch] text-display-2 font-medium text-balance"
            >
              Recent writing.
            </h2>
          </DatumGrid>
          <PendingContent
            label="insights.articles — three approved articles required, or confirm the section launches hidden"
            className="mt-11"
          >
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
              {lead && (
                <article>
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
                    [APPROVED ARTICLE REQUIRED]
                  </h3>
                </article>
              )}
              <div className="flex flex-col gap-8">
                {rest.map((insight) => (
                  <article
                    key={insight.id}
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
                      [APPROVED ARTICLE REQUIRED]
                    </h3>
                  </article>
                ))}
              </div>
            </div>
          </PendingContent>
        </Container>
      </section>
    </>
  );
}
