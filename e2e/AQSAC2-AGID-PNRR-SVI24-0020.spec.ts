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

testSiteImprove(
  "1	- Visualizzare il contenuto della Home page",
  async ({ page }) => {
    await page.goto("/");

    await testSiteImprove.step(`Il monitoraggio in dettaglio`, async () => {
      await expect(
        page.getByRole("heading", { name: "Il monitoraggio in dettaglio" })
      ).toBeVisible();

      await expect(
        page.getByRole("button", { name: "Semplificato" })
      ).toBeVisible();

      await page.getByRole("button", { name: "Semplificato" }).click();

      const accordionButton = page.getByRole("button", {
        name: "Siti web valutati 253.280",
      });

      await expect(accordionButton).toBeVisible();
      await accordionButton.click();
      const accordionBody = accordionButton
        .locator('xpath=ancestor::div[contains(@class, "accordion-item")][1]')
        .locator(".accordion-body");
      const row = accordionBody.locator("div.row");
      const columns = row.locator(
        'div[class^="col-lg-4"], div[class*="col-lg-4"]'
      );
      const count = await columns.count();
      await expect(count).toBeGreaterThan(0);

      const annoRegex = /Anno\s+(19|20)\d{2}/;
      const numbers = /^\d{1,3}(?:[.,]\d{3})*$/;

      for (let i = 0; i < count; i++) {
        const col = columns.nth(i);

        const p = col.locator("p");
        await expect(p).toBeVisible();
        await expect(p).toContainText(annoRegex);

        const span = p.locator("span.fw-semibold.blueText");
        await expect(span).toBeVisible();
        await expect(span).toHaveText(numbers);

        const color = await span.evaluate((el) => getComputedStyle(el).color);
        expect(color).toBe("rgb(0, 102, 204)");
        const fontFamily = await span.evaluate(
          (el) => getComputedStyle(el).fontFamily
        );
        expect(fontFamily.toLowerCase()).toContain("titillium web");
      }
    });

    await testSiteImprove.step(`Paragrafo 8 colonne`, async () => {
      const paragraph = page.locator("p", {
        hasText:
          /La tabella riporta i.*monitoraggio.*gennaio 2023\s*-\s*giugno 2025/i,
      });
      await expect(paragraph).toBeVisible();
      await expect(paragraph).toHaveClass(/col-lg-8/);
    });
  }
);

testSiteImprove(
  "2	- Visualizzare il contenuto della pagina Monitoraggio semplificato",
  async ({ page }) => {
    await page.goto("/");
    const original = page.viewportSize()!;

    await page.getByRole("link", { name: "Monitoraggio espandi" }).click();
    await page
      .getByRole("link", { name: "Monitoraggio semplificato", exact: true })
      .click();

    await expect(
      page.getByRole("heading", {
        name: "Monitoraggio semplificato",
        exact: true,
      })
    ).toBeVisible();

    await testSiteImprove.step(
      `Tabella: Siti web monitorati per Regione e Provincia autonoma`,
      async () => {
        const cardTitle = page.getByText(
          "Siti web monitorati per Regione e Provincia autonoma",
          { exact: true }
        );
        await expect(cardTitle).toBeVisible();

        const table = cardTitle.locator("xpath=following::table[1]");
        await expect(table).toBeVisible();

        const numericTdRegex = /^[\d.,\s%]+$/;
        const numericTds = table.locator("td").filter({
          hasText: numericTdRegex,
        });

        const count = await numericTds.count();
        await expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
          const textAlign = await numericTds
            .nth(i)
            .evaluate((el) => getComputedStyle(el).textAlign);

          expect(textAlign).toBe("right");
        }
        const container = cardTitle.locator(
          'xpath=ancestor::div[contains(@class, "customSpacing")][1]'
        );

        const border = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return {
            top: `${s.borderTopWidth} ${s.borderTopStyle}`,
            right: `${s.borderRightWidth} ${s.borderRightStyle}`,
            bottom: `${s.borderBottomWidth} ${s.borderBottomStyle}`,
            left: `${s.borderLeftWidth} ${s.borderLeftStyle}`,
          };
        });
        expect(border.top).toBe("0px none");
        expect(border.right).toBe("0px none");
        expect(border.bottom).toBe("0px none");
        expect(border.left).toBe("0px none");

        await expect(container).toBeVisible();
        const deskTopMargin = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return { marginTop: s.marginTop, marginBottom: s.marginBottom };
        });
        await expect(deskTopMargin.marginTop).toBe("56px");
        await expect(deskTopMargin.marginBottom).toBe("56px");

        await page.setViewportSize({ width: 400, height: 812 });
        const mobileMargin = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return { marginTop: s.marginTop, marginBottom: s.marginBottom };
        });
        await expect(mobileMargin.marginTop).toBe("32px");
        await expect(mobileMargin.marginBottom).toBe("32px");

        await page.setViewportSize(original);
      }
    );

    await testSiteImprove.step(`Paragrafo 8 colonne`, async () => {
      const paragraph = page.locator("p", {
        hasText:
          "Il monitoraggio dell'accessibilità effettuato da AgID comprende diverse PA e si estende a numerosi ambiti. Questo il numero di siti web monitorati nel trimestre da MAUVE++, suddivisi per tipologia di PA: Comuni e loro Consorzi e Associazioni, Scuole e Università, Altri Enti.",
      });
      await expect(paragraph).toBeVisible();
      const container = paragraph.locator(
        'xpath=ancestor::div[contains(@class, "col-lg-8")][1]'
      );
      await expect(container).toBeVisible();
    });
  }
);

