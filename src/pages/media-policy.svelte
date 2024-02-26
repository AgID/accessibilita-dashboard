<script>
  import Icon from "../lib/components/Icon.svelte";
  import { t } from "../lib/utils/i18n";
</script>

<svelte:head>
  <title>{$t("mediaPolicy.pagename")}</title>
</svelte:head>

<section class="container" aria-label={$t("mediaPolicy.section")}>
  <div class="insideContainer mx-auto my-5">
    <div>
      <h2 class="lead">{$t("mediaPolicy.title")}</h2>
      <p class="py-3">{$t("mediaPolicy.para1")}</p>
    </div>

    <div class="pb-3">
      <h4 class="h4 blueText">{$t("mediaPolicy.subtitle2")}</h4>
      <p class="py-3">
        {@html $t("mediaPolicy.para2a", { doubleBreak: "<br/><br/>" })}
        <a
          title={$t("layout.externalLink")}
          href="https://www.funzionepubblica.gov.it/articolo/dipartimento/01-06-2017/circolare-n-2-2017-attuazione-delle-norme-sull%E2%80%99accesso-civico"
          target="_blank"
          rel="noreferrer"
          >{$t("mediaPolicy.para2linkText")}<Icon
            name="it it-external-link"
            variant="primary"
            size="xs"
            customClass="mb-1"
          />
        </a>
        {@html $t("mediaPolicy.para2b", { doubleBreak: "<br/><br/>" })}
      </p>
      <ul>
        {@html $t("mediaPolicy.para2List", {
          listStart: "<li>",
          newListItem: "</li><li>",
          listEnd: "</li>",
        })}
      </ul>
    </div>
    <div class="pb-3">
      <h4 class="h4 blueText">{$t("mediaPolicy.subtitle3")}</h4>
      <p class="py-3">{$t("mediaPolicy.para3a")}</p>
      <ol>
        {@html $t("mediaPolicy.para3aList", {
          listStart: "<li>",
          newListItem: "</li><li>",
          listEnd: "</li>",
        })}
      </ol>
      <p>{$t("mediaPolicy.para3b")}</p>
      <ol>
        {@html $t("mediaPolicy.para3bList", {
          listStart: "<li>",
          newListItem: "</li><li>",
          listEnd: "</li>",
        })}
      </ol>
      <p>{@html $t("mediaPolicy.para3c")}</p>
    </div>
    <div class="pb-3">
      <h4 class="h4 blueText">{$t("mediaPolicy.subtitle4")}</h4>
      <p class="py-3">{$t("mediaPolicy.para4")}</p>
      <h6 class="display6">{$t("mediaPolicy.social1")}</h6>
      <p>
        {$t("mediaPolicy.socialText1a")}
        <a
          href="https://www.facebook.com/AgIDGovIT"
          title={$t("layout.externalLink")}
          target="_blank"
          rel="noreferrer"
          >www.facebook.com/AgIDGovIT <Icon
            name="it it-external-link"
            variant="primary"
            size="xs"
            customClass="mb-1"
          /></a
        >.
        {$t("mediaPolicy.socialText1b")}
        <a
          href="https://www.facebook.com/groups/agid.spid"
          title={$t("layout.externalLink")}
          target="_blank"
          rel="noreferrer"
          >www.facebook.com/groups/agid.spid <Icon
            name="it it-external-link"
            variant="primary"
            size="xs"
            customClass="mb-1"
          /></a
        >. {$t("mediaPolicy.socialText1c")}
      </p>
      <h6 class="display6">{$t("mediaPolicy.social2")}</h6>
      <p>
        {$t("mediaPolicy.socialText2a")}
        <a
          href="https://twitter.com/AgidGov"
          title={$t("layout.externalLink")}
          target="_blank"
          rel="noreferrer"
          >www.twitter.com/AgidGov <Icon
            name="it it-external-link"
            variant="primary"
            size="xs"
            customClass="mb-1"
          /></a
        >. {$t("mediaPolicy.socialText2b")}
      </p>
      <h6 class="display6">{$t("mediaPolicy.social3")}</h6>
      <p>
        {$t("mediaPolicy.socialText3a")}
        <a
          href="https://medium.com/@AgidGov"
          title={$t("layout.externalLink")}
          target="_blank"
          rel="noreferrer"
          >www.medium.com/@AgidGov <Icon
            name="it it-external-link"
            variant="primary"
            size="xs"
            customClass="mb-1"
          /></a
        >. {$t("mediaPolicy.socialText3b")}
      </p>
      <h6 class="display6">{$t("mediaPolicy.social4")}</h6>
      <p>
        {$t("mediaPolicy.socialText4a")}
        <a
          href="https://www.linkedin.com/company/agenzia-italia-digitale"
          title={$t("layout.externalLink")}
          target="_blank"
          rel="noreferrer"
          >www.linkedin.com/company/agenzia-italia-digitale <Icon
            name="it it-external-link"
            variant="primary"
            size="xs"
            customClass="mb-1"
          /></a
        >. {$t("mediaPolicy.socialText4b")}
        <a href="mailto:comunicazione@agid.gov.it" title={$t("layout.mailto")}
          >comunicazione@agid.gov.it
        </a>.
      </p>
      <h6 class="display6">{$t("mediaPolicy.social5")}</h6>
      <p>
        {$t("mediaPolicy.socialText5a")}
        <a
          href="https://www.youtube.com/c/AGIDagenzia-italia-digitale"
          title={$t("layout.externalLink")}
          target="_blank"
          rel="noreferrer"
          >www.youtube.com/c/AGIDagenzia-italia-digitale <Icon
            name="it it-external-link"
            variant="primary"
            size="xs"
            customClass="mb-1"
          /></a
        >. {$t("mediaPolicy.socialText5b")}
      </p>
    </div>
    <div class="pb-3">
      <h4 class="h4 blueText">{$t("mediaPolicy.subtitle5")}</h4>
      <p class="py-3">
        {$t("mediaPolicy.para5")}
        <a href="mailto:comunicazione@agid.gov.it" title={$t("layout.mailto")}
          >comunicazione@agid.gov.it
        </a>.
      </p>
    </div>
  </div>
</section>

<style>
  @media (min-width: 992px) {
    .insideContainer {
      width: 50%;
    }
  }

  :global(ul li::marker) {
    color: #06c;
  }

  .display6 {
    color: #06c;
  }
</style>
