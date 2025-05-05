<script>
  import { onMount } from "svelte";
  import { nf, pm } from "../utils";
  import { t } from "../utils/i18n";
  import CsvPdfButtons from "./CsvPdfButtons.svelte";
  import MoniDetail from "./MoniDetail.svelte";
  import { format } from "highcharts";
  let activeTab = "tab1";

  let responseSemp;
  let responseAppr;
  let loading = true;

  let dataSemp;
  let dataAppr;

  const columnsSemp = [
    { field: "periodo_monitoraggio", label: $t("moniDettaglio.trimestre") },
    {
      field: "num_siti_monitorati",
      label: $t("moniDettaglio.siti"),
      format: (value) => nf(value),
    },
    {
      field: "num_pagine_web_monitorate",
      label: $t("moniDettaglio.pagine"),
      format: (value) => nf(value),
    },
    {
      field: "num_pdf_monitorati",
      label: $t("moniDettaglio.pdf"),
      format: (value) => nf(value),
    },
  ];

  const columnsAppr = [
    { field: "anno_monitoraggio", label: $t("moniDettaglio.anno") },
    {
      field: "num_siti_monitorati",
      label: $t("moniDettaglio.siti"),
      format: (value) => nf(value),
    },
    {
      field: "num_pagine_web_monitorate",
      label: $t("moniDettaglio.pagine"),
      format: (value) => nf(value),
    },
    {
      field: "num_pdf_monitorati",
      label: $t("moniDettaglio.pdf"),
      format: (value) => nf(value),
    },
    {
      field: "num_app_monitorate",
      label: $t("moniDettaglio.app"),
      format: (value) => nf(value),
    },
  ];

  $: currentRows = activeTab === "tab1" ? dataSemp : dataAppr;
  $: currentColumns = activeTab === "tab1" ? columnsSemp : columnsAppr;
  $: currentPDFName =
    activeTab === "tab1"
      ? $t("moniDettaglio.downloadSemp")
      : $t("moniDettaglio.downloadAppr");

  onMount(async () => {
    const rs = await fetch("/data/monitoraggio_trend_trimestre.json");
    responseSemp = await rs.json();
    dataSemp = responseSemp?.data;

    const rs2 = await fetch("/data/mona_trend_anno.json");
    responseAppr = await rs2.json();
    dataAppr = responseAppr?.data;

    loading = false;
  });
</script>

<div class="card-box mt-3 mt-lg-0 pt-3 px-3">
  <div class="d-flex justify-content-between">
    <h3 class="cardTitle pt-3 ps-2 ps-lg-3 d-inline-flex greyText">
      {$t("moniDettaglio.title")}
    </h3>
    <div class="pe-3 my-auto">
      {#if !loading}
        <CsvPdfButtons
          rows={currentRows}
          columns={currentColumns}
          searchingName={currentPDFName}
          title={$t("moniDettaglio.title")}
        />
      {/if}
    </div>
  </div>
  <p class="mb-0 pb-3 px-2 px-xl-3">{$t("moniDettaglio.description")}</p>

  <div class="px-1 px-lg-3">
    <ul class="nav nav-tabs auto">
      <li class="nav-item">
        <button
          class="nav-link text-uppercase {activeTab === 'tab1' ? 'active' : ''}"
          on:click={() => (activeTab = "tab1")}
          >{$t("moniDettaglio.semplificato")}</button
        >
      </li>
      <li class="nav-item">
        <button
          class="nav-link text-uppercase {activeTab === 'tab2' ? 'active' : ''}"
          on:click={() => (activeTab = "tab2")}
          >{$t("moniDettaglio.approfondito")}</button
        >
      </li>
    </ul>
    <div class="tab-content" id="dettaglioMonitoraggio">
      <div
        class="tab-pane pb-4 fade {activeTab === 'tab1' ? 'show active' : ''}"
        id="tab1"
        role="tabpanel"
        aria-labelledby="tab1-tab"
      >
        <MoniDetail bind:activeTab rows={dataSemp}></MoniDetail>
      </div>
      <div
        class="tab-pane pb-4 fade {activeTab === 'tab2' ? 'show active' : ''}"
        id="tab2"
        role="tabpanel"
        aria-labelledby="tab2-tab"
      >
        <MoniDetail bind:activeTab rows={dataAppr}></MoniDetail>
      </div>
    </div>
  </div>
</div>
