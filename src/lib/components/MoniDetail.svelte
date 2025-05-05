<script>
  import { nf } from "../utils";
  import { t } from "../utils/i18n";

  export let activeTab;
  export let rows = [];

  const quarters = [1, 2, 3, 4];
  function hasQuarter(items, qNum) {
    return items.some(
      (r) =>
        typeof r.periodo_monitoraggio === "string" &&
        r.periodo_monitoraggio.startsWith(`Q${qNum}-`)
    );
  }

  function quarterValue(items, qNum, field) {
    const rec = items.find(
      (r) =>
        typeof r.periodo_monitoraggio === "string" &&
        r.periodo_monitoraggio.startsWith(`Q${qNum}-`)
    );
    return rec ? nf(rec[field]) : 0;
  }

  function yearSum(items, field) {
    return nf(items.reduce((sum, row) => sum + row[field], 0));
  }

  let byYear = {};
  let totaleSiti = 0,
    totalePagine = 0,
    totalePdf = 0,
    totaleApp = 0;

  $: {
    byYear = {};
    totaleSiti = totalePagine = totalePdf = totaleApp = 0;

    rows.forEach((r) => {
      const year =
        activeTab === "tab1"
          ? new Date(r.data_monitoraggio).getFullYear()
          : r.anno_monitoraggio;

      if (!byYear[year]) byYear[year] = [];
      byYear[year].push(r);

      totaleSiti += r.num_siti_monitorati;
      totalePagine += r.num_pagine_web_monitorate;
      totalePdf += r.num_pdf_monitorati;
      if (activeTab === "tab2") totaleApp += r.num_app_monitorate;
    });
  }
</script>

