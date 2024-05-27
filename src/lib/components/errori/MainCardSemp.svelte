<script>
  import { onMount } from "svelte";
  import { df, dp } from "../../utils";
  import { t } from "../../utils/i18n";
  import Icon from "../Icon.svelte";
  import InfoCardSemp from "./InfoCardSemp.svelte";

  let erroriConformita;
  let totaleErroriConformita = 0;

  let dataPagina;
  let dataPaginaFormatted;

  onMount(async () => {
    const rsDistribuzioneConformita = await fetch(
      "/data/errori_distribuzione_livello_conformita.json"
    );
    const dataDistribuzioneConformita = await rsDistribuzioneConformita.json();
    erroriConformita = dataDistribuzioneConformita;
    totaleErroriConformita =
      erroriConformita[0].num_sc_non_soddisfatti +
      erroriConformita[1].num_sc_non_soddisfatti;

    const rs2 = await fetch("/data/errori_data.json");
    const data2 = await rs2.json();
    dataPagina = data2.find(
      (d) => d.indicatore == "data_ultimo_aggiornamento_pagina"
    ).valore;
    dataPaginaFormatted = df(dp(dataPagina))


  });
</script>

<div class="d-flex">
  <div class="col-12 col-xl-6 mt-3 mb-4">
    <div class="d-inline-flex">
      <span aria-hidden="true"
        ><Icon
          name="it it-exclamation-diamond"
          variant="primary"
          size="lg"
        /></span
      >
      <h2 class="lead mx-3">{$t("erroriMain.title")}</h2>
    </div>
    <p class="captionUpdateDarker mb-0">
      {@html $t("erroriMain.latestUpdate", {ultimoAggiornamento: dataPaginaFormatted})}
    </p>
  </div>
  <div class="d-none d-xl-flex col-xl-6" />
</div>

{#if erroriConformita}
  <div class="col-12">
    <div class="card-start">
      <div class="d-flex flex-wrap justify-content-between">
        <div class="row">
          <div class="col-12 col-lg-6">
            <h3 class="h3 mb-4">
              {$t("erroriMain.subtitleSemp")}
            </h3>
            <p>{@html $t("erroriMain.descriptionSemp", {break: "<br/>", numero: totaleErroriConformita})}
              <a
                href={$t("erroriMain.WCAGlink")}
                title={$t("layout.externalLink")}
                target="_blank"
                rel="noreferrer"
                >{$t("erroriMain.link")}<Icon
                  name="it it-external-link"
                  variant="primary"
                  size="xs"
                  customClass="mb-1"
                /></a
              >.
              <br /><br />
            </p>
          </div>
          <div class="col-12 col-lg-6 px-0 ps-md-3 ps-lg-5">
            <InfoCardSemp />
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
