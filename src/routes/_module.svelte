<script>
  import Header from "../lib/components/Header.svelte";
  import DashboardTabs from "../lib/components/DashboardTabs.svelte";
  import Footer from "../lib/components/Footer.svelte";
  import Icon from "../lib/components/Icon.svelte";
  import { visibleTooltip, isFocus } from "../store/tooltip";
  import Feedback from "../lib/components/Feedback.svelte";
  import { locale, t } from "../lib/utils/i18n";
  import { activeRoute } from "@roxi/routify";

  let { children } = $props();

  let innerWidth = $state(0);
  let selectedPage = $state("");
  let innerHeight = $state(0);
  let scrollY = $state(0);
  let isSticky = $state(false);

  $effect(() => {
    selectedPage = $activeRoute.url;
    isSticky = scrollY > innerHeight * 0.05;
  });

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
  onclick={(e) => onClick(e)}
  onkeydown={(e) => {
    if (e.key === "Enter") {
      onClick(e);
    }
  }}
  bind:innerHeight
  onscroll={() => {
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
    <!-- svelte-ignore a11y_invalid_attribute -->
    <a
      href="#"
      data-bs-toggle="backtotop"
      class="back-to-top {innerWidth <= 992 && 'back-to-top-small'}"
      aria-label={$t("layout.tornaSu")}
    >
      <Icon
        name="it it-arrow-up"
        isImg={true}
        variant="light"
        ariaLabel={$t("layout.tornaSu")}
        ariaHidden={true}
      />
    </a>
    <!-- svelte-ignore slot_element_deprecated -->
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

  #main {
    min-height: 66vh;
  }
</style>
