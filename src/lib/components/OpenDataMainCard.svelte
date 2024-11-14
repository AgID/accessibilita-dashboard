<script>
  import Icon from "./Icon.svelte";
  import { t } from "../utils/i18n";
</script>

<div class="mb-5">
  <div class="d-inline-flex my-4">
    <span aria-hidden="true" 
      ><Icon name="it it-download" variant="primary" size="lg"/></span
    >
    <h1 class="lead mx-3">{$t("opendata.title")}</h1>
  </div>

  <div class="row">
    <div class="col-12 col-md-6">
      <h2 class="h3 mb-4">{$t("opendata.subtitle")}</h2>
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
