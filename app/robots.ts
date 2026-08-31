import type { MetadataRoute } from "next";

const BASE = process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://guidefs.co.uk";

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
