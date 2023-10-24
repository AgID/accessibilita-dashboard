<script>
    import CronologiaMain from "../lib/components/Cronologia.svelte";
  </script>
  
  <svelte:head>
    <title>Cronologia del progetto - Monitoraggio Accessibilità</title>
  </svelte:head>
  
  <section aria-label="Sezione rilasci">
    <div class="container">
        <CronologiaMain />
    </div>
  </section>

<style lang="scss">
  section {
    margin-top: 1.3em;
  }
</style>
  