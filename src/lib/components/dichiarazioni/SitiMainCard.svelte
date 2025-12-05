<script>
  import { onMount } from "svelte";
  import { nf, df, dp } from "../../utils";
  import Icon from "../Icon.svelte";
  import { t } from "../../utils/i18n";
  import Breadcrumb from "../Breadcrumb.svelte";
  import KpiThreeCard from "../KpiThreeCard.svelte";
  import BannerPageUpdated from "../BannerPageUpdated.svelte";

  let annoRiferimento = $state();
  let totale = $state();
  let numAttuali = $state();
  let enti = $state();
  let monitoraggioDateFormatted;

  onMount(async () => {
    const rs = await fetch("/data/dichiarazione_intestazione.json");
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

<Breadcrumb currentPage={$t("breadcrumb.dichiarazioniSiti")}></Breadcrumb>
<BannerPageUpdated pageId="dichiarazioni_siti" />
<div class="d-flex flex-wrap justify-content-between mt-3">
  <div class="col-12 col-lg-6 flex-wrap">
    <div class="d-flex">
      <div class="col-12 mb-4">
        <div class="d-inline-flex">
          <span aria-hidden="true">
            <img src="/images/responsive_layout.svg" alt="" class="" />
          </span>
          <h1 class="lead mx-3">{$t("dicMain.SITI-title")}</h1>
        </div>
      </div>
    </div>

    <div class="d-flex inline mb-1 pt-4"></div>
    <p>
      {$t("dicMain.SITI-description1")}
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
      {@html $t("dicMain.SITI-description2", { break: "<br/>" })}
    </p>
  </div>
  <div class="col-12 col-lg-6 col-xl-5 pb-3 mt-0">
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
