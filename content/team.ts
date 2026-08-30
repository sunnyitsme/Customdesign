/**
 * Advisers and leadership.
 *
 * SOURCE: /our_team in the migration pack, which profiles four people with
 * qualifications, role, bio, phone and profile links.
 *
 * TWO CAVEATS, BOTH MATERIAL:
 *
 * 1. That page is publicly reachable but has been REMOVED FROM THE MAIN
 *    NAVIGATION, which often means it is stale. The names below are reproduced
 *    from the pack, but the firm must confirm the team is current before this
 *    section is published.
 * 2. The pack records that roles and qualifications exist on that page but does
 *    NOT record their values. They are therefore null here. A qualification we
 *    cannot evidence will not be printed next to a person's name.
 */

export interface TeamMember {
  readonly id: string;
  /** From the migration pack. Pending confirmation the team is current. */
  readonly name: string;
  /** Approved role. Null — the pack records that one exists, not what it says. */
  readonly role: string | null;
  /** Verified qualifications. Null for the same reason. */
  readonly qualifications: string | null;
  readonly portrait: { readonly src: string | null; readonly alt: string };
}

const portraitPlaceholder = (name: string) => ({
  src: null,
  alt: `Placeholder — portrait photography required for ${name}.`,
});

export const team: readonly TeamMember[] = [
  {
    id: "jiwan-singh-dhanik",
    name: "Jiwan Singh Dhanik",
    role: null,
    qualifications: null,
    portrait: portraitPlaceholder("Jiwan Singh Dhanik"),
  },
  {
    id: "pravin-singh",
    name: "Pravin Singh",
    role: null,
    qualifications: null,
    portrait: portraitPlaceholder("Pravin Singh"),
  },
  {
    id: "rajesh-dsa",
    name: "Rajesh D'sa",
    role: null,
    qualifications: null,
    portrait: portraitPlaceholder("Rajesh D'sa"),
  },
  {
    id: "prasanna-shetty",
    name: "Prasanna Shetty",
    role: null,
    qualifications: null,
    portrait: portraitPlaceholder("Prasanna Shetty"),
  },
];
