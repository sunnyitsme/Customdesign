import type { Metadata } from "next";
import Link from "next/link";
import { HubHero } from "@/components/hub/HubHero";
import { Container, DatumGrid } from "@/components/ui/Container";
import { DrawingPlate } from "@/components/ui/DrawingPlate";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PendingContent } from "@/components/ui/PendingContent";
import { requireHeroImage } from "@/content/media";
import { divisions } from "@/content/services";
import { locations } from "@/content/locations";
import { team } from "@/content/team";

export const metadata: Metadata = {
  title: "About Guide",
  description:
    "Guide advises across residential mortgages, specialist property finance, protection, and wills and estate planning.",
};

/**
 * About.
 *
 * People-led rather than product-led. The four divisions appear as an index
 * because that structure is documented; everything characterising the firm —
 * its story, values, how it works — is placeholder, because the migration pack
 * records that such content exists but not what it says.
 */
export default function AboutPage() {
  return (
    <>
      <HubHero
        eyebrow="About Guide"
        headingId="about-heading"
        title="Four disciplines, advised as one."
        standfirst="Guide advises on residential mortgages, specialist property finance, protection, and wills and estate planning — areas that are rarely separate in practice."
        ctaLabel="Speak to an adviser"
        image={requireHeroImage("/about")}
      />

      <section
        aria-labelledby="about-story-heading"
        className="border-t border-line py-[var(--section-md)]"
      >
        <Container>
          <DatumGrid>
            <Eyebrow>The firm</Eyebrow>
            <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
              <div>
                <h2
                  id="about-story-heading"
                  className="max-w-[20ch] text-display-2 font-medium text-balance"
                >
                  Advice given with the other areas in view.
                </h2>
                <PendingContent
                  label="about.copy — approved company story, mission and values required"
                  className="mt-9"
                >
                  <p className="max-w-[58ch] text-body-lg text-ink-secondary">
                    A purchase raises questions about cover; a portfolio raises
                    questions about structure; an estate raises questions about
                    both. [APPROVED COPY REQUIRED] — the firm&rsquo;s own
                    account of its story, mission and values.
                  </p>
                </PendingContent>
              </div>
              <ul className="m-0 flex list-none flex-col gap-px border-t border-line bg-line p-0">
                {divisions.map((division) => (
                  <li key={division.id} className="bg-ground py-5">
                    <Link href={division.href} className="group block">
                      <span className="block text-heading-3 font-medium text-ink transition-colors duration-base group-hover:text-accent">
                        {division.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </DatumGrid>
        </Container>
      </section>

      <section
        aria-labelledby="about-people-heading"
        className="border-t border-line bg-surface py-[var(--section-md)]"
      >
        <Container>
          <DatumGrid>
            <Eyebrow>People</Eyebrow>
            <h2
              id="about-people-heading"
              className="max-w-[20ch] text-display-2 font-medium text-balance"
            >
              The advisers behind the advice.
            </h2>
          </DatumGrid>
          <PendingContent
            label="team.current — /our_team is unlinked from navigation; confirm the team is current"
            className="mt-12"
          >
            <ul className="m-0 grid list-none grid-cols-1 gap-x-8 gap-y-12 p-0 sm:grid-cols-2 xl:grid-cols-4">
              {team.map((member, index) => (
                <li
                  key={member.id}
                  className={index % 2 === 1 ? "xl:mt-12" : undefined}
                >
                  <Link
                    href={`/about/team/${member.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-4/5 w-full">
                      <DrawingPlate
                        label={`${member.name} — portrait required`}
                        tone="light"
                      />
                    </div>
                    <h3 className="mt-6 text-heading-2 font-medium tracking-tight transition-colors duration-base group-hover:text-accent">
                      {member.name}
                    </h3>
                    <p className="mt-2 text-body-sm text-accent">
                      Role [FIRM CONFIRMATION REQUIRED]
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </PendingContent>
          <Link
            href="/about/our-team"
            className="mt-14 inline-block border-b border-line-interactive pb-1 text-body-sm font-medium text-ink transition-colors duration-base hover:border-accent hover:text-accent"
          >
            Meet our team
          </Link>
        </Container>
      </section>

      <section
        aria-labelledby="about-offices-heading"
        className="border-t border-line py-[var(--section-md)]"
      >
        <Container>
          <DatumGrid>
            <Eyebrow>Offices</Eyebrow>
            <h2
              id="about-offices-heading"
              className="max-w-[20ch] text-display-2 font-medium text-balance"
            >
              Where we work from.
            </h2>
          </DatumGrid>
          <PendingContent
            label="conflicts.contact — the company page names three offices, the footer four"
            className="mt-11"
          >
            <ul className="m-0 grid list-none grid-cols-1 gap-px border-t border-line bg-line p-0 sm:grid-cols-2 xl:grid-cols-4">
              {locations.map((location) => (
                <li
                  key={location.slug}
                  className="bg-ground py-7 sm:px-6 sm:first:pl-0"
                >
                  <Link
                    href={`/locations/${location.slug}`}
                    className="group block"
                  >
                    <h3 className="text-heading-3 font-medium text-ink transition-colors duration-base group-hover:text-accent">
                      {location.city}
                    </h3>
                    <p className="mt-2 max-w-[28ch] text-body-sm text-ink-secondary">
                      {location.address}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </PendingContent>
        </Container>
      </section>
    </>
  );
}
