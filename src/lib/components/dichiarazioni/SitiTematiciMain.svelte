<script>
  import KpiCard from "../KpiCard.svelte";
  import { onMount } from "svelte";
  import { dp, df, nf } from "../../utils";
  import { t } from "../../utils/i18n";

  let numDichiarazioniTematici;
  let date;
  let formattedDate;
  let annoRiferimento;


  onMount(async () => {
    const rs = await fetch("/data/dichiarazione_tematici_intestazione.json");
    const data = await rs.json();
    numDichiarazioniTematici = data.find(
      (d) => d.indicatore == "num_siti_tematici_con_dich_anno_corrente"
    ).valore;

    const riferimento = await fetch("/data/dichiarazione_intestazione.json");
    const dataRiferimento = await riferimento.json()
    annoRiferimento = dataRiferimento[0].dat_ult_agg_dichiarazione.substr(0, 4)

    const rs2 = await fetch("/data/dichiarazione_tematici_data.json");
    const data2 = await rs2.json();
    date = data2.find(
      (d) => d.indicatore == "data_ultimo_aggiornamento_pagina"
    ).valore;
    formattedDate = df(dp(date))

  });
</script>

<div class="my-5">
  <p class="lead pt-5">{$t("dicTemaMain.title")}</p>
  <div class="row py-3">
    <div class="col-12 col-lg-7">
      <p class="pe-lg-4">
        {$t("dicTemaMain.description")}
      </p>
    </div>
    <div class="col-12 mx-lg-0 col-lg-5">
      <KpiCard
      title={$t("dicTemaMain.cardOneTitle", { anno: annoRiferimento })}
      kpi={nf(numDichiarazioniTematici)}
      imgLink="/images/bookmark-star.svg"
      caption={$t("dicTemaMain.cardOneCaption")}{formattedDate}
    />
    </div>
  </div>
</div>
