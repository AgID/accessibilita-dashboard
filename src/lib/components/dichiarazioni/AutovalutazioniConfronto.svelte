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
  let data = $state({
    intestazione: {
      anno_dichiarazione: 0,
      dat_ult_agg_dichiarazione: "",
    },
    data: [],
  });
  let loading = $state(true);
  let allData = [];
  let ordineConformita = ["Conforme", "Parzialmente conforme", "Non conforme"];

  const columns = [
    {
      field: `conformita_${$locale}`,
      label: $t("dicAutovalConf.conformita"),
      align: "left",
    },
    {
      field: "siti_istituzionali",
      label: $t("dicAutovalConf.sitiIst"),
      format: (value: any) => nf1d(value) + "%",
      formatDownload: (value: any) => nf2d(value) + "%",
      align: "right",
    },
    {
      field: "siti_tematici",
      label: $t("dicAutovalConf.sitiTema"),
      format: (value: any) => nf1d(value) + "%",
      formatDownload: (value: any) => nf2d(value) + "%",
      align: "right",
    },
  ];

  const normalizeNumber = (value, locale) => {
    return parseFloat(locale === "it" ? value.replace(",", ".") : value);
  };

  onMount(async () => {
    const response = await fetch(
      "/data/dichiarazione_conformita_confronto.json"
    );
    data = await response.json();
    loading = false;

    periodoMonitoraggio = data?.intestazione?.anno_dichiarazione;

    const orderedData = ordineConformita.map((conformita) =>
      data.data.find((item) => item[`conformita_it`] === conformita)
    );

    orderedData.forEach((item) => {
      if (item) {
        allData.push({
          name: item[`conformita_${$locale}`],
          data: [
            {
              y: normalizeNumber(nf1d(item.siti_istituzionali), $locale),
              display: nf1d(item.siti_istituzionali),
            },
            {
              y: normalizeNumber(nf1d(item.siti_tematici), $locale),
              display: nf1d(item.siti_tematici),
            },
          ],
          type: "bar",
        });
      }
    });

    const chart4 = Highcharts.chart({
      chart: {
        renderTo: "istVStema",
        type: "bar",
      },
      title: {
        text: "",
      },
      xAxis: {
        categories: [
          $t("dicAutovalConf.sitiIst"),
          $t("dicAutovalConf.sitiTema"),
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
      series: allData,
    });
  });
</script>

<div class="card-box customSpacing hide-mobile pt-3 px-3">
  <div class="d-flex justify-content-between">
    <h3 class="col-lg-8 cardTitle pt-3 ps-2 ps-lg-3 d-inline-flex greyText">
      {$t("dicAutovalConf.title")}
    </h3>
    <div class="col-4 col-xl-2 pe-3 my-auto">
      {#if !loading}
        <CsvPdfButtons
          rows={data?.data}
          {columns}
          title={$t("dicAutovalConf.title")}
        />
      {/if}
    </div>
  </div>
  {#if periodoMonitoraggio}
    <div class="px-2 px-xl-3">
      <p class="periodoLabel mb-4">
        {$t("layout.periodoMonitoraggio")}
        <span class="periodoDate">
          {$t("layout.anno")}{periodoMonitoraggio}
        </span>
      </p>
    </div>
  {/if}

  <figure class="highcharts-figure">
    <div id="istVStema" style="width:100%; height:450px;"></div>
  </figure>
</div>

{#if !loading}
  <div class="show-mobile">
    <DataTable
      {columns}
      rows={data?.data}
      defaultSortBy=""
      title={$t("dicAutovalConf.title")}
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
