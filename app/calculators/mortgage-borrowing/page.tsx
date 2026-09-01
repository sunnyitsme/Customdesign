import type { Metadata } from "next";
import Link from "next/link";
import { PageOpening } from "@/components/layout/SimplePage";
import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PendingContent } from "@/components/ui/PendingContent";

export const metadata: Metadata = { title: "Mortgage borrowing calculator" };

export default function Page() {
  return (
    <>
      <PageOpening
        eyebrow="Calculator"
        headingId="calculator-heading"
        title="Mortgage borrowing"
        standfirst="How much a lender might lend depends on that lender's own criteria."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Calculators", href: "/calculators" },
          { label: "Mortgage borrowing" },
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
                label="calculators.borrowing — no lender model may be published without firm confirmation"
                className="mt-9"
              >
                <p className="max-w-[58ch] text-body-lg text-ink-secondary">
                  A borrowing figure is a lending decision in all but name.
                  Lenders differ in how they treat income, bonus, dividends,
                  commitments and stress rates, and those rules change. This
                  page will not reproduce a generic income multiple and present
                  it as what you can borrow.
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
