<script>
  import Icon from "./Icon.svelte";
  let innerWidth;
  export let showDrawer = false;
  export let selectedPage;
  export let isSticky;

  let moniOpen = false;
  let dicOpen = false;
  let errOpen = false;
  let progOpen = false;

  function closeAllSubMenu() {
    moniOpen = false;
    dicOpen = false;
    errOpen = false;
    progOpen = false;
  }

  function ignoreIndex(path) {
    let correctedPath = path;
    if (correctedPath === "/index") {
      correctedPath = "/";
    }
    if (correctedPath.endsWith("/index")) {
      correctedPath = correctedPath.substring(0, correctedPath.length - 6);
    }
    return correctedPath;
  }

  $: selectedPage = ignoreIndex(selectedPage);

  let defaultLanguage = "ITA";
  import { locale, locales, t } from "../utils/i18n";

  $: if (showDrawer) {
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  } else {
    document.body.style.overflow = "";
  }
  function closeDrawer() {
    showDrawer = false;
    closeAllSubMenu();
  }

  let firstElement;
  let lastElement;

  function tabFocusRestrictor(e) {
    if (e.target.id == "close-ham") {
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

{#if !isSticky}
  <div class="it-header-slim-wrapper wrap-top">
    <div class="container my-auto">
      <div class="row">
        <div class="col-12">
          <div class="it-header-slim-wrapper-content">
            <p
              class="col-7 whiteText mb-0 ps-3 ps-lg-2"
              style="font-size: 14px;"
            >
              <a
                id="firstLink"
                style="display: inline-block; height: 24px;"
                href={$t("header.agidLink")}
                title={$t("layout.externalLink")}
                target="_blank"
                rel="noreferrer"
                >{innerWidth <= 991.98 ? "AGID" : $t("header.agid")}</a
              >
            </p>
            <div class="it-header-slim-right-zone align-self-auto">
              <div class="dropdown">
                <a
                  class="nav-link dropdown-toggle display6"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  id="dropdownMenuButton"
                  style="border-bottom-width: 0px;"
                  href="/"
                >
                  <span style=" font-size:14px;font-weight:600;"
                    >{$t("header.selectedLanguage")}</span
                  >
                  <svg
                    class="icon ms-md-2"
                    aria-label="espandi"
                    style="width: 24px;height: 24px;color:white"
                  >
                    <use
                      href="/bootstrap-italia/dist/svg/sprites.svg#it-expand"
                    />
                  </svg>
                </a>
                <ul
                  class="dropdown-menu"
                  style="min-width:7rem!important"
                  aria-labelledby="dropdownMenuButton"
                >
                  {#each locales as l}
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        on:click={() => ($locale = l)}
                        style=" color: #0066cc;"
                      >
                        {#if l == "it"}ITALIANO{:else if l == "en"}ENGLISH{/if}</a
                      >
                    </li>
                  {/each}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

{#if (!isSticky && innerWidth > 992) || innerWidth <= 992}
  <div
    class="it-header-center-wrapper w-100 wrap-bottom {isSticky
      ? 'sticky-top'
      : ''}"
  >
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="it-header-center-content-wrapper justify-content-start">
            {#if innerWidth <= 992}
              <button
                class="custom-navbar-toggler align-middle"
                style="padding-left: 0 !important; padding-right: 0 !important;"
                type="button"
                aria-controls="nav1"
                aria-expanded={showDrawer}
                aria-label="Mostra/Nascondi la navigazione"
                on:click={() => (showDrawer = true)}
                bind:this={firstElement}
              >
                <Icon
                  name="it it-burger"
                  variant="white"
                  size="md"
                  customClass="me-2"
                />
              </button>
              {#if showDrawer}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div
                  class="modal-backdrop fade show"
                  style="background: #000; opacity: 48%;"
                  class:stop-scroll={showDrawer}
                  on:click={closeDrawer}
                />
                <div
                  class="offcanvas-custom"
                  id="offcanvas1"
                  tabindex="-1"
                  data-bs-scroll="false"
                >
                  <div class="it-list-wrapper" role="navigation">
                    <a href="/" on:click={closeDrawer}>
                      <img
                        class="my-4 mx-3"
                        src="/logo/Logo Dash Ext ITA.svg"
                        alt="Logo del sito web Monitoraggio Accessibilità"
                        height="44"
                      />
                    </a>
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
                            <span class="whiteText display6"
                              >{$t("header.tabHome")}
                            </span>
                          </div>
                        </a>
                      </li>
                      <li class="w-100 pointer">
                        <!-- svelte-ignore a11y-invalid-attribute -->
                        <a
                          class="list-item w-100 p-3"
                          href="javascript:void(0)"
                          id="menu-monitoraggio-ham"
                          on:click={() => {
                            moniOpen = !moniOpen;
                          }}
                        >
                          <span class="whiteText display6"
                            >{$t("header.tabMonitoraggio")}</span
                          >
                          <Icon
                            name="it it-{moniOpen ? 'collapse' : 'expand'}"
                            variant="white"
                            size="md"
                          ></Icon>
                        </a>
                      </li>
                      {#if moniOpen}
                        <li class="w-100 pointer">
                          <a
                            href="/monitoraggio-semplificato"
                            class:selected={selectedPage ==
                              "/monitoraggio-semplificato"}
                            aria-current={selectedPage ==
                            "/monitoraggio-semplificato"
                              ? "true"
                              : "false"}
                            id="monitoraggio-semplificato-ham"
                            on:click={closeDrawer}
                            class="list-item w-100 p-3"
                          >
                            <div class="it-left-zone">
                              <span class="whiteText subListItem"
                                >{$t("header.tabMonSemplificato")}</span
                              >
                            </div>
                          </a>
                        </li>
                        <li class="w-100 pointer">
                          <a
                            href="/monitoraggio-approfondito"
                            class:selected={selectedPage ==
                              "/monitoraggio-approfondito"}
                            aria-current={selectedPage ==
                            "/monitoraggio-approfondito"
                              ? "true"
                              : "false"}
                            id="monitoraggio-approfondito-ham"
                            on:click={closeDrawer}
                            class="list-item w-100 p-3"
                          >
                            <div class="it-left-zone">
                              <span class="whiteText subListItem"
                                >{$t("header.tabMonApprofondito")}</span
                              >
                            </div>
                          </a>
                        </li>
                      {/if}
                      <li class="w-100 pointer">
                        <!-- svelte-ignore a11y-invalid-attribute -->
                        <a
                          class="list-item w-100 p-3"
                          href="javascript:void(0)"
                          id="menu-errori-ham"
                          on:click={() => {
                            errOpen = !errOpen;
                          }}
                        >
                          <span class="whiteText display6"
                            >{$t("header.tabErrori")}</span
                          >
                          <Icon
                            name="it it-{errOpen ? 'collapse' : 'expand'}"
                            variant="white"
                            size="md"
                          ></Icon>
                        </a>
                      </li>
                      {#if errOpen}
                        <li class="w-100 pointer">
                          <a
                            href="/errori-semplificato"
                            class:selected={selectedPage ==
                              "/errori-semplificato"}
                            aria-current={selectedPage == "/errori-semplificato"
                              ? "true"
                              : "false"}
                            id="errori-semplificato-ham"
                            on:click={closeDrawer}
                            class="list-item w-100 p-3"
                          >
                            <div class="it-left-zone">
                              <span class="whiteText subListItem"
                                >{$t("header.tabErrSemplificato")}</span
                              >
                            </div>
                          </a>
                        </li>
                        <li class="w-100 pointer">
                          <a
                            href="/errori-approfondito"
                            class:selected={selectedPage ==
                              "/errori-approfondito"}
                            aria-current={selectedPage == "/errori-approfondito"
                              ? "true"
                              : "false"}
                            id="errori-approfondito-ham"
                            on:click={closeDrawer}
                            class="list-item w-100 p-3"
                          >
                            <div class="it-left-zone">
                              <span class="whiteText subListItem"
                                >{$t("header.tabErrApprofondito")}</span
                              >
                            </div>
                          </a>
                        </li>
                      {/if}
                      <li class="w-100 pointer">
                        <!-- svelte-ignore a11y-invalid-attribute -->
                        <a
                          class="list-item w-100 p-3"
                          href="javascript:void(0)"
                          id="menu-dichiarazioni-ham"
                          on:click={() => {
                            dicOpen = !dicOpen;
                          }}
                        >
                          <span class="whiteText display6"
                            >{$t("header.tabDichiarazioni")}</span
                          >
                          <Icon
                            name="it it-{dicOpen ? 'collapse' : 'expand'}"
                            variant="white"
                            size="md"
                          ></Icon>
                        </a>
                      </li>
                      {#if dicOpen}
                        <li class="w-100 pointer">
                          <a
                            href="/dichiarazione"
                            class:selected={selectedPage == "/dichiarazione"}
                            aria-current={selectedPage == "/dichiarazione"
                              ? "true"
                              : "false"}
                            id="dichiarazioni-ham"
                            on:click={closeDrawer}
                            class="list-item w-100 p-3"
                          >
                            <div class="it-left-zone">
                              <span class="whiteText subListItem"
                                >{$t("header.tabDicPanoramica")}</span
                              >
                            </div>
                          </a>
                        </li>
                        <li class="w-100 pointer">
                          <a
                            href="/dichiarazione/siti"
                            class:selected={selectedPage ==
                              "/dichiarazione/siti"}
                            aria-current={selectedPage == "/dichiarazione/siti"
                              ? "true"
                              : "false"}
                            id="dichiarazioni-siti-ham"
                            on:click={closeDrawer}
                            class="list-item w-100 p-3"
                          >
                            <div class="it-left-zone">
                              <span class="whiteText subListItem"
                                >{$t("header.tabDicSiti")}</span
                              >
                            </div>
                          </a>
                        </li>
                        <li class="w-100 pointer">
                          <a
                            href="/dichiarazione/app"
                            class:selected={selectedPage ==
                              "/dichiarazione/app"}
                            aria-current={selectedPage == "/dichiarazione/app"
                              ? "true"
                              : "false"}
                            id="dichiarazioni-app-ham"
                            on:click={closeDrawer}
                            class="list-item w-100 p-3"
                          >
                            <div class="it-left-zone">
                              <span class="whiteText subListItem"
                                >{$t("header.tabDicApp")}</span
                              >
                            </div>
                          </a>
                        </li>
                      {/if}
                      <!-- svelte-ignore a11y-click-events-have-key-events -->
                      <li class="w-100 pointer">
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <a
                          href="/obiettivi"
                          class:selected={selectedPage == "/obiettivi"}
                          aria-current={selectedPage == "/obiettivi"
                            ? "true"
                            : "false"}
                          id="obiettivi-ham"
                          on:click={closeDrawer}
                          class="list-item w-100 p-3"
                        >
                          <div class="it-left-zone">
                            <span class="whiteText display6"
                              >{$t("header.tabObiettivi")}</span
                            >
                          </div>
                        </a>
                      </li>
                      <li class="w-100 pointer">
                        <!-- svelte-ignore a11y-invalid-attribute -->
                        <a
                          class="list-item w-100 p-3"
                          href="javascript:void(0)"
                          id="menu-progetto-ham"
                          on:click={() => {
                            progOpen = !progOpen;
                          }}
                        >
                          <span class="whiteText display6"
                            >{$t("header.tabProgetto")}</span
                          >
                          <Icon
                            name="it it-{progOpen ? 'collapse' : 'expand'}"
                            variant="white"
                            size="md"
                          ></Icon>
                        </a>
                      </li>
                      {#if progOpen}
                        <li class="w-100 pointer">
                          <!-- svelte-ignore a11y-missing-attribute -->
                          <a
                            href="/progetto"
                            class:selected={selectedPage == "/progetto"}
                            aria-current={selectedPage == "/progetto"
                              ? "true"
                              : "false"}
                            id="progetto-ham"
                            on:click={closeDrawer}
                            class="list-item w-100 p-3"
                          >
                            <div class="it-left-zone">
                              <span class="whiteText subListItem"
                                >{$t("header.tabEsploraProgetto")}</span
                              >
                            </div>
                          </a>
                        </li>
                        <li class="w-100 pointer">
                          <a
                            href="/cronologia"
                            class:selected={selectedPage == "/cronologia"}
                            aria-current={selectedPage == "/cronologia"
                              ? "true"
                              : "false"}
                            id="cronologia-ham"
                            on:click={closeDrawer}
                            class="list-item w-100 p-3"
                          >
                            <div class="it-left-zone">
                              <span class="whiteText subListItem"
                                >{$t("header.tabCronologia")}</span
                              >
                            </div>
                          </a>
                        </li>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <li class="w-100 pointer">
                          <!-- svelte-ignore a11y-missing-attribute -->
                          <a
                            href="/opendata"
                            class:selected={selectedPage == "/opendata"}
                            aria-current={selectedPage == "/opendata"
                              ? "true"
                              : "false"}
                            id="opendata-ham"
                            on:click={closeDrawer}
                            class="list-item w-100 p-3"
                          >
                            <div class="it-left-zone">
                              <span class="whiteText subListItem"
                                >{$t("header.tabOpenData")}</span
                              >
                            </div>
                          </a>
                        </li>
                      {/if}
                    </ul>
                    <div class="d-block justify-content-start my-5 px-3">
                      <p class="socialPar mb-4">Seguici su</p>
                      <div class="socialIcons d-flex">
                        <a
                          href="https://www.facebook.com/AgIDGovIT/"
                          target="_blank"
                          rel="noreferrer"
                          title={$t("layout.externalLink")}
                          class="me-4"
                        >
                          <Icon name="it it-facebook" variant="white" size="sm"
                          ></Icon>
                        </a>
                        <a
                          href="https://twitter.com/AgidGov"
                          target="_blank"
                          rel="noreferrer"
                          title={$t("layout.externalLink")}
                          class="me-4"
                        >
                          <Icon name="it it-twitter" variant="white" size="sm"
                          ></Icon>
                        </a>
                        <a
                          href="https://www.youtube.com/channel/UCxJmOWf__YcLgB19gy5dGQQ"
                          target="_blank"
                          class="me-4"
                          rel="noreferrer"
                          title={$t("layout.externalLink")}
                        >
                          <Icon name="it it-youtube" variant="white" size="sm"
                          ></Icon>
                        </a>
                        <a
                          href="https://www.linkedin.com/company/agenzia-italia-digitale"
                          class="me-4"
                          target="_blank"
                          rel="noreferrer"
                          title={$t("layout.externalLink")}
                        >
                          <Icon name="it it-linkedin" variant="white" size="sm"
                          ></Icon>
                        </a>
                        <a
                          href="https://medium.com/@AgidGov"
                          class="me-4"
                          target="_blank"
                          rel="noreferrer"
                          title={$t("layout.externalLink")}
                        >
                          <Icon name="it it-medium" variant="white" size="sm"
                          ></Icon>
                        </a>
                        <a
                          href="https://www.instagram.com/agid_gov/"
                          target="_blank"
                          class="me-4"
                          rel="noreferrer"
                          title={$t("layout.externalLink")}
                        >
                          <Icon name="it it-instagram" variant="white" size="sm"
                          ></Icon>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="closeDiv">
                  <button
                    type="button"
                    id="close-ham"
                    class="btn p-2"
                    aria-label="Chiudi"
                    on:click={closeDrawer}
                    bind:this={lastElement}
                    ><Icon name="it it-close-big" variant="white" size="32px"
                    ></Icon></button
                  >
                </div>
              {/if}
            {/if}
            <div class="d-inline-block">
              <a href="/">
                <img
                  class="mainLogo d-inline-block align-bottom me-lg-3 mx-2"
                  src={$t("header.logo")}
                  alt={$t("header.monitoraggio")}
                  height="56"
                />
                <span
                  class="badge rounded-pill bg-white betaBadge ms-0 ms-lg-3 align-bottom"
                  tabindex="-1">{$t("header.monitoraggioBadge")}</span
                >
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .sticky-top {
    position: fixed;
    top: 0;
    z-index: 1030;
    transition: ease-in-out 1s;
  }

  .it-header-slim-wrapper {
    height: 48px !important;
    display: flex !important;
    padding: 0 !important;
  }

  .it-header-center-wrapper {
    padding-top: 0 !important;
  }

  .display6:hover,
  .subListItem:hover {
    text-decoration: underline;
  }

  .subListItem {
    margin-left: 40px !important;
  }

  .betaBadge {
    font-size: 12px !important;
    color: #000;
    margin-left: 10px;
    font-weight: 700;
  }

  .wrap-top {
    background-color: #004d99;
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
    width: 80%;
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

  .closeDiv {
    position: absolute;
    right: 5%;
    top: 10%;
    z-index: 1051;
  }

  .socialPar {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #fff;
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

  @media screen and (max-width: 991.98px) {
    .mainLogo {
      height: 42px !important;
    }
    .it-header-center-wrapper {
      height: 72px !important;
    }
  }
</style>
