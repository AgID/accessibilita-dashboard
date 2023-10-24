<script>
  import { onMount } from "svelte";
  import Icon from "./Icon.svelte";

  let rs;

  onMount(async () => {
    const response = await fetch("/data/release.json");
    rs = await response.json();
  });
</script>

<div class="d-flex mb-lg-5">
  <div class="mb-5">
    <div class="col-12 mt-3 mb-4">
      <div class="d-inline-flex">
        <span aria-hidden="true">
          <Icon name="it it-calendar" variant="primary" size="lg" />
        </span>
        <h2 class="lead mx-3">Cronologia del progetto</h2>
      </div>
      <p class="display5 mb-4">
        Scopri gli aggiornamenti in arrivo e rivedi i dettagli degli
        aggiornamenti passati
      </p>

      <div class="pb-3 pb-lg-5 pt-2 mb-5">
        <p class="display6 mb-3">Legenda</p>
        <div class="d-sm-inline-block">
          <p>
            <span class="whiteLittleCircle" id="futuro">
              <img src="/images/futuro.svg" alt="versione futura" />
            </span>
            <span class="testoLegenda">Aggiornamenti in arrivo</span>
          </p>
        </div>
        <div class="d-sm-inline-block">
          <p>
            <span class="whiteLittleCircle" id="presente">
              <img src="/images/presente.svg" alt="versione attuale" />
            </span>
            <span class="testoLegenda">Versione attuale </span>
          </p>
        </div>
        <div class="d-md-inline-block">
          <p>
            <span class="whiteLittleCircle" id="passato">
              <img src="/images/passato.svg" alt="versione passata" />
            </span>
            <span class="testoLegenda">Versioni passate</span>
          </p>
        </div>
      </div>
    </div>

    <div class="it-timeline-wrapper">
      <div class="row pt-3 pt-lg-0 pb-0">
        {#if rs}
          {#each rs as rs}
            <div class="col-12 px-lg-5">
              <div class="timeline-element">
                <div
                  class="it-pin-wrapper {rs.release == 'Passata'
                    ? 'it-evidence'
                    : ''}{rs.release == 'Attuale' ? 'it-now' : ''}"
                >
                  <div class="pin-icon">
                    <img
                      src="/images/{(rs.release == 'Passata' &&
                        'passato.svg') ||
                        (rs.release == 'Attuale' && 'presente.svg') ||
                        (rs.release == 'In Arrivo' && 'futuro.svg')}"
                      alt="{(rs.release == 'Passata' &&
                        'versione passata') ||
                        (rs.release == 'Attuale' && 'versione attuale') ||
                        (rs.release == 'In Arrivo' && 'versione futura')}"
                      class="px-auto"
                    />
                  </div>
                  <div class="pin-text">
                    <span>
                      {#if rs.release == "In Arrivo"}
                        In arrivo
                      {:else}
                        {rs.date}
                      {/if}
                    </span>
                  </div>
                </div>
                <div class="card-wrapper">
                  <div class="card">
                    <div class="card-body pt-lg-0 customPadding">
                      <h5 class="card-title">{rs.title}</h5>
                      <p class="card-text">
                        {rs.details}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .card::after {
    margin: 0px !important;
  }

  .it-timeline-wrapper .it-pin-wrapper .pin-text {
    text-transform: none !important;
  }

  .whiteLittleCircle {
    width: 40px;
    height: 40px;
    border-radius: 48px;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);
    border: 5px solid #fff;
    margin: 0 10px;
  }

  #futuro {
    background: #fff;
  }

  #presente {
    background: #0066cc;
  }

  #passato {
    background: #003366;
  }

  .testoLegenda {
    vertical-align: super;
  }

  :global(.pin-icon) {
    border: 5px solid #fff !important;
    width: 40px !important;
    height: 40px !important;
  }

  @media (max-width: 992px) {
    .it-timeline-wrapper .col-12 .it-pin-wrapper .pin-icon {
      margin-left: 4px;
    }
  }

  @media (min-width: 992px) {
    .it-timeline-wrapper .col-12:nth-child(odd) .it-pin-wrapper .pin-icon {
      margin-right: 4px !important;
      margin-left: 30px !important;
    }

    .it-timeline-wrapper .col-12:nth-child(even) .it-pin-wrapper .pin-icon {
      margin-left: 4px !important;
      margin-right: 30px !important;
    }

    .it-timeline-wrapper .col-12:nth-child(odd) .customPadding {
      padding-right: 16px !important;
      padding-left: 40px !important;
    }

    .it-timeline-wrapper .col-12:nth-child(even) .customPadding {
      padding-left: 16px !important;
      padding-right: 40px !important;
    }
  }
</style>
