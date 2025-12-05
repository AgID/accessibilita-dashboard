<script>
  import { onMount } from "svelte";
  import { dmF, nf } from "../utils";
  import { t } from "../utils/i18n";

  import CsvPdfButtons from "./CsvPdfButtons.svelte";
  import MoniDetail from "./MoniDetail.svelte";
  let activeTab = $state("tab1");

  let responseSemp;
  let responseAppr;
  let loading = $state(true);

  let dataSemp = $state();
  let dataAppr = $state();

  let firstDate = $state();
  let lastDate = $state();

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

  let currentRows = $derived(activeTab === "tab1" ? dataSemp : dataAppr);
  let currentColumns = $derived(
    activeTab === "tab1" ? columnsSemp : columnsAppr
  );
  let currentPDFName = $derived(
    activeTab === "tab1"
      ? $t("moniDettaglio.downloadSemp")
      : $t("moniDettaglio.downloadAppr")
  );

  onMount(async () => {
    const rs = await fetch("/data/monitoraggio_trend_trimestre.json");
    responseSemp = await rs.json();
    dataSemp = responseSemp?.data;
    if (dataSemp.length > 0) {
      firstDate = dataSemp[0].data_monitoraggio.substring(0, 4);
      lastDate = dmF(dataSemp[dataSemp.length - 1].data_monitoraggio);
    }

    const rs2 = await fetch("/data/mona_trend_anno.json");
    responseAppr = await rs2.json();
    dataAppr = responseAppr?.data;
    loading = false;
  });
</script>

<div class="card-box customSpacing pt-3 px-3" style="border: none !important;">
  <div class="d-flex justify-content-between">
    <h3 class="cardTitle col-lg-8 pt-3 ps-2 ps-lg-3 d-inline-flex greyText">
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
  <p class="col-lg-8 mb-0 pb-3 px-2 px-xl-3">
    {@html $t("moniDettaglio.description", {
      firstDate: firstDate,
      lastDate: lastDate,
    })}
  </p>

  <div class="px-1 px-lg-3">
    <ul class="nav nav-tabs auto">
      <li class="nav-item">
        <button
          class="nav-link text-uppercase {activeTab === 'tab1' ? 'active' : ''}"
          onclick={() => (activeTab = "tab1")}
          >{$t("moniDettaglio.semplificato")}</button
        >
      </li>
      <li class="nav-item">
        <button
          class="nav-link text-uppercase {activeTab === 'tab2' ? 'active' : ''}"
          onclick={() => (activeTab = "tab2")}
          >{$t("moniDettaglio.approfondito")}</button
        >
      </li>
    </ul>
    <div class="tab-content" id="dettaglioMonitoraggio">
      <div
        class="tab-pane pb-4 fade {activeTab === 'tab1' ? 'show active' : ''}"
        role="tabpanel"
      >
        <MoniDetail bind:activeTab rows={dataSemp} id="s-"></MoniDetail>
      </div>
      <div
        class="tab-pane pb-4 fade {activeTab === 'tab2' ? 'show active' : ''}"
        role="tabpanel"
      >
        <MoniDetail bind:activeTab rows={dataAppr} id="a-"></MoniDetail>
      </div>
    </div>
  </div>
</div>

<style>
  :global(button.nav-link[data-focus-mouse="true"]:focus:not(:focus-visible)) {
    box-shadow: none !important;
    border-bottom-color: #06c !important;
  }
</style>
