<script lang="ts">
    import { onMount } from "svelte";
    import { nf } from "../utils";
    import CsvPdfButtons from "./CsvPdfButtons.svelte";
    import DataTable from "./DataTable.svelte";
    import { locale, t } from "../utils/i18n";
  
    // ---HIGHCHARTS BEGIN---
    import Highcharts from "highcharts";
    import HighchartsAccessibility from "highcharts/modules/accessibility";
    HighchartsAccessibility(Highcharts);
    // ---HIGHCHARTS END---
  
    let periodoMonitoraggio;
    let data;
    let loading = true;
    let chartData = [];
    let tableData = [];
  
    const columns = [
      {
        field: `conformita_${$locale}`,
        label: $t("dicAppConformita.conformita"),
        align: "left",
      },
      {
        field: "android",
        label: $t("dicAppConformita.android"),
        format: (value: any) => nf(value) + "%",
        align: "right",
      },
      {
        field: "ios",
        label: $t("dicAppConformita.ios"),
        format: (value: any) => nf(value) + "%",
        align: "right",
      },
    ];

    onMount(async () => {
      const response = await fetch(
        "/data/dichiarazione_app_so_conformita.json"
      );
      data = await response.json();
      loading = false;
      periodoMonitoraggio = data?.intestazione?.periodo_dichiarazioni.slice(-4);

      const totalAndroid = data?.data?.reduce((acc, curr) => acc + curr.android, 0) || 0;
      const totalIos = data?.data?.reduce((acc, curr) => acc + curr.ios, 0) || 0;

      tableData = data?.data?.map((item) => ({
        ...item,
        android: parseFloat(nf((item.android / totalAndroid) * 100)),
        ios: parseFloat(nf((item.ios / totalIos) * 100)),
      }));

      chartData = tableData.map(item => ({
        name: item[`conformita_${$locale}`],
        data: [item.android, item.ios],
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
          categories: [$t("dicAppConformita.android"), $t("dicAppConformita.ios")],
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
        series: chartData,
      });
    });
  </script>
  
  <div class="card-box mt-2 my-lg-5 hide-mobile pt-3 px-3">
    <h2 class="cardTitle py-3 ps-2 ps-lg-3 d-inline-flex greyText">
      {$t("dicAppConformita.title")}
    </h2>
    <div class="mb-3">
      {#if periodoMonitoraggio}
        <div class="caption text-start d-inline-block px-2 px-xl-3">
          {$t("dicAppConformita.timeframe")}{periodoMonitoraggio}
        </div>
      {/if}
    </div>
  
    <figure class="highcharts-figure">
      <div id="androidVSios" style="width:100%; height:450px;" />
    </figure>
  
    <div class="pe-3 pb-4">
      {#if !loading}
        <CsvPdfButtons
          rows={tableData}
          {columns}
          title={$t("dicAppConformita.title")}
          {periodoMonitoraggio}
        />
      {/if}
    </div>
  </div>
  
  {#if !loading}
    <div class="show-mobile">
      <DataTable
        {columns}
        rows={tableData}
        defaultSortBy=""
        title={$t("dicAppConformita.title")}
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
  