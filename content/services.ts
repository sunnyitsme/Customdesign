/**
 * The four core divisions.
 *
 * `scope` is derived from the documented content scope of the corresponding
 * pages in reference/current-guide-site/content-migration-inventory.md. It
 * describes what each division covers — it makes no claim about Guide's
 * experience, results, panel size or standing.
 *
 * `positioning` is approved marketing copy and does not exist yet, so it is
 * null and the component renders a labelled placeholder instead.
 */

export interface Division {
  readonly id: string;
  readonly index: string;
  readonly label: string;
  readonly href: string;
  /** Factual scope, derived from the migration pack. Safe to render. */
  readonly scope: string;
  /** Approved positioning line. Null until the firm supplies it. */
  readonly positioning: string | null;
  /** Placeholder image slot — see docs/01-content-and-assets-required.md §12. */
  readonly image: { readonly src: string | null; readonly alt: string };
}

export const divisions: readonly Division[] = [
  {
    id: "mortgages",
    index: "01",
    label: "Mortgages",
    href: "/mortgages",
    scope:
      "Residential mortgage advice covering purchases, remortgaging, buy-to-let, and lending for self-employed and higher-value cases.",
    positioning: null,
    image: {
      src: null,
      alt: "Placeholder — residential architecture photography required. See docs/01-content-and-assets-required.md §12.",
    },
  },
  {
    id: "property-finance",
    index: "02",
    label: "Property Finance",
    href: "/property-finance",
    scope:
      "Specialist funding for investors, landlords and developers: bridging, development finance, commercial and semi-commercial, portfolio and auction finance.",
    positioning: null,
    image: {
      src: null,
      alt: "Placeholder — commercial or development site photography required.",
    },
  },
  {
    id: "protection",
    index: "03",
    label: "Protection",
    href: "/protection",
    scope:
      "Personal and business cover including life assurance, income protection, critical illness, private medical, and key person and share protection.",
    positioning: null,
    image: {
      src: null,
      alt: "Placeholder — interior or client-meeting photography required.",
    },
  },
  {
    id: "wills-estate-planning",
    index: "04",
    label: "Wills & Estate Planning",
    href: "/wills-estate-planning",
    scope:
      "Will writing services covering standard wills, mirror wills, trust wills, and reviews as circumstances change.",
    positioning: null,
    image: {
      src: null,
      alt: "Placeholder — architectural or still-life photography required.",
    },
  },
];

/**
 * Hero content.
 *
 * No approved headline, supporting line or CTA wording exists. We do not write
 * positioning copy for a regulated firm without sign-off, so these are null and
 * render as labelled placeholders.
 * See docs/01-content-and-assets-required.md §2.
 */
export const hero = {
  headline: null as string | null,
  supporting: null as string | null,
  primaryCta: { label: "Speak to an adviser", href: "/contact" },
  secondaryCta: { label: "How we work", href: "/about/how-we-work" },
  media: {
    // Assets do not exist yet. The component renders a structural placeholder
    // and swaps to video the moment these files are added — no redesign needed.
    webm: "/media/home/hero/guide-london.webm",
    mp4: "/media/home/hero/guide-london.mp4",
    poster: "/media/home/hero/guide-london-poster.webp",
    alt: "London financial district",
  },
} as const;
