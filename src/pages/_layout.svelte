<script>
  import Header from "../lib/components/Header.svelte";
  import DashboardTabs from "../lib/components/DashboardTabs.svelte";
  import Footer from "../lib/components/Footer.svelte";
  import Icon from "../lib/components/Icon.svelte";
  import { visibleTooltip, isFocus } from "../store/tooltip";
  import { page } from "@roxi/routify";
  import Feedback from "../lib/components/Feedback.svelte";
  import { locale, t } from "../lib/utils/i18n";
  import { resetValue } from "../store/feedback";

  let innerWidth;
  let selectedPage = $page.path || "";
  let innerHeight;
  let scrollY = 0;
  let isSticky = false;
  $: isSticky = scrollY > innerHeight * 0.05;

  $: {
    selectedPage = $page.path || "";
    resetValue();
  }
  function onClick(e) {
    const elementId = e.srcElement.id;
    if (
      elementId.startsWith("tooltip") &&
      ($isFocus || elementId != $visibleTooltip)
    ) {
      visibleTooltip.set(elementId);
      $isFocus = false;
    } else {
      visibleTooltip.set("");
    }
  }
</script>

<svelte:window
  bind:innerWidth
  on:click={(e) => onClick(e)}
  on:keydown={(e) => {
    if (e.key === "Enter") {
      onClick(e);
    }
  }}
  bind:innerHeight
  on:scroll={() => {
    scrollY = window.scrollY;
  }}
/>

<a
  href="#main"
  class="m-1 px-1 screenreader-text skip-style"
  id="skipContentuto">{$t("layout.skipLink")}</a
>
<div>
  <header class="it-header-wrapper">
    <Header bind:selectedPage bind:isSticky />
    {#if innerWidth >= 992}
      <DashboardTabs bind:selectedPage bind:isSticky />
    {/if}
  </header>
  <main id="main">
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a
      href="#"
      data-bs-toggle="backtotop"
      class="back-to-top {innerWidth <= 992 && 'back-to-top-small'}"
    >
      <Icon
        name="it it-arrow-up"
        variant="light"
        isButton={true}
        ariaLabel="Back-To-Top Arrow"
      />
    </a>
    {#key $locale}
      <slot />
    {/key}
  </main>
  <footer>
    <div>
      <Feedback />
      <Footer />
    </div>
  </footer>
</div>

<style lang="scss">
  .screenreader-text {
    position: absolute;
    left: -999px;
    width: 1px;
    height: 1px;
    top: auto;

    &:focus {
      display: inline-block;
      height: auto;
      width: auto;
      position: static;
      margin: auto;
    }
  }

  .skip-style {
    &:focus {
      border: 2px solid #f90 !important;
    }
  }
</style>
