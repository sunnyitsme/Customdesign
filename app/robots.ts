import type { MetadataRoute } from "next";

const BASE = process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://guidefs.co.uk";

/**
 * Evaluated at build time, not per request.
 *
 * Required by `output: export` (the static preview has no server), and it costs
 * nothing elsewhere: VERCEL_ENV is fixed for the life of a deployment, so a
 * build-time read gives the same answer a request-time read would.
 */
export const dynamic = "force-static";

/**
 * Robots.
 *
 * Everything except a production deployment is disallowed outright. A preview
 * URL carrying placeholder content and unapproved regulatory wording must never
 * be indexed, and that guarantee should not depend on remembering to configure
 * the host.
 *
 * Production indexing is a deliberate act: it turns on only when VERCEL_ENV is
 * "production", which is also the build the content gate refuses while
 * launch-blocking placeholders remain. Both locks have to be released before
 * anything is indexable.
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env["VERCEL_ENV"] === "production";

  if (!isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
