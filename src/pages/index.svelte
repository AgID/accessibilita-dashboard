<script>
  import { onMount } from "svelte";
  import HomeInfoCards from "../lib/components/errori/HomeInfoCards.svelte";
  import HomeMainCard from "../lib/components/HomeMainCard.svelte";
  import Icon from "../lib/components/Icon.svelte";
  import KpiCard from "../lib/components/KpiCard.svelte";
  import { df, dp, nf, pm } from "../lib/utils";
  import { t } from "../lib/utils/i18n";
  import KpiThreeCard from "../lib/components/KpiThreeCard.svelte";
  import BannerPageUpdated from "../lib/components/BannerPageUpdated.svelte";

  let innerWidth;
  let pagineValutate;
  let sitiValutati;
  let pdfValutati;
  let dichiarazioniAccessibilita;
  let obiettiviAccessibilità;

  let totalerroriConformita;

  let obiettiviDate;
  let monitoraggioDateFormatted;
  let dichiarazioniDateFormatted;
  let obiettiviDateFormatted;

  let annoRiferimentoDic;
  let annoRiferimentoObi;

  onMount(async () => {
    const rsMon = await fetch("/data/monitoraggio_intestazione.json");
    const dataMon = await rsMon.json();
    pagineValutate = dataMon[0].num_pagine_valutate;
    sitiValutati = dataMon[0].num_siti_monitorati;
    monitoraggioDateFormatted = pm(dataMon[0].periodo_monitoraggio);

    const rsPDF = await fetch("/data/monitoraggio_pdf_intestazione.json");
    const dataPDF = await rsPDF.json();
    pdfValutati = dataPDF[0].num_pdf_valutati;

    const rsErr = await fetch(
      "/data/errori_distribuzione_livello_conformita.json"
    );
    const erroriConformita = await rsErr.json();
    totalerroriConformita = nf(
      erroriConformita[0].num_sc_non_soddisfatti +
        erroriConformita[1].num_sc_non_soddisfatti
    );

    const rsDic = await fetch("/data/dichiarazione_tot_intestazione.json");
    const dataDic = await rsDic.json();
    dichiarazioniAccessibilita = dataDic.find(
      (d) => d.indicatore == "num_dichiarazioni_pub_tot"
    ).valore;
    dichiarazioniDateFormatted = df(dp(dataDic[0].dat_ult_agg_dichiarazione));
    annoRiferimentoDic = dataDic[0].dat_ult_agg_dichiarazione.slice(0, 4);

    const rsObi = await fetch("/data/obiettivi_intestazione.json");
    const dataObi = await rsObi.json();
    obiettiviAccessibilità = dataObi.find(
      (d) => d.indicatore == "num_enti_obiettivi"
    ).valore;
    obiettiviDate = dataObi[0].dat_ult_agg_obiettivi;
    obiettiviDateFormatted = df(dp(obiettiviDate));
    annoRiferimentoObi = dataObi[0].anno_obiettivi;
  });
</script>

<svelte:window bind:innerWidth />

<svelte:head>
  <title>{$t("homepage.pagename")}</title>
</svelte:head>

<HomeMainCard />
<div class="container mt-4">
  <BannerPageUpdated pageId="home" />
