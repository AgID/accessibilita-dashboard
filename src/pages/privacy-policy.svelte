<script>
  import Icon from "../lib/components/Icon.svelte";
  import { t } from "../lib/utils/i18n";
</script>

<svelte:head>
  <title>{$t("privacyPolicy.pagename")}</title>
</svelte:head>

<section class="container" aria-label={$t("privacyPolicy.section")}>
  <div class="insideContainer mx-auto my-5">
    <h1 class="lead">{$t("privacyPolicy.title")}</h1>
    <p>{@html $t("privacyPolicy.para1", { doubleBreak: "<br/><br/>" })}</p>
    <br />
    <h2 class="h4 blueText">
      {@html $t("privacyPolicy.subtitle2", { break: "<br/>" })}
    </h2>
    <p>
      {@html $t("privacyPolicy.para2", { doubleBreak: "<br/><br/>" })}
      <a
        href="mailto:protocollo@pec.agid.gov.it"
        title={$t("layout.mailto")}>protocollo@pec.agid.gov.it</a
      >
    </p>
    <br />
    <h2 class="h4 blueText">
      {$t("privacyPolicy.subtitle3")}
    </h2>
    <p>
      {@html $t("privacyPolicy.para3", { doubleBreak: "<br/><br/>" })}
      <a
        href="mailto:responsabileprotezionedati@agid.gov.it"
        title={$t("layout.mailto")}
        >responsabileprotezionedati@agid.gov.it</a
      >
    </p>
    <br />
    <h2 class="h4 blueText">{$t("privacyPolicy.subtitle4")}</h2>
    <p>
      {@html $t("privacyPolicy.para4", { doubleBreak: "<br/><br/>" })}
      <a
        href={$t("privacyPolicy.garantePrivacyLink")}
        title={$t("layout.externalLink")}
        target="_blank"
        rel="noreferrer"
        >www.garanteprivacy.it <Icon
          name="it it-external-link"
          variant="primary"
          size="xs"
          customClass="mb-1"
        /></a
      >
    </p>
    <br />
    <h2 class="h4 blueText">{$t("privacyPolicy.subtitle5")}</h2>
    <ul>{@html $t("privacyPolicy.para5list")}</ul>
    <p>{$t("privacyPolicy.para5")}</p>
    <br />
    <h2 class="h4 blueText">{$t("privacyPolicy.subtitle6")}</h2>
    <p>{@html $t("privacyPolicy.para6", { break: "<br/>" })}</p>
    <br />
    <h2 class="h4 blueText">{$t("privacyPolicy.subtitle7")}</h2>
    <p>{$t("privacyPolicy.para7")}</p>
    <br />
    <h2 class="h4 blueText">{$t("privacyPolicy.subtitle8")}</h2>
    <p>{@html $t("privacyPolicy.para8", { doubleBreak: "<br/><br/>" })}</p>
    <br />
    <h2 class="h4 blueText">{$t("privacyPolicy.subtitle9")}</h2>
    <p>{@html $t("privacyPolicy.para9", { break: "<br/>" })}</p>
  </div>
</section>

<style>
  @media (min-width: 992px) {
    .insideContainer {
      width: 50%;
    }
  }
</style>
