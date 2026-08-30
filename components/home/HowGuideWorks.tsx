import { Container } from "@/components/ui/Container";
import { PendingContent } from "@/components/ui/PendingContent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/content/process";

/**
 * How Guide works.
 *
 * A horizontal numbered sequence on a raised surface, which sets it apart from
 * the sections either side without another dark band. The numerals are
 * legitimate here in a way they are not in the divisions index: this genuinely
 * is an ordered process, and the order is information the reader needs.
 *
 * Deliberately NOT the existing six-phase page. The migration pack flags that
 * /gfs-how-we-work carries investment-planning language needing compliance
 * review, and it does not match Guide's four-pillar proposition. These four
 * steps claim no timescale, service level or outcome, and still need approval.
 */
export function HowGuideWorks() {
  return (
    <section
      aria-labelledby="process-heading"
      className="border-t border-line bg-surface py-[var(--section-md)]"
    >
      <Container>
        <SectionHeading eyebrow="How Guide works" id="process-heading">
          Four steps.
        </SectionHeading>

        <PendingContent
          label="process.copy — wording needs firm approval; the existing six-phase page is compliance-flagged"
          className="mt-[var(--section-sm)]"
        >
          <ol className="m-0 grid list-none grid-cols-1 gap-x-10 gap-y-10 p-0 border-t border-line md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step) => (
              <li
                key={step.index}
                className="border-line pt-8 xl:border-l xl:pl-8 xl:first:border-l-0 xl:first:pl-0"
              >
                <span className="text-eyebrow font-medium tabular text-accent uppercase">
                  {step.index}
                </span>
                <h3 className="mt-5 text-heading-2 font-medium tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-[38ch] font-prose text-body-lg text-ink-secondary">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </PendingContent>
      </Container>
    </section>
  );
}
