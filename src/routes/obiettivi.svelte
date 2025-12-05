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
    <ObiettiviLineChart />
    <ObiettiviIntervento />
    <ObiettiviTable />
  </div>
</section>

<style>
  section {
    margin-top: 1.3em;
  }
</style>
