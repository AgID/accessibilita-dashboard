<script>
  import { onMount } from "svelte";
  import ErrCard from "../lib/components/ErrCard.svelte";
  import HomeMainCard from "../lib/components/HomeMainCard.svelte";
  import Icon from "../lib/components/Icon.svelte";
  import KpiCard from "../lib/components/KpiCard.svelte";
  import { df, dp, nf } from "../lib/utils";

  let innerWidth;

  let pagineValutate;
  let incidenzaErrori;
  let dichiarazioniAccessibilita;
  let obiettiviAccessibilità

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
    obiettiviAccessibilità = data.find((d) => d.indicatore == "num_enti_obiettivi");
    pagineValutate = data.find((d) => d.indicatore == "num_pagine_valutate");
    incidenzaErrori = data.find((d) => d.indicatore == "incidenza_errori");
    dichiarazioniAccessibilita = data.find(
      (d) => d.indicatore == "num_dichiarazioni"
    );

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
    monitoraggioDateFormatted = df(dp(monitoraggioDate))

    const rsDichiarazioni = await fetch("/data/dichiarazione_data.json");
    const dataDichiarazioni = await rsDichiarazioni.json();
    dichiarazioniDate = dataDichiarazioni.find(
      (d) => d.indicatore == "data_ultimo_aggiornamento_pagina"
    ).valore;
    dichiarazioniDateFormatted = df(dp(dichiarazioniDate))

    const rsObiettivi = await fetch("/data/obiettivi_data.json");
    const dataObiettivi = await rsObiettivi.json();
    obiettiviDate = dataObiettivi.find(
      (d) => d.indicatore == "data_ultimo_aggiornamento_pagina"
    ).valore;
    obiettiviDateFormatted = df(dp(obiettiviDate))

    const riferimento = await fetch("/data/obiettivi_intestazione.json");
    const dataRiferimento = await riferimento.json()
    annoRiferimento = dataRiferimento[0].dat_ult_agg_obiettivi

  });
</script>

<svelte:window bind:innerWidth />

<svelte:head>
  <title>Monitoraggio Accessibilità</title>
</svelte:head>

<HomeMainCard />

