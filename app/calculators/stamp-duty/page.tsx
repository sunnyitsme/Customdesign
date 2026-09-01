import type { Metadata } from "next";
import Link from "next/link";
import { PageOpening } from "@/components/layout/SimplePage";
import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PendingContent } from "@/components/ui/PendingContent";

export const metadata: Metadata = { title: "Stamp duty calculator" };

export default function Page() {
  return (
    <>
      <PageOpening
        eyebrow="Calculator"
        headingId="calculator-heading"
        title="Stamp duty"
        standfirst="Land transaction tax differs across England, Scotland, Wales and Northern Ireland, and the rates change."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Calculators", href: "/calculators" },
          { label: "Stamp duty" },
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
                label="calculators.stampDuty — current rates and thresholds per UK nation require firm confirmation"
                className="mt-9"
              >
                <p className="max-w-[58ch] text-body-lg text-ink-secondary">
                  Stamp Duty Land Tax, Land and Buildings Transaction Tax and
                  Land Transaction Tax are separate taxes with separate rates,
                  thresholds and surcharges, and they change at fiscal events.
                  Publishing a figure from unverified rates would be worse than
                  publishing none, so this tool waits for confirmed rates and a
                  jurisdiction selector rather than guessing.
                </p>
              </PendingContent>
              <Link
                href="/contact"
                className="mt-10 inline-flex items-center justify-center rounded-sm bg-primary px-7 py-4 text-body-sm font-medium text-on-primary transition-colors duration-base hover:bg-ink"
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
