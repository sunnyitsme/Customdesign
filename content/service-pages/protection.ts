import type { ServicePage } from "./types";

/**
 * Personal protection.
 *
 * Deliberately restrained: these products exist because of death, illness and
 * loss of income, and the register stays factual rather than fearful. No
 * premium, payout, definition or acceptance claim appears — none is documented.
 *
 * Every policy page carries the lapse warning as a compliance flag: cover ends
 * if premiums stop, and that must be stated in approved wording.
 */
export const protectionPages: readonly ServicePage[] = [
  {
    slug: "life-assurance",
    parent: "protection",
    title: "Life assurance",
    navLabel: "Life assurance",
    variant: "standard",
    scope:
      "Cover that pays out on death during the policy term, arranged either for a fixed period or for whole of life.",
    intro: null,
    audience: [
      "Households with a mortgage or dependants",
      "Parents wanting cover while children are growing up",
      "Anyone reviewing existing cover after a change in circumstances",
    ],
    considerations: [
      "Term cover runs for a set period; whole-of-life cover does not.",
      "Cover can be arranged at a level amount or to decrease alongside a mortgage.",
      "Some plans include terminal illness cover; terms vary between providers.",
      "Premiums may be guaranteed or reviewable.",
    ],
    faqs: [
      { question: "How much cover is appropriate?", answer: null },
      { question: "Should the policy be written in trust?", answer: null },
    ],
    related: [
      "/protection/critical-illness",
      "/protection/family-income-benefit",
      "/wills-estate-planning",
    ],
    legacyUrls: ["/life-assurance", "/why-protection-is-important"],
    complianceFlags: [
      "Policy lapse warning",
      "Trust wording must not stray into legal or tax advice",
    ],
    imageAlt: "Image required — calm family or home context, not distressing",
    ctaLabel: "Talk about protection",
  },
  {
    slug: "critical-illness",
    parent: "protection",
    title: "Critical illness cover",
    navLabel: "Critical illness",
    variant: "standard",
    scope:
      "Cover that pays out on diagnosis of one of the specific conditions defined in the policy.",
    intro: null,
    audience: [
      "Households relying on one or two incomes",
      "Anyone arranging life cover and considering illness alongside it",
      "Self-employed people without employer sick pay",
    ],
    considerations: [
      "Only the conditions defined in the policy are covered, and definitions differ between providers.",
      "Cover can be arranged for a fixed term.",
      "Benefit may be a lump sum or, on some plans, an income.",
    ],
    faqs: [
      { question: "Which conditions are covered?", answer: null },
      {
        question: "How does this differ from income protection?",
        answer: null,
      },
    ],
    related: [
      "/protection/life-assurance",
      "/protection/income-protection",
      "/protection/private-medical-insurance",
    ],
    legacyUrls: ["/critical-illness"],
    complianceFlags: [
      "Policy definitions limitation — wording must be explicit that cover depends on the policy's own definitions",
      "Policy lapse warning",
    ],
    imageAlt: "Image required — calm, everyday context",
    ctaLabel: "Talk about protection",
  },
  {
    slug: "income-protection",
    parent: "protection",
    title: "Income protection",
    navLabel: "Income protection",
    variant: "standard",
    scope:
      "Cover that replaces part of income if illness or injury prevents work, paid until recovery, the end of the term, or a set age.",
    intro: null,
    audience: [
      "Households dependent on earned income",
      "Self-employed people without sick pay",
      "Employees whose employer sick pay is limited",
    ],
    considerations: [
      "Benefit replaces part of income rather than all of it.",
      "A deferred period applies before benefit starts.",
      "Premiums may be guaranteed or reviewable.",
    ],
    faqs: [
      { question: "How much of my income can be covered?", answer: null },
      { question: "What is a deferred period?", answer: null },
    ],
    related: [
      "/protection/critical-illness",
      "/protection/business/income-protection",
      "/mortgages/self-employed",
    ],
    legacyUrls: ["/income-protection"],
    complianceFlags: [
      "Policy lapse warning",
      "Any stated proportion of income requires confirmation",
    ],
    imageAlt: "Image required — everyday working context",
    ctaLabel: "Talk about protection",
  },
  {
    slug: "family-income-benefit",
    parent: "protection",
    title: "Family income benefit",
    navLabel: "Family income benefit",
    variant: "standard",
    scope:
      "Cover that pays a regular income to dependants for the remainder of the policy term following a valid claim on death.",
    intro: null,
    audience: [
      "Families wanting cover shaped as an income rather than a lump sum",
      "Parents planning cover around children's dependent years",
    ],
    considerations: [
      "Benefit is paid as a regular income for the remaining term, not as a single sum.",
      "The total paid reduces as the term runs down.",
    ],
    faqs: [
      {
        question: "How does this compare with a lump sum policy?",
        answer: null,
      },
    ],
    related: [
      "/protection/life-assurance",
      "/protection/critical-illness",
      "/wills-estate-planning",
    ],
    legacyUrls: ["/family-income-benefit"],
    complianceFlags: [
      "Policy lapse warning — explicitly noted on the legacy page",
    ],
    imageAlt: "Image required — calm family context",
    ctaLabel: "Talk about protection",
  },
  {
    slug: "private-medical-insurance",
    parent: "protection",
    title: "Private medical insurance",
    navLabel: "Private medical insurance",
    variant: "standard",
    scope:
      "Cover providing access to private treatment, subject to medical underwriting and the policy's terms.",
    intro: null,
    audience: [
      "Individuals and families wanting treatment choice",
      "Employers considering cover for staff",
    ],
    considerations: [
      "Policies are medically underwritten, and pre-existing conditions are treated differently by different insurers.",
      "Premiums are typically reviewable each year.",
      "What is covered, and where, varies by policy.",
    ],
    faqs: [{ question: "Are pre-existing conditions covered?", answer: null }],
    related: [
      "/protection/critical-illness",
      "/protection/business/directors-staff-benefits",
      "/protection/income-protection",
    ],
    legacyUrls: ["/private-medical"],
    complianceFlags: [
      "Underwriting and exclusions wording",
      "Reviewable premium wording",
    ],
    imageAlt: "Image required — calm clinical or everyday context",
    ctaLabel: "Talk about protection",
  },
  {
    slug: "landlord-insurance",
    parent: "protection",
    title: "Landlord insurance",
    navLabel: "Landlord insurance",
    variant: "standard",
    scope:
      "Cover for let property, spanning buildings, contents and liability, with portfolio arrangements available.",
    intro: null,
    audience: [
      "Landlords with a single let property",
      "Landlords holding a portfolio",
    ],
    considerations: [
      "Standard home insurance does not usually cover let property.",
      "Buildings, contents and liability are separate considerations.",
      "Portfolio cover can be arranged across multiple properties.",
    ],
    faqs: [
      { question: "Is landlord insurance a legal requirement?", answer: null },
    ],
    related: [
      "/mortgages/buy-to-let",
      "/property-finance/portfolio-landlords",
      "/mortgages/holiday-let",
    ],
    legacyUrls: ["/landlord-insurance-direct"],
    imageAlt: "Image required — rental residential property",
    ctaLabel: "Talk about protection",
  },
  {
    slug: "military-personnel",
    parent: "protection",
    title: "Cover for armed forces personnel",
    navLabel: "Armed forces",
    variant: "standard",
    scope:
      "Insurance arranged around the particular circumstances of service personnel.",
    intro: null,
    audience: ["Serving armed forces personnel and their families"],
    considerations: [
      "Some mainstream policies exclude or limit cover related to service.",
      "Kit, travel and life cover are commonly considered together.",
    ],
    faqs: [
      {
        question: "Do standard policies exclude active service?",
        answer: null,
      },
    ],
    related: [
      "/protection/life-assurance",
      "/protection/income-protection",
      "/mortgages/first-time-buyers",
    ],
    legacyUrls: ["/military-personnel-direct"],
    complianceFlags: [
      "Exclusions relating to active service must be stated in approved wording",
    ],
    imageAlt: "Image required — respectful, non-dramatic context",
    ctaLabel: "Talk about protection",
  },
];

