<script>
  import { onMount } from "svelte";
  import { df, dp } from "../../utils";
  import { t } from "../../utils/i18n";
  import Icon from "../Icon.svelte";
  import InfoCardSemp from "./InfoCardSemp.svelte";
  import Breadcrumb from "../Breadcrumb.svelte";
  import BannerPageUpdated from "../BannerPageUpdated.svelte";

  let erroriConformita;
  let totaleErroriConformita;

  onMount(async () => {
    const rsDistribuzioneConformita = await fetch(
      "/data/errori_distribuzione_livello_conformita.json"
    );
    const dataDistribuzioneConformita = await rsDistribuzioneConformita.json();
    erroriConformita = dataDistribuzioneConformita;
    totaleErroriConformita =
      erroriConformita[0].num_sc_non_soddisfatti +
      erroriConformita[1].num_sc_non_soddisfatti;
  });
</script>

<Breadcrumb currentPage={$t("breadcrumb.erroriSemp")}></Breadcrumb>
<BannerPageUpdated pageId="errori_monitoraggio_semplificato" />
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
      <h1 class="lead mx-3">{$t("erroriMain.titleSemp")}</h1>
    </div>
  </div>
</div>

{#if erroriConformita}
  <div class="col-12">
    <div class="card-start">
      <div class="d-flex flex-wrap justify-content-between">
        <div class="row">
          <div class="col-12 col-lg-6">
            <h2 class="h3 mb-4">
              {$t("erroriMain.subtitleSemp")}
            </h2>
            <p>
              {$t("erroriMain.descrSemp1")}
              <a
                href="https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf"
                title={$t("layout.externalLink")}
                target="_blank"
                rel="noreferrer"
                >UNI EN 301 549<Icon
                  name="it it-external-link"
                  variant="primary"
                  size="sm"
                  customClass="ms-1 mb-1"
                /></a
              >{$t("erroriMain.descrSemp2")}
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
            <p>
              {$t("erroriMain.descrSemp3", { numero: totaleErroriConformita })}
            </p>
          </div>
          <div class="col-12 col-lg-6 px-0 ps-md-3 ps-lg-5">
            <InfoCardSemp />
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
