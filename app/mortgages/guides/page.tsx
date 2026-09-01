import type { Metadata } from "next";
import { ServiceIndex } from "@/components/hub/ServiceIndex";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeroMedia } from "@/components/ui/HeroMedia";
import { requireHeroImage } from "@/content/media";
import { mortgageGuides } from "@/content/service-pages";

export const metadata: Metadata = {
  title: "Mortgage guides",
  description: "Plain explanations of how each type of mortgage works.",
};

export default function MortgageGuidesPage() {
  return (
    <>
      <section
        aria-labelledby="guides-heading"
        className="on-deep bg-deep pt-[calc(var(--header-height)+var(--section-sm))] pb-[var(--section-md)] text-ink-inverse"
      >
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Mortgages", href: "/mortgages" },
              { label: "Guides" },
            ]}
          />
          <DatumGrid className="mt-10">
            <Eyebrow tone="dark">Guides</Eyebrow>
            <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start">
              <div>
                <h1
                  id="guides-heading"
                  className="max-w-[18ch] text-display-1 font-medium text-balance"
                >
                  How each type of mortgage works.
                </h1>
                <p className="mt-8 max-w-[56ch] text-body-lg text-ink-inverse-secondary">
                  Explanation rather than recommendation. What applies to your
                  own circumstances is a conversation with an adviser.
                </p>
              </div>

              <div className="relative aspect-4/3 w-full lg:aspect-4/5">
                <HeroMedia
                  image={requireHeroImage("/mortgages/guides")}
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
        pages={mortgageGuides}
        eyebrow="Product types"
        heading="Guides."
        headingId="guides-index-heading"
        numbered
      />
    </>
  );
}
