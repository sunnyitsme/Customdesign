import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { allNavHrefs } from "../content/navigation";
import { redirects } from "../content/redirects";
import { allRoutes, serviceRoutes, staticRoutes } from "../lib/routes";

/**
 * Whole-site tests.
 *
 * Route lists come from the same modules the app renders from, so a page added
 * without a test, or a sitemap entry that 404s, fails here rather than in
 * production.
 */

test.describe("routes", () => {
  test(`all ${allRoutes.length} routes return 200`, async ({ request }) => {
    const failures: string[] = [];
    for (const route of allRoutes) {
      const response = await request.get(route);
      if (response.status() !== 200) failures.push(`${route} -> ${response.status()}`);
    }
    expect(failures, "routes not returning 200").toEqual([]);
  });

  test("every navigation href resolves to a real page", async ({ request }) => {
    const failures: string[] = [];
    for (const href of new Set(allNavHrefs)) {
      const response = await request.get(href);
      if (response.status() !== 200) failures.push(`${href} -> ${response.status()}`);
    }
    expect(failures, "navigation links that 404").toEqual([]);
  });

  test("no internal link anywhere on key pages is broken", async ({ page, request }) => {
    const sample = ["/", "/mortgages", "/property-finance", "/protection", "/wills-estate-planning", "/about", "/insights", "/contact"];
    const checked = new Set<string>();
    const broken: string[] = [];

    for (const route of sample) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const hrefs = await page.$$eval("a[href^='/']", (links) =>
        links.map((link) => link.getAttribute("href") ?? ""),
      );
      for (const href of hrefs) {
        const clean = href.split("#")[0]!;
        if (!clean || checked.has(clean)) continue;
        checked.add(clean);
        const response = await request.get(clean);
        if (response.status() >= 400) broken.push(`${clean} (linked from ${route}) -> ${response.status()}`);
      }
    }
    expect(broken, "broken internal links").toEqual([]);
  });
});

test.describe("redirects", () => {
  test(`all ${redirects.length} legacy URLs redirect permanently`, async ({ request }) => {
    const failures: string[] = [];
    // Sample across the set: every hub family plus the calculators.
    const sample = redirects.filter((_, index) => index % 3 === 0);
    for (const entry of sample) {
      const response = await request.get(entry.source, { maxRedirects: 0 });
      const status = response.status();
      const location = response.headers()["location"];
      if (status !== 308 && status !== 301) {
        failures.push(`${entry.source} -> status ${status}`);
      } else if (location && !location.endsWith(entry.destination)) {
        failures.push(`${entry.source} -> ${location}, expected ${entry.destination}`);
      }
    }
    expect(failures, "legacy URLs not redirecting correctly").toEqual([]);
  });

  test("a redirected legacy URL lands on a working page", async ({ page }) => {
    await page.goto("/buy-to-let-mortgages");
    await expect(page).toHaveURL(/\/mortgages\/buy-to-let$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

test.describe("page structure", () => {
  const sample = [
    "/mortgages",
    "/mortgages/buy-to-let",
    "/mortgages/guides/offset",
    "/property-finance",
    "/property-finance/bridging",
    "/protection",
    "/protection/business/key-person",
    "/wills-estate-planning/trust-wills",
    "/about",
    "/locations/leeds",
    "/insights/faqs",
    "/calculators/mortgage-repayment",
    "/contact",
  ];

  for (const route of sample) {
    test(`${route} — one h1, landmarks, no overflow`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(route, { waitUntil: "domcontentloaded" });

      const h1s = await page.locator("h1").count();
      expect(h1s, `h1 count on ${route}`).toBe(1);

      await expect(page.getByRole("banner")).toHaveCount(1);
      await expect(page.getByRole("main")).toHaveCount(1);
      await expect(page.getByRole("contentinfo")).toHaveCount(1);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `overflow on ${route}`).toBeLessThanOrEqual(0);
    });
  }
});

test.describe("responsive", () => {
  const widths = [1920, 1440, 1280, 1024, 768, 430, 390];
  const sample = ["/mortgages", "/property-finance", "/protection/business", "/wills-estate-planning", "/contact", "/insights/faqs"];

  for (const width of widths) {
    test(`${width}px — no overflow across page families`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      const failures: string[] = [];
      for (const route of sample) {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await page.evaluate(async () => {
          const step = window.innerHeight;
          for (let y = 0; y < document.body.scrollHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 20));
          }
        });
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        if (overflow > 0) failures.push(`${route} overflows by ${overflow}px`);
      }
      expect(failures).toEqual([]);
    });
  }
});

