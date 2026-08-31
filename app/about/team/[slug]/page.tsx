import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container, DatumGrid } from "@/components/ui/Container";
import { DrawingPlate } from "@/components/ui/DrawingPlate";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PendingContent } from "@/components/ui/PendingContent";
import { team } from "@/content/team";
import { site } from "@/content/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return team.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = team.find((entry) => entry.slug === slug);
  return member ? { title: member.name } : {};
}

/**
 * Adviser profile.
 *
 * A professional profile rather than a staff card: a large portrait and room
 * for a real biography. Nothing is written on the person's behalf — the name is
 * from the migration pack, and role, qualifications and biography are all
 * pending confirmation.
 */
export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = team.find((entry) => entry.slug === slug);
  if (!member) notFound();

  return (
    <>
      <section
        aria-labelledby="member-heading"
        className="bg-surface pt-[calc(var(--header-height)+var(--section-sm))] pb-[var(--section-md)]"
      >
        <Container>
          <div className="[&_a]:text-ink-tertiary [&_span]:text-ink">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Our team", href: "/about/our-team" },
                { label: member.name },
              ]}
            />
          </div>
          <DatumGrid className="mt-10">
            <Eyebrow>Adviser</Eyebrow>
            <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
              <div className="relative aspect-4/5 w-full">
                <DrawingPlate label={`${member.name} — portrait required`} tone="light" />
              </div>
              <div>
                <h1 id="member-heading" className="text-display-2 font-medium text-balance">
                  {member.name}
                </h1>
                <PendingContent
                  label="team.current — role, qualifications and biography require firm confirmation"
                  className="mt-8"
                >
                  <p className="text-body-lg text-ink-secondary">
                    Role [FIRM CONFIRMATION REQUIRED]
                  </p>
                  <p className="mt-3 text-body-lg text-ink-secondary">
                    Qualifications [FIRM CONFIRMATION REQUIRED]
                  </p>
                  <p className="mt-6 max-w-[56ch] text-body-lg text-ink-secondary">
                    [APPROVED COPY REQUIRED] — a biography written or approved by
                    the adviser. Nothing is written on their behalf.
                  </p>
                </PendingContent>
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-sm bg-ink px-7 py-4 text-body-sm font-medium text-ink-inverse transition-colors duration-base hover:bg-accent"
                  >
                    Speak to an adviser
                  </Link>
                  <a
                    href={site.phoneHref}
                    className="text-body-lg font-medium tabular text-ink underline decoration-line-interactive underline-offset-[6px] hover:decoration-accent"
                  >
                    {site.phone}
                  </a>
                </div>
              </div>
            </div>
          </DatumGrid>
        </Container>
      </section>
    </>
  );
}
