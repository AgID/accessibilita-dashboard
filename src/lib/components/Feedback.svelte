<script>
  import Icon from "./Icon.svelte";
  import {
    sceltaProfessione,
    sceltaWeb,
    feedback,
    details,
    resetValue,
  } from "../../store/feedback";
  import { page } from "@roxi/routify";
  let baseUrl = window.location.origin;
  $: currentPath = $page.path || "";

  async function sendFeedback() {
    await fetch("https://feedback.designers.italia.it/api/messages", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      body: JSON.stringify(
        {
          feedback: "-",
          url: `${baseUrl}${currentPath == "/index" ? '' : currentPath}`,
          who: $sceltaProfessione,
          from: $sceltaWeb,
          details: $details,
          captcha: "captcha-challenge-string",
        } || {}
      ),
    });
    resetValue();
  }

  let positiveFeedbackSent = false;

  function sendOROpen() {
    if ($feedback == "si") {
      fetch("https://feedback.designers.italia.it/api/messages", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        body: JSON.stringify(
          {
            feedback: "+",
            url: `${baseUrl}${currentPath == "/index" ? '' : currentPath}`,
          } || {}
        ),
      });
      positiveFeedbackSent = true;

      setTimeout(() => {
        positiveFeedbackSent = false;
      }, 3000);
    }
  }
</script>

