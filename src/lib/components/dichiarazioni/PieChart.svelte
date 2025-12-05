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

  let periodoMonitoraggio = $state(0);
  let response = $state({
    intestazione: {
      anno_dichiarazione: 0,
      dat_ult_agg_dichiarazione: "",
    },
    data: [],
  });
  let loading = $state(true);

  let response2;
  let ente;
  let valore;

  const columns = [
    {
      field: `des_tipologia_ente_${$locale}`,
      label: $t("dicPie.ente"),
      align: "left",
    },
    {
      field: "num_dichiarazioni_pub",
      label: $t("dicPie.numero"),
      format: (value: any) => nf(value),
      align: "right",
    },
  ];

  onMount(async () => {
    const rs = await fetch("/data/dichiarazione_tot_per_categoria.json");
    response = await rs.json();
    loading = false;

    periodoMonitoraggio = response?.intestazione?.anno_dichiarazione;

    const rs2 = await fetch("/data/dichiarazione_tot_per_categoria.json");
    response2 = await rs2.json();
    ente = response2?.data?.map((r) => r[`des_tipologia_ente_${$locale}`]);
    valore = response2?.data?.map((r) => r.num_dichiarazioni_pub);

    let allData = [];

    for (let i = 0; i < ente.length; i++) {
      const dataObject = {
        name: ente[i],
        y: valore[i],
        ...(i === 1 && { sliced: true }),
      };

      allData.push(dataObject);
    }

    const pieChart = Highcharts.chart({
      chart: {
        renderTo: "pieChart",
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      colors: ["#329574", "#993AB0", "#FC552D"],
      title: { text: "" },
      plotOptions: {
        pie: {
          startAngle: 250,
          borderRadius: 0,
          borderWidth: 10,
          borderColor: "#fff",
        },
      },
      tooltip: {
        headerFormat: "",
        pointFormat:
          '<span style="color:{point.color}">\u25CF</span> {point.name}<br/> ' +
          $t("dicPie.numero") +
          ": <b>{point.y}</b>",
      },
      series: [
        {
          name: "Siti",
          type: "pie",
          data: allData,
        },
      ],
    });
  });
</script>

<div class="card-box customSpacing hide-mobile pt-3 px-3">
  <div class="d-flex justify-content-between">
    <h3 class="cardTitle col-lg-8 pt-3 ps-2 ps-lg-3 d-inline-flex greyText">
      {$t("dicPie.title")}
    </h3>
    <div class="pe-3 my-auto">
      {#if !loading}
        <CsvPdfButtons
          rows={response?.data}
          {columns}
          title={$t("dicPie.title")}
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
            {$t("layout.anno")}{periodoMonitoraggio}
          </span>
        </p>
      </div>
    {/if}
    <p class="mb-0 pb-3 px-2 px-xl-3">
      {$t("dicPie.chartDescription")}
    </p>
  </div>

  <figure class="highcharts-figure">
    <div id="pieChart" style="width:100%; height:450px;"></div>
  </figure>
</div>

{#if !loading}
  <div class="show-mobile">
    <DataTable
      {columns}
      rows={response?.data}
      defaultSortBy="valore"
      title={$t("dicPie.title")}
      periodoMonitoraggio="{$t('layout.anno')}{periodoMonitoraggio}"
      didascalia={true}
    >
      {#snippet didascaliaSlot()}
        <div class="didascalia">
          {$t("dicPie.tableDescription")}
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
