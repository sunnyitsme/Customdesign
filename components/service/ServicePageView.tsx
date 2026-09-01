import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeroMedia } from "@/components/ui/HeroMedia";
import { PendingContent } from "@/components/ui/PendingContent";
import { serviceHeroImage } from "@/content/media";
import { pageByHref, type ServicePage } from "@/content/service-pages";
import { site } from "@/content/site";

/**
 * The service page family.
 *
 * One renderer, five compositions, chosen by the page's declared `variant`.
 * The differences are real rather than cosmetic — an educational guide leads
 * with prose and no audience block, a commercial page runs a dark hero and a
 * scenarios band, a private-client page keeps a narrow measure and more air.
 * Blocks are omitted when the data has nothing to put in them, so no page
 * carries an empty section.
 */

const heroTone = (variant: ServicePage["variant"]) =>
  variant === "commercial" || variant === "privateClient" ? "deep" : "ground";

function ServiceHero({
  page,
  crumbs,
}: {
  page: ServicePage;
  crumbs: readonly Crumb[];
}) {
  const dark = heroTone(page.variant) === "deep";
  return (
    <section
      aria-labelledby="service-heading"
      className={
        dark
          ? "on-deep relative bg-deep pt-[calc(var(--header-height)+var(--section-sm))] pb-[var(--section-md)] text-ink-inverse"
          : "relative bg-surface pt-[calc(var(--header-height)+var(--section-sm))] pb-[var(--section-md)]"
      }
    >
      <Container>
        <div
          className={dark ? "" : "[&_a]:text-ink-tertiary [&_span]:text-ink"}
        >
          <Breadcrumbs items={crumbs} />
        </div>

        <DatumGrid className="mt-10">
          <Eyebrow tone={dark ? "dark" : "light"}>
            {page.variant === "educational" ? "Guide" : "Service"}
          </Eyebrow>
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
            <div>
              <h1
                id="service-heading"
                className="max-w-[18ch] text-display-1 font-medium text-balance"
              >
                {page.title}
              </h1>
              <p
                className={`mt-8 max-w-[54ch] text-body-lg ${
                  dark ? "text-ink-inverse-secondary" : "text-ink-secondary"
                }`}
              >
                {page.scope}
              </p>
              {page.intro === null ? (
                <PendingContent
                  tone={dark ? "dark" : "light"}
                  label="Approved introduction required"
                  className="mt-7"
                >
                  <p
                    className={`max-w-[54ch] text-body ${
                      dark ? "text-ink-inverse-secondary" : "text-ink-tertiary"
                    }`}
                  >
                    [APPROVED COPY REQUIRED] — a short introduction from the
                    firm, written for this service.
                  </p>
                </PendingContent>
              ) : (
                <p
                  className={`mt-7 max-w-[54ch] text-body-lg ${
                    dark ? "text-ink-inverse-secondary" : "text-ink-secondary"
                  }`}
                >
                  {page.intro}
                </p>
              )}
            </div>

            {page.variant !== "educational" && (
              <div className="relative aspect-4/3 w-full lg:aspect-4/5">
                <HeroMedia
                  image={serviceHeroImage(page)}
                  tone={dark ? "dark" : "light"}
                  priority
                  sizes="(min-width: 1024px) 38vw, 100vw"
                />
              </div>
            )}
          </div>
        </DatumGrid>
      </Container>
    </section>
  );
}

function ComplianceNotice({ flags }: { flags: readonly string[] }) {
  return (
    <section
      aria-label="Compliance review"
      className="border-t border-line bg-surface"
    >
      <Container className="py-8">
        <DatumGrid>
          <Eyebrow>Review</Eyebrow>
          <div>
            <p className="text-body-sm font-medium text-accent">
              [COMPLIANCE REVIEW REQUIRED] before this page is published
            </p>
            <ul className="m-0 mt-3 flex list-none flex-col gap-1.5 p-0">
              {flags.map((flag) => (
                <li
                  key={flag}
                  className="max-w-[76ch] text-body-sm text-ink-secondary"
                >
                  {flag}
                </li>
              ))}
            </ul>
          </div>
        </DatumGrid>
      </Container>
    </section>
  );
}

