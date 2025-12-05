<script lang="ts">
  import { onMount } from "svelte";
  import { nf, pm, nf2d, nf1d } from "../../utils";
  import DataTable from "../DataTable.svelte";
  import { t } from "../../utils/i18n";

  let response = $state({
    intestazione: {
      periodo_monitoraggio: "",
      dat_ultimo_aggiornamento: "",
    },
    data: [],
  });
  let loading = $state(true);
  onMount(async () => {
    const rs = await fetch("/data/monitoraggio_per_regione.json");
    response = await rs.json();
    loading = false;
  });

  const columns = [
    { field: "des_regione", label: $t("moniRegTable.regione") },
    {
      field: "num_siti",
      label: $t("moniRegTable.numero"),
      format: (value: any) => nf(value),
      align: "right",
    },
    {
      field: "incidenza_errori",
      label: $t("moniRegTable.errori"),
      format: (value: any) => nf1d(value) + "%",
      formatDownload: (value: any) => nf2d(value) + "%",
      align: "right",
    },
  ];
</script>

{#if !loading}
  <DataTable
    {columns}
    rows={response?.data}
    title={$t("moniRegTable.title")}
    didascalia={true}
    defaultSortBy="num_siti"
    periodoMonitoraggio={pm(response?.intestazione?.periodo_monitoraggio)}
  >
    {#snippet didascaliaSlot()}
      <div class="didascalia">
        {$t("moniRegTable.description")}
      </div>
    {/snippet}
  </DataTable>
{/if}
