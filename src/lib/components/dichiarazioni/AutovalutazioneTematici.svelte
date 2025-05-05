<script lang="ts">
  import { onMount } from "svelte";
  import { df, dp, nf } from "../../utils";
  import DataTable from "../DataTable.svelte";
  import CsvPdfButtons from "../CsvPdfButtons.svelte";
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
      label: $t("dicAutoTema.conformita"),
      align: "left",
    },
    {
      field: "valore",
      label: $t("dicAutoTema.numero"),
      format: (value: any) => nf(value),
      align: "right",
    },
  ];
  onMount(async () => {
    const rs = await fetch("/data/dichiarazione_tematici_conformita.json");
    response = await rs.json();
    periodoMonitoraggio = response?.intestazione?.anno_dichiarazione;
    loading = false;

    let response2;
    let conformita;
    let valore;

    const rs2 = await fetch("/data/dichiarazione_tematici_conformita.json");
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
        renderTo: "pieAutovalTema",
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      colors: ["#B0315E", "#4392E0", "#1B6021"],
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
          $t("dicAutoTema.chartLabel") +
          "<b>{point.y}</b><br/>",
      },
      series: [
        {
          name: "Siti web",
          type: "pie",
          data: allData,
        },
      ],
    });
  });
</script>

<div class="card-box mt-2 my-lg-3 hide-mobile pt-3 px-3">
  <div class="d-flex justify-content-between">
    <h3 class="cardTitle pt-3 ps-2 ps-lg-3 d-inline-flex greyText">
      {$t("dicAutoTema.title")}
    </h3>
    <div class="pe-3 my-auto">
      {#if !loading}
        <CsvPdfButtons
          rows={response?.data}
          {columns}
          title={$t("dicAutoTema.title")}
          periodoMonitoraggio="{$t('layout.anno')}{periodoMonitoraggio}"
        />
      {/if}
    </div>
  </div>
  <div>
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
      {@html $t("dicAutoTema.chartDescription", { break: "<br/>" })}
    </p>
  </div>

  <figure class="highcharts-figure">
    <div id="pieAutovalTema" style="width:100%; height:450px;" />
  </figure>
</div>

{#if !loading}
  <div class="show-mobile">
    <DataTable
      {columns}
      rows={response?.data}
      defaultSortBy="valore"
      title={$t("dicAutoTema.title")}
      periodoMonitoraggio="{$t('layout.anno')}{periodoMonitoraggio}"
      didascalia={true}
    >
      <div slot="didascaliaSlot" class="didascalia">
        {@html $t("dicAutoTema.tableDescription", { break: "<br/>" })}
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
