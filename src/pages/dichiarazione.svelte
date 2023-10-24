<script>
  import DichiarazioniMainCard from "../lib/components/DichiarazioniMainCard.svelte";
  import DichiarazioniLineChart from "../lib/components/DichiarazioniLineChart.svelte";
  import DichiarazioneAutovalutazioni from "../lib/components/DichiarazioneAutovalutazioni.svelte";

  import DichiarazioneSitiIstituzionaliMain from "../lib/components/DichiarazioneSitiIstituzionaliMain.svelte";
  import DichiarazioneSitiIstituzionaliHalf from "../lib/components/DichiarazioneSitiIstituzionaliHalf.svelte";
  import DichiarazioniAutovalutazioneIstituzionali from "../lib/components/DichiarazioniAutovalutazioneIstituzionali.svelte";
  import DichiarazioniSitiIstituzionaliTable from "../lib/components/DichiarazioniSitiIstituzionaliTable.svelte";

  import DichiarazioneSitiTematiciMain from "../lib/components/DichiarazioneSitiTematiciMain.svelte";
  import DichiarazioniAutovalutazioneTematici from "../lib/components/DichiarazioniAutovalutazioneTematici.svelte";
  import DichiarazioniSitiTematiciTable from "../lib/components/DichiarazioniSitiTematiciTable.svelte";
  import DichiarazioneAutovalutazioniConfronto from "../lib/components/DichiarazioneAutovalutazioniConfronto.svelte";
</script>

<svelte:head>
  <title>Dichiarazioni di accessibilità - Monitoraggio Accessibilità</title>
</svelte:head>

<section aria-label="Sezione dichiarazioni">
  <div class="container">
    <DichiarazioniMainCard />
  </div>
  <div
    class="d-flex flex-wrap container px-0 justify-content-between flex-wrap align-items-stretch print-dichiarazioniCC"
  >
    <div class="col-12">
      <DichiarazioniLineChart />
    </div>
  </div>

  <DichiarazioneAutovalutazioni />
  <div class="container">
    <DichiarazioneSitiIstituzionaliMain />
  </div>

  <DichiarazioneSitiIstituzionaliHalf />
  <div
    class="container"
    style="padding-left: 0 !important; padding-right: 0 !important;"
  >
  <DichiarazioniAutovalutazioneIstituzionali/>
    <DichiarazioniSitiIstituzionaliTable />
  </div>

  <div class="container">
    <DichiarazioneSitiTematiciMain />
  </div>
  <div
    class="container mb-5"
    style="padding-left: 0 !important; padding-right: 0 !important;"
  >
  <DichiarazioniAutovalutazioneTematici/>
    <DichiarazioniSitiTematiciTable />
    <DichiarazioneAutovalutazioniConfronto/>
  </div>
</section>

<style lang="scss">
  section {
    margin-top: 1.3em;
  }
</style>
