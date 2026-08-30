import type { Metadata } from "next";
import { Archivo, Source_Serif_4 } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SkipLink } from "@/components/layout/SkipLink";
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
    >
      <body>
        <SkipLink />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