<div class="feedbackBG">
  <div class="container">
    <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
      <div class="card-wrapper card-space py-5">
        <div class="card rounded card-bg no-after">
          {#if positiveFeedbackSent}
            <div class="card-body">
              <p class="mb-0">
                <Icon
                  name="it it-check-circle"
                  variant="primary"
                  size="xl"
                  customClass="me-2"
                /> Feedback inviato. Grazie
              </p>
            </div>
          {:else}
            <div class="card-body">
              <p class="card-title display6 greyText">
                Hai trovato utile questa pagina?
              </p>
              <div class="card-text">
                <div class="form-check form-check-inline">
                  <input
                    name="sceltaFeedback"
                    bind:group={$feedback}
                    type="radio"
                    value="si"
                    id="si"
                  />
                  <label for="si">Si</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    name="sceltaFeedback"
                    bind:group={$feedback}
                    type="radio"
                    value="no"
                    id="no"
                  />
                  <label for="no">No</label>
                </div>
              </div>
              <div class="it-card-footer mt-2">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-md {$feedback == null &&
                    'disabled'}"
                  data-bs-toggle={$feedback == "no" ? "modal" : ""}
                  data-bs-target="#feedbackModal"
                  on:click={sendOROpen}>Invia feedback</button
                >
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<div
  class="modal fade"
  tabindex="-1"
  role="dialog"
  id="feedbackModal"
  aria-labelledby="feedbackModalTitle"
>
  <div class="modal-dialog" role="document">
    <div class="modal-content p-3">
      <div class="modal-header">
        <img src="/images/modale.svg" alt="" aria-hidden="true" height="90px" />
        <button
          class="btn-close mb-auto"
          type="button"
          data-bs-dismiss="modal"
          on:click={resetValue}
          aria-label="Chiudi finestra modale"
        >
          <Icon name="it it-close-circle" variant="primary" size="md" />
        </button>
      </div>
      <div class="modal-body">
        <h3 class="modal-title h3 greyText mb-3">Grazie della tua risposta!</h3>
        <h4 class="modal-title cardTitle mb-2 greyText">
          Aiutaci a migliorare la pagina con qualche dettaglio in più
        </h4>
        <p class="greyText mb-4">
          Le seguenti informazioni sono raccolte in forma anonima e ci aiutano a
          capire come migliroare la tua esperienza e l’esposizione dei dati
          senza trattare dati personali.
        </p>

        <h4 class="h4 greyText mt-4">
          <Icon
            name="it it-user"
            variant="primary"
            customClass="mb-1 me-4"
          />Chi sei?
        </h4>
        <div class="cardBG rounded shadow-lg">
          <div class="form-group p-4 mb-3">
            <div class="form-check">
              <input
                name="sceltaProfessione"
                type="radio"
                value="Pubblica amministrazione"
                bind:group={$sceltaProfessione}
                id="radio1"
              />
              <label for="radio1" class="mb-0">Pubblica amministrazione</label>
            </div>
            <div class="form-check">
              <input
                name="sceltaProfessione"
                type="radio"
                value="Cittadino"
                bind:group={$sceltaProfessione}
                id="radio2"
              />
              <label for="radio2" class="mb-0">Cittadino</label>
            </div>
            <div class="form-check">
              <input
                name="sceltaProfessione"
                type="radio"
                value="Giornalista e/o addetto stampa"
                bind:group={$sceltaProfessione}
                id="radio3"
              />
              <label for="radio3" class="mb-0"
                >Giornalista e/o addetto stampa</label
              >
            </div>
            <div class="form-check">
              <input
                name="sceltaProfessione"
                type="radio"
                value="Azienda privata"
                bind:group={$sceltaProfessione}
                id="radio4"
              />
              <label for="radio4" class="mb-0">Azienda privata</label>
            </div>
            <div class="form-check">
              <input
                name="sceltaProfessione"
                type="radio"
                value="Altro"
                bind:group={$sceltaProfessione}
                id="radio5"
              />
              <label for="radio5" class="mb-0">Altro</label>
            </div>
          </div>
        </div>

        <h4 class="h4 greyText pt-2 mt-4">
          <img
            src="/images/webIcon.svg"
            alt="world wide web"
            class="mb-1 me-4"
          />Hai trovato questa pagina grazie a:
        </h4>
        <div class="cardBG rounded shadow-lg">
          <div class="form-group p-4 mb-3">
            <div class="form-check">
              <input
                name="sceltaWeb"
                type="radio"
                value="Motore di ricerca"
                bind:group={$sceltaWeb}
                id="radio6"
              />
              <label for="radio6" class="mb-0">Motore di ricerca</label>
            </div>
            <div class="form-check">
              <input
                name="sceltaWeb"
                type="radio"
                value="Messaggio e/o post social"
                bind:group={$sceltaWeb}
                id="radio7"
              />
              <label for="radio7" class="mb-0">Messaggio e/o post social</label>
            </div>
            <div class="form-check">
              <input
                name="sceltaWeb"
                type="radio"
                value="Navigazione del sito"
                bind:group={$sceltaWeb}
                id="radio8"
              />
              <label for="radio8" class="mb-0">Navigazione del sito</label>
            </div>
            <div class="form-check">
              <input
                name="sceltaWeb"
                type="radio"
                value="Altro sito web"
                bind:group={$sceltaWeb}
                id="radio9"
              />
              <label for="radio9" class="mb-0">Altro sito web</label>
            </div>
            <div class="form-check">
              <input
                name="sceltaWeb"
                bind:group={$sceltaWeb}
                type="radio"
                value="Altro"
                id="radio10"
              />
              <label for="radio10" class="mb-0">Altro</label>
            </div>
          </div>
        </div>

        <h4 class="h4 greyText pt-2 mt-4">
          <Icon
            name="it it-mail"
            variant="primary"
            customClass="mb-1 me-4"
          />Come possiamo migliorare la pagina?
        </h4>
        <div class="cardBG rounded shadow-lg pt-5 p-4">
          <div class="form-group mb-0">
            <label for="textAreaFeedback" class="labelTextArea"
              >Inserisci qui il tuo testo</label
            >
            <textarea id="textAreaFeedback" bind:value={$details} rows="3" />
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          class="btn btn-primary btn-md"
          data-bs-dismiss="modal"
          on:click={sendFeedback}
          type="button">Invia feedback</button
        >
      </div>
    </div>
  </div>
</div>

<style>
  .feedbackBG {
    background-color: #004080;
  }

  .cardBG {
    background-color: white;
  }

  .greyText {
    color: #2f475e;
  }

  .btn-close {
    background: none !important;
    opacity: 1 !important;
  }

  :global(.btn-outline-primary.disabled) {
    box-shadow: inset 0 0 0 2px #125ca6;
    opacity: 0.89;
  }

  .modal-content {
    background-color: #f5f9fc;
  }

  .form-group .form-check {
    border-bottom: 1px solid lightgrey;
    margin-bottom: 25px;
  }

  .form-group label {
    font-weight: 400;
    width: 100%;
    padding-left: 0;
  }

  .form-group .form-check label {
    white-space: break-spaces;
    overflow: visible;
    padding-right: 2.8em;
  }

  .form-group label::before,
  .form-group label::after {
    left: auto;
    right: 7px;
  }

  .labelTextArea {
    top: -40px;
  }

  .modal-footer {
    background-color: unset !important;
    justify-content: flex-start;
  }

  @media (min-width: 576px) {
    .modal-dialog {
      max-width: 800px !important;
    }
  }

  @media (max-width: 575px) {
    .modal .modal-dialog {
      max-width: 500px !important;
    }
  }

  @media (max-width: 499px) {
    .modal-dialog {
      margin: 0;
    }
  }
</style>