<div class="container my-4 pb-5">
  {#if pagineValutate}
    <div class="row pt-5">
      <div class="d-none d-lg-flex col-lg-5" />
      <div class="col-12 col-lg-7 pe-xl-5">
        <div class="d-inline-flex">
          <span aria-hidden="true"
            ><Icon name="it it-chart-line" variant="primary" size="lg" /></span
          >
          <h2 class="lead mx-3">Monitoraggio accessibilità</h2>
        </div>
      </div>

      {#if innerWidth > 991}
        <div class="col-12 col-lg-5">
          <KpiCard
            title="Pagine web valutate"
            kpi={nf(pagineValutate.valore)}
            linkText="Scopri il monitoraggio"
            href="/monitoraggio"
            imgLink="images/globe.svg"
            caption="Ultimo aggiornamento {monitoraggioDateFormatted}"
          />
        </div>
      {/if}

      <div class="col-12 col-lg-7 mt-4 pe-xl-5">
        <h3 class="h3 pb-lg-4 mb-0">
          Monitorare l’accessibilità permette di intervenire per rendere le
          informazioni fruibili a tutti, senza discriminazioni.
        </h3>
        <p>
          Tramite un progetto condiviso tra AgID e il CNR è stato implementato
          un sistema automatizzato che supporta la valutazione di accessibilità
          dei siti delle PA. Le informazioni prodotte dal monitoraggio
          automatizzato vengono arricchite con ulteriori dettagli acquisiti dal
          sito Indice PA e ISTAT.
        </p>
      </div>
      {#if innerWidth <= 991}
        <div class="col-12 col-lg-4 pt-5">
          <KpiCard
            title="Pagine web valutate"
            kpi={nf(pagineValutate.valore)}
            linkText="Scopri il monitoraggio"
            href="/monitoraggio"
            caption="Ultimo aggiornamento: {df(dp(pagineValutate.dat_ultimo_monitoraggio))}"
          />
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
        <h2 class="lead mx-3">Errori di accessibilità</h2>
      </div>

      <div class="col-lg-7 pe-xl-5">
        <h3 class="h3 pe-lg-3 pb-lg-4">
          Gli errori di accessibilità identificabili automaticamente
        </h3>
        <p>
          Le <a
            href="https://www.w3.org/Translations/WCAG21-it/"
            title="Il link si apre in una nuova finestra"
            target="_blank"
            rel="noreferrer"
            >WCAG 2.1 (Web Content Accessibility Guidelines 2.1)<Icon
              name="it it-external-link"
              variant="primary"
              size="xs"
              customClass="mb-1"
            /></a
          >
           sono le linee guida pubblicate
          dal W3C (World Wide Web Consortium) e definiscono i principi per la creazione
          di siti web accessibili a tutti, comprese le persone con disabilità. Il
          sistema di valutazione dell'accessibilità dei siti web si basa sulla verifica
          (sia manuale che automatica) di un insieme di criteri di successo distinti
          per tre livelli di conformità: A, AA e AAA. A livello normativo il soddisfacimento
          dei livelli A e AA è obbligatorio. <br /><br /> Il sistema automatico
          <a
            title="Il link si apre in una nuova finestra"
            target="_blank"
            rel="noreferrer"
            href="https://mauve.isti.cnr.it/"
            >MAUVE++<Icon
              name="it it-external-link"
              variant="primary"
              size="xs"
              customClass="mb-1"
            /></a
          >
          è in grado di analizzare autonomamente {totalerroriConformita}
          dei 50 criteri di successo per la valutazione dell'accessibilità dei siti
          delle PA, appartenenti ai livelli A e AA.
        </p>
        <a
          href="/errori"
          class="button-text a-button d-none d-lg-flex"
          style="text-decoration: none;"
        >
          Scopri tutti gli errori</a
        >
      </div>

      <div class="col-lg-5 px-0">
        <ErrCard />
      </div>
    </div>
    <div class="row mx-auto mt-2 mb-5 mb-lg-0">
      <div class="col-12 d-lg-none errButton">
        <a href="errori" class="button-text" style="text-decoration: none;">
          Scopri tutti gli errori</a
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
            <h2 class="lead mx-3">Dichiarazione di accessibilità</h2>
          </div>
          <h3 class="h3 pb-lg-4">Cos'è la dichiarazione di accessibilità?</h3>
          <p class="me-lg-3">
            La dichiarazione di accessibilità è lo strumento attraverso il quale
            le Amministrazioni effettuano una autovalutazione dello stato di
            accessibilità di ogni sito web e applicazione mobile di cui sono
            titolari.<br />
            <br />
            Le dichiarazioni non sono oggetto del processo di monitoraggio ma devono
            essere compilate e pubblicate per adempimento normativo (9 della Legge
            n. 4/2004) da ogni singola PA. <br /> Per ulteriori informazioni:
            <a
              href="https://www.agid.gov.it/it/design-servizi/accessibilita/dichiarazione-accessibilita"
              title="Il link si apre in una nuova finestra"
              target="_blank"
              rel="noreferrer"
              >Dichiarazione di accessibilità<Icon
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
            title="Totale delle dichiarazioni di accessibilità compilate"
            kpi={nf(dichiarazioniAccessibilita.valore)}
            caption="Ultimo aggiornamento: {dichiarazioniDateFormatted}"
            linkText="Scopri le dichiarazioni"
            href="/dichiarazione"
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
            <h2 class="lead mx-3">Obiettivi di accessibilità</h2>
          </div>
          <h3 class="h3 pb-lg-4">Cosa sono gli obiettivi di accessibilità?</h3>
          <p class="me-lg-3">
            Gli obiettivi di accessibilità delle pubbliche amministrazioni
            mirano a migliorare l’accessibilità dei servizi web e delle
            applicazioni mobile di cui sono titolari a tutti i cittadini,
            indipendentemente dalle loro abilità, affinché possano accedere e
            fruire dei servizi pubblici in modo equo, efficace e senza
            discriminazioni.
          </p>
          <p>
            Gli obiettivi di accessibilità vengono pubblicati dalle Pubbliche
            Amministrazione obbligatoriamente entro il 31 Marzo di ogni anno.
            <br /> 
            Per ulteriori informazioni:
            <a
              href="https://www.agid.gov.it/it/design-servizi/accessibilita/obiettivi-accessibilita"
              title="Il link si apre in una nuova finestra"
              target="_blank"
              rel="noreferrer"
              >Obiettivi di accessibilità<Icon
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
            title="Totale degli obiettivi di accessibilità dichiarati nel {annoRiferimento}"
            kpi={nf(obiettiviAccessibilità.valore)}
            caption="Ultimo aggiornamento: {obiettiviDateFormatted}"
            linkText="Scopri gli obiettivi"
            href="/obiettivi"
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

  .button-text {
    font-family: "Titillium Web";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;
    text-align: center;
    color: #ffffff;
  }

</style>
