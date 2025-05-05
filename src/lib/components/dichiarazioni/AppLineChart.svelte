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

  let numDichiarazioniAnno;
  let annoSpecifico;
  let loading = true;
  let response;
  let annoRiferimento;

  const columns = [
    { field: "anno_dichiarazione", label: $t("dicLineChart.anno") },
    {
      field: "num_dichiarazione_app_pub_anno",
      label: $t("dicLineChart.numero"),
      align: "right",
      format: (value: any) => nf(value),
    },
  ];

  onMount(async () => {
    const rs = await fetch("/data/dichiarazione_app_trend_anno.json");
    response = await rs.json();
    loading = false;
    numDichiarazioniAnno = response?.data?.map(
      (r) => r.num_dichiarazione_app_pub_anno
    );

    annoSpecifico = response?.data?.map((r) => r.anno_dichiarazione);
    annoRiferimento = response?.intestazione?.anno_dichiarazione;

    const chart1 = Highcharts.chart({
      chart: { renderTo: "dichiarazioniTrendAnnoAPP", type: "line" },
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
        },
      },
      series: [
        {
          name: $t("dicLineChart.labelAPP"),
          type: "line",
          data: numDichiarazioniAnno,
        },
      ],
      legend: {
        enabled: false,
      },
    });
  });
</script>

<div class="card-box mt-3 mt-lg-0 hide-mobile pt-3 px-3">
  <div class="d-flex justify-content-between">
    <h2 class="cardTitle pt-3 ps-2 ps-lg-3 d-inline-flex greyText">
      {$t("dicLineChart.APPtitle")}
    </h2>
    <div class="pe-3 my-auto">
      {#if !loading}
        <CsvPdfButtons
          rows={response?.data}
          {columns}
          title={$t("dicLineChart.APPtitle")}
          periodoMonitoraggio="{$t('layout.anno')}{annoRiferimento}"
        />
      {/if}
    </div>
  </div>
  <div class="px-2 px-xl-3">
    <p class="periodoLabel mb-4">
      {$t("layout.periodoMonitoraggio")}
      <span class="periodoDate">
        {$t("layout.anno")}{annoRiferimento}
      </span>
    </p>
  </div>
  <p class="mb-0 pb-3 px-2 px-xl-3">
    {@html $t("dicLineChart.APPchartDescription", { break: "<br/>" })}
  </p>
  <figure class="highcharts-figure">
    <div id="dichiarazioniTrendAnnoAPP" style="width:100%; height:250px;" />
  </figure>
</div>

{#if !loading}
  <div class="show-mobile">
    <DataTable
      rows={response?.data}
      {columns}
      title={$t("dicLineChart.APPtitle")}
      defaultSortBy="anno_dichiarazione"
      descending={true}
      didascalia={true}
      periodoMonitoraggio="{$t('layout.anno')}{annoRiferimento}"
    >
      <div slot="didascaliaSlot" class="didascalia">
        {@html $t("dicLineChart.APPtableDescription", { break: "<br/>" })}
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
