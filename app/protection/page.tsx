import type { Metadata } from "next";
import Link from "next/link";
import { HubHero } from "@/components/hub/HubHero";
import { ServiceIndex } from "@/components/hub/ServiceIndex";
import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { requireHeroImage } from "@/content/media";
import { protectionPages } from "@/content/service-pages";

export const metadata: Metadata = {
  title: "Protection",
  description:
    "Personal and business cover including life assurance, income protection, critical illness, private medical, and key person and share protection.",
};

/**
 * Protection hub.
 *
 * Calm and human. No dramatic imagery, no fear framing — these products exist
 * because of difficult events, and the page treats the reader as an adult
 * rather than frightening them into an enquiry. Business protection is a
 * distinct destination rather than a subsection here.
 */
export default function ProtectionPage() {
  return (
    <>
      <HubHero
        eyebrow="Protection"
        headingId="protection-heading"
        title="Cover that holds when circumstances change."
        standfirst="Life assurance, critical illness, income protection and medical cover — arranged around what a household or a business would actually need."
        ctaLabel="Talk about protection"
        image={requireHeroImage("/protection")}
      />

      <ServiceIndex
        pages={protectionPages}
        eyebrow="Personal cover"
        heading="For your household."
        headingId="personal-protection-heading"
      />

      <section
        aria-labelledby="business-protection-heading"
        className="on-deep border-t border-line-inverse bg-deep py-[var(--section-md)] text-ink-inverse"
      >
        <Container>
          <DatumGrid>
            <Eyebrow tone="dark">Business cover</Eyebrow>
            <div>
              <h2
                id="business-protection-heading"
                className="max-w-[20ch] text-display-2 font-medium text-balance"
              >
                For your business.
              </h2>
              <p className="mt-8 max-w-[52ch] text-body-lg text-ink-inverse-secondary">
                Key person cover, share protection, relevant life and staff
                benefits — arranged for the business rather than the household,
                and assessed as a commercial risk.
              </p>
              <Link
                href="/protection/business"
                className="mt-10 inline-flex items-center justify-center rounded-sm bg-ink-inverse px-7 py-4 text-body-sm font-medium text-ink transition-colors duration-base hover:bg-accent-bright"
              >
                Business protection
              </Link>
            </div>
          </DatumGrid>
        </Container>
      </section>
    </>
  );
}
