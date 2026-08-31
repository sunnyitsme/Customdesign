import type { Metadata } from "next";
import { PageOpening } from "@/components/layout/SimplePage";
import { Container } from "@/components/ui/Container";
import { PendingContent } from "@/components/ui/PendingContent";

export const metadata: Metadata = { title: "Guides" };

export default function Page() {
  return (
    <>
      <PageOpening
        eyebrow="Insights"
        headingId="page-heading"
        title="Guides"
        standfirst="Explanations of how products and processes work."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: "Guides" },
        ]}
      />
      <section
        aria-labelledby="page-body-heading"
        className="py-[var(--section-md)]"
      >
        <Container>
          <h2 id="page-body-heading" className="sr-only">
            Guides
          </h2>
          <PendingContent label="insights.articles — approved content required">
            <p className="max-w-[54ch] text-body-lg text-ink-secondary">
              [APPROVED COPY REQUIRED] — no guides content exists on the current
              site. Nothing is written here to fill the space.
            </p>
          </PendingContent>
        </Container>
      </section>
    </>
  );
}
