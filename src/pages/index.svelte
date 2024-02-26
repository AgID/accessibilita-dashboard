<script>
  import { onMount } from "svelte";
  import ErrCard from "../lib/components/ErrCard.svelte";
  import HomeMainCard from "../lib/components/HomeMainCard.svelte";
  import Icon from "../lib/components/Icon.svelte";
  import KpiCard from "../lib/components/KpiCard.svelte";
  import { df, dp, nf } from "../lib/utils";
  import { t } from "../lib/utils/i18n";

  let innerWidth;

  let pagineValutate;
  let pdfValutati;
  let dichiarazioniAccessibilita;
  let obiettiviAccessibilità;

  let erroriConformita;
  let totalerroriConformita;

  let monitoraggioDate;
  let dichiarazioniDate;
  let obiettiviDate;
  let monitoraggioDateFormatted;
  let dichiarazioniDateFormatted;
  let obiettiviDateFormatted;

  let annoRiferimento;

  onMount(async () => {
    const rs = await fetch("/data/home_page.json");
    const data = await rs.json();
    obiettiviAccessibilità = data.find(
      (d) => d.indicatore == "num_enti_obiettivi"
    );
    pagineValutate = data.find((d) => d.indicatore == "num_pagine_valutate");
    dichiarazioniAccessibilita = data.find(
      (d) => d.indicatore == "num_dichiarazioni"
    );

    const rsPDF = await fetch("/data/monitoraggio_pdf_intestazione.json");
    const dataPDF = await rsPDF.json();
    pdfValutati = dataPDF[0].num_pdf_valutati;

    const riferimento = await fetch("/data/obiettivi_intestazione.json");
    const dataRiferimento = await riferimento.json();
    annoRiferimento = dataRiferimento[0].dat_ult_agg_obiettivi;

    const rsDistribuzioneConformita = await fetch(
      "/data/errori_distribuzione_livello_conformita.json"
    );
    const dataDistribuzioneConformita = await rsDistribuzioneConformita.json();
    erroriConformita = dataDistribuzioneConformita;
    totalerroriConformita = nf(
      erroriConformita[0].num_sc_non_soddisfatti +
        erroriConformita[1].num_sc_non_soddisfatti
    );

    const rsMonitoraggio = await fetch("/data/monitoraggio_data.json");
    const dataMonitoraggio = await rsMonitoraggio.json();
    monitoraggioDate = dataMonitoraggio.find(
      (d) => d.indicatore == "data_ultimo_aggiornamento_pagina"
    ).valore;
    monitoraggioDateFormatted = df(dp(monitoraggioDate));

    const rsDichiarazioni = await fetch("/data/dichiarazione_data.json");
    const dataDichiarazioni = await rsDichiarazioni.json();
    dichiarazioniDate = dataDichiarazioni.find(
      (d) => d.indicatore == "data_ultimo_aggiornamento_pagina"
    ).valore;
    dichiarazioniDateFormatted = df(dp(dichiarazioniDate));

    const rsObiettivi = await fetch("/data/obiettivi_data.json");
    const dataObiettivi = await rsObiettivi.json();
    obiettiviDate = dataObiettivi.find(
      (d) => d.indicatore == "data_ultimo_aggiornamento_pagina"
    ).valore;
    obiettiviDateFormatted = df(dp(obiettiviDate));
  });
</script>

<svelte:window bind:innerWidth />

<svelte:head>
  <title>{$t("homepage.pagename")}</title>
</svelte:head>

<HomeMainCard />
<div class="background p-3 d-flex justify-content-center">
  <p class="m-0">{$t("homepage.alert")}
    <a
    href="http://monitoraggio.accessibilita.agid.gov.it"
    title={$t("layout.externalLink")}
    target="_blank"
    rel="noreferrer"
    >monitoraggio.accessibilita.agid.gov.it<Icon
      name="it it-external-link"
      variant="primary"
      size="xs"
      customClass="mb-1"
    /></a
  ></p>
</div>

