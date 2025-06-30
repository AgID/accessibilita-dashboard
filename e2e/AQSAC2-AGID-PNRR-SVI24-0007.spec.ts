import { test, expect as baseExpect, devices } from "@playwright/test";
import fs from "fs/promises";

export const testSiteImprove = test.extend({
  page: async ({ page }, use) => {
    await use(page);

    const { runAccessibilityAudit } = await import("./audit-siteimprove.mjs");
    await runAccessibilityAudit(page);
  },
});

export const expect = baseExpect;

export { devices };

testSiteImprove("Piano di test", async ({ page }) => {
  await page.goto("/");

  await testSiteImprove.step(`ID 1`, async () => {
    let pagine = [
      "/",
      "/monitoraggio-semplificato",
      "/monitoraggio-approfondito",
      "/errori-semplificato",
      "/errori-approfondito",
      "/dichiarazione",
      "/dichiarazione/siti",
      "/dichiarazione/app",
      "/obiettivi",
      "/progetto",
      "/cronologia",
      "/opendata",
      "/contatti",
      "/privacy-policy",
      "/note-legali",
    ];
    for (const path of pagine) {
      await page.goto(path);
      const elems = page.locator("text=/app/i");
      const count = await elems.count();
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const el = elems.nth(i);
          const text = await el.innerText();
          for (const match of text.matchAll(/app/gi)) {
            const matched = match[0];
            const idx = match.index!;
            const tail = text.slice(idx);
            if (tail.startsWith("App Store")) {
              continue;
            }
            const before = text.slice(0, idx);
            if (
              matched === "App" &&
              (idx === 0 || /[\.!\?]\s*$/.test(before))
            ) {
              continue;
            }
            expect(matched).toBe("app");
          }
        }
      }
    }
  });

  await testSiteImprove.step(`ID 2`, async () => {
    const pagine = [
      "/",
      "/monitoraggio-semplificato",
      "/monitoraggio-approfondito",
      "/errori-semplificato",
      "/errori-approfondito",
      "/dichiarazione",
      "/dichiarazione/siti",
      "/dichiarazione/app",
      "/obiettivi",
      "/progetto",
      "/cronologia",
      "/opendata",
      "/contatti",
      "/privacy-policy",
      "/note-legali",
    ];

    for (const path of pagine) {
      await page.goto(path);

      const agidElems = page.locator("text=/agid/i");
      const elemCount = await agidElems.count();

      if (elemCount > 0) {
        for (let i = 0; i < elemCount; ++i) {
          const el = agidElems.nth(i);
          const text = await el.innerText();

          for (const match of text.matchAll(/agid/gi)) {
            const idx = match.index!;
            const snippet = text.slice(idx).toLowerCase();

            if (
              snippet.startsWith("agid.gov.it") ||
              snippet.startsWith("agid.it")
            ) {
              continue;
            }

            expect(match[0]).toBe("AgID");
          }
        }
      }
    }
  });

  await testSiteImprove.step(`ID 3`, async () => {
    await page.goto("/monitoraggio-approfondito");

    const unien = page.getByText(/uni en/i);
    const count = await unien.count();

    if (count > 0) {
      for (let i = 0; i < count; ++i) {
        await expect(unien.nth(i)).toHaveText(/UNI EN/);
      }
    }
  });

  await testSiteImprove.step(`ID 4`, async () => {
    const pagine = [
      "/",
      "/monitoraggio-semplificato",
      "/monitoraggio-approfondito",
      "/errori-semplificato",
      "/errori-approfondito",
      "/dichiarazione",
      "/dichiarazione/siti",
      "/dichiarazione/app",
      "/obiettivi",
      "/progetto",
      "/cronologia",
      "/opendata",
      "/contatti",
      "/privacy-policy",
      "/note-legali",
    ];

    const exception = "Indice della Pubblica Amministrazione";

    for (const path of pagine) {
      await page.goto(path);
      const elems = page.locator(
        "text=/pubblica amministrazione|pubbliche amministrazioni/i"
      );
      const count = await elems.count();

      if (count > 0) {
        for (let i = 0; i < count; ++i) {
          const el = elems.nth(i);
          const text = await el.innerText();
          for (const match of text.matchAll(
            /pubblica amministrazione|pubbliche amministrazioni/gi
          )) {
            const matched = match[0];
            const idx = match.index!;
            const snippet = text.slice(idx);
            if (
              (matched.toLowerCase() === "pubblica amministrazione" &&
                text.includes(exception)) ||
              path === "/progetto"
            ) {
              continue;
            }
            expect(matched).toBe("Pubbliche Amministrazioni");
          }
        }
      }
    }

    await expect(page.locator(".card-body")).toBeVisible();
    await page.getByText("No", { exact: true }).click();
    await page.getByRole("button", { name: "Invia feedback" }).click();
    await expect(page.getByRole("heading", { name: "Chi sei?" })).toBeVisible();
    await expect(page.locator("#feedbackModal")).toContainText(
      "Pubblica amministrazione"
    );
  });

  await testSiteImprove.step(`ID 5`, async () => {
    let pagine = [
      "/",
      "/monitoraggio-semplificato",
      "/monitoraggio-approfondito",
      "/errori-semplificato",
      "/errori-approfondito",
      "/dichiarazione",
      "/dichiarazione/siti",
      "/dichiarazione/app",
      "/obiettivi",
      "/progetto",
      "/cronologia",
      "/opendata",
      "/contatti",
      "/privacy-policy",
      "/note-legali",
    ];

    for (const path of pagine) {
      await page.goto(path);
      const wcag = page.getByText(/web content accessibility guidelines/i);
      const count = await wcag.count();

      if (count > 0) {
        for (let i = 0; i < count; ++i) {
          await expect(wcag.nth(i)).toHaveText(
            /Web Content Accessibility Guidelines/
          );
        }
      }
    }
  });

  await testSiteImprove.step(`ID 6`, async () => {
    let pagine = [
      "/",
      "/monitoraggio-semplificato",
      "/monitoraggio-approfondito",
      "/errori-semplificato",
      "/errori-approfondito",
      "/dichiarazione",
      "/dichiarazione/siti",
      "/dichiarazione/app",
      "/obiettivi",
      "/progetto",
      "/cronologia",
      "/opendata",
      "/contatti",
      "/privacy-policy",
      "/note-legali",
    ];

    for (const path of pagine) {
      await page.goto(path);
      const Ci = page.getByText(/citizen inclusion/i);
      const count = await Ci.count();

      if (count > 0) {
        for (let i = 0; i < count; ++i) {
          await expect(Ci.nth(i)).toHaveText(/Citizen inclusion/);
        }
      }
    }
  });

  await testSiteImprove.step(`ID 7`, async () => {
    let pagine = [
      "/",
      "/monitoraggio-semplificato",
      "/monitoraggio-approfondito",
      "/errori-semplificato",
      "/errori-approfondito",
      "/dichiarazione",
      "/dichiarazione/siti",
      "/dichiarazione/app",
      "/obiettivi",
      "/progetto",
      "/cronologia",
      "/opendata",
      "/contatti",
      "/privacy-policy",
      "/note-legali",
    ];

    for (const path of pagine) {
      await page.goto(path);
      const mauve = page.getByText(/mauve/i);
      const count = await mauve.count();
      if (count > 0) {
        for (let i = 0; i < count; ++i) {
          await expect(mauve.nth(i)).toContainText("MAUVE++");
        }
      }
    }
  });

  await testSiteImprove.step(`ID 8`, async () => {
    let pagine = [
      "/",
      "/monitoraggio-semplificato",
      "/monitoraggio-approfondito",
      "/errori-semplificato",
      "/errori-approfondito",
      "/dichiarazione",
      "/dichiarazione/siti",
      "/dichiarazione/app",
      "/obiettivi",
      "/progetto",
      "/cronologia",
      "/opendata",
    ];

    for (const path of pagine) {
      await page.goto(path);
      const match = page.getByText(/applicativ/i);
      await expect(match).toHaveCount(0);

      const serviziDigitali = [/siti web e app/i, /siti web/i, /\bapp\b/i];
      let serviziDigitaliPresenti = false;
      for (const regex of serviziDigitali) {
        if ((await page.getByText(regex).count()) > 0) {
          serviziDigitaliPresenti = true;
          break;
        }
      }
      expect(serviziDigitaliPresenti).toBe(true);
    }
  });

  await testSiteImprove.step(`ID 9`, async () => {
    const pagine = [
      "/",
      "/monitoraggio-semplificato",
      "/monitoraggio-approfondito",
      "/errori-semplificato",
      "/errori-approfondito",
      "/dichiarazione",
      "/dichiarazione/siti",
      "/dichiarazione/app",
      "/obiettivi",
      "/progetto",
      "/opendata",
      "/contatti",
      "/privacy-policy",
      "/note-legali",
    ];

    for (const path of pagine) {
      await page.goto(path);

      const elems = page.locator("text=/dichiarazione di accessibilit/i");
      const count = await elems.count();
      if (count > 0) {
        for (let i = 0; i < count; ++i) {
          const el = elems.nth(i);
          const text = await el.innerText();

          for (const match of text.matchAll(
            /dichiarazione di accessibilit[àa]/gi
          )) {
            const matched = match[0];
            const idx = match.index!;
            const before = text.slice(0, idx);

            const isSentenceStart = idx === 0 || /[\.!\?]\s*$/.test(before);

            if (isSentenceStart) {
              expect(matched[0]).toBe("D");
            } else {
              expect(matched[0]).toBe("d");
            }
          }
        }
      }
    }
  });

  await testSiteImprove.step(`ID 10`, async () => {
    let pagine = [
      "/",
      "/monitoraggio-semplificato",
      "/monitoraggio-approfondito",
      "/errori-semplificato",
      "/errori-approfondito",
      "/dichiarazione",
      "/dichiarazione/siti",
      "/dichiarazione/app",
      "/obiettivi",
      "/progetto",
      "/cronologia",
      "/opendata",
      "/contatti",
      "/privacy-policy",
      "/note-legali",
    ];

    for (const path of pagine) {
      await page.goto(path);
      const iosElems = page.getByText(/ios/i);
      const count = await iosElems.count();

      if (count > 0) {
        for (let i = 0; i < count; ++i) {
          await expect(iosElems.nth(i)).toHaveText(/iOS/);
        }
      }
    }
  });

  await testSiteImprove.step(`ID 11`, async () => {
    const pagine = [
      "/monitoraggio-semplificato",
      "/monitoraggio-approfondito",
      "/errori-semplificato",
      "/errori-approfondito",
      "/dichiarazione/siti",
      "/dichiarazione/app",
      "/obiettivi",
    ];

    const eccezioni = new Set([
      "/monitoraggio-semplificato",
      "/monitoraggio-approfondito",
    ]);

    const titoloEccezioni = "Valutazione dei documenti PDF";

    for (const path of pagine) {
      await page.goto(path);
      await page.waitForLoadState("networkidle");

      const cards = page.locator("div.card-box");
      const cardCount = await cards.count();
      expect(cardCount).toBeGreaterThan(0);

      for (let ci = 0; ci < cardCount; ++ci) {
        const card = cards.nth(ci);

        const isPdfException =
          eccezioni.has(path) &&
          (await card
            .locator("h3.cardTitle", { hasText: titoloEccezioni })
            .count()) === 1;

        const percentElems = card.locator("text=/%/");
        const pctCount = await percentElems.count();
        if (pctCount === 0) continue;

        for (let pi = 0; pi < pctCount; ++pi) {
          const elem = percentElems.nth(pi);
          const tagName = await elem.evaluate((node) =>
            node.tagName.toLowerCase()
          );

          const skip = await elem.evaluate(
            (node) =>
              node.closest("p") ||
              node.closest(".didascalia") ||
              node.closest("g.highcharts-axis-labels")
          );
          if (skip) continue;

          const raw = await elem.textContent();
          let text = raw?.trim();
          text = text?.replace(/^\(+|\)+$/g, "");

          if (!isPdfException) {
            expect(text).toMatch(/^\d+\,\d%$/);
          }
        }
      }
    }
  });

  await testSiteImprove.step(`ID 12`, async () => {
    let pagine = [
      "/",
      "/monitoraggio-semplificato",
      "/monitoraggio-approfondito",
      "/errori-semplificato",
      "/errori-approfondito",
      "/dichiarazione",
      "/dichiarazione/siti",
      "/dichiarazione/app",
      "/obiettivi",
      "/progetto",
      "/cronologia",
      "/opendata",
      "/contatti",
      "/privacy-policy",
      "/note-legali",
    ];

    for (const path of pagine) {
      await page.goto(path);
      const etc = page.locator("text=/etc/i");
      await expect(etc).toHaveCount(0);
    }
  });

  await testSiteImprove.step(`ID 14`, async () => {
    let pagine = [
      "/",
      "/monitoraggio-semplificato",
      "/monitoraggio-approfondito",
      "/errori-semplificato",
      "/errori-approfondito",
      "/dichiarazione",
      "/dichiarazione/siti",
      "/dichiarazione/app",
      "/obiettivi",
      "/progetto",
      "/cronologia",
      "/opendata",
      "/contatti",
      "/privacy-policy",
      "/note-legali",
    ];

    for (const path of pagine) {
      await page.goto(path);
      const ultimoAggiornamento = page.getByText(
        /^Ultimo aggiornamento:\s*\d{1,2}\s+(?:gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre)\s+\d{4}$/i
      );
      expect(ultimoAggiornamento).toHaveCount(1);
    }
  });

  await testSiteImprove.step(`ID 15`, async () => {
    let pagine = [
      "/",
      "/monitoraggio-semplificato",
      "/monitoraggio-approfondito",
      "/errori-semplificato",
      "/errori-approfondito",
      "/dichiarazione",
      "/dichiarazione/siti",
      "/dichiarazione/app",
      "/obiettivi",
      "/progetto",
      "/cronologia",
      "/opendata",
      "/contatti",
      "/privacy-policy",
      "/note-legali",
    ];

    for (const path of pagine) {
      await page.goto(path);
      const ultimoAggiornamento = page.locator("p.periodoLabel").first();
      await expect(ultimoAggiornamento).toHaveText(
        /^Ultimo aggiornamento:\s*\d{1,2}\s+(?:gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre)\s+\d{4}$/i
      );

      await expect(ultimoAggiornamento).toHaveCSS("font-size", "16px");
      await expect(ultimoAggiornamento).toHaveCSS("font-weight", "400");
      await expect(ultimoAggiornamento).toHaveCSS("color", "rgb(26, 26, 26)");
      const dateSpan = ultimoAggiornamento.locator("span.periodoDate");
      await expect(dateSpan).toHaveCount(1);
      await expect(dateSpan).toHaveCSS("font-size", "16px");
      await expect(dateSpan).toHaveCSS("font-weight", "600");
      await expect(dateSpan).toHaveCSS("color", "rgb(26, 26, 26)");

      const breadcrumb = page.locator("div.breadcrumb");
      if ((await breadcrumb.count()) > 0) {
        const adjacency = page.locator("div.breadcrumb + * p.periodoLabel");
        await expect(adjacency).toHaveCount(1);
      }
    }
  });

  await testSiteImprove.step(`ID 16`, async () => {
    let pagine = [
      "/",
      "/monitoraggio-semplificato",
      "/monitoraggio-approfondito",
      "/errori-semplificato",
      "/errori-approfondito",
      "/dichiarazione",
      "/dichiarazione/siti",
      "/dichiarazione/app",
      "/obiettivi",
    ];

    for (const path of pagine) {
      await page.goto(path);
      const cards = page.locator("div.card-box", {
        has: page.locator("div.display4"),
        hasNot: page.locator("p.periodoLabel"),
      });

      const count = await cards.count();

      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const card = cards.nth(i);
          const heading = card.locator("div.display4").first();
          await expect(heading).toHaveCount(1);
          await expect(heading).toHaveText(/\b\d{4}\b/);
        }
      }
    }
  });

  await testSiteImprove.step(`ID 17`, async () => {
    let pagine = [
      "/",
      "/monitoraggio-semplificato",
      "/monitoraggio-approfondito",
      "/errori-semplificato",
      "/errori-approfondito",
      "/dichiarazione",
      "/dichiarazione/siti",
      "/dichiarazione/app",
      "/obiettivi",
    ];

    for (const path of pagine) {
      await page.goto(path);

      const labels = page.locator(
        `xpath=//p[contains(@class,"periodoLabel") and not(ancestor::div[contains(@class,"bannerPageUpdated")])]`
      );

      const count = await labels.count();
      for (let i = 0; i < count; ++i) {
        const label = labels.nth(i);
        await expect(label).toHaveCSS("font-size", "16px");
        await expect(label).toHaveCSS("font-weight", "400");
        await expect(label).toHaveCSS("color", "rgb(26, 26, 26)");
        const dateSpan = label.locator("span.periodoDate");
        await expect(dateSpan).toHaveCSS("font-size", "16px");
        await expect(dateSpan).toHaveCSS("font-weight", "600");
        await expect(dateSpan).toHaveCSS("color", "rgb(26, 26, 26)");
      }
    }
  });

  await testSiteImprove.step(`ID 18`, async () => {
    await page.goto("/");
    const cardTitle1 = page.getByText(
      "Criteri di successo valutati dal monitoraggio semplificato",
      { exact: true }
    );
    const cardTitle2 = page.getByText(
      "Criteri di successo valutati dal monitoraggio approfondito",
      { exact: true }
    );
    await expect(cardTitle1).not.toHaveText(/:$/);
    await expect(cardTitle2).not.toHaveText(/:$/);

    await page.goto("/errori-semplificato");
    const cardTitle3 = page.getByText(
      "Criteri di successo valutati dal monitoraggio semplificato",
      { exact: true }
    );
    await expect(cardTitle3).not.toHaveText(/:$/);

    await page.goto("/errori-approfondito");
    const cardTitle4 = page.getByText(
      "Criteri di successo valutati manualmente per i siti web",
      { exact: true }
    );
    const cardTitle5 = page.getByText(
      "Criteri di successo valutati manualmente per le app",
      { exact: true }
    );
    await expect(cardTitle4).not.toHaveText(/:$/);
    await expect(cardTitle5).not.toHaveText(/:$/);
  });

  await testSiteImprove.step(`ID 19`, async () => {
    const pagine = [
      "/monitoraggio-semplificato",
      "/monitoraggio-approfondito",
      "/dichiarazione",
      "/dichiarazione/siti",
      "/dichiarazione/app",
      "/obiettivi",
    ];
    const skipTitle = "Valutazione dei documenti PDF";

    for (const path of pagine) {
      await page.goto(path);
      await page.waitForLoadState("networkidle");

      const cards = page.locator("div.card-box").filter({
        has: page.locator("h3.cardTitle"),
      });

      for (let ci = 0; ci < (await cards.count()); ++ci) {
        const card = cards.nth(ci);
        const title = await card.locator("h3.cardTitle").innerText();
        if (title === skipTitle) continue;
        if (title.startsWith("Trend")) continue;

        const slice = card.locator("path.highcharts-point").first();
        await slice.hover();

        const tooltipText = card
          .locator("g.highcharts-label.highcharts-tooltip text")
          .first();
        await tooltipText.waitFor({ state: "attached", timeout: 5000 });

        await expect(tooltipText).toHaveCSS("font-weight", "400");

        const tspans = tooltipText.locator("tspan");
        const count = await tspans.count();
        for (let j = 0; j < count; ++j) {
          const t = tspans.nth(j);
          const raw = await t.textContent();
          const txt = raw?.trim() ?? "";
          if (txt === "●" || txt === "") continue;
          const fw = await t.evaluate((n) => getComputedStyle(n).fontWeight);
          if (/^\d/.test(txt)) {
            expect(fw).toMatch(/^(6|7)\d{2}|bold$/);
          } else {
            expect(fw).toMatch(/^(4|5)\d{2}|normal$/);
          }
        }
      }
    }

    const pagesWithTrends = [
      "/dichiarazione",
      "/dichiarazione/siti",
      "/dichiarazione/app",
      "/obiettivi",
    ];

    for (const path of pagesWithTrends) {
      await page.goto(path);
      await page.waitForLoadState("networkidle");

      const cards = page.locator("div.card-box").filter({
        has: page.locator("h3.cardTitle", { hasText: /^Trend/ }),
      });

      const cardCount = await cards.count();
      for (let ci = 0; ci < cardCount; ++ci) {
        const card = cards.nth(ci);
        await expect(card).toBeVisible();
        await card
          .locator("g.highcharts-markers path.highcharts-point")
          .first()
          .hover();
      }
    }
  });

  await testSiteImprove.step(`ID 21`, async () => {
    await page.goto("/");
    const link = page.getByRole("link", { name: "Legge n. 4/" }).first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL(
      "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2004-01-09;4!vig="
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 22`, async () => {
    const link = page.getByRole("link", {
      name: 'PNRR 1.4.2 "Citizen inclusion"',
    });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL("/progetto");
    await page.goto("/");
  });

  await testSiteImprove.step(`ID 24`, async () => {
    const link = page.getByRole("link", { name: "monitoraggio semplificato" });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL("/monitoraggio-semplificato");
    await page.goto("/");
  });

  await testSiteImprove.step(`ID 25`, async () => {
    const link = page.getByRole("link", { name: "MAUVE++" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL(
      "https://mauve.isti.cnr.it/singleValidation.jsp"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 26`, async () => {
    const link = page.getByRole("link", { name: "monitoraggio approfondito" });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL("/monitoraggio-approfondito");
    await page.goto("/");
  });

  await testSiteImprove.step(`ID 28`, async () => {
    const link = page.getByRole("link", { name: "UNI EN 301" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");

    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);

    await expect(link).toHaveAttribute(
      "href",
      "https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf"
    );

    await newPage.close();
  });

  await testSiteImprove.step(`ID 29`, async () => {
    const link = page.getByRole("link", { name: "Direttiva europea 2016/" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL(
      "https://eur-lex.europa.eu/IT/legal-content/summary/accessibility-of-public-sector-websites-and-mobile-apps.html"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 30`, async () => {
    const link = page.getByRole("link", { name: "WCAG" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL(
      "https://www.w3.org/Translations/WCAG21-it/"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 32`, async () => {
    const link = page.getByRole("link", {
      name: "dichiarazione di accessibilità",
      exact: true,
    });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL(
      "https://www.agid.gov.it/it/design-servizi/accessibilita/dichiarazione-accessibilita"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 33`, async () => {
    const link = page.getByRole("link", { name: "Legge n. 4/" }).nth(1);
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL(
      "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2004-01-09;4!vig="
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 35`, async () => {
    const link = page.getByRole("link", { name: "obiettivi di accessibilità" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL(
      "https://www.agid.gov.it/it/design-servizi/accessibilita/obiettivi-accessibilita"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 38`, async () => {
    const link = page.getByRole("link", { name: "Decreto Legge n. 179/" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL(
      "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legge:2012-10-18;179"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 42`, async () => {
    await page.goto("/monitoraggio-semplificato");
    const link = page.getByRole("link", { name: "patrimonio di dati" });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL("/opendata");
  });

  await testSiteImprove.step(`ID 49`, async () => {
    await page.goto("/monitoraggio-approfondito");

    const link = page.getByRole("link", { name: "UNI EN 301" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(link).toHaveAttribute(
      "href",
      "https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 50`, async () => {
    const link = page.getByRole("link", { name: "linee guida WCAG" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL(
      "https://www.w3.org/Translations/WCAG21-it/"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 51`, async () => {
    const link = page.getByRole("link", { name: "Direttiva UE 2016/" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL(
      "https://eur-lex.europa.eu/IT/legal-content/summary/accessibility-of-public-sector-websites-and-mobile-apps.html"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 59`, async () => {
    const link = page.getByRole("link", { name: "Approfondisci il dato per" });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL("/errori-approfondito#app");
  });

  await testSiteImprove.step(`ID 61`, async () => {
    await page.goto("/errori-semplificato");
    await expect(page.locator("h2")).toContainText(
      "Gli errori di accessibilità identificabili automaticamente"
    );
    await expect(page.getByLabel("Sezione errori")).toContainText(
      "Gli indicatori per l’analisi automatica dell’accessibilità sono strutturati sulla base della conformità alle prescrizioni contenute nella norma tecnica UNI EN 301 549, che incorpora le linee guida WCAG 2.1."
    );
    await expect(page.getByLabel("Sezione errori")).toContainText(
      "MAUVE++ analizza automaticamente la ricorrenza degli errori su 31 dei 50 criteri di successo obbligatori per legge e supporta la validazione delle linee guida WCAG 2.1."
    );
  });

  await testSiteImprove.step(`ID 62`, async () => {
    await page.goto("/errori-semplificato");
    const link = page.getByRole("link", { name: "UNI EN 301" }).first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(link).toHaveAttribute(
      "href",
      "https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 63`, async () => {
    const link = page.getByRole("link", { name: "linee guida WCAG" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL(
      "https://www.w3.org/Translations/WCAG21-it/"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 65`, async () => {
    const card = page.locator("div.card-box", {
      has: page.locator("div.cardTitle", {
        hasText: "Gli errori rilevati nei siti web per criterio di successo",
      }),
    });
    await expect(card).toHaveCount(1);
    const table = card.locator("table");
    await expect(table).toHaveCount(1);
    const rows = table.locator("tbody tr");
    await expect(rows).toHaveCount(10);
  });

  await testSiteImprove.step(`ID 66`, async () => {
    const link = page.getByRole("link", { name: "MAUVE++" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL(
      "https://mauve.isti.cnr.it/singleValidation.jsp"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 67`, async () => {
    const link = page.getByRole("link", { name: "tre livelli di conformità" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL(
      "https://www.w3.org/Translations/WCAG21-it/#cc1"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 70`, async () => {
    const card = page.locator("div.card-box", {
      has: page.locator("div.cardTitle", {
        hasText:
          "Gli errori rilevati nei documenti PDF per criterio di successo",
      }),
    });
    await expect(card).toHaveCount(1);
    const table = card.locator("table");
    await expect(table).toHaveCount(1);
    const rows = table.locator("tbody tr");
    await expect(rows).toHaveCount(9);
  });

  await testSiteImprove.step(`ID 71`, async () => {
    const link = page.getByRole("link", { name: "UNI EN 301" }).nth(1);
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(link).toHaveAttribute(
      "href",
      "https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 74`, async () => {
    await page.goto("/errori-approfondito");
    const link = page
      .getByRole("paragraph")
      .filter({ hasText: "Il monitoraggio manuale è" })
      .getByRole("link");
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(link).toHaveAttribute(
      "href",
      "https://eur-lex.europa.eu/legal-content/IT/TXT/PDF/?uri=CELEX:32018D1524"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 75`, async () => {
    const link = page.getByRole("link", { name: "UNI EN" }).first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(link).toHaveAttribute(
      "href",
      "https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 76`, async () => {
    const link = page.getByRole("link", { name: "linee guida WCAG" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL(
      "https://www.w3.org/Translations/WCAG21-it/"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 78`, async () => {
    const link = page
      .getByRole("paragraph")
      .filter({
        hasText:
          "Gli esperti si avvalgono di più metodologie e utilizzano le tecnologie",
      })
      .getByRole("link");

    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);

    await expect(link).toHaveAttribute(
      "href",
      "https://eur-lex.europa.eu/legal-content/IT/TXT/PDF/?uri=CELEX:32018D1524"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 79`, async () => {
    const link = page
      .getByRole("paragraph")
      .filter({ hasText: "Gli errori sono rilevati dall" })
      .getByRole("link");

    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(link).toHaveAttribute(
      "href",
      "https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 82`, async () => {
    const card = page.locator("div.card-box", {
      has: page.locator("div.cardTitle", {
        hasText: "Gli errori rilevati nei siti web per criterio di successo",
      }),
    });
    await expect(card).toHaveCount(1);
    const table = card.locator("table");
    await expect(table).toHaveCount(1);
    const rows = table.locator("tbody tr");
    await expect(rows).toHaveCount(10);
  });

  await testSiteImprove.step(`ID 83`, async () => {
    const link = page
      .getByRole("link", { name: "tre livelli di conformità" })
      .first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL(
      "https://www.w3.org/Translations/WCAG21-it/#cc1"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 85`, async () => {
    const card = page.locator("div.card-box", {
      has: page.locator("div.cardTitle", {
        hasText:
          "Gli errori rilevati nei documenti PDF per criterio di successo",
      }),
    });
    await expect(card).toHaveCount(1);
    const table = card.locator("table");
    await expect(table).toHaveCount(1);
    const rows = table.locator("tbody tr");
    await expect(rows).toHaveCount(10);
  });

  await testSiteImprove.step(`ID 88`, async () => {
    const card = page.locator("div.card-box", {
      has: page.locator("div.cardTitle", {
        hasText: "Gli errori rilevati nelle app per criterio di successo",
      }),
    });
    await expect(card).toHaveCount(1);
    const table = card.locator("table");
    await expect(table).toHaveCount(1);
    const rows = table.locator("tbody tr");
    await expect(rows).toHaveCount(10);
  });

  await testSiteImprove.step(`ID 89`, async () => {
    const link = page
      .getByRole("link", { name: "tre livelli di conformità" })
      .nth(1);
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL(
      "https://www.w3.org/Translations/WCAG21-it/#cc1"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 90`, async () => {
    const menuDichiarazioni = page.getByRole("link", {
      name: "Dichiarazioni espandi",
    });
    await expect(menuDichiarazioni).toBeVisible();
    menuDichiarazioni.click();
    await expect(page.getByLabel("Dichiarazioni")).toMatchAriaSnapshot(`
    - region "Dichiarazioni espandi":
      - list:
        - listitem:
          - link "Dichiarazioni accessibilità":
            - /url: /dichiarazione
        - listitem:
          - link "Dichiarazioni siti web":
            - /url: /dichiarazione/siti
        - listitem:
          - link "Dichiarazioni app":
            - /url: /dichiarazione/app
    `);
  });

  await testSiteImprove.step(`ID 93`, async () => {
    await page.goto("/dichiarazione");
    const link = page
      .getByRole("paragraph")
      .filter({ hasText: "Dopo aver effettuato le" })
      .getByRole("link");
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL(
      "https://eur-lex.europa.eu/IT/legal-content/summary/accessibility-of-public-sector-websites-and-mobile-apps.html"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 94`, async () => {
    const link = page
      .getByRole("paragraph")
      .filter({ hasText: "La dichiarazione va redatta e" })
      .getByRole("link");
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL("https://form.agid.gov.it/home");
    await newPage.close();
  });

  await testSiteImprove.step(`ID 101`, async () => {
    const link = page.getByRole("link", { name: "form.agid.it" }).nth(1);
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL("https://form.agid.gov.it/home");
    await newPage.close();
  });

  await testSiteImprove.step(`ID 102`, async () => {
    const link = page.getByRole("link", { name: "Direttiva UE 2016/" }).nth(1);
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL(
      "https://eur-lex.europa.eu/IT/legal-content/summary/accessibility-of-public-sector-websites-and-mobile-apps.html"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 106`, async () => {
    await page.goto("/dichiarazione/siti");
    const link = page
      .getByRole("paragraph")
      .filter({ hasText: "Dopo aver effettuato le" })
      .getByRole("link");
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL(
      "https://eur-lex.europa.eu/IT/legal-content/summary/accessibility-of-public-sector-websites-and-mobile-apps.html"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 108`, async () => {
    const link = page.getByRole("link", { name: "form.agid.it" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL("https://form.agid.gov.it/home");
    await newPage.close();
  });

  await testSiteImprove.step(`ID 109`, async () => {
    const link = page.getByRole("link", { name: "Direttiva UE 2016/" }).nth(1);
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL(
      "https://eur-lex.europa.eu/IT/legal-content/summary/accessibility-of-public-sector-websites-and-mobile-apps.html"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 111`, async () => {
    const link = page.getByRole("link", { name: "Indice PA" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL("https://www.indicepa.gov.it/ipa-portale/");
    await newPage.close();
  });

  await testSiteImprove.step(`ID 116`, async () => {
    const container = page.locator("div.blueKpiCard");
    await expect(container).toHaveCount(1);

    const cards = container.locator("div.card-box");
    await expect(cards).toHaveCount(2);

    const box1 = await cards.nth(0).boundingBox();
    const box2 = await cards.nth(1).boundingBox();
    expect(box1, "first card should have a boundingBox").not.toBeNull();
    expect(box2, "second card should have a boundingBox").not.toBeNull();
    if (box1 && box2) {
      expect(box2.x).toBeGreaterThan(box1.x + box1.width - 1);
      expect(Math.abs(box1.y - box2.y)).toBeLessThan(5);
    }

    const bgColor = await container.evaluate(
      (el) => getComputedStyle(el).backgroundColor
    );
    expect(bgColor).toBe("rgb(242, 247, 252)");
  });

  await testSiteImprove.step(`ID 126`, async () => {
    await page.goto("/dichiarazione/app");
    const link = page
      .getByRole("paragraph")
      .filter({ hasText: "Dopo aver effettuato le" })
      .getByRole("link");
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL(
      "https://eur-lex.europa.eu/IT/legal-content/summary/accessibility-of-public-sector-websites-and-mobile-apps.html"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 128`, async () => {
    const link = page.getByRole("link", { name: "form.agid.it" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL("https://form.agid.gov.it/home");
    await newPage.close();
  });

  await testSiteImprove.step(`ID 129`, async () => {
    const link = page.getByRole("link", { name: "Direttiva UE 2016/" }).nth(1);
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL(
      "https://eur-lex.europa.eu/IT/legal-content/summary/accessibility-of-public-sector-websites-and-mobile-apps.html"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 136`, async () => {
    await page.goto("/obiettivi");
    const link = page.getByRole("link", {
      name: "Linee Guida sull’accessibilit",
    });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL(
      "https://docs.italia.it/AgID/documenti-in-consultazione/lg-accessibilita-docs/it/stabile/index.html"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 137`, async () => {
    const link = page.getByRole("link", { name: "Decreto Legge n. 179/" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL(
      "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legge:2012-10-18;179"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 138`, async () => {
    const link = page.getByRole("link", { name: "form.agid.it" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL("https://form.agid.gov.it/home");
    await newPage.close();
  });

  await testSiteImprove.step(`ID 139`, async () => {
    const link = page.getByRole("link", { name: "obiettivi di accessibilità" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL(
      "https://www.agid.gov.it/it/design-servizi/accessibilita/obiettivi-accessibilita"
    );
    await newPage.close();
  });

  await testSiteImprove.step(`ID 144`, async () => {
    const link = page.getByRole("link", { name: "Indice PA" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
    const [newPage] = await Promise.all([
      page.waitForEvent("popup"),
      link.click(),
    ]);
    await expect(newPage).toHaveURL("https://www.indicepa.gov.it/ipa-portale/");
    await newPage.close();
  });

  await testSiteImprove.step(`ID 145`, async () => {
    const menuProgetto = page.getByRole("link", {
      name: "Il progetto espandi",
    });
    await expect(menuProgetto).toBeVisible();
    menuProgetto.click();
    await expect(page.getByLabel("Il progetto")).toMatchAriaSnapshot(`
    - region "Il progetto espandi":
      - list:
        - listitem:
          - link "Il progetto di monitoraggio":
            - /url: /progetto
        - listitem:
          - link "Cronologia del progetto":
            - /url: /cronologia
        - listitem:
          - link "Open Data":
            - /url: /opendata
    `);
  });

  await testSiteImprove.step(`ID 148`, async () => {
    await page.goto("/progetto");
    const cardCitazione = page.getByRole("blockquote");
    const firma = cardCitazione.locator(page.getByText("― Alessio Butti,"));
    await expect(firma).toContainText(
      "― Alessio Butti, Sottosegretario di Stato con delega all’Innovazione tecnologica"
    );
    await expect(firma).toHaveCSS("font-weight", "700");
    await expect(firma).not.toHaveCSS("font-style", "italic");
  });

  await testSiteImprove.step(`ID 149`, async () => {
    const paragraph = page.getByText("Lo stato attuale del progetto");
    await expect(paragraph).toHaveCount(1);
    await expect(paragraph).toHaveText("Lo stato attuale del progetto");
  });

  await testSiteImprove.step(`ID 151`, async () => {
    await page.goto("/cronologia");

    await page.waitForResponse(
      (response) =>
        response.url().endsWith("/data/release.json") &&
        response.status() === 200
    );
    await page
      .locator(".timeline-element")
      .first()
      .waitFor({ state: "visible" });

    const checks: { regex: RegExp; expected: string }[] = [
      {
        regex: /dichiarazioni/i,
        expected: "Dichiarazioni",
      },
      {
        regex: /dichiarazione/i,
        expected: "Dichiarazione",
      },
      {
        regex: /obiettivi/i,
        expected: "Obiettivi",
      },
    ];

    for (const { regex, expected } of checks) {
      const elems = page.getByText(regex);
      const count = await elems.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; ++i) {
        const fullText = (await elems.nth(i).innerText()).trim();
        const match = fullText.match(regex);
        expect(match).toBeTruthy();
        const matched = match![0];
        expect(matched[0]).toBe(expected[0]);
      }
    }
  });

  await testSiteImprove.step(`ID 152`, async () => {
    await page.goto("/opendata");
    await expect(page.locator("h2")).toHaveCount(0);
  });

  await testSiteImprove.step(`ID 155`, async () => {
    await page.goto("/opendata");
    const card = page.locator("div.card-box", {
      has: page.locator("div.cardTitle", {
        hasText: "Elenco open data accessibilità",
      }),
    });

    await expect(card).toHaveCount(1);
    const table = card.locator("table");
    await expect(table).toHaveCount(1);

    const nomeCells = table.locator("tbody tr td:nth-child(2)");
    const targetCell = nomeCells.filter({
      hasText: "Monitoraggio semplificato",
    });
    await expect(targetCell).toHaveCount(1);

    const rowCount = await table.locator("tbody tr").count();
    for (let i = 0; i < rowCount; ++i) {
      const nomeText = await nomeCells.nth(i).innerText();
      if (/\bpa\b/i.test(nomeText)) {
        expect(nomeText).toMatch(/\bPA\b/);
      }

      const descrCell = table
        .locator("tbody tr")
        .nth(i)
        .locator("td:nth-child(3)");
      const descrText = await descrCell.innerText();
      if (/regione/i.test(descrText)) {
        expect(descrText).toMatch(/Regione/);
      }
      if (/provincia/i.test(descrText)) {
        expect(descrText).toMatch(/Provincia/);
      }
      if (/\bpa\b/i.test(descrText)) {
        expect(descrText).toMatch(/\bPA\b/);
      }
    }
  });

  await testSiteImprove.step(`ID 156`, async () => {
    await page.goto("/monitoraggio-semplificato");

    await expect(
      page.getByRole("heading", {
        name: "Distribuzione dei siti web monitorati per area geografica",
      })
    ).toBeVisible();
    const download1Promise = page.waitForEvent("download");
    await page
      .getByRole("button", { name: "PDF Scarica il documento PDF" })
      .first()
      .click();
    const download1 = await download1Promise;
    const download1Path = await download1.path();
    const download1Stats = await fs.stat(download1Path!);
    expect(download1Stats.size).toBeGreaterThan(0);

    await expect(
      page.getByRole("heading", { name: "Valutazione dei documenti PDF" })
    ).toBeVisible();
    const download2Promise = page.waitForEvent("download");
    await page
      .getByRole("button", { name: "PDF Scarica il documento PDF" })
      .nth(1)
      .click();
    const download2 = await download2Promise;
    const download2Path = await download2.path();
    const download2Stats = await fs.stat(download2Path!);
    expect(download2Stats.size).toBeGreaterThan(0);

    await expect(
      page.getByText("Siti web monitorati per Regione e Provincia autonoma")
    ).toBeVisible();
    const download3Promise = page.waitForEvent("download");
    await page
      .getByTitle(
        "Scarica il file: Siti web monitorati per Regione e Provincia autonoma.pdf"
      )
      .click();
    const download3 = await download3Promise;
    const download3Path = await download3.path();
    const download3Stats = await fs.stat(download3Path!);
    expect(download3Stats.size).toBeGreaterThan(0);
  });

  await testSiteImprove.step(`ID 157`, async () => {
    await page.goto("/monitoraggio-approfondito");

    await expect(
      page.getByRole("heading", {
        name: "Distribuzione dei siti web monitorati per area geografica",
      })
    ).toBeVisible();
    const download1Promise = page.waitForEvent("download");
    await page
      .getByRole("button", { name: "PDF Scarica il documento PDF" })
      .first()
      .click();
    const download1 = await download1Promise;
    const download1Path = await download1.path();
    const download1Stats = await fs.stat(download1Path!);
    expect(download1Stats.size).toBeGreaterThan(0);

    await expect(
      page.getByRole("heading", { name: "Valutazione dei documenti PDF" })
    ).toBeVisible();
    const download2Promise = page.waitForEvent("download");
    await page
      .getByRole("button", { name: "PDF Scarica il documento PDF" })
      .nth(1)
      .click();
    const download2 = await download2Promise;
    const download2Path = await download2.path();
    const download2Stats = await fs.stat(download2Path!);
    expect(download2Stats.size).toBeGreaterThan(0);

    await expect(
      page.getByRole("heading", { name: "Distribuzione delle app" })
    ).toBeVisible();

    const download3Promise = page.waitForEvent("download");
    await page
      .getByRole("button", { name: "PDF Scarica il documento PDF" })
      .nth(2)
      .click();
    const download3 = await download3Promise;
    const download3Path = await download3.path();
    const download3Stats = await fs.stat(download3Path!);
    expect(download3Stats.size).toBeGreaterThan(0);
  });

  await testSiteImprove.step(`ID 158`, async () => {
    await page.goto("/errori-semplificato");

    await expect(
      page.getByText(
        "Gli errori rilevati nei siti web per criterio di successo"
      )
    ).toBeVisible();
    const download1Promise = page.waitForEvent("download");
    await page
      .getByTitle(
        "Scarica il file: Gli errori rilevati nei siti web per criterio di successo.pdf"
      )
      .click();
    const download1 = await download1Promise;
    const download1Path = await download1.path();
    const download1Stats = await fs.stat(download1Path!);
    expect(download1Stats.size).toBeGreaterThan(0);

    await expect(
      page.getByText(
        "Gli errori rilevati nei documenti PDF per criterio di successo"
      )
    ).toBeVisible();
    const download2Promise = page.waitForEvent("download");
    await page
      .getByTitle(
        "Scarica il file: Gli errori rilevati nei documenti PDF per criterio di successo.pdf",
        { exact: true }
      )
      .click();
    const download2 = await download2Promise;
    const download2Path = await download2.path();
    const download2Stats = await fs.stat(download2Path!);
    expect(download2Stats.size).toBeGreaterThan(0);
  });

  await testSiteImprove.step(`ID 159`, async () => {
    await page.goto("/errori-approfondito");

    await expect(page.getByText("Gli errori rilevati nei siti")).toBeVisible();
    const download1Promise = page.waitForEvent("download");
    await page
      .getByTitle(
        "Scarica il file: Gli errori rilevati nei siti web per criterio di successo.pdf"
      )
      .click();
    const download1 = await download1Promise;
    const download1Path = await download1.path();
    const download1Stats = await fs.stat(download1Path!);
    expect(download1Stats.size).toBeGreaterThan(0);

    await expect(
      page.getByText(
        "Gli errori rilevati nei documenti PDF per criterio di successo"
      )
    ).toBeVisible();
    const download2Promise = page.waitForEvent("download");
    await page
      .getByTitle(
        "Scarica il file: Gli errori rilevati nei documenti PDF per criterio di successo.pdf",
        { exact: true }
      )
      .click();
    const download2 = await download2Promise;
    const download2Path = await download2.path();
    const download2Stats = await fs.stat(download2Path!);
    expect(download2Stats.size).toBeGreaterThan(0);

    await expect(page.getByText("Gli errori rilevati nelle app")).toBeVisible();
    const download3Promise = page.waitForEvent("download");
    await page
      .getByTitle(
        "Scarica il file: Gli errori rilevati nelle app per criterio di successo.pdf"
      )
      .click();
    const download3 = await download3Promise;
    const download3Path = await download3.path();
    const download3Stats = await fs.stat(download3Path!);
    expect(download3Stats.size).toBeGreaterThan(0);
  });

  await testSiteImprove.step(`ID 160`, async () => {
    await page.goto("/dichiarazione");
    await page.getByRole("link", { name: "ITA espandi" }).click();
    await page.getByRole("link", { name: "ENGLISH" }).click();

    await expect(
      page.getByRole("heading", { name: "Accessibility statements trend" })
    ).toBeVisible();
    const download1Promise = page.waitForEvent("download");
    await page
      .getByRole("button", { name: "PDF Download the PDF document" })
      .first()
      .click();
    const download1 = await download1Promise;
    const download1Path = await download1.path();
    const download1Stats = await fs.stat(download1Path!);
    expect(download1Stats.size).toBeGreaterThan(0);

    await expect(
      page.getByRole("heading", { name: "Distribution of accessibility" })
    ).toBeVisible();
    const download2Promise = page.waitForEvent("download");
    await page
      .getByRole("button", { name: "PDF Download the PDF document" })
      .nth(1)
      .click();
    const download2 = await download2Promise;
    const download2Path = await download2.path();
    const download2Stats = await fs.stat(download2Path!);
    expect(download2Stats.size).toBeGreaterThan(0);

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole("link", { name: "ENG espandi" }).click();
    await page.getByRole("link", { name: "ITALIANO" }).click();
  });

  await testSiteImprove.step(`ID 161`, async () => {
    await page.goto("/dichiarazione/siti");
    await page.getByRole("link", { name: "ITA espandi" }).click();
    await page.getByRole("link", { name: "ENGLISH" }).click();

    await expect(
      page.getByRole("heading", { name: "Website accessibility" })
    ).toBeVisible();
    const download1Promise = page.waitForEvent("download");
    await page
      .getByTitle(
        "Download the file: Website accessibility statements trend.pdf"
      )
      .click();
    const download1 = await download1Promise;
    const download1Path = await download1.path();
    const download1Stats = await fs.stat(download1Path!);
    expect(download1Stats.size).toBeGreaterThan(0);

    await expect(
      page.getByRole("heading", {
        name: "Self-assessment of compliance status of institutional websites of PAs",
      })
    ).toBeVisible();
    const download2Promise = page.waitForEvent("download");
    await page
      .getByTitle(
        "Download the file: Self-assessment of compliance status of institutional"
      )
      .nth(1)
      .click();
    const download2 = await download2Promise;
    const download2Path = await download2.path();
    const download2Stats = await fs.stat(download2Path!);
    expect(download2Stats.size).toBeGreaterThan(0);

    await expect(
      page.getByText("Accessibility statements of institutional websites")
    ).toBeVisible();
    const download3Promise = page.waitForEvent("download");
    await page
      .getByTitle(
        "Download the file: Accessibility statements of institutional websites.pdf"
      )
      .click();
    const download3 = await download3Promise;
    const download3Path = await download3.path();
    const download3Stats = await fs.stat(download3Path!);
    expect(download3Stats.size).toBeGreaterThan(0);

    await expect(
      page.getByRole("heading", {
        name: "Self-assessment of compliance status of thematic websites of PAs",
      })
    ).toBeVisible();
    const download4Promise = page.waitForEvent("download");
    await page
      .getByTitle(
        "Download the file: Self-assessment of compliance status of thematic websites of"
      )
      .nth(1)
      .click();
    const download4 = await download4Promise;
    const download4Path = await download4.path();
    const download4Stats = await fs.stat(download4Path!);
    expect(download4Stats.size).toBeGreaterThan(0);

    await expect(page.getByText("Accessibility statements for")).toBeVisible();
    const download5Promise = page.waitForEvent("download");
    await page
      .getByTitle(
        "Download the file: Accessibility statements for institutional and thematic websites.pdf",
        { exact: true }
      )
      .click();
    const download5 = await download5Promise;
    const download5Path = await download5.path();
    const download5Stats = await fs.stat(download5Path!);
    expect(download5Stats.size).toBeGreaterThan(0);

    await expect(
      page.getByRole("heading", { name: "Comparison of self-assessment" })
    ).toBeVisible();
    const download6Promise = page.waitForEvent("download");
    await page.getByTitle("Download the file: Comparison").nth(1).click();
    const download6 = await download6Promise;
    const download6Path = await download6.path();
    const download6Stats = await fs.stat(download6Path!);
    expect(download6Stats.size).toBeGreaterThan(0);

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole("link", { name: "ENG espandi" }).click();
    await page.getByRole("link", { name: "ITALIANO" }).click();
  });

  await testSiteImprove.step(`ID 162`, async () => {
    await page.goto("/dichiarazione/app");
    await page.getByRole("link", { name: "ITA espandi" }).click();
    await page.getByRole("link", { name: "ENGLISH" }).click();

    await expect(
      page.getByRole("heading", { name: "App accessibility statements" })
    ).toBeVisible();
    const download1Promise = page.waitForEvent("download");
    await page
      .getByRole("button", { name: "PDF Download the PDF document" })
      .first()
      .click();
    const download1 = await download1Promise;
    const download1Path = await download1.path();
    const download1Stats = await fs.stat(download1Path!);
    expect(download1Stats.size).toBeGreaterThan(0);

    await expect(
      page.getByRole("heading", { name: "Comparison of accessibility" })
    ).toBeVisible();
    const download2Promise = page.waitForEvent("download");
    await page
      .getByRole("button", { name: "PDF Download the PDF document" })
      .nth(1)
      .click();
    const download2 = await download2Promise;
    const download2Path = await download2.path();
    const download2Stats = await fs.stat(download2Path!);
    expect(download2Stats.size).toBeGreaterThan(0);

    await expect(
      page.getByRole("heading", { name: "Comparison of the self-" })
    ).toBeVisible();
    const download3Promise = page.waitForEvent("download");
    await page
      .getByRole("button", { name: "PDF Download the PDF document" })
      .nth(2)
      .click();
    const download3 = await download3Promise;
    const download3Path = await download3.path();
    const download3Stats = await fs.stat(download3Path!);
    expect(download3Stats.size).toBeGreaterThan(0);

    await expect(page.getByText("Accessibility statements by")).toBeVisible();
    const download4Promise = page.waitForEvent("download");
    await page
      .getByTitle(
        "Download the file: Accessibility statements by Region and Autonomous Province.pdf",
        { exact: true }
      )
      .click();
    const download4 = await download4Promise;
    const download4Path = await download4.path();
    const download4Stats = await fs.stat(download4Path!);
    expect(download4Stats.size).toBeGreaterThan(0);

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole("link", { name: "ENG espandi" }).click();
    await page.getByRole("link", { name: "ITALIANO" }).click();
  });

  await testSiteImprove.step(`ID 163`, async () => {
    await page.goto("/obiettivi");
    await page.getByRole("link", { name: "ITA espandi" }).click();
    await page.getByRole("link", { name: "ENGLISH" }).click();

    await expect(
      page.getByRole("heading", {
        name: "Accessibility objectives publication trend",
      })
    ).toBeVisible();
    const download1Promise = page.waitForEvent("download");
    await page
      .getByRole("button", { name: "PDF Download the PDF document" })
      .first()
      .click();
    const download1 = await download1Promise;
    const download1Path = await download1.path();
    const download1Stats = await fs.stat(download1Path!);
    expect(download1Stats.size).toBeGreaterThan(0);

    await expect(
      page.getByRole("heading", {
        name: "Accessibility objectives published by intervention line",
      })
    ).toBeVisible();
    const download2Promise = page.waitForEvent("download");
    await page
      .getByRole("button", { name: "PDF Download the PDF document" })
      .nth(1)
      .click();
    const download2 = await download2Promise;
    const download2Path = await download2.path();
    const download2Stats = await fs.stat(download2Path!);
    expect(download2Stats.size).toBeGreaterThan(0);

    await expect(
      page.getByText("Accessibility objectives", { exact: true }).nth(1)
    ).toBeVisible();
    const download3Promise = page.waitForEvent("download");
    await page
      .getByTitle("Download the file: Accessibility objectives.pdf")
      .click();
    const download3 = await download3Promise;
    const download3Path = await download3.path();
    const download3Stats = await fs.stat(download3Path!);
    expect(download3Stats.size).toBeGreaterThan(0);

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole("link", { name: "ENG espandi" }).click();
    await page.getByRole("link", { name: "ITALIANO" }).click();
  });

  await testSiteImprove.step(`ID 169`, async () => {
    page.goto("/");
    await page.getByRole("link", { name: "Note legali", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Note legali" })
    ).toBeVisible();
    await expect(page.locator("h1")).toContainText("Note legali");
  });

  await testSiteImprove.step(`ID 172`, async () => {
    await page.getByRole("link", { name: "Privacy policy" }).click();
    const update = page.locator("p.periodoLabel");
    await expect(update).toHaveText(
      /^Ultimo aggiornamento:\s*\d{1,2}\s+(?:gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre)\s+\d{4}$/i
    );
  });

  await testSiteImprove.step(`ID 175`, async () => {
    await page.getByRole("link", { name: "Contatti" }).click();
    await page.locator(".card").first();
    await expect(page.getByText("Hai dubbi o domande?")).toBeVisible();
    await page.getByText("Per informazioni scrivi a");
    const emailLink = page.getByRole("link", {
      name: "comunicazione@agid.gov.it",
    });

    await expect(emailLink).toBeVisible();
    await expect(emailLink).toContainText("comunicazione@agid.gov.it");
    await expect(emailLink).toHaveAttribute(
      "href",
      "mailto:comunicazione@agid.gov.it"
    );
  });

  await testSiteImprove.step(`ID 177`, async () => {
    page.goto("/monitoraggio-semplificato");
    await page.getByRole("link", { name: "ITA espandi" }).click();
    await page.getByRole("link", { name: "ENGLISH" }).click();

    await expect(
      page.getByRole("heading", {
        name: "Data produced by simplified monitoring",
        exact: true,
      })
    ).toBeVisible();
    await expect(page.getByLabel("Accessibility monitoring")).toContainText(
      "Data produced by simplified monitoring"
    );
    await expect(page.getByLabel("Accessibility monitoring")).toContainText(
      "Simplified monitoring is performed every three months through the validator MAUVE++, which analyses the accessibility of websites and PDF documents of PAs on the A and AA compliance levels, required by law. For websites, the analysis is conducted in an automated manner on 31 of the 50 success criteria indicated in WCAG 2.1, by scanning the source code and the content present in the respective monitored media. Wherever possible, monitoring takes place on multiple pages of the same website and on multiple websites of a PA. The use of an automated system allows for monitoring to be carried out more closely over time and for the accessibility of an ever-increasing number of websites to be verified; the set of domains on which monitoring takes place is constantly enriched and revised, to provide the most complete, correct and up-to-date representation of the digital accessibility status of Public Administrations. In this way, a very rich heritage of data is generated, which for the first time in Italy all citizens can consult and which PAs can use to make their services increasingly usable and inclusive."
    );
    await expect(
      page.getByRole("heading", {
        name: "Data produced by simplified monitoring of PDF documents",
      })
    ).toBeVisible();
    await expect(page.getByLabel("Accessibility monitoring")).toContainText(
      "Data produced by simplified monitoring of PDF documents"
    );
    await expect(page.getByLabel("Accessibility monitoring")).toContainText(
      "There are 9 success criteria that MAUVE++ is able to evaluate, on an experimental basis, in relation to PDF documents published online by PAs."
    );

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole("link", { name: "ENG espandi" }).click();
    await page.getByRole("link", { name: "ITALIANO" }).click();
  });

  await testSiteImprove.step(`ID 201`, async () => {
    await page.goto("/monitoraggio-semplificato");

    await expect(page.getByLabel("Sezione monitoraggio")).toMatchAriaSnapshot(`
      - button "CSV Scarica il file CSV":
        - img "Scarica il file CSV"
      - button "PDF Scarica il documento PDF":
        - img "Scarica il documento PDF"
      `);

    const buttons = page.locator("button.download-buttons", {
      hasText: /CSV|PDF/,
    });

    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      const parent = btn.locator("xpath=..");
      await expect(btn).toHaveCount(1);
      await expect(parent).toHaveJSProperty("tagName", "DIV");
    }
  });

  await testSiteImprove.step(`ID 219`, async () => {
    await expect(
      page.locator(".container > .col-12 > .card-wrapper > .card > .card-body")
    ).toBeVisible();
    await expect(page.locator("form")).toBeVisible();
    await expect(page.locator("form")).toHaveCount(1);
    await expect(page.locator("form")).toMatchAriaSnapshot(`
    - paragraph: Hai trovato utile questa pagina?
    - radio "Sì"
    - text: Sì
    - radio "No"
    - text: "No"
    - button "Invia feedback"
    `);
  });

  await testSiteImprove.step(`ID 221`, async () => {
    let pagine = [
      "/",
      "/monitoraggio-semplificato",
      "/monitoraggio-approfondito",
      "/errori-semplificato",
      "/errori-approfondito",
      "/dichiarazione",
      "/dichiarazione/siti",
      "/dichiarazione/app",
      "/obiettivi",
      "/progetto",
      "/cronologia",
      "/opendata",
      "/contatti",
      "/privacy-policy",
      "/note-legali",
    ];

    for (const path of pagine) {
      await page.goto(path);
      await expect(page.locator("h1")).toHaveCount(1);
      const firstHeading = page.locator("h1, h2, h3, h4, h5, h6").first();
      const tagName = await firstHeading.evaluate((node) => node.tagName);
      expect(tagName).toBe("H1");
    }
  });
});
