<script>
  import SITIMainCard from "../../../lib/components/dichiarazioni/SitiMainCard.svelte";
  import SITILineChart from "../../../lib/components/dichiarazioni/SitiLineChart.svelte";
  import SITIAutovalutazioni from "../../../lib/components/dichiarazioni/SitiAutovalutazioni.svelte";

  import SitiIstituzionaliMain from "../../../lib/components/dichiarazioni/SitiIstituzionaliMain.svelte";
  import SitiIstituzionaliHalf from "../../../lib/components/dichiarazioni/SitiIstituzionaliHalf.svelte";
  import AutovalutazioneIstituzionali from "../../../lib/components/dichiarazioni/AutovalutazioneIstituzionali.svelte";
  import SitiIstituzionaliTable from "../../../lib/components/dichiarazioni/SitiIstituzionaliTable.svelte";

  import SitiTematiciMain from "../../../lib/components/dichiarazioni/SitiTematiciMain.svelte";
  import AutovalutazioneTematici from "../../../lib/components/dichiarazioni/AutovalutazioneTematici.svelte";
  import SitiTematiciTable from "../../../lib/components/dichiarazioni/SitiTematiciTable.svelte";
  import AutovalutazioniConfronto from "../../../lib/components/dichiarazioni/AutovalutazioniConfronto.svelte";
  import { t } from "../../../lib/utils/i18n";

</script>

<svelte:head>
  <title>{$t("dichiarazioni.SITI-pagename")}</title>
</svelte:head>

<section aria-label={$t("dichiarazioni.SITI-section")}>
  <div class="container">
    <SITIMainCard />
  </div>
  <div
    class="d-flex flex-wrap container px-0 justify-content-between flex-wrap align-items-stretch"
  >
    <div class="col-12">
      <SITILineChart />
    </div>
  </div>

  <SITIAutovalutazioni />
  <div class="container">
    <SitiIstituzionaliMain />
  </div>

  <SitiIstituzionaliHalf />
  <div
    class="container pb-3"
    style="padding-left: 0 !important; padding-right: 0 !important;"
  >
  <AutovalutazioneIstituzionali/>
  <br>
    <SitiIstituzionaliTable />
  </div>


  <div class="backgroundLightBlue my-5">
   <div class="container pb-4">
    <SitiTematiciMain />
    <AutovalutazioneTematici/>
    <br>
    <SitiTematiciTable />
  </div>
  </div> 

  <div
    class="container my-5"
    style="padding-left: 0 !important; padding-right: 0 !important;"
  >

  <AutovalutazioniConfronto/>
  </div>
</section>

<style lang="scss">
  section {
    margin-top: 1.3em;
  }
</style>
