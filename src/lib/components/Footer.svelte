<script>
  import Icon from "./Icon.svelte";
  function onAnchorClick(e) {
    e.srcElement.blur();
    document.getElementById("skipContentuto").focus();
  }

  import { t } from "../utils/i18n";
</script>

<div class="footer">
  <div class="container pt-5 pb-3">
    <div class="row justify-content-between">
      <div class="col-12 col-md-6 col-lg-4 pb-5">
        <a
          class="dashboard-footer"
          href={$t("footer.linkUE")}
          title={$t("layout.externalLink")}
          target="_blank"
          rel="noreferrer"
        >
          <img
            alt={$t("footer.logoUE")}
            src="/logo/unioneEuropa.svg"
            class="logo"
          />
        </a>
      </div>
      <div class="col-12 col-md-6 col-lg-4 pb-5 d-inline">
        <a
          class="dashboard-footer"
          href={$t("footer.linkDTD")}
          title={$t("layout.externalLink")}
          target="_blank"
          rel="noreferrer"
        >
          <img alt={$t("footer.logoDTD")} src="/logo/logo-dtd-white.svg" />
        </a>
      </div>
      <div class="col-12 col-md-6 col-lg-4 pb-5 d-inline">
        <a
          class="dashboard-footer"
          href={$t("footer.linkAGID")}
          title={$t("layout.externalLink")}
          target="_blank"
          rel="noreferrer"
        >
          <img alt={$t("footer.logoAGID")} src="/logo/AGIDlogoW.png" />
        </a>
      </div>
    </div>

    <div class="row pt-5 pt-md-3">
      <div class="col-12">
        <hr class="footer-hr" />
        <ul class="navbar-nav">
          <li class="nav-item">
            <a
              class="nav-link linkSM"
              title={$t("layout.externalLink")}
              target="_blank"
              rel="noreferrer"
              href="https://form.agid.gov.it/view/9cbe42f0-a0ee-11ef-93b8-1d8fdd5aa94f"
              >{$t("footer.statement")}<Icon
                name="it it-external-link"
                variant="white"
                size="sm"
                customClass="ms-1 mb-1"
              /></a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link linkSM"
              href="/media-policy"
              on:click={onAnchorClick}>{$t("footer.mediaPolicy")}</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link linkSM"
              href="/note-legali"
              on:click={onAnchorClick}>{$t("footer.legalPolicy")}</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link linkSM"
              href="/privacy-policy"
              on:click={onAnchorClick}>{$t("footer.privacyPolicy")}</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link linkSM" href="/contatti" on:click={onAnchorClick}
              >{$t("footer.contacts")}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

<style>
  .footer {
    background-color: #003366;
  }

  .dashboard-footer img {
    max-width: 85%;
  }

  .dashboard-footer img.logo {
    max-width: 75% !important;
  }

  ul,
  li,
  .nav-link {
    display: inline;
    margin-right: 1rem;
  }

  .footer a {
    color: #f5f5f5;
  }

  .footer-hr {
    color: #003366;
    height: 2px;
    width: 100%;
  }

  .nav-link {
    text-decoration: none;
  }
</style>
