/**
 * Build the GitHub Pages static preview.
 *
 * This is a VISUAL REVIEW build, not the production hosting architecture. It
 * exists so the site can be looked at on a URL; the server-dependent parts of
 * the project are left in place and simply do not run here.
 *
 *   node scripts/build-pages.mjs
 *
 * Output: out/  — ready to upload as a Pages artifact.
 *
 * Base path defaults to the repository subpath the site is served from and can
 * be overridden, so the same script works if the repo is ever renamed or served
 * from a user/organisation site at the root:
 *
 *   PAGES_BASE_PATH="" node scripts/build-pages.mjs
 */
import { spawnSync } from "node:child_process";
import { writeFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const basePath = process.env.PAGES_BASE_PATH ?? "/Custom-design";

if (basePath !== "" && !basePath.startsWith("/")) {
  console.error(`PAGES_BASE_PATH must start with "/" or be empty. Got: ${basePath}`);
  process.exit(1);
}

const env = {
  ...process.env,
  GUIDE_STATIC_EXPORT: "1",
  NEXT_PUBLIC_BASE_PATH: basePath,
  NEXT_PUBLIC_STATIC_PREVIEW: "1",
  // Deliberately NOT set: VERCEL_ENV and GUIDE_STRICT_CONTENT. This is a review
  // build, so development placeholders should render and be visible. The
  // production content gate is untouched and still refuses a launch build while
  // launch-blocking items remain.
};

const run = (command, args) => {
  const result = spawnSync(command, args, { stdio: "inherit", env });
  if (result.status !== 0) process.exit(result.status ?? 1);
};

console.log(`\nBuilding the GitHub Pages preview at basePath "${basePath}"\n`);

// The content report still runs — a reviewer should see what is outstanding.
// It is non-blocking outside a production build, which is the point.
run("node", ["scripts/check-pending.ts"]);
run("node", ["scripts/check-contrast.ts"]);
run("npx", ["next", "build"]);

const out = join(process.cwd(), "out");
if (!existsSync(out)) {
  console.error("\nExpected out/ to exist after the export. It does not.");
  process.exit(1);
}

/**
 * Without this, GitHub Pages runs the output through Jekyll, which ignores
 * every path beginning with an underscore — including _next/, where all the
 * CSS and JS live. The site would deploy successfully and render unstyled.
 */
writeFileSync(join(out, ".nojekyll"), "");

const pages = readdirSync(out, { recursive: true }).filter((f) =>
  String(f).endsWith(".html"),
).length;

console.log(`\nExported ${pages} HTML pages to out/ (.nojekyll written)`);
console.log(
  basePath
    ? `Serve-under: ${basePath}/ — opening out/index.html directly will not resolve assets.\n`
    : "\n",
);
