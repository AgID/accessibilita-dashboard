<script>
  import DichiarazioniSITIMainCard from "../../../lib/components/DichiarazioniSitiMainCard.svelte";
  import DichiarazioniSITILineChart from "../../../lib/components/DichiarazioniSitiLineChart.svelte";
  import DichiarazioneSITIAutovalutazioni from "../../../lib/components/DichiarazioniSitiAutovalutazioni.svelte";

  import DichiarazioneSitiIstituzionaliMain from "../../../lib/components/DichiarazioniSitiIstituzionaliMain.svelte";
  import DichiarazioneSitiIstituzionaliHalf from "../../../lib/components/DichiarazioniSitiIstituzionaliHalf.svelte";
  import DichiarazioniAutovalutazioneIstituzionali from "../../../lib/components/DichiarazioniAutovalutazioneIstituzionali.svelte";
  import DichiarazioniSitiIstituzionaliTable from "../../../lib/components/DichiarazioniSitiIstituzionaliTable.svelte";

  import DichiarazioneSitiTematiciMain from "../../../lib/components/DichiarazioniSitiTematiciMain.svelte";
  import DichiarazioniAutovalutazioneTematici from "../../../lib/components/DichiarazioniAutovalutazioneTematici.svelte";
  import DichiarazioniSitiTematiciTable from "../../../lib/components/DichiarazioniSitiTematiciTable.svelte";
  import DichiarazioneAutovalutazioniConfronto from "../../../lib/components/DichiarazioniAutovalutazioniConfronto.svelte";
  import { t } from "../../../lib/utils/i18n";

</script>

<svelte:head>
  <title>{$t("dichiarazioni.SITI-pagename")}</title>
</svelte:head>

<section aria-label={$t("dichiarazioni.SITI-section")}>
  <div class="container">
    <DichiarazioniSITIMainCard />
  </div>
  <div
    class="d-flex flex-wrap container px-0 justify-content-between flex-wrap align-items-stretch"
  >
    <div class="col-12">
      <DichiarazioniSITILineChart />
    </div>
  </div>

  <DichiarazioneSITIAutovalutazioni />
  <div class="container">
    <DichiarazioneSitiIstituzionaliMain />
  </div>

  <DichiarazioneSitiIstituzionaliHalf />
  <div
    class="container pb-3"
    style="padding-left: 0 !important; padding-right: 0 !important;"
  >
  <DichiarazioniAutovalutazioneIstituzionali/>
  <br>
    <DichiarazioniSitiIstituzionaliTable />
  </div>


  <div class="backgroundLightBlue my-5">
   <div class="container pb-4">
    <DichiarazioneSitiTematiciMain />
    <DichiarazioniAutovalutazioneTematici/>
    <br>
    <DichiarazioniSitiTematiciTable />
  </div>
  </div> 

  <div
    class="container my-5"
    style="padding-left: 0 !important; padding-right: 0 !important;"
  >

  <DichiarazioneAutovalutazioniConfronto/>
  </div>
</section>

<style lang="scss">
  section {
    margin-top: 1.3em;
  }
</style>
