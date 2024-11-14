<script>
  import Icon from "./Icon.svelte";

  import { t } from "../utils/i18n";
</script>

<div class="container my-4">
  <div class="mb-5">
    <div class="d-inline-flex my-4">
      <span aria-hidden="true"
        ><Icon name="it it-mail" variant="primary" size="lg" /></span
      >
      <h1 class="lead mx-3">{$t("contacts.title")}</h1>
    </div>

    <div class="row my-4">
      <div class="col-12 col-lg-6">
        <div class="card-wrapper card-space">
          <div class="card card-bg card-big border-bottom-card">
            <div class="flag-icon" />
            <div class="card-body">
              <p class="card-title h3">{$t("contacts.info")}</p>
              <p class="card-text">
                {$t("contacts.description")}
                <a
                  href="mailto:stampa@agid.gov.it"
                  title={$t("layout.mailto")}>stampa@agid.gov.it</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
