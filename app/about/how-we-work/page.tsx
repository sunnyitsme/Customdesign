import type { Metadata } from "next";
import { PageOpening } from "@/components/layout/SimplePage";
import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PendingContent } from "@/components/ui/PendingContent";
import { processSteps } from "@/content/process";

export const metadata: Metadata = { title: "How we work" };

export default function Page() {
  return (
    <>
      <PageOpening
        eyebrow="About"
        headingId="page-heading"
        title="How we work"
        standfirst="The steps a case goes through, from first conversation to completion."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "How we work" },
        ]}
      />
      <section aria-labelledby="page-body-heading" className="py-[var(--section-md)]">
        <Container>
          <DatumGrid>
            <Eyebrow>Detail</Eyebrow>
            <div>
              <h2 id="page-body-heading" className="max-w-[22ch] text-display-2 font-medium text-balance">
                How we work.
              </h2>
              <PendingContent label="process.copy — approved wording required" className="mt-9">
                <ol className="m-0 flex list-none flex-col gap-8 border-t border-line p-0 pt-9">
                  {processSteps.map((step) => (
                    <li key={step.index} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4">
                      <span className="text-eyebrow font-medium tabular text-accent uppercase">
                        {step.index}
                      </span>
                      <div>
                        <h3 className="text-heading-2 font-medium tracking-tight">{step.title}</h3>
                        <p className="mt-3 max-w-[54ch] text-body-lg text-ink-secondary">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </PendingContent>
            </div>
          </DatumGrid>
        </Container>
      </section>
    </>
  );
}
