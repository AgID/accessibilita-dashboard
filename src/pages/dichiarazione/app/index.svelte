<script>
  import DichiarazioniAPPMainCard from "../../../lib/components/DichiarazioniAppMainCard.svelte";
  import DichiarazioniAPPLineChart from "../../../lib/components/DichiarazioniAppLineChart.svelte";
  import DichiarazioniConfrontoAppChart from "../../../lib/components/DichiarazioniAppConfrontoOSChart.svelte";
  import DichiarazioneAPPAutovalutazioni from "../../../lib/components/DichiarazioniAppAutovalutazioni.svelte";
  import DichiarazioneAppConformita from "../../../lib/components/DichiarazioniAppConfrontoConformita.svelte";
  import DichiarazioniAppTable from "../../../lib/components/DichiarazioniAppTable.svelte";

  import { t } from "../../../lib/utils/i18n";

</script>

<svelte:head>
  <title>{$t("dichiarazioni.APP-pagename")}</title>
</svelte:head>

<section aria-label={$t("dichiarazioni.APP-section")}>
  <div class="container">
    <DichiarazioniAPPMainCard />
  </div>
  <div
    class="d-flex flex-wrap container px-0 justify-content-between flex-wrap align-items-stretch"
  >
    <div class="col-12">
      <DichiarazioniAPPLineChart />
      <DichiarazioniConfrontoAppChart/>
    </div>
  </div>

  <DichiarazioneAPPAutovalutazioni />


  <div
    class="container"
    style="padding-left: 0 !important; padding-right: 0 !important;"
  >
 
   <DichiarazioneAppConformita/>
    <DichiarazioniAppTable />
  </div>


  <div
    class="container mb-5"
    style="padding-left: 0 !important; padding-right: 0 !important;"
  >

  </div>
</section>

<style lang="scss">
  section {
    margin-top: 1.3em;
  }
</style>
