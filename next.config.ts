import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Legacy URL redirects (all 59 mapped) are added in a later phase from
  // content/redirects.ts. See docs/02-decisions.md D-002.
};

export default nextConfig;
