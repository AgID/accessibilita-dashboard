<script lang="ts">
  import { onMount } from "svelte";
  import { nf, nf2d } from "../utils";
  import DataTable from "./DataTable.svelte";
  import { t } from "../utils/i18n";
  
  let response;
  let loading = true;
  const columns = [
    {
      field: "des_regione",
      label: $t("obiTable.regione"),
      align: "left",
    },
    {
      field: "num_enti_tot",
      label: $t("obiTable.numero"),
      format: (value: any) => nf(value),
      align: "right",
    },
    {
      field: "num_enti_obiettivi",
      label: $t("obiTable.obiettivi"),
      format: (value: any) => nf(value),
      align: "right",
    },
    {
      field: "perc_enti_obiettivi_su_tot",
      label: $t("obiTable.percentuale"),
      format: (value: any) => nf2d(value) + "%",
      align: "right",
    },
  ];
  onMount(async () => {
    const rs = await fetch("/data/obiettivi_regione.json");
    response = await rs.json();
    loading = false;
  });
</script>

{#if !loading}
  <DataTable
    {columns}
    rows={response?.data}
    defaultSortBy="num_enti_obiettivi"
    title={$t("obiTable.title")}
    periodoMonitoraggio={response?.intestazione?.anno}
    didascalia={true}
  >
    <div slot="didascaliaSlot" class="didascalia">
      {$t("obiTable.description")}
    </div>
  </DataTable>
{/if}
