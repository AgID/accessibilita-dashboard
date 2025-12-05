<script>
  import { onMount } from "svelte";
  import { nf, df, dp, pm } from "../../utils";
  import Icon from "../Icon.svelte";
  import { t } from "../../utils/i18n";
  import Breadcrumb from "../Breadcrumb.svelte";
  import KpiThreeCard from "../KpiThreeCard.svelte";
  import BannerPageUpdated from "../BannerPageUpdated.svelte";

  let item = $state();
  let innerWidth = $state(0);
  let monitoraggioDateFormatted = $state();

  onMount(async () => {
    const rs = await fetch("/data/monitoraggio_intestazione.json");
    const data = await rs.json();
    item = data[0];
    monitoraggioDateFormatted = pm(item.periodo_monitoraggio);
  });
</script>

<svelte:window bind:innerWidth />

<Breadcrumb currentPage={$t("breadcrumb.monitoraggioSemp")}></Breadcrumb>
<BannerPageUpdated pageId="monitoraggio_semplificato" />
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
        <h1 class="lead mx-3">{$t("moniMainCard.titleSemp")}</h1>
      </div>
    </div>

    <h2 class="h3">
      {$t("moniMainCard.subtitleSemp")}
    </h2>
    <p class="py-3 pe-xl-5 me-xl-5 pb-0 mb-0">
      {$t("moniMainCard.descrSemp1")}
      <a
        href="https://mauve-pnrr.isti.cnr.it/about.jsp"
        title={$t("layout.externalLink")}
        target="_blank"
        rel="noreferrer"
        >MAUVE++<Icon
          name="it it-external-link"
          variant="primary"
          size="sm"
          customClass="ms-1 mb-1"
        /></a
      >{@html $t("moniMainCard.descrSemp2", {
        doubleBreak: "<br/><br/>",
        break: "<br/>",
      })}
      <a href="/opendata" title="open data">{$t("moniMainCard.opendataLink")}</a
      >{$t("moniMainCard.descrSemp3")}
    </p>
  </div>

  <div class="col-12 col-md-9 col-lg-6 col-xl-5">
    {#if item}
      <KpiThreeCard
        periodoMonitoraggio={monitoraggioDateFormatted}
        firstImg="account_balance"
        firstLabel={$t("moniMainCard.cardTitle3")}
        firstKpi={nf(item.num_enti_siti_monitorati)}
        secondImg="globe"
        secondLabel={$t("moniMainCard.cardTitle1")}
        secondKpi={nf(item.num_siti_monitorati)}
        thirdImg="window-stack"
        thirdLabel={$t("moniMainCard.cardTitle2")}
        thirdKpi={nf(item.num_pagine_valutate)}
      ></KpiThreeCard>
    {/if}
  </div>
</div>
