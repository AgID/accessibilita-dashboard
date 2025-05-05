<script lang="ts">
  import { t } from "../lib/utils/i18n";
</script>

<svelte:head>
  <title>{$t("fallback.pagename")}</title>
</svelte:head>

<section class="section text-center" aria-label={$t("fallback.errorMessage")}>
  <h1 class="error-page-title">{$t("fallback.error")}</h1>
  <p class="lead mb-3">{$t("fallback.errorMessage")}</p>
  <p class="mb-5">
    <!-- svelte-ignore a11y-invalid-attribute -->
    {$t("fallback.description")}, <br />
    <a href="javascript:history.back();" title={$t("fallback.link")}
      >{$t("fallback.linkText")}</a
    >
    {$t("fallback.descriptionPt2")}
  </p>

  <a
    href="/"
    class="button-text a-button"
    style="text-decoration: none; text-transform:uppercase;"
  >
    {$t("fallback.button")}</a
  >
</section>

<style lang="scss">
  .error-page-title {
    font-size: 11.2em;
    font-weight: 700;
    color: #0066cc;
  }

  .a-button {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 24px;
    gap: 8px;
    border: none;
    width: 210px;
    height: 52px;
    background: #0066cc;
    border-radius: 4px;
  }

  .a-button:hover {
    background: #004c99;
  }

  .a-button:active {
    background: #003366;
  }
</style>
