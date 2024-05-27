<script>
  import { onMount } from "svelte";
  import { nf } from "../../utils";
  import Icon from "../Icon.svelte";
  import Tooltip from "../Tooltip.svelte";
  import { locale, t } from "../../utils/i18n";

  let erroriRiscontratiPrincipio;

  let principleTextMap = {
    Percepibile: "https://www.w3.org/Translations/WCAG21-it/#perceivable",
    Utilizzabile: "https://www.w3.org/Translations/WCAG21-it/#operable",
    Robusto: "https://www.w3.org/Translations/WCAG21-it/#robust",
    Comprensibile: "https://www.w3.org/Translations/WCAG21-it/#understandable",
    Perceivable: "https://www.w3.org/TR/WCAG21/#perceivable",
    Operable: "https://www.w3.org/TR/WCAG21/#operable",
    Understandable: "https://www.w3.org/TR/WCAG21/#understandable",
    Robust: "https://www.w3.org/TR/WCAG21/#robust",
  };

  let ordinePrincipi = [
    "Percepibile",
    "Utilizzabile",
    "Comprensibile",
    "Robusto",
  ];

  onMount(async () => {
    const rsPrincipio = await fetch("/data/errori_principio.json");
    erroriRiscontratiPrincipio = await rsPrincipio.json();
    let orderedErrors = [];
    ordinePrincipi.forEach((op) => {
      orderedErrors.push(
        erroriRiscontratiPrincipio.find((erp) => erp.des_principio_it == op)
      );
    });
    erroriRiscontratiPrincipio = orderedErrors;
  });
</script>

<div class="backgroundLightBlue pt-5 pb-3 px-xxl-5">
  <div class="container">
    <div class="text-center">
      <h3 class="h3 pb-3">{$t("erroriPrincipio.title")}</h3>
    </div>
    <p class=" mx-3 mx-lg-5 px-lg-5 text-center">
      {$t("erroriPrincipio.description")}
      <a
        href={$t("erroriPrincipio.WCAGlink")}
        title={$t("layout.externalLink")}
        target="_blank"
        rel="noreferrer"
        >WCAG 2.1 <Icon
          name="it it-external-link"
          size="xs"
          customClass="mb-1"
          variant="primary"
        /></a
      >
    </p>
    {#if erroriRiscontratiPrincipio}
      <div class="row text-center">
        {#each erroriRiscontratiPrincipio as item}
          <div class="col-12 col-md-6 col-xl-3 my-4">
            <p class="h4 d-inline-flex blueText">
              <span class="mt-1">
                <a
                  class="text-decoration-none"
                  href={principleTextMap[item[`des_principio_${$locale}`]]}
                  title={$t("layout.externalLink")}
                  target="_blank"
                  rel="noreferrer"
                  >{item[`des_principio_${$locale}`]}
                  <Icon
                    name="it it-external-link"
                    size="sm"
                    customClass="mb-1"
                    variant="primary"
                  />
                </a>
              </span>
            </p>

            <p class="cardMainData">
              {nf(item.perc_errore_per_principio)}%
            </p>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
