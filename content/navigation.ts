/**
 * Navigation architecture.
 *
 * Six primary hubs. Long-tail legacy service pages remain real child routes for
 * SEO and content purposes but are NOT all surfaced here — the desktop menu is
 * curated. See docs/02-decisions.md D-002.
 *
 * `featured` drives what appears in the mega-menu panel, so curation is a
 * content decision rather than a code change.
 */

export interface NavChild {
  readonly label: string;
  readonly href: string;
  /** Surfaced in the desktop mega-menu panel. */
  readonly featured: boolean;
}

export interface NavHub {
  /** Stable id, used for aria-controls on the mega-menu disclosure. */
  readonly id: string;
  readonly label: string;
  readonly href: string;
  /** One line describing the division, shown in the panel. */
  readonly summary: string;
  readonly children: readonly NavChild[];
}

export const hubs: readonly NavHub[] = [
  {
    id: 'mortgages',
    label: 'Mortgages',
    href: '/mortgages',
    summary: 'Residential advice across the whole of market, from first purchase to refinancing.',
    children: [
      { label: 'First-time buyers', href: '/mortgages/first-time-buyers', featured: true },
      { label: 'Remortgaging', href: '/mortgages/remortgaging', featured: true },
      { label: 'Buy-to-let', href: '/mortgages/buy-to-let', featured: true },
      { label: 'High-value lending', href: '/mortgages/high-value', featured: true },
      { label: 'Self-employed', href: '/mortgages/self-employed', featured: true },
      { label: 'Fixed rate', href: '/mortgages/fixed-rate', featured: false },
      { label: 'Tracker', href: '/mortgages/tracker', featured: false },
      { label: 'Offset', href: '/mortgages/offset', featured: false },
      { label: 'Standard variable rate', href: '/mortgages/standard-variable-rate', featured: false },
      { label: 'Cashback', href: '/mortgages/cashback', featured: false },
      { label: 'Adverse credit', href: '/mortgages/adverse-credit', featured: false },
      { label: 'Self-build', href: '/mortgages/self-build', featured: false },
      { label: 'Second charge', href: '/mortgages/second-charge', featured: false },
      { label: 'Let-to-buy', href: '/mortgages/let-to-buy', featured: false },
      { label: 'Holiday let', href: '/mortgages/holiday-let', featured: false },
      { label: 'Limited company lending', href: '/mortgages/limited-company', featured: false },
      { label: 'Second properties', href: '/mortgages/second-properties', featured: false },
      { label: 'Retirement interest only', href: '/mortgages/retirement-interest-only', featured: false },
    ],
  },
  {
    id: 'property-finance',
    label: 'Property Finance',
    href: '/property-finance',
    summary: 'Specialist funding for investors, landlords and developers.',
    children: [
      { label: 'Bridging finance', href: '/property-finance/bridging', featured: true },
      { label: 'Development finance', href: '/property-finance/development', featured: true },
      { label: 'Commercial mortgages', href: '/property-finance/commercial', featured: true },
      { label: 'Portfolio landlord finance', href: '/property-finance/portfolio', featured: true },
      { label: 'Auction finance', href: '/property-finance/auction', featured: false },
      { label: 'HMO finance', href: '/property-finance/hmo', featured: false },
      { label: 'Second charge & consolidation', href: '/property-finance/second-charge', featured: false },
    ],
  },
  {
    id: 'protection',
    label: 'Protection',
    href: '/protection',
    summary: 'Cover for households and businesses against death, illness and loss of income.',
    children: [
      { label: 'Life assurance', href: '/protection/life-assurance', featured: true },
      { label: 'Income protection', href: '/protection/income-protection', featured: true },
      { label: 'Critical illness', href: '/protection/critical-illness', featured: true },
      { label: 'Business protection', href: '/protection/business', featured: true },
      { label: 'Family income benefit', href: '/protection/family-income-benefit', featured: false },
      { label: 'Private medical insurance', href: '/protection/private-medical', featured: false },
      { label: 'Landlord insurance', href: '/protection/landlord', featured: false },
      { label: 'Key person cover', href: '/protection/business/key-person', featured: false },
      { label: 'Share protection', href: '/protection/business/share-protection', featured: false },
      { label: 'Relevant life cover', href: '/protection/business/relevant-life', featured: false },
    ],
  },
  {
    id: 'wills-estate-planning',
    label: 'Wills & Estate Planning',
    href: '/wills-estate-planning',
    summary: 'Wills, mirror wills, trust wills, and reviews as circumstances change.',
    children: [
      { label: 'Standard wills', href: '/wills-estate-planning/standard-wills', featured: true },
      { label: 'Mirror wills', href: '/wills-estate-planning/mirror-wills', featured: true },
      { label: 'Trust wills', href: '/wills-estate-planning/trust-wills', featured: true },
      { label: 'Reviews & updates', href: '/wills-estate-planning/reviews', featured: true },
    ],
  },
  {
    id: 'about',
    label: 'About',
    href: '/about',
    summary: 'The firm, the people and how we work.',
    children: [
      { label: 'Our company', href: '/about', featured: true },
      { label: 'Our team', href: '/about/team', featured: true },
      { label: 'How we work', href: '/about/how-we-work', featured: true },
      { label: 'Testimonials', href: '/about/testimonials', featured: true },
      { label: 'FAQs', href: '/about/faqs', featured: false },
    ],
  },
  {
    id: 'insights',
    label: 'Insights',
    href: '/insights',
    summary: 'Commentary on lending conditions, property finance and protection.',
    children: [],
  },
];

/** Utility actions. Client and adviser portals are external systems. */
export const utilityNav = [
  { label: 'Client login', href: 'https://client.guidemortgages.co.uk', external: true },
  { label: 'Advisor login', href: 'https://crm.guidemortgages.co.uk', external: true },
] as const;

export const primaryCta = { label: 'Speak to an adviser', href: '/contact' } as const;
