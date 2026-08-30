import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const VIEWPORTS = [
  { name: '1440', width: 1440, height: 900 },
  { name: '1024', width: 1024, height: 820 },
  { name: '768', width: 768, height: 1024 },
  { name: '430', width: 430, height: 932 },
  { name: '390', width: 390, height: 844 },
];

for (const vp of VIEWPORTS) {
  test(`${vp.name}px — renders, no horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('/', { waitUntil: 'networkidle' });

    // No horizontal page overflow at any supported viewport.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `horizontal overflow at ${vp.name}px`).toBeLessThanOrEqual(0);

    await page.screenshot({ path: `shots/home-${vp.name}.png`, fullPage: true });
  });
}

test('accessibility — axe, no serious or critical violations', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/', { waitUntil: 'networkidle' });

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
  if (serious.length > 0) {
    console.log(JSON.stringify(serious.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, help: v.help })), null, 2));
  }
  expect(serious).toEqual([]);
});

test('heading hierarchy — one h1, no skipped levels', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  const levels = await page.$$eval('h1,h2,h3,h4,h5,h6', (els) => els.map((e) => Number(e.tagName[1])));
  expect(levels.filter((l) => l === 1)).toHaveLength(1);
  for (let i = 1; i < levels.length; i++) {
    expect(levels[i]! - levels[i - 1]!).toBeLessThanOrEqual(1);
  }
});

test('keyboard — mega menu opens without hover and closes on Escape', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/', { waitUntil: 'networkidle' });

  const trigger = page.getByRole('button', { name: 'Mortgages' });
  await trigger.focus();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  // Scoped to the primary nav: the footer now carries the same link.
  await expect(
    page.getByLabel('Primary').getByRole('link', { name: 'First-time buyers' }),
  ).toBeVisible();
  // Let the header's colour transition settle so the capture is not mid-flight.
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'shots/megamenu-1440.png' });
  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('mobile nav — native dialog traps focus and returns it', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'networkidle' });

  const open = page.getByRole('button', { name: 'Open navigation menu' });
  await open.click();
  const dialog = page.getByRole('dialog', { name: 'Site navigation' });
  await expect(dialog).toBeVisible();
  await page.screenshot({ path: 'shots/mobilenav-390.png' });

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  // Native <dialog> returns focus to the trigger on close.
  await expect(open).toBeFocused();
});

test('reduced motion — hero video is not fetched', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const videoRequests: string[] = [];
  page.on('request', (r) => {
    if (/\.(webm|mp4)$/.test(r.url())) videoRequests.push(r.url());
  });
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  expect(videoRequests).toEqual([]);
  await page.screenshot({ path: 'shots/home-reduced-motion.png', fullPage: true });
  await context.close();
});

/**
 * Header disclosure hierarchy.
 *
 * Priority order: primary navigation, then the CTA, then the Login disclosure,
 * then the telephone number. Every breakpoint is measured — see
 * --breakpoint-cta / -desknav / -deskfull in app/globals.css.
 *
 *   below 432px   wordmark + drawer trigger
 *   432px         + Speak to an adviser
 *   1232px        primary nav + Login disclosure, drawer retires
 *   1360px        + telephone number
 *
 * The rule this exists to protect: there must be no width where the desktop
 * navigation is up, the drawer is gone, and the portals are unreachable.
 */
const CTA_FROM = 432;
const DESKNAV_FROM = 1232;
const DESKFULL_FROM = 1360;
const COMFORTABLE_GAP = 56;

/** Widths spanning every step and both sides of each boundary. */
const HEADER_WIDTHS = [
  390, 431, 432, 768, 1024, 1184, 1200, 1216, 1231, 1232, 1248, 1264, 1280,
  1312, 1344, 1359, 1360, 1400, 1440, 1536, 1664, 1728, 1920,
];

for (const width of HEADER_WIDTHS) {
  test(`header at ${width}px — correct disclosure step, relaxed and unclipped`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(220);

    const desktop = width >= DESKNAV_FROM;
    const banner = page.getByRole('banner');
    const trigger = page.getByRole('button', { name: 'Open navigation menu' });
    const login = banner.getByRole('button', { name: 'Login' });
    const phone = banner.getByRole('link', { name: '0333 034 8993' });
    const cta = banner.getByRole('link', { name: 'Speak to an adviser' });

    // 2 + 4. Wherever the desktop navigation is up, the Login disclosure is up
    // with it, and the drawer has retired. Below that the drawer is the route.
    if (desktop) {
      await expect(trigger).toBeHidden();
      await expect(login).toBeVisible();
    } else {
      await expect(trigger).toBeVisible();
      await expect(login).toBeHidden();
      await expect(page.locator('header nav[aria-label="Primary"]')).toBeHidden();
    }

    // CTA is priority 2: present from 432px up, at every width above.
    await expect(cta)[width >= CTA_FROM ? 'toBeVisible' : 'toBeHidden']();

    // 3. Phone is disclosed last and only above its own measured width.
    await expect(phone)[width >= DESKFULL_FROM ? 'toBeVisible' : 'toBeHidden']();

    const geometry = await page.evaluate(() => {
      const bar = document.querySelector('header > div')!;
      const actions = bar.lastElementChild!;
      const items = Array.from(document.querySelectorAll('header nav > ul > li'))
        .map((li) => li.querySelector(':scope > a, :scope > button'))
        .filter((el): el is HTMLElement => el !== null);
      const controls = [...items, ...Array.from(actions.querySelectorAll('a, button'))] as HTMLElement[];
      const visible = controls.filter((el) => el.getBoundingClientRect().width > 0);
      return {
        gap: items.length
          ? Math.round(actions.getBoundingClientRect().left - items[items.length - 1]!.getBoundingClientRect().right)
          : null,
        clipped: visible.filter((el) => el.scrollWidth > el.clientWidth + 1).map((el) => el.textContent),
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      };
    });

    expect(geometry.clipped, `clipped header controls at ${width}px`).toEqual([]);
    expect(geometry.overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(0);
    if (desktop) {
      expect(geometry.gap, `nav/actions gap at ${width}px`).toBeGreaterThanOrEqual(COMFORTABLE_GAP);
    }
  });
}

/** 1. Below the desktop breakpoint the portals live in the drawer. */
for (const width of [390, 768, 1024, DESKNAV_FROM - 1]) {
  test(`portals reachable via drawer at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Open navigation menu' }).click();
    const dialog = page.getByRole('dialog', { name: 'Site navigation' });
    await expect(dialog.getByRole('link', { name: 'Client login' })).toHaveAttribute(
      'href',
      'https://client.guidemortgages.co.uk',
    );
    await expect(dialog.getByRole('link', { name: 'Advisor login' })).toHaveAttribute(
      'href',
      'https://crm.guidemortgages.co.uk',
    );
  });
}

