<script>
  import BannerPageUpdated from "../lib/components/BannerPageUpdated.svelte";
  import Breadcrumb from "../lib/components/Breadcrumb.svelte";
  import Icon from "../lib/components/Icon.svelte";
  import { t } from "../lib/utils/i18n";
</script>

<svelte:head>
  <title>{$t("legalPolicy.pagename")}</title>
</svelte:head>

<section class="container" aria-label={$t("legalPolicy.section")}>
  <div class="insideContainer mx-auto mb-5">
    <Breadcrumb currentPage={$t("breadcrumb.legali")}></Breadcrumb>
    <BannerPageUpdated pageId="note_legali" />
    <h1 class="lead">{$t("legalPolicy.title")}</h1>
    <h2 class="h3 greyText">{$t("legalPolicy.subtitle1")}</h2>
    <p>{@html $t("legalPolicy.para1", { doubleBreak: "<br/><br/>" })}</p>
    <br />
    <h3 class="h4 blueText">{$t("legalPolicy.subtitle2")}</h3>
    <p>
      {$t("legalPolicy.para2a")}
      <a
        href="http://creativecommons.org/licenses/by/3.0/it/legalcode"
        title={$t("layout.externalLink")}
        target="_blank"
        rel="noreferrer"
        >http://creativecommons.org/licenses/by/3.0/it/legalcode<Icon
          name="it it-external-link"
          variant="primary"
          size="sm"
          customClass="ms-1 mb-1"
        /></a
      >
    </p>
    <p>{$t("legalPolicy.para2b")}</p>
    <br />
    <h3 class="h4 blueText">{$t("legalPolicy.subtitle3")}</h3>
    <p>{@html $t("legalPolicy.para3", { doubleBreak: "<br/><br/>" })}</p>
    <br />
    <h3 class="h4 blueText">{$t("legalPolicy.subtitle4")}</h3>
    <p>{@html $t("legalPolicy.para4", { doubleBreak: "<br/><br/>" })}</p>
    <br />
    <h3 class="h4 blueText">{$t("legalPolicy.subtitle5")}</h3>
    <p>{$t("legalPolicy.para5")}</p>
  </div>
</section>

<style>
  @media (min-width: 992px) {
    .insideContainer {
      width: 50%;
    }
  }
</style>
