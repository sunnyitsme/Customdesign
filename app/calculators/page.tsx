import type { Metadata } from "next";
import Link from "next/link";
import { PageOpening } from "@/components/layout/SimplePage";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Calculators" };

const calculators = [
  {
    href: "/calculators/mortgage-repayment",
    label: "Mortgage repayment",
    body: "Monthly payment, total interest and total repaid.",
    live: true,
  },
  {
    href: "/calculators/overpayment",
    label: "Overpayment",
    body: "What a regular overpayment does to the term and the interest.",
    live: true,
  },
  {
    href: "/calculators/stamp-duty",
    label: "Stamp duty",
    body: "Land transaction tax varies by UK nation.",
    live: false,
  },
  {
    href: "/calculators/mortgage-borrowing",
    label: "Mortgage borrowing",
    body: "How much a lender might lend.",
    live: false,
  },
  {
    href: "/calculators/affordability",
    label: "Affordability",
    body: "What a lender assesses beyond income.",
    live: false,
  },
];

/**
 * Calculators hub.
 *
 * Two work today because their arithmetic is standard and carries no lender
 * policy. Three are deliberately not computing: stamp duty rates differ by UK
 * nation and change, and borrowing and affordability are lender underwriting.
 * A plausible-looking number in any of those three would be worse than none.
 */
export default function CalculatorsPage() {
  return (
    <>
      <PageOpening
        eyebrow="Calculators"
        headingId="calculators-heading"
        title="Work through the numbers."
        standfirst="Illustrations to help you think, not lending decisions. What a lender will actually offer depends on its own criteria."
        crumbs={[{ label: "Home", href: "/" }, { label: "Calculators" }]}
      />
      <section
        aria-labelledby="calculators-list-heading"
        className="py-[var(--section-md)]"
      >
        <Container>
          <h2 id="calculators-list-heading" className="sr-only">
            Available calculators
          </h2>
          <ul className="m-0 list-none border-t border-line p-0">
            {calculators.map((calculator) => (
              <li key={calculator.href} className="border-b border-line">
                <Link href={calculator.href} className="group block py-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                    <h3 className="text-heading-1 font-medium tracking-tight transition-colors duration-base group-hover:text-accent">
                      {calculator.label}
                    </h3>
                    {!calculator.live && (
                      <span className="text-body-sm text-accent">
                        [FIRM CONFIRMATION REQUIRED]
                      </span>
                    )}
                  </div>
                  <p className="mt-3 max-w-[54ch] text-body-lg text-ink-secondary">
                    {calculator.body}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
