<script>
  import { onMount } from "svelte";
  import { nf, df, dp } from "../utils";
  import Tooltip from "./Tooltip.svelte";

  export let height = "";

  $: mainHeight = height ? `height:${height};` : "";

  let erroriConformita;
  let totaleErroriConformita;

  onMount(async () => {
    const rsDistribuzioneConformita = await fetch(
      "/data/errori_distribuzione_livello_conformita.json"
    );
    const dataDistribuzioneConformita = await rsDistribuzioneConformita.json();
    erroriConformita = dataDistribuzioneConformita;
    totaleErroriConformita = nf(
      erroriConformita[0].num_sc_non_soddisfatti +
        erroriConformita[1].num_sc_non_soddisfatti
    );
  });
</script>

{#if erroriConformita}
  <div class="card-box mt-0" style={`${mainHeight}`}>
    <div class:vertical-align={height}>
      <div class="blueInit py-2 px-auto text-center">
        <div class="row">
          <div class="col-10 mx-auto">
            <div class="cardTitle whiteText py-3">
              Criteri di successo delle WCAG 2.1 valutati automaticamente:
            </div>
          </div>
        </div>
        <div class="cardMainData whiteText py-2">
          {totaleErroriConformita} su 50
        </div>
      </div>
      <div class="ms-lg-4 mb-3">
        {#each erroriConformita as item}
          <div class="row pt-3 mx-1">
            <div class="col-3 py-2 pe-0 mx-auto mx-lg-0">
              <div class="h3 blueText circle mb-0" aria-hidden="true">
                {item.cod_livello_conformita}
              </div>
            </div>
            <div class="col-8 text-left ps-lg-0 mx-lg-auto">
              <p class="cardSmallTitle mt-2 mb-0 greyText">
                Livello conformità {item.cod_livello_conformita}
              </p>
              <p class="h3  blueText mb-0">
                {nf(item.num_sc_non_soddisfatti)} criteri di successo
              </p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .vertical-align {
    padding-top: 1.2em;
  }

  .blueInit {
    background-color: #0066cc;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
  }

  .whiteText {
    color: #f5f5f5 !important;
  }
  .circle {
    width: 70px;
    height: 70px;
    border-radius: 50px;
    border: 3px solid #0066cc;
    line-height: 65px;
    text-align: center;
  }
</style>
