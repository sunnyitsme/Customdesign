/**
 * Global site data.
 *
 * SOURCE: reference/current-guide-site/ (public crawl, 2026-08-29).
 * Only values that appear verbatim in the migration pack are stated as fact.
 * Where the pack records a conflict between sources, the value is
 * FIRM_CONFIRMATION_REQUIRED rather than arbitrated. See docs/02-decisions.md D-006.
 */

/** Rendered wherever the source material conflicts and we must not choose. */
export const FIRM_CONFIRMATION_REQUIRED =
  "[FIRM CONFIRMATION REQUIRED]" as const;

export interface Office {
  readonly city: string;
  readonly address: string;
}

/**
 * Recorded conflicts, carried in code so they stay visible rather than living
 * only in a document. Each blocks a production launch.
 */
export const sourceConflicts = [
  {
    id: "primary-address",
    summary:
      "Public site uses Brentford/London; the Terms of Business and Privacy Notice PDFs use Manchester/Sale.",
  },
  {
    id: "primary-email",
    summary:
      "Public site uses enquiries@guidefs.co.uk; the legal PDFs use info@guidemortgages.co.uk.",
  },
  {
    id: "office-count",
    summary:
      "The Company page names three offices; the global footer lists four (Leeds is the difference).",
  },
] as const;

export const site = {
  name: "Guide Financial Services",
  legalEntity: "Asset Guide Limited",
  tradingNames: ["Guide Financial Services", "Guide Mortgages"],

  phone: "0333 034 8993",
  phoneHref: "tel:+443330348993",

  /** Conflicts with the legal PDFs — see sourceConflicts['primary-email']. */
  email: "enquiries@guidefs.co.uk",

  /** Conflicts with the legal PDFs — see sourceConflicts['primary-address']. */
  primaryAddress: "1st Floor, 1000 Great West Road, Brentford, London TW8 9DW",

  /** Four per the global footer; the Company page names three. Unresolved. */
  offices: [
    {
      city: "London",
      address: "1st Floor, 1000 Great West Road, Brentford, London TW8 9DW",
    },
    {
      city: "Manchester",
      address: "Ground Floor, Dunham House, Cross Street, Sale, M33 7HH",
    },
    {
      city: "Leicester",
      address:
        "Unit D5, Leicester Business Centre, Ross Walk, Leicester, LE4 5HH",
    },
    {
      city: "Leeds",
      address:
        "Office 3, Millwright Business Centre, Regent Street, Leeds, LS2 7NA",
    },
  ] satisfies readonly Office[],

  registrations: {
    fcaFrn: "918369",
    icoNumber: "ZA277525",
    companyNumber: "10938852",
  },

  external: {
    clientLogin: "https://client.guidemortgages.co.uk",
    advisorLogin: "https://crm.guidemortgages.co.uk",
  },
} as const;
