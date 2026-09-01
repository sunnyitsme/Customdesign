import type { Metadata } from "next";
import Link from "next/link";
import { PageOpening } from "@/components/layout/SimplePage";
import { Container } from "@/components/ui/Container";
import { DrawingPlate } from "@/components/ui/DrawingPlate";
import { PendingContent } from "@/components/ui/PendingContent";
import { requireHeroImage } from "@/content/media";
import { team } from "@/content/team";

export const metadata: Metadata = { title: "Our team" };

export default function OurTeamPage() {
  return (
    <>
      <PageOpening
        eyebrow="Our team"
        headingId="team-heading"
        title="The advisers you will work with."
        standfirst="Profiles are published once the firm has confirmed each adviser's current role and qualifications."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Our team" },
        ]}
        image={requireHeroImage("/about/our-team")}
      />
      <section
        aria-labelledby="team-list-heading"
        className="py-[var(--section-md)]"
      >
        <Container>
          <h2 id="team-list-heading" className="sr-only">
            Advisers
          </h2>
          <PendingContent label="team.current — confirm the team is current; roles, qualifications and portraits required">
            <ul className="m-0 grid list-none grid-cols-1 gap-x-10 gap-y-14 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <li key={member.id}>
                  <Link
                    href={`/about/team/${member.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-4/5 w-full">
                      <DrawingPlate
                        label={`${member.name} — portrait required`}
                        tone="light"
                      />
                    </div>
                    <h3 className="mt-6 text-heading-1 font-medium tracking-tight transition-colors duration-base group-hover:text-accent">
                      {member.name}
                    </h3>
                    <p className="mt-2 text-body-sm text-accent">
                      Role and qualifications [FIRM CONFIRMATION REQUIRED]
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </PendingContent>
        </Container>
      </section>
    </>
  );
}
