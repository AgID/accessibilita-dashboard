<script>
  import DichiarazioniMainCard from "../../lib/components/DichiarazioniMainCard.svelte";
  import DichiarazioniHalfSitiApp from "../../lib/components/DichiarazioniHalfSitiApp.svelte";
  import DichiarazioniLineChart from "../../lib/components/DichiarazioniLineChart.svelte";
  import DichiarazioneAutovalutazioni from "../../lib/components/DichiarazioniAutovalutazioni.svelte";
  import DichiarazioniPieChart from "../../lib/components/DichiarazioniPieChart.svelte";
  import { t } from "../../lib/utils/i18n";
</script>

<svelte:head>
  <title>{$t("dichiarazioni.pagename")}</title>
</svelte:head>

<section aria-label={$t("dichiarazioni.section")}>
  <div class="container">
    <DichiarazioniMainCard />
  </div>

  <DichiarazioniHalfSitiApp/>

  <div
    class="d-flex flex-wrap container px-0 justify-content-between flex-wrap align-items-stretch"
  >
    <div class="col-12">
      <DichiarazioniLineChart />
    </div>
  </div>

  <DichiarazioneAutovalutazioni />

  <div
    class="container mb-5"
    style="padding-left: 0 !important; padding-right: 0 !important;"
  >
  <DichiarazioniPieChart/>
  </div>

</section>

<style lang="scss">
  section {
    margin-top: 1.3em;
  }
</style>
