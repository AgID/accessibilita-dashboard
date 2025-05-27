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

testSiteImprove("Test PdT visualizzazione ITA", async ({ page }) => {
  await page.goto("http://localhost:5000/");

  await test.step(`ID 1`, async () => {
    await page.getByRole("link", { name: "Dichiarazioni espandi" }).click();
    await expect(
      page.getByRole("link", { name: "Dichiarazioni app" })
    ).toBeVisible();
    await expect(
      page.getByLabel("Dichiarazioni").getByRole("list")
    ).toContainText("Dichiarazioni app");
    await page.getByRole("link", { name: "Dichiarazioni app" }).click();
    await expect(page.getByLabel("Sezione dichiarazioni app")).toContainText(
      "Home / Dichiarazioni app"
    );
  });

  await test.step(`ID 2`, async () => {
    await expect(page.getByLabel("Sezione dichiarazioni app")).toContainText(
      "Confronto dell'autovalutazione dello stato di conformità delle app per sistema operativo"
    );
    const downloadPromiseCSV = page.waitForEvent("download");
    await page
      .getByRole("button", { name: "CSV Scarica il file CSV" })
      .nth(2)
      .click();
    const downloadCSV = await downloadPromiseCSV;
    const downloadPromisePDF = page.waitForEvent("download");
    await page
      .getByRole("button", { name: "PDF Scarica il documento PDF" })
      .nth(2)
      .click();
    const downloadPDF = await downloadPromisePDF;
  });

  await test.step(`ID 3`, async () => {
    await page.goto("http://localhost:5000/");

    // Top Header
    const top = page.locator(
      "header.it-header-wrapper >> div.it-header-slim-wrapper.wrap-top"
    );

    await expect(top).toHaveCSS("background-color", "rgb(0, 77, 153)");
    await expect(top).toHaveCSS("height", "48px");
    await expect(page.getByRole("banner")).toMatchAriaSnapshot(`
      - paragraph:
        - link "Agenzia per l’Italia Digitale":
          - /url: https://www.agid.gov.it/
      - link "ITA espandi":
        - /url: /
        - img "espandi"
      `);

    // Header centrale
    const mid = page.locator(
      "header.it-header-wrapper >> div.it-header-center-wrapper"
    );
    await expect(mid).toHaveCSS("background-color", "rgb(0, 102, 204)");
    await expect(mid).toHaveCSS("height", "120px");

    // Navbar
    const nav = page.locator("nav.navbar");
    await expect(nav).toHaveCSS("background-color", "rgb(0, 102, 204)");
    await page.getByRole("link", { name: "Obiettivi", exact: true }).click();
    const links = nav.locator("a.pageChoice");
    const link = links.nth(0);
    const span = link.locator("span");
    await expect(link).toHaveCSS("text-decoration-line", "none");
    await span.hover();
    await expect(span).toHaveCSS("text-decoration-line", "underline");
    await link.click();
    await expect(link).toHaveCSS("border-bottom-color", "rgb(255, 255, 255)");

    // StickyHeader
    await page.evaluate(() => window.scrollTo(0, 500));
    const stickyHeader = page.locator(
      "header.it-header-wrapper >> div.buttonNav"
    );
    await expect(stickyHeader).toHaveCSS("position", "fixed");
    await expect(stickyHeader.locator("img")).toHaveCSS("height", "40px");
  });

  await test.step(`ID 5`, async () => {
    await page.goto("http://localhost:5000/");
    // Sezione Feedback
    const feedback = page.locator("div.feedbackBG");
    await expect(feedback).toBeVisible();
    await expect(feedback).toHaveCSS("background-color", "rgb(0, 102, 204)");

    // Footer
    const central = page.locator("div.central-footer");
    await expect(central).toBeVisible();
    await expect(central).toHaveCSS("background-color", "rgb(0, 77, 153)");

    await expect(
      central.locator('a[href*="next-generation-eu"] img')
    ).toHaveCount(1);
    await expect(
      central.locator('a[href*="innovazione.gov.it"] img')
    ).toHaveCount(1);
    await expect(central.locator('a[href*="agid.gov.it"] img')).toHaveCount(1);
    const socialPar = central.locator("p.socialPar");
    await expect(socialPar).toBeVisible();
    await expect(socialPar).toHaveText("Seguici su");
    await expect(socialPar).toHaveCSS("font-size", "16px");

    const icons = central.locator("div.socialIcons a");
    await expect(icons).toHaveCount(6);
    await icons.first().scrollIntoViewIfNeeded();
    for (let i = 0; i < 6; ++i) await expect(icons.nth(i)).toBeVisible();

    // Link
    const sub = page.locator("div.slim-bottom-footer");
    await expect(sub).toBeVisible();
    const links = sub.locator("a.linkSM");
    await expect(links).toHaveCount(6);

    const expected = [
      { text: "Dichiarazione di accessibilità", external: true },
      { text: "Media policy", external: true },
      { text: "Note legali", external: false },
      { text: "Privacy policy", external: false },
      { text: "Guida alla piattaforma", external: false },
      { text: "Contatti", external: false },
    ];

    for (let i = 0; i < expected.length; ++i) {
      const link = links.nth(i);
      const { text, external } = expected[i];

      await expect(link).toHaveText(text);
      if (external) await expect(link).toHaveAttribute("rel", /noreferrer/);

      await expect(link).toHaveCSS("font-size", "16px");
      await expect(link).toHaveCSS("text-decoration-line", "none");
      await link.hover();
      await expect(link).toHaveCSS("text-decoration-line", "underline");
    }
  });

  await test.step(`ID 7`, async () => {
    await page.goto("http://localhost:5000/");
    await page.getByRole("link", { name: "Errori espandi" }).click();
    await page
      .getByRole("link", { name: "Errori monitoraggio approfondito" })
      .click();
    await expect(page.getByLabel("Sezione errori")).toContainText(
      "Gli errori sono rilevati dall’analisi dei punti di controllo contenuti nel prospetto A.2 della norma tecnica UNI EN 301549, che incorpora le linee guida e i criteri di successo WCAG 2.1."
    );
    const download1Promise = page.waitForEvent("download");
    await page
      .getByTitle(
        "Scarica il file: Gli errori rilevati nei siti web per criterio di successo.csv"
      )
      .click();
    const download1 = await download1Promise;

    const download2Promise = page.waitForEvent("download");
    await page
      .getByTitle(
        "Scarica il file: Gli errori rilevati nei siti web per criterio di successo.pdf"
      )
      .click();
    const download2 = await download2Promise;

    const download3Promise = page.waitForEvent("download");
    await page
      .getByTitle(
        "Scarica il file: Gli errori rilevati nei documenti PDF per criterio di successo.csv"
      )
      .click();
    const download3 = await download3Promise;

    const download4Promise = page.waitForEvent("download");
    await page
      .getByTitle(
        "Scarica il file: Gli errori rilevati nei documenti PDF per criterio di successo.pdf"
      )
      .click();
    const download4 = await download4Promise;

    const download5Promise = page.waitForEvent("download");
    await page
      .getByTitle(
        "Scarica il file: Gli errori rilevati nelle app per criterio di successo.csv"
      )
      .click();
    const download5 = await download5Promise;

    const download6Promise = page.waitForEvent("download");
    await page
      .getByTitle(
        "Scarica il file: Gli errori rilevati nelle app per criterio di successo.pdf"
      )
      .click();
    const download6 = await download6Promise;
  });

  await test.step(`ID 8`, async () => {
    await page.goto("http://localhost:5000/");
    await expect(
      page.getByRole("link", { name: "Media policy" })
    ).toBeVisible();

    const [pageITA] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("link", { name: "Media policy" }).click(),
    ]);
    await expect(pageITA).toHaveURL("https://www.agid.gov.it/it/media-policy");
    await pageITA.close();

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.locator(".it-header-center-content-wrapper").click();
    await page.getByRole("link", { name: "ITA espandi" }).click();
    await page.getByRole("link", { name: "ENGLISH" }).click();

    const [pageENG] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("link", { name: "Media policy" }).click(),
    ]);
    await expect(pageENG).toHaveURL(
      "https://www.agid.gov.it/en/media-policy-en"
    );
    await pageENG.close();
  });

  await test.step(`ID 9`, async () => {
    await page.goto("http://localhost:5000/");
    const noteLink = page.locator("a.linkSM", { hasText: "Note legali" });
    await noteLink.scrollIntoViewIfNeeded();
    await noteLink.click();
    await expect(page).toHaveURL(/\/note-legali/);

    const { containerX, breadcrumbX, updateX } = await page.evaluate(() => {
      const container = document.querySelector(
        "div.insideContainer"
      ) as HTMLElement;
      const breadcrumb = document.querySelector(
        "div.breadcrumb"
      ) as HTMLElement;
      const update = document.querySelector("p.periodoLabel") as HTMLElement;
      return {
        containerX: container.offsetLeft,
        breadcrumbX: breadcrumb.offsetLeft,
        updateX: update.offsetLeft,
      };
    });
    expect(breadcrumbX).toBe(containerX);
    expect(updateX).toBe(containerX);

    const update = page.locator("p.periodoLabel");
    await expect(update).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");

    await expect(page.getByLabel("Note legali")).toContainText(
      "L’Agenzia per l’Italia Digitale (AgID)"
    );
  });

  await test.step(`ID 10`, async () => {
    await page.goto("http://localhost:5000/");

    const privacyLink = page.locator("a.linkSM", { hasText: "Privacy policy" });
    await privacyLink.scrollIntoViewIfNeeded();
    await privacyLink.click();
    await expect(page).toHaveURL(/\/privacy-policy/);

    const { containerX, breadcrumbX, updateX } = await page.evaluate(() => {
      const container = document.querySelector(
        "div.insideContainer"
      ) as HTMLElement;
      const breadcrumb = document.querySelector(
        "div.breadcrumb"
      ) as HTMLElement;
      const update = document.querySelector("p.periodoLabel") as HTMLElement;
      return {
        containerX: container.offsetLeft,
        breadcrumbX: breadcrumb.offsetLeft,
        updateX: update.offsetLeft,
      };
    });
    expect(breadcrumbX).toBe(containerX);
    expect(updateX).toBe(containerX);

    await expect(page.locator("p.periodoLabel")).toHaveCSS(
      "background-color",
      "rgba(0, 0, 0, 0)"
    );

    const bcText = (await page.locator("div.breadcrumb").textContent()) ?? "";
    const titleText = (await page.locator("h1").textContent()) ?? "";
    expect(bcText).toMatch(/\bpolicy\b/);
    expect(bcText).not.toMatch(/\bPolicy\b/);
    expect(titleText).toMatch(/\bpolicy\b/);
    expect(titleText).not.toMatch(/\bPolicy\b/);
  });

  await test.step(`ID 11`, async () => {
    await page.goto("http://localhost:5000/");

    await expect(
      page.getByRole("heading", { name: "Il monitoraggio in dettaglio" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Semplificato" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Approfondito" })
    ).toBeVisible();

    await page
      .getByRole("button", { name: "Siti web valutati (valori" })
      .click();
    await expect(page.getByRole("region")).toMatchAriaSnapshot(`
    - heading /Anno \\d+ \\d+\\.\\d+ Dettaglio per trimestre/ [level=2]:
      - button /Anno \\d+ \\d+\\.\\d+ Dettaglio per trimestre/
    - heading /Anno \\d+ \\d+\\.\\d+ Dettaglio per trimestre/ [level=2]:
      - button /Anno \\d+ \\d+\\.\\d+ Dettaglio per trimestre/
    - heading /Anno \\d+ \\d+\\.\\d+ Dettaglio per trimestre/ [level=2]:
      - button /Anno \\d+ \\d+\\.\\d+ Dettaglio per trimestre/
    `);
    await page
      .getByRole("button", { name: "Anno 2023 79.945 Dettaglio" })
      .click();
    await expect(page.getByLabel("Anno 2023 79.945 Dettaglio"))
      .toMatchAriaSnapshot(`
    - paragraph: Primo trimestre
    - paragraph: /\\d+\\.\\d+/
    - paragraph: Secondo trimestre
    - paragraph: /\\d+\\.\\d+/
    - paragraph: Terzo trimestre
    - paragraph: /\\d+\\.\\d+/
    - paragraph: Quarto trimestre
    - paragraph: /\\d+\\.\\d+/
    `);
    await page.getByRole("button", { name: "Approfondito" }).click();
    await expect(
      page.getByRole("button", { name: "Siti web valutati (valori" })
    ).toBeVisible();
    await expect(page.getByRole("region")).toMatchAriaSnapshot(`
    - paragraph: /Anno \\d+ \\d+/
    - paragraph: /Anno \\d+ \\d+/
    `);
    await expect(
      page.getByRole("button", { name: "App valutate (valori totali)" })
    ).toBeVisible();

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.locator(".it-header-center-content-wrapper").click();
    await page.getByRole("link", { name: "ITA espandi" }).click();
    await page.getByRole("link", { name: "ENGLISH" }).click();

    await expect(
      page.getByRole("heading", { name: "Monitoring in detail" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Simplified" })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "In-depth" })).toBeVisible();
  });

  await test.step(`ID 12`, async () => {
    await page.goto("http://localhost:5000/");

    const guideLink = page.locator("a.linkSM", {
      hasText: "Guida alla piattaforma",
    });
    await guideLink.scrollIntoViewIfNeeded();
    await guideLink.click();
    await expect(page).toHaveURL(/\/guida-alla-piattaforma/);

    const sidebar = page.locator("div.d-none.d-lg-block.col-lg-4");
    const main = page.locator("div.col-12.col-lg-8");
    await expect(sidebar).toBeVisible();
    await expect(main).toBeVisible();

    await expect(page.getByRole("region")).toMatchAriaSnapshot(`
      - paragraph: INDICE DEI CONTENUTI
      - tablist:
        - tab "Introduzione" [selected]
        - tab "Struttura del sito web"
        - tab "Funzionalità"
        - tab "Navigazione"
      `);

    await page.locator(".it-header-center-content-wrapper").click();
    await page.getByRole("link", { name: "ITA espandi" }).click();
    await page.getByRole("link", { name: "ENGLISH" }).click();
    await expect(
      page.getByRole("heading", { name: "Guide to the platform" })
    ).toBeVisible();

    await expect(page.getByRole("region")).toMatchAriaSnapshot(`
      - paragraph: TABLE OF CONTENTS
      - tablist:
        - tab "Introduction" [selected]
        - tab "Website structure"
        - tab "Features"
        - tab "Navigation"
      `);
  });

  await test.step(`ID 13`, async () => {
    await page.goto("http://localhost:5000/");
    await page.getByRole("link", { name: "Il progetto" }).click();
    await page.getByRole("link", { name: "Cronologia del progetto" }).click();
    await expect(page).toHaveURL(/\/cronologia/);
    await expect(
      page.getByRole("heading", { name: "Cronologia del progetto" })
    ).toBeVisible();

    const hasSitoWeb = await page.evaluate(() => {
      const text = document.body.innerText;
      return /\b(sito|siti)\s+web\b/i.test(text);
    });
    expect(hasSitoWeb).toBeTruthy();

    const hasDocumentiPDF = await page.evaluate(() => {
      const text = document.body.innerText;
      return /\b(documento|documenti)\s+PDF\b/.test(text);
    });
    expect(hasDocumentiPDF).toBeTruthy();
  });

  await test.step(`ID 14`, async () => {
    await page.goto("http://localhost:5000/");
    await page.getByRole("link", { name: "Dichiarazioni espandi" }).click();
    await page.getByRole("link", { name: "Dichiarazioni siti web" }).click();

    await expect(
      page.getByLabel("Sezione dichiarazioni siti web")
    ).toContainText(
      "Totale di siti web istituzionali censiti su Indice PA nel 2024"
    );
    await expect(
      page.getByLabel("Sezione dichiarazioni siti web")
    ).toContainText(
      "Siti web istituzionali censiti su Indice PA che hanno pubblicato la dichiarazione nel 2024"
    );

    await page
      .getByText("Dichiarazioni di accessibilità dei siti web istituzionali", {
        exact: true,
      })
      .click();
    const downloadPromise = page.waitForEvent("download");
    await page
      .getByTitle(
        "Scarica il file: Dichiarazioni di accessibilità dei siti web istituzionali.csv"
      )
      .click();
    const download = await downloadPromise;
    const download1Promise = page.waitForEvent("download");
    await page
      .getByTitle(
        "Scarica il file: Dichiarazioni di accessibilità dei siti web istituzionali.pdf"
      )
      .click();
    const download1 = await download1Promise;

    await expect(
      page.getByRole("heading", { name: "Siti web tematici", exact: true })
    ).toBeVisible();
    await expect(
      page.getByLabel("Sezione dichiarazioni siti web")
    ).toContainText(
      "I siti web tematici sono gestiti da enti pubblici o ministeri responsabili di un’area di competenza specifica, ma non censiti su Indice PA. Forniscono in modo rapido ed efficiente informazioni, servizi e risorse specifiche che favoriscono la cittadinanza, le imprese e altre parti interessate."
    );

    await page
      .getByRole("heading", {
        name: "Confronto dell'autovalutazione dello stato di conformità tra siti web istituzionali e siti web tematici delle PA",
      })
      .click();

    const download2Promise = page.waitForEvent("download");
    await page.getByTitle("Scarica il file: Confronto").first().click();
    const download2 = await download2Promise;
    const download3Promise = page.waitForEvent("download");
    await page.getByTitle("Scarica il file: Confronto").nth(1).click();
    const download3 = await download3Promise;
  });

  await test.step(`ID 15`, async () => {
    await page.goto("http://localhost:5000/");
    await page.getByRole("link", { name: "Monitoraggio espandi" }).click();
    await page
      .getByRole("link", { name: "Monitoraggio semplificato", exact: true })
      .click();
    await expect(page.getByLabel("Sezione monitoraggio")).toContainText(
      "Il monitoraggio semplificato è realizzato ogni tre mesi attraverso il validatore MAUVE++, che analizza l’accessibilità di siti web e documenti PDF delle PA sui livelli di conformità A e AA, obbligatori per legge. Per i siti web, l’analisi è condotta in maniera automatizzata su 31 dei 50 criteri di successo indicati nelle WCAG 2.1, attraverso la scansione del codice sorgente e il contenuto presente nei rispettivi supporti monitorati. Per quanto possibile, il monitoraggio avviene su più pagine di uno stesso sito web e su più siti web di una PA. L’uso di un sistema automatizzato permette di effettuare monitoraggi più ravvicinati nel tempo e di verificare l’accessibilità di sempre più siti web; il set di domini su cui il monitoraggio si svolge è costantemente arricchito e revisionato, per dare una rappresentazione quanto più completa, corretta e aggiornata dello stato di accessibilità digitale delle Pubbliche Amministrazioni. In questo modo si genera un ricchissimo patrimonio di dati, che per la prima volta in Italia tutti i cittadini possono consultare e che le PA possono utilizzare per rendere i loro servizi sempre più fruibili e inclusivi."
    );
    await page.getByText(
      "Siti web monitorati per Regione e Provincia autonoma"
    );
    await expect(page.getByLabel("Sezione monitoraggio")).toContainText(
      "La tabella elenca tutte le Regioni e le Province autonome italiane e mostra per ciascuna di esse il numero di siti web monitorati e la percentuale di criteri di successo, di livello A e AA, non soddisfatti."
    );
    await expect(page.getByRole("table")).toContainText(
      "Criteri di successo non soddisfatti"
    );
    const download1Promise = page.waitForEvent("download");
    await page
      .getByTitle(
        "Scarica il file: Siti web monitorati per Regione e Provincia autonoma.csv"
      )
      .click();
    const download1 = await download1Promise;
    const download2Promise = page.waitForEvent("download");
    await page
      .getByTitle(
        "Scarica il file: Siti web monitorati per Regione e Provincia autonoma.pdf"
      )
      .click();
    const download2 = await download2Promise;
  });

  await test.step(`ID 16`, async () => {
    const href = await page
      .locator('head link[rel="icon"]')
      .getAttribute("href");
    expect(href).toBe("/favicon_accessibilita.svg");

    const faviconUrl = new URL(href!, page.url()).toString();
    const response = await page.request.get(faviconUrl);
    expect(response.status()).toBe(200);

    const svgText = await response.text();
    expect(svgText).toMatch(/<circle[^>]+fill=["']white["'][^>]*>/i);
    expect(svgText).toMatch(/<path[^>]+fill=["']#0066CC["'][^>]*>/i);
  });

  await test.step(`ID 17`, async () => {
    await page.goto("http://localhost:5000/");
    await page.getByRole("link", { name: "Il progetto espandi" }).click();
    await page
      .getByRole("link", { name: "Il progetto di monitoraggio" })
      .click();
    await expect(page.getByLabel("Sezione progetto")).toMatchAriaSnapshot(`
      - link "sessioni formative":
        - /url: https://accessibilita.agid.gov.it/formazione
        - img
      `);
    await expect(page.getByLabel("Sezione progetto")).toContainText(
      "sessioni formative"
    );

    const [pageFormazione] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("link", { name: "sessioni formative" }).click(),
    ]);
    await expect(pageFormazione).toHaveURL(
      "https://accessibilita.agid.gov.it/formazione/"
    );
    await pageFormazione.close();

    await expect(page.getByLabel("Sezione progetto")).toContainText(
      "AgID ad oggi ha già ampiamente superato il controllo dell’accessibilità sui 23.000 item richiesti. Da quando sono iniziate le attività previste dalla misura 1.4.2 sono state eseguite verifiche, per più volte, sia sui siti web censiti tramite Indice PA, sia su altri siti web di PA non censiti su IPA, interessando complessivamente decine di milioni di pagine web. Sono, inoltre, state eseguite in modalità approfondita e manuale più di 400 verifiche su siti web e più di 200 verifiche su app."
    );
  });

  await test.step(`ID 18`, async () => {
    await page.goto("http://localhost:5000/");
    await page.getByRole("link", { name: "Obiettivi" }).click();
    const download1Promise = page.waitForEvent("download");
    await page
      .getByTitle("Scarica il file: Obiettivi di accessibilità.csv")
      .click();
    const download1 = await download1Promise;

    const download2Promise = page.waitForEvent("download");
    await page
      .getByTitle("Scarica il file: Obiettivi di accessibilità.pdf")
      .click();
    const download2 = await download2Promise;
  });

  await test.step(`ID 19`, async () => {
    await page.goto("http://localhost:5000/");
    await page.getByRole("link", { name: "Errori espandi" }).click();
    await page
      .getByRole("link", { name: "Errori monitoraggio semplificato" })
      .click();

    const download1Promise = page.waitForEvent("download");
    await page
      .getByTitle(
        "Scarica il file: Gli errori rilevati nei siti web per criterio di successo.csv"
      )
      .click();
    const download1 = await download1Promise;

    const download2Promise = page.waitForEvent("download");
    await page
      .getByTitle(
        "Scarica il file: Gli errori rilevati nei siti web per criterio di successo.pdf"
      )
      .click();
    const download2 = await download2Promise;

    const download3Promise = page.waitForEvent("download");
    await page
      .getByTitle(
        "Scarica il file: Gli errori rilevati nei documenti PDF per criterio di successo.csv"
      )
      .click();
    const download3 = await download3Promise;

    const download4Promise = page.waitForEvent("download");
    await page
      .getByTitle(
        "Scarica il file: Gli errori rilevati nei documenti PDF per criterio di successo.pdf"
      )
      .click();
    const download4 = await download4Promise;
  });
});

testSiteImprove("Test PdT visualizzazione ENG", async ({ page }) => {
  await page.goto("http://localhost:5000/");
  await page.getByRole("link", { name: "ITA espandi" }).click();
  await page.getByRole("link", { name: "ENGLISH" }).click();

  await test.step(`ID 1`, async () => {
    await page.getByRole("link", { name: "Statements espandi" }).click();
    await expect(
      page.getByRole("link", { name: "App statements" })
    ).toBeVisible();
    await expect(
      page.getByLabel("Statements", { exact: true }).getByRole("list")
    ).toContainText("App statements");
    await page.getByRole("link", { name: "App statements" }).click();
    await expect(page.getByLabel("App statements section")).toContainText(
      "Home / App statements"
    );
  });

  await test.step(`ID 2`, async () => {
    await expect(page.getByLabel("App statements section")).toContainText(
      "Comparison of the self-assessment of compliance status for operating system apps"
    );
    const downloadPromiseCSV = page.waitForEvent("download");
    await page
      .getByRole("button", { name: "CSV Download the CSV file" })
      .nth(2)
      .click();
    const downloadCSV = await downloadPromiseCSV;
    const downloadPromisePDF = page.waitForEvent("download");
    await page
      .getByRole("button", { name: "PDF Download the PDF document" })
      .nth(2)
      .click();
    const downloadPDF = await downloadPromisePDF;
  });
});
