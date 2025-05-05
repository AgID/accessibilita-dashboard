<script>
  import { onMount } from "svelte";
  import { nf, df, dp } from "../../utils";
  import Icon from "../Icon.svelte";
  import { t } from "../../utils/i18n";
  import KpiCard from "../KpiCard.svelte";

  let innerWidth;
  let numApp;
  let annoRiferimento;
  onMount(async () => {
    const rs = await fetch("/data/mona_app_mon_intestazione.json");
    const data = await rs.json();
    numApp = data.find((d) => d.indicatore == "num app valutate").valore;
    annoRiferimento = data[0].dat_ultimo_monitoraggio.slice(0, 4);
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
        <h2 class="lead mx-3">{$t("moniAPPCard.title")}</h2>
      </div>
    </div>

    <h3 class="h3">
      {$t("moniAPPCard.subtitle")}
    </h3>
    <p class="py-3 pe-xl-5 me-xl-5">
      {@html $t("moniAPPCard.description", { break: "<br/>" })}
    </p>
  </div>
  <div class="col-12 col-md-9 col-lg-6 col-xl-5 mt-5">
    <div class="mt-1">
      <KpiCard
        imgLink="/images/mobile_friendly.svg"
        title={$t("moniAPPCard.cardTitle1", { anno: annoRiferimento })}
        kpi={nf(numApp)}
      ></KpiCard>
    </div>
  </div>
</div>