testSiteImprove(
  "3	- Visualizzare il contenuto della pagina Monitoraggio approfondito",
  async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Monitoraggio espandi" }).click();
    await page
      .getByRole("link", { name: "Monitoraggio approfondito", exact: true })
      .click();
    await expect(
      page.getByRole("heading", {
        name: "Monitoraggio approfondito",
        exact: true,
      })
    ).toBeVisible();

    await testSiteImprove.step(`Paragrafo 8 colonne`, async () => {
      const paragraph = page.locator("p", {
        hasText:
          "Il monitoraggio dell'accessibilità effettuato da AgID comprende diverse PA e si estende a numerosi ambiti. Questo il numero di siti web monitorati suddivisi per tipologia di PA: Comuni e loro Consorzi e Associazioni, Scuole e Università, Altri Enti.",
      });
      await expect(paragraph).toBeVisible();
      const container = paragraph.locator(
        'xpath=ancestor::div[contains(@class, "col-lg-8")][1]'
      );
      await expect(container).toBeVisible();
    });
  }
);

testSiteImprove(
  "4	- Visualizzazione la pagina Errori monitoraggio semplificato",
  async ({ page }) => {
    await page.goto("/");
    const original = page.viewportSize()!;

    await page.getByRole("link", { name: "Errori espandi" }).click();
    await page
      .getByRole("link", { name: "Errori monitoraggio semplificato" })
      .click();
    await expect(
      page.getByRole("heading", { name: "Errori monitoraggio semplificato" })
    ).toBeVisible();

    await testSiteImprove.step(
      `Tabella: Gli errori rilevati nei siti web per criterio di successo`,
      async () => {
        const cardTitle = page.getByText(
          "Gli errori rilevati nei siti web per criterio di successo",
          { exact: true }
        );
        await expect(cardTitle).toBeVisible();

        const table = cardTitle.locator("xpath=following::table[1]");
        await expect(table).toBeVisible();

        const numericTdRegex = /^[\d.,\s%]+$/;
        const numericTds = table.locator("td").filter({
          hasText: numericTdRegex,
        });

        const count = await numericTds.count();
        await expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
          console.log(
            "numericTds",
            i,
            (await numericTds.nth(i).innerText()).trim()
          );

          const textAlign = await numericTds
            .nth(i)
            .evaluate((el) => getComputedStyle(el).textAlign);

          expect(textAlign).toBe("right");
        }
        const container = cardTitle.locator(
          'xpath=ancestor::div[contains(@class, "customSpacing")][1]'
        );
        const border = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return {
            top: `${s.borderTopWidth} ${s.borderTopStyle}`,
            right: `${s.borderRightWidth} ${s.borderRightStyle}`,
            bottom: `${s.borderBottomWidth} ${s.borderBottomStyle}`,
            left: `${s.borderLeftWidth} ${s.borderLeftStyle}`,
          };
        });
        expect(border.top).toBe("0px none");
        expect(border.right).toBe("0px none");
        expect(border.bottom).toBe("0px none");
        expect(border.left).toBe("0px none");

        await expect(container).toBeVisible();
        const deskTopMargin = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return { marginTop: s.marginTop, marginBottom: s.marginBottom };
        });
        await expect(deskTopMargin.marginTop).toBe("56px");
        await expect(deskTopMargin.marginBottom).toBe("56px");

        await page.setViewportSize({ width: 400, height: 812 });
        const mobileMargin = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return { marginTop: s.marginTop, marginBottom: s.marginBottom };
        });
        await expect(mobileMargin.marginTop).toBe("32px");
        await expect(mobileMargin.marginBottom).toBe("32px");

        await page.setViewportSize(original);
      }
    );

    await testSiteImprove.step(
      `Tabella: Gli errori rilevati nei documenti PDF per criterio di successo`,
      async () => {
        const cardTitle = page.getByText(
          "Gli errori rilevati nei documenti PDF per criterio di successo",
          { exact: true }
        );
        await expect(cardTitle).toBeVisible();

        const table = cardTitle.locator("xpath=following::table[1]");
        await expect(table).toBeVisible();

        const numericTdRegex = /^[\d.,\s%]+$/;
        const numericTds = table.locator("td").filter({
          hasText: numericTdRegex,
        });

        const count = await numericTds.count();
        await expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
          const textAlign = await numericTds
            .nth(i)
            .evaluate((el) => getComputedStyle(el).textAlign);

          expect(textAlign).toBe("right");
        }
        const container = cardTitle.locator(
          'xpath=ancestor::div[contains(@class, "customSpacing")][1]'
        );

        const border = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return {
            top: `${s.borderTopWidth} ${s.borderTopStyle}`,
            right: `${s.borderRightWidth} ${s.borderRightStyle}`,
            bottom: `${s.borderBottomWidth} ${s.borderBottomStyle}`,
            left: `${s.borderLeftWidth} ${s.borderLeftStyle}`,
          };
        });
        expect(border.top).toBe("0px none");
        expect(border.right).toBe("0px none");
        expect(border.bottom).toBe("0px none");
        expect(border.left).toBe("0px none");

        await expect(container).toBeVisible();

        const deskTopMargin = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return { marginTop: s.marginTop, marginBottom: s.marginBottom };
        });
        await expect(deskTopMargin.marginTop).toBe("56px");
        await expect(deskTopMargin.marginBottom).toBe("56px");

        await page.setViewportSize({ width: 400, height: 812 });
        const mobileMargin = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return { marginTop: s.marginTop, marginBottom: s.marginBottom };
        });
        await expect(mobileMargin.marginTop).toBe("32px");
        await expect(mobileMargin.marginBottom).toBe("32px");

        await page.setViewportSize(original);

        const description = page.locator("div.didascalia").nth(1);
        await expect(description).toContainText(
          "La tabella mostra le percentuali di errore sui criteri di successo rilevati automaticamente da MAUVE++ nei documenti PDF, per il trimestre di monitoraggio.  Di tutti i criteri previsti dalla norma tecnica  UNI EN 301 549, MAUVE++ analizza i 9 elencati nella tabella."
        );
      }
    );

    await testSiteImprove.step(`Paragrafo 8 colonne`, async () => {
      const paragraph = page.locator("p", {
        hasText:
          "Il grafico mostra i quattro principi di accessibilità (Percepibile, Utilizzabile, Comprensibile e Robusto) e la percentuale di errore rilevata automaticamente da MAUVE++ nei siti web delle PA per ciascun principio, nel trimestre di monitoraggio. I principi di accessibilità sono definiti dalle WCAG 2.1.",
      });

      await expect(paragraph).toBeVisible();
      const container = paragraph.locator(
        'xpath=ancestor::div[contains(@class, "col-lg-8")][1]'
      );
      await expect(container).toBeVisible();
    });
  }
);

