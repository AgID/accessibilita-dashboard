<script>
  import Icon from "./Icon.svelte";

  export let selectedPage;
</script>

<div class="buttonNav">
  <div class="container">
    <nav class="navbar navbar-expand-lg">
      <div class="navbar-collapsable" id="nav1">
        <div class="menu-wrapper">
          <ul class="navbar-nav">
            <li class="my-auto">
              <a
                href="/"
                class:selected={selectedPage == "/index"}
                aria-current={selectedPage == "/index" ? "true" : "false"}
                class="pageChoice display6"><span>Home</span></a
              >
            </li>
            <li class="my-auto">
              <a
                href="/monitoraggio"
                class:selected={selectedPage == "/monitoraggio"}
                aria-current={selectedPage == "/monitoraggio"
                  ? "true"
                  : "false"}
                class="pageChoice display6"><span>Monitoraggio</span></a
              >
            </li>
            <li class="my-auto">
              <a
                href="/errori"
                class:selected={selectedPage == "/errori"}
                aria-current={selectedPage == "/errori" ? "true" : "false"}
                class="pageChoice display6"><span>Errori</span></a
              >
            </li>
            <li class="my-auto">
              <a
                href="/dichiarazione"
                class:selected={selectedPage == "/dichiarazione"}
                aria-current={selectedPage == "/dichiarazione"
                  ? "true"
                  : "false"}
                class="pageChoice display6"><span>Dichiarazioni</span></a
              >
            </li>
            <li class="my-auto">
              <a
                href="/obiettivi"
                class:selected={selectedPage == "/obiettivi"}
                aria-current={selectedPage == "/obiettivi" ? "true" : "false"}
                class="pageChoice display6"><span>Obiettivi</span></a
              >
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle display6"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="dropdownHome"
                style="border-bottom-width: 0px;"
                href="/"
                class:selected={selectedPage == "/progetto" ||
                  selectedPage == "/cronologia" ||
                  selectedPage == "/opendata"}
              >
                <span>Il progetto</span>
                <svg
                  class="icon"
                  class:selected={selectedPage == "/progetto" ||
                    selectedPage == "/cronologia" ||
                    selectedPage == "/opendata"}
                >
                  <use
                    href="/bootstrap-italia/dist/svg/sprites.svg#it-arrow-down-triangle"
                  />
                </svg>
              </a>
              <div
                class="dropdown-menu"
                role="region"
                aria-labelledby="dropdownHome"
              >
                <div class="link-list-wrapper">
                  <ul class="link-list">
                    <li>
                      <a
                        class="dropdown-item list-item py-2 pageChoice align-middle"
                        href="/progetto"
                        aria-current={selectedPage == "/progetto"
                          ? "true"
                          : "false"}><span>Il progetto</span></a
                      >
                    </li>
                    <li>
                      <a
                        class="dropdown-item list-item py-2 pageChoice align-middle"
                        href="/cronologia"
                        aria-current={selectedPage == "/cronologia"
                          ? "true"
                          : "false"}><span>Cronologia del progetto</span></a
                      >
                    </li>
                    <li>
                      <a
                        class="dropdown-item list-item py-2 pageChoice align-middle"
                        href="/opendata"
                        aria-current={selectedPage == "/opendata"
                          ? "true"
                          : "false"}><span>Open Data</span></a
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
  .buttonNav {
    background-color: #0066cc;
  }

  .pageChoice {
    color: #f5f5f5;
    padding: 0.95em 2.25em;
    overflow-x: hidden;
  }

  .selected {
    background-color: #ffffff !important;
    color: #003366 !important;
    fill: #003366 !important;
  }

  a {
    text-decoration: none;
  }

  .nav-item.dropdown > a {
    overflow: unset;
  }

  .navbar .navbar-collapsable .navbar-nav li a.nav-link:hover:not(.active) {
    text-decoration: none;
  }

  .navbar .navbar-collapsable .navbar-nav li a.nav-link {
    font-weight: 600 !important;
  }

  a > span:hover {
    border-bottom: 1px solid white;
  }

  .navbar .navbar-collapsable .menu-wrapper .navbar-nav {
    padding: 24px 0px 0px 0px !important;
  }
</style>
