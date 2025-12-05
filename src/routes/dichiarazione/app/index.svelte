<script>
  import APPMainCard from "../../../lib/components/dichiarazioni/AppMainCard.svelte";
  import APPLineChart from "../../../lib/components/dichiarazioni/AppLineChart.svelte";
  import ConfrontoAppChart from "../../../lib/components/dichiarazioni/AppConfrontoOSChart.svelte";
  import APPAutovalutazioni from "../../../lib/components/dichiarazioni/AppAutovalutazioni.svelte";
  import AppConformita from "../../../lib/components/dichiarazioni/AppConfrontoConformita.svelte";
  import AppTable from "../../../lib/components/dichiarazioni/AppTable.svelte";

  import { t } from "../../../lib/utils/i18n";
</script>

<svelte:head>
  <title>{$t("dichiarazioni.APP-pagename")}</title>
</svelte:head>

<section aria-label={$t("dichiarazioni.APP-section")}>
  <div class="container">
    <APPMainCard />
  </div>
  <div
    class="d-flex flex-wrap container px-0 justify-content-between flex-wrap align-items-stretch"
  >
    <div class="col-12">
      <APPLineChart />
      <ConfrontoAppChart />
    </div>
  </div>

  <APPAutovalutazioni />

  <div class="container">
    <AppConformita />
    <AppTable />
  </div>

  <div class="container mb-5"></div>
</section>

<style>
  section {
    margin-top: 1.3em;
  }
</style>