<div class="container my-4 pb-3">
  {#if pagineValutate && pdfValutati}
    <div class="row mt-5">
      {#if innerWidth >= 992}
        <div class="col-lg-5">
          <div class="card-box mt-0">
            <div class="py-4 px-3 ms-xl-3">
              <div class="row mb-2">
                <div class="col-3 customMonBox my-auto">
                  <img
                    src="/images/window-stack.svg"
                    alt=""
                    class="ps-2"
                    aria-hidden="true"
                  />
                </div>
                <div class="col-9 ps-3">
                  <p class="cardTitle greyText">
                    {$t("homepage.monitoraggioCardTitle")}
                  </p>
                  <p class="cardMainData mt-2 mb-0" style="color: #0066cc">
                    {nf(pagineValutate.valore)}
                  </p>
                </div>
              </div>
              <hr class="w-75 my-4 mx-auto text-muted" />
              <div class="row">
                <div class="col-3 customMonBox my-auto">
                  <img
                    src="/images/PDF.svg"
                    alt=""
                    class="ps-2"
                    aria-hidden="true"
                  />
                </div>
                <div class="col-9 ps-3">
                  <p class="cardTitle greyText">
                    {$t("homepage.monitoraggioCard2Title")}
                  </p>
                  <p class="cardMainData mt-2 mb-0" style="color: #0066cc">
                    {nf(pdfValutati)}
                  </p>
                </div>
              </div>
              <hr class="w-75 my-4 mx-auto text-muted" />
              <div class="captionUpdateDarker text-center">
                {$t("homepage.latestUpdate")}{monitoraggioDateFormatted}
              </div>
            </div>
            <div class="kpi-footer cursor w-100">
              <a href="/monitoraggio">
                <span class="text"
                  >{$t("homepage.monitoraggioPageLink")}
                  <Icon name="it it-arrow-right" variant="white" size="sm" />
                </span>
              </a>
            </div>
          </div>
        </div>
      {/if}

      <div class="col-12 col-lg-7 pe-xl-5">
        <div class="d-inline-flex my-4">
          <span aria-hidden="true">
            <Icon name="it it-chart-line" variant="primary" size="lg" />
          </span>
          <h2 class="lead mx-3">{$t("homepage.monitoraggioTitle")}</h2>
        </div>
        <h3 class="h3 pb-lg-4 mb-0">{$t("homepage.monitoraggioSubtitle")}</h3>
        <p class="pe-lg-5">{$t("homepage.monitoraggioParagraph")}</p>
      </div>

      {#if innerWidth < 992}
        <div class="col-12 pt-5">
          <div class="card-box">
            <div class="py-4 px-3 ms-xl-3">
              <div class="row mb-2 text-center">
                <div class="col-12">
                  <p class="cardTitle greyText">
                    {$t("homepage.monitoraggioCardTitle")}
                  </p>
                  <p class="cardMainData mt-2 mb-0" style="color: #0066cc">
                    {nf(pagineValutate.valore)}
                  </p>
              <hr class="w-75 my-4 mx-auto text-muted" />
                  <p class="cardTitle greyText my-4">
                    {$t("homepage.monitoraggioCard2Title")}
                  </p>
                  <p class="cardMainData mt-2 mb-0" style="color: #0066cc">
                    {nf(pdfValutati)}
                  </p>
                </div>
              </div>
              <hr class="w-75 my-4 mx-auto text-muted" />

              <div class="captionUpdateDarker text-center">
                {$t("homepage.latestUpdate")}{monitoraggioDateFormatted}
              </div>
            </div>
            <div class="kpi-footer cursor w-100">
              <a href="/monitoraggio">
                <span class="text"
                  >{$t("homepage.monitoraggioPageLink")}
                  <Icon name="it it-arrow-right" variant="white" size="sm" />
                </span>
              </a>
            </div>
          </div>
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

      <div class="col-lg-7 pe-xl-5">
        <h3 class="h3 pe-lg-3 pb-lg-4">
          {$t("homepage.erroriSubtitle")}
        </h3>
        <p>
          {$t("homepage.erroriParagraphA")}
          <a
            href={$t("homepage.erroriWCAGLink")}
            title={$t("layout.externalLink")}
            target="_blank"
            rel="noreferrer"
            >WCAG 2.1 (Web Content Accessibility Guidelines 2.1)<Icon
              name="it it-external-link"
              variant="primary"
              size="xs"
              customClass="mb-1"
            /></a
          >
          {@html $t("homepage.erroriParagraphB", {
            doubleBreak: "<br/><br/>",
          })}
          <a
            title={$t("layout.externalLink")}
            target="_blank"
            rel="noreferrer"
            href={$t("homepage.erroriMAUVElink")}
            >MAUVE++<Icon
              name="it it-external-link"
              variant="primary"
              size="xs"
              customClass="mb-1"
            />
          </a>
          {@html $t("homepage.erroriParagraphC", {
            totErrori: totalerroriConformita,
          })}
        </p>
        <a
          href="/errori"
          class="button-text a-button d-none d-lg-flex"
          style="text-decoration: none;"
        >
          {$t("homepage.erroriPageLink")}
        </a>
      </div>

      <div class="col-lg-5 px-0">
        <ErrCard />
      </div>
    </div>
    <div class="row mx-auto mt-2 mb-5 mb-lg-0">
      <div class="col-12 d-lg-none errButton">
        <a href="/errori" class="button-text" style="text-decoration: none;">
          {$t("homepage.erroriPageLink")}</a
        >
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
            {@html $t("homepage.dichiarazioniParagraph", {
              doubleBreak: "<br/><br/>",
              break: "<br/>",
            })}
            <a
              href={$t("homepage.dichiarazioniAGIDlink")}
              title={$t("layout.externalLink")}
              target="_blank"
              rel="noreferrer"
              >{$t("homepage.dichiarazioniLink")}<Icon
                name="it it-external-link"
                variant="primary"
                size="xs"
                customClass="mb-1"
              />
            </a>
          </p>
        </div>

        <div class="col-lg-5 ps-0 pe-0 pt-lg-5 pb-lg-4">
          <KpiCard
            title={$t("homepage.dichiarazioniCardTitle")}
            kpi={nf(dichiarazioniAccessibilita.valore)}
            caption="{$t('homepage.latestUpdate')}{dichiarazioniDateFormatted}"
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
            {@html $t("homepage.obiettiviParagraph", {
              doubleBreak: "<br/><br/>",
              break: "<br/>",
            })}
            <a
              href={$t("homepage.obiettiviAGIDlink")}
              title={$t("layout.externalLink")}
              target="_blank"
              rel="noreferrer"
              >{$t("homepage.obiettiviLink")}<Icon
                name="it it-external-link"
                variant="primary"
                size="xs"
                customClass="mb-1"
              /></a
            >
          </p>
        </div>

        <div class="col-lg-5 ps-0 pe-0 pt-lg-5 pb-lg-4">
          <KpiCard
            title={$t("homepage.obiettiviCardTitle", { anno: annoRiferimento })}
            kpi={nf(obiettiviAccessibilità.valore)}
            caption="{$t('homepage.latestUpdate')}{obiettiviDateFormatted}"
            linkText={$t("homepage.obiettiviPageLink")}
            href="obiettivi"
          />
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
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
