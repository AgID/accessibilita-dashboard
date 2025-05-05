<script>
  import { onMount } from "svelte";
  import { nf, df, dp } from "../../utils";
  import Icon from "../Icon.svelte";
  import { t } from "../../utils/i18n";
  import Breadcrumb from "../Breadcrumb.svelte";
  import KpiThreeCard from "../KpiThreeCard.svelte";
  import BannerPageUpdated from "../BannerPageUpdated.svelte";

  let annoRiferimento;
  let totale;
  let numAttuali;
  let enti;
  let monitoraggioDateFormatted;

  onMount(async () => {
    const rs = await fetch("/data/dichiarazione_tot_intestazione.json");
    const data = await rs.json();

    annoRiferimento = data[0].anno_dichiarazione;

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

<Breadcrumb currentPage={$t("breadcrumb.dichiarazioni")}></Breadcrumb>
<BannerPageUpdated pageId="dichiarazioni_panoramica" />
<div class="d-flex flex-wrap justify-content-between mb-5">
  <div class="col-12 col-lg-6 flex-wrap">
    <div class="d-flex">
      <div class="col-12 mb-4">
        <div class="d-inline-flex">
          <span aria-hidden="true"
            ><Icon name="it it-files" variant="primary" size="lg" />
          </span>
          <h1 class="lead mx-3">{$t("dicMain.title")}</h1>
        </div>
      </div>
    </div>

    <h2 class="h3">
      {$t("dicMain.subtitle")}
    </h2>

    <div class="d-flex inline mb-1 pt-4" />
    <p>
      {$t("dicMain.description1")}
      <a
        href={$t("dicMain.direttivaLink")}
        title={$t("layout.externalLink")}
        target="_blank"
        rel="noreferrer"
        >{$t("dicMain.direttiva")}<Icon
          name="it it-external-link"
          variant="primary"
          size="sm"
          customClass="ms-1 mb-1"
        /></a
      >.
    </p>
    <p>
      {$t("dicMain.description2")}
      <a
        href="https://form.agid.gov.it/home"
        title={$t("layout.externalLink")}
        target="_blank"
        rel="noreferrer"
        >form.agid.it<Icon
          name="it it-external-link"
          variant="primary"
          size="sm"
          customClass="ms-1 mb-1"
        /></a
      >.
      {$t("dicMain.description3")}
    </p>
  </div>
  <div class="col-12 col-lg-6 col-xl-5 pb-3 mt-3">
    {#if totale && numAttuali && enti}
      <KpiThreeCard
        periodoMonitoraggio="{$t('layout.anno')}{annoRiferimento}"
        firstImg="files"
        firstLabel={$t("dicMain.cardOneTitle")}
        firstKpi={nf(totale)}
        secondImg="calendar"
        secondLabel={$t("dicMain.cardTwoTitle", {
          anno: annoRiferimento,
        })}
        secondKpi={nf(numAttuali)}
        thirdImg="account_balance"
        thirdLabel={$t("dicMain.cardThreeTitle", {
          anno: annoRiferimento,
        })}
        thirdKpi={nf(enti)}
      ></KpiThreeCard>
    {/if}
  </div>
</div>
