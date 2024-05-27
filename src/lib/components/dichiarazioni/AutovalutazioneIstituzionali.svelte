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
  let response;
  let loading = true;

  const columns = [
    {
      field: `conformita_${$locale}`,
      label: $t("dicAutoIst.conformita"),
      align: "left",
    },
    {
      field: "valore",
      label: $t("dicAutoIst.numero"),
      format: (value: any) => nf(value),
      align: "right",
    },
  ];

  onMount(async () => {
    const rs = await fetch("/data/dichiarazione_istituzionali_conformita.json");
    response = await rs.json();
    periodoMonitoraggio = response?.intestazione?.periodo_dichiarazioni;
    loading = false;

    let response2;
    let conformita;
    let valore;

    const rs2 = await fetch(
      "/data/dichiarazione_istituzionali_conformita.json"
    );
    response2 = await rs2.json();
    conformita = response2?.data?.map((r) => r[`conformita_${$locale}`]);
    valore = response2?.data?.map((r) => r.valore);

    let allData = [];

    for (let i = 0; i < conformita.length; i++) {
      const dataObject = {
        name: conformita[i],
        y: valore[i],
        ...(i === 0 && { sliced: true }),
      };

      allData.push(dataObject);
    }

    const chart4 = Highcharts.chart({
      chart: {
        renderTo: "pieAutovalIst",
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      colors: ["#993AB0", "#329574", "#FC552D"],
      title: { text: "" },
      plotOptions: {
        pie: {
          startAngle: 100,
          borderRadius: 0,
          borderWidth: 3,
          borderColor: "#fff",
        },
      },
      tooltip: {
        headerFormat: "",
        pointFormat:
          '<span style="color:{point.color}">\u25CF</span> {point.name}<br/>' +
          $t("dicAutoIst.chartLabel") +
          "<b>{point.y}</b><br/>",
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

<div class="card-box mt-2 my-lg-3 hide-mobile pt-3 px-3">
  <h2 class="cardTitle py-3 ps-2 ps-lg-3 d-inline-flex greyText">
    {$t("dicAutoIst.title")}
  </h2>
  <div>
    <p class="mb-0 pb-3 px-2 px-xl-3">
      {$t("dicAutoIst.chartDescription")}
    </p>
    {#if periodoMonitoraggio}
      <div class="caption text-start d-inline-block px-2 px-xl-3">
        {$t("dicAutoIst.timeframe")}
        {periodoMonitoraggio.slice(-4)}
      </div>
    {/if}
  </div>

  <figure class="highcharts-figure">
    <div id="pieAutovalIst" style="width:100%; height:450px;" />
  </figure>

  <div class="pe-3 pb-4">
    {#if !loading}
      <CsvPdfButtons
        rows={response?.data}
        {columns}
        title={$t("dicAutoIst.title")}
        {periodoMonitoraggio}
      />
    {/if}
  </div>
</div>

{#if !loading}
  <div class="show-mobile">
    <DataTable
      {columns}
      rows={response?.data}
      defaultSortBy="valore"
      title={$t("dicAutoIst.title")}
      periodoMonitoraggio={response?.intestazione?.periodo_dichiarazioni.slice(-4)}
      didascalia={true}
    >
      <div slot="didascaliaSlot" class="didascalia">
        {$t("dicAutoIst.tableDescription")}
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
