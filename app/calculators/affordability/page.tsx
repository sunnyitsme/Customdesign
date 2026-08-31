import type { Metadata } from "next";
import Link from "next/link";
import { PageOpening } from "@/components/layout/SimplePage";
import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PendingContent } from "@/components/ui/PendingContent";

export const metadata: Metadata = { title: "Affordability calculator" };

export default function Page() {
  return (
    <>
      <PageOpening
        eyebrow="Calculator"
        headingId="calculator-heading"
        title="Affordability"
        standfirst="What a lender assesses goes well beyond income."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Calculators", href: "/calculators" },
          { label: "Affordability" },
        ]}
      />
      <section
        aria-labelledby="calculator-pending-heading"
        className="py-[var(--section-md)]"
      >
        <Container>
          <DatumGrid>
            <Eyebrow>Not yet live</Eyebrow>
            <div>
              <h2
                id="calculator-pending-heading"
                className="max-w-[24ch] text-display-2 font-medium text-balance"
              >
                Why this one is not calculating yet.
              </h2>
              <PendingContent
                label="calculators.affordability — no affordability model may be published without firm confirmation"
                className="mt-9"
              >
                <p className="max-w-[58ch] text-body-lg text-ink-secondary">
                  Affordability assessment covers committed expenditure,
                  dependants, credit commitments and a stress test against
                  higher rates, applied differently by every lender. A
                  simplified model would give a confident answer that no lender
                  would stand behind.
                </p>
              </PendingContent>
              <Link
                href="/contact"
                className="mt-10 inline-flex items-center justify-center rounded-sm bg-ink px-7 py-4 text-body-sm font-medium text-ink-inverse transition-colors duration-base hover:bg-accent"
              >
                Ask an adviser instead
              </Link>
            </div>
          </DatumGrid>
        </Container>
      </section>
    </>
  );
}
