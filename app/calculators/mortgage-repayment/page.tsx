import type { Metadata } from "next";
import { PageOpening } from "@/components/layout/SimplePage";
import { RepaymentCalculator } from "@/components/calculators/RepaymentCalculator";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Mortgage repayment calculator" };

export default function Page() {
  return (
    <>
      <PageOpening
        eyebrow="Calculator"
        headingId="calculator-heading"
        title="Mortgage repayment"
        standfirst="What a mortgage would cost each month, and what it adds up to over the term."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Calculators", href: "/calculators" },
          { label: "Mortgage repayment" },
        ]}
      />
      <section
        aria-labelledby="calculator-tool-heading"
        className="py-[var(--section-md)]"
      >
        <Container>
          <h2 id="calculator-tool-heading" className="sr-only">
            Mortgage repayment calculator
          </h2>
          <RepaymentCalculator mode="repayment" />
        </Container>
      </section>
    </>
  );
}
