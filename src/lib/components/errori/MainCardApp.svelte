<script>
  import { onMount } from "svelte";
  import { df, dp } from "../../utils";
  import { t } from "../../utils/i18n";
  import Icon from "../Icon.svelte";
  import MainInfoCardApp from "./MainInfoCardApp.svelte";
  import Breadcrumb from "../Breadcrumb.svelte";
  import BannerPageUpdated from "../BannerPageUpdated.svelte";
</script>

<Breadcrumb currentPage={$t("breadcrumb.erroriAppr")}></Breadcrumb>
<BannerPageUpdated pageId="errori_monitoraggio_approfondito" />
<div class="d-flex">
  <div class="mb-4">
    <div class="d-inline-flex">
      <span aria-hidden="true"
        ><Icon
          name="it it-exclamation-diamond"
          variant="primary"
          size="lg"
        /></span
      >
      <h1 class="lead mx-3">{$t("erroriMain.titleAppr")}</h1>
    </div>
  </div>
</div>

<div class="col-12">
  <div class="card-start">
    <div class="d-flex flex-wrap justify-content-between">
      <div class="row">
        <div class="col-12 col-lg-6">
          <h2 class="h3 mb-4">
            {$t("erroriMain.subtitleApprMain")}
          </h2>
          <p>
            {$t("erroriMain.descrApprMain1")}
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
            {$t("erroriMain.descrApprMain2")}
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
            >{$t("erroriMain.descrApprMain3")}
            <a
              href={$t("erroriMain.wcagLink")}
              title={$t("layout.externalLink")}
              target="_blank"
              rel="noreferrer"
              >{$t("erroriMain.wcagText")}<Icon
                name="it it-external-link"
                variant="primary"
                size="sm"
                customClass="ms-1 mb-1"
              /></a
            >.
          </p>
          <p>{$t("erroriMain.descrApprMain4")}</p>
        </div>
        <div class="col-12 col-lg-6 px-0 ps-md-3 ps-lg-5">
          <MainInfoCardApp />
        </div>
      </div>
    </div>
  </div>
</div>
