<script>
  import OpenDataMainCard from "../lib/components/OpenDataMainCard.svelte";
  import OpenDataTable from "../lib/components/OpenDataTable.svelte";
  import { t } from "../lib/utils/i18n";
</script>

<svelte:head>
  <title>{$t("opendata.pagename")}</title>
</svelte:head>

<section aria-label={$t("opendata.section")}>
  <div class="container">
    <OpenDataMainCard />
    <OpenDataTable />
  </div>
</section>

<style>
  section {
    margin-top: 1.3em;
  }
</style>
