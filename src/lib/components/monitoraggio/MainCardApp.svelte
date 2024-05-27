<script>
  import { onMount } from "svelte";
  import { nf, df, dp } from "../../utils";
  import Icon from "../Icon.svelte";
  import { t } from "../../utils/i18n";

  let date;
  let innerWidth;
  let numPag;
  let numSiti;
  let numPA;

  onMount(async () => {
    const rs = await fetch("/data/mona_siti_mon_intestazione.json");
    const data = await rs.json();

    numPag = data.find((d) => d.indicatore == "num pag esaminate").valore;
    numSiti = data.find((d) => d.indicatore == "num siti valutati").valore;
    numPA = data.find((d) => d.indicatore == "num enti valutati").valore;
    date = df(dp(data[0].dat_ultimo_monitoraggio));
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
        <h2 class="lead mx-3">{$t("moniMainCard.titleApp")}</h2>
      </div>
      <p class="captionUpdateDarker">
        {@html $t("moniMainCard.latestUpdate", {ultimoAggiornamento: date})} 
      </p>
    </div>

    <h3 class="h3">
      {$t("moniMainCard.subtitleApp")}
    </h3>
    <p class="py-3 pe-xl-5 me-xl-5">
      {@html $t("moniMainCard.descriptionApp", {doubleBreak: "<br/><br/>"})}
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
          {#if numPA}
            <p class="cardTitle greyText">{$t("moniMainCard.cardTitle3")}</p>
            <p class="cardMainData mt-2" style="color: #0066cc">
              {nf(numPA)}
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
          {#if numSiti}
            <p class="cardTitle greyText">{$t("moniMainCard.cardTitle1")}</p>
            <p class="cardMainData mt-2" style="color: #0066cc">
              {nf(numSiti)}
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
          {#if numPag}
            <p class="cardTitle mb-2 greyText" style="white-space:nowrap">
              {$t("moniMainCard.cardTitle2")}
            </p>
            <p class="cardMainData mt-2" style="color: #0066cc">
              {nf(numPag)}
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
