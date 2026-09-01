import Image from "next/image";
import { DrawingPlate } from "@/components/ui/DrawingPlate";
import type { HeroImage } from "@/content/media";
import { publicAssetExists } from "@/lib/media";
import { assetPath } from "@/lib/preview";

/**
 * A page's hero photograph, or its placeholder.
 *
 * One component so that "we have the picture" and "we do not have the picture
 * yet" are the same box at the same crop. The caller supplies the aspect
 * wrapper and this fills it absolutely, which is what makes the swap
 * shift-free: adding a file changes pixels, never layout.
 *
 * Responsive crops come from `sizes` plus object-fit — next/image generates the
 * widths and serves AVIF/WebP, so the firm supplies one high-resolution JPEG
 * and nothing needs pre-cropping. `focal` keeps the subject in frame as the
 * aspect ratio changes between breakpoints.
 *
 * `priority` is for above-the-fold heroes only. Marking every hero priority
 * would defeat the point and delay the LCP it is meant to protect.
 */
export function HeroMedia({
  image,
  tone = "dark",
  priority = false,
  sizes = "(min-width: 1024px) 45vw, 100vw",
  scrim = false,
  className = "",
}: {
  image: HeroImage;
  tone?: "light" | "dark";
  priority?: boolean;
  sizes?: string;
  /** Darken the plate where type sits over it. */
  scrim?: boolean;
  className?: string;
}) {
  if (!publicAssetExists(image.src)) {
    return (
      <DrawingPlate label={image.brief} tone={tone} className={className} />
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <Image
        src={assetPath(image.src)}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition: image.focal }}
      />
      {scrim && (
        <div aria-hidden="true" className="absolute inset-0 bg-deep/45" />
      )}
    </div>
  );
}
