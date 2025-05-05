<script>
  import { onMount } from "svelte";
  import { t, locale } from "../utils/i18n";

  export let dataPagina = "";
  export let pageId = "";

  let response;
  $: isPubFooter =
    pageId === "media_policy" ||
    pageId === "note_legali" ||
    pageId === "privacy_policy" ||
    pageId === "guida_piattaforma";

  onMount(async () => {
    const rs = await fetch("/data/date_pagine.json");
    response = await rs.json();
    dataPagina = response?.[`data_${pageId}_${$locale}`];
  });
</script>

<div class={isPubFooter ? "mb-4" : "bannerPageUpdated p-3 mb-5"}>
  <p class="periodoLabel pb-0 mb-0">
    {$t("layout.latestUpdate")}
    <span class="periodoDate">
      {dataPagina}
    </span>
  </p>
</div>

<style>
  .bannerPageUpdated {
    background-color: #f2f7fc;
  }
</style>
