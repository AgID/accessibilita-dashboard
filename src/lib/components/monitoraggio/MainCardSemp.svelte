<script>
  import { onMount } from "svelte";
  import { nf, df, dp } from "../../utils";
  import Icon from "../Icon.svelte";
  import { t } from "../../utils/i18n";

  let item;
  let date;
  let innerWidth;
  let dataPagina;
  let dataPaginaFormatted;

  onMount(async () => {
    const rs = await fetch("/data/monitoraggio_intestazione.json");
    const data = await rs.json();
    item = data[0];
    date = df(dp(item.dat_ultimo_monitoraggio));

    const rs2 = await fetch("/data/monitoraggio_data.json");
    const data2 = await rs2.json();
    dataPagina = data2.find(
      (d) => d.indicatore == "data_ultimo_aggiornamento_pagina"
    ).valore;
    dataPaginaFormatted = df(dp(dataPagina));
  });
</script>

<svelte:window bind:innerWidth />
<div class="d-flex flex-wrap">
  <div class="col-12 col-lg-6 col-xl-7 flex-wrap">
    <div class="mt-3 mb-4">
      <div class="d-inline-flex">
        <span aria-hidden="true"
          ><Icon
            variant={"primary"}
            name={"it it-chart-line"}
            size={"lg"}
          /></span
        >
        <h2 class="lead mx-3">{$t("moniMainCard.titleSemp")}</h2>
      </div>
      <p class="captionUpdateDarker">
        {@html $t("moniMainCard.latestUpdate", {ultimoAggiornamento: dataPaginaFormatted})} 
      </p>
    </div>

    <h3 class="h3">
      {$t("moniMainCard.subtitleSemp")}
    </h3>
    <p class="py-3 pe-xl-5 me-xl-5">
      {@html $t("moniMainCard.descriptionSemp", {doubleBreak: "<br/><br/>"})}
    </p>
  </div>

  <div class="col-12 col-md-9 col-lg-6 col-xl-5">
    <div class="card-box pt-4 px-3 ms-xl-3">
      <div class="row mx-0">
        <div class="col-3 customMonBox">
          <img
            src="/images/account_balance.svg"
            alt=""
            class="ps-2 ps-sm-3"
            aria-hidden="true"
          />
        </div>
        <div class="col-9 ps-3 ps-sm-4">
          {#if item}
            <p class="cardTitle greyText">{$t("moniMainCard.cardTitle3")}</p>
            <p class="cardMainData mt-2" style="color: #0066cc">
              {nf(item.num_enti_siti_monitorati)}
            </p>
          {/if}
        </div>
      </div>
      <div class="row mx-0">
        <div class="col-3 customMonBox">
          <img
            src="/images/globe.svg"
            alt=""
            class="ps-2 ps-sm-3"
            aria-hidden="true"
          />
        </div>
        <div class="col-9 ps-3 ps-sm-4">
          {#if item}
            <p class="cardTitle greyText">{$t("moniMainCard.cardTitle1")}</p>
            <p class="cardMainData mt-2" style="color: #0066cc">
              {nf(item.num_siti_monitorati)}
            </p>
          {/if}
        </div>
      </div>
      <div class="row mx-0">
        <div class="col-3 customMonBox">
          <img
            src="/images/window-stack.svg"
            alt=""
            class="ps-2 ps-sm-3"
            aria-hidden="true"
          />
        </div>
        <div class="col-9 ps-3 ps-sm-4">
          {#if item}
            <p class="cardTitle mb-2 greyText" style="white-space:nowrap">
              {$t("moniMainCard.cardTitle2")}
            </p>
            <p class="cardMainData mt-2" style="color: #0066cc">
              {nf(item.num_pagine_valutate)}
            </p>
            <p class="captionUpdateDarker py-2">
              {@html $t("moniMainCard.cardCaption", {aggiornamento: date})} 
            </p>
          {/if}
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
