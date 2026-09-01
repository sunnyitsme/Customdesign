import { AboutGuide } from "@/components/home/AboutGuide";
import { CaseStudies } from "@/components/home/CaseStudies";
import { ConsultationCta } from "@/components/home/ConsultationCta";
import { CredibilityStats } from "@/components/home/CredibilityStats";
import { Experts } from "@/components/home/Experts";
import { Hero } from "@/components/home/Hero";
import { HowGuideWorks } from "@/components/home/HowGuideWorks";
import { Insights } from "@/components/home/Insights";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { ReviewsMarquee } from "@/components/home/ReviewsMarquee";
import { ServiceDivisions } from "@/components/home/ServiceDivisions";
import {
  displayableProviders,
  showingUnpermissionedPreview,
} from "@/content/providers";
import { heroMediaExists } from "@/lib/media";

/**
 * Homepage.
 *
 * The order is a rhythm, not a list. Dark and light alternate so no two
 * adjacent sections read the same way, and section heights vary deliberately:
 * the hero and the case studies are the tall moments, the lender marquee is
 * the shortest, and the process sits on a raised surface to separate the two
 * light sections either side of it without a third dark band.
 *
 *   hero            dark, cinematic
 *   divisions       light, editorial index
 *   about           light, image-led and asymmetric
 *   stats           DARK, short, typographic
 *   lenders         light, shortest section on the page
 *   experts         light, tall portraits, offset
 *   cases           DARK, tallest section
 *   reviews         light, very slow motion
 *   process         raised surface, ordered sequence
 *   insights        light, unequal editorial weighting
 *   cta             DARK, the closing statement
 *
 * Only the two marquees and the divisions index are client components; the rest
 * render on the server.
 */
export default function HomePage() {
  return (
    <>
      <Hero hasMedia={heroMediaExists()} />
      <ServiceDivisions />
      <AboutGuide />
      <CredibilityStats />
      {/* Permission is resolved here, on the server, where VERCEL_ENV is real.
          See LogoMarquee for why it cannot be resolved inside the component. */}
      <LogoMarquee
        marks={displayableProviders()}
        preview={showingUnpermissionedPreview()}
      />
      <Experts />
      <CaseStudies />
      <ReviewsMarquee />
      <HowGuideWorks />
      <Insights />
      <ConsultationCta />
    </>
  );
}
