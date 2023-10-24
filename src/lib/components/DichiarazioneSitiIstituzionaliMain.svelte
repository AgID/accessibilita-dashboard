<script>
  import KpiCard from "./KpiCard.svelte";
  import { onMount } from "svelte";
  import { dp, df, nf } from "../utils";

  let numDichiarazioniIstituzionali;
  let date;
  let formattedDate;


  onMount(async () => {
    const rs = await fetch("/data/dichiarazione_istituzionali_intestazione.json");
    const data = await rs.json();
    numDichiarazioniIstituzionali = data.find(
      (d) => d.indicatore == "num_enti_con_dich_istituzionali_tutti_anni"
    ).valore;

    const rs2 = await fetch("/data/dichiarazione_istituzionali_data.json");
    const data2 = await rs2.json();
    date = data2.find(
      (d) => d.indicatore == "data_ultimo_aggiornamento_pagina"
    ).valore;
    formattedDate = df(dp(date))

  });

</script>

<div class="my-5">
  <p class="lead">Siti istituzionali</p>
  <div class="row py-3">
    <div class="col-12 col-lg-7">
      <p>
        I siti istituzionali sono portali web ufficiali censiti sul catalogo IPA
        creati e gestiti da organizzazioni governative e istituzioni pubbliche.
        Essi rappresentano l'ente o l'istituzione e forniscono informazioni,
        servizi e risorse pertinenti alle attività e alle responsabilità
        dell'organizzazione.
      </p>
      <p>
        I siti istituzionali sono progettati per essere una fonte autorevole di
        informazioni ufficiali, offrendo un canale di comunicazione diretto tra
        l'ente e il pubblico. Sono spesso utilizzati dalle amministrazioni
        pubbliche, ministeri, organizzazioni governative locali, regionali o
        nazionali, e altre istituzioni pubbliche.
      </p>
    </div>
    <div class="col-12 mx-lg-0 col-lg-5">
      <KpiCard
      title="Siti istituzionali che hanno pubblicato almeno una volta la dichiarazione dal 2020"
      kpi={nf(numDichiarazioniIstituzionali)}
      imgLink="images/bookmark-star.svg"
      caption="Ultimo aggiornamento: {formattedDate}"
    />
    </div>
  </div>
</div>