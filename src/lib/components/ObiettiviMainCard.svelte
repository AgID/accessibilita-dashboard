<script>
  import { onMount } from "svelte";
  import { nf, df, dp, pm } from "../utils";
  import KpiCard from "./KpiCard.svelte";
  import Icon from "./Icon.svelte";
  import { t } from "../utils/i18n";
  import Breadcrumb from "./Breadcrumb.svelte";
  import BannerPageUpdated from "./BannerPageUpdated.svelte";

  let numObiettivi;
  let anno;
  let periodoMonitoraggio;

  onMount(async () => {
    const rs = await fetch("/data/obiettivi_intestazione.json");
    const data = await rs.json();

    numObiettivi = data.find(
      (d) => d.indicatore == "num_enti_obiettivi"
    ).valore;
    anno = data[0].anno_obiettivi;
    periodoMonitoraggio = pm(data[0].aggior_ultimo_trimestre);
  });
</script>

<Breadcrumb currentPage={$t("breadcrumb.obiettivi")}></Breadcrumb>
<BannerPageUpdated pageId="obiettivi" />
<div class="d-flex">
  <div class="col-12 col-xl-6 mb-4">
    <div class="d-inline-flex">
      <span aria-hidden="true"><img src="/icons/bullseye.svg" alt="" /></span>
      <h1 class="lead mx-3">{$t("obiMainCard.title")}</h1>
    </div>
  </div>
  <div class="d-none d-xl-flex col-xl-6" />
</div>

<div class="d-flex flex-wrap justify-content-between mt-0 pb-4">
  <div class="col-12 col-lg-7 flex-wrap">
    <h2 class="h3">
      {$t("obiMainCard.subtitle")}
    </h2>

    <div class="d-flex inline mb-1 pt-4" />
    <p>
      {$t("obiMainCard.paragraph1")}
      <a
        href="https://docs.italia.it/AgID/documenti-in-consultazione/lg-accessibilita-docs/it/stabile/index.html"
        title={$t("layout.externalLink")}
        target="_blank"
        rel="noreferrer"
        >{$t("obiMainCard.lineeGuidaAcc")}<Icon
          name="it it-external-link"
          variant="primary"
          size="sm"
          customClass="ms-1 mb-1"
        /></a
      >{$t("obiMainCard.paragraph1b")}<a
        href="https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legge:2012-10-18;179"
        title={$t("layout.externalLink")}
        target="_blank"
        rel="noreferrer"
        >{$t("obiMainCard.decretoText")}<Icon
          name="it it-external-link"
          variant="primary"
          size="sm"
          customClass="ms-1 mb-1"
        /></a
      >.
    </p>
    <p>
      {$t("obiMainCard.paragraph2")}
      <a
        href="https://form.agid.gov.it/home"
        title={$t("layout.externalLink")}
        target="_blank"
        rel="noreferrer"
        >form.agid.it<Icon
          name="it it-external-link"
          variant="primary"
          size="sm"
          customClass="ms-1 mb-1"
        /></a
      >
      {$t("obiMainCard.paragraph3")}
      <a
        href={$t("obiMainCard.obiLink")}
        title={$t("layout.externalLink")}
        target="_blank"
        rel="noreferrer"
        >{$t("obiMainCard.obiText")}<Icon
          name="it it-external-link"
          variant="primary"
          size="sm"
          customClass="ms-1 mb-1"
        /></a
      >.
    </p>
  </div>
  <div class="col-12 col-lg-5 ps-lg-4 ps-xl-5 pb-3 mt-0">
    <KpiCard
      {periodoMonitoraggio}
      title={$t("obiMainCard.cardTitle", { anno: anno })}
      kpi={nf(numObiettivi)}
    />
  </div>
</div>
