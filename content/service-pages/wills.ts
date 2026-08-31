import type { ServicePage } from "./types";

/**
 * Wills and estate planning.
 *
 * The migration pack documents a single legacy page covering Standard Wills,
 * Mirror Wills, Trust Wills, and Will Updates & Reviews, plus a four-stage
 * process and basic FAQs. Those four become pages; nothing else is invented.
 *
 * This is the area where overclaiming is easiest and most damaging. No page
 * asserts an inheritance tax outcome, a trust benefit, a care-fee result or any
 * legal guarantee, and the footer already carries a statement that wills and
 * estate planning are not regulated by the FCA.
 */
export const willsPages: readonly ServicePage[] = [
  {
    slug: "wills",
    parent: "wills-estate-planning",
    title: "Standard wills",
    navLabel: "Standard wills",
    variant: "privateClient",
    scope:
      "A will setting out who should inherit, who should act as executor, and who should care for any children.",
    intro: null,
    audience: [
      "Anyone without a will",
      "Anyone whose circumstances have changed since writing one",
      "Parents wanting to name guardians",
    ],
    considerations: [
      "Without a will, the intestacy rules decide who inherits.",
      "Executors carry real responsibilities and should be asked first.",
      "Marriage, divorce and children can all affect an existing will.",
    ],
    faqs: [
      { question: "What happens if I die without a will?", answer: null },
      { question: "Who should I appoint as executor?", answer: null },
    ],
    related: ["/wills-estate-planning/mirror-wills", "/wills-estate-planning/trust-wills", "/wills-estate-planning/will-reviews"],
    legacyUrls: ["/gfs-wills-writing"],
    complianceFlags: [
      "Intestacy rules differ across UK jurisdictions — wording must state which applies",
      "Wills and estate planning are not regulated by the FCA",
    ],
    imageAlt: "Image required — considered domestic or family context",
    ctaLabel: "Speak to our estate planning team",
  },
  {
    slug: "mirror-wills",
    parent: "wills-estate-planning",
    title: "Mirror wills",
    navLabel: "Mirror wills",
    variant: "privateClient",
    scope:
      "Two substantially matching wills, usually made by a couple, each leaving their estate on similar terms.",
    intro: null,
    audience: ["Married couples and civil partners", "Unmarried couples planning together"],
    considerations: [
      "Mirror wills are two separate documents, not one joint one.",
      "Either person can change their own will later.",
      "They are often considered where a couple's wishes align.",
    ],
    faqs: [{ question: "Can one of us change a mirror will later?", answer: null }],
    related: ["/wills-estate-planning/wills", "/wills-estate-planning/trust-wills", "/protection/life-assurance"],
    legacyUrls: ["/gfs-wills-writing"],
    complianceFlags: ["Wills and estate planning are not regulated by the FCA"],
    imageAlt: "Image required — considered domestic context",
    ctaLabel: "Speak to our estate planning team",
  },
  {
    slug: "trust-wills",
    parent: "wills-estate-planning",
    title: "Trust wills",
    navLabel: "Trust wills",
    variant: "privateClient",
    scope:
      "A will that creates a trust on death, so that assets pass under terms rather than outright.",
    intro: null,
    audience: [
      "Families with children from more than one relationship",
      "Anyone wanting assets held on terms rather than passed outright",
      "Those providing for a beneficiary who cannot manage assets directly",
    ],
    considerations: [
      "A trust adds structure, and with it ongoing responsibilities for trustees.",
      "Trusts are not suitable in every circumstance.",
      "Trustees should be chosen carefully and asked in advance.",
    ],
    faqs: [
      { question: "When is a trust appropriate?", answer: null },
      { question: "What do trustees actually do?", answer: null },
    ],
    related: ["/wills-estate-planning/wills", "/wills-estate-planning/will-reviews", "/protection/life-assurance"],
    legacyUrls: ["/gfs-wills-writing"],
    complianceFlags: [
      "Trusts carry tax and legal consequences. No inheritance tax, care-fee or asset-protection outcome may be asserted",
      "Wills and estate planning are not regulated by the FCA",
    ],
    imageAlt: "Image required — considered family or property context",
    ctaLabel: "Speak to our estate planning team",
  },
  {
    slug: "will-reviews",
    parent: "wills-estate-planning",
    title: "Will reviews and updates",
    navLabel: "Reviews & updates",
    variant: "privateClient",
    scope:
      "Revisiting an existing will so that it still reflects current circumstances and wishes.",
    intro: null,
    audience: [
      "Anyone whose family or finances have changed",
      "Those who have moved, married, divorced or had children",
      "Executors or beneficiaries who have died or become unsuitable",
    ],
    considerations: [
      "Marriage generally revokes an existing will.",
      "Divorce affects how a will operates.",
      "Property, business interests and beneficiaries all change over time.",
    ],
    faqs: [{ question: "How often should a will be reviewed?", answer: null }],
    related: ["/wills-estate-planning/wills", "/wills-estate-planning/trust-wills", "/wills-estate-planning/mirror-wills"],
    legacyUrls: ["/gfs-wills-writing"],
    complianceFlags: [
      "The effect of marriage and divorce on a will differs across UK jurisdictions",
      "Wills and estate planning are not regulated by the FCA",
    ],
    imageAlt: "Image required — considered domestic context",
    ctaLabel: "Speak to our estate planning team",
  },
];

/**
 * Routes planned but deliberately unbuilt.
 *
 * There is no approved source material for lasting powers of attorney,
 * lifetime trusts or wider estate planning. Rather than fabricate legal
 * content, these are declared here so the sitemap, navigation and SEO document
 * can account for them, and so the intent is recorded — but no page is
 * published and nothing links to them.
 */
export const plannedWillsRoutes = [
  { slug: "lpa", label: "Lasting powers of attorney" },
  { slug: "trusts", label: "Trusts" },
  { slug: "estate-planning", label: "Estate planning" },
] as const;
