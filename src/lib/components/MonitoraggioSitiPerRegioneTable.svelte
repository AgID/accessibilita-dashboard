<script lang="ts">
  import { onMount } from "svelte";
  import { nf, pm, nf2d } from "../utils";
  import DataTable from "./DataTable.svelte";
  let response;
  let loading = true;
  onMount(async () => {
    const rs = await fetch("/data/monitoraggio_per_regione.json");
    response = await rs.json();
    loading = false;
  });

  const columns = [
    { field: "des_regione", label: "Regione o Provincia autonoma" },
    {
      field: "num_siti",
      label: "Numero Siti",
      format: (value: any) => nf(value),
      align: "right",
    },
    {
      field: "incidenza_errori",
      label: "Incidenza errori",
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
      title="Monitoraggio siti per regione o provincia autonoma"
      didascalia={true}
      defaultSortBy="num_siti"
      periodoMonitoraggio={pm(response?.intestazione?.periodo_monitoraggio)}
      tooltipClasses="mx-1"
    >
      <div slot="didascaliaSlot" class="didascalia">
        L’incidenza errori è una misura percentuale che si riferisce ai criteri
        di successo non soddisfatti, valutabili dal monitoraggio automatizzato,
        riscontrati su un campione di siti della PA
      </div>
    </DataTable>
  </div>
{/if}
