<script>
  import { onMount } from "svelte";
  import { nf } from "../utils";
  import Icon from "./Icon.svelte";

  let data;
  let annoRiferimento;

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
      orderedConformita.push(data.find((erp) => erp.conformita == op));
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
      <h3 class="h3 greyText pb-4 text-center">
        L’autovalutazione dei siti delle PA
      </h3>

      <div>
        <p class="mt-lg-3 mx-3 mx-lg-5 text-center">
          Nell’autovalutazione di accessibilità le PA dichiarano lo stato di
          conformità dei loro siti web sulla base delle verifiche di
          accessibilità che sono state effettuate in precedenza. Il sito è
          "conforme" se non è stato rilevato alcun errore, "parzialmente
          conforme" se gli errori sono inferiori al 50% dei criteri di successo,
          "non conforme" se gli errori superano il 50% dei criteri di successo.
          Le dichiarazioni di accessibilità compilate dalle PA sono conformi by
          design, grazie al form predisposto da AgID, alla Direttiva UE
          2016/2102. I seguenti dati sono relativi al {annoRiferimento}.
        </p>
        <div class="d-flex justify-content-center mx-5">
          {#if data}
            <div
              class="col-12 d-flex flex-wrap justify-content-center text-center"
            >
              {#each data as item}
                <div class="col-12 col-lg-4 my-4">
                  <span aria-hidden="true"
                    ><Icon
                      name={iconeConformita[item.conformita]}
                      size={"xl"}
                      variant={"primary"}
                    /></span
                  >

                  <p class="cardTitle mb-3 mt-3 greyText">
                    {item.conformita.charAt(0).toUpperCase() +
                      item.conformita.slice(1)}
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
