<script>
  import Icon from "./Icon.svelte";
  import { t } from "../utils/i18n";
</script>

<div class="container my-5">
  <div class="my-5">
      <h1 class="lead">
        {$t("project.title")}
      </h1>
      <p class="display5">
        {$t("project.subtitle")}
      </p>
    </div>

    <p>
      {$t("project.description")}
    </p>

    <p class="h3 greyText my-4">{$t("project.subtitle2")}</p>

    <p>
      {@html $t("project.para2a", { break: "<br/>" })}
      <a
        title={$t("layout.externalLink")}
        target="_blank"
        rel="noreferrer"
        href={$t("project.indicePAlink")}
        >{$t("project.indicePAlinkText")}<Icon
          name="it it-external-link"
          variant="primary"
          size="xs"
          customClass="mb-1"
        /></a
      >{$t("project.para2b")}
    </p>

    <div class="col-lg-8 mx-auto my-5">
      <blockquote class="blockquote-card">
        <p class="mb-0 fst-italic">
          {$t("project.para2c")}
        </p>
      </blockquote>
    </div>

    <p class="h3 greyText my-4">
      {$t("project.subtitle4")}
    </p>
    <p>
      {$t("project.para4a")}<a
        title={$t("layout.externalLink")}
        target="_blank"
        rel="noreferrer"
        href={$t("project.MAUVElink")}
        >{$t("project.MAUVElinkText")}<Icon
          name="it it-external-link"
          variant="primary"
          size="xs"
          customClass="mb-1"
        /></a
      >{$t("project.para4b")}
      <a
        href={$t("project.WCAGlink")}
        title={$t("layout.externalLink")}
        target="_blank"
        rel="noreferrer"
        >{$t("project.WCAGlinkText")}<Icon
          name="it it-external-link"
          variant="primary"
          size="xs"
          customClass="mb-1"
        /></a
      >
      {$t("project.para4c")}
  </p>
</div>
