/**
 * Insights.
 *
 * THE CURRENT SITE HAS NO BLOG, NEWS OR INSIGHTS SECTION. Nothing in the
 * migration pack is an article, so no title, standfirst, author or date is
 * invented here.
 *
 * `category` is populated because the categories describe Guide's documented
 * service lines rather than asserting that an article exists. Everything else
 * is null and renders as a labelled placeholder.
 *
 * Decision needed from the firm: supply at least three approved articles, or
 * confirm the section launches hidden. The navigation includes an Insights hub
 * either way.
 */

export type InsightCategory =
  | "Mortgage guide"
  | "Property finance"
  | "Protection"
  | "Estate planning"
  | "Market insight";

export interface Insight {
  readonly id: string;
  readonly category: InsightCategory;
  /** Approved title. Null until supplied. */
  readonly title: string | null;
  /** Approved standfirst. Null until supplied. */
  readonly standfirst: string | null;
  /** ISO 8601. Null until supplied. */
  readonly publishedAt: string | null;
  readonly href: string | null;
  readonly image: { readonly src: string | null; readonly alt: string };
}

export const insights: readonly Insight[] = [
  {
    id: "insight-1",
    category: "Mortgage guide",
    title: null,
    standfirst: null,
    publishedAt: null,
    href: null,
    image: { src: null, alt: "Placeholder — editorial photography required." },
  },
  {
    id: "insight-2",
    category: "Property finance",
    title: null,
    standfirst: null,
    publishedAt: null,
    href: null,
    image: { src: null, alt: "Placeholder — editorial photography required." },
  },
  {
    id: "insight-3",
    category: "Estate planning",
    title: null,
    standfirst: null,
    publishedAt: null,
    href: null,
    image: { src: null, alt: "Placeholder — editorial photography required." },
  },
];
