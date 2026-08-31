import type { Metadata } from "next";
import Link from "next/link";
import { PageOpening } from "@/components/layout/SimplePage";
import { Container } from "@/components/ui/Container";
import { DrawingPlate } from "@/components/ui/DrawingPlate";
import { PendingContent } from "@/components/ui/PendingContent";
import { cases } from "@/content/cases";

export const metadata: Metadata = { title: "Case studies" };

export default function CaseStudiesPage() {
  return (
    <>
      <PageOpening
        eyebrow="Case studies"
        headingId="cases-index-heading"
        title="Transactions we have arranged."
        standfirst="Published only where the client has agreed and compliance has approved the wording. No case is published without both."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: "Case studies" },
        ]}
      />
      <section
        aria-labelledby="cases-list-heading"
        className="py-[var(--section-md)]"
      >
        <Container>
          <h2 id="cases-list-heading" className="sr-only">
            Cases
          </h2>
          <PendingContent label="cases.approved — no case-study content exists on the current site">
            <ul className="m-0 grid list-none grid-cols-1 gap-x-12 gap-y-12 p-0 md:grid-cols-2">
              {cases.map((entry) => (
                <li key={entry.id}>
                  <Link
                    href={`/insights/case-studies/${entry.id}`}
                    className="group block"
                  >
                    <div className="relative aspect-3/2 w-full">
                      <DrawingPlate
                        label={`${entry.discipline} — photography required`}
                        tone="light"
                      />
                    </div>
                    <p className="mt-6 text-eyebrow font-medium tracking-[0.16em] text-accent uppercase">
                      {entry.discipline}
                    </p>
                    <h3 className="mt-3 max-w-[24ch] text-heading-1 font-medium tracking-tight transition-colors duration-base group-hover:text-accent">
                      [APPROVED CASE STUDY REQUIRED]
                    </h3>
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
