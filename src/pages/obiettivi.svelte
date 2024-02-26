<script>
  import ObiettiviMainCard from "../lib/components/ObiettiviMainCard.svelte";
  import ObiettiviLineChart from "../lib/components/ObiettiviLineChart.svelte";
  import ObiettiviIntervento from "../lib/components/ObiettiviIntervento.svelte";
  import ObiettiviTable from "../lib/components/ObiettiviTable.svelte";
  import { t } from "../lib/utils/i18n";

</script>

<svelte:head>
  <title>{$t("obiettivi.pagename")}</title>
</svelte:head>

<section aria-label={$t("obiettivi.pagename")}>
  <div class="container">
    <ObiettiviMainCard />
  </div>
  <div
    class="d-flex flex-wrap container px-0 justify-content-between flex-wrap align-items-stretch"
  >
    <div class="col-12">
      <ObiettiviLineChart />
    </div>
  </div>

  <div
    class="container pb-3"
    style="padding-left: 0 !important; padding-right: 0 !important;"
  >
    <ObiettiviIntervento />
    <ObiettiviTable />
  </div>
</section>

<style lang="scss">
  section {
    margin-top: 1.3em;
  }
</style>
