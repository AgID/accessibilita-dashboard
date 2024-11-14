<script>
  import { t } from "../../utils/i18n";
  import Icon from "../Icon.svelte";
  import HalfInfoCardApp from "./HalfInfoCardApp.svelte";

</script>

  <div class="col-12">
    <div class="card-start">
      <div class="d-flex flex-wrap justify-content-between">
        <div class="row">
          <div class="col-12 col-lg-6">
            <h2 class="h3 mb-4">
              {$t("erroriMain.subtitleAppHalf")}
            </h2>
            <p>{@html $t("erroriMain.descriptionAppHalf", {doubleBreak: "<br/><br/>", break: "<br/>"})}
              <a
                href={$t("erroriMain.WCAGlink")}
                title={$t("layout.externalLink")}
                target="_blank"
                rel="noreferrer"
                >{$t("erroriMain.link")}<Icon
                  name="it it-external-link"
                  variant="primary"
                  size="xs"
                  customClass="mb-1"
                /></a
              >.
              <br /><br />
            </p>
          </div>
          <div class="col-12 col-lg-6 px-0 ps-md-3 ps-lg-5">
            <HalfInfoCardApp />
          </div>
        </div>
      </div>
    </div>
  </div>
