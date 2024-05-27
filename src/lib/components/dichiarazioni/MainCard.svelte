<script>
  import { onMount } from "svelte";
  import { nf, df, dp } from "../../utils";
  import Icon from "../Icon.svelte";
  import KpiCard from "../KpiCard.svelte";
  import { t } from "../../utils/i18n";

  let annoRiferimento;
  let totale;
  let numAttuali;
  let enti;

  let dataPagina;
  let dataPaginaFormatted;

  onMount(async () => {
    const rs = await fetch("/data/dichiarazione_tot_intestazione.json");
    const data = await rs.json();

    totale = data.find(
      (d) => d.indicatore == "num_dichiarazioni_pub_tot"
    ).valore;

    numAttuali = data.find(
      (d) => d.indicatore == "num_dichiarazioni_pub"
    ).valore;

    enti = data.find(
      (d) => d.indicatore == "num_enti_dichiarazioni_pub"
    ).valore;

    const rs2 = await fetch("/data/dichiarazione_data.json");
    const data2 = await rs2.json();
    dataPagina = data2.find(
      (d) => d.indicatore == "data_ultimo_aggiornamento_pagina"
    ).valore;
    dataPaginaFormatted = df(dp(dataPagina));

    const riferimento = await fetch("/data/dichiarazione_intestazione.json");
    const dataRiferimento = await riferimento.json();
    annoRiferimento = dataRiferimento[0].dat_ult_agg_dichiarazione.substr(0, 4);
  });
</script>

<div class="d-flex flex-wrap justify-content-between my-5">
  <div class="col-12 col-lg-6 flex-wrap">
    <div class="d-flex">
      <div class="col-12 mt-3 mb-4">
        <span aria-hidden="true">
          <Icon name="it it-files" variant="primary" size="lg" />
        </span>
        <h2 class="lead mt-3 ">{$t("dicMain.title")}</h2>
        <p class="captionUpdateDarker mb-0">
          {@html $t("dicMain.latestUpdate", {
            ultimoAggiornamento: dataPaginaFormatted,
          })}
        </p>
      </div>
    </div>

    <h3 class="h3">
      {$t("dicMain.subtitle")}
    </h3>

    <div class="d-flex inline mb-1 pt-4" />
    <p>
      {@html $t("dicMain.description", {
        doubleBreak: "<br/><br/>",
      })}
    </p>
  </div>
  <div class="col-12 col-lg-6 col-xl-5 pb-3 mt-3">
    <KpiCard
      cardWithIcon={true}
      title={$t("dicMain.cardOneTitle")}
      kpi={nf(totale)}
      iconName="it it-files"
      iconSize="lg"
    />
    <KpiCard
      cardWithIcon={true}
      title={$t("dicMain.cardTwoTitle", {
        anno: annoRiferimento,
      })}
      kpi={nf(numAttuali)}
      iconName="it it-calendar"
      iconSize="lg"
    />
    <KpiCard
      cardWithIcon={true}
      title={$t("dicMain.cardThreeTitle")}
      kpi={nf(enti)}
      iconName="it it-pa"
      iconSize="lg"
    />
  </div>
</div>