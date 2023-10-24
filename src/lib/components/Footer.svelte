<script>
  import Icon from "./Icon.svelte";
  function onAnchorClick(e) {
    e.srcElement.blur();
    document.getElementById("skipContentuto").focus();
  }
</script>

<div class="footer">
  <div class="container pt-5 pb-3">
    <div class="row justify-content-between">
      <div class="col-12 col-md-6 col-lg-4 pb-5">
        <a
          class="dashboard-footer"
          href="https://next-generation-eu.europa.eu/index_it"
          title="Il link si apre in una nuova finestra"
          target="_blank"
          rel="noreferrer"
        >
          <img
            alt="Unione Europea - Next Generation EU"
            src="/logo/unioneEuropa.svg"
          />
        </a>
      </div>
      <div class="col-12 col-md-6 col-lg-4 pb-5 d-inline">
        <a
          class="dashboard-footer"
          href="https://innovazione.gov.it/"
          title="Il link si apre in una nuova finestra"
          target="_blank"
          rel="noreferrer"
        >
          <img
            alt="Dipartimento per la trasformazione digitale"
            src="/logo/dipartimentoDigitale.svg"
          />
        </a>
      </div>
      <div class="col-12 col-md-6 col-lg-4 pb-5 d-inline">
        <a
          class="dashboard-footer"
          href="https://www.agid.gov.it/"
          title="Il link si apre in una nuova finestra"
          target="_blank"
          rel="noreferrer"
        >
          <img
            alt="AGID Agenzia per l'Italia Digitale"
            src="/logo/AGIDlogoW.png"
            class="logo"
          />
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
              title="Il link si apre in una nuova finestra"
              target="_blank"
              rel="noreferrer"
              href="https://form.agid.gov.it/view/a08aad43-5c88-41f2-b7c5-fca8738525df"
              >Dichiarazione di Accessibilità <Icon
              name="it it-external-link"
              variant="white"
              size="xs"
              customClass="mb-1"
            /></a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link linkSM"
              href="/media-policy"
              on:click={onAnchorClick}>Media Policy</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link linkSM"
              href="/note-legali"
              on:click={onAnchorClick}>Note Legali</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link linkSM"
              href="/privacy-policy"
              on:click={onAnchorClick}>Privacy Policy</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link linkSM"
              href="/contattaci"
              on:click={onAnchorClick}>Contattaci</a
            >
          </li>
          <!-- <li class="nav-item">
            <a
              class="nav-link linkSM"
              href="/"
              title="Il link si apre in una nuova finestra"
              on:click={onAnchorClick}
              >Aiutaci a migliorare la dashboard
              <Icon
                name="it it-external-link"
                variant="white"
                size="xs"
                customClass="mb-1"
              />
            </a>
          </li> -->
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
    max-width: 70%;
  }

  .dashboard-footer img.logo {
    max-width: 90% !important;
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
