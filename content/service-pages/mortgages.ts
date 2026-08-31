import type { ServicePage } from "./types";

/**
 * Mortgage service pages and educational guides.
 *
 * `scope`, `audience` and `considerations` are compressed from the documented
 * content scope of the corresponding legacy pages in
 * reference/current-guide-site/content-migration-inventory.md. They describe
 * what a product *is* and what a borrower should be aware of — they assert
 * nothing about Guide's results, and quote no rate, fee, criterion or
 * percentage, because the migration pack records none.
 *
 * `complianceFlags` name the topics the firm's compliance function must sign
 * off before the page is published.
 */
export const mortgagePages: readonly ServicePage[] = [
  {
    slug: "first-time-buyers",
    parent: "mortgages",
    title: "First-time buyer mortgages",
    navLabel: "First-time buyers",
    variant: "standard",
    scope:
      "Advice for a first purchase, covering how lenders assess an application and what to prepare before making an offer.",
    intro: null,
    audience: [
      "Buying a first home, alone or jointly",
      "Saving towards a deposit and wanting to know what is realistic",
      "Not part of a chain, and wanting to understand what that changes",
    ],
    considerations: [
      "Lenders assess property type and condition alongside the applicant.",
      "Employment history and income structure both affect how an application is read.",
      "Regular expenditure and existing financial commitments form part of the affordability assessment.",
      "Being chain-free can affect timing, though it does not change lending criteria.",
    ],
    faqs: [
      { question: "How much deposit will I need?", answer: null },
      { question: "How long does an application usually take?", answer: null },
      { question: "What documents should I get ready?", answer: null },
    ],
    related: [
      "/mortgages/guides/introduction-to-mortgages",
      "/mortgages/guides/fixed-rate",
      "/calculators/affordability",
    ],
    legacyUrls: ["/1st-time-buyer"],
    complianceFlags: [
      "Affordability wording",
      "Any indicative borrowing figure",
    ],
    imageAlt: "Image required — residential property, first-home register",
    ctaLabel: "Speak to a mortgage adviser",
  },
  {
    slug: "remortgaging",
    parent: "mortgages",
    title: "Remortgaging",
    navLabel: "Remortgaging",
    variant: "standard",
    scope:
      "Reviewing an existing mortgage — whether to move to a new deal, change the term, raise funds, or stay put.",
    intro: null,
    audience: [
      "Coming to the end of a fixed or introductory period",
      "Considering raising funds against an existing property",
      "Wanting to change the term or repayment basis",
    ],
    considerations: [
      "A rate ending is a decision point, not an automatic move — staying can be the right answer.",
      "Early repayment charges may apply depending on the existing product.",
      "Raising funds against a home increases the amount secured on it.",
    ],
    faqs: [
      {
        question: "When should I start looking at a remortgage?",
        answer: null,
      },
      { question: "Can I remortgage to make home improvements?", answer: null },
    ],
    related: [
      "/mortgages/second-charge",
      "/mortgages/guides/mortgage-repayment",
      "/calculators/mortgage-repayment",
    ],
    legacyUrls: ["/remortgaging"],
    complianceFlags: [
      "Debt consolidation wording — consolidating unsecured debt into a mortgage secures it against the home and may cost more overall",
    ],
    imageAlt: "Image required — established residential property",
    ctaLabel: "Speak to a mortgage adviser",
  },
  {
    slug: "buy-to-let",
    parent: "mortgages",
    title: "Buy-to-let mortgages",
    navLabel: "Buy-to-let",
    variant: "complex",
    scope:
      "Lending for property bought to let, assessed largely on the rent the property is expected to produce.",
    intro: null,
    audience: [
      "Buying a first rental property",
      "Adding to an existing rental portfolio",
      "Reviewing an existing buy-to-let arrangement",
    ],
    considerations: [
      "Rental coverage is central to how these applications are assessed.",
      "Credit history is still reviewed alongside the property itself.",
      "Lenders apply restrictions on property type, tenancy type and tenant profile.",
    ],
    faqs: [
      { question: "How is rental coverage assessed?", answer: null },
      { question: "Can I let a property I already own?", answer: null },
    ],
    related: [
      "/mortgages/limited-company",
      "/property-finance/portfolio-landlords",
      "/protection/landlord-insurance",
    ],
    legacyUrls: ["/buy-to-let-mortgages"],
    complianceFlags: [
      "Buy-to-Let regulatory qualification — most buy-to-let lending is not regulated by the FCA; the exact wording must come from compliance",
    ],
    imageAlt: "Image required — rental residential property",
    ctaLabel: "Discuss a buy-to-let",
  },
  {
    slug: "self-employed",
    parent: "mortgages",
    title: "Self-employed mortgages",
    navLabel: "Self-employed",
    variant: "complex",
    scope:
      "Mortgage advice where income comes from self-employment, a company, or a mix of sources rather than a single salary.",
    intro: null,
    audience: [
      "Sole traders, partners and company directors",
      "Trading for a short period, or with income that varies year to year",
      "Drawing income through a combination of salary, dividends or retained profit",
    ],
    considerations: [
      "Lenders differ in how many years of trading they want to see.",
      "Where profits vary, lenders differ in which figure they work from.",
      "How income is drawn can matter as much as how much is earned.",
    ],
    faqs: [
      { question: "How long do I need to have been trading?", answer: null },
      { question: "Which accounts will a lender want to see?", answer: null },
    ],
    related: [
      "/mortgages/limited-company",
      "/mortgages/high-value-mortgages",
      "/protection/income-protection",
    ],
    legacyUrls: ["/self-employed-mortgages-direct"],
    complianceFlags: [
      "Lender criteria wording — criteria vary by lender and change",
    ],
    imageAlt: "Image required — professional or workplace context",
    ctaLabel: "Speak to a mortgage adviser",
  },
  {
    slug: "high-value-mortgages",
    parent: "mortgages",
    title: "High-value mortgages",
    navLabel: "High-value lending",
    variant: "complex",
    scope:
      "Larger residential borrowing, where underwriting tends to be individual rather than automated.",
    intro: null,
    audience: [
      "Buying or refinancing a premium property",
      "Borrowing at a level where standard automated assessment does not apply",
      "Holding income or assets in a form that needs explaining to a lender",
    ],
    considerations: [
      "Cases at this level are typically underwritten individually.",
      "Loan-to-value expectations can differ from mainstream lending.",
      "Wider assets and income sources are usually part of the assessment.",
    ],
    faqs: [
      { question: "What counts as a high-value mortgage?", answer: null },
      { question: "How does private bank lending differ?", answer: null },
    ],
    related: [
      "/mortgages/self-employed",
      "/mortgages/second-property",
      "/property-finance/bridging",
    ],
    legacyUrls: ["/high-value-mortgages-direct"],
    complianceFlags: [
      "Any lending threshold or LTV figure requires firm confirmation",
    ],
    imageAlt: "Image required — premium residential architecture",
    ctaLabel: "Discuss high-value lending",
  },
  {
    slug: "limited-company",
    parent: "mortgages",
    title: "Limited company lending",
    navLabel: "Limited company",
    variant: "complex",
    scope:
      "Lending to a limited company or SPV holding residential investment property, including purchases, refinancing and transfers into a company.",
    intro: null,
    audience: [
      "Landlords holding property through a company structure",
      "Considering moving existing property into a company",
      "Buying through an SPV for the first time",
    ],
    considerations: [
      "Not every lender lends to companies, and terms differ from personal lending.",
      "Moving an existing property into a company is a sale and purchase, with the costs that implies.",
      "Some lenders will consider higher-risk property types or non-UK-resident applicants; many will not.",
    ],
    faqs: [
      {
        question: "Should I hold property personally or through a company?",
        answer: null,
      },
      { question: "What is an SPV?", answer: null },
    ],
    related: [
      "/mortgages/buy-to-let",
      "/property-finance/portfolio-landlords",
      "/property-finance/hmo-finance",
    ],
    legacyUrls: ["/limited-company-lending-direct"],
    complianceFlags: [
      "Tax treatment — personal versus company ownership has tax consequences. Guide does not give tax advice; wording must make the boundary explicit",
    ],
    imageAlt: "Image required — residential investment property",
    ctaLabel: "Discuss company lending",
  },
  {
    slug: "holiday-let",
    parent: "mortgages",
    title: "Holiday let mortgages",
    navLabel: "Holiday let",
    variant: "complex",
    scope:
      "Lending for property let on a short-term or seasonal basis rather than on a standard tenancy.",
    intro: null,
    audience: [
      "Buying a property to let to holidaymakers",
      "Refinancing an existing holiday let",
      "Converting a property from standard letting to short-term letting",
    ],
    considerations: [
      "Income is seasonal, and lenders assess it differently from a standard tenancy.",
      "Both interest-only and capital repayment arrangements may be available.",
      "Criteria tend to be tighter than for standard buy-to-let.",
    ],
    faqs: [{ question: "How is holiday let income assessed?", answer: null }],
    related: [
      "/mortgages/buy-to-let",
      "/mortgages/second-property",
      "/protection/landlord-insurance",
    ],
    legacyUrls: ["/holiday-let-mortgages-direct"],
    imageAlt: "Image required — coastal or rural holiday property",
    ctaLabel: "Discuss a holiday let",
  },
  {
    slug: "let-to-buy",
    parent: "mortgages",
    title: "Let-to-buy mortgages",
    navLabel: "Let-to-buy",
    variant: "complex",
    scope:
      "Refinancing a current home onto a letting basis while arranging a new residential mortgage on the next one.",
    intro: null,
    audience: [
      "Moving home but keeping the existing property",
      "Unable or unwilling to sell in current conditions",
      "Wanting to retain a property as a long-term investment",
    ],
    considerations: [
      "Two arrangements run in parallel, and both must work together.",
      "The existing property moves onto a letting basis, which changes how it is assessed.",
      "Timing across the two transactions needs coordinating.",
    ],
    faqs: [
      { question: "How does let-to-buy differ from buy-to-let?", answer: null },
    ],
    related: [
      "/mortgages/buy-to-let",
      "/mortgages/second-property",
      "/mortgages/remortgaging",
    ],
    legacyUrls: ["/let-to-buy-mortgages-direct"],
    imageAlt: "Image required — residential street or terrace",
    ctaLabel: "Speak to a mortgage adviser",
  },
  {
    slug: "second-property",
    parent: "mortgages",
    title: "Second properties",
    navLabel: "Second properties",
    variant: "standard",
    scope:
      "Borrowing to buy an additional property alongside a main residence.",
    intro: null,
    audience: [
      "Buying a second home for personal use",
      "Buying for a family member to live in",
      "Buying ahead of a future move",
    ],
    considerations: [
      "Affordability is assessed across both properties, not just the new one.",
      "Deposit expectations can differ from a main residence.",
      "Additional property purchases carry their own tax treatment.",
    ],
    faqs: [
      {
        question: "How is affordability assessed on a second property?",
        answer: null,
      },
    ],
    related: [
      "/mortgages/holiday-let",
      "/mortgages/high-value-mortgages",
      "/calculators/stamp-duty",
    ],
    legacyUrls: ["/second-properties-direct"],
    complianceFlags: [
      "Stamp duty and additional-property tax — rates and surcharges differ by UK nation and change; do not state figures without confirmation",
    ],
    imageAlt: "Image required — second-home residential property",
    ctaLabel: "Speak to a mortgage adviser",
  },
  {
    slug: "retirement-interest-only",
    parent: "mortgages",
    title: "Retirement interest-only mortgages",
    navLabel: "Retirement interest-only",
    variant: "complex",
    scope:
      "Interest-only borrowing in later life with no fixed end date, usually repaid when the property is sold on death or a move into long-term care.",
    intro: null,
    audience: [
      "Later-life borrowers wanting to remain in their home",
      "Reviewing an existing interest-only mortgage reaching its end",
      "Comparing options against equity release",
    ],
    considerations: [
      "Interest is paid monthly, so the balance is not designed to grow.",
      "The loan is generally repaid on death or a move into long-term care.",
      "This is a different arrangement from equity release, and the two should be compared properly.",
    ],
    faqs: [
      { question: "How does this differ from equity release?", answer: null },
      { question: "What happens to the property eventually?", answer: null },
    ],
    related: [
      "/mortgages/guides/mortgage-repayment",
      "/wills-estate-planning",
      "/protection/life-assurance",
    ],
    legacyUrls: ["/retirement-interest-only-mortgages-direct"],
    complianceFlags: [
      "Later-life lending and equity release comparison — high-risk advice area needing explicit compliance wording",
      "Estate and inheritance implications must not be characterised as advice",
    ],
    imageAlt: "Image required — later-life residential context",
    ctaLabel: "Discuss later-life lending",
  },
  {
    slug: "self-build",
    parent: "mortgages",
    title: "Self-build mortgages",
    navLabel: "Self-build",
    variant: "complex",
    scope:
      "Funding released in stages across a build, rather than as a single advance on a completed property.",
    intro: null,
    audience: [
      "Building a home from scratch",
      "Undertaking a major conversion or renovation",
      "Buying land with planning permission",
    ],
    considerations: [
      "Lenders want to see a project plan and a build-cost forecast.",
      "Planning permission and building regulations form part of the assessment.",
      "Funds are released in stages, usually following inspection.",
    ],
    faqs: [
      { question: "When are funds released?", answer: null },
      { question: "What happens if the build overruns?", answer: null },
    ],
    related: [
      "/property-finance/development-finance",
      "/property-finance/bridging",
      "/mortgages/guides/introduction-to-mortgages",
    ],
    legacyUrls: ["/self-build-mortgages"],
    imageAlt: "Image required — self-build or construction site",
    ctaLabel: "Discuss a self-build",
  },
  {
    slug: "second-charge",
    parent: "mortgages",
    title: "Second charge mortgages",
    navLabel: "Second charge",
    variant: "complex",
    scope:
      "Additional borrowing secured against a property behind the existing first mortgage, which stays in place.",
    intro: null,
    audience: [
      "Wanting to raise funds without disturbing a first mortgage",
      "Facing early repayment charges on an existing product",
      "Raising funds for improvements or investment",
    ],
    considerations: [
      "The first mortgage remains, and the second charge sits behind it.",
      "If a property is sold, secured lenders are repaid in order of their charge.",
      "Affordability is assessed across both amounts.",
    ],
    faqs: [
      {
        question: "How does a second charge differ from a remortgage?",
        answer: null,
      },
    ],
    related: [
      "/mortgages/remortgaging",
      "/property-finance/second-charge",
      "/mortgages/guides/mortgage-repayment",
    ],
    legacyUrls: ["/second-charge-mortgages"],
    complianceFlags: [
      "Debt consolidation wording — securing previously unsecured debt against a home is a high-risk topic",
      "Repossession risk warning must appear",
    ],
    imageAlt: "Image required — residential property exterior",
    ctaLabel: "Speak to a mortgage adviser",
  },
];

