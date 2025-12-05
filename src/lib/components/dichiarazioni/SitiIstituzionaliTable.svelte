<script lang="ts">
  import { onMount } from "svelte";
  import { nf, nf1d, nf2d } from "../../utils";
  import DataTable from "../DataTable.svelte";
  import { t } from "../../utils/i18n";

  let response = $state({
    intestazione: {
      anno_dichiarazione: 0,
      dat_ult_agg_dichiarazione: "",
    },
    data: [],
  });
  let loading = $state(true);
  const columns = [
    {
      field: "des_regione",
      label: $t("dicIstTable.regione"),
      align: "left",
    },
    {
      field: "num_enti_tot",
      label: $t("dicIstTable.totale"),
      format: (value: any) => nf(value),
      align: "right",
    },
    {
      field: "num_enti_con_dich_istituzionali",
      label: $t("dicIstTable.numero"),
      format: (value: any) => nf(value),
      align: "right",
    },
    {
      field: "perc_enti_con_dich_istit_su_enti_tot",
      label: $t("dicIstTable.percentuale"),
      format: (value: any) => nf1d(value) + "%",
      formatDownload: (value: any) => nf2d(value) + "%",
      align: "right",
    },
  ];

  let annoRiferimento = $state(0);

  onMount(async () => {
    const rs = await fetch("/data/dichiarazione_istituzionali_regione.json");
    response = await rs.json();
    loading = false;
    annoRiferimento = response.intestazione.anno_dichiarazione;
  });
</script>

{#if !loading}
  <DataTable
    {columns}
    rows={response?.data}
    defaultSortBy="num_enti_con_dich_istituzionali"
    title={$t("dicIstTable.title")}
    periodoMonitoraggio="{$t('layout.anno')}{annoRiferimento}"
    didascalia={true}
  >
    {#snippet didascaliaSlot()}
      <div class="didascalia">
        {@html $t("dicIstTable.description", {
          anno: annoRiferimento,
          break: "<br/>",
        })}
      </div>
    {/snippet}
  </DataTable>
{/if}