testSiteImprove(
  "5	- Visualizzare il contenuto della pagina Errori monitoraggio approfondito",
  async ({ page }) => {
    await page.goto("/");
    const original = page.viewportSize()!;

    await page.getByRole("link", { name: "ITA espandi" }).click();
    await page.getByRole("link", { name: "ENGLISH" }).click();
    await page.getByRole("link", { name: "Errors espandi" }).click();
    await page.getByRole("link", { name: "In-depth error monitoring" }).click();
    await expect(
      page.getByRole("heading", { name: "In-depth error monitoring" })
    ).toBeVisible();

    await testSiteImprove.step(
      `Tabella: Errors detected in websites by success criteria`,
      async () => {
        const cardTitle = page.getByText(
          "Errors detected in websites by success criteria",
          { exact: true }
        );
        await expect(cardTitle).toBeVisible();

        const table = cardTitle.locator("xpath=following::table[1]");
        await expect(table).toBeVisible();

        const numericTdRegex = /^[\d.,\s%]+$/;
        const numericTds = table.locator("td").filter({
          hasText: numericTdRegex,
        });

        const count = await numericTds.count();
        await expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
          const textAlign = await numericTds
            .nth(i)
            .evaluate((el) => getComputedStyle(el).textAlign);

          expect(textAlign).toBe("right");
        }
        const container = cardTitle.locator(
          'xpath=ancestor::div[contains(@class, "customSpacing")][1]'
        );
        const border = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return {
            top: `${s.borderTopWidth} ${s.borderTopStyle}`,
            right: `${s.borderRightWidth} ${s.borderRightStyle}`,
            bottom: `${s.borderBottomWidth} ${s.borderBottomStyle}`,
            left: `${s.borderLeftWidth} ${s.borderLeftStyle}`,
          };
        });
        expect(border.top).toBe("0px none");
        expect(border.right).toBe("0px none");
        expect(border.bottom).toBe("0px none");
        expect(border.left).toBe("0px none");

        await expect(container).toBeVisible();
        const deskTopMargin = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return { marginTop: s.marginTop, marginBottom: s.marginBottom };
        });
        await expect(deskTopMargin.marginTop).toBe("56px");
        await expect(deskTopMargin.marginBottom).toBe("56px");

        await page.setViewportSize({ width: 400, height: 812 });
        const mobileMargin = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return { marginTop: s.marginTop, marginBottom: s.marginBottom };
        });
        await expect(mobileMargin.marginTop).toBe("32px");
        await expect(mobileMargin.marginBottom).toBe("32px");

        await page.setViewportSize(original);
      }
    );

    await testSiteImprove.step(
      `Tabella: Errors detected in PDF documents by success criteria`,
      async () => {
        const cardTitle = page.getByText(
          "Errors detected in PDF documents by success criteria",
          { exact: true }
        );
        await expect(cardTitle).toBeVisible();

        const table = cardTitle.locator("xpath=following::table[1]");
        await expect(table).toBeVisible();

        const numericTdRegex = /^[\d.,\s%]+$/;
        const numericTds = table.locator("td").filter({
          hasText: numericTdRegex,
        });

        const count = await numericTds.count();
        await expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
          const textAlign = await numericTds
            .nth(i)
            .evaluate((el) => getComputedStyle(el).textAlign);

          expect(textAlign).toBe("right");
        }
        const container = cardTitle.locator(
          'xpath=ancestor::div[contains(@class, "customSpacing")][1]'
        );
        const border = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return {
            top: `${s.borderTopWidth} ${s.borderTopStyle}`,
            right: `${s.borderRightWidth} ${s.borderRightStyle}`,
            bottom: `${s.borderBottomWidth} ${s.borderBottomStyle}`,
            left: `${s.borderLeftWidth} ${s.borderLeftStyle}`,
          };
        });
        expect(border.top).toBe("0px none");
        expect(border.right).toBe("0px none");
        expect(border.bottom).toBe("0px none");
        expect(border.left).toBe("0px none");

        await expect(container).toBeVisible();
        const deskTopMargin = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return { marginTop: s.marginTop, marginBottom: s.marginBottom };
        });
        await expect(deskTopMargin.marginTop).toBe("56px");
        await expect(deskTopMargin.marginBottom).toBe("56px");

        await page.setViewportSize({ width: 400, height: 812 });
        const mobileMargin = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return { marginTop: s.marginTop, marginBottom: s.marginBottom };
        });
        await expect(mobileMargin.marginTop).toBe("32px");
        await expect(mobileMargin.marginBottom).toBe("32px");

        await page.setViewportSize(original);
      }
    );

    await testSiteImprove.step(
      `Tabella: Errors detected in apps by success criteria`,
      async () => {
        const cardTitle = page.getByText(
          "Errors detected in apps by success criteria",
          { exact: true }
        );
        await expect(cardTitle).toBeVisible();

        const table = cardTitle.locator("xpath=following::table[1]");
        await expect(table).toBeVisible();

        const numericTdRegex = /^[\d.,\s%]+$/;
        const numericTds = table.locator("td").filter({
          hasText: numericTdRegex,
        });

        const count = await numericTds.count();
        await expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
          const textAlign = await numericTds
            .nth(i)
            .evaluate((el) => getComputedStyle(el).textAlign);

          expect(textAlign).toBe("right");
        }
        const container = cardTitle.locator(
          'xpath=ancestor::div[contains(@class, "customSpacing")][1]'
        );

        const border = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return {
            top: `${s.borderTopWidth} ${s.borderTopStyle}`,
            right: `${s.borderRightWidth} ${s.borderRightStyle}`,
            bottom: `${s.borderBottomWidth} ${s.borderBottomStyle}`,
            left: `${s.borderLeftWidth} ${s.borderLeftStyle}`,
          };
        });
        expect(border.top).toBe("0px none");
        expect(border.right).toBe("0px none");
        expect(border.bottom).toBe("0px none");
        expect(border.left).toBe("0px none");

        await expect(container).toBeVisible();
        const deskTopMargin = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return { marginTop: s.marginTop, marginBottom: s.marginBottom };
        });
        await expect(deskTopMargin.marginTop).toBe("56px");
        await expect(deskTopMargin.marginBottom).toBe("56px");

        await page.setViewportSize({ width: 400, height: 812 });
        const mobileMargin = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return { marginTop: s.marginTop, marginBottom: s.marginBottom };
        });
        await expect(mobileMargin.marginTop).toBe("32px");
        await expect(mobileMargin.marginBottom).toBe("32px");

        await page.setViewportSize(original);
      }
    );

    await testSiteImprove.step(`Paragrafo 8 colonne`, async () => {
      const paragraph = page.locator("p", {
        hasText:
          "The table shows the success criteria with the highest error rates detected by manual analysis in PA PDF documents, in the monitoring year.",
      });

      await expect(paragraph).toBeVisible();
      const container = paragraph.locator(
        'xpath=ancestor::div[contains(@class, "col-lg-8")][1]'
      );
      await expect(container).toBeVisible();
    });
  }
);

