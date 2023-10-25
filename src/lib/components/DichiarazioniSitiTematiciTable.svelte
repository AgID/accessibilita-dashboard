<script lang="ts">
  import { onMount } from "svelte";
  import { nf } from "../utils";
  import DataTable from "./DataTable.svelte";

  let annoRiferimento
  let response;
  let loading = true;
  const columns = [
    {
      field: "des_regione",
      label: "Regione o Provincia autonoma",
      align: "left",
    },
    {
      field: "num_siti_tot",
      label: "Totale dichiarazioni di accessibilità",
      format: (value: any) => nf(value),
      align: "right",
    },
    {
      field: "num_siti_tematici_con_dich",
      label: "Dichiarazioni su siti tematici",
      format: (value: any) => nf(value),
      align: "right",
    },
    {
      field: "num_enti_con_dich_istituzionali",
      label: "Dichiarazioni su siti istituzionali",
      format: (value: any) => nf(value),
      align: "right",
    },
  ];
  onMount(async () => {
    const rs = await fetch("/data/dichiarazione_tematici_regione.json");
    response = await rs.json();
    loading = false;

    const riferimento = await fetch("/data/dichiarazione_intestazione.json");
    const dataRiferimento = await riferimento.json()
    annoRiferimento = dataRiferimento[0].dat_ult_agg_dichiarazione.substr(0, 4)

  });
</script>

{#if !loading}
  <DataTable
    {columns}
    rows={response?.data}
    defaultSortBy="num_siti_tematici_con_dich"
    title="Dichiarazioni di accessibilità pubblicate nel {annoRiferimento}"
    periodoMonitoraggio={response?.intestazione?.periodo_dichiarazioni.slice(-4)}
    didascalia={true}
  >
    <div slot="didascaliaSlot" class="didascalia">
      La tabella riporta per ciascuna regione o provincia
      autonoma il numero totale delle dichiarazioni di accessibilità pubblicate entro il
      23 settembre {annoRiferimento} (e valide fino al 23 settembre {+annoRiferimento + 1}) suddivise per i siti
      tematici ed istituzionali.
    </div>
  </DataTable>
{/if}
