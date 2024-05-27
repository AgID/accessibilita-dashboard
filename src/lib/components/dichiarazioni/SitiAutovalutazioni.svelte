<script>
  import { onMount } from "svelte";
  import { nf } from "../../utils";
  import { locale, t } from "../../utils/i18n";
  import Icon from "../Icon.svelte";

  let data;

  let annoRiferimento

  let iconeConformita = {
    conforme: "it it-check-circle",
    "parzialmente conforme": "it it-error",
    "non conforme": "it it-close-circle",
  };

  let ordineConformita = ["conforme", "parzialmente conforme", "non conforme"];

  onMount(async () => {
    const response = await fetch("/data/dichiarazione_conformita.json");
    data = await response.json();
    let orderedConformita = [];
    ordineConformita.forEach((op) => {
      orderedConformita.push(data.find((erp) => erp.conformita_it == op));
    });
    data = orderedConformita;

    const riferimento = await fetch("/data/dichiarazione_intestazione.json");
    const dataRiferimento = await riferimento.json()
    annoRiferimento = dataRiferimento[0].dat_ult_agg_dichiarazione.substr(0, 4)
  });
</script>

<div class="backgroundLightBlue py-5 px-xxl-5 my-5">
  <div class="container">
    <div class="mx-auto">
      <h3 class="h3 pb-4 text-center greyText">{$t("dicAutoval.SITI-title")}</h3>
      <div>
        <p class="mt-lg-3 mx-3 text-center">{$t("dicAutoval.SITI-description", {
          anno: annoRiferimento,
        })}</p>
        <div class="d-flex justify-content-center mx-5">
          {#if data}
            <div
              class="col-12 d-flex flex-wrap justify-content-center text-center"
            >
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
                    { item[`conformita_${$locale}`].charAt(0).toUpperCase() +
                    item[`conformita_${$locale}`].slice(1)}
                  </p>
                  <p class="cardMainData" style="color: #0066CC;">
                    {nf(item.num_dichiarazioni_pub)}
                  </p>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
