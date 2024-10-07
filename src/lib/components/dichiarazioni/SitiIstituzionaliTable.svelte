<script lang="ts">
  import { onMount } from "svelte";
  import { nf, nf2d } from "../../utils";
  import DataTable from "../DataTable.svelte";
  import { t } from "../../utils/i18n";

  let response;
  let loading = true;
  const columns = [
    {
      field: "des_regione",
      label: $t("dicIstTable.regione"),
      align: "left",
    },
    {
      field: "num_enti_tot",
      label: $t("dicIstTable.totale"),
      format: (value: any) => nf(value),
      align: "right",
    },
    {
      field: "num_enti_con_dich_istituzionali",
      label: $t("dicIstTable.numero"),
      format: (value: any) => nf(value),
      align: "right",
    },
    {
      field: "perc_enti_con_dich_istit_su_enti_tot",
      label: $t("dicIstTable.percentuale"),
      format: (value: any) => nf2d(value) + "%",
      align: "right",
    },
  ];

  let annoRiferimento

  onMount(async () => {
    const rs = await fetch("/data/dichiarazione_istituzionali_regione.json");
    response = await rs.json();
    loading = false;
    annoRiferimento = response.intestazione.dat_ultimo_rilevamento.substr(0, 4)
  });
</script>

{#if !loading}
  <DataTable
    {columns}
    rows={response?.data}
    defaultSortBy="num_enti_con_dich_istituzionali"
    title={$t("dicIstTable.title")}
    periodoMonitoraggio={response?.intestazione?.periodo_dichiarazioni.slice(-4)}
    didascalia={true}
  >
    <div slot="didascaliaSlot" class="didascalia">
      {$t("dicIstTable.description", { anno: annoRiferimento })}
    </div>
  </DataTable>
{/if}
