<script>
  import Icon from "./Icon.svelte";
  let innerWidth;
  export let showDrawer = false;
  export let selectedPage;

  $: if (showDrawer) {
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  } else {
    document.body.style.overflow = "";
  }
  function closeDrawer() {
    showDrawer = false;
  }

  let firstElement;
  let lastElement;

  function tabFocusRestrictor(e) {
    if (e.target.id == "opendata-ham") {
      lastElement.blur();
      firstElement.focus();
    }
  }

  // Matomo Code
  var _paq = (window._paq = window._paq || []);
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(["trackPageView"]);
  _paq.push(["enableLinkTracking"]);
  (function () {
    var u = "https://ingestion.webanalytics.italia.it/";
    _paq.push(["setTrackerUrl", u + "matomo.php"]);
    _paq.push(["setSiteId", "Kj0djQxpnL"]);
    var d = document,
      g = d.createElement("script"),
      s = d.getElementsByTagName("script")[0];
    g.type = "text/javascript";
    g.async = true;
    g.src = u + "matomo.js";
    s.parentNode.insertBefore(g, s);
  })();
  // End Matomo Code
</script>

<svelte:window
  bind:innerWidth
  on:keydown={(e) => {
    if (e.code == "Escape") closeDrawer();
    if (e.code == "Tab") tabFocusRestrictor(e);
  }}
/>

<div class="it-header-slim-wrapper wrap-top">
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="it-header-slim-wrapper-content">
          <p class="whiteText mt-3">
            <a
              id="firstLink"
              href="https://www.agid.gov.it/"
              title="Il link si apre in una nuova finestra"
              target="_blank"
              rel="noreferrer"
              >Agenzia per l'Italia Digitale <Icon
                name="it it-external-link"
                variant="white"
                size="xs"
                customClass="mb-1"
              /></a
            >
          </p>
          <!-- <div class="it-header-slim-right-zone">
                <div class="nav-item dropdown">
                  <a href="javascript:void(0)" class="nav-link dropdown-toggle">
                    <span class="visually-hidden"
                      >Selezione lingua: lingua selezionata</span
                    >
                    <span class="whiteText" style="font-weight: 700;">ITA</span>
                    <span class="d-none d-lg-flex"
                      ><Icon name="it it-expand" size="md" /></span
                    >
                  </a>
                </div>
              </div> -->
        </div>
      </div>
    </div>
  </div>
</div>

