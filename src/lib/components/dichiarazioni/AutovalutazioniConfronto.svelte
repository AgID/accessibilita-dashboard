<script lang="ts">
  import { onMount } from "svelte";
  import { nf } from "../../utils";
  import CsvPdfButtons from "../CsvPdfButtons.svelte";
  import DataTable from "../DataTable.svelte";
  import { locale, t } from "../../utils/i18n";

  // ---HIGHCHARTS BEGIN---
  import Highcharts from "highcharts";
  import HighchartsAccessibility from "highcharts/modules/accessibility";
  HighchartsAccessibility(Highcharts);
  // ---HIGHCHARTS END---

  let periodoMonitoraggio;
  let data;
  let loading = true;

  const columns = [
    {
      field: `conformita_${$locale}`,
      label: $t("dicAutovalConf.conformita"),
      align: "left",
    },
    {
      field: "siti_istituzionali",
      label: $t("dicAutovalConf.sitiIst"),
      format: (value: any) => nf(value) + "%",
      align: "right",
    },
    {
      field: "siti_tematici",
      label: $t("dicAutovalConf.sitiTema"),
      format: (value: any) => nf(value) + "%",
      align: "right",
    },
  ];

  let conformita;
  let sitiIst;
  let sitiTema;
  let allData = [];

  onMount(async () => {
    const response = await fetch(
      "/data/dichiarazione_conformita_confronto.json"
    );
    data = await response.json();
    loading = false;
    periodoMonitoraggio = data?.intestazione?.periodo_dichiarazioni.slice(-4);

    conformita = data?.data?.map((r) => r[`conformita_${$locale}`]);
    sitiIst = data?.data?.map((r) => r.siti_istituzionali);
    sitiTema = data?.data?.map((r) => r.siti_tematici);

    for (let i = 0; i < conformita.length; i++) {
      const dataObject = {
        name: conformita[i],
        data: [sitiIst[i], sitiTema[i]],
        type: "bar",
      };
      allData.push(dataObject);
    }

    const chart4 = Highcharts.chart({
      chart: {
        renderTo: "istVStema",
        type: "bar",
      },
      title: {
        text: "",
      },
      xAxis: {
        categories: [$t("dicAutovalConf.sitiIst"), $t("dicAutovalConf.sitiTema")],
        labels: {
          style: {
            fontWeight: "bold",
            fontSize: "16px"
          }
        }
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
            fontSize: "16px"
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
        }
      },
      tooltip: {
        format:
          '<span style="font-size: 0.8em">{x}</span><br/>' +
          '<span style="color:{color}">\u25CF</span> ' +
          "{series.name}: <b>{y}%</b><br/>",
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
            format: "{y}%",
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
                legendItemClick: function(e) {
                    e.preventDefault();
                }
            }
        },
      },
      colors: ["#004080", "#0066CC", "#4392E0"],
      series: allData,
    });
  });
</script>

<div class="card-box mt-2 my-lg-5 hide-mobile pt-3 px-3">
  <h2 class="cardTitle py-3 ps-2 ps-lg-3 d-inline-flex greyText">
    {$t("dicAutovalConf.title")}
  </h2>
  <div class="mb-3">
    {#if periodoMonitoraggio}
      <div class="caption text-start d-inline-block px-2 px-xl-3">
        {$t("dicAutovalConf.timeframe")}{periodoMonitoraggio}
      </div>
    {/if}
  </div>

  <figure class="highcharts-figure">
    <div id="istVStema" style="width:100%; height:450px;" />
  </figure>

  <div class="pe-3 pb-4">
    {#if !loading}
      <CsvPdfButtons
        rows={data?.data}
        {columns}
        title={$t("dicAutovalConf.title")}
        {periodoMonitoraggio}
      />
    {/if}
  </div>
</div>

{#if !loading}
  <div class="show-mobile">
    <DataTable
      {columns}
      rows={data?.data}
      defaultSortBy=""
      title={$t("dicAutovalConf.title")}
      {periodoMonitoraggio}
    />
  </div>
{/if}

<style lang="scss">
  :global(.highcharts-credits) {
    display: none !important;
  }
  :global(.highcharts-legend-item rect){
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
