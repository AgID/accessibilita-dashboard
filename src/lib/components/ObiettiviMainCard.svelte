<script>
  import { onMount } from "svelte";
  import { nf, df, dp } from "../utils";
  import KpiCard from "./KpiCard.svelte";
  import Icon from "./Icon.svelte";
  import { t } from "../utils/i18n";


  let numObiettivi;
  let anno;
  let dataPagina;
  let dataPaginaFormatted;

  onMount(async () => {
    const rs = await fetch("/data/obiettivi_intestazione.json");
    const data = await rs.json();

    numObiettivi = data.find(
      (d) => d.indicatore == "num_enti_obiettivi"
    ).valore;
    anno = data[0].anno
    dataPagina = data[0].dat_ult_agg_obiettivi
    dataPaginaFormatted = df(dp(dataPagina))

  });
</script>

<div class="d-flex">
  <div class="col-12 col-xl-6 mt-3 mb-4">
    <div class="d-inline-flex">
      <span aria-hidden="true"><img src="/icons/bullseye.svg" alt="" /></span>
      <h2 class="lead mx-3">{$t("obiMainCard.title")}</h2>
    </div>
    <p class="captionUpdateDarker mb-0">
      {@html $t("obiMainCard.latestUpdate", {ultimoAggiornamento: dataPaginaFormatted, break: "<br/>" })}
      {$t("obiMainCard.updateFrequency")}
    </p>
  </div>
  <div class="d-none d-xl-flex col-xl-6" />
</div>

<div class="d-flex flex-wrap justify-content-between mt-0 pb-4">
  <div class="col-12 col-lg-7 flex-wrap">
    <h3 class="h3">
      {$t("obiMainCard.subtitle")}
    </h3>

    <div class="d-flex inline mb-1 pt-4" />
    <p>
      {@html $t("obiMainCard.paragraph", {doubleBreak: "<br/><br/>"})}
      <a
      href="https://form.agid.gov.it/home"
      title={$t("layout.externalLink")}
      target="_blank"
      rel="noreferrer"
      >form.agid.it<Icon
        name="it it-external-link"
        variant="primary"
        size="xs"
        customClass="mb-1"
      /></a>
      {@html $t("obiMainCard.paragraphTwo", {doubleBreak: "<br/><br/>"})}
      <a
        href={$t("obiMainCard.WCAGlink")}
        title={$t("layout.externalLink")}
        target="_blank"
        rel="noreferrer"
        >{$t("obiMainCard.WCAGlinkText")}<Icon
          name="it it-external-link"
          variant="primary"
          size="xs"
          customClass="mb-1"
        /></a>
    </p>
  </div>
  <div class="col-12 col-lg-5 ps-lg-4 ps-xl-5 pb-3 mt-0">
    <KpiCard
      title={$t("obiMainCard.cardTitle")}
      kpi={nf(numObiettivi)}
      caption={$t("obiMainCard.cardCaption")}{anno}
    />
  </div>
</div>
