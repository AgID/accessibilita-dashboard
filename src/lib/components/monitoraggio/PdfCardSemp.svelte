<script>
  import { onMount } from "svelte";
  import { nf, df, dp, pm } from "../../utils";
  import Icon from "../Icon.svelte";
  import { t } from "../../utils/i18n";
  import KpiThreeCard from "../KpiThreeCard.svelte";

  let innerWidth = $state(0);
  let numPDF = $state();
  let numSiti = $state();
  let numPA = $state();
  let monitoraggioDateFormatted = $state();
  let criteriTotali = $state();
  let responseJson;

  onMount(async () => {
    const rs = await fetch("/data/monitoraggio_pdf_intestazione.json");
    const data = await rs.json();
    numPDF = data[0].num_pdf_valutati;
    numSiti = data[0].num_siti_monitorati;
    numPA = data[0].num_enti_siti_monitorati;
    monitoraggioDateFormatted = pm(data[0].periodo_monitoraggio);

    const response = await fetch("/data/errori_pdf_riscontrati.json");
    responseJson = await response.json();
    criteriTotali = responseJson.data.length;
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
      {$t("moniPDFCard.subtitleSemp")}
    </h3>
    <p class="py-3 pe-xl-5 me-xl-5">
      {@html $t("moniPDFCard.descrSemp", { numero: criteriTotali })}
    </p>
  </div>

  <div class="col-12 col-md-9 col-lg-6 col-xl-5">
    {#if numPDF && numSiti && numPA}
      <KpiThreeCard
        periodoMonitoraggio={monitoraggioDateFormatted}
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
