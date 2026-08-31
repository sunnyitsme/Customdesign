import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageOpening } from "@/components/layout/SimplePage";
import { Container, DatumGrid } from "@/components/ui/Container";
import { DrawingPlate } from "@/components/ui/DrawingPlate";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PendingContent } from "@/components/ui/PendingContent";
import { locations } from "@/content/locations";
import { divisions } from "@/content/services";
import { site } from "@/content/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = locations.find((entry) => entry.slug === slug);
  return location ? { title: `${location.city} office` } : {};
}

/**
 * Location page.
 *
 * Carries the address as recorded, the services available, and a map slot. It
 * makes no local claim — no coverage area, no local team, no years in the city.
 * None of that is documented, and inventing it would be inventing office
 * information.
 */
export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = locations.find((entry) => entry.slug === slug);
  if (!location) notFound();

  return (
    <>
      <PageOpening
        eyebrow="Location"
        headingId="location-heading"
        title={`${location.city}`}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: location.city },
        ]}
      >
        <p className="mt-8 max-w-[46ch] text-body-lg text-ink-inverse-secondary">
          {location.address}
        </p>
        <p className="mt-4 text-body-sm text-accent-bright">[FIRM CONFIRMATION REQUIRED]</p>
        <a
          href={site.phoneHref}
          className="mt-8 inline-block text-body-lg font-medium tabular text-ink-inverse underline decoration-line-inverse underline-offset-[6px] hover:decoration-accent-bright"
        >
          {site.phone}
        </a>
      </PageOpening>

      <section aria-labelledby="location-detail-heading" className="py-[var(--section-md)]">
        <Container>
          <DatumGrid>
            <Eyebrow>This office</Eyebrow>
            <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
              <div>
                <h2 id="location-detail-heading" className="max-w-[22ch] text-display-2 font-medium text-balance">
                  Advice available here.
                </h2>
                <ul className="m-0 mt-9 flex list-none flex-col gap-px border-t border-line bg-line p-0">
                  {divisions.map((division) => (
                    <li key={division.id} className="bg-ground py-5">
                      <Link
                        href={division.href}
                        className="text-heading-3 font-medium text-ink transition-colors duration-base hover:text-accent"
                      >
                        {division.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <PendingContent
                  label={`locations.${location.slug} — approved local copy and adviser details required`}
                  className="mt-10"
                >
                  <p className="max-w-[54ch] text-body-lg text-ink-secondary">
                    [APPROVED COPY REQUIRED] — a short description of this office
                    and who works from it.
                  </p>
                </PendingContent>
              </div>
              <div>
                <div className="relative aspect-4/3 w-full">
                  <DrawingPlate label="Map required — location and directions" tone="light" />
                </div>
                <p className="mt-4 text-body-sm text-ink-tertiary">
                  Map and directions [FIRM CONFIRMATION REQUIRED]
                </p>
              </div>
            </div>
          </DatumGrid>
        </Container>
      </section>
    </>
  );
}
