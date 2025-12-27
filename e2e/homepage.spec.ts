import { test, expect } from "@playwright/test";

/**
 * Homepage E2E tests
 */
test.describe("Homepage", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("should have correct title", async ({ page }) => {
        await expect(page).toHaveTitle(/Axoraco/);
    });

    test("should display main navigation", async ({ page }) => {
        const nav = page.getByRole("navigation", { name: "Main navigation" });
        await expect(nav).toBeVisible();
    });

    test("should display services section", async ({ page }) => {
        const servicesHeading = page.getByRole("heading", { name: /Intelligent Solutions/i });
        await expect(servicesHeading).toBeVisible();
    });

    test("should display footer", async ({ page }) => {
        const footer = page.getByRole("contentinfo");
        await expect(footer).toBeVisible();
    });
});

/**
 * Mobile navigation tests
 */
test.describe("Mobile Navigation", () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test("should show hamburger menu on mobile", async ({ page }) => {
        await page.goto("/");
        const menuButton = page.getByRole("button", { name: /Toggle menu/i });
        await expect(menuButton).toBeVisible();
    });

    test("should open mobile menu when clicking hamburger", async ({ page }) => {
        await page.goto("/");
        const menuButton = page.getByRole("button", { name: /Toggle menu/i });
        await menuButton.click();

        const mobileMenu = page.getByRole("menu", { name: /Mobile navigation/i });
        await expect(mobileMenu).toBeVisible();
    });
});

/**
 * Accessibility tests
 */
test.describe("Accessibility", () => {
    test("all images should have alt text", async ({ page }) => {
        await page.goto("/");

        const images = page.locator("img");
        const count = await images.count();

        for (let i = 0; i < count; i++) {
            const img = images.nth(i);
            const alt = await img.getAttribute("alt");
            const ariaHidden = await img.getAttribute("aria-hidden");

            // Image should have alt text or be aria-hidden
            expect(alt !== null || ariaHidden === "true").toBeTruthy();
        }
    });
});
