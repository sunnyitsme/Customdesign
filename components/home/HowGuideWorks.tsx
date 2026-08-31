import { Container } from "@/components/ui/Container";
import { PendingContent } from "@/components/ui/PendingContent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/content/process";

/**
 * How Guide works.
 *
 * A journey, not a table. One continuous rule runs behind the four stages with
 * a mark sitting on it at each step, so the eye travels left to right rather
 * than reading four separate columns. An earlier version used vertical dividers
 * and read as a spreadsheet.
 *
 * On mobile the same rule turns vertical and runs down the left, which keeps
 * the progression legible instead of becoming four stacked blocks.
 *
 * Deliberately NOT the existing six-phase page. The migration pack flags that
 * /gfs-how-we-work carries investment-planning language needing compliance
 * review, and it does not match Guide's four-pillar proposition. These steps
 * claim no timescale, service level or outcome, and still need approval.
 */
export function HowGuideWorks() {
  return (
    <section
      aria-labelledby="process-heading"
      className="border-t border-line bg-surface py-[var(--section-md)]"
    >
      <Container>
        <SectionHeading eyebrow="Process" id="process-heading">
          From first conversation to completion.
        </SectionHeading>

        <PendingContent
          label="process.copy — wording needs firm approval"
          className="mt-14"
        >
          <ol className="relative m-0 grid list-none grid-cols-1 gap-y-10 p-0 md:grid-cols-2 xl:grid-cols-4 xl:gap-x-10">
            {/* The path. Horizontal at xl, vertical below it. */}
            <span
              aria-hidden="true"
              className="absolute top-0 bottom-0 left-[7px] w-px bg-line xl:top-[7px] xl:right-0 xl:bottom-auto xl:left-0 xl:h-px xl:w-auto"
            />

            {processSteps.map((step) => (
              <li key={step.index} className="relative pl-10 xl:pt-10 xl:pl-0">
                {/* The mark that sits on the path. */}
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 left-0 block h-3.5 w-3.5 rounded-full border border-accent bg-surface xl:top-0 xl:left-0"
                />
                <span className="block text-eyebrow font-medium tabular text-accent uppercase">
                  {step.index}
                </span>
                <h3 className="mt-4 text-heading-2 font-medium tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[34ch] text-body text-ink-secondary">
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
