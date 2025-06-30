import { defineConfig } from "@playwright/test";

export default defineConfig({
  webServer: {
    command: "npm run build && npm run preview",
    port: 4173,
  },
  testDir: "./e2e/",
  testMatch: "*.spec.ts",
  timeout: 6000000,
  retries: 1,
  workers: 4,
  use: {
    baseURL: "http://localhost:4173/", // ← Cambia con il tuo URL locale
    headless: true,
    viewport: { width: 1280, height: 720 },
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  reporter: [["json", { outputFile: "./test-results/test-results.json" }]],
});
