import type { Metadata } from "next";
import { PageOpening } from "@/components/layout/SimplePage";
import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PendingContent } from "@/components/ui/PendingContent";

export const metadata: Metadata = {
  title: "Complaints",
  robots: { index: false, follow: false },
};

/**
 * Complaints.
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
        title="Complaints"
        standfirst="How to raise a complaint, and what happens next."
        crumbs={[{ label: "Home", href: "/" }, { label: "Complaints" }]}
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
                label="footer.legalPages — no complaints page exists in the migration pack"
                className="mt-9"
              >
                <p className="max-w-[58ch] text-body-lg text-ink-secondary">
                  The terms of business are documented as covering complaints,
                  but no standalone complaints page exists. Regulated firms are
                  expected to publish their complaints procedure, so approved
                  wording is needed before launch.
                </p>
              </PendingContent>
            </div>
          </DatumGrid>
        </Container>
      </section>
    </>
  );
}
