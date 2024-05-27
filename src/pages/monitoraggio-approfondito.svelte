<script>
  import { t } from "../lib/utils/i18n";
  import MainCardApp from "../lib/components/monitoraggio/MainCardApp.svelte";
  import SitiAreaGeoApp from "../lib/components/monitoraggio/SitiAreaGeoApp.svelte";
  import SitiSettoreApp from "../lib/components/monitoraggio/SitiSettoreApp.svelte";
  import PdfCardApp from "../lib/components/monitoraggio/PdfCardApp.svelte";
  import PdfChartApp from "../lib/components/monitoraggio/PdfChartApp.svelte";
  import AppCard from "../lib/components/monitoraggio/AppCard.svelte";
  import AppChart from "../lib/components/monitoraggio/AppChart.svelte";

  </script>
  
  <svelte:head>
    <title>{$t("monitoraggio.pagename")}</title>
  </svelte:head>
  
  <section aria-label={$t("monitoraggio.section")}>
    <div class="container">
      <MainCardApp />
      <SitiAreaGeoApp />
    </div>
  
     <SitiSettoreApp /> 

     <div class="container">
      <PdfCardApp />
      <PdfChartApp />

      <AppCard />
      <AppChart />
     </div>
  </section>
  
  <style lang="scss">
    section {
      margin-top: 1.3em;
    }
  </style>
  