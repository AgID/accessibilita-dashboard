<script lang="ts">
  import { onMount } from "svelte";
  import { locale, t } from "../utils/i18n";
  import DataTable from "./DataTable.svelte";
  let response = $state([]);
  let loading = $state(true);
  let columns = $state([]);
  let innerWidth = $state(0);

  const bigColumns = [
    { field: `periodo_${$locale}`, label: $t("opendata.tablePeriod") },
    {
      field: `nome_${$locale}`,
      label: $t("opendata.tableName"),
    },
    {
      field: `descrizione_${$locale}`,
      label: $t("opendata.tableDesc"),
    },
    {
      field: "action",
      label: $t("opendata.tableFormat"),
    },
  ];

  const smallColumns = [
    { field: `periodo_${$locale}`, label: $t("opendata.tablePeriod") },
    {
      field: `nome_${$locale}`,
      label: $t("opendata.tableName"),
    },
    {
      field: "action",
      label: $t("opendata.tableFormat"),
    },
  ];

  onMount(async () => {
    const rs = await fetch("/data/opendata.json");
    response = await rs.json();
    loading = false;
  });

  $effect(() => {
    innerWidth < 768 ? (columns = smallColumns) : (columns = bigColumns);
  });
</script>

<svelte:window bind:innerWidth />
{#if !loading}
  <DataTable
    {columns}
    rows={response}
    canDownload={false}
    defaultSortBy={`periodo_${$locale}`}
    title={$t("opendata.subtitle")}
  />
{/if}
