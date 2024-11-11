<script>
  import { t } from "../utils/i18n";
</script>

<div class="blueContainer">
  <div class="container">
    <div class="row py-3 py-xl-5" style="margin-right: 0 !important">
      <div class="col-lg-7 my-auto text-center text-lg-start">
        <div class="my-4">
          <h1 class="h11 whiteText">{$t("homeMain.title")}</h1>
          <p class="whiteText">{$t("homeMain.subtitle")}</p>
        </div>
      </div>
      <div class="col-lg-5 my-auto d-none d-lg-flex">
        <div class="header-img" aria-hidden="true" />
      </div>
    </div>
  </div>
</div>

<style>
  .blueContainer {
    background-color: #0066cc;
  }

  .header-img {
    width: 100%;
    height: 400px;
    background-image: url("/images/Metaphor_illustration.svg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right;
  }
</style>
