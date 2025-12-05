<script lang="ts">
  import { onMount } from "svelte";
  import { nf, pm } from "../../utils";
  import CsvPdfButtons from "../CsvPdfButtons.svelte";
  import DataTable from "../DataTable.svelte";
  import { t } from "../../utils/i18n";

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
  let loading = $state(true);
  let responseTOTALE = $state([]);
  let responseSITI;
  let responseAPP;

  let annoRiferimento = $state();

  const columns = [
    { field: "anno_dichiarazione", label: $t("dicLineChart.anno") },
    {
      field: "num_dichiarazione_pub_anno_SITI",
      label: $t("dicLineChart.numeroSITI"),
      align: "right",
      format: (value: any) => nf(value),
    },
    {
      field: "num_dichiarazione_pub_anno_APP",
      label: $t("dicLineChart.numeroAPP"),
      align: "right",
    },
  ];

  onMount(async () => {
    const rsSITI = await fetch("/data/dichiarazione_trend_anno.json");
    responseSITI = await rsSITI.json();
    const rsAPP = await fetch("/data/dichiarazione_app_trend_anno.json");
    responseAPP = await rsAPP.json();
    loading = false;

    annoRiferimento = responseSITI?.intestazione?.anno_dichiarazione;

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
      tooltip: {
        headerFormat: "",
        pointFormat:
          '<span style="color:{point.color}">\u25CF</span> {point.x} <br/>{point.series.name}: <b>{point.y}</b>',
      },
      plotOptions: {
        series: {
          lineWidth: 3,
          legendSymbol: "rectangle",
          marker: {
            enabled: true,
            fillColor: "#FFFFFF",
            lineWidth: 1,
            lineColor: null,
            symbol: "cicrle",
          },
          label: {
            connectorAllowed: false,
          },
          pointStart: 2020,
          events: {
            legendItemClick: function (e) {
              e.preventDefault();
            },
          },
        },
      },
      series: [
        {
          name: $t("dicLineChart.numeroSITI"),
          type: "line",
          color: "#0066cc",
          data: numDichiarazioniAnnoSITI,
        },
        {
          name: $t("dicLineChart.numeroAPP"),
          type: "line",
          color: "#003366",
          data: numDichiarazioniAnnoAPP,
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
        },
      },
    });
  });
</script>

<div class="container">
  <h2 class="lead">{$t("dicLineChart.halfTitle")}</h2>

  <div class="card-box customSpacing hide-mobile pt-3 px-3">
    <div class="d-flex justify-content-between">
      <h3 class="cardTitle col-lg-8 pt-3 ps-2 ps-lg-3 d-inline-flex greyText">
        {$t("dicLineChart.title")}
      </h3>
      <div class="pe-3 my-auto">
        {#if !loading}
          <CsvPdfButtons
            rows={responseTOTALE}
            {columns}
            title={$t("dicLineChart.title")}
          />
        {/if}
      </div>
    </div>

    <div class="col-lg-8">
      <div class="px-2 px-xl-3">
        <p class="periodoLabel mb-4">
          {$t("layout.periodoMonitoraggio")}
          <span class="periodoDate">
            {$t("layout.anno")}{annoRiferimento}
          </span>
        </p>
      </div>
      <p class="mb-0 pb-3 px-2 px-xl-3">
        {@html $t("dicLineChart.chartDescription", { break: "<br/>" })}
      </p>
    </div>

    <figure class="highcharts-figure">
      <div id="dichiarazioniTrendAnno" style="width:100%; height:400px;"></div>
    </figure>
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
        periodoMonitoraggio="{$t('layout.anno')}{annoRiferimento}"
      >
        {#snippet didascaliaSlot()}
          <div class="didascalia">
            {@html $t("dicLineChart.tableDescription", { break: "<br/>" })}
          </div>
        {/snippet}
      </DataTable>
    </div>
  {/if}
</div>

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
