import { expect, test } from "@playwright/test";

/**
 * Final capture set for the complete homepage.
 *
 * Capture only — no assertions about design, beyond guards that keep a capture
 * from silently being of the wrong thing.
 */

const OUT = "shots/final";

/** Put a section at the top of the viewport and let motion settle. */
async function toSection(
  page: import("@playwright/test").Page,
  headingId: string,
  offset = 8,
) {
  const top = await page.evaluate(
    ([id, off]) => {
      const section = document.getElementById(id as string)?.closest("section");
      if (!section) return null;
      return section.getBoundingClientRect().top + window.scrollY - (off as number);
    },
    [headingId, offset] as const,
  );
  expect(top, `section for #${headingId} not found`).not.toBeNull();
  await page.evaluate((y) => window.scrollTo({ top: y as number, behavior: "instant" }), top);
  await page.waitForTimeout(650);
}

test("A — full homepage, 1440", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/A-full-1440.png`, fullPage: true });
});

test("B — full homepage, 390", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/B-full-390.png`, fullPage: true });
});

test("C to O — sections at 1440", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.waitForTimeout(700);

  // C — hero, at rest, header still transparent.
  const header = await page.locator("header").evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(header, "hero capture must be at initial scroll").toBe("rgba(0, 0, 0, 0)");
  await page.screenshot({ path: `${OUT}/C-hero-1440.png` });

  const sections: readonly [string, string][] = [
    ["divisions-heading", "D-services-1440"],
    ["about-heading", "E-about-1440"],
    ["stats-heading", "F-statistics-1440"],
    ["providers-heading", "G-lender-marquee-1440"],
    ["experts-heading", "H-experts-1440"],
    ["cases-heading", "I-case-studies-1440"],
    ["reviews-heading", "J-reviews-marquee-1440"],
    ["process-heading", "K-how-guide-works-1440"],
    ["insights-heading", "L-insights-1440"],
    ["cta-heading", "M-final-cta-1440"],
  ];

  for (const [id, name] of sections) {
    await toSection(page, id);
    await page.screenshot({ path: `${OUT}/${name}.png` });
  }

  // N — footer, desktop.
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/N-footer-1440.png` });
});

test("O — footer, mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/O-footer-390.png`, fullPage: false });
});

test("P — reviews marquee, hovered and paused", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "networkidle" });
  await toSection(page, "reviews-heading");

  const marquee = page.locator('[role="group"][aria-label="Client reviews"]');
  await marquee.hover();
  await page.waitForTimeout(400);

  // Prove the capture really is of a paused marquee, not a lucky frame.
  await expect(marquee).toHaveAttribute("data-paused", "true");
  const held = await marquee.evaluate((el) => el.scrollLeft);
  await page.waitForTimeout(900);
  const stillHeld = await marquee.evaluate((el) => el.scrollLeft);
  expect(Math.abs(stillHeld - held)).toBeLessThan(1);

  await page.screenshot({ path: `${OUT}/P-reviews-hovered-paused-1440.png` });
});

test("mobile sections at 390", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/M1-hero-390.png` });

  for (const [id, name] of [
    ["divisions-heading", "M2-services-390"],
    ["reviews-heading", "M3-reviews-390"],
    ["process-heading", "M4-process-390"],
    ["cta-heading", "M5-cta-390"],
  ] as const) {
    await toSection(page, id);
    await page.screenshot({ path: `${OUT}/${name}.png` });
  }

  await page.evaluate(() =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }),
  );
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/M6-footer-390.png` });
});

test("tablet spot-checks at 768 and 430", async ({ page }) => {
  for (const width of [768, 430]) {
    await page.setViewportSize({ width, height: width === 768 ? 1024 : 932 });
    await page.goto("/", { waitUntil: "networkidle" });
    await toSection(page, "divisions-heading");
    await page.screenshot({ path: `${OUT}/Q-services-${width}.png` });
    await toSection(page, "reviews-heading");
    await page.screenshot({ path: `${OUT}/Q-reviews-${width}.png` });
  }
});
