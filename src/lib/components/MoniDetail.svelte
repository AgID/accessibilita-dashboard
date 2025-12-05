<script lang="ts">
  import { onMount } from "svelte";
  import { nf } from "../utils";
  import { t } from "../utils/i18n";

  interface Props {
    activeTab: any;
    id: any;
    lastPeriod?: string;
    rows?: any;
  }

  let {
    activeTab = $bindable(""),
    id,
    lastPeriod = $bindable(""),
    rows = [],
  }: Props = $props();

  let lastYear = $state();
  let lastQuarter = $state();

  onMount(async () => {
    const rs = await fetch("/data/monitoraggio_trend_trimestre.json");
    const resp = await rs.json();
    let data = resp?.data;
    lastPeriod = data[data.length - 1].data_monitoraggio;
    lastQuarter = getQuarter(lastPeriod);
    lastYear = lastPeriod.slice(0, 4);
  });

  function getQuarter(dateStr) {
    const month = Number(dateStr.substring(5, 7));
    if (month <= 3) return "1°";
    if (month <= 6) return "2°";
    if (month <= 9) return "3°";
    return "4°";
  }

  function yearSum(items, field) {
    return nf(items.reduce((sum, row) => sum + row[field], 0));
  }

  let byYear = $state({});
  let totaleSiti = $state(0),
    totalePagine = $state(0),
    totalePdf = $state(0),
    totaleApp = $state(0);

  function calc(rows, tab) {
    const byYear = {};
    let siti = 0,
      pagine = 0,
      pdf = 0,
      app = 0;

    for (const r of rows) {
      const year =
        tab === "tab1"
          ? new Date(r.data_monitoraggio).getFullYear()
          : r.anno_monitoraggio;

      (byYear[year] ||= []).push(r);

      siti += r.num_siti_monitorati;
      pagine += r.num_pagine_web_monitorate;
      pdf += r.num_pdf_monitorati;
      if (tab === "tab2") app += r.num_app_monitorate;
    }

    return { byYear, siti, pagine, pdf, app };
  }

  $effect(() => {
    const inputRows = rows;
    const tab = activeTab;
    const result = calc(inputRows, tab);

    byYear = result.byYear;
    totaleSiti = result.siti;
    totalePagine = result.pagine;
    totalePdf = result.pdf;
    totaleApp = result.app;
  });
</script>

