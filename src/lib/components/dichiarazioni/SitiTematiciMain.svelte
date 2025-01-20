<script>
  import KpiSimpleCard from "../KpiSimpleCard.svelte";
  import { onMount } from "svelte";
  import { dp, df, nf } from "../../utils";
  import { t } from "../../utils/i18n";

  let numDichiarazioniTematici;
  let annoRiferimento;

  onMount(async () => {
    const rs = await fetch("/data/dichiarazione_tematici_intestazione.json");
    const data = await rs.json();
    numDichiarazioniTematici = data.find(
      (d) => d.indicatore == "num_siti_tematici_con_dich_anno_corrente"
    ).valore;
    annoRiferimento = data[0].anno_dichiarazione;
  });
</script>

<div class="my-5">
  <h2 class="lead pt-5">{$t("dicTemaMain.title")}</h2>
  <div class="row py-3">
    <div class="col-12 col-lg-7">
      <p class="pe-lg-4">
        {@html $t("dicTemaMain.description", { break: "<br/>" })}
      </p>
    </div>
    <div class="col-12 mx-lg-0 col-lg-5">
      <KpiSimpleCard
        title={$t("dicTemaMain.cardOneTitle", { anno: annoRiferimento })}
        kpi={nf(numDichiarazioniTematici)}
      />
    </div>
  </div>
</div>