</div>
<div class="container mb-4 pb-3">
  {#if pagineValutate && pdfValutati}
    <div class="row">
      {#if innerWidth >= 992}
        <div class="col-lg-5">
          <KpiThreeCard
            periodoMonitoraggio={monitoraggioDateFormatted}
            firstImg="globe"
            firstLabel={$t("homepage.monitoraggioCard3Title")}
            firstKpi={nf(sitiValutati)}
            secondImg="window-stack"
            secondLabel={$t("homepage.monitoraggioCardTitle")}
            secondKpi={nf(pagineValutate)}
            thirdImg="PDF"
            thirdLabel={$t("homepage.monitoraggioCard2Title")}
            thirdKpi={nf(pdfValutati)}
          ></KpiThreeCard>
        </div>
      {/if}

      <div class="col-12 col-lg-7 pe-xl-5">
        <div class="d-inline-flex mb-4">
          <span aria-hidden="true">
            <Icon name="it it-chart-line" variant="primary" size="lg" />
          </span>
          <h2 class="lead mx-3">{$t("homepage.monitoraggioTitle")}</h2>
        </div>
        <h3 class="h3 pb-lg-4 mb-0">{$t("homepage.monitoraggioSubtitle")}</h3>
        <p class="pe-lg-5">
          {@html $t("homepage.monitoraggioParagraphPt1", {
            doubleBreak: "<br/><br/>",
          })}
          <a href="/monitoraggio-semplificato" rel="noreferrer"
            >{$t("homepage.monitoraggioSempLink")}</a
          >
          {$t("homepage.monitoraggioParagraphPt2a")}
          <a
            title={$t("layout.externalLink")}
            target="_blank"
            rel="noreferrer"
            href="https://mauve.isti.cnr.it/singleValidation.jsp"
            >MAUVE++<Icon
              name="it it-external-link"
              variant="primary"
              size="sm"
              customClass="ms-1 mb-1"
            />
          </a>
          {@html $t("homepage.monitoraggioParagraphPt2b", {
            doubleBreak: "<br/><br/>",
          })}
          <a href="/monitoraggio-approfondito" rel="noreferrer"
            >{$t("homepage.monitoraggioAppLink")}</a
          >
          {$t("homepage.monitoraggioParagraphPt3")}
        </p>
      </div>

      {#if innerWidth < 992}
        <div class="col-12 pt-5">
          <KpiThreeCard
            periodoMonitoraggio={monitoraggioDateFormatted}
            firstImg="globe"
            firstLabel={$t("homepage.monitoraggioCard3Title")}
            firstKpi={nf(sitiValutati)}
            secondImg="window-stack"
            secondLabel={$t("homepage.monitoraggioCardTitle")}
            secondKpi={nf(pagineValutate)}
            thirdImg="PDF"
            thirdLabel={$t("homepage.monitoraggioCard2Title")}
            thirdKpi={nf(pdfValutati)}
          ></KpiThreeCard>
        </div>
      {/if}
    </div>
  {/if}
</div>
<div class="background py-4 px-xxl-5">
  <div class="container mt-4">
    <div class="row mb-lg-5">
      <div class="d-inline-flex my-4 justify-content-start">
        <span aria-hidden="true"
          ><Icon
            name="it it-exclamation-diamond"
            variant="primary"
            size="lg"
          /></span
        >
        <h2 class="lead mx-3">{$t("homepage.erroriTitle")}</h2>
      </div>

      <div class="col-lg-7 pe-xl-4">
        <h3 class="h3 pe-lg-3 pb-lg-4">
          {$t("homepage.erroriSubtitle")}
        </h3>
        <p>
          {$t("homepage.erroriParagraph1")}
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
          {$t("homepage.erroriParagraph2")}
          <a
            href={$t("homepage.erroriDirettivaLink")}
            title={$t("layout.externalLink")}
            target="_blank"
            rel="noreferrer"
            >{$t("homepage.erroriDirettiva")}<Icon
              name="it it-external-link"
              variant="primary"
              size="sm"
              customClass="ms-1 mb-1"
            /></a
          >.
        </p>
        <p>
          {$t("homepage.erroriParagraph3")}
          <a
            href={$t("homepage.erroriWCAGLink")}
            title={$t("layout.externalLink")}
            target="_blank"
            rel="noreferrer"
            >WCAG 2.1<Icon
              name="it it-external-link"
              variant="primary"
              size="sm"
              customClass="ms-1 mb-1"
            /></a
          >
          {@html $t("homepage.erroriParagraph4", {
            totErrori: totalerroriConformita,
            break: "<br/>",
            doubleBreak: "<br/><br/>",
          })}
        </p>
      </div>
      <div class="col-lg-5 px-0">
        <HomeInfoCards />
      </div>
    </div>
  </div>
</div>
{#if dichiarazioniAccessibilita}
  <div class="py-4 px-xxl-5">
    <div class="container mt-4">
      <div class="row">
        <div class="col-lg-7 pe-xl-3">
          <div class="d-inline-flex my-4">
            <span aria-hidden="true"
              ><Icon name="it it-files" variant="primary" size="lg" /></span
            >
            <h2 class="lead mx-3">{$t("homepage.dichiarazioniTitle")}</h2>
          </div>
          <h3 class="h3 pb-lg-4">{$t("homepage.dichiarazioniSubtitle")}</h3>
          <p class="me-lg-3">
            {$t("homepage.dichiarazioniParagraph1")}
            <a
              href={$t("homepage.dichiarazioniAGIDlink")}
              title={$t("layout.externalLink")}
              target="_blank"
              rel="noreferrer"
              >{$t("homepage.dichiarazioniLink")}<Icon
                name="it it-external-link"
                variant="primary"
                size="sm"
                customClass="ms-1 mb-1"
              />
            </a>
            {@html $t("homepage.dichiarazioniParagraph2", {
              doubleBreak: "<br/><br/>",
            })}
            (<a
              title={$t("layout.externalLink")}
              target="_blank"
              rel="noreferrer"
              href="https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2004-01-09;4!vig="
              >{$t("homeMain.dichiarazioniLegge")}<Icon
                name="it it-external-link"
                variant="primary"
                size="sm"
                customClass="ms-1 mb-1"
              /></a
            >).
          </p>
        </div>

        <div class="col-lg-5 ps-0 pe-0 pt-lg-5 pb-lg-4">
          <KpiCard
            title={$t("homepage.dichiarazioniCardTitle", {
              anno: annoRiferimentoDic,
            })}
            kpi={nf(dichiarazioniAccessibilita)}
            linkText={$t("homepage.dichiarazioniPageLink")}
            href="dichiarazione"
          />
        </div>
      </div>
    </div>
  </div>
{/if}

{#if obiettiviAccessibilità}
  <div class="py-4 px-xxl-5 mb-5">
    <div class="container mt-4">
      <div class="row">
        <div class="col-lg-7 pe-xl-3">
          <div class="d-inline-flex my-4">
            <span aria-hidden="true"
              ><img src="/icons/bullseye.svg" alt="" />
            </span>
            <h2 class="lead mx-3">{$t("homepage.obiettiviTitle")}</h2>
          </div>
          <h3 class="h3 pb-lg-4">{$t("homepage.obiettiviSubtitle")}</h3>
          <p class="me-lg-3">
            {$t("homepage.obiettiviParagraph1")}
            <a
              href={$t("homepage.obiettiviAGIDlink")}
              title={$t("layout.externalLink")}
              target="_blank"
              rel="noreferrer"
              >{$t("homepage.obiettiviLink")}<Icon
                name="it it-external-link"
                variant="primary"
                size="sm"
                customClass="ms-1 mb-1"
              /></a
            >
            {@html $t("homepage.obiettiviParagraph2", {
              doubleBreak: "<br/><br/>",
            })}
            (<a
              href="https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legge:2012-10-18;179"
              title={$t("layout.externalLink")}
              target="_blank"
              rel="noreferrer"
              >{$t("homepage.obiettiviDecreto")}<Icon
                name="it it-external-link"
                variant="primary"
                size="sm"
                customClass="ms-1 mb-1"
              /></a
            >)
            {$t("homepage.obiettiviParagraph3")}
          </p>
        </div>

        <div class="col-lg-5 ps-0 pe-0 pt-lg-5 pb-lg-4">
          <KpiCard
            title={$t("homepage.obiettiviCardTitle", {
              anno: annoRiferimentoObi,
            })}
            kpi={nf(obiettiviAccessibilità)}
            linkText={$t("homepage.obiettiviPageLink")}
            href="obiettivi"
          />
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .bannerPageUpdated {
    background-color: #f2f7fc;
  }
  .background {
    background-color: #f2f7fc;
  }

  .a-button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 24px;
    gap: 8px;
    border: none;
    width: 210px;
    height: 52px;
    background: #0066cc;
    border-radius: 4px;
  }

  .a-button:hover,
  .errButton:hover {
    background: #004c99;
  }

  .a-button:active,
  .errButton:active {
    background: #003366;
  }

  .errButton {
    background: #0066cc;
    border-radius: 4px;
    padding: 12px 24px;
    text-align: center;
  }
</style>