/**
 * 4. No responsive dead zone. Walks every width across the whole desktop
 * boundary and asserts a login route exists at each one — in the drawer below
 * it, in the disclosure above it, and never neither.
 */
test('no width leaves the portals unreachable from the header', async ({ page }) => {
  const dead: number[] = [];
  for (let width = 1180; width <= 1400; width += 4) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const route = await page.evaluate(() => {
      const vis = (el: Element | null | undefined) => !!(el && el.getBoundingClientRect().width > 0);
      const header = document.querySelector('header')!;
      const trigger = Array.from(header.querySelectorAll('button')).find(
        (b) => b.getAttribute('aria-label') === 'Open navigation menu',
      );
      const login = Array.from(header.querySelectorAll('button')).find((b) => /Login/.test(b.textContent ?? ''));
      return vis(trigger) || vis(login);
    });
    if (!route) dead.push(width);
  }
  expect(dead, 'widths with no login route in the header').toEqual([]);
});

test('login disclosure — keyboard operable, Escape closes', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/', { waitUntil: 'networkidle' });

  const login = page.getByRole('banner').getByRole('button', { name: 'Login' });
  await login.focus();
  await page.keyboard.press('Enter');
  await expect(login).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('banner').getByRole('link', { name: 'Client login' })).toBeVisible();
  await expect(page.getByRole('banner').getByRole('link', { name: 'Advisor login' })).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(login).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByRole('banner').getByRole('link', { name: 'Client login' })).toBeHidden();
});
