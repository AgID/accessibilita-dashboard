<script lang="ts">
  import { onMount } from "svelte";
  import { nf, nf2d, pm } from "../../utils";
  import CsvPdfButtons from "../CsvPdfButtons.svelte";
  import DataTable from "../DataTable.svelte";
  import { locale, t } from "../../utils/i18n";

  // ---HIGHCHARTS BEGIN---
  import Highcharts from "highcharts";
  import HighchartsAccessibility from "highcharts/modules/accessibility";
  HighchartsAccessibility(Highcharts);
  // ---HIGHCHARTS END---

  let periodoMonitoraggio = $state(0);
  let response = $state({
    intestazione: {
      anno_monitoraggio: 0,
      dat_ultimo_aggiornamento: "",
    },
    data: [],
  });
  let loading = $state(true);

  const columns = [
    {
      field: "des_sistema_operativo",
      label: $t("moniAPPChart.os"),
      align: "left",
    },
    {
      field: "num_tot_app",
      label: $t("moniAPPChart.numero"),
      format: (value: any) => nf(value),
      align: "right",
    },
  ];

  onMount(async () => {
    const rs = await fetch("/data/mona_app_mon_distr_so.json");
    response = await rs.json();
    periodoMonitoraggio = response?.intestazione?.anno_monitoraggio;
    loading = false;

    let response2;
    let os;
    let valore;

    const rs2 = await fetch("/data/mona_app_mon_distr_so.json");
    response2 = await rs2.json();
    os = response2?.data?.map((r) => r.des_sistema_operativo);
    valore = response2?.data?.map((r) => r.num_tot_app);

    let allData = [];

    for (let i = 0; i < os.length; i++) {
      const dataObject = {
        name: os[i],
        y: valore[i],
      };

      allData.push(dataObject);
    }

    const pieAppOSchart = Highcharts.chart({
      chart: {
        renderTo: "pieAppOSchart",
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      colors: ["#993AB0", "#329574"],
      title: { text: "" },
      plotOptions: {
        pie: {
          startAngle: 0,
          borderRadius: 0,
          borderWidth: 8,
          borderColor: "#fff",
        },
      },
      tooltip: {
        headerFormat: "",
        pointFormat:
          '<span style="color:{point.color}">\u25CF</span> {point.name}<br/>' +
          $t("moniAPPChart.label") +
          "<b>{point.y}</b>",
      },
      series: [
        {
          name: "Siti",
          type: "pie",
          data: allData,
        },
      ],
    });
  });
</script>

<div class="card-box customSpacing hide-mobile pt-3 px-3">
  <div class="d-flex justify-content-between">
    <h3 class="cardTitle col-lg-8 pt-3 ps-2 ps-lg-3 d-inline-flex greyText">
      {$t("moniAPPChart.title")}
    </h3>
    <div class="pe-3 my-auto">
      {#if !loading}
        <CsvPdfButtons
          rows={response?.data}
          {columns}
          title={$t("moniAPPChart.title")}
        />
      {/if}
    </div>
  </div>
  <div class="col-lg-8">
    {#if periodoMonitoraggio}
      <div class="d-inline-block px-2 px-xl-3">
        <p class="periodoLabel mb-4">
          {$t("layout.periodoMonitoraggio")}
          <span class="periodoDate">
            {$t("layout.anno")}{periodoMonitoraggio}
          </span>
        </p>
      </div>
    {/if}
    <p class="mb-0 pb-3 px-2 px-xl-3">
      {$t("moniAPPChart.chartDescription")}
      <br /><a
        href="/errori-approfondito#app"
        aria-label={$t("moniAPPChart.learnMore")}
      >
        {$t("moniAPPChart.learnMore")}
      </a>
    </p>
  </div>

  <figure class="highcharts-figure">
    <div id="pieAppOSchart" style="width:100%; height:450px;"></div>
  </figure>
</div>

{#if !loading}
  <div class="show-mobile">
    <DataTable
      {columns}
      rows={response?.data}
      title={$t("moniAPPChart.title")}
      defaultSortBy="percentuale"
      didascalia={true}
      periodoMonitoraggio="{$t('layout.anno')}{periodoMonitoraggio}"
    >
      {#snippet didascaliaSlot()}
        <div class="didascalia">
          {$t("moniAPPChart.tableDescription")}
          <br /><a
            href="/errori-approfondito#app"
            aria-label={$t("moniAPPChart.learnMore")}
          >
            {$t("moniAPPChart.learnMore")}
          </a>
        </div>
      {/snippet}
    </DataTable>
  </div>
{/if}

<style>
  :global(.highcharts-credits) {
    display: none !important;
  }

  @media only screen and (max-width: 599px) {
    .hide-mobile {
      display: none;
    }
  }
  @media only screen and (min-width: 600px) {
    .show-mobile {
      display: none;
    }
  }
  @media print {
    .hide-mobile {
      display: none;
    }
  }
</style>
