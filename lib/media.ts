import { existsSync } from "node:fs";
import { join, normalize } from "node:path";

/**
 * Whether a file referenced by the media registry is actually present.
 *
 * Resolved on the server at render time so that dropping a correctly named file
 * into public/media/ activates it with no code change — a missing photograph is
 * a state of the page, not a different component tree.
 *
 * Results are memoised per process: a static build asks about the same handful
 * of paths once per page, and the answer cannot change mid-build.
 */
const cache = new Map<string, boolean>();

export function publicAssetExists(publicPath: string): boolean {
  const cached = cache.get(publicPath);
  if (cached !== undefined) return cached;

  // Registry paths are internal, but normalising and re-anchoring means a
  // malformed entry can only ever miss — never read outside public/.
  const relative = normalize(publicPath).replace(/^(\.\.(\/|\\|$))+/, "");
  const root = join(process.cwd(), "public");
  const resolved = join(root, relative);
  const result = resolved.startsWith(root) && existsSync(resolved);

  cache.set(publicPath, result);
  return result;
}

/**
 * Whether the homepage hero video is available.
 *
 * Needs the poster plus at least one encode; a video with no poster pops on
 * load, and a poster with no video is just the still placeholder.
 */
export function heroMediaExists(): boolean {
  return (
    publicAssetExists("/media/home/hero/guide-london-poster.webp") &&
    (publicAssetExists("/media/home/hero/guide-london.webm") ||
      publicAssetExists("/media/home/hero/guide-london.mp4"))
  );
}
