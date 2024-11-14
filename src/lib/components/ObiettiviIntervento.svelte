<script lang="ts">
  import { onMount } from "svelte";
  import { nf, nf2d, pm } from "../utils";
  import { locale, t } from "../utils/i18n";
  import CsvPdfButtons from "./CsvPdfButtons.svelte";
  import DataTable from "./DataTable.svelte";

  // ---HIGHCHARTS BEGIN---
  import Highcharts from "highcharts";
  import HighchartsAccessibility from "highcharts/modules/accessibility";
  import HighchartsVariablePie from "highcharts/modules/variable-pie";
  HighchartsAccessibility(Highcharts);
  HighchartsVariablePie(Highcharts);
  // ---HIGHCHARTS END---

  let periodoMonitoraggio;
  let response;
  let response2;
  let loading = true;
  let linea;
  let numEnti;

  onMount(async () => {
    const rs2 = await fetch("/data/obiettivi_linea_intervento.json");
    response = await rs2.json();
    loading = false;
    periodoMonitoraggio = response?.intestazione?.anno;

    const rs3 = await fetch("/data/obiettivi_linea_intervento.json");
    response2 = await rs3.json();
    linea = response2?.data?.map((r) => r[`des_linea_intervento_${$locale}`]);
    numEnti = response2?.data?.map((r) => r.num_enti_obiettivi);

    let colors = [
      "#E0638F",
      "#993AB0",
      "#0066CC",
      "#B0315E",
      "#004080",
      "#329574",
    ];
    let sizes = [5, 2, 2.5, 2.5, 3, 4];
    let allData = [];

    for (let i = 0; i < linea.length; i++) {
      allData.push({
        y: numEnti[i],
        z: sizes[i],
        name: linea[i],
        color: colors[i],
      });
    }

    const chart5 = Highcharts.chart({
      chart: { renderTo: "pieChartIntervento", type: "variablepie" },
      title: { text: "" },
      plotOptions: {
        variablepie: {
          startAngle: 270,
          accessibility: {
            point: {
              valueDescriptionFormat: ' {point.name}, {point.y} $t("obiInter.chartLabel") ',
            }
          }, 
        },
      },
      tooltip: {
        headerFormat: '',
        pointFormat: '<span style="color:{point.color}">\u25CF</span> {point.name}<br/>' +
            $t("obiInter.chartLabel") + ': <b>{point.y}</b><br/>'
      },
      series: [
        {
          minPointSize: 10,
          innerSize: "25%",
          zMin: 0,
          type: "variablepie",
          name: "",
          borderRadius: 8,
          borderWidth: 3,
          data: allData,
        },
      ],
    });
  });

  const columns = [
    { field: `des_linea_intervento_${$locale}`, label: $t("obiInter.linea") },
    {
      field: "num_enti_obiettivi",
      label: $t("obiInter.distribuzione"),
      align: "right",
      position: "end",
      format: (value: any) => nf(value),
    },
  ];
</script>

<div class="container px-0">
  <div class="card-box mt-2 my-lg-3 hide-mobile pt-3 px-3">
    <h3 class="cardTitle py-3 ps-2 ps-lg-3 d-inline-flex greyText">
      {$t("obiInter.title")}
    </h3>
    <div>
      <p class="mb-0 pb-3 px-2 px-xl-3">
        {$t("obiInter.description", {anno: periodoMonitoraggio})}
      </p>
      {#if periodoMonitoraggio}
        <div class="caption text-start d-inline-block px-2 px-xl-3">
          {$t("obiInter.timeframe")}
          {periodoMonitoraggio}
        </div>
      {/if}
    </div>

    <figure class="highcharts-figure">
      <div id="pieChartIntervento" style="width:100%; height:450px;" />
    </figure>

    <div class="pe-3 pb-4">
      {#if !loading}
        <CsvPdfButtons
          rows={response?.data}
          {columns}
          title={$t("obiInter.title")}
          {periodoMonitoraggio}
        />
      {/if}
    </div>
  </div>

  {#if !loading}
    <div class="show-mobile">
      <DataTable
        {columns}
        rows={response?.data}
        title={$t("obiInter.title")}
        defaultSortBy="num_enti_obiettivi"
        didascalia={true}
        periodoMonitoraggio={response?.intestazione?.anno}
      >
        <div slot="didascaliaSlot" class="didascalia">
          {$t("obiInter.description", {anno: periodoMonitoraggio})}
        </div>
      </DataTable>
    </div>
  {/if}
</div>

<style lang="scss">
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
