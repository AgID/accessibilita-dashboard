<script lang="ts">
  import { onMount } from "svelte";
  import { nf } from "../utils";
  import { locale, t } from "../utils/i18n";

  let series;
  let labels;
  let innerWidth;
  let images

  let response;
  onMount(async () => {
    const rs = await fetch("/data/monitoraggio_per_categoria.json");
    response = await rs.json();
    series = response?.data?.map((r) => r.num_siti);
    labels = response?.data?.map((r) => r[`des_tipologia_ente_${$locale}`]);
    images = response?.data?.map((r) => r.des_tipologia_ente_it);
  });
  
</script>

<svelte:window bind:innerWidth />
<div class="mb-5 pb-3 text-center backgroundLightBlue" style="width:100%">
  <div class="container">
    <h3 class="h3 pt-5 pb-3 d-flex justify-content-center px-3">
      {$t("moniCategoria.title")}
    </h3>
    <div>
      <p class="text-center col-10 mx-auto">
        {@html $t("moniCategoria.subtitle", {break: "<br/>"})}
      </p>
      {#if series}
        <div class="row justify-content-center px-lg-5 mx-auto">
          {#each series as item, i}
            <div class="col-12 col-md-4 col-lg-4 col-xl-4 my-4">
              <img
                src="/images/{images[i].split(' ')[0]}.svg"
                alt=""
                aria-hidden="true"
              />
              <p class="cardTitle pt-3 blueText">{labels[i]}</p>
              <p class="cardMainData">{nf(item)}</p>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>
