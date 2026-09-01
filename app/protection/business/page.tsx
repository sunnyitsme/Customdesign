import type { Metadata } from "next";
import { ServiceIndex } from "@/components/hub/ServiceIndex";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeroMedia } from "@/components/ui/HeroMedia";
import { requireHeroImage } from "@/content/media";
import { businessProtectionPages } from "@/content/service-pages";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Business protection",
  description:
    "Key person cover, share protection, relevant life, staff benefits, employers' liability and professional indemnity.",
};

/**
 * Business protection.
 *
 * Corporate and structured, in contrast with the personal hub above it: a dark
 * opening, no domestic imagery, and services presented as risks to be covered
 * rather than circumstances to be reassured about.
 */
export default function BusinessProtectionPage() {
  return (
    <>
      <section
        aria-labelledby="bp-heading"
        className="on-deep bg-deep pt-[calc(var(--header-height)+var(--section-sm))] pb-[var(--section-md)] text-ink-inverse"
      >
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Protection", href: "/protection" },
              { label: "Business" },
            ]}
          />
          <DatumGrid className="mt-10">
            <Eyebrow tone="dark">Business protection</Eyebrow>
            <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start">
              <div>
                <h1
                  id="bp-heading"
                  className="max-w-[18ch] text-display-1 font-medium text-balance"
                >
                  Risks a business carries, covered deliberately.
                </h1>
                <p className="mt-8 max-w-[56ch] text-body-lg text-ink-inverse-secondary">
                  The loss of an owner or a key individual is a commercial risk
                  like any other. These arrangements are owned by the business
                  and assessed on that basis.
                </p>
                <a
                  href={site.phoneHref}
                  className="mt-10 inline-block text-body-lg font-medium tabular text-ink-inverse underline decoration-line-inverse-interactive underline-offset-[6px] transition-colors duration-base hover:decoration-accent-bright"
                >
                  {site.phone}
                </a>
              </div>

              <div className="relative aspect-4/3 w-full lg:aspect-4/5">
                <HeroMedia
                  image={requireHeroImage("/protection/business")}
                  tone="dark"
                  priority
                  sizes="(min-width: 1024px) 36vw, 100vw"
                />
              </div>
            </div>
          </DatumGrid>
        </Container>
      </section>

      <ServiceIndex
        pages={businessProtectionPages}
        eyebrow="Cover"
        heading="What a business can put in place."
        headingId="bp-services-heading"
        numbered
      />
    </>
  );
}
