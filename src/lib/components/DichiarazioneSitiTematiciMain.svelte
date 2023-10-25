<script>
  import KpiCard from "./KpiCard.svelte";
  import { onMount } from "svelte";
  import { dp, df, nf } from "../utils";

  let numDichiarazioniTematici;
  let date;
  let formattedDate;
  let annoRiferimento

  onMount(async () => {
    const rs = await fetch("/data/dichiarazione_tematici_intestazione.json");
    const data = await rs.json();
    numDichiarazioniTematici = data.find(
      (d) => d.indicatore == "num_siti_tematici_con_dich_anno_corrente"
    ).valore;


    const rs2 = await fetch("/data/dichiarazione_tematici_data.json");
    const data2 = await rs2.json();
    date = data2.find(
      (d) => d.indicatore == "data_ultimo_aggiornamento_pagina"
    ).valore;
    formattedDate = df(dp(date))

    const riferimento = await fetch("/data/dichiarazione_intestazione.json");
    const dataRiferimento = await riferimento.json()
    annoRiferimento = dataRiferimento[0].dat_ult_agg_dichiarazione.substr(0, 4)

  });
</script>

<div class="my-5">
  <p class="lead pt-5">Siti tematici</p>
  <div class="row py-3">
    <div class="col-12 col-lg-7">
      <p class="pe-lg-4">
        Questi siti sono gestiti da enti pubblici o ministeri responsabili
        dell'area di competenza specifica ma non sono censiti all’interno del
        catalogo IPA. Essi forniscono una struttura organizzata e facilmente
        accessibile per gli utenti che desiderano informazioni, servizi e
        risorse specifiche in diversi ambiti amministrativi. In questo modo, i
        cittadini, le imprese e altre parti interessate possono trovare le
        risorse e le informazioni necessarie in modo rapido ed efficiente.
      </p>
    </div>
    <div class="col-12 mx-lg-0 col-lg-5">
      <KpiCard
      title="Dichiarazioni pubblicate per i siti tematici nel {annoRiferimento}"
      kpi={nf(numDichiarazioniTematici)}
      imgLink="images/bookmark-star.svg"
      caption="Ultimo aggiornamento: {formattedDate}"
    />
    </div>
  </div>
</div>
