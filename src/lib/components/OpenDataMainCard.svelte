<script>
  import Icon from "./Icon.svelte";
  import { t } from "../utils/i18n";
  import Breadcrumb from "./Breadcrumb.svelte";
  import BannerPageUpdated from "./BannerPageUpdated.svelte";
</script>

<Breadcrumb currentPage={$t("breadcrumb.openData")}></Breadcrumb>
<BannerPageUpdated pageId="open_data" />
<div class="mb-5">
  <div class="d-inline-flex mb-4">
    <span aria-hidden="true"
      ><Icon name="it it-download" variant="primary" size="lg" /></span
    >
    <h1 class="lead mx-3">{$t("opendata.title")}</h1>
  </div>

  <div class="row">
    <div class="col-12 col-md-6">
      <p>
        {@html $t("opendata.description", { break: "<br/>" })}
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
