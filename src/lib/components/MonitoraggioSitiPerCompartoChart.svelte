<script lang="ts">
  import { onMount } from "svelte";
  import { nf } from "../utils";

  let series;
  let labels;
  let innerWidth;

  let response;
  onMount(async () => {
    const rs = await fetch("/data/monitoraggio_per_categoria.json");
    response = await rs.json();
    series = response?.data?.map((r) => r.num_siti);
    labels = response?.data?.map((r) => r.des_tipologia_ente);
  });
</script>

<svelte:window bind:innerWidth />
<div
  class="mb-5 pb-3 text-center backgroundLightBlue" 
  style="width:100%"
>
  <div class="container">
    <h3
      class="h3 greyText pt-5 pb-3 d-flex justify-content-center px-3"
    >
    Distribuzione dei siti valutati per settore
    </h3>
    <div>
      <p class="text-start col-10 mx-auto text-center">
        Il monitoraggio dell’accessibilità effettuato da AgID si estende, oltre che ai numerosi ambiti in cui le PA offrono servizi web, anche all’istruzione. MAUVE++ valuta in modalità automatizzata l’accessibilità dei siti web di scuole primarie, secondarie e università.
      </p>
      {#if series}
        <div class="row justify-content-center px-lg-5 mx-auto ">
          {#each series as item, i}
            <div class="col-12 col-md-4 col-lg-4 col-xl-4 my-4">
              <img
                src="images/{labels[i].split(' ')[0]}.svg"
                alt=""
                aria-hidden="true"
              />
              <p class="cardTitle pt-3 greyText" >{labels[i]}</p>
              <p class="cardMainData" >{nf(item)}</p>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>