<div class="accordion">
  <!-- SITI -->
  <div class="accordion-item">
    <h2 class="accordion-header" id="{id}headSiti">
      <button
        class="accordion-button collapsed d-flex align-items-center w-100"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#{id}collapseSiti"
        aria-controls="{id}collapseSiti"
      >
        <span class="fixedWidth text-start oggettoValutazione"
          >{$t("moniDettaglio.siti")}
        </span>
        <span class="value text-end totaleValutazione">{nf(totaleSiti)}</span>
        <span class="ms-auto" title={$t("moniDettaglio.dettSiti")}
          >{$t("moniDettaglio.dettaglio")}</span
        >
      </button>
    </h2>
    <div
      id="{id}collapseSiti"
      class="accordion-collapse collapse"
      role="region"
      aria-labelledby="{id}headSiti"
    >
      <div class="accordion-body">
        <div class="row mx-0">
          {#each Object.entries(byYear) as [year, items]}
            <div
              class="col-12 col-md-6 {id === 'a-'
                ? 'col-lg-3'
                : 'col-lg-4'} px-0"
            >
              <p class="mb-lg-0">
                {$t("moniDettaglio.anno")}
                {year}
                {#if activeTab === "tab1" && year === lastYear}
                  ({lastQuarter} {$t("moniDettaglio.quarter")})
                {/if}:
                <span class="fw-semibold blueText"
                  >{yearSum(items, "num_siti_monitorati")}</span
                >
              </p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- PAGINE -->
  <div class="accordion-item">
    <h2 class="accordion-header" id="{id}headingPag">
      <button
        class="accordion-button collapsed d-flex align-items-center w-100"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#{id}collapsePag"
        aria-controls="{id}collapsePag"
      >
        <span class="fixedWidth text-start oggettoValutazione"
          >{$t("moniDettaglio.pagine")}
        </span>
        <span class="value text-end totaleValutazione">{nf(totalePagine)}</span>
        <span class="ms-auto" title={$t("moniDettaglio.dettPag")}
          >{$t("moniDettaglio.dettaglio")}</span
        >
      </button>
    </h2>
    <div
      id="{id}collapsePag"
      class="accordion-collapse collapse"
      role="region"
      aria-labelledby="{id}headingPag"
    >
      <div class="accordion-body">
        <div class="row mx-0">
          {#each Object.entries(byYear) as [year, items]}
            <div
              class="col-12 col-md-6 {id === 'a-'
                ? 'col-lg-3'
                : 'col-lg-4'} px-0"
            >
              <p class="mb-lg-0">
                {$t("moniDettaglio.anno")}
                {year}
                {#if activeTab === "tab1" && year === lastYear}
                  ({lastQuarter} {$t("moniDettaglio.quarter")})
                {/if}:
                <span class="fw-semibold blueText"
                  >{yearSum(items, "num_pagine_web_monitorate")}</span
                >
              </p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- PDF -->
  <div class="accordion-item">
    <h2 class="accordion-header" id="{id}headingPdf">
      <button
        class="accordion-button collapsed d-flex align-items-center w-100"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#{id}collapsePdf"
        aria-controls="{id}collapsePdf"
      >
        <span class="fixedWidth text-start oggettoValutazione"
          >{$t("moniDettaglio.pdf")}
        </span>
        <span class="value text-end totaleValutazione">{nf(totalePdf)}</span>
        <span class="ms-auto" title={$t("moniDettaglio.dettPdf")}
          >{$t("moniDettaglio.dettaglio")}</span
        >
      </button>
    </h2>
    <div
      id="{id}collapsePdf"
      class="accordion-collapse collapse"
      role="region"
      aria-labelledby="{id}headingPdf"
    >
      <div class="accordion-body">
        <div class="row mx-0">
          {#each Object.entries(byYear) as [year, items]}
            <div
              class="col-12 col-md-6 {id === 'a-'
                ? 'col-lg-3'
                : 'col-lg-4'} px-0"
            >
              <p class="mb-lg-0">
                {$t("moniDettaglio.anno")}
                {year}
                {#if activeTab === "tab1" && year === lastYear}
                  ({lastQuarter} {$t("moniDettaglio.quarter")})
                {/if}:
                <span class="fw-semibold blueText"
                  >{yearSum(items, "num_pdf_monitorati")}</span
                >
              </p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- APP (only in tab2) -->
  {#if activeTab === "tab2"}
    <div class="accordion-item">
      <h2 class="accordion-header" id="a-headingApp">
        <button
          class="accordion-button collapsed d-flex align-items-center w-100"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#a-collapseApp"
          aria-controls="a-collapseApp"
        >
          <span class="fixedWidth text-start oggettoValutazione"
            >{$t("moniDettaglio.app")}
          </span>
          <span class="value text-end totaleValutazione">{nf(totaleApp)}</span>
          <span class="ms-auto" title={$t("moniDettaglio.dettApp")}
            >{$t("moniDettaglio.dettaglio")}</span
          >
        </button>
      </h2>
      <div
        id="a-collapseApp"
        class="accordion-collapse collapse"
        role="region"
        aria-labelledby="a-headingApp"
      >
        <div class="accordion-body">
          <div class="row mx-0">
            {#each Object.entries(byYear) as [year, items]}
              <div
                class="col-12 col-md-6 {id === 'a-'
                  ? 'col-lg-3'
                  : 'col-lg-4'} px-0"
              >
                <p class="mb-lg-0">
                  {$t("moniDettaglio.anno")}
                  {year}:
                  <span class="fw-semibold blueText"
                    >{yearSum(items, "num_app_monitorate")}</span
                  >
                </p>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .accordion-button .value {
    flex: 0 0 150px;
  }

  .fixedWidth {
    width: 205px;
  }

  .oggettoValutazione {
    font-size: 18px !important ;
    font-weight: 600 !important ;
    color: #1a1a1a !important ;
  }

  .totaleValutazione {
    font-size: 24px !important ;
    font-weight: 700 !important ;
    color: #0066cc !important ;
  }

  .accordion-header .accordion-button:after {
    margin-left: 8px !important;
  }

  :global(.nav-tabs) {
    overflow-x: hidden !important;
  }

  .accordion-body {
    padding: 1rem 1.25rem;
  }

  @media (min-width: 1200px) {
    .accordion-body {
      padding: 1rem 2.5rem;
    }
  }

  @media (max-width: 419.98px) {
    .fixedWidth {
      width: 120px;
    }

    .accordion-button .value {
      margin-bottom: 36px !important;
      margin-top: -52px !important;
    }
  }

  @media (max-width: 991.98px) {
    :global(button.nav-link.text-uppercase) {
      padding: 12px 4px !important;
    }

    .accordion-body {
      padding: 0 1.25rem;
    }

    .accordion-header .accordion-button {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 0;
      padding: 24px 4px 24px 4px;
      position: relative;
    }

    .accordion-button .oggettoValutazione {
      order: 1;
      margin-bottom: 0 !important;
    }
    .accordion-button .value {
      order: 2;
      flex: none;
      align-self: flex-end !important;
      margin-left: auto !important;
      margin-bottom: 16px;
      margin-top: -22px;
    }
    .accordion-button .ms-auto {
      order: 3;
      width: 100%;
      display: flex;
      font-size: 18px !important;
      align-items: center;
      padding: 0 !important;
      position: relative;
    }
    .accordion-header .accordion-button:after {
      position: static !important;
      margin-left: 8px !important;
      vertical-align: middle;
      order: 4;
    }
    .accordion-header .accordion-button:after {
      display: none !important;
    }
    .accordion-button .ms-auto::after {
      content: "";
      display: inline-block;
      vertical-align: middle;
      border: solid #0066cc;
      border-width: 0 2px 2px 0;
      padding: 3px;
      margin-left: 8px;
      transform: rotate(45deg);
    }
  }
</style>
