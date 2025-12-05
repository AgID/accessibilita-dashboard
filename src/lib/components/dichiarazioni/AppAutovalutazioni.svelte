<script>
  import { onMount } from "svelte";
  import { nf } from "../../utils";
  import { locale, t } from "../../utils/i18n";
  import Icon from "../Icon.svelte";

  let data = $state();

  let periodoMonitoraggio = $state();
  let iconeConformita = {
    Conforme: "it it-check-circle",
    "Parzialmente conforme": "it it-error",
    "Non conforme": "it it-close-circle",
  };

  let ordineConformita = ["Conforme", "Parzialmente conforme", "Non conforme"];

  onMount(async () => {
    const response = await fetch("/data/dichiarazione_app_so_conformita.json");
    let jsonData = await response.json();
    let orderedConformita = [];

    periodoMonitoraggio = jsonData?.intestazione?.anno_dichiarazione;

    ordineConformita.forEach((op) => {
      let num = jsonData.data.find((erp) => erp.conformita_it == op);
      if (num) {
        num.total = num.Android + num.iOS;
        orderedConformita.push(num);
      }
    });

    data = orderedConformita;
  });
</script>

<div class="backgroundLightBlue py-5 px-xxl-5">
  <div class="container">
    <div class="col-lg-8 mx-auto">
      <h2 class="h3 pb-2 greyText">
        {$t("dicAutoval.APP-title")}
      </h2>
      <p class="periodoLabel pb-2">
        {$t("layout.periodoMonitoraggio")}
        <span class="periodoDate">
          {$t("layout.anno")}{periodoMonitoraggio}
        </span>
      </p>
      <p>
        {@html $t("dicAutoval.APP-description", { break: "<br/>" })}
        <a
          href="https://form.agid.gov.it/home"
          title={$t("layout.externalLink")}
          target="_blank"
          rel="noreferrer"
          >form.agid.it<Icon
            name="it it-external-link"
            variant="primary"
            size="sm"
            customClass="ms-1 mb-1"
          /></a
        >
        {$t("dicAutoval.description2")}
        <a
          href={$t("dicAutoval.direttivaLink")}
          title={$t("layout.externalLink")}
          target="_blank"
          rel="noreferrer"
          >{$t("dicAutoval.direttiva")}<Icon
            name="it it-external-link"
            variant="primary"
            size="sm"
            customClass="ms-1 mb-1"
          /></a
        >.
      </p>
    </div>
    {#if data}
      <div class="col-12 d-flex flex-wrap justify-content-center text-center">
        {#each data as item}
          <div class="col-12 col-lg-4 my-4">
            <span aria-hidden="true"
              ><Icon
                name={iconeConformita[item.conformita_it]}
                size={"xl"}
                variant={"primary"}
              />
            </span>

            <p class="cardTitle mb-3 mt-3" style="color: #0066CC;">
              {item[`conformita_${$locale}`].charAt(0).toUpperCase() +
                item[`conformita_${$locale}`].slice(1)}
            </p>
            <p class="cardMainData" style="color: #0066CC;">
              {nf(item.total)}
            </p>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
