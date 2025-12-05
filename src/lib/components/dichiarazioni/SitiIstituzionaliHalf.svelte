<script>
  import { onMount } from "svelte";
  import { nf, nf1d, nf2d } from "../../utils";
  import { t } from "../../utils/i18n";
  import KpiSimpleCard from "../KpiSimpleCard.svelte";

  let numIstituzionaliCorrente = $state();
  let percentuale;
  let datoXgrafico;
  let restoDelGrafico;
  let datoVisibile = $state();
  let totale = $state();
  let annoRiferimento = $state();

  let height = "";
  let mainHeight = $derived(height ? `height:${height};` : "");

  onMount(async () => {
    const rs = await fetch(
      "/data/dichiarazione_istituzionali_intestazione.json"
    );
    const data = await rs.json();
    numIstituzionaliCorrente = data.find(
      (d) => d.indicatore == "num_enti_con_dich_istituzionali_anno_corrente"
    ).valore;
    percentuale = data.find(
      (d) => d.indicatore == "num_perc_enti_con_dich_istituzionali_su_enti_tot"
    ).valore;
    totale = data.find((d) => d.indicatore == "num_enti_tot").valore;

    datoXgrafico = +percentuale.toFixed(2);
    restoDelGrafico = 100 - datoXgrafico;
    datoVisibile = nf1d(percentuale);

    annoRiferimento = data[0].anno_dichiarazione;
  });
</script>

<div class="blueKpiCard py-5 my-5">
  <div class="px-xxl-5">
    <div class="container">
      <div class="mx-auto">
        <div class="row justify-content-between text-left">
          <div class="col-lg-6">
            <KpiSimpleCard
              title={$t("dicIstHalf.cardTwoTitle", { anno: annoRiferimento })}
              kpi={nf(totale)}
            ></KpiSimpleCard>
          </div>
          <div class="col-lg-6">
            <KpiSimpleCard
              title={$t("dicIstHalf.cardOneTitle", { anno: annoRiferimento })}
              kpi={nf(numIstituzionaliCorrente)}
              smallerKpi="({datoVisibile}%)"
            ></KpiSimpleCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .blueKpiCard {
    background-color: #f2f7fc;
  }
</style>
