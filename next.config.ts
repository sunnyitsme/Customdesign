import type { NextConfig } from 'next';
import { redirects as legacyRedirects } from './content/redirects';

/**
 * GitHub Pages static preview.
 *
 * Set GUIDE_STATIC_EXPORT=1 to build the visual-review export. This is NOT the
 * production hosting architecture — it exists so the site can be looked at, and
 * the production server behaviour below is left intact for the real deployment.
 *
 * Unset (dev, and a normal `next build`) nothing here changes: no basePath, no
 * trailing slashes, image optimisation on, headers and redirects active, and
 * the site still runs at http://localhost:3000/ with no subpath.
 */
const staticExport = process.env.GUIDE_STATIC_EXPORT === '1';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const shared = {
  reactStrictMode: true,
  devIndicators: false,
  poweredByHeader: false,
  // `next dev` refuses to serve its own dev chunks to an origin it does not
  // recognise, which shows up as 403s on /_next/static/* and a page that never
  // hydrates. These cover reviewing the site from another device on the LAN or
  // through a container port mapping. Development only.
  allowedDevOrigins: ['localhost', '127.0.0.1', '192.168.0.0/16', '10.0.0.0/8'],
} satisfies NextConfig;

/**
 * Static export. Three things Next cannot carry into a static build, and what
 * happens to each — see docs/05-github-pages-preview.md.
 *
 *   headers()    no server, so the X-Robots-Tag cannot be sent. The noindex
 *                guarantee is carried by the <meta name="robots"> that
 *                app/layout.tsx already emits, plus a Disallow-all robots.txt.
 *   redirects()  no server, so the 55 legacy-URL redirects do not run. They
 *                remain defined in content/redirects.ts for production.
 *   images       the optimiser is a server. Marks and photography are served
 *                as their source files instead.
 *
 * trailingSlash makes each route export as `<route>/index.html`, which is what
 * GitHub Pages resolves reliably for a directory URL.
 */
const nextConfig: NextConfig = staticExport
  ? {
      ...shared,
      output: 'export',
      basePath,
      assetPrefix: basePath,
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {
      ...shared,
      images: {
        formats: ['image/avif', 'image/webp'],
      },
      // A review deployment must never be indexed. Vercel already sets this on
      // preview URLs; asserting it here means the guarantee travels with the app
      // rather than depending on the host, and it holds for any staging build.
      async headers() {
        if (process.env.VERCEL_ENV === 'production') return [];
        return [
          {
            source: '/:path*',
            headers: [
              { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
            ],
          },
        ];
      },

      // Legacy URL redirects, derived from each service page's own legacyUrls so
      // a renamed slug cannot orphan an inbound link. See docs/seo-route-migration.md.
      async redirects() {
        return legacyRedirects.map((entry) => ({ ...entry }));
      },
    };

export default nextConfig;
