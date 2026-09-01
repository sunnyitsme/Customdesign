import type { MetadataRoute } from "next";
import { allRoutes } from "@/lib/routes";

const BASE = process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://guidefs.co.uk";

/**
 * Evaluated at build time. Required by `output: export`; the route list is
 * derived from content, which cannot change between build and request.
 */
export const dynamic = "force-static";

/**
 * Sitemap.
 *
 * Generated from lib/routes.ts, so it cannot list a page that does not exist or
 * omit one that does.
 *
 * Priority reflects the information architecture: hubs above their children,
 * legal and calculator pages below both. Nothing here makes a page indexable on
 * its own — robots.ts still blocks everything outside a production deployment.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return allRoutes.map((route) => {
    const depth = route === "/" ? 0 : route.split("/").filter(Boolean).length;
    const priority = route === "/" ? 1 : depth === 1 ? 0.8 : depth === 2 ? 0.6 : 0.4;
    return {
      url: `${BASE}${route}`,
      lastModified: now,
      changeFrequency: depth <= 1 ? "monthly" : "yearly",
      priority,
    };
  });
}
