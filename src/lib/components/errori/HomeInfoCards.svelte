<script>
  import { onMount } from "svelte";
  import { nf, df, dp } from "../../utils";
  import { t } from "../../utils/i18n";

  export let height = "";

  $: mainHeight = height ? `height:${height};` : "";

  let errSemp;
  let totErrSemp;
  let errSiti;
  let totErrSiti;
  let errApp;
  let totErrApp;

  onMount(async () => {
    const rsSemp = await fetch(
      "/data/errori_distribuzione_livello_conformita.json"
    );
    const dataSemp = await rsSemp.json();
    errSemp = dataSemp;
    totErrSemp = nf(
      errSemp[0].num_sc_non_soddisfatti + errSemp[1].num_sc_non_soddisfatti
    );

    const rsSiti = await fetch("/data/mona_siti_errori_conformita.json");
    const dataSiti = await rsSiti.json();
    errSiti = dataSiti.data;
    totErrSiti = 50;
    //nf(errSiti[0].num_errori + errSiti[1].num_errori);

    const rsApp = await fetch("/data/mona_app_errori_conformita.json");
    const dataApp = await rsApp.json();
    errApp = dataApp.data;
    totErrApp = nf(errApp[0].num_errori + errApp[1].num_errori);
  });
</script>

{#if errSemp}
  <div class="card-box mt-0" style={`${mainHeight}`}>
    <div class:vertical-align={height}>
      <div class="blueInit py-2 px-auto">
        <div class="row">
          <div class="col-10 mx-auto">
            <div class="cardTitle whiteText py-3">
              {$t("errcard.homeSemp")}
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-10 mx-auto my-4">
          <p class="mb-2 display5">{$t("errcard.homeWeb")}</p>
          <div class="cardMainData">
            {totErrSemp}
            {$t("errcard.data")}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="card-box mt-5" style={`${mainHeight}`}>
    <div class:vertical-align={height}>
      <div class="blueInit py-2 px-auto">
        <div class="row">
          <div class="col-10 mx-auto">
            <div class="cardTitle whiteText py-3">
              {$t("errcard.homeAppr")}
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-10 mx-auto my-4">
          <p class="mb-2 display5">{$t("errcard.homeWeb")}</p>
          <div class="cardMainData">
            {totErrSiti}
            {$t("errcard.data")}
          </div>
          <hr />
          <p class="mb-2 display5">{$t("errcard.homeApp")}</p>
          <div class="cardMainData">
            {totErrApp}
            {$t("errcard.data")}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .vertical-align {
    padding-top: 1.2em;
  }

  .blueInit {
    background-color: #0066cc;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
  }

  .whiteText {
    color: #f5f5f5 !important;
  }
  .circle {
    width: 70px;
    height: 70px;
    border-radius: 50px;
    border: 3px solid #0066cc;
    line-height: 65px;
    text-align: center;
  }
</style>
