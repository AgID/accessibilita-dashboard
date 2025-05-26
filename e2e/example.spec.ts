import { test, expect as baseExpect, devices } from "@playwright/test";

export const testSiteImprove = test.extend({
  page: async ({ page }, use) => {
    
    await use(page);

    const { runAccessibilityAudit } = await import("./audit-siteimprove.mjs");
    await runAccessibilityAudit(page);
  },
});

export const expect = baseExpect;

export { devices };

testSiteImprove('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});


