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
 * Which hero encodes have been supplied.
 *
 * Only existing files are listed, because a <source> pointing at a missing
 * encode is a real 404 on every page load — the browser requests each source in
 * order before falling through to the next. The webm was not supplied with the
 * mp4, and the static export surfaced exactly that.
 */
export function heroVideoSources(): readonly { src: string; type: string }[] {
  return [
    { src: "/media/home/hero/guide-london.webm", type: "video/webm" },
    { src: "/media/home/hero/guide-london.mp4", type: "video/mp4" },
  ].filter((source) => publicAssetExists(source.src));
}

/**
 * Whether the poster still is available.
 *
 * Separate because it is genuinely optional. Without it the hero must not
 * reference the file at all — a `poster` attribute and an <img> pointing at a
 * missing asset are two 404s and a broken image, which is exactly what the
 * static export surfaced.
 */
export function heroPosterExists(): boolean {
  return publicAssetExists("/media/home/hero/guide-london-poster.webp");
}
