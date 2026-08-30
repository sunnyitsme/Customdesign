/**
 * Company positioning.
 *
 * SOURCE: /gfs-our-company in the migration pack, which positions Guide around
 * four areas — Residential Mortgages, Specialist Property Finance, Protection
 * Planning, and Will Writing & Estate Planning — and carries service summaries,
 * reasons to choose Guide, and mission/vision/values.
 *
 * The lead paragraph below restates that documented four-part structure and
 * nothing more. It makes no claim about experience, scale, independence or
 * results. Approved marketing copy does not exist yet, so `headline` and
 * `pullQuote` are null and render as labelled placeholders.
 */

export interface AboutContent {
  readonly eyebrow: string;
  /** Approved headline. Null until the firm supplies it. */
  readonly headline: string | null;
  /** Factual scope, derived from the migration pack. Safe to render. */
  readonly lead: string;
  readonly supporting: string;
  /** Approved positioning statement. Null until supplied. */
  readonly pullQuote: string | null;
  readonly cta: { readonly label: string; readonly href: string };
  readonly image: { readonly src: string | null; readonly alt: string };
}

export const about: AboutContent = {
  eyebrow: "About Guide",
  headline: null,
  lead: "Guide advises across four connected areas: residential mortgages, specialist property finance, protection, and wills and estate planning.",
  supporting:
    "Those areas are rarely separate in practice. A purchase raises questions about cover; a portfolio raises questions about structure; an estate raises questions about both. Advice given in one area is given with the others in view.",
  pullQuote: null,
  cta: { label: "Discover Guide", href: "/about" },
  image: {
    src: null,
    alt: "Placeholder — architectural or office photography required. See docs/01-content-and-assets-required.md §12.",
  },
};
