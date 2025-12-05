<script>
  import { onMount } from "svelte";
  import { nf, df, dp, pm } from "../../utils";
  import Icon from "../Icon.svelte";
  import { t } from "../../utils/i18n";
  import Breadcrumb from "../Breadcrumb.svelte";
  import KpiThreeCard from "../KpiThreeCard.svelte";
  import BannerPageUpdated from "../BannerPageUpdated.svelte";

  let monitoraggioDateFormatted = $state();
  let innerWidth = $state(0);
  let numPag = $state();
  let numSiti = $state();
  let numPA = $state();

  onMount(async () => {
    const rs = await fetch("/data/mona_siti_mon_intestazione.json");
    const data = await rs.json();

    numPag = data.find((d) => d.indicatore == "num pag esaminate").valore;
    numSiti = data.find((d) => d.indicatore == "num siti valutati").valore;
    numPA = data.find((d) => d.indicatore == "num enti valutati").valore;
    monitoraggioDateFormatted = data[0].anno_monitoraggio;
  });
</script>

<svelte:window bind:innerWidth />

<Breadcrumb currentPage={$t("breadcrumb.monitoraggioAppr")}></Breadcrumb>
<BannerPageUpdated pageId="monitoraggio_approfondito" />
<div class="d-flex flex-wrap">
  <div class="col-12 col-lg-6 col-xl-7 flex-wrap">
    <div class="mb-4">
      <div class="d-inline-flex">
        <span aria-hidden="true"
          ><Icon
            variant={"primary"}
            name={"it it-chart-line"}
            size={"lg"}
          /></span
        >
        <h1 class="lead mx-3">{$t("moniMainCard.titleAppr")}</h1>
      </div>
    </div>

    <h2 class="h3">
      {$t("moniMainCard.subtitleAppr")}
    </h2>
    <p class="pt-3 me-xl-5">
      {@html $t("moniMainCard.descrAppr1", { break: "<br/>" })}
      <a
        href="https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf"
        title={$t("layout.externalLink")}
        target="_blank"
        rel="noreferrer"
        >UNI EN 301 549<Icon
          name="it it-external-link"
          variant="primary"
          size="sm"
          customClass="ms-1 mb-1"
        /></a
      >
      {$t("moniMainCard.descrAppr2")}
      <a
        href={$t("moniMainCard.wcagLink")}
        title={$t("layout.externalLink")}
        target="_blank"
        rel="noreferrer"
        >{$t("moniMainCard.wcagText")}<Icon
          name="it it-external-link"
          variant="primary"
          size="sm"
          customClass="ms-1 mb-1"
        /></a
      >.
    </p>
    <p class="pb-3 me-xl-5">
      {@html $t("moniMainCard.descrAppr3", { break: "<br/>" })}
      <a
        href={$t("moniMainCard.direttivaLink")}
        title={$t("layout.externalLink")}
        target="_blank"
        rel="noreferrer"
        >{$t("moniMainCard.direttiva")}<Icon
          name="it it-external-link"
          variant="primary"
          size="sm"
          customClass="ms-1 mb-1"
        /></a
      >.
    </p>
  </div>

  <div class="col-12 col-md-9 col-lg-6 col-xl-5">
    {#if numPag && numSiti && numPA}
      <KpiThreeCard
        periodoMonitoraggio="{$t('layout.anno')}{monitoraggioDateFormatted}"
        firstImg="account_balance"
        firstLabel={$t("moniMainCard.cardTitle3")}
        firstKpi={nf(numPA)}
        secondImg="globe"
        secondLabel={$t("moniMainCard.cardTitle1")}
        secondKpi={nf(numSiti)}
        thirdImg="window-stack"
        thirdLabel={$t("moniMainCard.cardTitle2")}
        thirdKpi={nf(numPag)}
      ></KpiThreeCard>
    {/if}
  </div>
</div>
