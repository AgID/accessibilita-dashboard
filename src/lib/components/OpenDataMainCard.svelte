<script>
  import Icon from "./Icon.svelte";
</script>

<div class="mb-5">
  <div class="d-inline-flex my-4">
    <span aria-hidden="true" 
      ><Icon name="it it-download" variant="primary" size="lg"/></span
    >
    <h2 class="lead mx-3">Open Data</h2>
  </div>

  <div class="row">
    <div class="col-12 col-md-6">
      <h3 class="h3 mb-4">Elenco open data accessibilità</h3>
      <p>
        Puoi consultare e scaricare gratuitamente i dati e le informazioni
        presenti sul sito del monitoraggio dell’accessibilità di AgID.
      </p>
    </div>
    <div class="col-12 col-md-6 text-center my-4">
      <img
        alt="download-icon"
        src="/icons/icon-downlod.png"
        aria-hidden="true"
      />
    </div>
  </div>
</div>

<style>
  img {
    width: 100px;
  }
</style>
