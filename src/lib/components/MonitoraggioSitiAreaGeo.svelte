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

  let response;
  let periodoMonitoraggio;
  let loading = true;

  onMount(async () => {
    const rs = await fetch("/data/monitoraggio_per_area_geografica.json");
    response = await rs.json();
    periodoMonitoraggio = pm(response?.intestazione?.periodo_monitoraggio)
    loading = false;
    
    let response2
    let areaGeo
    let numXarea

    const rs2 = await fetch("/data/monitoraggio_per_area_geografica.json");
    response2 = await rs2.json();
    areaGeo = response2?.data?.map((r) => r.area_geografica);
    numXarea = response2?.data?.map((r) => r.num_siti_monitorati);

    let allData = [];

    for (let i = 0; i < areaGeo.length; i++) {

      const dataObject = {
        name: areaGeo[i],
        y: numXarea[i],
        ...(i === 0 && { sliced: true }),
      };

      allData.push(dataObject);
    }

    const chart4 = Highcharts.chart({
      chart: {
        renderTo: "pieChartAreaGeo",
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      colors: [
        '#0066CC',
        '#B0315E',
        '#FC552D',
        '#329574',
        '#D95EF7',
    ],
      title: { text: "" },
      plotOptions: {
        pie: {
            startAngle: 90,
            borderRadius: 0,
            borderWidth: 3,
            borderColor: "#fff"
        }
      },
      tooltip: {
        headerFormat: '',
        pointFormat: '<span style="color:{point.color}">\u25CF</span> {point.name}<br/>' +
            'Siti monitorati: <b>{point.y}</b><br/>'
      },
      series: [
        {
          name: "Siti monitorati",
          type: "pie",
          data: allData,
        },
      ],
    });
  });

  const columns = [
    { field: "area_geografica", label: "Area Geografica" },
    {
      field: "num_siti_monitorati",
      label: "Numero Siti Monitorati",
      align: "right",
      format: (value: any) => nf(value),
    },
  ];

</script>

<div class="card-box mt-2 my-lg-3 hide-mobile pt-3 px-3">
  <h2 class="cardTitle py-3 ps-2 ps-lg-3 d-inline-flex greyText">
    Siti monitorati per area geografica
  </h2>
  <div>
      <p class="mb-0 pb-3 px-2 px-xl-3">
    Il grafico riporta la distribuzione dei siti monitorati raggruppati nei 5 valori della Nomenclatura delle Unità territoriali per le Statistiche dell’Italia (NUTS) usati per fini statistici a livello dell’Unione Europea (Eurostat).
  </p>
  {#if periodoMonitoraggio}
  <div class="caption text-start d-inline-block px-2 px-xl-3">
    Periodo monitoraggio:
    {periodoMonitoraggio}
  </div>
{/if}
  </div>

  <figure class="highcharts-figure">
    <div id="pieChartAreaGeo" style="width:100%; height:450px;" />
  </figure>

  <div class="pe-3 pb-4">
    {#if !loading}
      <CsvPdfButtons
        rows={response?.data}
        {columns}
        title="Siti monitorati per area geografica"
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
      title="Siti monitorati per area geografica"
      defaultSortBy="cod_ripartizione_geografica"
      didascalia={true}
      periodoMonitoraggio={periodoMonitoraggio}
    >
      <div slot="didascaliaSlot" class="didascalia">
          In tabella è riportata una distribuzione dei siti monitorati
          raggruppati nei 5 valori della Nomenclatura delle Unità Territoriali
          per le Statistiche dell'Italia (NUTS) usati per fini statistici a
          livello dell'Unione Europea (Eurostat).
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