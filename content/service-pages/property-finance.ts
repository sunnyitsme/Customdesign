import type { ServicePage } from "./types";

/**
 * Specialist property finance.
 *
 * Scope lines are compressed from the documented content scope of the legacy
 * /gfs-* pages. No facility size, rate, term or deal outcome appears anywhere —
 * the migration pack records none, and inventing one would be fabricating a
 * lending claim.
 */
export const propertyFinancePages: readonly ServicePage[] = [
  {
    slug: "bridging",
    parent: "property-finance",
    title: "Bridging finance",
    navLabel: "Bridging finance",
    variant: "commercial",
    scope:
      "Short-term secured lending used where timing matters — an auction deadline, a refurbishment, or a purchase that cannot wait for a longer-term facility.",
    intro: null,
    audience: [
      "Buying at auction against a fixed completion deadline",
      "Refurbishing a property before refinancing or selling",
      "Bridging a gap between a purchase and a sale",
    ],
    considerations: [
      "These facilities are short-term by design and priced accordingly.",
      "A credible exit — sale or refinance — is central to the case.",
      "The security property and its condition shape what is available.",
    ],
    faqs: [
      {
        question: "How quickly can bridging finance be arranged?",
        answer: null,
      },
      { question: "What counts as an exit?", answer: null },
    ],
    related: [
      "/property-finance/auction-finance",
      "/property-finance/development-finance",
      "/property-finance/commercial-finance",
    ],
    legacyUrls: ["/gfs-bridging-loans"],
    complianceFlags: [
      "Speed and turnaround claims require firm confirmation",
      "Regulated versus unregulated bridging must be distinguished",
    ],
    imageAlt: "Image required — transitional or refurbishment property",
    ctaLabel: "Discuss bridging finance",
  },
  {
    slug: "development-finance",
    parent: "property-finance",
    title: "Development finance",
    navLabel: "Development finance",
    variant: "commercial",
    scope:
      "Short to medium-term funding for new builds, conversions, major refurbishment, land purchase and construction costs.",
    intro: null,
    audience: [
      "Developers building out a site",
      "Converting or substantially refurbishing existing buildings",
      "Purchasing land with or without planning",
    ],
    considerations: [
      "Funding is typically released in stages against progress.",
      "Lenders assess the scheme, the costs and the track record behind it.",
      "The exit — sale or refinance onto a longer-term facility — forms part of the case.",
    ],
    faqs: [
      { question: "How are drawdowns structured?", answer: null },
      { question: "Is planning permission required first?", answer: null },
    ],
    related: [
      "/property-finance/bridging",
      "/property-finance/commercial-finance",
      "/mortgages/self-build",
    ],
    legacyUrls: ["/gfs-development-finance"],
    imageAlt: "Image required — development site or scheme under construction",
    ctaLabel: "Discuss development finance",
  },
  {
    slug: "commercial-finance",
    parent: "property-finance",
    title: "Commercial and semi-commercial mortgages",
    navLabel: "Commercial mortgages",
    variant: "commercial",
    scope:
      "Lending against commercial and mixed-use property — offices, retail, industrial and semi-commercial — whether owner-occupied or held as investment.",
    intro: null,
    audience: [
      "Businesses buying premises to occupy",
      "Investors buying commercial or mixed-use property",
      "Refinancing an existing commercial facility",
    ],
    considerations: [
      "Owner-occupied and investment cases are assessed differently.",
      "Tenant profile and lease terms matter on investment cases.",
      "Mixed-use property can fall between residential and commercial criteria.",
    ],
    faqs: [{ question: "What counts as semi-commercial?", answer: null }],
    related: [
      "/property-finance/development-finance",
      "/property-finance/bridging",
      "/property-finance/portfolio-landlords",
    ],
    legacyUrls: ["/gfs-commercial-and-semi-commercial-mortgages"],
    complianceFlags: [
      "Commercial mortgages are generally not regulated by the FCA — the footer statement must be carried and the boundary made explicit",
    ],
    imageAlt: "Image required — commercial or mixed-use building",
    ctaLabel: "Discuss commercial finance",
  },
  {
    slug: "portfolio-landlords",
    parent: "property-finance",
    title: "Portfolio landlord finance",
    navLabel: "Portfolio landlords",
    variant: "commercial",
    scope:
      "Lending for landlords holding multiple properties, including refinancing across a portfolio and funding further acquisitions.",
    intro: null,
    audience: [
      "Landlords holding several properties personally or through a company",
      "Consolidating borrowing across a portfolio",
      "Releasing equity to fund further purchases",
    ],
    considerations: [
      "Lenders assess the whole portfolio, not only the property being financed.",
      "Overall borrowing capacity is shaped by the portfolio's performance.",
      "Structure — personal or corporate — affects which lenders will consider the case.",
    ],
    faqs: [
      {
        question: "How many properties makes someone a portfolio landlord?",
        answer: null,
      },
    ],
    related: [
      "/mortgages/buy-to-let",
      "/mortgages/limited-company",
      "/property-finance/hmo-finance",
    ],
    legacyUrls: ["/gfs-portfolio-landlord-finance"],
    complianceFlags: [
      "Buy-to-Let regulatory qualification",
      "Any portfolio-size threshold requires confirmation",
    ],
    imageAlt: "Image required — residential portfolio or terrace",
    ctaLabel: "Discuss portfolio finance",
  },
  {
    slug: "auction-finance",
    parent: "property-finance",
    title: "Auction finance",
    navLabel: "Auction finance",
    variant: "commercial",
    scope:
      "Short-term finance arranged around auction completion deadlines, for residential, commercial, buy-to-let and refurbishment purchases.",
    intro: null,
    audience: [
      "Bidding at auction and needing certainty before the hammer falls",
      "Having already exchanged at auction and working to a deadline",
      "Buying property needing work that mainstream lenders will not consider",
    ],
    considerations: [
      "Auction contracts commit the buyer on the fall of the hammer.",
      "Completion deadlines are fixed and short.",
      "Property condition often rules out mainstream lending.",
    ],
    faqs: [
      { question: "Should finance be arranged before bidding?", answer: null },
    ],
    related: [
      "/property-finance/bridging",
      "/property-finance/development-finance",
      "/mortgages/buy-to-let",
    ],
    legacyUrls: ["/gfs-auction-finance"],
    imageAlt: "Image required — auction or refurbishment property",
    ctaLabel: "Discuss auction finance",
  },
  {
    slug: "hmo-finance",
    parent: "property-finance",
    title: "HMO finance",
    navLabel: "HMO finance",
    variant: "commercial",
    scope:
      "Funding for houses in multiple occupation — purchases, conversions and refurbishment, portfolio expansion and refinancing.",
    intro: null,
    audience: [
      "Buying an existing HMO",
      "Converting a property to multiple occupation",
      "Refinancing an HMO onto different terms",
    ],
    considerations: [
      "HMOs carry licensing and safety obligations that vary by local authority.",
      "Lenders differ on room counts, layouts and tenant types.",
      "Valuation may be assessed on investment value rather than bricks and mortar.",
    ],
    faqs: [
      { question: "Does the property need a licence first?", answer: null },
    ],
    related: [
      "/property-finance/portfolio-landlords",
      "/mortgages/limited-company",
      "/property-finance/development-finance",
    ],
    legacyUrls: ["/gfs-house-in-multiple-occupation-finance"],
    complianceFlags: [
      "Licensing and safety obligations vary by authority — do not state requirements without confirmation",
    ],
    imageAlt: "Image required — multi-occupancy residential property",
    ctaLabel: "Discuss HMO finance",
  },
  {
    slug: "second-charge",
    parent: "property-finance",
    title: "Second charge and debt consolidation",
    navLabel: "Second charge",
    variant: "commercial",
    scope:
      "Secured borrowing that uses equity in a property without replacing the existing first mortgage.",
    intro: null,
    audience: [
      "Raising funds while keeping an existing first mortgage in place",
      "Funding improvements or a further investment",
      "Reviewing options where a remortgage is not straightforward",
    ],
    considerations: [
      "The borrowing is secured on the property, alongside the first mortgage.",
      "Secured lenders are repaid in the order of their charge on a sale.",
      "Consolidating existing debt into secured borrowing changes its nature.",
    ],
    faqs: [
      {
        question:
          "When does a second charge make more sense than a remortgage?",
        answer: null,
      },
    ],
    related: [
      "/mortgages/second-charge",
      "/mortgages/remortgaging",
      "/property-finance/portfolio-landlords",
    ],
    legacyUrls: ["/gfs-second-charge-and-debt-consolidation"],
    complianceFlags: [
      "Debt consolidation — consolidating unsecured debt into secured borrowing may increase the total repaid and puts the property at risk. Wording is compliance-critical",
      "Repossession risk warning must appear",
    ],
    imageAlt: "Image required — residential property exterior",
    ctaLabel: "Discuss second charge lending",
  },
];