testSiteImprove(
  "6	- Visualizzare il contenuto della pagina “Dichiarazioni accessibilità”",
  async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Dichiarazioni espandi" }).click();
    await page
      .getByRole("link", { name: "Dichiarazioni accessibilità" })
      .click();
    await expect(
      page.getByRole("heading", { name: "Dichiarazioni accessibilità" })
    ).toBeVisible();

    await testSiteImprove.step(`Paragrafo 8 colonne`, async () => {
      const paragraph = page.locator("p", {
        hasText:
          "Compilando la dichiarazione di accessibilità le PA rendono noto lo stato di conformità dei loro servizi digitali web, sulla base delle verifiche effettuate. Un servizio digitale è dichiarato “conforme” se non è stato rilevato alcun errore di accessibilità, cioè se i punti di controllo soddisfatti sono pari al 100%; è dichiarato “parzialmente conforme” se i punti di controllo soddisfatti sono superiori al 50%, ma inferiori al 100%; è dichiarato “non conforme” se i punti di controllo soddisfatti sono inferiori al 50%. Ogni dichiarazione di accessibilità compilata dalle PA è conforme by design, grazie al form.agid.it predisposto da AgID in base a quanto previsto dalla Direttiva UE 2016/2102.",
      });
      await expect(paragraph).toBeVisible();
      const container = paragraph.locator(
        'xpath=ancestor::div[contains(@class, "col-lg-8")][1]'
      );
      await expect(container).toBeVisible();
    });
  }
);

