<script lang="ts">
  import { onMount } from "svelte";
  import DataTable from "./DataTable.svelte";
  let response;
  let loading = true;
  let columns = [];
  let innerWidth;
  $: innerWidth < 768 ? (columns = smallColumns) : (columns = bigColumns);

  const bigColumns = [
    { field: "periodo", label: "Periodo" },
    {
      field: "nome",
      label: "Nome file",
    },
    {
      field: "descrizione",
      label: "Descrizione",
    },
    {
      field: "action",
      label: "Formato file",
    },
  ];

  const smallColumns = [
    { field: "periodo", label: "Periodo" },
    {
      field: "nome",
      label: "Nome file",
    },
    {
      field: "action",
      label: "Formato file",
    },
  ];
  onMount(async () => {
    const rs = await fetch("/data/opendata.json");
    response = await rs.json();
    loading = false;
  });
</script>

<svelte:window bind:innerWidth />
{#if !loading}
  <DataTable {columns} rows={response} canDownload={false} defaultSortBy="periodo" />
{/if}

