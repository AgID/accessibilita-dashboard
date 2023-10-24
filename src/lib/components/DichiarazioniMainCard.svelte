<script>
  import { onMount } from "svelte";
  import { nf, df, dp } from "../utils";
  import Icon from "./Icon.svelte";
  import KpiCard from "./KpiCard.svelte";

  let numDichiarazioni;
  let year;
  let totale;

  let dataPagina;
  let dataPaginaFormatted;

  onMount(async () => {
    const rs = await fetch("/data/dichiarazione_intestazione.json");
    const data = await rs.json();
    numDichiarazioni = data.find(
      (d) => d.indicatore == "num_dichiarazioni_pub"
    ).valore;
    year = new Date().getFullYear();

    totale = data.find(
      (d) => d.indicatore == "num_dichiarazioni_pub_tot"
    ).valore;

    const rs2 = await fetch("/data/dichiarazione_data.json");
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
        ><Icon name="it it-files" variant="primary" size="lg" /></span
      >
      <h2 class="lead mx-3">Dichiarazioni di accessibilità</h2>
    </div>
    <p class="captionUpdateDarker mb-0">
      Ultimo aggiornamento dati: {dataPaginaFormatted}
    </p>
  </div>
  <div class="d-none d-xl-flex col-xl-6" />
</div>

<div class="d-flex flex-wrap justify-content-between mt-0">
  <div class="col-12 col-lg-6 flex-wrap">
    <h3 class="h3">
      Lo strumento attraverso il quale le PA rendono pubblico lo stato di
      accessibilità di ogni loro servizio.
    </h3>

    <div class="d-flex inline mb-1 pt-4" />
    <p>
      Dopo aver effettuato le verifiche di accessibilità dei siti web e delle
      applicazioni mobili, in conformità con la Direttiva UE 2016/2102, le PA
      possono compilare la dichiarazione di accessibilità.
      <br />
      Una volta compilata, la dichiarazione di accessibilità viene messa a disposizione
      di tutti grazie ad un link posto sul footer del sito web o nell’apposita sezione
      dello store relativamente alle app mobile.
      <br /><br />
      Le PA hanno l'obbligo di compilare o aggiornare la dichiarazione di accessibilità,
      per ogni loro servizio, entro il 23 settembre di ogni anno. Tutte le dichiarazioni
      di accessibilità pubblicate entro questa data hanno validità fino al 23 settembre
      dell'anno successivo.
    </p>
  </div>
  <div class="col-12 col-lg-6 ps-lg-4 ps-xl-5 pb-3 mt-0">
    <KpiCard
      title="Dichiarazioni di accessibilità pubblicate dal 2020"
      kpi={nf(totale)}
      caption=""
    />
    <KpiCard
      title="Dichiarazioni di accessibilità pubblicate nel 2022"
      kpi={nf(numDichiarazioni)}
      caption="Le dichiarazioni pubblicate entro il 23 settembre {year -
        1} sono valide fino al 23 settembre {year}"
    />
  </div>
</div>
