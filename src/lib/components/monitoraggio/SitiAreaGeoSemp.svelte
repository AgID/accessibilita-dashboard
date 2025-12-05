<script lang="ts">
  import { onMount } from "svelte";
  import { nf, pm } from "../../utils";
  import CsvPdfButtons from "../CsvPdfButtons.svelte";
  import DataTable from "../DataTable.svelte";
  import { locale, t } from "../../utils/i18n";

  // ---HIGHCHARTS BEGIN---
  import Highcharts from "highcharts";
  import HighchartsAccessibility from "highcharts/modules/accessibility";
  HighchartsAccessibility(Highcharts);
  // ---HIGHCHARTS END---

  let response = $state({
    intestazione: {
      periodo_monitoraggio: "",
      dat_ultimo_aggiornamento: "",
    },
    data: [],
  });
  let periodoMonitoraggio = $state("");
  let loading = $state(true);

  onMount(async () => {
    const rs = await fetch("/data/monitoraggio_per_area_geografica.json");
    response = await rs.json();
    periodoMonitoraggio = pm(response?.intestazione?.periodo_monitoraggio);
    loading = false;

    let response2;
    let areaGeo;
    let numXarea;

    const rs2 = await fetch("/data/monitoraggio_per_area_geografica.json");
    response2 = await rs2.json();
    areaGeo = response2?.data?.map((r) => r[`area_geografica_${$locale}`]);
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
      colors: ["#0066CC", "#B0315E", "#FC552D", "#329574", "#D95EF7"],
      title: { text: "" },
      plotOptions: {
        pie: {
          startAngle: 90,
          borderRadius: 0,
          borderWidth: 8,
          borderColor: "#fff",
        },
      },
      tooltip: {
        headerFormat: "",
        pointFormat:
          '<span style="color:{point.color}">\u25CF</span> {point.name}<br/>' +
          $t("moniAreaGeo.chartLabel") +
          "<b>{point.y}</b>",
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
    { field: `area_geografica_${$locale}`, label: $t("moniAreaGeo.area") },
    {
      field: "num_siti_monitorati",
      label: $t("moniAreaGeo.numero"),
      align: "right",
      format: (value: any) => nf(value),
    },
  ];
</script>

<div class="card-box customSpacing hide-mobile pt-3 px-3">
  <div class="d-flex justify-content-between">
    <h3 class="cardTitle col-lg-8 pt-3 ps-2 ps-lg-3 d-inline-flex greyText">
      {$t("moniAreaGeo.title")}
    </h3>
    <div class="pe-3 my-auto">
      {#if !loading}
        <CsvPdfButtons
          rows={response?.data}
          {columns}
          title={$t("moniAreaGeo.title")}
        />
      {/if}
    </div>
  </div>

  <div class="col-lg-8">
    {#if periodoMonitoraggio}
      <div class="d-inline-block px-2 px-xl-3">
        <p class="periodoLabel mb-4">
          {$t("layout.periodoMonitoraggio")}
          <span class="periodoDate">
            {periodoMonitoraggio}
          </span>
        </p>
      </div>
    {/if}
    <p class="mb-0 pb-3 px-2 px-xl-3">
      {@html $t("moniAreaGeo.chartDescrSemp", { break: "<br/>" })}
    </p>
  </div>

  <figure class="highcharts-figure">
    <div id="pieChartAreaGeo" style="width:100%; height:450px;"></div>
  </figure>
</div>

{#if !loading}
  <div class="show-mobile">
    <DataTable
      {columns}
      rows={response?.data}
      title={$t("moniAreaGeo.title")}
      defaultSortBy="cod_ripartizione_geografica"
      didascalia={true}
      {periodoMonitoraggio}
    >
      {#snippet didascaliaSlot()}
        <div class="didascalia">
          {@html $t("moniAreaGeo.tableDescrSemp", { break: "<br/>" })}
        </div>
      {/snippet}
    </DataTable>
  </div>
{/if}

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
