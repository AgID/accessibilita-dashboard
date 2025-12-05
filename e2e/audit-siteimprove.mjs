import { Playwright } from "@siteimprove/alfa-playwright";
import { Audit, Outcome } from "@siteimprove/alfa-act";
import allRules from "@siteimprove/alfa-rules";
import { Sequence } from "@siteimprove/alfa-sequence";

const rules = allRules.filter((rule) => {
  const tags = rule?.meta?.tags;
  return tags?.has("wcag:a") || tags?.has("wcag:aa");
});

export async function runAccessibilityAudit(page) {
  const documentHandle = await page.evaluateHandle(() => document);
  const alfaPage = await Playwright.toPage(documentHandle);
  const audit = await Audit.of(alfaPage, rules).evaluate();
  const violations = Sequence.from(audit).filter(Outcome.isFailed);

  if (violations.size > 0) {
    throw new Error(`❌ ${violations.size} violazioni di accessibilità`);
  }
}
