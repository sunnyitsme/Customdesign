import type { Metadata } from "next";
import { PageOpening } from "@/components/layout/SimplePage";
import { RepaymentCalculator } from "@/components/calculators/RepaymentCalculator";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Overpayment calculator" };

export default function Page() {
  return (
    <>
      <PageOpening
        eyebrow="Calculator"
        headingId="calculator-heading"
        title="Overpayment"
        standfirst="What paying a little extra each month does to the term and the total interest."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Calculators", href: "/calculators" },
          { label: "Overpayment" },
        ]}
      />
      <section
        aria-labelledby="calculator-tool-heading"
        className="py-[var(--section-md)]"
      >
        <Container>
          <h2 id="calculator-tool-heading" className="sr-only">
            Overpayment calculator
          </h2>
          <RepaymentCalculator mode="overpayment" />
        </Container>
      </section>
    </>
  );
}
