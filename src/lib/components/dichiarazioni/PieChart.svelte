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
  
    let periodoMonitoraggio;
    let response;
    let loading = true;
  
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
      periodoMonitoraggio = response?.intestazione?.periodo_dichiarazioni;
      loading = false;
  
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
        colors: [ "#329574", "#993AB0", "#FC552D"],
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
            '<span style="color:{point.color}">\u25CF</span> <b>{point.name}</b><br/> {point.y} ' + $t("dicPie.numero"),
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
      {$t("dicPie.title")}
    </h2>
    <div>
      <p class="mb-0 pb-3 px-2 px-xl-3">
        {$t("dicPie.chartDescription")}
      </p>
      {#if periodoMonitoraggio}
        <div class="caption text-start d-inline-block px-2 px-xl-3">
          {$t("dicPie.timeframe")}
          {periodoMonitoraggio.slice(-4)}
        </div>
      {/if}
    </div>
  
    <figure class="highcharts-figure">
      <div id="pieChart" style="width:100%; height:450px;" />
    </figure>
  
    <div class="pe-3 pb-4">
      {#if !loading}
        <CsvPdfButtons
          rows={response?.data}
          {columns}
          title={$t("dicPie.title")}
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
        title={$t("dicPie.title")}
        periodoMonitoraggio={periodoMonitoraggio.slice(-4)}
        didascalia={true}
      >
        <div slot="didascaliaSlot" class="didascalia">
          {$t("dicPie.tableDescription")}
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
  