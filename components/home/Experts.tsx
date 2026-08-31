import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DrawingPlate } from "@/components/ui/DrawingPlate";
import { PendingContent } from "@/components/ui/PendingContent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { team } from "@/content/team";

/**
 * Advisers.
 *
 * Tall 4:5 portraits in an offset arrangement — alternate columns drop, so the
 * row reads as an editorial spread rather than a grid of employee tiles. No
 * circular crops, no avatars, no cards.
 *
 * Roles and qualifications render as [FIRM CONFIRMATION REQUIRED] rather than
 * being guessed: the migration pack records that the team page carries them but
 * not what they say, and a qualification we cannot evidence will not be printed
 * beside a person's name.
 */
export function Experts() {
  return (
    <section
      aria-labelledby="experts-heading"
      className="border-t border-line py-[var(--section-md)]"
    >
      <Container>
        {/* No supporting line here on purpose. An earlier draft asserted that a
            named adviser stays with each case — a service-model claim nothing in
            the migration pack supports. Removed rather than marked, since the
            heading carries the section without it. */}
        <SectionHeading eyebrow="Our experts" id="experts-heading">
          Meet the advisers.
        </SectionHeading>

        <PendingContent
          label="team.current — /our_team is unlinked from navigation; confirm the team is current, and supply roles, qualifications and portraits"
          className="mt-12"
        >
          <ul className="m-0 grid list-none grid-cols-1 gap-x-8 gap-y-14 p-0 sm:grid-cols-2 xl:grid-cols-4">
            {team.map((member, index) => (
              <li
                key={member.id}
                className={index % 2 === 1 ? "xl:mt-12" : undefined}
              >
                <div className="relative aspect-4/5 w-full">
                  <DrawingPlate
                    label={`${member.name} — portrait required`}
                    tone="light"
                  />
                </div>
                <h3 className="mt-6 text-heading-2 font-medium tracking-tight text-balance">
                  {member.name}
                </h3>
                {member.role ? (
                  <p className="mt-2 text-body-sm text-ink-secondary">
                    {member.role}
                  </p>
                ) : null}
                {member.qualifications ? (
                  <p className="mt-1 text-body-sm text-ink-tertiary">
                    {member.qualifications}
                  </p>
                ) : null}
                {member.role === null && member.qualifications === null ? (
                  <p className="mt-2 text-body-sm text-accent">
                    Role and qualifications [FIRM CONFIRMATION REQUIRED]
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </PendingContent>

        <Link
          href="/about/our-team"
          className="mt-16 inline-block border-b border-line-interactive pb-1 text-body-sm font-medium text-ink transition-colors duration-base hover:border-accent hover:text-accent"
        >
          Meet our team
        </Link>
      </Container>
    </section>
  );
}
