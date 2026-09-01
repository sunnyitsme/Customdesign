import type { Metadata } from "next";
import Link from "next/link";
import { PageOpening } from "@/components/layout/SimplePage";
import { Container } from "@/components/ui/Container";
import { PendingContent } from "@/components/ui/PendingContent";
import { requireHeroImage } from "@/content/media";
import { locations } from "@/content/locations";

export const metadata: Metadata = { title: "Locations" };

export default function LocationsPage() {
  return (
    <>
      <PageOpening
        eyebrow="Locations"
        headingId="locations-heading"
        title="Where Guide works from."
        standfirst="Office details are shown as recorded in the firm's own material. The sources currently disagree on how many offices there are, so that conflict is shown rather than resolved."
        crumbs={[{ label: "Home", href: "/" }, { label: "Locations" }]}
        image={requireHeroImage("/locations")}
      />
      <section
        aria-labelledby="locations-list-heading"
        className="py-[var(--section-md)]"
      >
        <Container>
          <h2 id="locations-list-heading" className="sr-only">
            Offices
          </h2>
          <PendingContent label="conflicts.contact — office count and contact details differ between sources">
            <ul className="m-0 grid list-none grid-cols-1 gap-px border-t border-line bg-line p-0 md:grid-cols-2">
              {locations.map((location) => (
                <li
                  key={location.slug}
                  className="bg-ground py-8 md:px-7 md:first:pl-0"
                >
                  <Link
                    href={`/locations/${location.slug}`}
                    className="group block"
                  >
                    <h3 className="text-heading-1 font-medium tracking-tight transition-colors duration-base group-hover:text-accent">
                      {location.city}
                    </h3>
                    <p className="mt-3 max-w-[34ch] text-body-lg text-ink-secondary">
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
