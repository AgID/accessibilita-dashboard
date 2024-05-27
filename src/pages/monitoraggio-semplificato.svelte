<script>
  import { t } from "../lib/utils/i18n";
  import MainCardSemp from "../lib/components/monitoraggio/MainCardSemp.svelte";
  import SitiPerRegioneTable from "../lib/components/monitoraggio/SitiPerRegioneTable.svelte";
  import SitiSettoreSemp from "../lib/components/monitoraggio/SitiSettoreSemp.svelte";
  import PdfCardSemp from "../lib/components/monitoraggio/PdfCardSemp.svelte";
  import PdfChartSemp from "../lib/components/monitoraggio/PdfChartSemp.svelte";
  import SitiAreaGeoSemp from "../lib/components/monitoraggio/SitiAreaGeoSemp.svelte";
</script>

<svelte:head>
  <title>{$t("monitoraggio.pagename")}</title>
</svelte:head>

<section aria-label={$t("monitoraggio.section")}>
  <div class="container">
    <MainCardSemp />
    <SitiAreaGeoSemp />
  </div>

  <SitiSettoreSemp />

  <div class="container">
    <PdfCardSemp />
    <PdfChartSemp />
    <div class="my-5">
      <SitiPerRegioneTable />
    </div>
  </div>
</section>

<style lang="scss">
  section {
    margin-top: 1.3em;
  }
</style>