/**
 * Educational guides.
 *
 * These explain product types rather than sell a service. They keep the legacy
 * URLs' search value under /mortgages/guides/ instead of competing with the
 * circumstance-led service pages for the same intent.
 */
export const mortgageGuides: readonly ServicePage[] = [
  {
    slug: "introduction-to-mortgages",
    parent: "mortgages/guides",
    title: "An introduction to mortgages",
    navLabel: "Introduction to mortgages",
    variant: "educational",
    scope:
      "What a mortgage is as a form of secured lending, and the main things a lender looks at.",
    intro: null,
    audience: [],
    considerations: [
      "A mortgage is secured on the property, which is what makes repossession possible.",
      "Lenders test affordability against circumstances beyond today's payment.",
      "The deposit affects both whether a lender will lend and on what terms.",
    ],
    faqs: [{ question: "What do lenders assess?", answer: null }],
    related: [
      "/mortgages/guides/mortgage-repayment",
      "/mortgages/first-time-buyers",
      "/calculators/affordability",
    ],
    legacyUrls: ["/introduction-to-mortgages"],
    complianceFlags: [
      "Affordability and stress-testing wording",
      "Repossession risk warning",
    ],
    imageAlt: "Image required — editorial residential property",
  },
  {
    slug: "mortgage-repayment",
    parent: "mortgages/guides",
    title: "Repayment and interest-only mortgages",
    navLabel: "Repayment and interest-only",
    variant: "educational",
    scope:
      "The difference between repaying capital and interest together, and paying interest alone.",
    intro: null,
    audience: [],
    considerations: [
      "On a repayment basis, the balance reduces over the term.",
      "On an interest-only basis, the balance does not reduce through the monthly payment.",
      "Interest-only borrowing needs a credible plan for repaying the capital.",
      "The term affects both the monthly payment and the total interest paid.",
    ],
    faqs: [{ question: "Which basis is right for me?", answer: null }],
    related: [
      "/mortgages/guides/introduction-to-mortgages",
      "/mortgages/retirement-interest-only",
      "/calculators/mortgage-repayment",
    ],
    legacyUrls: ["/mortgage-repayment"],
    complianceFlags: [
      "Interest-only repayment strategy wording — a known high-risk area; the requirement for a repayment plan must be explicit",
    ],
    imageAlt: "Image required — editorial finance",
  },
  {
    slug: "fixed-rate",
    parent: "mortgages/guides",
    title: "Fixed rate mortgages",
    navLabel: "Fixed rate",
    variant: "educational",
    scope:
      "A rate held for an agreed period, and what typically happens when that period ends.",
    intro: null,
    audience: [],
    considerations: [
      "The payment is known for the fixed period.",
      "Product fees may apply and vary between lenders.",
      "At the end of the period the mortgage usually moves onto the lender's variable rate unless a new product is arranged.",
    ],
    faqs: [{ question: "What happens when my fixed rate ends?", answer: null }],
    related: [
      "/mortgages/guides/tracker",
      "/mortgages/guides/standard-variable-rate",
      "/mortgages/remortgaging",
    ],
    legacyUrls: ["/fixed-rate-mortgages"],
    imageAlt: "Image required — editorial finance",
  },
  {
    slug: "tracker",
    parent: "mortgages/guides",
    title: "Tracker mortgages",
    navLabel: "Tracker",
    variant: "educational",
    scope:
      "A rate that follows an external index, typically the Bank of England base rate, plus a lender margin.",
    intro: null,
    audience: [],
    considerations: [
      "The payment moves when the tracked index moves.",
      "The lender's margin sits on top of the index.",
      "Some products set a minimum rate below which the tracker will not fall.",
    ],
    faqs: [{ question: "What does my payment track?", answer: null }],
    related: [
      "/mortgages/guides/fixed-rate",
      "/mortgages/guides/standard-variable-rate",
      "/mortgages/remortgaging",
    ],
    legacyUrls: ["/tracker-mortgages"],
    imageAlt: "Image required — editorial finance",
  },
  {
    slug: "standard-variable-rate",
    parent: "mortgages/guides",
    title: "Standard variable rate mortgages",
    navLabel: "Standard variable rate",
    variant: "educational",
    scope:
      "The lender's own variable rate, which a mortgage usually reverts to when a product period ends.",
    intro: null,
    audience: [],
    considerations: [
      "The lender sets and changes this rate at its own discretion.",
      "It may move in relation to the Bank of England base rate, but is not required to follow it.",
      "Payments are less predictable than on a fixed product.",
    ],
    faqs: [
      {
        question: "Should I stay on the standard variable rate?",
        answer: null,
      },
    ],
    related: [
      "/mortgages/remortgaging",
      "/mortgages/guides/fixed-rate",
      "/mortgages/guides/tracker",
    ],
    legacyUrls: ["/standard-variable-rate-mortgages"],
    imageAlt: "Image required — editorial finance",
  },
  {
    slug: "offset",
    parent: "mortgages/guides",
    title: "Offset mortgages",
    navLabel: "Offset",
    variant: "educational",
    scope:
      "Linking savings or current account balances to a mortgage so that interest is charged on the difference.",
    intro: null,
    audience: [],
    considerations: [
      "Linked balances reduce the amount interest is charged on.",
      "The benefit can be taken as a shorter term or a lower payment, depending on the product.",
      "Linked savings usually do not earn interest separately.",
    ],
    faqs: [{ question: "Who does an offset arrangement suit?", answer: null }],
    related: [
      "/mortgages/guides/mortgage-repayment",
      "/mortgages/self-employed",
      "/calculators/overpayment",
    ],
    legacyUrls: ["/offset-mortgages"],
    imageAlt: "Image required — editorial finance",
  },
  {
    slug: "cashback",
    parent: "mortgages/guides",
    title: "Cashback mortgages",
    navLabel: "Cashback",
    variant: "educational",
    scope:
      "Products that pay a cash sum on completion, subject to the lender's conditions.",
    intro: null,
    audience: [],
    considerations: [
      "Cashback is paid subject to the lender's own conditions.",
      "A product offering cashback may not be the cheapest overall.",
      "Cashback may have to be repaid if the mortgage is redeemed early.",
    ],
    faqs: [{ question: "Is a cashback product better value?", answer: null }],
    related: [
      "/mortgages/guides/fixed-rate",
      "/mortgages/first-time-buyers",
      "/mortgages/remortgaging",
    ],
    legacyUrls: ["/cashback-mortgages"],
    imageAlt: "Image required — editorial finance",
  },
  {
    slug: "adverse-credit",
    parent: "mortgages/guides",
    title: "Mortgages with adverse credit",
    navLabel: "Adverse credit",
    variant: "educational",
    scope:
      "How a difficult credit history affects a mortgage application, and what tends to matter to a lender.",
    intro: null,
    audience: [],
    considerations: [
      "Lenders differ widely in what they will consider and how recent an event is.",
      "The type, size and age of an adverse entry all matter.",
      "Pricing and deposit expectations may differ from mainstream lending.",
    ],
    faqs: [
      { question: "Will a past default stop me borrowing?", answer: null },
    ],
    related: [
      "/mortgages/first-time-buyers",
      "/mortgages/remortgaging",
      "/mortgages/self-employed",
    ],
    legacyUrls: ["/bad-credit-mortgages-direct"],
    complianceFlags: [
      "Wording must avoid implying any application will be accepted, and must not promise credit repair",
    ],
    imageAlt: "Image required — editorial finance",
  },
];
