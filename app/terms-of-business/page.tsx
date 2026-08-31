import type { Metadata } from "next";
import { PageOpening } from "@/components/layout/SimplePage";
import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PendingContent } from "@/components/ui/PendingContent";

export const metadata: Metadata = {
  title: "Terms of business",
  robots: { index: false, follow: false },
};

/**
 * Terms of business.
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
        title="Terms of business"
        standfirst="The basis on which Guide acts."
        crumbs={[{ label: "Home", href: "/" }, { label: "Terms of business" }]}
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
                label="legal.terms — the approved terms of business must be reproduced verbatim"
                className="mt-9"
              >
                <p className="max-w-[58ch] text-body-lg text-ink-secondary">
                  The current terms of business exist as a PDF (May 2025) at
                  their original URL and are linked from the footer. They are
                  reproduced here verbatim once the firm confirms the current
                  version.
                </p>
              </PendingContent>
            </div>
          </DatumGrid>
        </Container>
      </section>
    </>
  );
}
