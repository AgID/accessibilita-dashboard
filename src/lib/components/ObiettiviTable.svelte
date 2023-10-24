<script lang="ts">
  import { onMount } from "svelte";
  import { nf, nf2d } from "../utils";
  import DataTable from "./DataTable.svelte";

  let response;
  let loading = true;
  const columns = [
    {
      field: "des_regione",
      label: "Regione o Provincia autonoma",
      align: "left",
    },
    {
      field: "num_enti_tot",
      label: "Totale enti censiti su IPA ",
      format: (value: any) => nf(value),
      align: "right",
    },
    {
      field: "num_enti_obiettivi",
      label: "Obiettivi di accessibilità",
      format: (value: any) => nf(value),
      align: "right",
    },
    {
      field: "perc_enti_obiettivi_su_tot",
      label: "Obiettivi rispetto agli enti censiti su IPA",
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
    title="Obiettivi di accessibilità"
    periodoMonitoraggio={response?.intestazione?.anno}
    didascalia={true}
  >
    <div slot="didascaliaSlot" class="didascalia">
      La tabella riporta il totale degli obiettivi pubblicati e il rapporto percentuale rispetto gli enti censiti su IPA per regione e provincia autonoma.
    </div>
  </DataTable>
{/if}
