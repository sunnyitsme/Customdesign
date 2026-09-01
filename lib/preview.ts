/**
 * Static-preview environment.
 *
 * The GitHub Pages build is a VISUAL REVIEW deployment, not the production
 * hosting architecture. Two facts about it have to reach the browser, so both
 * are NEXT_PUBLIC_: a non-public variable is `undefined` in a client bundle,
 * which would silently give the wrong answer at exactly the wrong moment.
 *
 * Nothing here is read in normal builds. `next dev` and a normal `next build`
 * leave both unset, so basePath is "" and the preview behaviour is off — the
 * site runs at http://localhost:3000/ with no subpath, exactly as before.
 */

/**
 * Repository subpath the preview is served from, e.g. "/Custom-design".
 * Empty everywhere else.
 *
 * Next applies basePath to <Link> and to /_next/* on its own. It does NOT
 * rewrite a raw string in a `src` attribute, so anything hand-written — the
 * hero <video>, its <source> elements — has to go through `assetPath`.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * True only in the GitHub Pages preview build.
 *
 * Gates preview-safe fallbacks for things that genuinely cannot run on static
 * hosting. It must never be used to weaken a production rule — the content
 * gate, the logo permission gate and the review dataset are unaffected by it.
 */
export const isStaticPreview = process.env.NEXT_PUBLIC_STATIC_PREVIEW === "1";

/** Prefix a /public asset path with the deployment's basePath. */
export const assetPath = (path: string): string => `${basePath}${path}`;
