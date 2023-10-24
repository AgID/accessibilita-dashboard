<script>
  import ErroriMainCard from "../lib/components/ErroriMainCard.svelte";
  import ErroriPerSitiTable from "../lib/components/ErroriPerSitiTable.svelte";
  import ErroriPrincipio from "../lib/components/ErroriPrincipio.svelte";
</script>

<svelte:head>
  <title>Errori - Monitoraggio Accessibilità</title>
</svelte:head>

<section aria-label="Sezione errori">
  <div class="container mb-5">
    <ErroriMainCard />
  </div>
  <div class="container my-5" style="padding-left: 0 !important; padding-right: 0 !important;">
    <ErroriPerSitiTable />
  </div>
  <ErroriPrincipio />
</section>

<style lang="scss">
  section {
    margin-top: 1.3em;
  }
</style>
