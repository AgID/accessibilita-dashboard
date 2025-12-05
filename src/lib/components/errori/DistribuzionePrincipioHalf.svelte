<script>
  import { onMount } from "svelte";
  import { nf, nf1d, pm } from "../../utils";
  import Icon from "../Icon.svelte";
  import { locale, t } from "../../utils/i18n";

  let erroriRiscontratiPrincipio = $state();
  let periodoMonitoraggio = $state();

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
    periodoMonitoraggio = pm(
      erroriRiscontratiPrincipio?.intestazione?.periodo_monitoraggio
    );
    let orderedErrors = [];
    ordinePrincipi.forEach((op) => {
      orderedErrors.push(
        erroriRiscontratiPrincipio.data.find(
          (erp) => erp.des_principio_it == op
        )
      );
    });
    erroriRiscontratiPrincipio = orderedErrors;
  });
</script>

<div class="backgroundLightBlue pt-5 pb-3 px-xxl-5">
  <div class="container">
    <div class="col-lg-8 mx-auto">
      <h3 class="h3 pb-2">{$t("erroriPrincipio.title")}</h3>
      <p class="periodoLabel pb-2">
        {$t("layout.periodoMonitoraggio")}
        <span class="periodoDate">
          {periodoMonitoraggio}
        </span>
      </p>
      <p>
        {@html $t("erroriPrincipio.description", { break: "<br/>" })}
      </p>
    </div>
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
              {nf1d(item.perc_errore_per_principio)}%
            </p>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
