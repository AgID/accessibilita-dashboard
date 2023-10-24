<script>
  import OpenDataMainCard from "../lib/components/OpenDataMainCard.svelte";
  import OpenDataTable from "../lib/components/OpenDataTable.svelte";
</script>

<svelte:head>
  <title>Open Data - Monitoraggio Accessibilità</title>
</svelte:head>

<section aria-label="Sezione open data">
  <div class="container">
    <OpenDataMainCard />
  </div>
  <div
    class="container my-5"
    style="padding-left: 0 !important; padding-right: 0 !important;"
  >
    <OpenDataTable />
  </div>
</section>

<style lang="scss">
  section {
    margin-top: 1.3em;
  }
</style>
