import { expect, test } from "@playwright/test";

/**
 * Marquee behaviour.
 *
 * Both marquees share one engine (components/ui/Marquee.tsx): a natively
 * scrollable viewport advanced by requestAnimationFrame, with the items
 * rendered twice so the position can wrap by exactly half the track width.
 *
 * These tests measure real scroll positions over real time rather than
 * asserting on classes, because the properties that matter — that it moves,
 * that both move at one speed, that it stops dead on hover, that the loop never
 * jumps — are only observable in motion.
 */

const LENDERS = '[role="group"][aria-label="Lenders and providers we work with"]';
const REVIEWS = '[role="group"][aria-label="Client reviews"]';

/** Scroll a marquee into view and let the loop settle. */
async function reveal(page: import("@playwright/test").Page, selector: string) {
  await page.locator(selector).scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
}

const scrollLeft = (page: import("@playwright/test").Page, selector: string) =>
  page.locator(selector).evaluate((el) => el.scrollLeft);

/** Pixels travelled over a window of time. */
async function travel(
  page: import("@playwright/test").Page,
  selector: string,
  ms: number,
) {
  const before = await scrollLeft(page, selector);
  await page.waitForTimeout(ms);
  const after = await scrollLeft(page, selector);
  // The loop wraps by subtracting half the track, so a negative delta means a
  // wrap happened rather than that it moved backwards.
  return after >= before ? after - before : null;
}

test.describe("autoplay", () => {
  test("both marquees scroll on their own, at one shared speed", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });

    const WINDOW_MS = 2000;
    await reveal(page, LENDERS);
    const lenderTravel = await travel(page, LENDERS, WINDOW_MS);

    await reveal(page, REVIEWS);
    const reviewTravel = await travel(page, REVIEWS, WINDOW_MS);

    expect(lenderTravel, "lender marquee did not move").not.toBeNull();
    expect(reviewTravel, "review marquee did not move").not.toBeNull();

    const lenderSpeed = lenderTravel! / (WINDOW_MS / 1000);
    const reviewSpeed = reviewTravel! / (WINDOW_MS / 1000);
    console.log(
      `lenders ${lenderSpeed.toFixed(1)}px/s, reviews ${reviewSpeed.toFixed(1)}px/s`,
    );

    // Both read MARQUEE_SPEED from components/ui/Marquee.tsx. Two different
    // speeds on one page read as a bug rather than as a distinction, so this
    // asserts they match — it is the point of sharing the constant.
    // The tolerance absorbs rAF jitter, not a second configured speed.
    for (const speed of [lenderSpeed, reviewSpeed]) {
      expect(speed).toBeGreaterThan(35);
      expect(speed).toBeLessThan(55);
    }
    expect(Math.abs(lenderSpeed - reviewSpeed)).toBeLessThan(5);
  });
});

test.describe("hover", () => {
  for (const [name, selector] of [
    ["lenders", LENDERS],
    ["reviews", REVIEWS],
  ] as const) {
    test(`${name} — pauses immediately on hover, stays still, resumes on leave`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto("/", { waitUntil: "networkidle" });
      await reveal(page, selector);

      await page.locator(selector).hover();
      await page.waitForTimeout(150);

      // Completely still while hovered — not merely slower.
      const held = await scrollLeft(page, selector);
      await page.waitForTimeout(1200);
      const stillHeld = await scrollLeft(page, selector);
      expect(Math.abs(stillHeld - held), `${name} moved while hovered`).toBeLessThan(1);
      await expect(page.locator(selector)).toHaveAttribute("data-paused", "true");

      // Resumes once the pointer leaves.
      await page.mouse.move(0, 0);
      await page.waitForTimeout(200);
      const resumed = await travel(page, selector, 1200);
      expect(resumed, `${name} did not resume`).not.toBeNull();
      expect(resumed!).toBeGreaterThan(2);
      await expect(page.locator(selector)).toHaveAttribute("data-paused", "false");
    });
  }
});

test("loop never exceeds half the track, so there is no reset to see", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  await reveal(page, LENDERS);

  const half = await page
    .locator(LENDERS)
    .evaluate((el) => (el.firstElementChild as HTMLElement).scrollWidth / 2);

  // Sample across several seconds; the position must always stay inside one
  // copy's width, which is what makes the wrap invisible.
  let maxSeen = 0;
  for (let i = 0; i < 24; i++) {
    maxSeen = Math.max(maxSeen, await scrollLeft(page, LENDERS));
    await page.waitForTimeout(120);
  }
  expect(maxSeen).toBeLessThanOrEqual(half + 2);
});

test("manual scroll is honoured and the loop continues from there", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  await reveal(page, REVIEWS);

  // Stand in for a swipe: the viewport is natively scrollable, which is the
  // whole reason touch works without a gesture handler.
  await page.locator(REVIEWS).evaluate((el) => {
    el.scrollLeft = 240;
  });
  const afterSwipe = await scrollLeft(page, REVIEWS);
  expect(afterSwipe).toBeGreaterThan(200);

  await page.mouse.move(0, 0);
  await page.waitForTimeout(1400);
  const now = await scrollLeft(page, REVIEWS);
  // Continues onward from the swiped position rather than snapping back to 0.
  expect(now).toBeGreaterThan(200);
});

test("reduced motion — neither marquee moves, both stay scrollable", async ({
  browser,
}) => {
  const context = await browser.newContext({
    reducedMotion: "reduce",
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  await page.goto("/", { waitUntil: "networkidle" });

  for (const selector of [LENDERS, REVIEWS]) {
    await reveal(page, selector);
    const before = await scrollLeft(page, selector);
    await page.waitForTimeout(1500);
    const after = await scrollLeft(page, selector);
    expect(Math.abs(after - before), "moved under reduced motion").toBeLessThan(1);
    await expect(page.locator(selector)).toHaveAttribute("data-paused", "true");

    // Still manually scrollable, so the content remains reachable.
    const scrollable = await page
      .locator(selector)
      .evaluate((el) => el.scrollWidth > el.clientWidth);
    expect(scrollable).toBe(true);
  }

  await context.close();
});

test("marquees are keyboard reachable", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  await reveal(page, LENDERS);

  await page.locator(LENDERS).focus();
  await expect(page.locator(LENDERS)).toBeFocused();
  // Focus pauses it too, so a keyboard user can read what is there.
  await expect(page.locator(LENDERS)).toHaveAttribute("data-paused", "true");
});
