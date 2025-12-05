<script>
  import MainCard from "../../lib/components/dichiarazioni/MainCard.svelte";
  import HalfSitiApp from "../../lib/components/dichiarazioni/HalfSitiApp.svelte";
  import LineChart from "../../lib/components/dichiarazioni/LineChart.svelte";
  import Autovalutazioni from "../../lib/components/dichiarazioni/Autovalutazioni.svelte";
  import PieChart from "../../lib/components/dichiarazioni/PieChart.svelte";
  import { t } from "../../lib/utils/i18n";
</script>

<svelte:head>
  <title>{$t("dichiarazioni.pagename")}</title>
</svelte:head>

<section aria-label={$t("dichiarazioni.section")}>
  <div class="container">
    <MainCard />
  </div>

  <HalfSitiApp />

  <div
    class="d-flex flex-wrap container px-0 justify-content-between flex-wrap align-items-stretch"
  >
    <div class="col-12">
      <LineChart />
    </div>
  </div>

  <Autovalutazioni />

  <div class="container mb-5">
    <PieChart />
  </div>
</section>

<style>
  section {
    margin-top: 1.3em;
  }
</style>
