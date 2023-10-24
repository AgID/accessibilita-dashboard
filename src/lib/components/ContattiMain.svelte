<script>
  import Icon from "./Icon.svelte";
</script>

<div class="container my-4">
  <div class="mb-5">
    <div class="d-inline-flex my-4">
      <span aria-hidden="true"
        ><Icon name="it it-mail" variant="primary" size="lg" /></span
      >
      <h2 class="lead mx-3">Contattaci</h2>
    </div>

    <div class="row my-4">
      <div class="col-12 col-lg-6">
        <div class="card-wrapper card-space">
          <div class="card card-bg card-big border-bottom-card">
            <div class="flag-icon" />
            <div class="card-body">
              <p class="card-title h3">Domande relative ai contenuti della piattaforma </p>
              <p class="card-text">Ulteriori informazioni relative ai contenuti  possono essere richieste a <a
                href="mailto:stampa@agid.gov.it"
                title="Il link aprirà l'applicazione predefinita di posta elettronica"
                >stampa@agid.gov.it</a
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
