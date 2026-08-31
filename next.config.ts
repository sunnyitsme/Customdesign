import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // `next dev` refuses to serve its own dev chunks to an origin it does not
  // recognise, which shows up as 403s on /_next/static/* and a page that never
  // hydrates. These cover reviewing the site from another device on the LAN or
  // through a container port mapping. Development only.
  allowedDevOrigins: ['localhost', '127.0.0.1', '192.168.0.0/16', '10.0.0.0/8'],
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

  // Legacy URL redirects (all 59 mapped) are added in a later phase from
  // content/redirects.ts. See docs/02-decisions.md D-002.
};

export default nextConfig;
