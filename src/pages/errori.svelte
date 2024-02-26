<script>
  import ErroriMainCard from "../lib/components/ErroriMainCard.svelte";
  import ErroriPdfTable from "../lib/components/ErroriPDFTable.svelte";
  import ErroriPerSitiTable from "../lib/components/ErroriPerSitiTable.svelte";
  import ErroriPrincipio from "../lib/components/ErroriPrincipio.svelte";
  import { t } from "../lib/utils/i18n";

</script>

<svelte:head>
  <title>{$t("errori.pagename")}</title>
</svelte:head>

<section aria-label={$t("errori.section")}>
  <div class="container mb-5">
    <ErroriMainCard />
  </div>
  <div class="container my-5" style="padding-left: 0 !important; padding-right: 0 !important;">
    <ErroriPerSitiTable />
  </div>
  <ErroriPrincipio />
  <div class="container my-5" style="padding-left: 0 !important; padding-right: 0 !important;">
    <ErroriPdfTable />
  </div>
</section>

<style lang="scss">
  section {
    margin-top: 1.3em;
  }
</style>
