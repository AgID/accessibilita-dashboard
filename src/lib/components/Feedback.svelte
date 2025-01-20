<script>
  import Icon from "./Icon.svelte";
  import { t } from "../utils/i18n";
  import {
    sceltaProfessione,
    sceltaWeb,
    feedback,
    details,
    resetValue,
  } from "../../store/feedback";
  import { page } from "@roxi/routify";

  let showModal;

  let baseUrl = window.location.origin;
  $: currentPath = $page.path || "";

  let charCounter;
  $: charCounter = $details.length;

  let showThanks = false;
  $: showThanks;

  function showThanksCard() {
    showThanks = true;
    setTimeout(() => {
      showThanks = false;
    }, 3000);
  }

  let isSubmitted = false;
  let errors = { sceltaProfessione: false, sceltaWeb: false, details: false };

  function handleInputChange() {
    if (isSubmitted) {
      errors = {
        sceltaProfessione: !$sceltaProfessione,
        sceltaWeb: !$sceltaWeb,
        details: !$details.trim(),
      };
    }
  }

  function validForm() {
    isSubmitted = true;
    errors = {
      sceltaProfessione: !$sceltaProfessione,
      sceltaWeb: !$sceltaWeb,
      details: !$details.trim(),
    };
    return !(errors.sceltaProfessione || errors.sceltaWeb || errors.details);
  }

  async function sendFeedback(event) {
    event.preventDefault();

    if (validForm()) {
      const queryParams = new URLSearchParams({
        url_sito: baseUrl,
        url_pagina: currentPath === "/index" ? "/" : currentPath,
        chi_sei: $sceltaProfessione,
        provenienza: $sceltaWeb,
        testo_feedback: $details,
        esito_feedback: "negativo",
      }).toString();

      await fetch(
        `https://feedback.accessibilita.agid.gov.it/api/v1/feedback/add?${queryParams}`,
        {
          mode: "no-cors",
          method: "POST",
        }
      );

      showThanksCard();
      resetValue();
      isSubmitted = false;
      showModal = false;
    }
  }

  function sendOROpen() {
    if ($feedback == "positivo") {
      const queryParams = new URLSearchParams({
        url_sito: baseUrl,
        url_pagina: currentPath === "/index" ? "/" : currentPath,
        esito_feedback: "positivo",
      }).toString();

      fetch(
        `https://feedback.accessibilita.agid.gov.it/api/v1/feedback/add?${queryParams}`,
        {
          mode: "no-cors",
          method: "POST",
        }
      );

      showThanksCard();
    } else {
      showModal = true;
    }
  }
</script>

<div class="feedbackBG">
  <div class="container">
    <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
      <div class="card-wrapper card-space py-5">
        <div class="card rounded card-bg no-after">
          {#if !showThanks}
            <div class="card-body">
              <form on:submit|preventDefault={sendOROpen}>
                <p class="card-title display6 greyText">
                  {$t("feedback.cardTitle")}
                </p>
                <div class="card-text">
                  <div class="form-check form-check-inline">
                    <input
                      name="sceltaFeedback"
                      bind:group={$feedback}
                      type="radio"
                      value="positivo"
                      id="si"
                    />
                    <label for="si">{$t("feedback.optionOne")}</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      name="sceltaFeedback"
                      bind:group={$feedback}
                      type="radio"
                      value="negativo"
                      id="no"
                    />
                    <label for="no">{$t("feedback.optionTwo")}</label>
                  </div>
                </div>
                <button
                  type="submit"
                  class="btn btn-outline-primary btn-md {$feedback == null &&
                    'disabled'}"
                  on:click|preventDefault={sendOROpen}
                >
                  {$t("feedback.sendButton")}
                </button>
              </form>
            </div>
          {:else}
            <div class="card-body">
              <p class="mb-0">
                <Icon
                  name="it it-check-circle"
                  variant="primary"
                  size="xl"
                  customClass="me-2"
                />
                {$t("feedback.optionOneConfirmation")}
              </p>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

