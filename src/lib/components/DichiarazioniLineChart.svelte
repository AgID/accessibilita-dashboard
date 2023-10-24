<script lang="ts">
  import { onMount } from "svelte";
  import { nf, pm } from "../utils";
  import CsvPdfButtons from "./CsvPdfButtons.svelte";
  import DataTable from "./DataTable.svelte";

  // ---HIGHCHARTS STUFF BEGIN---
  import Highcharts from "highcharts";
  import HighchartsAccessibility from "highcharts/modules/accessibility";
  import HighchartsVariablePie from "highcharts/modules/variable-pie";
  HighchartsAccessibility(Highcharts);
  HighchartsVariablePie(Highcharts);
  // ---HIGHCHARTS STUFF END---

  let numDichiarazioniAnno;
  let annoSpecifico;
  let loading = true;
  let response;
  const columns = [
    { field: "anno_dichiarazione", label: "Anno" },
    {
      field: "num_dichiarazione_pub_anno",
      label: "Numero Dichiarazioni",
      align: "right",
      format: (value: any) => nf(value),
    },
  ];

  onMount(async () => {
    const rs = await fetch("/data/dichiarazione_trend_anno.json");
    response = await rs.json();
    loading = false;
    numDichiarazioniAnno = response?.data?.map(
      (r) => r.num_dichiarazione_pub_anno
    );
    annoSpecifico = response?.data?.map((r) => r.anno_dichiarazione);

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
          label: {
            connectorAllowed: false,
          },
          pointStart: 2020,
        },
      },
      series: [
        {
          name: "Dichiarazioni di accessibilità",
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
  <h2 class="cardTitle py-3 ps-2 ps-lg-3 d-inline-flex greyText">
    Trend delle dichiarazioni di accessibiltà
  </h2>

  <figure class="highcharts-figure">
    <div id="dichiarazioniTrendAnno" style="width:100%; height:250px;" />
  </figure>

  <p class="mb-0 pb-3 px-2 px-xl-4">
    Il trend delle dichiarazioni di accessibilità riporta l’andamento delle
    pubblicazioni delle dichiarazioni di accessibilità da parte delle PA per i
    loro siti web nel corso degli anni. Il grafico illustra dal 2020 ad oggi,
    l’incremento della pubblicazione delle dichiarazioni di accessibilità da
    parte delle PA.
  </p>

  <div class="pe-3 pb-4">
    {#if !loading}
      <CsvPdfButtons
        rows={response?.data}
        {columns}
        title="Trend delle dichiarazioni di accessibilità"
        periodoMonitoraggio={response?.intestazione?.periodo_dichiarazioni}
      />
    {/if}
  </div>
</div>

{#if !loading}
  <div class="show-mobile">
    <DataTable
      rows={response?.data}
      {columns}
      title="Trend delle dichiarazioni di accessibilità"
      defaultSortBy="anno_dichiarazione"
      descending={true}
      didascalia={true}
      periodoMonitoraggio={response?.intestazione?.periodo_dichiarazioni}
    >
      <div slot="didascaliaSlot" class="didascalia">
        Il trend delle dichiarazioni di accessibilità riporta l’andamento delle
        pubblicazioni delle dichiarazioni di accessibilità da parte delle PA per
        i loro siti web e applicazioni mobile nel corso degli anni. Il crescente
        aumento delle dichiarazioni mette in risalto l’impegno preso nel rendere
        le informazioni fruibili a tutti, senza discriminazioni.
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
