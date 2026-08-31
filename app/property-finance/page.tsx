import type { Metadata } from "next";
import Link from "next/link";
import { HubHero } from "@/components/hub/HubHero";
import { ServiceIndex } from "@/components/hub/ServiceIndex";
import { Container, DatumGrid } from "@/components/ui/Container";
import { DrawingPlate } from "@/components/ui/DrawingPlate";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PendingContent } from "@/components/ui/PendingContent";
import { cases } from "@/content/cases";
import { propertyFinancePages } from "@/content/service-pages";

export const metadata: Metadata = {
  title: "Property finance",
  description:
    "Specialist funding for investors, landlords and developers: bridging, development finance, commercial and semi-commercial, portfolio and auction finance.",
};

/**
 * Property Finance hub.
 *
 * Institutional register, dark-led — this reader is assessing a transaction,
 * not choosing a home. Wide architectural media, a client-type band instead of
 * a domestic process, and case-study architecture carrying the credibility.
 */
export default function PropertyFinancePage() {
  return (
    <>
      <HubHero
        eyebrow="Property finance"
        headingId="property-finance-heading"
        title="Funding structured around the transaction."
        standfirst="Bridging, development, commercial and portfolio lending for investors, landlords and developers — arranged around deadlines, exits and the property itself."
        ctaLabel="Discuss property finance"
        tone="dark"
        media="wide"
        imageAlt="Image required — development site or commercial architecture, wide crop"
      />

      <ServiceIndex
        pages={propertyFinancePages}
        eyebrow="Facilities"
        heading="What we arrange."
        headingId="property-finance-services-heading"
        numbered
      />

      {/* Who we work with — a transaction-led band rather than a domestic one. */}
      <section
        aria-labelledby="pf-clients-heading"
        className="border-t border-line bg-surface py-[var(--section-md)]"
      >
        <Container>
          <DatumGrid>
            <Eyebrow>Client types</Eyebrow>
            <h2 id="pf-clients-heading" className="max-w-[22ch] text-display-2 font-medium text-balance">
              Who this desk works with.
            </h2>
          </DatumGrid>
          <ul className="m-0 mt-11 grid list-none grid-cols-1 gap-px border-t border-line bg-line p-0 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Developers", "Building out sites, converting buildings, or buying land."],
              ["Portfolio landlords", "Holding multiple properties personally or through a company."],
              ["Investors", "Buying at auction, refurbishing, or acquiring commercial property."],
              ["Businesses", "Buying premises to occupy rather than to let."],
            ].map(([title, body]) => (
              <li key={title} className="bg-surface py-8 md:px-6 md:first:pl-0">
                <h3 className="text-heading-3 font-medium text-ink">{title}</h3>
                <p className="mt-3 max-w-[30ch] text-body text-ink-secondary">{body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Case-study architecture — real structure, no invented outcomes. */}
      <section
        aria-labelledby="pf-cases-heading"
        className="on-deep border-t border-line-inverse bg-deep py-[var(--section-md)] text-ink-inverse"
      >
        <Container>
          <DatumGrid>
            <Eyebrow tone="dark">Selected cases</Eyebrow>
            <div className="grid gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
              <h2 id="pf-cases-heading" className="max-w-[20ch] text-display-2 font-medium text-balance">
                Transactions we have arranged.
              </h2>
              <p className="max-w-[42ch] text-body-lg text-ink-inverse-secondary lg:pt-2">
                Published only where the client has agreed and compliance has
                approved the wording.
              </p>
            </div>
          </DatumGrid>
          <PendingContent
            tone="dark"
            label="cases.approved — no case content exists; publishing outcomes needs sign-off"
            className="mt-12"
          >
            <ul className="m-0 grid list-none grid-cols-1 gap-px border-t border-line-inverse bg-line-inverse p-0 md:grid-cols-2">
              {cases.map((entry) => (
                <li key={entry.id} className="bg-deep py-8 md:px-7 md:first:pl-0">
                  <div className="relative aspect-16/10 w-full">
                    <DrawingPlate label={`${entry.discipline} — photography required`} tone="dark" />
                  </div>
                  <p className="mt-6 text-eyebrow font-medium tracking-[0.16em] text-accent-bright uppercase">
                    {entry.discipline}
                  </p>
                  <p className="mt-4 text-body-lg text-ink-inverse-secondary">
                    [APPROVED CASE STUDY REQUIRED]
                  </p>
                </li>
              ))}
            </ul>
          </PendingContent>
          <Link
            href="/insights/case-studies"
            className="mt-12 inline-block border-b border-line-inverse pb-1 text-body-sm font-medium text-ink-inverse transition-colors duration-base hover:border-accent-bright hover:text-accent-bright"
          >
            All case studies
          </Link>
        </Container>
      </section>
    </>
  );
}
