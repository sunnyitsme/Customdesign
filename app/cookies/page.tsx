import type { Metadata } from "next";
import { PageOpening } from "@/components/layout/SimplePage";
import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PendingContent } from "@/components/ui/PendingContent";

export const metadata: Metadata = {
  title: "Cookies",
  robots: { index: false, follow: false },
};

/**
 * Cookies.
 *
 * Legal wording is reproduced verbatim from an approved source or not at all.
 * Paraphrasing a regulated document to fill a page would change its meaning,
 * so this route exists and stays blocked until the document is supplied.
 */
export default function Page() {
  return (
    <>
      <PageOpening
        eyebrow="Legal"
        headingId="legal-heading"
        title="Cookies"
        standfirst="How this site uses cookies and similar technology."
        crumbs={[{ label: "Home", href: "/" }, { label: "Cookies" }]}
      />
      <section
        aria-labelledby="legal-body-heading"
        className="py-[var(--section-md)]"
      >
        <Container>
          <DatumGrid>
            <Eyebrow>Document</Eyebrow>
            <div>
              <h2
                id="legal-body-heading"
                className="max-w-[24ch] text-display-2 font-medium text-balance"
              >
                Awaiting the approved document.
              </h2>
              <PendingContent
                label="footer.legalPages — no cookies policy exists in the migration pack"
                className="mt-9"
              >
                <p className="max-w-[58ch] text-body-lg text-ink-secondary">
                  No cookie policy was found on the current site. One is needed
                  before launch, particularly as Google Tag Manager is in use,
                  together with a consent mechanism.
                </p>
              </PendingContent>
            </div>
          </DatumGrid>
        </Container>
      </section>
    </>
  );
}
