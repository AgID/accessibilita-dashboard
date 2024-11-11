<script lang="ts">
  import { onMount } from "svelte";
  import { nf, pm } from "../utils";
  import CsvPdfButtons from "./CsvPdfButtons.svelte";
  import DataTable from "./DataTable.svelte";
  import { t } from "../utils/i18n";


  // ---HIGHCHARTS BEGIN---
  import Highcharts from "highcharts";
  import HighchartsAccessibility from "highcharts/modules/accessibility";
  HighchartsAccessibility(Highcharts);
  // ---HIGHCHARTS END---
  
  let numObiettivi;
  let annoSpecifico;
  let loading = true;
  let response;
  const columns = [
    { field: "cod_anno", label: $t("obiLineChart.anno") },
    {
      field: "num_enti_obiettivi",
      label:  $t("obiLineChart.numero"),
      align: "right",
      format: (value: any) => nf(value),
    },
  ];

  onMount(async () => {
    const rs = await fetch("/data/obiettivi_trend_anno.json");
    response = await rs.json();
    loading = false;
    numObiettivi = response?.data?.map((r) => r.num_enti_obiettivi);
    annoSpecifico = response?.data?.map((r) => r.cod_anno);

    const chart1 = Highcharts.chart({
      chart: { renderTo: "obiettiviTrendAnno", type: "line" },
      colors: ["#2caffe"],
      title: { text: "" },
      accessibility: {
        keyboardNavigation: {
          enabled: true,
          focusBorder: {
            enabled: true,
            hideBrowserFocusOutline: true,
            margin: 2,
            style: {
              borderRadius:3,
              color:"#334eff",
              lineWidth:2
            },
          },
          order: ["series"],
          seriesNavigation: {
            mode: "normal",
            pointNavigationEnabledThreshold: false,
            rememberPointFocus: true,
            skipNullPoints: true,
          },
          wrapAround: true,
        },
      },
      xAxis: {
        title: { text: "" },
        categories: annoSpecifico,
      },
      yAxis: {
        title: { text: "" },
      },
      plotOptions: {
        series: {
          lineWidth: 2,
          marker: {
                enabled: true,
                fillColor: '#FFFFFF',
                lineWidth: 2,
                lineColor: null,
                symbol: "cicrle",
            },
          label: {
            connectorAllowed: false,
          },
          pointStart: 2016,
        },
      },
      series: [
        {
          name: $t("obiLineChart.label"),
          type: "line",
          data: numObiettivi,
        },
      ],
      legend: {
        enabled: false,
      },
    });
  });
</script>

<div class="card-box mt-3 mt-lg-0 hide-mobile pt-3 px-3">
  <h3 class="cardTitle py-3 ps-2 ps-lg-3 d-inline-flex greyText">
    {$t("obiLineChart.title")}
  </h3>

  <figure class="highcharts-figure">
    <div id="obiettiviTrendAnno" style="width:100%; height:250px;" />
  </figure>

  <p class="mb-0 pb-3 px-2 px-xl-4">
    {$t("obiLineChart.description")}
  </p>

  <div class="pe-3 pb-4">
    {#if !loading}
      <CsvPdfButtons
        rows={response?.data}
        {columns}
        title={$t("obiLineChart.title")}
        periodoMonitoraggio={response?.intestazione?.periodo_obiettivi}
      />
    {/if}
  </div>
</div>

{#if !loading}
  <div class="show-mobile">
    <DataTable
      rows={response?.data}
      {columns}
      title={$t("obiLineChart.title")}
      defaultSortBy="cod_anno"
      descending={true}
      didascalia={true}
      periodoMonitoraggio={response?.intestazione?.periodo_obiettivi}
    >
      <div slot="didascaliaSlot" class="didascalia">
        {$t("obiLineChart.description")}
      </div>
    </DataTable>
  </div>
{/if}

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