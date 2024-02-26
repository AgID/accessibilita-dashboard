<script>
  import KpiCard from "./KpiCard.svelte";
  import { onMount } from "svelte";
  import { dp, df, nf } from "../utils";
  import { t } from "../utils/i18n";

  let numDichiarazioniIstituzionali;
  let date;
  let formattedDate;

  onMount(async () => {
    const rs = await fetch(
      "/data/dichiarazione_istituzionali_intestazione.json"
    );
    const data = await rs.json();
    numDichiarazioniIstituzionali = data.find(
      (d) => d.indicatore == "num_enti_con_dich_istituzionali_tutti_anni"
    ).valore;

    const rs2 = await fetch("/data/dichiarazione_istituzionali_data.json");
    const data2 = await rs2.json();
    date = data2.find(
      (d) => d.indicatore == "data_ultimo_aggiornamento_pagina"
    ).valore;
    formattedDate = df(dp(date));
  });
</script>

<div class="mt-5">
  <p class="lead">{$t("dicIstMain.title")}</p>
  <div class="row pt-3">
    <div class="col-12 col-lg-7 pe-lg-5">
      <p>
        {@html $t("dicIstMain.description", { doubleBreak: "<br/><br/>" })}
      </p>
    </div>
    <div class="col-12 mx-lg-0 col-lg-5">
      <KpiCard
        title={$t("dicIstMain.cardOneTitle")}
        kpi={nf(numDichiarazioniIstituzionali)}
        imgLink="/images/bookmark-star.svg"
        caption={$t('dicIstMain.cardOneCaption')}{formattedDate}
      />
    </div>
  </div>
</div>
