<script lang="ts">
  import { onMount } from "svelte";
  import { nf, nf2d, pm } from "../../utils";
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
        field: "des_sistema_operativo",
        label: $t("moniAPPChart.os"),
        align: "left",
      },
      {
        field: "num_tot_app",
        label: $t("moniAPPChart.numero"),
        format: (value: any) => nf(value),
        align: "right",
      },
    ];
  
    onMount(async () => {
      const rs = await fetch("/data/mona_app_mon_distr_so.json");
      response = await rs.json();
      periodoMonitoraggio = response?.intestazione?.periodo_monitoraggio;
      loading = false;
  
      let response2;
      let os;
      let valore;
  
      const rs2 = await fetch(
        "/data/mona_app_mon_distr_so.json"
      );
      response2 = await rs2.json();
      os = response2?.data?.map((r) => r.des_sistema_operativo);
      valore = response2?.data?.map((r) => r.num_tot_app);
  
      let allData = [];
  
      for (let i = 0; i < os.length; i++) {
        const dataObject = {
          name: os[i],
          y: valore[i],
        };
  
        allData.push(dataObject);
      }
  
      const pieAppOSchart = Highcharts.chart({
        chart: {
          renderTo: "pieAppOSchart",
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
        },
        colors: [ "#993AB0", "#329574"],
        title: { text: "" },
        plotOptions: {
          pie: {
            startAngle: 0,
            borderRadius: 0,
            borderWidth: 8,
            borderColor: "#fff",
          },
        },
        tooltip: {
          headerFormat: "",
          pointFormat:
            '<span style="color:{point.color}">\u25CF</span> <b>{point.name}</b><br/> {point.y}',
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

<div class="card-box mt-2 mb-lg-5 hide-mobile pt-3 px-3">
  <h2 class="cardTitle py-3 ps-2 ps-lg-3 d-inline-flex greyText">
    {$t("moniAPPChart.title")}</h2>
  <div>
    <p class="mb-0 pb-3 px-2 px-xl-3">
      {$t("moniAPPChart.chartDescription")}
      <br><a href="/errori-approfondito#app" aria-label={$t("erroriTableApp.titleApp")}>
        {$t("erroriTableApp.titleApp")}
      </a>
    </p>
    
    {#if periodoMonitoraggio}
      <div class="caption text-start d-inline-block px-2 px-xl-3">
        {$t("moniAPPChart.timeframe")}{pm(periodoMonitoraggio)}
      </div>
    {/if}
  </div>

  <figure class="highcharts-figure">
    <div id="pieAppOSchart" style="width:100%; height:450px;" />
  </figure>

  <div class="pe-3 pb-4">
    {#if !loading}
      <CsvPdfButtons
        rows={response?.data}
        {columns}
        title={$t("moniAPPChart.title")}
        periodoMonitoraggio={pm(periodoMonitoraggio)}
      />
    {/if}
  </div>
</div>

{#if !loading}
  <div class="show-mobile">
    <DataTable
      {columns}
      rows={response?.data}
      title={$t("moniAPPChart.title")}
      defaultSortBy="percentuale"
      didascalia={true}
      periodoMonitoraggio={pm(periodoMonitoraggio)}
      >
      <div slot="didascaliaSlot" class="didascalia">
        {$t("moniAPPChart.tableDescription")}
        <br><a href="/errori-approfondito#app" aria-label={$t("erroriTableApp.titleApp")}>
          {$t("erroriTableApp.titleApp")}
        </a>
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
