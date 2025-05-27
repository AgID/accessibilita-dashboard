import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e/",
  testMatch: "*.spec.ts",
  timeout: 60_000, // 60 s per test
  retries: 1,
  workers: 4,
  use: {
    baseURL: "https://localhost:5000/", // ← Cambia con il tuo URL locale
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },
});
