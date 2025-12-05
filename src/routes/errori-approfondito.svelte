<script>
  import { t } from "../lib/utils/i18n";
  import MainCardApp from "../lib/components/errori/MainCardApp.svelte";
  import CriteriTableSiti from "../lib/components/errori/CriteriTableAppSiti.svelte";
  import CriteriTablePdf from "../lib/components/errori/CriteriTableAppPdf.svelte";
  import CriteriTableApp from "../lib/components/errori/CriteriTableAppApp.svelte";
  import HalfCardApp from "../lib/components/errori/HalfCardApp.svelte";
</script>

<svelte:head>
  <title>{$t("errori.pagename")}</title>
</svelte:head>

<section aria-label={$t("errori.section")}>
  <div class="container mb-5">
    <MainCardApp />
    <CriteriTableSiti />
    <CriteriTablePdf />
    <HalfCardApp />
    <CriteriTableApp />
  </div>
</section>

<style>
  section {
    margin-top: 1.3em;
  }
</style>