<div class="it-header-center-wrapper wrap-bottom pt-lg-4">
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div
          class="it-header-center-content-wrapper pb-2 justify-content-start"
        >
          {#if innerWidth <= 992}
            <button
              class="custom-navbar-toggler align-middle"
              style="padding-left: 0 !important"
              type="button"
              aria-controls="nav1"
              aria-expanded={showDrawer}
              aria-label="Mostra/Nascondi la navigazione"
              on:click={() => (showDrawer = true)}
              bind:this={firstElement}
            >
              <Icon name="it it-burger" variant="white" size="md" />
            </button>
            {#if showDrawer}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div
                class="modal-backdrop fade show"
                class:stop-scroll={showDrawer}
                on:click={closeDrawer}
              />
              <div
                class="offcanvas-custom"
                id="offcanvas1"
                tabindex="-1"
                data-bs-scroll="false"
              >
                <div class="offcanvas-header-custom">
                  <button
                    type="button"
                    class="btn btn-close btn-close-white btn-lg mt-3"
                    aria-label="Chiudi"
                    on:click={closeDrawer}
                  />
                </div>
                <div class="it-list-wrapper" role="navigation">
                  <ul class="it-list">
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <li class="w-100 pointer">
                      <!-- svelte-ignore a11y-missing-attribute -->
                      <!-- svelte-ignore a11y-invalid-attribute -->
                      <a
                        href="/"
                        class:selected={selectedPage == "/"}
                        aria-current={selectedPage == "/" ? "true" : "false"}
                        id="home-ham"
                        on:click={closeDrawer}
                        class="list-item w-100 p-3"
                      >
                        <div class="it-left-zone">
                          <span class="whiteText display6">Home</span>
                        </div>
                      </a>
                    </li>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <li class="w-100 pointer">
                      <!-- svelte-ignore a11y-missing-attribute -->
                      <a
                        href="monitoraggio"
                        class:selected={selectedPage == "/monitoraggio"}
                        aria-current={selectedPage == "/monitoraggio"
                          ? "true"
                          : "false"}
                        id="monitoraggio-ham"
                        on:click={closeDrawer}
                        class="list-item w-100 p-3"
                      >
                        <div class="it-left-zone">
                          <span class="whiteText display6">Monitoraggio</span>
                        </div>
                      </a>
                    </li>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <li class="w-100 pointer">
                      <!-- svelte-ignore a11y-missing-attribute -->
                      <a
                        href="errori"
                        class:selected={selectedPage == "/errori"}
                        aria-current={selectedPage == "/errori"
                          ? "true"
                          : "false"}
                        id="errori-ham"
                        on:click={closeDrawer}
                        class="list-item w-100 p-3"
                      >
                        <div class="it-left-zone">
                          <span class="whiteText display6">Errori</span>
                        </div>
                      </a>
                    </li>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <li class="w-100 pointer">
                      <!-- svelte-ignore a11y-missing-attribute -->
                      <a
                        href="dichiarazione"
                        class:selected={selectedPage == "/dichiarazione"}
                        aria-current={selectedPage == "/dichiarazione"
                          ? "true"
                          : "false"}
                        id="dichiarazione-ham"
                        on:click={closeDrawer}
                        class="list-item w-100 p-3"
                      >
                        <div class="it-left-zone">
                          <span class="whiteText display6">Dichiarazioni</span>
                        </div>
                      </a>
                    </li>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <li class="w-100 pointer">
                      <!-- svelte-ignore a11y-missing-attribute -->
                      <a
                        href="obiettivi"
                        class:selected={selectedPage == "/obiettivi"}
                        aria-current={selectedPage == "/obiettivi"
                          ? "true"
                          : "false"}
                        id="obiettivi-ham"
                        on:click={closeDrawer}
                        class="list-item w-100 p-3"
                      >
                        <div class="it-left-zone">
                          <span class="whiteText display6">Obiettivi</span>
                        </div>
                      </a>
                    </li>
                    <li class="w-100 pointer p-3">
                      <div class="it-left-zone">
                        <span class="whiteText display6">Progetto</span>
                      </div>
                    </li>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <li class="w-100 pointer">
                      <!-- svelte-ignore a11y-missing-attribute -->
                      <a
                        href="progetto"
                        class:selected={selectedPage == "/progetto"}
                        aria-current={selectedPage == "/progetto"
                          ? "true"
                          : "false"}
                        id="progetto-ham"
                        on:click={closeDrawer}
                        class="list-item w-100 p-3"
                      >
                        <div class="it-left-zone">
                          <span class="whiteText ms-4">Il progetto</span>
                        </div>
                      </a>
                    </li>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <li class="w-100 pointer">
                      <a
                        href="cronologia"
                        class:selected={selectedPage == "/cronologia"}
                        aria-current={selectedPage == "/cronologia"
                          ? "true"
                          : "false"}
                        id="cronologia-ham"
                        on:click={closeDrawer}
                        class="list-item w-100 p-3"
                      >
                        <div class="it-left-zone">
                          <span class="whiteText ms-4">Cronologia del progetto</span>
                        </div>
                      </a>
                    </li>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <li class="w-100 pointer" bind:this={lastElement}>
                      <!-- svelte-ignore a11y-missing-attribute -->
                      <a
                        href="opendata"
                        class:selected={selectedPage == "/opendata"}
                        aria-current={selectedPage == "/opendata"
                          ? "true"
                          : "false"}
                        id="opendata-ham"
                        on:click={closeDrawer}
                        class="list-item w-100 p-3"
                      >
                        <div class="it-left-zone">
                          <span class="whiteText ms-4">Open Data</span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div />
              </div>
            {/if}
          {/if}
          <div class="d-inline-block">
            <img
              class="mainLogo d-inline-block align-bottom mb-lg-3 me-lg-3 mx-2"
              src="/logo/Pittogramma_Bianco.svg"
              alt=""
              height="63"
            />
            <h1
              class="title1 mt-3 align-bottom d-inline-block"
              style="width: 9rem"
            >
              Monitoraggio Accessibilità
            </h1>
            <span
              class="badge rounded-pill bg-white betaBadge ms-sm-0 ms-lg-3 mb-lg-3 align-bottom"
              tabindex="-1">beta</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .betaBadge {
    font-size: 12px !important;
    color: #000;
    margin-left: 10px;
    font-weight: 700;
  }

  .wrap-top {
    background-color: #004c99;
  }

  .wrap-bottom {
    background-color: #0066cc;
  }

  .offcanvas-custom {
    background-color: #0066cc;
    z-index: 1050;
    position: fixed;
    align-items: center;
    justify-content: space-between;
    width: 15em;
    height: 100%;
    padding: 0;
    background-clip: padding-box;
    outline: 0;
    left: 0;
    top: 0;
    transition: transform 0.3s ease-in-out;
    display: block;
    overflow-x: hidden;
  }

  .offcanvas-header-custom > button {
    margin-left: 70%;
  }

  .pointer {
    cursor: pointer;
  }

  .it-list-wrapper .it-list .list-item {
    border-bottom: none !important;
  }

  .selected {
    border-left: 2px solid #f5f5f5 !important;
  }

  @media screen and (max-width: 991px) {
    .mainLogo {
      height: 38px !important;
      margin-bottom: 12px;
    }

    .betaBadge {
      margin-bottom: 12px;
    }
  }
</style>
