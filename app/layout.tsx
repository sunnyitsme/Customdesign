import type { Metadata } from "next";
import { Archivo, Source_Serif_4 } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SkipLink } from "@/components/layout/SkipLink";
import { MotionRuntime } from "@/components/motion/MotionRuntime";
import { site } from "@/content/site";
import "./globals.css";

/* Self-hosted at build time by next/font — no render-blocking third-party
   request and no layout shift. Both are variable faces. */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Mortgage, property finance, protection and estate planning advice`,
    template: `%s — ${site.name}`,
  },
  description:
    "Guide Financial Services advises on residential mortgages, specialist property finance, protection and wills and estate planning.",
  robots: { index: false, follow: false }, // Pre-launch build.
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-GB"
      className={`${archivo.variable} ${sourceSerif.variable}`}
      // The pre-paint script below sets data-motion on this element before React
      // hydrates, so the client <html> intentionally differs from the server's.
      // This is the standard pattern for a pre-paint theme/motion switch (it is
      // what next-themes does); the attribute is the only difference and React
      // must be told not to treat it as a mismatch.
      suppressHydrationWarning
    >
      <head>
        {/* Pre-paint motion switch.
            Inline and synchronous on purpose: it must run before the first
            paint, or a reveal would flash visible and then hide. It is the ONLY
            thing that turns the reveal system on, and it declines to when the
            viewer prefers reduced motion. If it never runs, every [data-reveal]
            stays plainly visible — see components/motion/Reveal.tsx. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.setAttribute('data-motion','on')}}catch(e){}",
          }}
        />
      </head>
      <body>
        <SkipLink />
        <MotionRuntime />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
