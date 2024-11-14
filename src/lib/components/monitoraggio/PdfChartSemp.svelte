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

  let response;
  let periodoMonitoraggio;
  let loading = true;
  let numPDF;


  onMount(async () => {

    const rsData = await fetch("/data/monitoraggio_pdf_intestazione.json");
    const data = await rsData.json();
    const pdfEvaluated = data[0].num_pdf_valutati;
    numPDF = nf(pdfEvaluated)


    const rs = await fetch("/data/monitoraggio_pdf_distr_errore.json");
    response = await rs.json();
    periodoMonitoraggio = pm(response?.intestazione?.monitoraggio_pdf_intestazione);
    loading = false;

    let response2;
    let pdfType;
    let perc;

    const rs2 = await fetch("/data/monitoraggio_pdf_distr_errore.json");
    response2 = await rs2.json();
    pdfType = response2?.data?.map((r) => r[`tipo_pdf_${$locale}`]);
    perc = response2?.data?.map((r) => r.percentuale);

    let allData = [];

    for (let i = 0; i < pdfType.length; i++) {
      const dataObject = {
        name: pdfType[i],
        y: Math.round(perc[i]),
        ...(i === 0 && { sliced: true }),
      };

      allData.push(dataObject);
    }

    const chart4 = Highcharts.chart({
      chart: {
        renderTo: "pieChartPDF",
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      colors: ["#0066CC", "#FC552D"],
      title: { text: "" },
      plotOptions: {
        pie: {
          startAngle: 270,
          borderRadius: 0,
          borderWidth: 8,
          borderColor: "#fff",
          dataLabels: {
            format: "{point.name} {point.y}%",
            }
        },
      },
      tooltip: {
        enabled: false,
      },
      series: [
        {
          name: "",
          type: "pie",
          data: allData,
        },
      ],
    });
  });

  const columns = [
    { field: `tipo_pdf_${$locale}`, label: $t("moniPDFChart.area") },
    {
      field: "percentuale",
      label: $t("moniPDFChart.numero"),
      align: "right",
      format: (value: any) => nf2d(value) + "%",
    },
  ];

</script>

<div class="card-box mt-2 my-lg-3 hide-mobile pt-3 px-3">
  <h3 class="cardTitle py-3 ps-2 ps-lg-3 d-inline-flex greyText">
    {$t("moniPDFChart.title")}</h3>
  <div>
    <p class="mb-0 pb-3 px-2 px-xl-3">
      {@html $t("moniPDFChart.chartDescriptionSemp", {break: "<br/>", total: numPDF})}
      <br><a href="/errori-semplificato#pdf" aria-label={$t("errPdfTable.title")}>{$t("errPdfTable.title")}</a>
    </p>
    
    {#if periodoMonitoraggio}
      <div class="caption text-start d-inline-block px-2 px-xl-3">
        {$t("moniPDFChart.timeframe")}{periodoMonitoraggio}
      </div>
    {/if}
  </div>

  <figure class="highcharts-figure">
    <div id="pieChartPDF" style="width:100%; height:450px;" />
  </figure>

  <div class="pe-3 pb-4">
    {#if !loading}
      <CsvPdfButtons
        rows={response?.data}
        {columns}
        title={$t("moniPDFChart.title")}
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
      title={$t("moniPDFChart.title")}
      defaultSortBy="percentuale"
      didascalia={true}
      periodoMonitoraggio={periodoMonitoraggio}
    >
      <div slot="didascaliaSlot" class="didascalia">
        {@html $t("moniPDFChart.tableDescriptionSemp",  {break: "<br/>", total: numPDF})}
        <br><a href="/errori-semplificato#pdf" aria-label={$t("errPdfTable.title")}>{$t("errPdfTable.title")}</a>
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
