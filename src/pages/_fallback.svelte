<!-- <script lang="ts">
    import { onMount } from "svelte";

    onMount(() => {
        var hiddenElement = document.createElement("a");
        hiddenElement.href = "https://www.agid.gov.it/404";
        hiddenElement.click();
    });
</script> -->

<svelte:head>
  <title>Pagina non trovata - Monitoraggio Accessibilità</title>
</svelte:head>

<section class="section text-center" aria-label="Pagina non trovata">
  
  <h2 class="error-page-title">404</h2>
  <p class="lead mb-3">Pagina non trovata</p>
  <p class="mb-5">
    <!-- svelte-ignore a11y-invalid-attribute -->
    Ops! La pagina che stai cercando non è stata trovata, <a
      href="javascript:history.back();"
      title="Ritorna alla pagina precedente">torna indietro</a
    > <br> o continua la navigazione utilizzando il menu
  </p>

  <a
    href="/"
    class="button-text a-button"
    style="text-decoration: none;"
  >
    RITORNA ALLA HOMEPAGE</a
  >

</section>

<style lang="scss">

  .error-page-title {
    font-size: 11.2em;
    font-weight: 700;
    color: #0066cc
  }

  .a-button {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 24px;
    gap: 8px;
    border: none;
    width: 210px;
    height: 52px;
    background: #0066cc;
    border-radius: 4px;
  }

  .a-button:hover {
    background: #004c99;
  }

  .a-button:active {
    background: #003366;
  }

  .button-text {
    font-family: "Titillium Web";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;
    text-align: center;
    color: #ffffff;
  }

</style>

