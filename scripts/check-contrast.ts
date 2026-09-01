/**
 * Contrast audit for the Guide palette.
 *
 * Reads app/globals.css, resolves both token layers, and checks every pairing
 * the design actually uses. This exists because a palette swap is exactly the
 * change that quietly breaks contrast: the tokens keep their names, every
 * component still compiles, and nothing tells you the secondary ink went from
 * 6.4:1 to 3.9:1.
 *
 * Two pairings are asserted to FAIL on purpose. Gold on the light ground and
 * Steel on navy are combinations the design must never use, and pinning them
 * here means a future palette edit that makes them look usable still has to
 * come past this file and the comments explaining why they are excluded.
 *
 *   node scripts/check-contrast.ts
 *
 * Exits non-zero if any requirement is unmet.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

type Level = "AA" | "AA-large" | "UI" | "FAIL";

const THRESHOLD: Record<Exclude<Level, "FAIL">, number> = {
  AA: 4.5, // body text
  "AA-large": 3, // >=24px, or >=18.66px bold
  UI: 3, // control boundaries and meaningful graphics (1.4.11)
};

/** Resolve `--name` through however many layers of var() indirection. */
function readTokens(css: string): Map<string, string> {
  const raw = new Map<string, string>();
  for (const match of css.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
    const name = match[1];
    const value = match[2];
    if (name === undefined || value === undefined) continue;
    const trimmed = value.trim();
    if (/^(#|var\(|rgba?\()/.test(trimmed)) raw.set(name, trimmed);
  }

  const resolve = (name: string, seen = new Set<string>()): string => {
    const value = raw.get(name);
    if (value === undefined) throw new Error(`Unknown token ${name}`);
    const ref = /^var\((--[a-z0-9-]+)\)$/.exec(value);
    if (ref === null) return value;
    const target = ref[1] as string;
    if (seen.has(target)) throw new Error(`Circular token ${name}`);
    seen.add(target);
    return resolve(target, seen);
  };

  const resolved = new Map<string, string>();
  for (const name of raw.keys()) resolved.set(name, resolve(name));
  return resolved;
}

function channel(value: number): number {
  const c = value / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const r = Number.parseInt(full.slice(0, 2), 16);
  const g = Number.parseInt(full.slice(2, 4), 16);
  const b = Number.parseInt(full.slice(4, 6), 16);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function ratio(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

interface Check {
  readonly what: string;
  readonly fg: string;
  readonly bg: string;
  readonly level: Level;
  /** Why this pairing exists, or why it is forbidden. */
  readonly note?: string;
}

const checks: readonly Check[] = [
  // --- Body and heading text on the light ground -------------------------
  { what: "ink on ground", fg: "--color-ink", bg: "--color-ground", level: "AA" },
  { what: "ink-secondary on ground", fg: "--color-ink-secondary", bg: "--color-ground", level: "AA" },
  { what: "ink-tertiary on ground", fg: "--color-ink-tertiary", bg: "--color-ground", level: "AA" },
  { what: "accent (links) on ground", fg: "--color-accent", bg: "--color-ground", level: "AA" },
  { what: "accent-hover on ground", fg: "--color-accent-hover", bg: "--color-ground", level: "AA" },

  // --- The raised light surface ------------------------------------------
  { what: "ink on surface", fg: "--color-ink", bg: "--color-surface", level: "AA" },
  { what: "ink-secondary on surface", fg: "--color-ink-secondary", bg: "--color-surface", level: "AA" },
  { what: "ink-tertiary on surface", fg: "--color-ink-tertiary", bg: "--color-surface", level: "AA" },
  { what: "accent on surface", fg: "--color-accent", bg: "--color-surface", level: "AA" },

  // --- Dark grounds -------------------------------------------------------
  { what: "ink-inverse on deep", fg: "--color-ink-inverse", bg: "--color-deep", level: "AA" },
  { what: "ink-inverse-secondary on deep", fg: "--color-ink-inverse-secondary", bg: "--color-deep", level: "AA" },
  { what: "accent-bright on deep", fg: "--color-accent-bright", bg: "--color-deep", level: "AA" },
  { what: "ink-inverse on deep-raised", fg: "--color-ink-inverse", bg: "--color-deep-raised", level: "AA" },
  { what: "ink-inverse-secondary on deep-raised", fg: "--color-ink-inverse-secondary", bg: "--color-deep-raised", level: "AA" },
  { what: "accent-bright on deep-raised", fg: "--color-accent-bright", bg: "--color-deep-raised", level: "AA" },

  // --- Gold, where it IS allowed ------------------------------------------
  {
    what: "premium (dark eyebrow) on deep",
    fg: "--color-premium",
    bg: "--color-deep",
    level: "AA",
    note: "Eyebrow tone=dark. The only place gold is text.",
  },
  { what: "premium on deep-raised", fg: "--color-premium", bg: "--color-deep-raised", level: "AA" },

  // --- Buttons ------------------------------------------------------------
  { what: "on-primary on primary (filled light button)", fg: "--color-on-primary", bg: "--color-primary", level: "AA" },
  { what: "on-primary on primary-hover", fg: "--color-on-primary", bg: "--color-primary-hover", level: "AA" },
  { what: "on-primary on ink (primary hover state)", fg: "--color-on-primary", bg: "--color-ink", level: "AA" },
  { what: "ink on ink-inverse (filled dark button)", fg: "--color-ink", bg: "--color-ink-inverse", level: "AA" },
  { what: "ink on accent-bright (dark button hover)", fg: "--color-ink", bg: "--color-accent-bright", level: "AA" },

  // --- Control boundaries (1.4.11) ---------------------------------------
  { what: "line-interactive on ground", fg: "--color-line-interactive", bg: "--color-ground", level: "UI" },
  { what: "line-interactive on surface", fg: "--color-line-interactive", bg: "--color-surface", level: "UI" },
  { what: "line-inverse-interactive on deep", fg: "--color-line-inverse-interactive", bg: "--color-deep", level: "UI" },
  { what: "line-inverse-interactive on deep-raised", fg: "--color-line-inverse-interactive", bg: "--color-deep-raised", level: "UI" },

  // --- Focus rings --------------------------------------------------------
  { what: "focus on ground", fg: "--color-focus", bg: "--color-ground", level: "UI" },
  { what: "focus on surface", fg: "--color-focus", bg: "--color-surface", level: "UI" },
  { what: "focus-inverse on deep", fg: "--color-focus-inverse", bg: "--color-deep", level: "UI" },
  { what: "focus-inverse on deep-raised", fg: "--color-focus-inverse", bg: "--color-deep-raised", level: "UI" },

  // --- Forbidden pairings, asserted to fail -------------------------------
  {
    what: "premium on ground",
    fg: "--color-premium",
    bg: "--color-ground",
    level: "FAIL",
    note: "Gold is never text or an icon on a light surface. Hairlines only.",
  },
  {
    what: "accent-hover (steel) on deep",
    fg: "--color-accent-hover",
    bg: "--color-deep",
    level: "FAIL",
    note: "Steel is a light-surface colour. accent-bright carries dark grounds.",
  },
];

const css = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");
const tokens = readTokens(css);

const get = (name: string): string => {
  const value = tokens.get(name);
  if (value === undefined) throw new Error(`Token ${name} is not defined`);
  if (!value.startsWith("#"))
    throw new Error(`Token ${name} is not a hex colour (${value})`);
  return value;
};

let failures = 0;
const rows: string[] = [];

for (const check of checks) {
  const value = ratio(get(check.fg), get(check.bg));
  const shown = value.toFixed(2).padStart(6);

  if (check.level === "FAIL") {
    const ok = value < THRESHOLD.AA;
    if (!ok) failures += 1;
    rows.push(
      `  ${ok ? "excluded" : "PROBLEM "}  ${shown}  ${check.what}${
        ok ? "" : "  <- now passes; the exclusion may be stale"
      }`,
    );
    continue;
  }

  const required = THRESHOLD[check.level];
  const ok = value >= required;
  if (!ok) failures += 1;
  rows.push(
    `  ${ok ? "pass    " : "FAIL    "}  ${shown}  ${check.what} (needs ${required})`,
  );
}

console.log("\nGuide palette — contrast audit\n");
console.log(rows.join("\n"));
console.log(
  `\n${checks.length} pairings checked, ${failures} problem(s).\n` +
    `"excluded" rows are combinations the design forbids; they are meant to be below 4.5.\n`,
);

if (failures > 0) process.exit(1);
