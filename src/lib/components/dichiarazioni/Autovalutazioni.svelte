<script>
  import { onMount } from "svelte";
  import { nf } from "../../utils";
  import { locale, t } from "../../utils/i18n";
  import Icon from "../Icon.svelte";

  let dataTOTALE;
  let dataSITI;
  let dataAPP
  let annoRiferimento

  let iconeConformita = {
    conforme: "it it-check-circle",
    "parzialmente conforme": "it it-error",
    "non conforme": "it it-close-circle",
  };

  let ordineConformita = ["conforme", "parzialmente conforme", "non conforme"];

  onMount(async () => {
    const responseSITI = await fetch("/data/dichiarazione_conformita.json");
    dataSITI = await responseSITI.json();    
    const responseAPP = await fetch("/data/dichiarazione_app_so_conformita.json");
    let jsonData = await responseAPP.json();
    dataAPP = jsonData.data;
    
    dataTOTALE = dataSITI.map(tipoConformita => ({ ...tipoConformita, num_dichiarazioni_pub: 0 }));

    dataTOTALE.forEach(item => {
      const siti = dataSITI.find(siti => siti.conformita_it === item.conformita_it);
      if (siti) { item.num_dichiarazioni_pub += siti.num_dichiarazioni_pub }
      const app = dataAPP.find(app => app.conformita_it === item.conformita_it);
      if (app) { item.num_dichiarazioni_pub += (app.android + app.ios) }
    });

    let orderedConformita = [];
    ordineConformita.forEach((op) => {
      orderedConformita.push(dataTOTALE.find((erp) => erp.conformita_it == op));
    });

    dataTOTALE = orderedConformita;
  
    annoRiferimento = jsonData.intestazione.dat_ult_agg_dichiarazione.substr(0, 4);
  });
</script>

<div class="backgroundLightBlue py-5 px-xxl-5 my-5">
  <div class="container">
    <div class="mx-auto">
      <h3 class="h3 pb-4 text-center greyText">{$t("dicAutoval.title")}</h3>

      <div>
        <p class="mt-lg-3 mx-3 text-center">{$t("dicAutoval.description", {
          anno: annoRiferimento,
        })}</p>
        <div class="d-flex justify-content-center mx-5">
          {#if dataTOTALE}
            <div
              class="col-12 d-flex flex-wrap justify-content-center text-center"
            >
              {#each dataTOTALE as item}
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
