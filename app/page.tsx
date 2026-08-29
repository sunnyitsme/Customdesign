import { Hero } from '@/components/home/Hero';
import { ServiceDivisions } from '@/components/home/ServiceDivisions';
import { heroMediaExists } from '@/lib/media';

/**
 * Homepage — Phase 1.
 *
 * Only the hero and the four core divisions are built. The remaining sections
 * (positioning, statistics, lender marquee, advisers, case studies, social
 * proof, process, insights, footer) are deliberately not started until this
 * visual direction is reviewed. See docs/03-phase-1-plan.md.
 */
export default function HomePage() {
  return (
    <>
      <Hero hasMedia={heroMediaExists()} />
      <ServiceDivisions />
    </>
  );
}
