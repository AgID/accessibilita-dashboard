<script>
  import ObiettiviMainCard from "../lib/components/ObiettiviMainCard.svelte";
  import ObiettiviLineChart from "../lib/components/ObiettiviLineChart.svelte";
  import ObiettiviIntervento from "../lib/components/ObiettiviIntervento.svelte";
  import ObiettiviTable from "../lib/components/ObiettiviTable.svelte";
</script>

<svelte:head>
  <title>Obiettivi di accessibilità - Monitoraggio Accessibilità</title>
</svelte:head>

<section aria-label="Sezione Obiettivi">
  <div class="container">
    <ObiettiviMainCard />
  </div>
  <div
    class="d-flex flex-wrap container px-0 justify-content-between flex-wrap align-items-stretch print-ObiettiviCC"
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