/**
 * Business protection.
 *
 * A corporate, structured register — the reader is an owner or director
 * assessing risk to a business, not a household. Same evidential discipline.
 */
export const businessProtectionPages: readonly ServicePage[] = [
  {
    slug: "key-person",
    parent: "protection/business",
    title: "Key person cover",
    navLabel: "Key person",
    variant: "commercial",
    scope:
      "Cover taken out by a business against the death or incapacity of an individual whose loss would materially affect it.",
    intro: null,
    audience: [
      "Businesses dependent on a small number of individuals",
      "Owner-managed companies",
    ],
    considerations: [
      "The business arranges and owns the cover.",
      "Proceeds may be used towards recruitment, temporary cover or lost profit.",
      "Identifying who is genuinely key is the starting point.",
    ],
    faqs: [{ question: "Who counts as a key person?", answer: null }],
    related: [
      "/protection/business/share-protection",
      "/protection/business/relevant-life",
      "/protection/income-protection",
    ],
    legacyUrls: ["/keyperson-insurance", "/introduction-to-business-insurance"],
    complianceFlags: [
      "Tax treatment of premiums and proceeds — Guide does not give tax advice",
    ],
    imageAlt: "Image required — commercial workplace",
    ctaLabel: "Discuss business protection",
  },
  {
    slug: "share-protection",
    parent: "protection/business",
    title: "Share protection",
    navLabel: "Share protection",
    variant: "commercial",
    scope:
      "Life-assurance-backed arrangements intended to help remaining owners fund the purchase of a deceased shareholder's or partner's interest.",
    intro: null,
    audience: [
      "Companies with more than one shareholder",
      "Partnerships and LLPs",
    ],
    considerations: [
      "The arrangement usually sits alongside a legal agreement between the owners.",
      "How the arrangement is structured affects how it operates on a claim.",
    ],
    faqs: [
      { question: "Does this need a cross-option agreement?", answer: null },
    ],
    related: [
      "/protection/business/key-person",
      "/protection/business/relevant-life",
      "/wills-estate-planning",
    ],
    legacyUrls: ["/share-protection"],
    complianceFlags: [
      "Legal agreements are a solicitor's work, not Guide's — the boundary must be explicit",
      "Tax treatment requires professional advice",
    ],
    imageAlt: "Image required — commercial or boardroom context",
    ctaLabel: "Discuss business protection",
  },
  {
    slug: "relevant-life",
    parent: "protection/business",
    title: "Relevant life cover",
    navLabel: "Relevant life",
    variant: "commercial",
    scope:
      "Employer-funded death-in-service style cover arranged for an individual employee, including salaried directors.",
    intro: null,
    audience: ["Small companies without a group scheme", "Salaried directors"],
    considerations: [
      "An employer–employee relationship is required.",
      "Cover is normally written in trust.",
      "Arrangements may be portable if the employee leaves.",
    ],
    faqs: [
      { question: "Can a sole trader take relevant life cover?", answer: null },
    ],
    related: [
      "/protection/business/key-person",
      "/protection/business/directors-staff-benefits",
      "/protection/life-assurance",
    ],
    legacyUrls: ["/relevant-life-cover"],
    complianceFlags: [
      "Tax treatment is a common overclaim area — no tax benefit may be asserted without confirmation",
    ],
    imageAlt: "Image required — commercial workplace",
    ctaLabel: "Discuss business protection",
  },
  {
    slug: "directors-staff-benefits",
    parent: "protection/business",
    title: "Directors' and staff benefits",
    navLabel: "Directors & staff benefits",
    variant: "commercial",
    scope:
      "Benefit arrangements for directors and employees, spanning pensions, life cover and other rewards used in recruitment and retention.",
    intro: null,
    audience: [
      "Employers building a benefits package",
      "Owner-managed businesses reviewing director remuneration",
    ],
    considerations: [
      "Benefits form part of a wider remuneration picture.",
      "Different benefits carry different treatment for the employer and the employee.",
    ],
    faqs: [{ question: "Where should a small employer start?", answer: null }],
    related: [
      "/protection/business/relevant-life",
      "/protection/private-medical-insurance",
      "/protection/business/income-protection",
    ],
    legacyUrls: ["/directors-and-staff-benefits"],
    complianceFlags: [
      "Pensions are a regulated advice area — confirm what Guide is permitted to advise on before publishing",
      "Tax treatment requires professional advice",
    ],
    imageAlt: "Image required — commercial workplace",
    ctaLabel: "Discuss business protection",
  },
  {
    slug: "income-protection",
    parent: "protection/business",
    title: "Business income protection",
    navLabel: "Business income protection",
    variant: "commercial",
    scope:
      "Employer arrangements covering sickness absence, including long-term and short-term income replacement for employees.",
    intro: null,
    audience: [
      "Employers formalising sick pay arrangements",
      "Businesses with contractual sick pay obligations",
    ],
    considerations: [
      "Short-term and long-term arrangements serve different purposes.",
      "Cover interacts with any contractual sick pay the employer already provides.",
    ],
    faqs: [
      {
        question: "How does this interact with contractual sick pay?",
        answer: null,
      },
    ],
    related: [
      "/protection/income-protection",
      "/protection/business/directors-staff-benefits",
      "/protection/business/key-person",
    ],
    legacyUrls: ["/income-protection-insurance"],
    complianceFlags: [
      "Employment law obligations are not Guide's advice to give",
    ],
    imageAlt: "Image required — commercial workplace",
    ctaLabel: "Discuss business protection",
  },
  {
    slug: "employers-liability",
    parent: "protection/business",
    title: "Employers' liability",
    navLabel: "Employers' liability",
    variant: "commercial",
    scope:
      "Cover for an employer's responsibility where an employee suffers injury or illness arising from their employment.",
    intro: null,
    audience: ["Any business with employees"],
    considerations: [
      "Employers' liability cover is a legal requirement for most businesses with employees.",
      "Cover responds to claims arising from employment.",
    ],
    faqs: [{ question: "Is this legally required?", answer: null }],
    related: [
      "/protection/business/professional-indemnity",
      "/protection/business/directors-staff-benefits",
    ],
    legacyUrls: ["/employers-liability-insurance"],
    complianceFlags: [
      "The legal requirement, its exceptions and minimum cover levels must be stated in approved wording only",
    ],
    imageAlt: "Image required — commercial or industrial workplace",
    ctaLabel: "Discuss business protection",
  },
  {
    slug: "professional-indemnity",
    parent: "protection/business",
    title: "Professional indemnity",
    navLabel: "Professional indemnity",
    variant: "commercial",
    scope:
      "Cover for businesses providing advice, knowledge or professional services, responding to claims of negligence.",
    intro: null,
    audience: [
      "Consultancies and professional practices",
      "Businesses contractually required to hold cover",
    ],
    considerations: [
      "Cover responds to claims arising from professional work.",
      "Many client contracts and professional bodies require it.",
      "Policies are usually written on a claims-made basis.",
    ],
    faqs: [{ question: "What does claims-made mean?", answer: null }],
    related: [
      "/protection/business/employers-liability",
      "/protection/business/key-person",
    ],
    legacyUrls: ["/professional-indemnity-insurance"],
    imageAlt: "Image required — professional workplace",
    ctaLabel: "Discuss business protection",
  },
];
