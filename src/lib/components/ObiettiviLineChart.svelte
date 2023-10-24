<script lang="ts">
  import { onMount } from "svelte";
  import { nf, pm } from "../utils";
  import CsvPdfButtons from "./CsvPdfButtons.svelte";
  import DataTable from "./DataTable.svelte";

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
    { field: "cod_anno", label: "Anno" },
    {
      field: "num_enti_obiettivi",
      label: "Obiettivi di accessibiltà",
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
          label: {
            connectorAllowed: false,
          },
          pointStart: 2016,
        },
      },
      series: [
        {
          name: "Obiettivi di accessibilità",
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
  <h2 class="cardTitle py-3 ps-2 ps-lg-3 d-inline-flex greyText">
    Trend degli obiettivi di accessibiltà
  </h2>

  <figure class="highcharts-figure">
    <div id="obiettiviTrendAnno" style="width:100%; height:250px;" />
  </figure>

  <p class="mb-0 pb-3 px-2 px-xl-4">
    Il trend degli obiettivi di accessibilità riporta l’andamento delle
    pubblicazioni degli obiettivi da parte delle PA per i loro siti web e
    applicazioni mobile nel corso degli anni. Il crescente aumento degli
    obiettivi mette in risalto l’impegno preso nel rendere le informazioni
    fruibili a tutti, senza discriminazioni
  </p>

  <div class="pe-3 pb-4">
    {#if !loading}
      <CsvPdfButtons
        rows={response?.data}
        {columns}
        title="Trend degli obiettivi di accessibiltà"
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
      title="Trend degli obiettivi di accessibiltà"
      defaultSortBy="cod_anno"
      descending={true}
      didascalia={true}
      periodoMonitoraggio={response?.intestazione?.periodo_obiettivi}
    >
      <div slot="didascaliaSlot" class="didascalia">
        Il trend degli obiettivi di accessibilità riporta l’andamento delle
        pubblicazioni degli obiettivi da parte delle PA per i loro siti web e
        applicazioni mobile nel corso degli anni. Il crescente aumento degli
        obiettivi mette in risalto l’impegno preso nel rendere le informazioni
        fruibili a tutti, senza discriminazioni.
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