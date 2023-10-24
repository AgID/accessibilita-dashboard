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
      label: "Totale dei siti istituzionali (IPA)",
      format: (value: any) => nf(value),
      align: "right",
    },
    {
      field: "num_enti_con_dich_istituzionali",
      label: "Dichiarazioni siti istituzionali",
      format: (value: any) => nf(value),
      align: "right",
    },
    {
      field: "perc_enti_con_dich_istit_su_enti_tot",
      label: "Siti istituzionali con dichiarazione rispetto al totale",
      format: (value: any) => nf2d(value) + "%",
      align: "right",
    },
  ];
  onMount(async () => {
    const rs = await fetch("/data/dichiarazione_istituzionali_regione.json");
    response = await rs.json();
    loading = false;
  });
</script>

{#if !loading}
  <DataTable
    {columns}
    rows={response?.data}
    defaultSortBy="num_enti_con_dich_istituzionali"
    title="Dichiarazioni di accessibilità dei siti istituzionali"
    periodoMonitoraggio={response?.intestazione?.periodo_dichiarazioni}
    didascalia={true}
  >
    <div slot="didascaliaSlot" class="didascalia">
      La tabella riporta il totale dei siti istituzionali censiti sul catalogo
      IPA per ciascuna regione e il numero di siti istituzionali che hanno
      pubblicato almeno una dichiarazione di accessibilità entro il 23 settembre
      2022. L’ultima colonna evidenzia il rapporto tra il numero dei siti
      istituzionali che hanno pubblicato la dichiarazione di accessibilità sul
      totale dei siti totali censiti su IPA.
    </div>
  </DataTable>
{/if}
