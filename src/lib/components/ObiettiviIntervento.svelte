<script lang="ts">
  import { onMount } from "svelte";
  import { nf, nf2d, pm } from "../utils";
  import CsvPdfButtons from "./CsvPdfButtons.svelte";
  import DataTable from "./DataTable.svelte";

  // ---HIGHCHARTS BEGIN---
  import Highcharts from "highcharts";
  import HighchartsAccessibility from "highcharts/modules/accessibility";
  import HighchartsVariablePie from "highcharts/modules/variable-pie";
  HighchartsAccessibility(Highcharts);
  HighchartsVariablePie(Highcharts);
  // ---HIGHCHARTS END---

  let periodoMonitoraggio;
  let response;
  let response2;
  let loading = true;
  let linea;
  let numEnti;

  onMount(async () => {
    const rs2 = await fetch("/data/obiettivi_linea_intervento.json");
    response = await rs2.json();
    loading = false;
    periodoMonitoraggio = response?.intestazione?.anno

    const rs3 = await fetch("/data/obiettivi_linea_intervento.json");
    response2 = await rs3.json();
    linea = response2?.data?.map((r) => r.des_linea_intervento);
    numEnti = response2?.data?.map((r) => r.num_enti_obiettivi);

    let colors = [
      "#E0638F",
      "#993AB0",
      "#0066CC",
      "#B0315E",
      "#004080",
      "#329574",
    ];
    let sizes = [5, 2, 2.5, 2.5, 3, 4];
    let allData = [];

    for (let i = 0; i < linea.length; i++) {
      allData.push({
        y: numEnti[i],
        z: sizes[i],
        name: linea[i],
        color: colors[i],
      });
    }

    const chart5 = Highcharts.chart({
      chart: { renderTo: "pieChartIntervento", type: "variablepie" },
      title: { text: "" },
      plotOptions: {
        variablepie: {
          startAngle: 270,
          accessibility: {
            point: {
              valueDescriptionFormat: " {point.name}, {point.y} interventi",
            }
          }, 
        },
      },
      tooltip: {
        headerFormat: '',
        pointFormat: '<span style="color:{point.color}">\u25CF</span> {point.name}<br/>' +
            'Interventi: <b>{point.y}</b><br/>'
      },
      series: [
        {
          minPointSize: 10,
          innerSize: "25%",
          zMin: 0,
          type: "variablepie",
          name: "",
          borderRadius: 8,
          borderWidth: 3,
          data: allData,
        },
      ],
    });
  });

  const columns = [
    { field: "des_linea_intervento", label: "Linea di intervento" },
    {
      field: "num_enti_obiettivi",
      label: "Distribuzione interventi",
      align: "right",
      position: "end",
      format: (value: any) => nf(value),
    },
  ];
</script>

<div class="container px-0">
  <div class="card-box mt-2 my-lg-3 hide-mobile pt-3 px-3">
    <h2 class="cardTitle py-3 ps-2 ps-lg-3 d-inline-flex greyText">
      Interventi di accessibilità pubblicati per linea di intervento
    </h2>
    <div>
      <p class="mb-0 pb-3 px-2 px-xl-3">
        Gli interventi di accessibilità pubblicati entro il 31 marzo 2023 si
        distribuiscono nelle seguenti linee di intervento.
      </p>
      {#if periodoMonitoraggio}
        <div class="caption text-start d-inline-block px-2 px-xl-3">
          Periodo monitoraggio:
          {periodoMonitoraggio}
        </div>
      {/if}
    </div>

    <figure class="highcharts-figure">
      <div id="pieChartIntervento" style="width:100%; height:450px;" />
    </figure>

    <div class="pe-3 pb-4">
      {#if !loading}
        <CsvPdfButtons
          rows={response?.data}
          {columns}
          title="Interventi di accessibilità pubblicati per linea di intervento"
          periodoMonitoraggio={periodoMonitoraggio}
        />
      {/if}
    </div>
  </div>

  {#if !loading}
  <div class="show-mobile">
    <DataTable
      {columns}
      rows={response?.data}
      title="Interventi di accessibilità pubblicati per linea di intervento"
      defaultSortBy="num_enti_obiettivi"
      didascalia={true}
      periodoMonitoraggio={periodoMonitoraggio}
    >
      <div slot="didascaliaSlot" class="didascalia">
        Gli interventi di accessibilità pubblicati entro il 31 marzo 2023 si
        distribuiscono nelle seguenti linee di intervento.
      </div>
    </DataTable>
  </div>
  {/if}
</div>

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