testSiteImprove(
  "7	- Visualizzare il contenuto della pagina Dichiarazioni di accessibilità dei siti web",
  async ({ page }) => {
    await page.goto("/");
    const original = page.viewportSize()!;

    await page.getByRole("link", { name: "Dichiarazioni espandi" }).click();
    await page.getByRole("link", { name: "Dichiarazioni siti web" }).click();
    await expect(
      page.getByRole("heading", {
        name: "Dichiarazioni di accessibilità dei siti web",
        exact: true,
      })
    ).toBeVisible();

    await testSiteImprove.step(
      `Tabella: Dichiarazioni di accessibilità dei siti web istituzionali`,
      async () => {
        const cardTitle = page.getByText(
          "Dichiarazioni di accessibilità dei siti web istituzionali",
          { exact: true }
        );
        await expect(cardTitle).toBeVisible();

        const table = cardTitle.locator("xpath=following::table[1]");
        await expect(table).toBeVisible();

        const numericTdRegex = /^[\d.,\s%]+$/;
        const numericTds = table.locator("td").filter({
          hasText: numericTdRegex,
        });

        const count = await numericTds.count();
        await expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
          const textAlign = await numericTds
            .nth(i)
            .evaluate((el) => getComputedStyle(el).textAlign);

          expect(textAlign).toBe("right");
        }

        const container = cardTitle.locator(
          'xpath=ancestor::div[contains(@class, "customSpacing")][1]'
        );

        const border = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return {
            top: `${s.borderTopWidth} ${s.borderTopStyle}`,
            right: `${s.borderRightWidth} ${s.borderRightStyle}`,
            bottom: `${s.borderBottomWidth} ${s.borderBottomStyle}`,
            left: `${s.borderLeftWidth} ${s.borderLeftStyle}`,
          };
        });
        expect(border.top).toBe("0px none");
        expect(border.right).toBe("0px none");
        expect(border.bottom).toBe("0px none");
        expect(border.left).toBe("0px none");

        await expect(container).toBeVisible();
        const deskTopMargin = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return { marginTop: s.marginTop, marginBottom: s.marginBottom };
        });
        await expect(deskTopMargin.marginTop).toBe("56px");
        await expect(deskTopMargin.marginBottom).toBe("56px");

        await page.setViewportSize({ width: 400, height: 812 });
        const mobileMargin = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return { marginTop: s.marginTop, marginBottom: s.marginBottom };
        });
        await expect(mobileMargin.marginTop).toBe("32px");
        await expect(mobileMargin.marginBottom).toBe("32px");

        await page.setViewportSize(original);
      }
    );

    await testSiteImprove.step(
      `Tabella: Dichiarazioni di accessibilità dei siti web istituzionali e tematici`,
      async () => {
        const cardTitle = page.getByText(
          "Dichiarazioni di accessibilità dei siti web istituzionali e tematici",
          { exact: true }
        );
        await expect(cardTitle).toBeVisible();

        const table = cardTitle.locator("xpath=following::table[1]");
        await expect(table).toBeVisible();

        const numericTdRegex = /^[\d.,\s%]+$/;
        const numericTds = table.locator("td").filter({
          hasText: numericTdRegex,
        });

        const count = await numericTds.count();
        await expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
          const textAlign = await numericTds
            .nth(i)
            .evaluate((el) => getComputedStyle(el).textAlign);

          expect(textAlign).toBe("right");
        }

        const container = cardTitle.locator(
          'xpath=ancestor::div[contains(@class, "customSpacing")][1]'
        );

        await expect(container).toBeVisible();
        const deskTopMargin = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return { marginTop: s.marginTop, marginBottom: s.marginBottom };
        });
        await expect(deskTopMargin.marginTop).toBe("56px");
        await expect(deskTopMargin.marginBottom).toBe("56px");

        await page.setViewportSize({ width: 400, height: 812 });
        const mobileMargin = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return { marginTop: s.marginTop, marginBottom: s.marginBottom };
        });
        await expect(mobileMargin.marginTop).toBe("32px");
        await expect(mobileMargin.marginBottom).toBe("32px");

        await page.setViewportSize(original);
      }
    );

    await testSiteImprove.step(`Paragrafo 8 colonne`, async () => {
      const paragraph = page.locator("p", {
        hasText:
          "Compilando la dichiarazione di accessibilità le PA rendono noto lo stato di conformità dei loro siti web, sulla base delle verifiche effettuate. Un sito web è dichiarato “conforme” se non è stato rilevato alcun errore di accessibilità, cioè se punti di controllo soddisfatti sono pari al 100%; è dichiarato “parzialmente conforme” se i punti di controllo soddisfatti sono superiori al 50%, ma inferiori al 100%; è dichiarato “non conforme” se i punti di controllo soddisfatti sono inferiori al 50%. Ogni dichiarazione di accessibilità compilata dalle PA è conforme by design, grazie al form.agid.it predisposto da AgID in base a quanto previsto dalla Direttiva UE 2016/2102.",
      });
      await expect(paragraph).toBeVisible();
      const container = paragraph.locator(
        'xpath=ancestor::div[contains(@class, "col-lg-8")][1]'
      );
      await expect(container).toBeVisible();
    });
  }
);

