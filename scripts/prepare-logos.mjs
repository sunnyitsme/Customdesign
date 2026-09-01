/**
 * Prepare provider marks for the web.
 *
 * Input:  public/media/lenders/        — exactly as the firm supplied them.
 * Output: public/media/lenders/web/    — what the site renders.
 *
 * The supplied files each sit on a common ~385x311 canvas with the artwork
 * centred inside a lot of transparent padding. That padding is the whole
 * problem for a marquee: the slot is 176x48, so a canvas fitted into it by
 * `object-fit: contain` renders about 60px wide and the wordmark inside it
 * becomes illegible.
 *
 * So each file is trimmed to its own artwork. That removes empty transparent
 * margin and nothing else — no crop into the mark, no scaling of one axis, no
 * recolouring. The trimmed artwork then fills the slot properly, and because
 * every mark shares one slot the strip reads as normalised while each keeps its
 * true aspect ratio.
 *
 * Originals are never modified, moved or renamed. Re-run after adding or
 * replacing a file:
 *
 *   node scripts/prepare-logos.mjs
 */
import { existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const SRC = join(process.cwd(), "public", "media", "lenders");
const OUT = join(SRC, "web");

if (existsSync(OUT)) rmSync(OUT, { recursive: true });
mkdirSync(OUT, { recursive: true });

const files = readdirSync(SRC)
  .filter((f) => f.toLowerCase().endsWith(".png"))
  .sort();

const rows = [];
for (const file of files) {
  const info = await sharp(join(SRC, file))
    .trim({ threshold: 1 })
    .png({ compressionLevel: 9 })
    .toFile(join(OUT, file));
  rows.push({ file, w: info.width, h: info.height, kb: +(info.size / 1024).toFixed(1) });
}

const aspects = rows.map((r) => r.w / r.h);
console.log(`${rows.length} marks prepared into public/media/lenders/web/\n`);
for (const r of rows) {
  console.log(
    `  ${r.file.padEnd(30)} ${String(`${r.w}x${r.h}`).padEnd(10)} ${String((r.w / r.h).toFixed(2)).padStart(5)}:1  ${r.kb}KB`,
  );
}
console.log(
  `\naspect range ${Math.min(...aspects).toFixed(2)}:1 -> ${Math.max(...aspects).toFixed(2)}:1`,
);
