import type { Metadata } from "next";
import { PageOpening } from "@/components/layout/SimplePage";
import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PendingContent } from "@/components/ui/PendingContent";

export const metadata: Metadata = {
  title: "Accessibility",
  robots: { index: false, follow: false },
};

/**
 * Accessibility.
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
        title="Accessibility"
        standfirst="How this site is built to be usable."
        crumbs={[{ label: "Home", href: "/" }, { label: "Accessibility" }]}
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
                label="footer.legalPages — accessibility statement required"
                className="mt-9"
              >
                <p className="max-w-[58ch] text-body-lg text-ink-secondary">
                  This site is built to be keyboard operable, to respect
                  reduced-motion preferences, and to meet WCAG AA contrast. A
                  published accessibility statement should describe that
                  commitment and give a route to report problems.
                </p>
              </PendingContent>
            </div>
          </DatumGrid>
        </Container>
      </section>
    </>
  );
}
