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
  let dataPaginaFormatted;

  onMount(async () => {
    const rs = await fetch("/data/dichiarazione_intestazione.json");
    const data = await rs.json();
    
    annoRiferimento = data[0].dat_ult_agg_dichiarazione.substr(0, 4);
    dataPaginaFormatted = df(dp(data[0].dat_ult_agg_dichiarazione))

    totale = data.find(
      (d) => d.indicatore == "num_dichiarazioni_pub_tot"
    ).valore;

    numAttuali = data.find(
      (d) => d.indicatore == "num_dichiarazioni_pub"
    ).valore;

    enti = data.find(
      (d) => d.indicatore == "num_enti_dichiarazioni_pub"
    ).valore;
  });
</script>

<div class="breadcrumb mt-5">
  <p><a href="/dichiarazione" title={$t("dicMain.prevCrumb")} class="fw-bold text-decoration-underline" >{$t("dicMain.prevCrumb")}</a> / {$t("dicMain.SITI-currentCrumb")}</p>
</div>

<div class="d-flex flex-wrap justify-content-between mt-3 mb-5">
  <div class="col-12 col-lg-6 flex-wrap">
    <div class="d-flex">
      <div class="col-12 mt-3 mb-4">
        <span aria-hidden="true">
          <img
          src="/images/responsive_layout.svg"
          alt=""
          class=""
        />
        </span>
        <h1 class="lead mt-3 ">{$t("dicMain.SITI-title")}</h1>
        <p class="captionUpdateDarker mb-0">
          {@html $t("dicMain.latestUpdate", {
            ultimoAggiornamento: dataPaginaFormatted,
          })}
        </p>
      </div>
    </div>

    <div class="d-flex inline mb-1 pt-4" />
    <p>
      {@html $t("dicMain.SITI-description", {
        break: "<br/>",
        doubleBreak: "<br/><br/>",
      })}
    </p>
  </div>
  <div class="col-12 col-lg-6 col-xl-5 pb-3 mt-0">
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

<style>
  .breadcrumb, .breadcrumb a{
    color: #2F475E !important;
  }
</style>