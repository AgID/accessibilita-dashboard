<script>
  import BannerPageUpdated from "../lib/components/BannerPageUpdated.svelte";
  import Breadcrumb from "../lib/components/Breadcrumb.svelte";
  import Icon from "../lib/components/Icon.svelte";
  import { t } from "../lib/utils/i18n";

  let activeTab = 1;
  $: activeTab;
</script>

<svelte:head>
  <title>{$t("guida.pagename")}</title>
</svelte:head>

<section aria-label={$t("guida.section")}>
  <div class="lightBlueBackground">
    <div class="container">
      <Breadcrumb currentPage={$t("breadcrumb.guida")}></Breadcrumb>
      <BannerPageUpdated pageId="guida_piattaforma" />
      <h1 style="font-size: 40px; font-weight:700; color:1a1a1a" class="mb-4">
        {$t("guida.title")}
      </h1>
      <p class="pt-2 mb-0">
        {$t("guida.description")}
      </p>
    </div>
  </div>

  <div class="container">
    <div class="my-5">
      <div class="row">
        <div class="d-none d-lg-block col-lg-4 col-xl-3">
          <p class="darkText mb-0 ps-4 py-3">{$t("guida.legend")}</p>
          <div
            class="nav nav-tabs nav-tabs-vertical"
            id="nav-vertical-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <a
              class="nav-link {activeTab === 1 ? 'active' : ''}"
              id="nav-vertical-tab1-tab"
              on:click={() => (activeTab = 1)}
              data-bs-toggle="tab"
              href="#nav-vertical-tab1"
              role="tab"
              aria-controls="nav-vertical-tab1"
              aria-selected={activeTab === 1 ? "true" : "false"}
            >
              {$t("guida.subtitle1")}
            </a>
            <a
              class="nav-link {activeTab === 2 ? 'active' : ''}"
              id="nav-vertical-tab2-tab"
              on:click={() => (activeTab = 2)}
              data-bs-toggle="tab"
              href="#nav-vertical-tab2"
              role="tab"
              aria-controls="nav-vertical-tab2"
              aria-selected={activeTab === 2 ? "true" : "false"}
            >
              {$t("guida.subtitle2")}
            </a>
            <a
              class="nav-link {activeTab === 3 ? 'active' : ''}"
              id="nav-vertical-tab3-tab"
              on:click={() => (activeTab = 3)}
              data-bs-toggle="tab"
              href="#nav-vertical-tab3"
              role="tab"
              aria-controls="nav-vertical-tab3"
              aria-selected={activeTab === 3 ? "true" : "false"}
            >
              {$t("guida.subtitle3")}
            </a>
            <a
              class="nav-link {activeTab === 4 ? 'active' : ''}"
              id="nav-vertical-tab4-tab"
              on:click={() => (activeTab = 4)}
              data-bs-toggle="tab"
              href="#nav-vertical-tab4"
              role="tab"
              aria-controls="nav-vertical-tab4"
              aria-selected={activeTab === 4 ? "true" : "false"}
            >
              {$t("guida.subtitle4")}
            </a>
          </div>
        </div>

        <div class="d-lg-none select-wrapper form-group mb-4">
          <label class="visually-hidden" for="faq">{$t("guida.title")}</label>
          <select bind:value={activeTab} id="faq" class="text16600">
            <option value={1}>{$t("guida.subtitle1")}</option>
            <option value={2}>{$t("guida.subtitle2")}</option>
            <option value={3}>{$t("guida.subtitle3")}</option>
            <option value={4}>{$t("guida.subtitle4")}</option>
          </select>
        </div>

        <div class="col-12 col-lg-8 col-xl-9 borderLeft">
          <div class="tab-content" id="nav-vertical-tabContent">
            <div
              class="tab-pane fade {activeTab === 1 ? 'show active' : ''}"
              id="nav-vertical-tab1"
              role="tabpanel"
              aria-labelledby="nav-vertical-tab1-tab"
            >
              <h2 class="sub-h2">{$t("guida.subtitle1")}</h2>
              <p>
                {$t("guida.paragraph1a")}
              </p>
              <p>
                {$t("guida.paragraph1b")}
                <a
                  href="https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2004-01-09;4!vig="
                  title={$t("layout.externalLink")}
                  target="_blank"
                  rel="noreferrer"
                  >{$t("guida.link1Text")}<Icon
                    name="it it-external-link"
                    variant="primary"
                    size="sm"
                    customClass="ms-1 mb-1"
                  /></a
                >
                {$t("guida.paragraph1c")}
                <a href="/progetto">{$t("guida.link2Text")}</a>
                {$t("guida.paragraph1d")}
              </p>
              <button class="invisibleBtn" on:click={() => (activeTab = 2)}>
                {$t("guida.next")}{$t("guida.subtitle2")}
              </button>
            </div>
            <div
              class="tab-pane fade {activeTab === 2 ? 'show active' : ''}"
              id="nav-vertical-tab2"
              role="tabpanel"
              aria-labelledby="nav-vertical-tab2-tab"
            >
              <h2 class="sub-h2">{$t("guida.subtitle2")}</h2>
              <p>{$t("guida.paragraph2a")}</p>
              <p>{$t("guida.paragraph2b")}</p>
              <ul style="list-style-type:square">
                <li>
                  {@html $t("guida.list", { newLi: "</li><li>" })}
                </li>
              </ul>

              <div>
                <h3 class="mt-5 sub-h3">Home</h3>
                <p>{$t("guida.homeparagraph")}</p>
                <ul style="list-style-type:square">
                  <li class="ms-5">
                    {@html $t("guida.list2", { newLi: "</li><li>" })}
                  </li>
                </ul>
              </div>

              <div class="mt-5">
                <h3 class="sub-h3">{$t("guida.monitoraggiotitle")}</h3>
                <p>{$t("guida.subtitlevocemenu")}</p>
                <ul>
                  <li>
                    <span style="font-weight: bold;"
                      >{$t("guida.monitoraggioparagraph2a")}</span
                    >{@html $t("guida.monitoraggioparagraph2b", {
                      break: "<br></br>",
                    })}
                  </li>
                  <li class="mt-3">
                    <span style="font-weight: bold;"
                      >{$t("guida.monitoraggioparagraph3a")}</span
                    >{@html $t("guida.monitoraggioparagraph3b", {
                      break: "<br></br>",
                    })}
                  </li>
                </ul>
              </div>

              <div class="mt-5">
                <h3 class="sub-h3">{$t("guida.errorititle")}</h3>
                <p>{$t("guida.subtitlevocemenu")}</p>
                <ul>
                  <li>
                    <span style="font-weight: bold;"
                      >{$t("guida.erroriparagraph1a")}</span
                    >{@html $t("guida.erroriparagraph1b", {
                      break: "<br></br>",
                    })}
                    <p class="mt-3">{$t("guida.errorititleList")}</p>
                    <ul>
                      <li>
                        {@html $t("guida.errorilist", { newLi: "</li><li>" })}
                      </li>
                    </ul>
                    <p class="mt-3">{$t("guida.errorititleList2")}</p>
                  </li>
                  <li>
                    <span style="font-weight: bold;"
                      >{$t("guida.erroriparagraph2a")}</span
                    >{@html $t("guida.erroriparagraph2b", {
                      break: "<br></br>",
                    })}
                  </li>
                </ul>
              </div>

              <div class="mt-5">
                <h3 class="sub-h3">{$t("guida.dichiarazionititle")}</h3>
                <p>{$t("guida.subtitlevocemenu")}</p>
                <ul>
                  <li>
                    <span style="font-weight: bold;"
                      >{$t("guida.dichiarazioniparagraph1a")}</span
                    >{$t("guida.dichiarazioniparagraph1b")}
                    <p class="mt-3">{$t("guida.dichiarazioniparagraph1c")}</p>
                    <p class="mt-3">{$t("guida.dichiarazioniparagraph1d")}</p>
                  </li>

                  <li>
                    <span style="font-weight: bold;"
                      >{$t("guida.dichiarazioniparagraph2a")}</span
                    >{$t("guida.dichiarazioniparagraph2b")}
                    <p class="mt-3">{$t("guida.dichiarazionisublisttitle1")}</p>
                    <ul>
                      <li>
                        {@html $t("guida.dichiarazionilist1", {
                          newLi: "</li><li class='mt-3'>",
                        })}
                      </li>
                    </ul>
                    <p class="mt-4">{$t("guida.dichiarazionisublisttitle2")}</p>
                    <ul>
                      <li>
                        {@html $t("guida.dichiarazionilist2", {
                          newLi: "</li><li class='mt-3'>",
                        })}
                      </li>
                    </ul>
                  </li>

                  <li class="mt-4">
                    <span style="font-weight: bold;"
                      >{$t("guida.dichiarazioniparagraph3a")}</span
                    >{$t("guida.dichiarazioniparagraph3b")}
                    <p class="mt-3">{$t("guida.dichiarazioniparagraph3c")}</p>
                    <ul>
                      <li>
                        {@html $t("guida.dichiarazionilist3", {
                          newLi: "</li><li class='mt-3'>",
                        })}
                      </li>
                    </ul>
                    <p class="mt-3">{$t("guida.dichiarazioniparagraph3d")}</p>
                  </li>
                </ul>
              </div>

              <div class="mt-5">
                <h3 class="sub-h3">{$t("guida.obiettivititle")}</h3>
                <p>{$t("guida.obiettiviparagraph1")}</p>
                <p>{$t("guida.obiettivilisttitle")}</p>
                <ul>
                  <li>
                    {@html $t("guida.obiettivilist", {
                      newLi: "</li><li class='mt-3'>",
                    })}
                  </li>
                </ul>
              </div>

              <div>
                <h3 class="sub-h3">{$t("guida.progettotitle")}</h3>
                <p>{$t("guida.subtitlevocemenu")}</p>
                <li>
                  <span style="font-weight: bold;"
                    >{$t("guida.progettoparagraphlist1a")}</span
                  >
                  {$t("guida.progettoparagraphlist1b")}
                </li>

                <li class="mt-3">
                  <span style="font-weight: bold;"
                    >{$t("guida.progettoparagraphlist2a")}</span
                  >
                  {$t("guida.progettoparagraphlist2b")}
                </li>

                <li class="mt-3">
                  <span style="font-weight: bold;"
                    >{$t("guida.progettoparagraphlist3a")}</span
                  >
                  {$t("guida.progettoparagraphlist3b")}
                </li>
              </div>

              <div class="mt-5">
                <h3 class="sub-h3">{$t("guida.paginefootertitle")}</h3>
                <p>{$t("guida.paginefooterparagraph")}</p>
                <ul>
                  <li>
                    <span style="font-weight: bold;"
                      >{$t("guida.paginefooterparagraphlist1a")}</span
                    >
                    {$t("guida.paginefooterparagraphlist1b")}
                    <a
                      href="https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=uriserv:OJ.L_.2018.256.01.0103.01.ITA&toc=OJ:L:2018:256:FULL"
                      title={$t("layout.externalLink")}
                      target="_blank"
                      rel="noreferrer"
                      >{$t("guida.paginefooterparagraphlistlink1b")}<Icon
                        name="it it-external-link"
                        variant="primary"
                        size="sm"
                        customClass="ms-1 mb-1"
                      /></a
                    >.
                  </li>

                  <li class="mt-4">
                    <span style="font-weight: bold;"
                      >{$t("guida.paginefooterparagraphlist2a")}</span
                    >
                    {$t("guida.paginefooterparagraphlist2b")}
                  </li>

                  <li class="mt-4">
                    <span style="font-weight: bold;"
                      >{$t("guida.paginefooterparagraphlist3a")}</span
                    >
                    {$t("guida.paginefooterparagraphlist3b")}
                    <ul>
                      <li>
                        {@html $t("guida.paginefooterlistnotelegali", {
                          newLi: "</li><li class='mt-3'>",
                        })}
                      </li>
                    </ul>
                  </li>

                  <li class="mt-4">
                    <span style="font-weight: bold;"
                      >{$t("guida.paginefooterparagraphlist4a")}</span
                    >
                    {$t("guida.paginefooterparagraphlist4b")}
                  </li>

                  <li class="mt-4">
                    <span style="font-weight: bold;"
                      >{$t("guida.paginefooterparagraphlist5a")}</span
                    >
                    {$t("guida.paginefooterparagraphlist5b")}
                  </li>

                  <li class="mt-4">
                    <span style="font-weight: bold;"
                      >{$t("guida.paginefooterparagraphlist6a")}</span
                    >
                    {$t("guida.paginefooterparagraphlist6b")}
                  </li>
                </ul>
              </div>

              <button class="invisibleBtn" on:click={() => (activeTab = 3)}>
                {$t("guida.next")}{$t("guida.subtitle3")}
              </button>
            </div>
            <div
              class="tab-pane fade {activeTab === 3 ? 'show active' : ''}"
              id="nav-vertical-tab3"
              role="tabpanel"
              aria-labelledby="nav-vertical-tab3-tab"
            >
              <h2 class="sub-h2">{$t("guida.subtitle3")}</h2>
              <div>
                <h3 class="sub-h3">{$t("guida.funzionalita.subtitle")}</h3>
                <img
                  src={$t("guida.scelta_lingua")}
                  alt={$t("guida.funzionalita.paragraphsmall")}
                  class="w-100"
                />
                <small class="d-block text-center"
                  >{$t("guida.funzionalita.paragraphsmall")}</small
                >
                <p class="m-0 mt-3">{$t("guida.funzionalita.paragraph1")}</p>
                <p class="mt-2">{$t("guida.funzionalita.paragraph2")}</p>
              </div>

              <div class="mt-5">
                <h3 class="sub-h3">{$t("guida.funzionalita.paragraph3")}</h3>
                <img
                  src={$t("guida.grafico")}
                  alt={$t("guida.funzionalita.paragraphsmall2")}
                  class="w-100"
                />
                <small class="d-block text-center"
                  >{$t("guida.funzionalita.paragraphsmall2")}</small
                >
              </div>

              <div class="mt-5">
                <p>{$t("guida.funzionalita.paragraph4")}</p>
              </div>

              <div class="mt-5">
                <img
                  src={$t("guida.tabella")}
                  alt={$t("guida.funzionalita.paragraphsmall3")}
                  class="w-100"
                />
                <small class="d-block text-center"
                  >{$t("guida.funzionalita.paragraphsmall3")}</small
                >
              </div>

              <div class="mt-5">
                <p>{$t("guida.funzionalita.paragraph11")}</p>
              </div>

              <div class="mt-5">
                <h3 class="sub-h3">{$t("guida.funzionalita.paragraph5")}</h3>
                <img
                  src={$t("guida.pulsanti_download")}
                  alt={$t("guida.funzionalita.paragraphsmall4")}
                  class="w-100"
                />
                <small class="d-block text-center"
                  >{$t("guida.funzionalita.paragraphsmall4")}</small
                >
              </div>

              <div class="mt-5">
                <p>{$t("guida.funzionalita.paragraph6")}</p>
              </div>

              <div class="mt-5">
                <h3 class="sub-h3">{$t("guida.funzionalita.paragraph7")}</h3>
                <p>{$t("guida funzionalita.paragraph8")}</p>
                <p class="m-0">{$t("guida.funzionalita.paragraph9")}</p>
                <p>{$t("guida.funzionalita.paragraph10")}</p>
                <ul>
                  <li>
                    {@html $t("guida.funzionalita.list", {
                      newLi: "</li><li class='mt-3'>",
                    })}
                  </li>
                </ul>
              </div>

              <button class="invisibleBtn" on:click={() => (activeTab = 4)}>
                {$t("guida.next")}{$t("guida.subtitle4")}
              </button>
            </div>
            <div
              class="tab-pane fade {activeTab === 4 ? 'show active' : ''}"
              id="nav-vertical-tab4"
              role="tabpanel"
              aria-labelledby="nav-vertical-tab4-tab"
            >
              <h2 class="sub-h2">{$t("guida.subtitle4")}</h2>
              <h3 class="sub-h3">{$t("guida.navigazione.subtitle5")}</h3>
              <img
                src={$t("guida.logo")}
                alt={$t("guida.navigazione.paragraphsmall1")}
                class="w-100"
              />
              <small class="d-block text-center mt-2"
                >{$t("guida.navigazione.paragraphsmall1")}</small
              >

              <div class="mt-3">
                <p>{$t("guida.navigazione.paragraph1")}</p>
              </div>

              <div class="mt-5">
                <h3 class="sub-h3">{$t("guida.navigazione.subtitle6")}</h3>
                <img
                  src={$t("guida.menu")}
                  alt={$t("guida.navigazione.paragraphsmall2")}
                  class="w-100"
                />
                <small class="d-block text-center mt-2"
                  >{$t("guida.navigazione.paragraphsmall2")}</small
                >
              </div>

              <div class="mt-5">
                <p>{$t("guida.navigazione.paragraph2")}</p>
                <ul>
                  <li class="mt-3">{$t("guida.navigazione.listitem1")}</li>
                  <li class="mt-3">
                    {$t("guida.navigazione.listitem2")}
                    <ul>
                      <li class="mt-3">
                        {@html $t("guida.navigazione.listitem2.innerlist", {
                          newLi: "</li><li class='mt-3'>",
                        })}
                      </li>
                    </ul>
                  </li>
                  <li class="mt-3">
                    {$t("guida.navigazione.listitem3")}
                    <ul>
                      <li class="mt-3">
                        {@html $t("guida.navigazione.listitem3.innerlist", {
                          newLi: "</li><li class='mt-3'>",
                        })}
                      </li>
                    </ul>
                  </li>
                  <li class="mt-3">
                    {$t("guida.navigazione.listitem4")}
                    <ul>
                      <li class="mt-3">
                        {@html $t("guida.navigazione.listitem4.innerlist", {
                          newLi: "</li><li class='mt-3'>",
                        })}
                      </li>
                    </ul>
                  </li>
                  <li class="mt-3">{$t("guida.navigazione.listitem5")}</li>
                  <li class="mt-3">
                    {$t("guida.navigazione.listitem6")}
                    <ul>
                      <li class="mt-3">
                        {@html $t("guida.navigazione.listitem6.innerlist", {
                          newLi: "</li><li class='mt-3'>",
                        })}
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div class="mt-5">
                <h3 class="sub-h3">{$t("guida.navigazione.subtitle7")}</h3>
                <img
                  src={$t("guida.briciole-di-pane")}
                  alt={$t("guida.navigazione.paragraphsmall3")}
                  class="d-block w-100"
                />
                <small class="d-block text-center mt-2"
                  >{$t("guida.navigazione.paragraphsmall3")}</small
                >
                <p class="mt-5">{$t("guida.navigazione.paragraph3")}</p>
              </div>

              <div class="mt-5">
                <h3 class="sub-h3">{$t("guida.navigazione.subtitle8")}</h3>
                <p>{$t("guida.navigazione.paragraph4")}</p>
                <img
                  src={$t("guida.link-interni")}
                  alt={$t("guida.navigazione.paragraphsmall4")}
                  class="d-block w-100"
                />
                <small class="d-block text-center mt-2"
                  >{$t("guida.navigazione.paragraphsmall4")}</small
                >
              </div>

              <div class="mt-3">
                <p>{$t("guida.navigazione.paragraph5")}</p>
                <img
                  src={$t("guida.link-interni-pulsanti")}
                  alt={$t("guida.navigazione.paragraphsmall5")}
                  class="d-block mx-auto w-50"
                />
                <small class="d-block text-center mt-2"
                  >{$t("guida.navigazione.paragraphsmall5")}</small
                >
              </div>

              <div>
                <p>{$t("guida.navigazione.paragraph6")}</p>
              </div>

              <div class="mt-5">
                <h3 class="sub-h3">{$t("guida.navigazione.subtitle9")}</h3>
                <img
                  src={$t("guida.collegamento-footer")}
                  alt={$t("guida.navigazione.paragraphsmall6")}
                  class="d-block w-100"
                />
                <small class="d-block text-center mt-2"
                  >{$t("guida.navigazione.paragraphsmall6")}</small
                >
                <p class="mt-3">{$t("guida.navigazione.paragraph7")}</p>
                <ul>
                  <li>
                    {@html $t("guida.navigazione.collegamentifooterlist", {
                      newLi: "</li><li class='mt-3'>",
                    })}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .sub-h2 {
    font-size: 32px !important;
    font-weight: 700 !important;
    color: #1a1a1a !important;
  }

  .sub-h3 {
    font-size: 28px !important;
    font-weight: 700 !important;
    color: #1a1a1a !important;
  }

  .lightBlueBackground {
    background-color: #f2f7fc;
    padding-top: 1px;
    padding-bottom: 32px;
  }

  .darkText {
    color: #003366;
    font-size: 18px;
    font-weight: 600;
  }

  .invisibleBtn {
    border: none !important;
    background-color: transparent;
    text-decoration: underline;
    color: #06c;
  }

  .invisibleBtn:hover {
    color: #0052a3;
  }

  @media (min-width: 991px) {
    .borderLeft {
      border-left: 1px solid #c5c7c9;
      padding-left: 24px;
    }
  }

  .nav-tabs {
    overflow-x: hidden;
  }

  .nav-tabs .nav-link {
    color: #06c !important;
  }

  .nav-tabs.nav-tabs-vertical {
    border-right: none !important;
    border-left: 1px solid #dfe4f2;
  }

  .nav-tabs.nav-tabs-vertical .nav-link {
    border-right: none !important;
    border-left: 1px solid rgba(0, 0, 0, 0.125);
  }

  .nav-link.active {
    border-left-color: #003366 !important;
    border-left-width: 2px !important;
    color: #003366 !important;
    border-right-color: unset !important;
  }
</style>