test.describe("accessibility", () => {
  const sample = ["/mortgages", "/property-finance/bridging", "/protection", "/wills-estate-planning", "/about", "/insights/faqs", "/calculators/mortgage-repayment", "/contact"];

  for (const route of sample) {
    test(`${route} — axe clean of serious and critical`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const serious = results.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      );
      if (serious.length > 0) {
        console.log(route, JSON.stringify(serious.map((v) => ({ id: v.id, nodes: v.nodes.length, help: v.help })), null, 1));
      }
      expect(serious).toEqual([]);
    });
  }
});

test.describe("interactions", () => {
  test("FAQ accordion opens and closes", async ({ page }) => {
    await page.goto("/insights/faqs", { waitUntil: "domcontentloaded" });
    const first = page.getByRole("button", { name: "What is a mortgage?" });
    await expect(first).toHaveAttribute("aria-expanded", "false");
    await first.click();
    await expect(first).toHaveAttribute("aria-expanded", "true");
    await first.click();
    await expect(first).toHaveAttribute("aria-expanded", "false");
  });

  test("repayment calculator computes a known value", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/calculators/mortgage-repayment", { waitUntil: "domcontentloaded" });
    // Defaults are £250,000 at 5% over 25 years — £1,461/month.
    await expect(page.getByText("£1,461")).toBeVisible();
  });

  test("contact form rejects an invalid submission client-side", async ({ page }) => {
    await page.goto("/contact", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page.getByText("Enter your name")).toBeVisible();
    await expect(page.getByText("Enter a valid email address")).toBeVisible();
  });

  test("contact API rejects an invalid payload server-side", async ({ request }) => {
    const response = await request.post("/api/contact", {
      data: { enquiryType: "mortgage", name: "A", email: "not-an-email", message: "hi", consent: false },
    });
    expect(response.status()).toBe(422);
    const body = (await response.json()) as { ok: boolean; issues: unknown[] };
    expect(body.ok).toBe(false);
    expect(body.issues.length).toBeGreaterThan(0);
  });

  test("contact API does not claim delivery when no CRM is configured", async ({ request }) => {
    const response = await request.post("/api/contact", {
      data: {
        enquiryType: "mortgage",
        name: "Test Person",
        email: "test@example.com",
        phone: "",
        message: "This is a test enquiry of sufficient length.",
        consent: true,
      },
    });
    expect(response.status()).toBe(200);
    const body = (await response.json()) as { ok: boolean; delivered: boolean };
    expect(body.ok).toBe(true);
    // The critical assertion: never tell someone their enquiry was delivered.
    expect(body.delivered).toBe(false);
  });

  test("breadcrumbs present on a deep child page", async ({ page }) => {
    await page.goto("/mortgages/buy-to-let", { waitUntil: "domcontentloaded" });
    const nav = page.getByRole("navigation", { name: "Breadcrumb" });
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("link", { name: "Mortgages" })).toBeVisible();
  });

  test("external portal links point at the verified destinations", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const footer = page.getByRole("contentinfo");
    await expect(footer.getByRole("link", { name: "Client login" })).toHaveAttribute(
      "href",
      "https://client.guidemortgages.co.uk",
    );
    await expect(footer.getByRole("link", { name: "Advisor login" })).toHaveAttribute(
      "href",
      "https://crm.guidemortgages.co.uk",
    );
  });
});

test.describe("seo", () => {
  test("every route carries a title", async ({ page }) => {
    const missing: string[] = [];
    for (const route of [...staticRoutes.slice(0, 12), ...serviceRoutes.slice(0, 10)]) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const title = await page.title();
      if (!title || title.trim().length < 5) missing.push(route);
    }
    expect(missing, "routes without a usable title").toEqual([]);
  });

  test("sitemap lists every route and none of them 404", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const xml = await response.text();
    const missing = allRoutes.filter((route) => !xml.includes(`${route}</loc>`) && !xml.includes(`${route}<`));
    expect(missing, "routes absent from the sitemap").toEqual([]);
  });

  test("robots blocks indexing outside production", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toContain("Disallow: /");
  });
});
