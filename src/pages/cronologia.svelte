<script>
  import CronologiaMain from "../lib/components/Cronologia.svelte";
  import { t } from "../lib/utils/i18n";

  </script>
  
  <svelte:head>
    <title>{$t("timeline.pagename")}</title>
  </svelte:head>
  
  <section aria-label={$t("timeline.section")}>
    <div class="container">
        <CronologiaMain />
    </div>
  </section>

<style lang="scss">
  section {
    margin-top: 1.3em;
  }
</style>
  