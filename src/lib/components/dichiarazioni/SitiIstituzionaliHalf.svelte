<script>
  import { onMount } from "svelte";
  import KpiCard from "../KpiCard.svelte";
  import { nf, nf2d } from "../../utils";
  import { t } from "../../utils/i18n";

  // ---HIGHCHARTS BEGIN---
  import Highcharts from "highcharts";
  import HighchartsAccessibility from "highcharts/modules/accessibility";
  import HighchartsVariablePie from "highcharts/modules/variable-pie";
  HighchartsAccessibility(Highcharts);
  HighchartsVariablePie(Highcharts);
  // ---HIGHCHARTS END---

  let numIstituzionaliCorrente;
  let percentuale;
  let datoXgrafico;
  let restoDelGrafico;
  let datoVisibile;
  let totale;
  let annoRiferimento;

  onMount(async () => {
    const rs = await fetch(
      "/data/dichiarazione_istituzionali_intestazione.json"
    );
    const data = await rs.json();
    numIstituzionaliCorrente = data.find(
      (d) => d.indicatore == "num_enti_con_dich_istituzionali_anno_corrente"
    ).valore;
    percentuale = data.find(
      (d) => d.indicatore == "num_perc_enti_con_dich_istituzionali_su_enti_tot"
    ).valore;
    totale = data.find((d) => d.indicatore == "num_enti_tot").valore;

    datoXgrafico = +percentuale.toFixed(2);
    restoDelGrafico = 100 - datoXgrafico;
    datoVisibile = nf2d(percentuale);
    
    annoRiferimento = data[0].dat_ult_agg_dichiarazione.substr(0, 4);

    var semivariablepie = Highcharts.chart("semicerchio", {
      chart: {
        type: "variablepie",
        backgroundColor: "transparent",
        spacing: [0, 0, 0, 0],
      },
      title: {
        text: datoVisibile + "%",
        align: "center",
        verticalAlign: "middle",
        y: 100,
        style: {
            fontSize: "2em",
            fontFamily: "Titillium Web",
            color: "#2F475E"
          },
      },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
        variablepie: {
          startAngle: -90,
          size: null,
          endAngle: 90,
          center: ["50%", "75%"],
          dataLabels: {
            enabled: false,
          },
        },
      },
      series: [
        {
          minPointSize: 10,
          innerSize: "50%",
          zMin: 0,
          type: "variablepie",
          data: [
            {
              name: "",
              y: datoXgrafico,
              color: "#0066cc",
              z: 0.2,
            },
            {
              name: "",
              color: "#cdcdcd",
              y: restoDelGrafico,
              z: 0.1,
            },
          ],
        },
      ],
    });
  });
</script>

<div class="px-xxl-5 mb-5">
  <div class="container">
    <div class="mx-auto">
      <div class="row justify-content-between">
        <div class="col-12 col-lg-6 pb-3 mt-0">
          <figure class="highcharts-figure">
            <div id="semicerchio" style="height:400px" />
            <p class="px-xl-5 ms-xl-4 me-xl-5">
              {@html $t("dicIstHalf.description", {
                percentuale: datoVisibile,
                anno: annoRiferimento,
              })}
            </p>
          </figure>
        </div>
        <div class="col-12 col-lg-6 pb-3 mt-0 px-xl-5 mt-3">
          <div class="blueKpiCard mt-5">
            <div class="cardTitle mx-lg-3 py-3 d-inline-flex greyText">
              {$t("dicIstHalf.cardOneTitle")}
            </div>
            <div class="cardMainData mx-lg-3 pb-4">{nf(numIstituzionaliCorrente)}</div>
          </div>
          <div class="blueKpiCard mt-5">
            <div class="cardTitle mx-lg-3 py-3 d-inline-flex greyText">
              {$t("dicIstHalf.cardTwoTitle")}
            </div>
            <div class="cardMainData mx-lg-3 pb-4">{nf(totale)}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<style>
  .blueKpiCard{
    background-color: #f5f9fc;
  }
</style>