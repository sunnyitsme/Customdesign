import type { Metadata } from "next";
import { HubHero } from "@/components/hub/HubHero";
import { ServiceIndex } from "@/components/hub/ServiceIndex";
import { Container, DatumGrid } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PendingContent } from "@/components/ui/PendingContent";
import { plannedWillsRoutes, willsPages } from "@/content/service-pages";

export const metadata: Metadata = {
  title: "Wills & estate planning",
  description:
    "Will writing covering standard wills, mirror wills, trust wills, and reviews as circumstances change.",
};

/**
 * Wills & Estate Planning hub.
 *
 * Private-client register: quieter, more air, a narrower measure than the
 * commercial hubs. It avoids law-firm styling and avoids the opposite failure
 * of sounding casual about something serious.
 *
 * Nothing here asserts an inheritance tax, trust or care-fee outcome. The
 * planned LPA, trusts and estate-planning routes are named as forthcoming
 * rather than built, because no approved source material exists for them.
 */
export default function WillsPage() {
  return (
    <>
      <HubHero
        eyebrow="Wills & estate planning"
        headingId="wills-heading"
        title="Setting out what should happen, while it is straightforward to do."
        standfirst="Wills, mirror wills, trust wills and reviews. Written around your circumstances, and revisited when those change."
        ctaLabel="Speak to our estate planning team"
        imageAlt="Image required — considered family or domestic still life"
      />

      <ServiceIndex
        pages={willsPages}
        eyebrow="Services"
        heading="What we prepare."
        headingId="wills-services-heading"
      />

      {/* Four-stage process, documented on the legacy page. Wording still needs
          approval, so it sits inside the gate. */}
      <section
        aria-labelledby="wills-process-heading"
        className="border-t border-line bg-surface py-[var(--section-md)]"
      >
        <Container>
          <DatumGrid>
            <Eyebrow>Process</Eyebrow>
            <h2
              id="wills-process-heading"
              className="max-w-[22ch] text-display-2 font-medium text-balance"
            >
              How a will is put together.
            </h2>
          </DatumGrid>
          <PendingContent
            label="wills.process — approved wording required"
            className="mt-12"
          >
            <ol className="m-0 grid list-none grid-cols-1 gap-x-12 gap-y-9 border-t border-line p-0 pt-10 md:grid-cols-2 xl:grid-cols-4">
              {[
                [
                  "Discuss",
                  "A conversation about your circumstances, your family and what you want to happen.",
                ],
                [
                  "Draft",
                  "A draft prepared to reflect those wishes, for you to read at your own pace.",
                ],
                [
                  "Review",
                  "Any changes made, and the document explained clearly before anything is signed.",
                ],
                [
                  "Store",
                  "Signing and witnessing arranged, and the will kept somewhere it can be found.",
                ],
              ].map(([title, body], index) => (
                <li key={title}>
                  <span className="block text-eyebrow font-medium tabular text-accent uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-heading-2 font-medium tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-3 max-w-[34ch] text-body text-ink-secondary">
                    {body}
                  </p>
                </li>
              ))}
            </ol>
          </PendingContent>
        </Container>
      </section>

      {/* Planned but unbuilt — declared, not fabricated. */}
      <section
        aria-labelledby="wills-planned-heading"
        className="border-t border-line py-[var(--section-md)]"
      >
        <Container>
          <DatumGrid>
            <Eyebrow>In preparation</Eyebrow>
            <div>
              <h2
                id="wills-planned-heading"
                className="max-w-[24ch] text-heading-1 font-medium text-balance"
              >
                Further estate planning services.
              </h2>
              <p className="mt-6 max-w-[54ch] text-body-lg text-ink-secondary">
                These are planned. They are not published because no approved
                source material exists for them yet, and legal content will not
                be drafted here.
              </p>
              <ul className="m-0 mt-9 flex list-none flex-col gap-px border-t border-line bg-line p-0">
                {plannedWillsRoutes.map((route) => (
                  <li
                    key={route.slug}
                    className="flex flex-wrap items-center justify-between gap-3 bg-ground py-5"
                  >
                    <span className="text-heading-3 font-medium text-ink-tertiary">
                      {route.label}
                    </span>
                    <span className="text-body-sm text-accent">
                      [APPROVED COPY REQUIRED]
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </DatumGrid>
        </Container>
      </section>
    </>
  );
}
