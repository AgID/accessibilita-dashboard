<script>
  import ProgettoMain from "../lib/components/ProgettoMain.svelte";
  import { t } from "../lib/utils/i18n";

</script>

<svelte:head>
  <title>{$t("progetto.pagename")}</title>
</svelte:head>

<section aria-label={$t("progetto.section")}>
  <ProgettoMain />
</section>
