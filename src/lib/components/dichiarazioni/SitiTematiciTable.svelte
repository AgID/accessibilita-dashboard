<script lang="ts">
  import { onMount } from "svelte";
  import { nf } from "../../utils";
  import DataTable from "../DataTable.svelte";
  import { t } from "../../utils/i18n";

  let response;
  let loading = true;
  const columns = [
    {
      field: "des_regione",
      label: $t("dicTemaTable.regione"),
      align: "left",
    },
    {
      field: "num_siti_tot",
      label: $t("dicTemaTable.totale"),
      format: (value: any) => nf(value),
      align: "right",
    },
    {
      field: "num_siti_tematici_con_dich",
      label: $t("dicTemaTable.numeroTema"),
      format: (value: any) => nf(value),
      align: "right",
    },
    {
      field: "num_enti_con_dich_istituzionali",
      label: $t("dicTemaTable.numeroIst"),
      format: (value: any) => nf(value),
      align: "right",
    },
  ];

  let annoRiferimento;

  onMount(async () => {
    const rs = await fetch("/data/dichiarazione_tematici_regione.json");
    response = await rs.json();
    loading = false;
    annoRiferimento = response.intestazione.anno_dichiarazione;
  });
</script>

{#if !loading}
  <DataTable
    {columns}
    rows={response?.data}
    defaultSortBy="num_siti_tematici_con_dich"
    title={$t("dicTemaTable.title")}
    periodoMonitoraggio="{$t('layout.anno')}{annoRiferimento}"
    didascalia={true}
  >
    <div slot="didascaliaSlot" class="didascalia">
      {@html $t("dicTemaTable.description", { break: "<br/>" })}
    </div>
  </DataTable>
{/if}
