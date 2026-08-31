/**
 * Content gate.
 *
 * Always prints the outstanding-content report so unapproved placeholders are
 * impossible to miss during a build.
 *
 * Strict mode REFUSES the build. It turns on when either is true:
 *
 *   - VERCEL_ENV === "production"  — a production deployment, on any host that
 *     sets it. This is the important one: production is protected by default,
 *     with nothing for anyone to remember to configure. A preview deployment
 *     (VERCEL_ENV="preview") builds normally and renders its placeholders,
 *     which is the whole point of a review environment.
 *
 *   - GUIDE_STRICT_CONTENT === "1" — explicit opt-in, for checking the gate
 *     locally or in CI.
 *
 * Note the asymmetry: preview cannot weaken production, because production
 * strictness is derived from the deployment environment rather than from a
 * variable a preview could override. Setting GUIDE_STRICT_CONTENT=0 does not
 * disable it either — only the two conditions above are consulted.
 */
import {
  pendingContent,
  unresolved,
  unresolvedBlocking,
} from "../content/pending.ts";

const isProductionDeploy = process.env["VERCEL_ENV"] === "production";
const explicitStrict = process.env["GUIDE_STRICT_CONTENT"] === "1";
const strict = isProductionDeploy || explicitStrict;

const open = unresolved();
const blocking = unresolvedBlocking();

const rule = "=".repeat(72);
console.log(
  `\n${rule}\nCONTENT GATE — ${open.length} of ${pendingContent.length} items unresolved`,
);
console.log(
  `Environment: ${process.env["VERCEL_ENV"] ?? "local"} · strict: ${strict ? "yes" : "no"}\n${rule}`,
);

for (const item of open) {
  console.log(
    `  [${item.blocks.toUpperCase().padEnd(6)}] ${item.id}\n           ${item.what}\n           from: ${item.from}`,
  );
}

if (open.length === 0) console.log("  All content approved.");
console.log(rule);

if (blocking.length > 0) {
  const msg = `${blocking.length} item(s) block a production launch.`;
  if (strict) {
    console.error(
      `\nBUILD REFUSED: ${msg}\n` +
        (isProductionDeploy
          ? "This is a production deployment. Resolve the items above, or deploy to a preview environment for review.\n"
          : "GUIDE_STRICT_CONTENT=1 is set. Unset it for a development build.\n"),
    );
    process.exit(1);
  }
  console.log(
    `\nWARNING: ${msg}\nThis build renders development placeholders and is for review only.\n`,
  );
}
