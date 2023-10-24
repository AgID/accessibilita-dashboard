<script>
  import { onMount } from "svelte";
  import { nf, df, dp } from "../utils";
  import KpiCard from "./KpiCard.svelte";
  import Icon from "./Icon.svelte";

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
    anno = data.find(
      (d) => d.indicatore == "num_enti_obiettivi"
    ).dat_ult_agg_obiettivi;

    const rs2 = await fetch("/data/obiettivi_data.json");
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
      <span aria-hidden="true"><img src="/icons/bullseye.svg" alt="" /></span>
      <h2 class="lead mx-3">Obiettivi di accessibilità</h2>
    </div>
    <p class="captionUpdateDarker mb-0">
      Ultimo aggiornamento dati: {dataPaginaFormatted}
    </p>
  </div>
  <div class="d-none d-xl-flex col-xl-6" />
</div>

<div class="d-flex flex-wrap justify-content-between mt-0 pb-4">
  <div class="col-12 col-lg-7 flex-wrap">
    <h3 class="h3">
      Lo strumento con il quale le PA pianificano gli interventi per migliorare
      l’accessibilità dei servizi web e delle applicazioni mobile.
    </h3>

    <div class="d-flex inline mb-1 pt-4" />
    <p>
      Le pubbliche amministrazioni hanno l'obbligo di pubblicare, entro il 31
      marzo di ogni anno, gli obiettivi di accessibilità relativi all'anno
      corrente, come ribadito anche nelle Linee Guida sull’accessibilità degli
      strumenti informatici (capitolo 4 paragrafo 2), e lo stato di attuazione
      del piano per l'utilizzo del telelavoro, come stabilito dal Decreto legge
      n. 179/2012, articolo 9, comma 7.
    </p>
    <p>
      Ogni PA compila gli obiettivi elencati e gli interventi ad essi
      associabili in sei linee di intervento: postazioni di lavoro, siti
      tematici, sito istituzionale, intranet, formazione e organizzazione del
      lavoro.
      <br />
      Scopri di più sugli
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
  <div class="col-12 col-lg-5 ps-lg-4 ps-xl-5 pb-3 mt-0">
    <KpiCard
      title="Enti che hanno pubblicato un obiettivo"
      kpi={nf(numObiettivi)}
      caption="Il numero degli enti che hanno pubblicato un obiettivo di accessibilità nel {anno}"
    />
  </div>
</div>
