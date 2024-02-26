<script lang="ts">
  import { onMount } from "svelte";
  import { nf, pm } from "../utils";
  import CsvPdfButtons from "./CsvPdfButtons.svelte";
  import DataTable from "./DataTable.svelte";
  import { t } from "../utils/i18n";

  // ---HIGHCHARTS BEGIN---
  import Highcharts from "highcharts";
  import HighchartsAccessibility from "highcharts/modules/accessibility";
  import HighchartsVariablePie from "highcharts/modules/variable-pie";
  HighchartsAccessibility(Highcharts);
  HighchartsVariablePie(Highcharts);
  // ---HIGHCHARTS END---

  let numDichiarazioniAnnoSITI;
  let numDichiarazioniAnnoAPP;
  let annoSpecifico;
  let loading = true;
  let responseTOTALE;
  let responseSITI;
  let responseAPP;
  const columns = [
    { field: "anno_dichiarazione", label: $t("dicLineChart.anno") },
    {
      field: "num_dichiarazione_pub_anno_SITI",
      label: $t("dicLineChart.numeroSITI"),
      align: "right",
      format: (value: any) => nf(value),
    },
    {
      field: "num_dichiarazione_app_pub_anno_APP",
      label: $t("dicLineChart.numeroAPP"),
      align: "right",
      format: (value: any) => nf(value),
    },
  ];

  onMount(async () => {
    const rsSITI = await fetch("/data/dichiarazione_trend_anno.json");
    responseSITI = await rsSITI.json();
    const rsAPP = await fetch("/data/dichiarazione_app_trend_anno.json");
    responseAPP = await rsAPP.json();
    loading = false;

    annoSpecifico = responseSITI?.data?.map((r) => r.anno_dichiarazione);
    numDichiarazioniAnnoSITI = responseSITI?.data?.map(
      (r) => r.num_dichiarazione_pub_anno
    );
    numDichiarazioniAnnoAPP = responseAPP?.data?.map(
      (r) => r.num_dichiarazione_app_pub_anno
    );

    responseTOTALE = responseSITI.data.map((item) => {
      const correspondingItem = responseAPP.data.find(
        (appItem) => appItem.anno_dichiarazione === item.anno_dichiarazione
      );
      return {
        anno_dichiarazione: item.anno_dichiarazione,
        num_dichiarazione_pub_anno_SITI: item.num_dichiarazione_pub_anno,
        num_dichiarazione_pub_anno_APP: correspondingItem
          ? correspondingItem.num_dichiarazione_app_pub_anno
          : 0,
      };
    });

    annoSpecifico = responseTOTALE.map((r) => r.anno_dichiarazione);
    numDichiarazioniAnnoSITI = responseTOTALE.map(
      (r) => r.num_dichiarazione_pub_anno_SITI
    );
    numDichiarazioniAnnoAPP = responseTOTALE.map(
      (r) => r.num_dichiarazione_pub_anno_APP
    );

    const chart1 = Highcharts.chart({
      chart: { renderTo: "dichiarazioniTrendAnno", type: "line" },
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
              borderRadius: 3,
              color: "#334eff",
              lineWidth: 2,
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
          lineWidth: 3,
          legendSymbol: "rectangle",
          marker: {
                enabled: true,
                fillColor: '#FFFFFF',
                lineWidth: 1,
                lineColor: null,
                symbol: "cicrle",
            },
          label: {
            connectorAllowed: false,
          },
          pointStart: 2020,
          events: {
                  legendItemClick: function(e) {
                      e.preventDefault();
                  }
              }
        },
        
      },
      series: [
        {
          name: $t("dicLineChart.numeroAPP"),
          type: "line",
          color: "#003366",
          data: numDichiarazioniAnnoAPP,
        },
        {
          name: $t("dicLineChart.numeroSITI"),
          type: "line",
          color: "#0066cc",
          data: numDichiarazioniAnnoSITI,
        },
      ],
      legend: {
        enabled: true,
        symbolHeight: 30,
        symbolRadius: 4,
        itemMarginBottom: 0,
        itemMarginTop: 25,
        itemStyle: {
          fontWeight: "bold",
        }
      },
    });
  });
</script>

<p class="lead mb-4 ms-2">Dati generali</p>

<div class="card-box mt-3 mt-lg-0 hide-mobile pt-3 px-3">
  <h2 class="cardTitle py-3 ps-2 ps-lg-3 d-inline-flex greyText">
    {$t("dicLineChart.title")}
  </h2>

  <figure class="highcharts-figure">
    <div id="dichiarazioniTrendAnno" style="width:100%; height:400px;" />
  </figure>

  <p class="mb-0 pb-3 px-2 px-xl-4">
    {$t("dicLineChart.chartDescription")}
  </p>

  <div class="pe-3 pb-4">
    {#if !loading}
      <CsvPdfButtons
        rows={responseTOTALE}
        {columns}
        title={$t("dicLineChart.title")}
        periodoMonitoraggio={responseSITI?.intestazione?.periodo_dichiarazioni}
      />
    {/if}
  </div>
</div>

{#if !loading}
  <div class="show-mobile">
    <DataTable
      rows={responseTOTALE}
      {columns}
      title={$t("dicLineChart.title")}
      defaultSortBy="anno_dichiarazione"
      descending={true}
      didascalia={true}
      periodoMonitoraggio={responseSITI?.intestazione?.periodo_dichiarazioni}
    >
      <div slot="didascaliaSlot" class="didascalia">
        {$t("dicLineChart.tableDescription")}
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
