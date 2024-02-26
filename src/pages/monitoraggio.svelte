<script>
  import MonitoraggioMainCard from "../lib/components/MonitoraggioMainCard.svelte";
  import MonitoraggioSitiPerRegioneTable from "../lib/components/MonitoraggioSitiPerRegioneTable.svelte";
  import MonitoraggioSitiPerCategoriaChart from "../lib/components/MonitoraggioSitiPerCategoriaChart.svelte";
  import MonitoraggioSitiAreaGeo from "../lib/components/MonitoraggioSitiAreaGeo.svelte";
  import { t } from "../lib/utils/i18n";
  import MonitoraggioPdfCard from "../lib/components/MonitoraggioPdfCard.svelte";
  import MonitoraggioPdfChart from "../lib/components/MonitoraggioPdfChart.svelte";
</script>

<svelte:head>
  <title>{$t("monitoraggio.pagename")}</title>
</svelte:head>

<section aria-label={$t("monitoraggio.section")}>
  <div class="container">
    <MonitoraggioMainCard />
    <MonitoraggioSitiAreaGeo />
  </div>

  <MonitoraggioSitiPerCategoriaChart />
  <div
    class="container"
    style="padding-left: 0 !important; padding-right: 0 !important;"
  >
    <MonitoraggioSitiPerRegioneTable />
  </div>
  <div class="container">
    <MonitoraggioPdfCard />
    <div class=" mt-0 mb-5">
      <MonitoraggioPdfChart />
    </div>
  </div>
</section>

<style lang="scss">
  section {
    margin-top: 1.3em;
  }
</style>
