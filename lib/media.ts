import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Whether the hero video assets have been supplied.
 *
 * Resolved on the server at render time so that dropping the three files into
 * public/media/hero/ activates the video path with no code change — the
 * placeholder is a state, not a different component tree.
 */
export function heroMediaExists(): boolean {
  const dir = join(process.cwd(), "public", "media", "hero");
  return (
    existsSync(join(dir, "guide-london-poster.webp")) &&
    (existsSync(join(dir, "guide-london.webm")) ||
      existsSync(join(dir, "guide-london.mp4")))
  );
}
