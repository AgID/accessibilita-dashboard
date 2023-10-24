<script>
  import Header from "../lib/components/Header.svelte";
  import DashboardTabs from "../lib/components/DashboardTabs.svelte";
  import Footer from "../lib/components/Footer.svelte";
  import Icon from "../lib/components/Icon.svelte";
  import { visibleTooltip, isFocus } from "../store/tooltip";
  import Feedback from "../lib/components/Feedback.svelte";
  import { resetValue } from "../store/feedback";
  let headHeight;
  let innerWidth;
  let selectedPage = window?.location.pathname;
  $: {
    selectedPage = window?.location.pathname || "";
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
/>

<a href="#main" class="screenreader-text" id="skipContentuto"
  >Salta a contenuto principale</a
>
<div>
  <div bind:clientHeight={headHeight}>
    <header class="it-header-wrapper">
      <Header bind:selectedPage />
      {#if innerWidth >= 992}
        <DashboardTabs bind:selectedPage />
      {/if}
    </header>
  </div>
  <main id="main">
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a
      href="#"
      aria-hidden="true"
      data-bs-toggle="backtotop"
      class="back-to-top {innerWidth <= 992 && 'back-to-top-small'}"
    >
      <Icon name="it it-arrow-up" variant="light" isButton={true} />
    </a>
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
</style>