{#if showModal}
  <div class="modal-backdrop show"></div>
  <div
    class="modal fade show"
    tabindex="-1"
    role="dialog"
    id="feedbackModal"
    aria-labelledby="feedbackModalTitle"
    style="display:block;"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content p-3">
        <div class="modal-header">
          <img
            src="/images/modale.svg"
            alt=""
            aria-hidden="true"
            height="90px"
          />
          <button
            class="btn-close mb-auto"
            type="button"
            on:click={() => {
              resetValue();
              showModal = false;
            }}
            aria-label={$t("feedback.closeModal")}
          >
            <Icon name="it it-close-circle" variant="primary" size="md" />
          </button>
        </div>
        <div class="modal-body">
          <h1 class="modal-title h3 greyText mb-3">{$t("feedback.title")}</h1>
          <h2 class="modal-title cardTitle mb-2 greyText">
            {$t("feedback.subtitle")}
          </h2>
          <p class="greyText mb-4">
            {$t("feedback.description")}
          </p>

          <form>
            <h3 class="h4 greyText mt-4">
              <Icon
                name="it it-user"
                variant="primary"
                customClass="mb-1 me-4"
              />{$t("feedback.questionOne")}
            </h3>
            {#if isSubmitted && errors.sceltaProfessione}
              <div class="error-message">
                {$t("feedback.requiredField")}
              </div>
            {/if}
            <div class="cardBG rounded shadow-lg">
              <div class="form-group p-4 mb-3">
                <div class="form-check">
                  <input
                    name="sceltaProfessione"
                    type="radio"
                    value="Pubblica amministrazione"
                    bind:group={$sceltaProfessione}
                    on:change={handleInputChange}
                    id="radio1"
                  />
                  <label for="radio1" class="mb-0"
                    >{$t("feedback.oneFirst")}</label
                  >
                </div>
                <div class="form-check">
                  <input
                    name="sceltaProfessione"
                    type="radio"
                    value="Cittadino"
                    bind:group={$sceltaProfessione}
                    on:change={handleInputChange}
                    id="radio2"
                  />
                  <label for="radio2" class="mb-0"
                    >{$t("feedback.oneSecond")}</label
                  >
                </div>
                <div class="form-check">
                  <input
                    name="sceltaProfessione"
                    type="radio"
                    value="Giornalista e/o addetto stampa"
                    bind:group={$sceltaProfessione}
                    on:change={handleInputChange}
                    id="radio3"
                  />
                  <label for="radio3" class="mb-0"
                    >{$t("feedback.oneThird")}</label
                  >
                </div>
                <div class="form-check">
                  <input
                    name="sceltaProfessione"
                    type="radio"
                    value="Azienda privata"
                    bind:group={$sceltaProfessione}
                    on:change={handleInputChange}
                    id="radio4"
                  />
                  <label for="radio4" class="mb-0"
                    >{$t("feedback.oneFourth")}</label
                  >
                </div>
                <div class="form-check">
                  <input
                    name="sceltaProfessione"
                    type="radio"
                    value="Altro"
                    bind:group={$sceltaProfessione}
                    on:change={handleInputChange}
                    id="radio5"
                  />
                  <label for="radio5" class="mb-0"
                    >{$t("feedback.oneFifth")}</label
                  >
                </div>
              </div>
            </div>

            <h3 class="h4 greyText pt-2 mt-4">
              <img
                src="/images/webIcon.svg"
                alt="world wide web"
                class="mb-1 me-4"
              />{$t("feedback.questionTwo")}
            </h3>
            {#if isSubmitted && errors.sceltaWeb}
              <div class="error-message">
                {$t("feedback.requiredField")}
              </div>
            {/if}
            <div class="cardBG rounded shadow-lg">
              <div class="form-group p-4 mb-3">
                <div class="form-check">
                  <input
                    name="sceltaWeb"
                    type="radio"
                    value="Motore di ricerca"
                    bind:group={$sceltaWeb}
                    on:change={handleInputChange}
                    id="radio6"
                  />
                  <label for="radio6" class="mb-0"
                    >{$t("feedback.twoFirst")}</label
                  >
                </div>
                <div class="form-check">
                  <input
                    name="sceltaWeb"
                    type="radio"
                    value="Messaggio e/o post social"
                    bind:group={$sceltaWeb}
                    on:change={handleInputChange}
                    id="radio7"
                  />
                  <label for="radio7" class="mb-0"
                    >{$t("feedback.twoSecond")}</label
                  >
                </div>
                <div class="form-check">
                  <input
                    name="sceltaWeb"
                    type="radio"
                    value="Navigazione del sito"
                    bind:group={$sceltaWeb}
                    on:change={handleInputChange}
                    id="radio8"
                  />
                  <label for="radio8" class="mb-0"
                    >{$t("feedback.twoThird")}</label
                  >
                </div>
                <div class="form-check">
                  <input
                    name="sceltaWeb"
                    type="radio"
                    value="Altro sito web"
                    bind:group={$sceltaWeb}
                    on:change={handleInputChange}
                    id="radio9"
                  />
                  <label for="radio9" class="mb-0"
                    >{$t("feedback.twoFourth")}</label
                  >
                </div>
                <div class="form-check">
                  <input
                    name="sceltaWeb"
                    bind:group={$sceltaWeb}
                    on:change={handleInputChange}
                    type="radio"
                    value="Altro"
                    id="radio10"
                  />
                  <label for="radio10" class="mb-0"
                    >{$t("feedback.twoFifth")}</label
                  >
                </div>
              </div>
            </div>

            <h3 class="h4 greyText pt-2 mt-4">
              <Icon
                name="it it-mail"
                variant="primary"
                customClass="mb-1 me-4"
              />{$t("feedback.questionThree")}
            </h3>
            {#if isSubmitted && errors.details}
              <div class="error-message">
                {$t("feedback.requiredField")}
              </div>
            {/if}
            <div class="cardBG rounded shadow-lg pt-5 p-4">
              <div class="form-group mb-0">
                <label for="textAreaFeedback" class="labelTextArea">
                  {$t("feedback.threeFirst")}
                </label>
                <textarea
                  autocomplete="off"
                  id="textAreaFeedback"
                  on:input={handleInputChange}
                  bind:value={$details}
                  rows="3"
                  maxlength="200"
                ></textarea>
                <span class="d-flex justify-content-end">{charCounter}/200</span
                >
              </div>
            </div>

            <button
              class="btn btn-primary btn-md my-4"
              on:click|preventDefault={sendFeedback}
              type="submit">{$t("feedback.sendButton")}</button
            >
          </form>
        </div>
      </div>
    </div>
  </div>
{/if}

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

  .error-message {
    color: red;
    text-align: right;
    font-size: 0.9em;
    font-style: italic;
    margin-right: 20px;
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
