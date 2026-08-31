import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageOpening } from "@/components/layout/SimplePage";
import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PendingContent } from "@/components/ui/PendingContent";
import { locations } from "@/content/locations";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Contact" };

/**
 * Contact.
 *
 * Conversion-focused, but the phone number is given equal weight to the form —
 * for most of these enquiries a call is faster, and the form cannot currently
 * deliver anything.
 */
export default function ContactPage() {
  return (
    <>
      <PageOpening
        eyebrow="Contact"
        headingId="contact-heading"
        title="Start a conversation."
        standfirst="Tell us what you are trying to do and we will point you at the right adviser."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      >
        <a
          href={site.phoneHref}
          className="mt-9 inline-block text-display-2 font-medium tabular text-ink-inverse underline decoration-line-inverse underline-offset-[8px] transition-colors duration-base hover:decoration-accent-bright"
        >
          {site.phone}
        </a>
      </PageOpening>

      <section
        aria-labelledby="contact-form-heading"
        className="py-[var(--section-md)]"
      >
        <Container>
          <DatumGrid>
            <Eyebrow>Enquiry</Eyebrow>
            <div className="grid gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
              <div>
                <h2
                  id="contact-form-heading"
                  className="max-w-[20ch] text-display-2 font-medium text-balance"
                >
                  Send us the details.
                </h2>
                <div className="mt-10">
                  <ContactForm />
                </div>
              </div>

              <aside className="border-t border-line pt-9 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                <h3 className="text-eyebrow font-medium tracking-[0.16em] text-ink-tertiary uppercase">
                  Direct
                </h3>
                <a
                  href={site.phoneHref}
                  className="mt-4 block text-heading-1 font-medium tabular text-ink hover:text-accent"
                >
                  {site.phone}
                </a>
                <PendingContent
                  label="conflicts.contact — email and address differ between the public site and the legal PDFs"
                  className="mt-6"
                >
                  <a
                    href={`mailto:${site.email}`}
                    className="block text-body text-ink-secondary underline decoration-line-interactive underline-offset-4 hover:decoration-accent"
                  >
                    {site.email}
                  </a>
                  <p className="mt-2 text-body-sm text-accent">
                    [FIRM CONFIRMATION REQUIRED]
                  </p>
                </PendingContent>

                <h3 className="mt-10 text-eyebrow font-medium tracking-[0.16em] text-ink-tertiary uppercase">
                  Offices
                </h3>
                <ul className="m-0 mt-4 flex list-none flex-col gap-4 p-0">
                  {locations.map((location) => (
                    <li key={location.slug}>
                      <p className="text-body-sm font-medium text-ink">
                        {location.city}
                      </p>
                      <p className="mt-1 max-w-[28ch] text-body-sm text-ink-secondary">
                        {location.address}
                      </p>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </DatumGrid>
        </Container>
      </section>
    </>
  );
}
