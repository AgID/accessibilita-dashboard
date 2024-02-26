<script>
  import { onMount } from "svelte";
  import { nf, df, dp } from "../utils";
  import Icon from "./Icon.svelte";
  import { t } from "../utils/i18n";

  let innerWidth;
  let dataPaginaFormatted;
  let date;
  let numPDF;
  let numSiti;
  let numPA;
  
  onMount(async () => {
    const rs = await fetch("/data/monitoraggio_pdf_intestazione.json");
    const data = await rs.json();
    numPDF = data[0].num_pdf_valutati;
    numSiti = data[0].num_siti_monitorati;
    numPA = data[0].num_enti_siti_monitorati;
    date = data[0].dat_ultimo_monitoraggio;
    dataPaginaFormatted = df(dp(date));
  });
</script>

<svelte:window bind:innerWidth/>
<div class="d-flex flex-wrap mb-3">
  <div class="col-12 col-lg-6 col-xl-7 flex-wrap">
    <div class="mt-5 mb-4">
      <div class="d-inline-flex">
        <span aria-hidden="true"
          ><Icon
            variant={"primary"}
            name={"it it-chart-line"}
            size={"lg"}
          /></span
        >
        <h2 class="lead mx-3">{$t("moniPDFCard.title")}</h2>
      </div>
      <p class="captionUpdateDarker">
        {@html $t("moniPDFCard.latestUpdate", {
          ultimoAggiornamento: dataPaginaFormatted,
        })}
      </p>
    </div>

    <h3 class="h3">
      {$t("moniPDFCard.subtitle")}
    </h3>
    <p class="py-3 pe-xl-5 me-xl-5">
      {@html $t("moniPDFCard.description", {break: "<br/>"})}
    </p>
  </div>

  <div class="col-12 col-md-9 col-lg-6 col-xl-5">
    <div class="card-box pt-4 px-3 ms-xl-3">
      <div class="row">
        <div class="col-3 customMonBox">
          <img
            src="/images/account_balance.svg"
            alt=""
            class="ps-2 ps-sm-3"
            aria-hidden="true"
          />
        </div>
        <div class="col-9 ps-3 ps-sm-4">
          <p class="cardTitle greyText">{$t("moniPDFCard.cardTitle3")}</p>
          <p class="cardMainData mt-2" style="color: #0066cc">
            {nf(numPA)}
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-3 customMonBox">
          <img
            src="/images/globe.svg"
            alt=""
            class="ps-2 ps-sm-3"
            aria-hidden="true"
          />
        </div>
        <div class="col-9 ps-3 ps-sm-4">
          <p class="cardTitle greyText">{$t("moniPDFCard.cardTitle1")}</p>
          <p class="cardMainData mt-2" style="color: #0066cc">
            {nf(numSiti)}
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-3 customMonBox">
          <img
            src="/images/window-stack.svg"
            alt=""
            class="ps-2 ps-sm-3"
            aria-hidden="true"
          />
        </div>
        <div class="col-9 ps-3 ps-sm-4">
          <p class="cardTitle mb-2 greyText" style="white-space:nowrap">
            {$t("moniPDFCard.cardTitle2")}
          </p>
          <p class="cardMainData mt-2" style="color: #0066cc">
            {nf(numPDF)}
          </p>
          <p class="captionUpdateDarker py-2">
            {@html $t("moniPDFCard.cardCaption", {
              aggiornamento: dataPaginaFormatted,
            })}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .customMonBox {
    padding-top: 8px;
  }

  @media screen and (max-width: 400px) {
    .customMonBox {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }

    .card-box {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
  }
</style>