export function ServicePageView({
  page,
  crumbs,
}: {
  page: ServicePage;
  crumbs: readonly Crumb[];
}) {
  const related = page.related
    .map((href) => ({ href, page: pageByHref(href) }))
    .filter(
      (entry) =>
        entry.page !== undefined || entry.href.startsWith("/calculators"),
    );

  const hasAudience = page.audience.length > 0;
  const hasFaqs = page.faqs.length > 0;

  return (
    <>
      <ServiceHero page={page} crumbs={crumbs} />

      {page.complianceFlags && page.complianceFlags.length > 0 && (
        <ComplianceNotice flags={page.complianceFlags} />
      )}

      {/* Who it is for — omitted on educational guides, which address a topic
          rather than a circumstance. */}
      {hasAudience && (
        <section
          aria-labelledby="audience-heading"
          className="border-t border-line py-[var(--section-md)]"
        >
          <Container>
            <DatumGrid>
              <Eyebrow>Who it is for</Eyebrow>
              <div>
                <h2
                  id="audience-heading"
                  className="max-w-[20ch] text-display-2 font-medium text-balance"
                >
                  {page.variant === "commercial"
                    ? "Situations we are asked about."
                    : "You might be here because"}
                </h2>
                <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-px border-t border-line bg-line p-0 md:grid-cols-3">
                  {page.audience.map((item: string) => (
                    <li
                      key={item}
                      className="bg-ground py-7 md:px-6 md:first:pl-0"
                    >
                      <p className="max-w-[34ch] text-body-lg text-ink-secondary">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </DatumGrid>
          </Container>
        </section>
      )}

      {/* What to know. On educational pages this is the main body. */}
      {page.considerations.length > 0 && (
        <section
          aria-labelledby="considerations-heading"
          className={`border-t border-line py-[var(--section-md)] ${
            page.variant === "educational" ? "" : "bg-surface"
          }`}
        >
          <Container>
            <DatumGrid>
              <Eyebrow>
                {page.variant === "educational"
                  ? "How it works"
                  : "What to know"}
              </Eyebrow>
              <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
                <div>
                  <h2
                    id="considerations-heading"
                    className="max-w-[22ch] text-display-2 font-medium text-balance"
                  >
                    {page.variant === "educational"
                      ? "The essentials."
                      : "Worth understanding first."}
                  </h2>
                  <ol className="relative m-0 mt-10 flex list-none flex-col gap-7 p-0">
                    {page.considerations.map((item: string, index: number) => (
                      <li
                        key={item}
                        className="grid grid-cols-[2rem_minmax(0,1fr)] gap-4"
                      >
                        <span
                          aria-hidden="true"
                          className="pt-1 text-eyebrow font-medium tabular text-accent"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="max-w-[56ch] text-body-lg text-ink-secondary">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>

                {page.variant !== "educational" && (
                  <aside className="border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                    <p className="text-eyebrow font-medium tracking-[0.16em] text-ink-tertiary uppercase">
                      Speak to someone
                    </p>
                    <p className="mt-4 max-w-[30ch] text-body text-ink-secondary">
                      Advice on this is a conversation, not a form. Talk it
                      through with an adviser first.
                    </p>
                    <Link
                      href="/contact"
                      className="mt-6 inline-flex items-center justify-center rounded-sm bg-primary px-6 py-3.5 text-body-sm font-medium text-on-primary transition-colors duration-base hover:bg-ink"
                    >
                      {page.ctaLabel ?? "Speak to an adviser"}
                    </Link>
                    <a
                      href={site.phoneHref}
                      className="mt-4 block text-body-sm font-medium tabular text-ink underline decoration-line-interactive underline-offset-4 transition-colors duration-base hover:decoration-accent"
                    >
                      {site.phone}
                    </a>
                  </aside>
                )}
              </div>
            </DatumGrid>
          </Container>
        </section>
      )}

      {hasFaqs && (
        <section
          aria-labelledby="faq-heading"
          className="border-t border-line py-[var(--section-md)]"
        >
          <Container>
            <DatumGrid>
              <Eyebrow>Questions</Eyebrow>
              <div className="max-w-[54rem]">
                <h2
                  id="faq-heading"
                  className="max-w-[20ch] text-display-2 font-medium text-balance"
                >
                  Common questions.
                </h2>
                <PendingContent
                  label="FAQ answers require firm approval"
                  className="mt-10"
                >
                  <Accordion
                    items={page.faqs.map(
                      (faq: { question: string; answer: string | null }) => ({
                        question: faq.question,
                        answer: faq.answer ?? "[APPROVED COPY REQUIRED]",
                      }),
                    )}
                  />
                </PendingContent>
              </div>
            </DatumGrid>
          </Container>
        </section>
      )}

      {related.length > 0 && (
        <section
          aria-labelledby="related-heading"
          className="border-t border-line bg-surface py-[var(--section-md)]"
        >
          <Container>
            <DatumGrid>
              <Eyebrow>Related</Eyebrow>
              <div>
                <h2
                  id="related-heading"
                  className="max-w-[24ch] text-heading-1 font-medium text-balance"
                >
                  Often considered alongside this.
                </h2>
                <ul className="m-0 mt-9 grid list-none grid-cols-1 gap-px border-t border-line bg-line p-0 md:grid-cols-3">
                  {related.map(
                    ({
                      href,
                      page: target,
                    }: {
                      href: string;
                      page: ServicePage | undefined;
                    }) => (
                      <li key={href} className="bg-surface">
                        <Link
                          href={href}
                          className="group block py-7 md:px-6 md:first:pl-0"
                        >
                          <span className="block text-heading-3 font-medium text-ink transition-colors duration-base group-hover:text-accent">
                            {target?.navLabel ?? "Calculators"}
                          </span>
                          <span className="mt-2 block max-w-[32ch] text-body-sm text-ink-secondary">
                            {target?.scope.slice(0, 96) ??
                              "Work through the numbers."}
                            {target && target.scope.length > 96 ? "…" : ""}
                          </span>
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </DatumGrid>
          </Container>
        </section>
      )}

      <section
        aria-labelledby="service-cta-heading"
        className="on-deep bg-deep py-[var(--section-md)] text-ink-inverse"
      >
        <Container>
          <DatumGrid>
            <Eyebrow tone="dark">Next step</Eyebrow>
            <div>
              <h2
                id="service-cta-heading"
                className="max-w-[18ch] text-display-2 font-medium text-balance"
              >
                {page.ctaLabel ?? "Speak to an adviser"}.
              </h2>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-sm bg-ink-inverse px-7 py-4 text-body-sm font-medium text-ink transition-colors duration-base hover:bg-accent-bright"
                >
                  Start a conversation
                </Link>
                <a
                  href={site.phoneHref}
                  className="text-body-lg font-medium tabular text-ink-inverse underline decoration-line-inverse-interactive underline-offset-[6px] transition-colors duration-base hover:decoration-accent-bright"
                >
                  {site.phone}
                </a>
              </div>
            </div>
          </DatumGrid>
        </Container>
      </section>
    </>
  );
}
