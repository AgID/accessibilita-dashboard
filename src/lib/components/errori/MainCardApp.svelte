<script>
  import { onMount } from "svelte";
  import { df, dp } from "../../utils";
  import { t } from "../../utils/i18n";
  import Icon from "../Icon.svelte";
  import MainInfoCardApp from "./MainInfoCardApp.svelte";

  let dataPagina;
  let dataPaginaFormatted;

  onMount(async () => {
    const rsDistribuzioneConformita = await fetch("/data/mona_siti_errori_conformita.json");
    const dataDistribuzioneConformita = await rsDistribuzioneConformita.json();
    dataPagina = dataDistribuzioneConformita.intestazione.dat_ultimo_aggiornamento
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
      <h1 class="lead mx-3">{$t("erroriMain.titleAppr")}</h1>
    </div>
    <p class="captionUpdateDarker mb-0">
      {@html $t("erroriMain.latestUpdate", {ultimoAggiornamento: dataPaginaFormatted})}
    </p>
  </div>
  <div class="d-none d-xl-flex col-xl-6" />
</div>

  <div class="col-12">
    <div class="card-start">
      <div class="d-flex flex-wrap justify-content-between">
        <div class="row">
          <div class="col-12 col-lg-6">
            <h2 class="h3 mb-4">
              {$t("erroriMain.subtitleAppMain")}
            </h2>
            <p>{@html $t("erroriMain.descriptionAppMain", {doubleBreak: "<br/><br/>", break: "<br/>"})}
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
            <MainInfoCardApp />
          </div>
        </div>
      </div>
    </div>
  </div>