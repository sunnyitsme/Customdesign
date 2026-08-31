import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageOpening } from "@/components/layout/SimplePage";
import { Container, DatumGrid } from "@/components/ui/Container";
import { DrawingPlate } from "@/components/ui/DrawingPlate";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PendingContent } from "@/components/ui/PendingContent";
import { cases } from "@/content/cases";

export const dynamicParams = false;
export function generateStaticParams() {
  return cases.map((entry) => ({ slug: entry.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = cases.find((c) => c.id === slug);
  return entry ? { title: `${entry.discipline} case study` } : {};
}

/**
 * Case study detail.
 *
 * The structure the firm asked for — situation, challenge, solution, outcome,
 * facility, property type, location, adviser — is laid out as real fields so a
 * real case drops straight in. Every one of them is a placeholder: publishing
 * past outcomes needs compliance approval first.
 */
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = cases.find((c) => c.id === slug);
  if (!entry) notFound();

  const fields = [
    ["Client situation", "[APPROVED CASE STUDY REQUIRED]"],
    ["Challenge", "[APPROVED CASE STUDY REQUIRED]"],
    ["Solution", "[APPROVED CASE STUDY REQUIRED]"],
    ["Outcome", "[APPROVED CASE STUDY REQUIRED]"],
    ["Finance arranged", "[VERIFIED FIGURE REQUIRED]"],
    ["Property type", "[FIRM CONFIRMATION REQUIRED]"],
    ["Location", "[FIRM CONFIRMATION REQUIRED]"],
    ["Adviser", "[FIRM CONFIRMATION REQUIRED]"],
  ] as const;

  return (
    <>
      <PageOpening
        eyebrow={entry.discipline}
        headingId="case-heading"
        title="Case study"
        standfirst="This page is structured and ready. Its content is published once the firm supplies an approved, anonymised case."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: "Case studies", href: "/insights/case-studies" },
          { label: entry.discipline },
        ]}
      />
      <section
        aria-labelledby="case-detail-heading"
        className="py-[var(--section-md)]"
      >
        <Container>
          <DatumGrid>
            <Eyebrow>Detail</Eyebrow>
            <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
              <div>
                <h2 id="case-detail-heading" className="sr-only">
                  Case detail
                </h2>
                <PendingContent label="cases.approved — compliance sign-off required before publication">
                  <dl className="m-0 border-t border-line">
                    {fields.map(([label, value]) => (
                      <div
                        key={label}
                        className="grid gap-1 border-b border-line py-5 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-6"
                      >
                        <dt className="text-body-sm font-medium text-ink">
                          {label}
                        </dt>
                        <dd className="m-0 text-body-sm text-accent">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </PendingContent>
              </div>
              <div className="relative aspect-4/5 w-full">
                <DrawingPlate label={entry.image.alt} tone="light" />
              </div>
            </div>
          </DatumGrid>
        </Container>
      </section>
    </>
  );
}
