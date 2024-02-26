<script lang="ts">
  import { onMount } from "svelte";
  import { nf, pm, nf2d } from "../utils";
  import DataTable from "./DataTable.svelte";
  import { t } from "../utils/i18n";

  let response;
  let loading = true;
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
      format: (value: any) => nf2d(value) + "%",
      align: "right",
    },
  ];
</script>

{#if !loading}
  <div class="my-3">
    <DataTable
      {columns}
      rows={response?.data}
      title={$t("moniRegTable.title")}
      didascalia={true}
      defaultSortBy="num_siti"
      periodoMonitoraggio={pm(response?.intestazione?.periodo_monitoraggio)}
      tooltipClasses="mx-1"
    >
      <div slot="didascaliaSlot" class="didascalia">
        {$t("moniRegTable.description")}
      </div>
    </DataTable>
  </div>
{/if}
