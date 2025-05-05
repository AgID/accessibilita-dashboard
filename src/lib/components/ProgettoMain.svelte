<script>
  import Icon from "./Icon.svelte";
  import { t } from "../utils/i18n";
  import { onMount } from "svelte";
  import { nf } from "../utils";
  import Breadcrumb from "./Breadcrumb.svelte";
  import BannerPageUpdated from "./BannerPageUpdated.svelte";

  let totalerroriConformita;

  onMount(async () => {
    const rsErr = await fetch(
      "/data/errori_distribuzione_livello_conformita.json"
    );
    const erroriConformita = await rsErr.json();
    totalerroriConformita = nf(
      erroriConformita[0].num_sc_non_soddisfatti +
        erroriConformita[1].num_sc_non_soddisfatti
    );
  });
</script>

<div class="container mb-5">
  <Breadcrumb currentPage={$t("breadcrumb.progetto")}></Breadcrumb>
  <BannerPageUpdated pageId="progetto" />
  <div class="mb-4">
    <h1 class="lead">
      {$t("project.title")}
    </h1>
    <p class="display5">
      {$t("project.subtitle")}
    </p>
  </div>

  <p>
    {$t("project.para1a")}
    <a
      title={$t("layout.externalLink")}
      target="_blank"
      rel="noreferrer"
      href="https://accessibilita.agid.gov.it/formazione"
      >{$t("project.para1b")}<Icon
        name="it it-external-link"
        variant="primary"
        size="sm"
        customClass="ms-1 mb-1"
      />
    </a>

    {$t("project.para1c")}
  </p>

  <p class="h3 greyText my-4">{$t("project.subtitle2")}</p>

  <p>
    {@html $t("project.para2a", { break: "<br/>" })}
  </p>

  <div class="col-lg-8 mx-auto my-5">
    <blockquote class="blockquote-card">
      <p class="fst-italic">
        {$t("project.para2c")}
      </p>
      <p class="fw-bold">
        ― {$t("project.para2d")}
      </p>
    </blockquote>
  </div>

  <p class="h3 greyText my-4">{$t("project.subtitle3")}</p>

  <p class="mb-5">
    {@html $t("project.para3", { break: "<br/>" })}
  </p>

  <p class="h3 greyText my-4">
    {$t("project.subtitle4")}
  </p>
  <p>
    {$t("project.para4a")}
    <a
      title={$t("layout.externalLink")}
      target="_blank"
      rel="noreferrer"
      href="https://mauve.isti.cnr.it/singleValidation.jsp"
      >MAUVE++<Icon
        name="it it-external-link"
        variant="primary"
        size="sm"
        customClass="ms-1 mb-1"
      />
    </a>
    {@html $t("project.para4b", { totErrori: totalerroriConformita })}
    <a
      href={$t("project.WCAGlink")}
      title={$t("layout.externalLink")}
      target="_blank"
      rel="noreferrer"
      >WCAG 2.1<Icon
        name="it it-external-link"
        variant="primary"
        size="sm"
        customClass="ms-1 mb-1"
      /></a
    >.
  </p>
  <p>
    {$t("project.para4c")}
  </p>
</div>
