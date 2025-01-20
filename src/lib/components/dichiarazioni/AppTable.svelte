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
      label: $t("dicAppTable.regione"),
      align: "left",
    },
    {
      field: "Android",
      label: $t("dicAppTable.numeroAndroid"),
      format: (value: any) => nf(value),
      align: "right",
    },
    {
      field: "iOS",
      label: $t("dicAppTable.numeroIos"),
      format: (value: any) => nf(value),
      align: "right",
    },
  ];

  let annoRiferimento;

  onMount(async () => {
    const rs = await fetch("/data/dichiarazione_app_so_regione.json");
    response = await rs.json();
    loading = false;

    annoRiferimento = response.intestazione.anno_dichiarazione;
  });
</script>

{#if !loading}
  <DataTable
    {columns}
    rows={response?.data}
    defaultSortBy="android"
    title={$t("dicAppTable.title", { anno: annoRiferimento })}
    periodoMonitoraggio="{$t('layout.anno')}{annoRiferimento}"
    didascalia={true}
  >
    <div slot="didascaliaSlot" class="didascalia">
      {$t("dicAppTable.description", {
        year: annoRiferimento,
        nextYear: +annoRiferimento + 1,
      })}
    </div>
  </DataTable>
{/if}
