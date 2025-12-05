<script lang="ts">
  import { onMount } from "svelte";
  import { nf, nf1d, nf2d } from "../../utils";
  import CsvPdfButtons from "../CsvPdfButtons.svelte";
  import DataTable from "../DataTable.svelte";
  import { locale, t } from "../../utils/i18n";

  // ---HIGHCHARTS BEGIN---
  import Highcharts from "highcharts";
  import HighchartsAccessibility from "highcharts/modules/accessibility";
  HighchartsAccessibility(Highcharts);
  // ---HIGHCHARTS END---

  let periodoMonitoraggio = $state();
  let data;
  let loading = $state(true);
  let chartData = [];
  let tableData = $state([]);
  let ordineConformita = ["Conforme", "Parzialmente conforme", "Non conforme"];

  const normalizeNumber = (value, locale) => {
    return parseFloat(locale === "it" ? value.replace(",", ".") : value);
  };

  const columns = [
    {
      field: `conformita_${$locale}`,
      label: $t("dicAppConformita.conformita"),
      align: "left",
    },
    {
      field: "Android",
      label: $t("dicAppConformita.android"),
      format: (value: any) => nf1d(value) + "%",
      formatDownload: (value: any) => nf2d(value) + "%",
      align: "right",
    },
    {
      field: "iOS",
      label: $t("dicAppConformita.ios"),
      format: (value: any) => nf1d(value) + "%",
      formatDownload: (value: any) => nf2d(value) + "%",
      align: "right",
    },
  ];

  onMount(async () => {
    const response = await fetch("/data/dichiarazione_app_so_conformita.json");
    data = await response.json();
    loading = false;
    periodoMonitoraggio = data?.intestazione?.anno_dichiarazione;

    const totalAndroid =
      data?.data?.reduce((acc, curr) => acc + curr.Android, 0) || 0;
    const totalIos = data?.data?.reduce((acc, curr) => acc + curr.iOS, 0) || 0;

    tableData = data?.data?.map((item) => ({
      ...item,
      Android: normalizeNumber(
        nf2d((item.Android / totalAndroid) * 100),
        $locale
      ),
      iOS: normalizeNumber(nf2d((item.iOS / totalIos) * 100), $locale),
    }));

    chartData = ordineConformita
      .map((conformita) =>
        tableData.find((item) => item.conformita_it === conformita)
      )
      .map((item) => ({
        name: item[`conformita_${$locale}`],
        data: [
          { y: item.Android, display: nf1d(item.Android) },
          { y: item.iOS, display: nf1d(item.iOS) },
        ],
        type: "bar",
      }));

    const OSconmpare = Highcharts.chart({
      chart: {
        renderTo: "androidVSios",
        type: "bar",
      },
      title: {
        text: "",
      },
      xAxis: {
        categories: [
          $t("dicAppConformita.android"),
          $t("dicAppConformita.ios"),
        ],
        labels: {
          style: {
            fontWeight: "bold",
            fontSize: "16px",
          },
        },
      },
      yAxis: {
        min: 0,
        max: 100,
        tickAmount: 3,
        title: {
          text: "",
        },
        labels: {
          style: {
            fontWeight: "bold",
            fontSize: "16px",
          },
          format: "{value}%",
        },
      },
      legend: {
        symbolHeight: 30,
        symbolRadius: 4,
        itemMarginBottom: 0,
        itemMarginTop: 25,
        itemStyle: {
          fontWeight: "bold",
        },
      },
      tooltip: {
        formatter: function () {
          const pct = (this.point.options as any).display;
          return `<span style="color:${this.color}">\u25CF</span> ${this.series.name}<br/>${this.x}: <b>${pct}%</b>`;
        },
      },
      plotOptions: {
        bar: {
          borderWidth: 1,
        },
        series: {
          dataLabels: {
            allowOverlap: true,
            enabled: true,
            crop: false,
            borderRadius: 4,
            borderWidth: 0,
            backgroundColor: "white",
            format: "{point.display}%",
            padding: 6,
            style: {
              textOutline: "none",
              color: "black",
              fontWeight: "bold",
              fontSize: "22px",
              fontFamily: "sans-serif",
            },
          },
          events: {
            legendItemClick: function (e) {
              e.preventDefault();
            },
          },
        },
      },
      colors: ["#004080", "#0066CC", "#4392E0"],
      series: chartData,
    });
  });
</script>

<div class="card-box customSpacing hide-mobile pt-3 px-3">
  <div class="d-flex justify-content-between">
    <h2 class="cardTitle col-lg-8 pt-3 ps-2 ps-lg-3 d-inline-flex greyText">
      {$t("dicAppConformita.title")}
    </h2>
    <div class="pe-3 my-auto">
      {#if !loading}
        <CsvPdfButtons
          rows={tableData}
          {columns}
          title={$t("dicAppConformita.title")}
        />
      {/if}
    </div>
  </div>
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

  <figure class="highcharts-figure">
    <div id="androidVSios" style="width:100%; height:450px;"></div>
  </figure>
</div>

{#if !loading}
  <div class="show-mobile">
    <DataTable
      {columns}
      rows={tableData}
      defaultSortBy=""
      title={$t("dicAppConformita.title")}
      periodoMonitoraggio="{$t('layout.anno')}{periodoMonitoraggio}"
    />
  </div>
{/if}

<style>
  :global(.highcharts-credits) {
    display: none !important;
  }
  :global(.highcharts-legend-item rect) {
    y: 22;
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
