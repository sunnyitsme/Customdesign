/**
 * Review screenshots.
 *
 * Not part of the test suite — this is the "show me what it looks like" pass.
 * Run a server first (npm run preview), then: node scripts/capture.mjs [outDir]
 */
import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";

const BASE = process.env.CAPTURE_BASE ?? "http://localhost:3000";
const OUT = process.argv[2] ?? "screenshots";

const shots = [
  { name: "01-home-desktop", path: "/", w: 1440, h: 900, full: true },
  { name: "02-home-mobile", path: "/", w: 390, h: 844, full: true },
  { name: "03-hub-mortgages", path: "/mortgages", w: 1440, h: 900, full: true },
  { name: "04-hub-property-finance", path: "/property-finance", w: 1440, h: 900, full: true },
  { name: "05-hub-protection", path: "/protection", w: 1440, h: 900, full: true },
  { name: "06-hub-wills", path: "/wills-estate-planning", w: 1440, h: 900, full: true },
  { name: "07-child-mortgages-first-time-buyers", path: "/mortgages/first-time-buyers", w: 1440, h: 900, full: true },
  { name: "08-child-property-finance-bridging", path: "/property-finance/bridging", w: 1440, h: 900, full: true },
  { name: "09-contact", path: "/contact", w: 1440, h: 900, full: true },
];

mkdirSync(OUT, { recursive: true });

// Same launch options as playwright.config.ts: this sandbox pins a Chromium
// build, and Chromium ignores no_proxy so local traffic would otherwise be sent
// through the agent proxy.
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium",
  args: ["--no-proxy-server"],
});

for (const shot of shots) {
  // 1x for full-page shots: at 1440 wide they are already legible, and 2x turns
  // a review set into ~20MB of PNG.
  const page = await browser.newPage({
    viewport: { width: shot.w, height: shot.h },
  });
  await page.goto(BASE + shot.path, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${OUT}/${shot.name}.png`, fullPage: shot.full });
  await page.close();
  console.log("captured", shot.name);
}

// Header states: transparent over the homepage hero, then solid after scroll.
{
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.screenshot({
    path: `${OUT}/10-header-transparent.png`,
    clip: { x: 0, y: 0, width: 1440, height: 140 },
  });
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(700);
  await page.screenshot({
    path: `${OUT}/11-header-scrolled.png`,
    clip: { x: 0, y: 0, width: 1440, height: 140 },
  });
  console.log("captured header states");

  // Footer.
  await page.evaluate(() =>
    window.scrollTo(0, document.body.scrollHeight),
  );
  await page.waitForTimeout(700);
  // Hide the fixed header first: an element screenshot scrolls the target into
  // view, and the header then sits on top of it in the capture.
  await page.evaluate(() => {
    const header = document.querySelector("header");
    if (header instanceof HTMLElement) header.style.visibility = "hidden";
  });
  // getByRole, not locator("footer"): review cards use <footer> internally, so
  // the tag alone is ambiguous. The site footer is the contentinfo landmark.
  const footer = page.getByRole("contentinfo");
  await footer.screenshot({ path: `${OUT}/12-footer.png` });
  console.log("captured footer");
  await page.close();
}

// Brand mark in each of its contexts.
{
  // Internal page: the header is solid from the first paint here, not scrolled.
  const desk = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  await desk.goto(BASE + "/mortgages", { waitUntil: "networkidle" });
  await desk.screenshot({
    path: `${OUT}/13-header-internal.png`,
    clip: { x: 0, y: 0, width: 1440, height: 140 },
  });
  await desk.close();

  const mob = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  await mob.goto(BASE + "/", { waitUntil: "networkidle" });
  await mob.screenshot({
    path: `${OUT}/14-header-mobile.png`,
    clip: { x: 0, y: 0, width: 390, height: 110 },
  });

  await mob.getByRole("button", { name: "Open navigation menu" }).click();
  await mob.waitForTimeout(400);
  await mob.screenshot({ path: `${OUT}/15-mobile-menu-open.png` });

  await mob.keyboard.press("Escape");
  await mob.waitForTimeout(300);
  await mob.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await mob.waitForTimeout(700);
  await mob.evaluate(() => {
    const header = document.querySelector("header");
    if (header instanceof HTMLElement) header.style.visibility = "hidden";
  });
  await mob.getByRole("contentinfo").screenshot({ path: `${OUT}/16-footer-mobile.png` });
  console.log("captured brand contexts");
  await mob.close();
}

await browser.close();
console.log(`\n${shots.length + 7} screenshots in ${OUT}/`);
