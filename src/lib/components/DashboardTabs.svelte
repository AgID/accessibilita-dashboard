<script>
  export let selectedPage;
  export let isSticky;

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

  import { t } from "../utils/i18n";
</script>

<div class="buttonNav w-100 {isSticky ? 'sticky-top' : ''}">
  <div class="container">
    <nav class="navbar navbar-expand-lg">
      {#if isSticky}
        <div class="d-flex my-auto">
          <a href="/"
            ><img
              class="d-inline-block align-bottom"
              src="/logo/Agid_LogoMonogramma_Pos_rgb.svg"
              alt="Logo di Monitoraggio Accessibiità"
              height="40"
            /></a
          >
        </div>
      {/if}
      <div class="navbar-collapsable" id="nav1">
        <div class="menu-wrapper">
          <ul class="navbar-nav">
            <li class="my-auto">
              <a
                href="/"
                class:selected={selectedPage == "/"}
                aria-current={selectedPage == "/" ? "true" : "false"}
                class="pageChoice display6"
                ><span>{$t("header.tabHome")}</span></a
              >
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle display6"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="dropdownMonitoring"
                style="border-bottom-width: 0px;"
                href="/"
                class:selected={selectedPage == "/monitoraggio-semplificato" ||
                  selectedPage == "/monitoraggio-approfondito"}
              >
                <span>{$t("header.tabMonitoraggio")}</span>
                <svg class="icon icon-sm ms-2" aria-label="espandi">
                  <use
                    href="/bootstrap-italia/dist/svg/sprites.svg#it-expand"
                  />
                </svg>
              </a>
              <div
                class="dropdown-menu"
                role="region"
                aria-labelledby="dropdownMonitoring"
              >
                <div class="link-list-wrapper">
                  <ul class="link-list">
                    <li>
                      <a
                        class="dropdown-item list-item py-2 pageChoice align-middle"
                        href="/monitoraggio-semplificato"
                        aria-current={selectedPage ==
                        "/monitoraggio-semplificato"
                          ? "true"
                          : "false"}
                        ><span>{$t("header.tabMonSemplificato")}</span></a
                      >
                    </li>
                    <li>
                      <a
                        class="dropdown-item list-item py-2 pageChoice align-middle"
                        href="/monitoraggio-approfondito"
                        aria-current={selectedPage ==
                        "/monitoraggio-approfondito"
                          ? "true"
                          : "false"}
                        ><span>{$t("header.tabMonApprofondito")}</span></a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle display6"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="dropdownErrors"
                style="border-bottom-width: 0px;"
                href="/"
                class:selected={selectedPage == "/errori-semplificato" ||
                  selectedPage == "/errori-approfondito"}
              >
                <span>{$t("header.tabErrori")}</span>
                <svg class="icon icon-sm ms-2" aria-label="espandi">
                  <use
                    href="/bootstrap-italia/dist/svg/sprites.svg#it-expand"
                  />
                </svg>
              </a>
              <div
                class="dropdown-menu"
                role="region"
                aria-labelledby="dropdownErrors"
              >
                <div class="link-list-wrapper">
                  <ul class="link-list">
                    <li>
                      <a
                        class="dropdown-item list-item py-2 pageChoice align-middle"
                        href="/errori-semplificato"
                        aria-current={selectedPage == "/errori-semplificato"
                          ? "true"
                          : "false"}
                        ><span>{$t("header.tabErrSemplificato")}</span></a
                      >
                    </li>
                    <li>
                      <a
                        class="dropdown-item list-item py-2 pageChoice align-middle"
                        href="/errori-approfondito"
                        aria-current={selectedPage == "/errori-approfondito"
                          ? "true"
                          : "false"}
                        ><span>{$t("header.tabErrApprofondito")}</span></a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle display6"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="dropdownStatements"
                style="border-bottom-width: 0px;"
                href="/"
                class:selected={selectedPage == "/dichiarazione" ||
                  selectedPage == "/dichiarazione/siti" ||
                  selectedPage == "/dichiarazione/app"}
              >
                <span>{$t("header.tabDichiarazioni")}</span>
                <svg class="icon icon-sm ms-2" aria-label="espandi">
                  <use
                    href="/bootstrap-italia/dist/svg/sprites.svg#it-expand"
                  />
                </svg>
              </a>
              <div
                class="dropdown-menu"
                role="region"
                aria-labelledby="dropdownStatements"
              >
                <div class="link-list-wrapper">
                  <ul class="link-list">
                    <li>
                      <a
                        class="dropdown-item list-item py-2 pageChoice align-middle"
                        href="/dichiarazione"
                        aria-current={selectedPage == "/dichiarazione"
                          ? "true"
                          : "false"}
                        ><span>{$t("header.tabDicPanoramica")}</span></a
                      >
                    </li>
                    <li>
                      <a
                        class="dropdown-item list-item py-2 pageChoice align-middle"
                        href="/dichiarazione/siti"
                        aria-current={selectedPage == "/dichiarazione/siti"
                          ? "true"
                          : "false"}><span>{$t("header.tabDicSiti")}</span></a
                      >
                    </li>
                    <li>
                      <a
                        class="dropdown-item list-item py-2 pageChoice align-middle"
                        href="/dichiarazione/app"
                        aria-current={selectedPage == "/dichiarazione/app"
                          ? "true"
                          : "false"}><span>{$t("header.tabDicApp")}</span></a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li class="my-auto">
              <a
                href="/obiettivi"
                class:selected={selectedPage == "/obiettivi"}
                aria-current={selectedPage == "/obiettivi" ? "true" : "false"}
                class="pageChoice display6"
                ><span>{$t("header.tabObiettivi")}</span></a
              >
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle display6"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="dropdownProject"
                style="border-bottom-width: 0px;"
                href="/"
                class:selected={selectedPage == "/progetto" ||
                  selectedPage == "/cronologia" ||
                  selectedPage == "/opendata"}
              >
                <span>{$t("header.tabProgetto")}</span>
                <svg class="icon icon-sm ms-2" aria-label="espandi">
                  <use
                    href="/bootstrap-italia/dist/svg/sprites.svg#it-expand"
                  />
                </svg>
              </a>
              <div
                class="dropdown-menu"
                role="region"
                aria-labelledby="dropdownProject"
              >
                <div class="link-list-wrapper">
                  <ul class="link-list">
                    <li>
                      <a
                        class="dropdown-item list-item py-2 pageChoice align-middle"
                        href="/progetto"
                        aria-current={selectedPage == "/progetto"
                          ? "true"
                          : "false"}
                        ><span>{$t("header.tabEsploraProgetto")}</span></a
                      >
                    </li>
                    <li>
                      <a
                        class="dropdown-item list-item py-2 pageChoice align-middle"
                        href="/cronologia"
                        aria-current={selectedPage == "/cronologia"
                          ? "true"
                          : "false"}
                        ><span>{$t("header.tabCronologia")}</span></a
                      >
                    </li>
                    <li>
                      <a
                        class="dropdown-item list-item py-2 pageChoice align-middle"
                        href="/opendata"
                        aria-current={selectedPage == "/opendata"
                          ? "true"
                          : "false"}><span>{$t("header.tabOpenData")}</span></a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</div>

<style lang="scss">
  .sticky-top {
    position: fixed;
    top: 0;
    z-index: 1030;
    transition: ease-in-out 1s;
  }

  .buttonNav {
    background-color: #0066cc;
  }

  .pageChoice {
    color: #f5f5f5;
    padding: 12px 24px;
    overflow-x: hidden;
    display: flex;
    line-height: 27px !important;
  }

  .selected {
    border-bottom: 2px solid #ffffff !important;
  }

  a {
    text-decoration: none;
  }

  a span:hover {
    text-decoration: underline;
  }

  .nav-item.dropdown > a {
    overflow: unset;
  }

  .navbar .navbar-collapsable .navbar-nav li a.nav-link:hover:not(.active) {
    text-decoration: none;
  }

  .navbar .navbar-collapsable .navbar-nav li a.nav-link {
    font-weight: 600 !important;
    padding: 12px 24px !important;
  }
</style>
