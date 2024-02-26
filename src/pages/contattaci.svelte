<script>
  import ContattiMain from "../lib/components/ContattiMain.svelte";
  import { t } from "../lib/utils/i18n";

</script>

<svelte:head>
  <title>{$t("contattaci.pagename")}</title>
</svelte:head>

<section aria-label="Sezione contatti">
  <ContattiMain />
</section>