testSiteImprove(
  "8	- Visualizzare il contenuto della pagina Dichiarazioni di accessibilità delle app",
  async ({ page }) => {
    await page.goto("/");
    const original = page.viewportSize()!;

    await page.getByRole("link", { name: "Dichiarazioni espandi" }).click();
    await page.getByRole("link", { name: "Dichiarazioni app" }).click();
    await expect(
      page.getByRole("heading", {
        name: "Dichiarazioni di accessibilità delle app",
        exact: true,
      })
    ).toBeVisible();

    await testSiteImprove.step(
      `Tabella: Dichiarazioni di accessibilità per Regione e Provincia autonoma`,
      async () => {
        const cardTitle = page.getByText(
          "Dichiarazioni di accessibilità per Regione e Provincia autonoma",
          { exact: true }
        );
        await expect(cardTitle).toBeVisible();

        const table = cardTitle.locator("xpath=following::table[1]");
        await expect(table).toBeVisible();

        const numericTdRegex = /^[\d.,\s%]+$/;
        const numericTds = table.locator("td").filter({
          hasText: numericTdRegex,
        });

        const count = await numericTds.count();
        await expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
          const textAlign = await numericTds
            .nth(i)
            .evaluate((el) => getComputedStyle(el).textAlign);

          expect(textAlign).toBe("right");
        }
        const container = cardTitle.locator(
          'xpath=ancestor::div[contains(@class, "customSpacing")][1]'
        );
        const border = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return {
            top: `${s.borderTopWidth} ${s.borderTopStyle}`,
            right: `${s.borderRightWidth} ${s.borderRightStyle}`,
            bottom: `${s.borderBottomWidth} ${s.borderBottomStyle}`,
            left: `${s.borderLeftWidth} ${s.borderLeftStyle}`,
          };
        });
        expect(border.top).toBe("0px none");
        expect(border.right).toBe("0px none");
        expect(border.bottom).toBe("0px none");
        expect(border.left).toBe("0px none");

        await expect(container).toBeVisible();
        const deskTopMargin = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return { marginTop: s.marginTop, marginBottom: s.marginBottom };
        });
        await expect(deskTopMargin.marginTop).toBe("56px");
        await expect(deskTopMargin.marginBottom).toBe("56px");

        await page.setViewportSize({ width: 400, height: 812 });
        const mobileMargin = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return { marginTop: s.marginTop, marginBottom: s.marginBottom };
        });
        await expect(mobileMargin.marginTop).toBe("32px");
        await expect(mobileMargin.marginBottom).toBe("32px");

        await page.setViewportSize(original);
      }
    );

    await testSiteImprove.step(`Paragrafo 8 colonne`, async () => {
      const paragraph = page.locator("p", {
        hasText:
          "Un'app è dichiarata “conforme” se non è stato rilevato alcun errore di accessibilità, cioè se i punti di controllo soddisfatti sono pari al 100%; è dichiarata “parzialmente conforme” se i punti di controllo soddisfatti sono superiori al 50%, ma inferiori al 100%; è dichiarata “non conforme” se i punti di controllo soddisfatti sono inferiori al 50%. Ogni dichiarazione di accessibilità compilata dalle PA è conforme by design, grazie al form.agid.it predisposto da AgID in base a quanto previsto dalla Direttiva UE 2016/2102.",
      });
      await expect(paragraph).toBeVisible();
      const container = paragraph.locator(
        'xpath=ancestor::div[contains(@class, "col-lg-8")][1]'
      );
      await expect(container).toBeVisible();
    });
  }
);

