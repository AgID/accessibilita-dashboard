<script>
  import { t } from "../utils/i18n";
  import Icon from "./Icon.svelte";
</script>

<div class="blueContainer">
  <div class="container">
    <div class="row py-3 py-xl-5" style="margin-right: 0 !important">
      <div class="col-lg-7 my-auto text-center text-lg-start">
        <div class="my-4">
          <h1 class="h11 whiteText">{$t("homeMain.title")}</h1>
          <p class="whiteText">
            {@html $t("homeMain.subtitle1", { break: "<br/>" })}
            <a
              title={$t("layout.externalLink")}
              target="_blank"
              rel="noreferrer"
              class="whiteText"
              href="https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2004-01-09;4!vig="
              >{$t("homeMain.subtitleExtLink")}<Icon
                name="it it-external-link"
                variant="white"
                size="sm"
                customClass="ms-1 mb-1"
              />
            </a>
            {$t("homeMain.subtitle2")}
            <a href="/progetto" rel="noreferrer" class="whiteText"
              >PNRR 1.4.2 "Citizen inclusion"</a
            >.
          </p>
        </div>
      </div>
      <div class="col-lg-5 my-auto d-none d-lg-flex">
        <div class="header-img" aria-hidden="true"></div>
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

  p.whiteText > a:hover {
    color: white !important;
    font-weight: 400;
  }
</style>
