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
  <div class="container">
    <MainCard />
  </div>
  <div class="container">
    <CriteriTable />
  </div>
  <PrincipioHalf />
  <div class="container">
    <PdfTable />
  </div>
</section>

<style>
  section {
    margin-top: 1.3em;
  }
</style>