<div class="accordion" id="collapseExample">
  <!-- SITI -->
  <div class="accordion-item">
    <h2 class="accordion-header" id="headSiti">
      <button
        class="accordion-button d-block d-lg-flex collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseSiti"
        aria-expanded="false"
        aria-controls="collapseSiti"
      >
        <span class="d-flex d-lg-inline mb-3 mb-lg-0">
          <span class="pe-3 pe-lg-0">
            <span class="oggettoValutazione">{$t("moniDettaglio.siti")}</span>
            <span class="periodoValutazione">{$t("moniDettaglio.totale")}</span>
          </span>
          <span class="totaleValutazione ms-auto ms-lg-4">{nf(totaleSiti)}</span
          >
        </span>
        <span class="ms-auto dettaglioText">{$t("moniDettaglio.dettAnno")}</span
        >
      </button>
    </h2>
    <div
      id="collapseSiti"
      class="accordion-collapse collapse"
      role="region"
      aria-labelledby="headSiti"
    >
      <div class="accordion-body">
        {#if activeTab === "tab1"}
          {#each Object.entries(byYear) as [year, items]}
            <div class="accordion-item accordionBorders">
              <h2 class="accordion-header" id="headingAnnoSiti-{year}">
                <button
                  class="accordion-button d-block d-lg-flex px-3 collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseAnnoSiti-{year}"
                  aria-expanded="false"
                  aria-controls="collapseAnnoSiti-{year}"
                >
                  <span
                    class="d-flex justify-content-between d-lg-inline mb-3 mb-lg-0"
                  >
                    <span class="blueItaText"
                      >{$t("moniDettaglio.anno")} {year}</span
                    >
                    <span class="totAnnoText"
                      >{yearSum(items, "num_siti_monitorati")}</span
                    >
                  </span>
                  <span class="ms-auto dettaglioText"
                    >{$t("moniDettaglio.dettTrimestre")}</span
                  >
                </button>
              </h2>
              <div
                id="collapseAnnoSiti-{year}"
                class="accordion-collapse collapse"
                role="region"
                aria-labelledby="headingAnnoSiti-{year}"
              >
                <div class="accordion-body">
                  <div class="d-lg-flex mx-0 gap-4">
                    {#each quarters as qNum}
                      {#if hasQuarter(items, qNum)}
                        <div class="blueBox mb-4 mb-lg-0">
                          <p class="mb-3" style="font-size:16px;">
                            {@html $t(`moniDettaglio.trimestre${qNum}`)}
                          </p>
                          <p class="pb-3 mb-0 fw-bold">
                            {quarterValue(items, qNum, "num_siti_monitorati")}
                          </p>
                        </div>
                      {/if}
                    {/each}
                  </div>
                </div>
              </div>
            </div>
          {/each}
        {:else}
          <div>
            {#each Object.entries(byYear) as [year, items]}
              <p class="mb-0 fakeTable">
                <span class="oggettoValutazione"
                  >{$t("moniDettaglio.anno")} {year}</span
                >
                <span class="totaleValutazione"
                  >{yearSum(items, "num_siti_monitorati")}</span
                >
              </p>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- PAGINE -->
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingPag">
      <button
        class="accordion-button d-block d-lg-flex collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsePag"
        aria-expanded="false"
        aria-controls="collapsePag"
      >
        <span class="d-flex d-lg-inline mb-3 mb-lg-0">
          <span class="pe-3 pe-lg-0">
            <span class="oggettoValutazione">{$t("moniDettaglio.pagine")}</span>
            <span class="periodoValutazione">{$t("moniDettaglio.totale")}</span>
          </span>
          <span class="totaleValutazione ms-auto ms-lg-4"
            >{nf(totalePagine)}</span
          >
        </span>
        <span class="ms-auto dettaglioText">{$t("moniDettaglio.dettAnno")}</span
        >
      </button>
    </h2>
    <div
      id="collapsePag"
      class="accordion-collapse collapse"
      role="region"
      aria-labelledby="headingPag"
    >
      <div class="accordion-body">
        {#if activeTab === "tab1"}
          {#each Object.entries(byYear) as [year, items]}
            <div class="accordion-item accordionBorders">
              <h2 class="accordion-header" id="headingAnnoPag-{year}">
                <button
                  class="accordion-button d-block d-lg-flex px-3 collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseAnnoPag-{year}"
                  aria-expanded="false"
                  aria-controls="collapseAnnoPag-{year}"
                >
                  <span
                    class="d-flex justify-content-between d-lg-inline mb-3 mb-lg-0"
                  >
                    <span class="blueItaText"
                      >{$t("moniDettaglio.anno")} {year}</span
                    >
                    <span class="totAnnoText"
                      >{yearSum(items, "num_pagine_web_monitorate")}</span
                    >
                  </span>
                  <span class="ms-auto dettaglioText"
                    >{$t("moniDettaglio.dettTrimestre")}</span
                  >
                </button>
              </h2>
              <div
                id="collapseAnnoPag-{year}"
                class="accordion-collapse collapse"
                role="region"
                aria-labelledby="headingAnnoPag-{year}"
              >
                <div class="accordion-body">
                  <div class="d-lg-flex mx-0 gap-4">
                    {#each quarters as qNum}
                      {#if hasQuarter(items, qNum)}
                        <div class="blueBox mb-4 mb-lg-0">
                          <p class="mb-3" style="font-size:16px;">
                            {@html $t(`moniDettaglio.trimestre${qNum}`)}
                          </p>
                          <p class="pb-3 mb-0 fw-bold">
                            {quarterValue(
                              items,
                              qNum,
                              "num_pagine_web_monitorate"
                            )}
                          </p>
                        </div>
                      {/if}
                    {/each}
                  </div>
                </div>
              </div>
            </div>
          {/each}
        {:else}
          <div>
            {#each Object.entries(byYear) as [year, items]}
              <p class="mb-0 fakeTable">
                <span class="oggettoValutazione"
                  >{$t("moniDettaglio.anno")} {year}</span
                >
                <span class="totaleValutazione"
                  >{yearSum(items, "num_pagine_web_monitorate")}</span
                >
              </p>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- PDF -->
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingPdf">
      <button
        class="accordion-button d-block d-lg-flex collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsePdf"
        aria-expanded="false"
        aria-controls="collapsePdf"
      >
        <span class="d-flex d-lg-inline mb-3 mb-lg-0">
          <span class="pe-3 pe-lg-0">
            <span class="oggettoValutazione">{$t("moniDettaglio.pdf")}</span>
            <span class="periodoValutazione">{$t("moniDettaglio.totale")}</span>
          </span>
          <span class="totaleValutazione ms-auto ms-lg-4">{nf(totalePdf)}</span>
        </span>
        <span class="ms-auto dettaglioText">{$t("moniDettaglio.dettAnno")}</span
        >
      </button>
    </h2>
    <div
      id="collapsePdf"
      class="accordion-collapse collapse"
      role="region"
      aria-labelledby="headingPdf"
    >
      <div class="accordion-body">
        {#if activeTab === "tab1"}
          {#each Object.entries(byYear) as [year, items]}
            <div class="accordion-item accordionBorders">
              <h2 class="accordion-header" id="headingAnnoPdf-{year}">
                <button
                  class="accordion-button d-block d-lg-flex px-3 collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseAnnoPdf-{year}"
                  aria-expanded="false"
                  aria-controls="collapseAnnoPdf-{year}"
                >
                  <span
                    class="d-flex justify-content-between d-lg-inline mb-3 mb-lg-0"
                  >
                    <span class="blueItaText"
                      >{$t("moniDettaglio.anno")} {year}</span
                    >
                    <span class="totAnnoText"
                      >{yearSum(items, "num_pdf_monitorati")}</span
                    >
                  </span>
                  <span class="ms-auto dettaglioText"
                    >{$t("moniDettaglio.dettTrimestre")}</span
                  >
                </button>
              </h2>
              <div
                id="collapseAnnoPdf-{year}"
                class="accordion-collapse collapse"
                role="region"
                aria-labelledby="headingAnnoPdf-{year}"
              >
                <div class="accordion-body">
                  <div class="d-lg-flex mx-0 gap-4">
                    {#each quarters as qNum}
                      {#if hasQuarter(items, qNum)}
                        <div class="blueBox mb-4 mb-lg-0">
                          <p class="mb-3" style="font-size:16px;">
                            {@html $t(`moniDettaglio.trimestre${qNum}`)}
                          </p>
                          <p class="pb-3 mb-0 fw-bold">
                            {quarterValue(items, qNum, "num_pdf_monitorati")}
                          </p>
                        </div>
                      {/if}
                    {/each}
                  </div>
                </div>
              </div>
            </div>
          {/each}
        {:else}
          <div>
            {#each Object.entries(byYear) as [year, items]}
              <p class="mb-0 fakeTable">
                <span class="oggettoValutazione"
                  >{$t("moniDettaglio.anno")} {year}</span
                >
                <span class="totaleValutazione"
                  >{yearSum(items, "num_pdf_monitorati")}</span
                >
              </p>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- APP (only in tab2) -->
  {#if activeTab === "tab2"}
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingApp">
        <button
          class="accordion-button d-block d-lg-flex collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseApp"
          aria-expanded="false"
          aria-controls="collapseApp"
        >
          <span class="d-flex d-lg-inline mb-3 mb-lg-0"
            ><span class="pe-3 pe-lg-0">
              <span class="oggettoValutazione">{$t("moniDettaglio.app")}</span>
              <span class="periodoValutazione"
                >{$t("moniDettaglio.totale")}</span
              >
            </span>
            <span class="totaleValutazione ms-auto ms-lg-4"
              >{nf(totaleApp)}</span
            >
          </span>
          <span class="ms-auto dettaglioText"
            >{$t("moniDettaglio.dettAnno")}</span
          >
        </button>
      </h2>
      <div
        id="collapseApp"
        class="accordion-collapse collapse"
        role="region"
        aria-labelledby="headingApp"
      >
        <div class="accordion-body">
          <div>
            {#each Object.entries(byYear) as [year, items]}
              <p class="mb-0 fakeTable">
                <span class="oggettoValutazione"
                  >{$t("moniDettaglio.anno")} {year}</span
                >
                <span class="totaleValutazione"
                  >{yearSum(items, "num_app_monitorate")}</span
                >
              </p>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .oggettoValutazione {
    font-size: 18px !important ;
    font-weight: 600 !important ;
    color: #1a1a1a !important ;
  }

  .periodoValutazione {
    font-size: 18px !important ;
    font-weight: 400 !important ;
    color: #1a1a1a !important ;
  }

  .totaleValutazione {
    font-size: 24px !important ;
    font-weight: 600 !important ;
    color: #0066cc !important ;
  }

  .dettaglioText {
    font-size: 18px !important ;
    font-weight: 400 !important ;
    color: #0066cc !important ;
    text-decoration: underline !important ;
  }

  .accordion-header .accordion-button:after {
    margin-left: 8px !important;
  }

  .fakeTable {
    border-width: 0 1px 1px 1px !important;
    border: 1px solid #c5c7c9;
    padding: 16px;
    display: flex;
    justify-content: space-between;
  }

  .fakeTable:first-child {
    border-top: 1px solid #c5c7c9 !important;
  }

  .blueBox {
    background-color: #f2f7fc;
    border-left: 2px solid #0066cc;
    border-right: 2px solid #0066cc;
    text-align: center;
    padding-top: 16px;
    width: 25%;
  }

  .blueItaText {
    font-size: 18px !important ;
    font-weight: 600 !important ;
    color: #06c !important;
  }

  .totAnnoText {
    font-size: 20px !important ;
    font-weight: 700 !important ;
    color: #000 !important;
    margin-left: 24px !important;
  }

  .accordionBorders {
    border: 1px solid #c5c7c9 !important;
    border-top: none !important;
  }

  .accordionBorders:first-child {
    border-top: 1px solid #c5c7c9 !important;
  }

  :global(.nav-tabs) {
    overflow-x: hidden !important;
  }

  @media (max-width: 991.98px) {
    .blueBox {
      width: 100% !important;
    }

    :global(button.nav-link.text-uppercase) {
      padding: 12px 4px !important;
    }

    .accordion-header .accordion-button {
      padding: 24px 4px;
    }

    .accordion-body {
      padding: 1rem 0.75rem;
    }
  }
</style>
