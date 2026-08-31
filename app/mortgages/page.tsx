import type { Metadata } from "next";
import Link from "next/link";
import { HubHero } from "@/components/hub/HubHero";
import { ServiceIndex } from "@/components/hub/ServiceIndex";
import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PendingContent } from "@/components/ui/PendingContent";
import { mortgageGuides, mortgagePages } from "@/content/service-pages";
import { processSteps } from "@/content/process";

export const metadata: Metadata = {
  title: "Mortgages",
  description:
    "Residential mortgage advice covering purchases, remortgaging, buy-to-let, and lending for self-employed and higher-value cases.",
};

/**
 * Mortgages hub.
 *
 * Routes by circumstance rather than by product: someone arrives knowing they
 * are buying a first home or coming off a fixed rate, not knowing they want a
 * "tracker". Products live under /mortgages/guides, one level back, so they
 * keep their search value without competing for the same intent.
 */
export default function MortgagesPage() {
  return (
    <>
      <HubHero
        eyebrow="Mortgages"
        headingId="mortgages-heading"
        title="Advice for the property you are actually buying."
        standfirst="Purchases, remortgaging, buy-to-let, and lending where income or property does not fit a standard template. Advice from a named adviser who stays with the case."
        ctaLabel="Speak to a mortgage adviser"
        imageAlt="Image required — residential property, warm domestic register"
      />

      <ServiceIndex
        pages={mortgagePages}
        eyebrow="By circumstance"
        heading="Where are you starting from?"
        headingId="mortgage-services-heading"
      />

      {/* Process — the same four steps as the homepage, restated in a mortgage
          context rather than repeated verbatim. */}
      <section
        aria-labelledby="mortgage-process-heading"
        className="border-t border-line bg-surface py-[var(--section-md)]"
      >
        <Container>
          <DatumGrid>
            <Eyebrow>How it works</Eyebrow>
            <h2
              id="mortgage-process-heading"
              className="max-w-[20ch] text-display-2 font-medium text-balance"
            >
              From first conversation to completion.
            </h2>
          </DatumGrid>
          <PendingContent
            label="process.copy — wording needs firm approval"
            className="mt-12"
          >
            <ol className="relative m-0 grid list-none grid-cols-1 gap-y-10 p-0 md:grid-cols-2 xl:grid-cols-4 xl:gap-x-10">
              <span
                aria-hidden="true"
                className="absolute top-0 bottom-0 left-[7px] w-px bg-line xl:top-[7px] xl:right-0 xl:bottom-auto xl:left-0 xl:h-px xl:w-auto"
              />
              {processSteps.map((step) => (
                <li
                  key={step.index}
                  className="relative pl-10 xl:pt-10 xl:pl-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 left-0 block h-3.5 w-3.5 rounded-full border border-accent bg-surface xl:top-0"
                  />
                  <span className="block text-eyebrow font-medium tabular text-accent uppercase">
                    {step.index}
                  </span>
                  <h3 className="mt-4 text-heading-2 font-medium tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[34ch] text-body text-ink-secondary">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </PendingContent>
        </Container>
      </section>

      {/* Guides — educational content, clearly secondary to the service pages. */}
      <section
        aria-labelledby="mortgage-guides-heading"
        className="border-t border-line py-[var(--section-md)]"
      >
        <Container>
          <DatumGrid>
            <Eyebrow>Guides</Eyebrow>
            <div className="grid gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
              <h2
                id="mortgage-guides-heading"
                className="max-w-[20ch] text-display-2 font-medium text-balance"
              >
                Understanding the products.
              </h2>
              <p className="max-w-[42ch] text-body-lg text-ink-secondary lg:pt-2">
                Plain explanations of how each type of mortgage works, separate
                from advice on your own circumstances.
              </p>
            </div>
          </DatumGrid>
          <ul className="m-0 mt-11 grid list-none grid-cols-1 gap-px border-t border-line bg-line p-0 sm:grid-cols-2 xl:grid-cols-4">
            {mortgageGuides.map((guide) => (
              <li key={guide.slug} className="bg-ground">
                <Link
                  href={`/${guide.parent}/${guide.slug}`}
                  className="group block py-7 sm:px-5 sm:first:pl-0"
                >
                  <span className="block text-heading-3 font-medium text-ink transition-colors duration-base group-hover:text-accent">
                    {guide.navLabel}
                  </span>
                  <span className="mt-2 block max-w-[32ch] text-body-sm text-ink-secondary">
                    {guide.scope}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/calculators"
            className="mt-12 inline-block border-b border-line-interactive pb-1 text-body-sm font-medium text-ink transition-colors duration-base hover:border-accent hover:text-accent"
          >
            Work through the numbers with our calculators
          </Link>
        </Container>
      </section>
    </>
  );
}
