<script lang="ts">
  import { onMount } from "svelte";
  import { nf, nf1d, nf2d, pm } from "../../utils";
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

  onMount(async () => {
    const rs = await fetch("/data/mona_siti_pdf_mon_distr_errore.json");
    response = await rs.json();
    periodoMonitoraggio = response?.intestazione?.anno_monitoraggio;
    loading = false;

    let response2;
    let pdfType;
    let perc;

    const rs2 = await fetch("/data/mona_siti_pdf_mon_distr_errore.json");
    response2 = await rs2.json();
    pdfType = response2?.data?.map((r) => r[`perc_errore_${$locale}`]);
    perc = response2?.data?.map((r) => r.perc_num_pdf_senza_errori);

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
          },
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
    { field: `perc_errore_${$locale}`, label: $t("moniPDFChart.area") },
    {
      field: "perc_num_pdf_senza_errori",
      label: $t("moniPDFChart.numero"),
      align: "right",
      format: (value: any) => nf1d(value) + "%",
      formatDownload: (value: any) => nf2d(value) + "%",
    },
  ];
</script>

<div class="card-box mt-2 mb-lg-5 hide-mobile pt-3 px-3">
  <div class="d-flex justify-content-between">
    <h3 class="cardTitle pt-3 ps-2 ps-lg-3 d-inline-flex greyText">
      {$t("moniPDFChart.title")}
    </h3>
    <div class="pe-3 my-auto">
      {#if !loading}
        <CsvPdfButtons
          rows={response?.data}
          {columns}
          title={$t("moniPDFChart.title")}
          searchingName={$t("moniPDFChart.titleAppr")}
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
      {@html $t("moniPDFChart.chartDescrAppr", { break: "<br/>" })}
      <br /><a
        href="/errori-approfondito#pdf"
        aria-label={$t("erroriTableApp.titlePdf")}
      >
        {$t("erroriTableApp.titlePdf")}
      </a>
    </p>
  </div>

  <figure class="highcharts-figure">
    <div id="pieChartPDF" style="width:100%; height:450px;" />
  </figure>
</div>

{#if !loading}
  <div class="show-mobile">
    <DataTable
      {columns}
      rows={response?.data}
      title={$t("moniPDFChart.title")}
      defaultSortBy="perc_num_pdf_senza_errori"
      didascalia={true}
      searchingName={$t("moniPDFChart.titleAppr")}
      periodoMonitoraggio="{$t('layout.anno')}{periodoMonitoraggio}"
    >
      <div slot="didascaliaSlot" class="didascalia">
        {@html $t("moniPDFChart.tableDescrAppr", { break: "<br/>" })}
        <br /><a
          href="/errori-approfondito#pdf"
          aria-label={$t("erroriTableApp.titlePdf")}
        >
          {$t("erroriTableApp.titlePdf")}
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
