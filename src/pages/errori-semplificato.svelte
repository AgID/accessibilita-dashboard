<script>
  import MainCard from "../lib/components/errori/MainCardSemp.svelte";
  import PdfTable from "../lib/components/errori/PDFTable.svelte";
  import CriteriTable from "../lib/components/errori/CriteriTableSemp.svelte";
  import PrincipioHalf from "../lib/components/errori/DistribuzionePrincipioHalf.svelte";
  import { t } from "../lib/utils/i18n";

</script>

<svelte:head>
  <title>{$t("errori.pagename")}</title>
</svelte:head>

<section aria-label={$t("errori.section")}>
  <div class="container mb-5">
    <MainCard />
  </div>
  <div class="container my-5" style="padding-left: 0 !important; padding-right: 0 !important;">
    <CriteriTable />
  </div>
  <PrincipioHalf />
  <div class="container my-5" style="padding-left: 0 !important; padding-right: 0 !important;">
    <PdfTable />
  </div>
</section>

<style lang="scss">
  section {
    margin-top: 1.3em;
  }
</style>
