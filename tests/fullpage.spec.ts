import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/** The complete homepage, at every supported width. */
const WIDTHS = [1920, 1440, 1280, 1024, 768, 430, 390];

for (const width of WIDTHS) {
  test(`${width}px — no horizontal overflow anywhere on the page`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });
    // Walk the whole page so lazy/sticky content settles at every scroll depth.
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(300);

    const result = await page.evaluate(() => {
      const de = document.documentElement;
      const offenders: { tag: string; cls: string; right: number }[] = [];
      for (const el of Array.from(document.querySelectorAll("body *"))) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        // Marquee tracks are wider than the viewport by design; they live
        // inside a scroll container, so they cannot overflow the page.
        if (el.closest("[data-marquee]")) continue;
        if (r.right > de.clientWidth + 1) {
          offenders.push({
            tag: el.tagName,
            cls: String((el as HTMLElement).className).slice(0, 60),
            right: Math.round(r.right),
          });
        }
      }
      return { overflow: de.scrollWidth - de.clientWidth, offenders: offenders.slice(0, 5) };
    });

    if (result.offenders.length > 0) console.log(width, JSON.stringify(result.offenders, null, 1));
    expect(result.overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(0);
  });
}

for (const width of [1440, 768, 390]) {
  test(`${width}px — axe, no serious or critical violations`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const serious = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    if (serious.length > 0) {
      console.log(
        JSON.stringify(
          serious.map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.length })),
          null,
          2,
        ),
      );
    }
    expect(serious).toEqual([]);
  });
}

test("heading hierarchy — one h1, no skipped levels", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const levels = await page.$$eval("h1,h2,h3,h4,h5,h6", (els) =>
    els.map((e) => Number(e.tagName[1])),
  );
  expect(levels.filter((l) => l === 1)).toHaveLength(1);
  for (let i = 1; i < levels.length; i++) {
    expect(levels[i]! - levels[i - 1]!, `skipped level at index ${i}`).toBeLessThanOrEqual(1);
  }
});

test("landmarks — banner, main, contentinfo all present and unique", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByRole("banner")).toHaveCount(1);
  await expect(page.getByRole("main")).toHaveCount(1);
  await expect(page.getByRole("contentinfo")).toHaveCount(1);
});

test("every section below the hero is labelled", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const unlabelled = await page.$$eval("main section", (sections) =>
    sections
      .filter((s) => !s.getAttribute("aria-labelledby") && !s.getAttribute("aria-label"))
      .map((s) => s.className.slice(0, 40)),
  );
  expect(unlabelled).toEqual([]);
});
