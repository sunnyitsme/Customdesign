import type { Metadata } from "next";
import { PageOpening } from "@/components/layout/SimplePage";
import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PendingContent } from "@/components/ui/PendingContent";

export const metadata: Metadata = {
  title: "Privacy notice",
  robots: { index: false, follow: false },
};

/**
 * Privacy notice.
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
        title="Privacy notice"
        standfirst="How Guide handles personal information."
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy notice" }]}
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
                label="legal.privacy — the approved privacy notice must be reproduced verbatim"
                className="mt-9"
              >
                <p className="max-w-[58ch] text-body-lg text-ink-secondary">
                  The current privacy notice exists as a PDF at its original URL
                  and is linked from the footer. It is reproduced here verbatim
                  once the firm confirms the current version — note the pack
                  records that the PDF&rsquo;s contact details differ from the
                  public site&rsquo;s.
                </p>
              </PendingContent>
            </div>
          </DatumGrid>
        </Container>
      </section>
    </>
  );
}
