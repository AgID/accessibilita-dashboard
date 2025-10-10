<script>
  import Icon from "./Icon.svelte";
  import { t } from "../utils/i18n";
</script>

<div class="central-footer">
  <div class="container pt-5 pb-4 px-4">
    <div class="pb-4 d-flex justify-content-between flex-wrap gap-5">
      <a
        href={$t("footer.linkUE")}
        target="_blank"
        rel="noreferrer"
        title={$t("layout.externalLink")}
      >
        <img
          src="/logo/logo-next-generation-eu.svg"
          class="d-inline-block align-bottom"
          alt={$t("footer.logoUE")}
          height="40"
        />
      </a>
      <a
        href={$t("footer.linkDTD")}
        target="_blank"
        rel="noreferrer"
        title={$t("layout.externalLink")}
      >
        <img
          src="/logo/logo-dtd-white.svg"
          class="d-inline-block align-bottom"
          alt={$t("footer.logoDTD")}
          height="40"
        />
      </a>
      <a
        href={$t("footer.linkAGID")}
        target="_blank"
        rel="noreferrer"
        title={$t("layout.externalLink")}
        class="my-auto"
      >
        <img
          src="/logo/logo-agid-complete.svg"
          class="d-inline-block align-bottom"
          alt={$t("footer.logoAGID")}
          height="32"
        />
      </a>
    </div>
    <div class="d-md-flex justify-content-start pt-5">
      <p class="socialPar my-md-auto mb-3">Seguici su</p>
      <div class="socialIcons">
        <a
          href="https://www.facebook.com/AgIDGovIT/"
          target="_blank"
          rel="noreferrer"
          title={$t("layout.externalLink")}
          class="ms-md-4 me-4"
        >
          <Icon name="it it-facebook" variant="white" size="sm"></Icon>
        </a>
        <a
          href="https://twitter.com/AgidGov"
          target="_blank"
          rel="noreferrer"
          title={$t("layout.externalLink")}
          class="me-4"
        >
          <Icon name="it it-twitter" variant="white" size="sm"></Icon>
        </a>
        <a
          href="https://www.youtube.com/channel/UCxJmOWf__YcLgB19gy5dGQQ"
          target="_blank"
          class="me-4"
          rel="noreferrer"
          title={$t("layout.externalLink")}
        >
          <Icon name="it it-youtube" variant="white" size="sm"></Icon>
        </a>
        <a
          href="https://www.linkedin.com/company/agenzia-italia-digitale"
          class="me-4"
          target="_blank"
          rel="noreferrer"
          title={$t("layout.externalLink")}
        >
          <Icon name="it it-linkedin" variant="white" size="sm"></Icon>
        </a>
        <a
          href="https://medium.com/@AgidGov"
          class="me-4"
          target="_blank"
          rel="noreferrer"
          title={$t("layout.externalLink")}
        >
          <Icon name="it it-medium" variant="white" size="sm"></Icon>
        </a>
        <a
          href="https://www.instagram.com/agid_gov/"
          target="_blank"
          class="me-4"
          rel="noreferrer"
          title={$t("layout.externalLink")}
        >
          <Icon name="it it-instagram" variant="white" size="sm"></Icon>
        </a>
      </div>
    </div>
  </div>
  <div class="slim-bottom-footer p-4">
    <div class="container px-0 px-md-4">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a
            class="nav-link linkSM"
            title={$t("layout.externalLink")}
            target="_blank"
            rel="noreferrer"
            href="https://form.agid.gov.it/view/cc4b1380-9860-11f0-9d9a-f14d2a857510"
          >
            {$t("footer.statement")}
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link linkSM"
            href={$t("footer.mediaPolicyLink")}
            title={$t("layout.externalLink")}
            target="_blank"
            rel="noreferrer">{$t("footer.mediaPolicy")}</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link linkSM" href="/note-legali"
            >{$t("footer.legalPolicy")}</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link linkSM" href="/privacy-policy"
            >{$t("footer.privacyPolicy")}</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link linkSM" href="/guida-alla-piattaforma"
            >{$t("footer.guidaPiattaforma")}</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link linkSM" href="/contatti">{$t("footer.contacts")}</a
          >
        </li>
      </ul>
    </div>
  </div>
</div>

<style>
  .central-footer {
    background-color: #004d99;
  }

  .slim-bottom-footer a {
    color: #f5f5f5;
  }

  .slim-bottom-footer {
    border-top: 1px solid rgba(217, 218, 219, 0.4);
  }

  .linkSM {
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
    padding: 12px 0;
  }

  .socialPar {
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    color: #fff;
  }

  ul,
  li,
  .nav-link {
    display: inline;
    margin-right: 1rem;
  }

  a:hover:not(.active) {
    text-decoration: underline;
  }

  @media only screen and (max-width: 500px) {
    ul,
    li,
    .nav-link {
      display: flex;
    }
  }
</style>
