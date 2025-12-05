<script lang="ts">
  import { onMount } from "svelte";
  import { nf, nf1d, nf2d, pm } from "../utils";
  import DataTable from "./DataTable.svelte";
  import { t } from "../utils/i18n";
  import Icon from "./Icon.svelte";

  let response = $state({
    intestazione: {
      anno_obiettivi: 0,
      aggior_ultimo_trimestre: "",
      dat_ult_agg_obiettivi: "",
    },
    data: [],
  });

  let periodoRiferimento = $state("");
  let loading = $state(true);
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
      format: (value: any) => nf1d(value) + "%",
      formatDownload: (value: any) => nf2d(value) + "%",
      align: "right",
    },
  ];
  onMount(async () => {
    const rs = await fetch("/data/obiettivi_regione.json");
    response = await rs.json();
    loading = false;
    periodoRiferimento = pm(response?.intestazione?.aggior_ultimo_trimestre);
  });
</script>

{#if !loading}
  <DataTable
    {columns}
    rows={response?.data}
    defaultSortBy="num_enti_obiettivi"
    title={$t("obiTable.title")}
    periodoMonitoraggio={periodoRiferimento}
    didascalia={true}
  >
    {#snippet didascaliaSlot()}
      <div class="didascalia">
        {$t("obiTable.description1")}
        <a
          title={$t("layout.externalLink")}
          target="_blank"
          rel="noreferrer"
          href="https://www.indicepa.gov.it/ipa-portale/"
          >{$t("obiTable.description2")}<Icon
            name="it it-external-link"
            variant="primary"
            size="sm"
            customClass="ms-1 mb-1"
          /></a
        >{$t("obiTable.description3")}
      </div>
    {/snippet}
  </DataTable>
{/if}
