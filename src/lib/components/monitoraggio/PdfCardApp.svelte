<script>
  import { onMount } from "svelte";
  import { nf, df, dp } from "../../utils";
  import Icon from "../Icon.svelte";
  import { t } from "../../utils/i18n";
  import KpiThreeCard from "../KpiThreeCard.svelte";

  let innerWidth = $state(0);
  let numPDF = $state();
  let numSiti = $state();
  let numPA = $state();
  let monitoraggioDateFormatted = $state();

  onMount(async () => {
    const rs = await fetch("/data/mona_siti_pdf_mon_intestazione.json");
    const data = await rs.json();

    numPDF = data.find((d) => d.indicatore == "num pdf esaminati").valore;
    numSiti = data.find(
      (d) => d.indicatore == "num siti con pdf valutati"
    ).valore;
    numPA = data.find(
      (d) => d.indicatore == "num enti con pdf valutati"
    ).valore;
    monitoraggioDateFormatted = data[0].anno_monitoraggio;
  });
</script>

<svelte:window bind:innerWidth />
<div class="d-flex flex-wrap mb-3">
  <div class="col-12 col-lg-6 col-xl-7 flex-wrap">
    <div class="mt-5 mb-4">
      <div class="d-inline-flex">
        <span aria-hidden="true"
          ><Icon
            variant={"primary"}
            name={"it it-chart-line"}
            size={"lg"}
          /></span
        >
        <h2 class="lead mx-3">{$t("moniPDFCard.title")}</h2>
      </div>
    </div>

    <h3 class="h3">
      {$t("moniPDFCard.subtitleAppr")}
    </h3>
    <p class="py-3 pe-xl-5 me-xl-5">
      {@html $t("moniPDFCard.descrAppr", { break: "<br/>" })}
    </p>
  </div>

  <div class="col-12 col-md-9 col-lg-6 col-xl-5">
    {#if numPDF && numSiti && numPA}
      <KpiThreeCard
        periodoMonitoraggio="{$t('layout.anno')}{monitoraggioDateFormatted}"
        firstImg="account_balance"
        firstLabel={$t("moniPDFCard.cardTitle3")}
        firstKpi={nf(numPA)}
        secondImg="globe"
        secondLabel={$t("moniPDFCard.cardTitle1")}
        secondKpi={nf(numSiti)}
        thirdImg="window-stack"
        thirdLabel={$t("moniPDFCard.cardTitle2")}
        thirdKpi={nf(numPDF)}
      ></KpiThreeCard>
    {/if}
  </div>
</div>
