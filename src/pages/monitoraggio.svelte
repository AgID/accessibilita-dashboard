<script>
  import MonitoraggioMainCard from "../lib/components/MonitoraggioMainCard.svelte";
  import MonitoraggioSitiPerRegioneTable from "../lib/components/MonitoraggioSitiPerRegioneTable.svelte";
  import MonitoraggioSitiPerCompartoChart from "../lib/components/MonitoraggioSitiPerCompartoChart.svelte";
  import MonitoraggioSitiAreaGeo from "../lib/components/MonitoraggioSitiAreaGeo.svelte";
</script>

<svelte:head>
  <title>Monitoraggio - Monitoraggio Accessibilità</title>
</svelte:head>

<section aria-label="Sezione monitoraggio">
  <div class="container mb-5">
    <MonitoraggioMainCard />
    <MonitoraggioSitiAreaGeo />
</div>
  <MonitoraggioSitiPerCompartoChart />
  <div
    class="container"
    style="padding-left: 0 !important; padding-right: 0 !important;"
  >
    <MonitoraggioSitiPerRegioneTable />
  </div>
</section>

<style lang="scss">
  section {
    margin-top: 1.3em;
  }
</style>
