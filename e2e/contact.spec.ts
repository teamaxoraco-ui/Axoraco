import { test, expect } from "@playwright/test";

/**
 * Contact Page E2E tests
 */
test.describe("Contact Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/contact");
    });

    test("should have correct title", async ({ page }) => {
        await expect(page).toHaveTitle(/Contact.*Axoraco/);
    });

    test("should display contact form", async ({ page }) => {
        // Look for form or contact section
        const form = page.locator("form, [data-testid='contact-form']");
        await expect(form.first()).toBeVisible();
    });

    test("should have input fields", async ({ page }) => {
        // Look for any input or textarea
        const inputs = page.locator("input, textarea");
        const count = await inputs.count();
        expect(count).toBeGreaterThan(0);
    });

    test("should have submit button", async ({ page }) => {
        const submitButton = page.locator("button[type='submit'], button:has-text('Send'), button:has-text('Submit')");
        await expect(submitButton.first()).toBeVisible();
    });
});

/**
 * Navigation E2E tests
 */
test.describe("Site Navigation", () => {
    test("should navigate to AI Voice page", async ({ page }) => {
        await page.goto("/ai-voice");
        await expect(page).toHaveURL(/\/ai-voice/);
    });

    test("should navigate to Web Dev page", async ({ page }) => {
        await page.goto("/web-dev");
        await expect(page).toHaveURL(/\/web-dev/);
    });

    test("should navigate to Solutions page", async ({ page }) => {
        await page.goto("/solutions");
        await expect(page).toHaveURL(/\/solutions/);
    });

    test("should navigate to About page", async ({ page }) => {
        await page.goto("/about");
        await expect(page).toHaveURL(/\/about/);
    });

    test("should navigate home when clicking logo", async ({ page }) => {
        await page.goto("/contact");
        const logo = page.locator("a:has-text('AXORACO')");
        await logo.first().click();
        await expect(page).toHaveURL("/");
    });
});

/**
 * Performance E2E tests
 */
test.describe("Performance", () => {
    test("homepage should load within 5 seconds", async ({ page }) => {
        const start = Date.now();
        await page.goto("/", { waitUntil: "domcontentloaded" });
        const loadTime = Date.now() - start;
        expect(loadTime).toBeLessThan(5000);
    });

    test("should have no console errors", async ({ page }) => {
        const errors: string[] = [];
        page.on("console", (msg) => {
            if (msg.type() === "error") {
                errors.push(msg.text());
            }
        });

        await page.goto("/");
        await page.waitForTimeout(2000);

        // Filter out expected third-party errors
        const criticalErrors = errors.filter(
            (e) => !e.includes("gtag") && !e.includes("analytics") && !e.includes("Failed to load resource")
        );
        expect(criticalErrors).toHaveLength(0);
    });
});
