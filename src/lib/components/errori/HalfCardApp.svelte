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
            {$t("erroriMain.subtitleApprHalf")}
          </h2>
          <p>
            {$t("erroriMain.descrApprHalf1")}
            <a
              href="https://eur-lex.europa.eu/legal-content/IT/TXT/PDF/?uri=CELEX:32018D1524"
              title={$t("layout.externalLink")}
              target="_blank"
              rel="noreferrer"
              >{$t("erroriMain.decisioneEsecuzione")}<Icon
                name="it it-external-link"
                variant="primary"
                size="sm"
                customClass="ms-1 mb-1"
              /></a
            >.
          </p>
          <p>
            {$t("erroriMain.descrApprHalf2")}
            <a
              href="https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf"
              title={$t("layout.externalLink")}
              target="_blank"
              rel="noreferrer"
              >UNI EN 301549<Icon
                name="it it-external-link"
                variant="primary"
                size="sm"
                customClass="ms-1 mb-1"
              /></a
            >{@html $t("erroriMain.descrApprHalf3", {
              doubleBreak: "<br/><br/>",
            })}
          </p>
        </div>
        <div class="col-12 col-lg-6 px-0 ps-md-3 ps-lg-5">
          <HalfInfoCardApp />
        </div>
      </div>
    </div>
  </div>
</div>
