import type { Metadata } from "next";
import { PageOpening } from "@/components/layout/SimplePage";
import { Accordion } from "@/components/ui/Accordion";
import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PendingContent } from "@/components/ui/PendingContent";
import { faqGroups } from "@/content/faqs";

export const metadata: Metadata = { title: "FAQs" };

/**
 * FAQs, grouped by service.
 *
 * Two legacy questions are carried with an explicit review note rather than
 * reproduced: indicative borrowing, and typical application-to-completion
 * timing. Both were on the old page; both are claims the firm has not
 * confirmed. See content/faqs.ts.
 */
export default function FaqsPage() {
  return (
    <>
      <PageOpening
        eyebrow="FAQs"
        headingId="faqs-heading"
        title="Common questions."
        standfirst="Grouped by service. Answers are published once compliance has approved the wording."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: "FAQs" },
        ]}
      />
      {faqGroups.map((group, index) => (
        <section
          key={group.id}
          aria-labelledby={`faq-${group.id}`}
          className={`border-t border-line py-[var(--section-md)] ${index % 2 === 1 ? "bg-surface" : ""}`}
        >
          <Container>
            <DatumGrid>
              <Eyebrow>{group.title}</Eyebrow>
              <div className="max-w-[54rem]">
                <h2
                  id={`faq-${group.id}`}
                  className="max-w-[20ch] text-display-2 font-medium text-balance"
                >
                  {group.title}.
                </h2>
                <PendingContent
                  label={`faqs.${group.id} — approved answers required`}
                  className="mt-10"
                >
                  <Accordion
                    items={group.faqs.map((faq) => ({
                      question: faq.question,
                      answer: (
                        <>
                          <span>
                            {faq.answer ?? "[APPROVED COPY REQUIRED]"}
                          </span>
                          {faq.note && (
                            <span className="mt-3 block text-body-sm text-accent">
                              [COMPLIANCE REVIEW REQUIRED] {faq.note}
                            </span>
                          )}
                        </>
                      ),
                    }))}
                  />
                </PendingContent>
              </div>
            </DatumGrid>
          </Container>
        </section>
      ))}
    </>
  );
}
