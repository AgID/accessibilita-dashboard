<script>
  import { onMount } from "svelte";
  import { nf } from "../utils";

  import Icon from "./Icon.svelte";
  import { t } from "../utils/i18n";


  let totale;
  onMount(async () => {
    const res = await fetch("/data/dichiarazione_intestazione.json");
    const datas = await res.json();

    totale = datas.find(
      (d) => d.indicatore == "num_dichiarazioni_pub_tot"
    ).valore;
  });


</script>

<div class="mb-5">
  <div class="d-inline-flex my-4">
    <span aria-hidden="true" 
      ><Icon name="it it-download" variant="primary" size="lg"/></span
    >
    <h2 class="lead mx-3">{$t("opendata.title")}</h2>
  </div>

  <div class="row">
    <div class="col-12 col-md-6">
      <h3 class="h3 mb-4">{$t("opendata.subtitle")}</h3>
      <p>
        {$t("opendata.description")}
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