testSiteImprove(
  "9	- Visualizzare il contenuto della pagina Obiettivi di accessibilità",
  async ({ page }) => {
    await page.goto("/");
    const original = page.viewportSize()!;

    await page.getByRole("link", { name: "ITA espandi" }).click();
    await page.getByRole("link", { name: "ENGLISH" }).click();

    await page.getByRole("link", { name: "Objectives" }).click();
    await expect(
      page.getByRole("heading", {
        name: "Accessibility objectives",
        exact: true,
      })
    ).toBeVisible();

    await testSiteImprove.step(
      `Tabella: Accessibility objectives`,
      async () => {
        const cardTitle = page.getByText("Accessibility objectives", {
          exact: true,
        });
        await expect(cardTitle).toBeVisible();

        const table = page.getByRole("table");
        await expect(table).toBeVisible();

        const numericTdRegex = /^[\d.,\s%]+$/;
        const numericTds = table.locator("td").filter({
          hasText: numericTdRegex,
        });

        const count = await numericTds.count();
        await expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
          const textAlign = await numericTds
            .nth(i)
            .evaluate((el) => getComputedStyle(el).textAlign);

          expect(textAlign).toBe("right");
        }
        const container = cardTitle.locator(
          'xpath=ancestor::div[contains(@class, "customSpacing")][1]'
        );
        const border = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return {
            top: `${s.borderTopWidth} ${s.borderTopStyle}`,
            right: `${s.borderRightWidth} ${s.borderRightStyle}`,
            bottom: `${s.borderBottomWidth} ${s.borderBottomStyle}`,
            left: `${s.borderLeftWidth} ${s.borderLeftStyle}`,
          };
        });
        expect(border.top).toBe("0px none");
        expect(border.right).toBe("0px none");
        expect(border.bottom).toBe("0px none");
        expect(border.left).toBe("0px none");

        await expect(container).toBeVisible();
        const deskTopMargin = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return { marginTop: s.marginTop, marginBottom: s.marginBottom };
        });
        await expect(deskTopMargin.marginTop).toBe("56px");
        await expect(deskTopMargin.marginBottom).toBe("56px");

        await page.setViewportSize({ width: 400, height: 812 });
        const mobileMargin = await container.evaluate((el) => {
          const s = getComputedStyle(el);
          return { marginTop: s.marginTop, marginBottom: s.marginBottom };
        });
        await expect(mobileMargin.marginTop).toBe("32px");
        await expect(mobileMargin.marginBottom).toBe("32px");

        await page.setViewportSize(original);
      }
    );

    await testSiteImprove.step(`Paragrafo 8 colonne`, async () => {
      const paragraph = page.locator("p", {
        hasText:
          "The graph shows the trend, over the years, of the number of accessibility objectives published by PAs for their websites and apps. The increase in publications of objectives highlights the commitment of PAs to make information accessible to all without discrimination and digital services more efficient.",
      });
      await expect(paragraph).toBeVisible();
      const container = paragraph.locator(
        'xpath=ancestor::div[contains(@class, "col-lg-8")][1]'
      );
      await expect(container).toBeVisible();
    });
  }
);

testSiteImprove(
  "10 - Visualizzare il contenuto della pagina “Il progetto di monitoraggio”",
  async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "ITA espandi" }).click();
    await page.getByRole("link", { name: "ENGLISH" }).click();

    await page.getByRole("link", { name: "The project espandi" }).click();
    await page.getByRole("link", { name: "The monitoring project" }).click();
    await expect(
      page.getByRole("heading", { name: "The monitoring project" })
    ).toBeVisible();

    await testSiteImprove.step(`Paragrafo 8 colonne`, async () => {
      const paragraph = page.locator("p", {
        hasText:
          "Monitoring is carried out on the websites, PDF documents and apps of Italian Public Administrations. Monitoring allows AgID to support PAs, through training sessions , handbooks, specialist documentation and other resources, to improve their digital services.",
      });
      await expect(paragraph).toBeVisible();
      const container = paragraph.locator(
        'xpath=ancestor::div[contains(@class, "col-lg-8")][1]'
      );
      await expect(container).toBeVisible();
    });
  }
);
