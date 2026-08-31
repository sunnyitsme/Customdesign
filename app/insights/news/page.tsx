import type { Metadata } from "next";
import { PageOpening } from "@/components/layout/SimplePage";
import { Container } from "@/components/ui/Container";
import { PendingContent } from "@/components/ui/PendingContent";

export const metadata: Metadata = { title: "News" };

export default function Page() {
  return (
    <>
      <PageOpening
        eyebrow="Insights"
        headingId="page-heading"
        title="News"
        standfirst="Firm and market updates."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: "News" },
        ]}
      />
      <section
        aria-labelledby="page-body-heading"
        className="py-[var(--section-md)]"
      >
        <Container>
          <h2 id="page-body-heading" className="sr-only">
            News
          </h2>
          <PendingContent label="insights.articles — approved content required">
            <p className="max-w-[54ch] text-body-lg text-ink-secondary">
              [APPROVED COPY REQUIRED] — no news content exists on the current
              site. Nothing is written here to fill the space.
            </p>
          </PendingContent>
        </Container>
      </section>
    </>
  );
}
