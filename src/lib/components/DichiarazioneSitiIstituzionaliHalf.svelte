<script>
  import { onMount } from "svelte";
  import KpiCard from "./KpiCard.svelte";
  import ProgressBar from "progressbar.js";
  import { nf, nf2d } from "../utils";

  let annoRiferimento
  let numIstituzionaliCorrente;
  let percentuale;
  let totale;
  let datoXgrafico;

  onMount(async () => {

    const rs = await fetch("/data/dichiarazione_istituzionali_intestazione.json");
    const data = await rs.json();
    numIstituzionaliCorrente = data.find(
      (d) => d.indicatore == "num_enti_con_dich_istituzionali_anno_corrente"
    ).valore;
    percentuale = data.find(
      (d) => d.indicatore == "num_perc_enti_con_dich_istituzionali_su_enti_tot"
    ).valore;
    totale =  data.find(
      (d) => d.indicatore == "num_enti_tot"
    ).valore;

    datoXgrafico = Math.round(percentuale) / 100;

    const riferimento = await fetch("/data/dichiarazione_intestazione.json");
    const dataRiferimento = await riferimento.json()
    annoRiferimento = dataRiferimento[0].dat_ult_agg_dichiarazione.substr(0, 4)


    var circle = new ProgressBar.Circle("#progress", {
      color: "#CC7A00",
      strokeWidth: 25,
      trailColor: "#cdcdcd",
      trailWidth: 15,
      fill: "rgba(255,255,255,0)",
      svgStyle: {
        display: "block",
        width: "100%",
      },
      text: {
        value: nf2d(percentuale) + "%",
        style: {
          color: "#2F475E",
          fontSize: "3em",
          fontWeight: "bold",
          position: "absolute",
          left: "50%",
          top: "50%",
          padding: 0,
          margin: 0,
          transform: {
            prefix: true,
            value: "translate(-50%, -50%)",
          },
        },
      },
      animate: true,
    });

    circle.animate(datoXgrafico, {
      duration: 1000,
    });
  });
</script>

<div class="backgroundLightBlue py-5 px-xxl-5 my-5">
  <div class="container">
    <div class="mx-auto">
      <h3 class="h3 greyText pb-4 text-center">
        Le dichiarazioni dei siti istituzionali del {annoRiferimento}
      </h3>

      <div class="row justify-content-between">
        <div class="d-none d-xl-flex col-xl-1" />
        <div class="col-12 col-lg-6 col-xl-5 pb-3 mt-0">
          <KpiCard
            title="Siti istituzionali che hanno pubblicato la dichiarazione"
            kpi={nf(numIstituzionaliCorrente)}
            caption=""
          />
          <KpiCard
            title="Totale di siti istituzionali censiti sul catalogo IPA"
            kpi={nf(totale)}
            caption=""
          />
        </div>
        <div class="col-12 col-lg-6 pb-3 mt-0">
          <div class="row mt-5">
            <div
              class="col-12 col-sm-7 col-lg-8 col-xl-6 d-flex justify-content-center"
            >
              <div class="progress mt-5" id="progress" aria-hidden="true"/>
            </div>
            <div
              class="col-12 col-sm-5 col-lg-4 col-xl-6 mt-sm-5 px-lg-0 px-xl-2"
            >
              <p class="ps-xl-2 ps-sm-2 pe-xl-5 me-xl-5 mt-5">
                Nel {annoRiferimento} il {nf2d(percentuale)}% dei siti istituzionali censiti sul catalogo
                IPA ha pubblicato la propria dichiarazione di accessibilità.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  #progress {
    width: 280px;
    height: 280px;
  }

  .progress {
    background-color: transparent;
  }
</style>