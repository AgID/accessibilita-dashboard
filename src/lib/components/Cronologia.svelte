<script>
  import { onMount } from "svelte";
  import Icon from "./Icon.svelte";
  import { t, locale } from "../utils/i18n";
  import Breadcrumb from "./Breadcrumb.svelte";
  import BannerPageUpdated from "./BannerPageUpdated.svelte";

  let rs;

  onMount(async () => {
    const response = await fetch("/data/release.json");
    rs = await response.json();
  });
</script>

<Breadcrumb currentPage={$t("breadcrumb.cronologia")}></Breadcrumb>
<BannerPageUpdated pageId="cronologia" />
<div class="d-flex mb-lg-5">
  <div class="mb-5">
    <div class="col-12 mb-4">
      <div class="d-inline-flex">
        <span aria-hidden="true">
          <Icon name="it it-calendar" variant="primary" size="lg" />
        </span>
        <h1 class="lead mx-3">{$t("timeline.title")}</h1>
      </div>
      <h2 class="display5 mb-4">
        {$t("timeline.subtitle")}
      </h2>

      <div class="pb-3 pb-lg-5 pt-2 mb-5">
        <p class="display6 mb-3">{$t("timeline.caption")}</p>
        <div class="d-sm-inline-block">
          <p>
            <span class="whiteLittleCircle" id="futuro">
              <img src="/images/futuro.svg" alt={$t("timeline.info1b")} />
            </span>
            <span class="testoLegenda">{$t("timeline.info1a")}</span>
          </p>
        </div>
        <div class="d-sm-inline-block">
          <p>
            <span class="whiteLittleCircle" id="presente">
              <img src="/images/presente.svg" alt={$t("timeline.info2")} />
            </span>
            <span class="testoLegenda">{$t("timeline.info2")}</span>
          </p>
        </div>
        <div class="d-md-inline-block">
          <p>
            <span class="whiteLittleCircle" id="passato">
              <img src="/images/passato.svg" alt={$t("timeline.info3")} />
            </span>
            <span class="testoLegenda">{$t("timeline.info3")}</span>
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
                  class="it-pin-wrapper {rs.release_it == 'Passata'
                    ? 'it-evidence'
                    : ''}{rs.release_it == 'Attuale' ? 'it-now' : ''}"
                >
                  <div class="pin-icon">
                    <img
                      src="/images/{(rs.release_it == 'Passata' &&
                        'passato.svg') ||
                        (rs.release_it == 'Attuale' && 'presente.svg') ||
                        (rs.release_it == 'In Arrivo' && 'futuro.svg')}"
                      alt={(rs.release_it == "Passata" &&
                        $t("timeline.info3")) ||
                        (rs.release_it == "Attuale" && $t("timeline.info2")) ||
                        (rs.release_it == "In Arrivo" && $t("timeline.info1a"))}
                      class="px-auto"
                    />
                  </div>
                  <div class="pin-text">
                    <h3>
                      <span class="p-0">
                        {#if rs.release_it == "In Arrivo"}
                          {$t("timeline.futureDate")}
                        {:else}
                          {rs[`date_${$locale}`]}
                        {/if}
                      </span>
                    </h3>
                  </div>
                </div>
                <div class="card-wrapper">
                  <div class="card">
                    <div class="card-body pt-lg-0 customPadding">
                      <h4 class="card-title">{rs[`title_${$locale}`]}</h4>
                      <p class="card-text">
                        {rs[`details_${$locale}`]}
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
  .pin-text > h3 {
    margin-bottom: 0 !important;
    font-size: 16px;
    line-height: 28px;
    padding: 4px 0;
  }

  .it-timeline-wrapper .col-12:nth-child(odd) .it-pin-wrapper .pin-text > h3 {
    padding-left: 16px;
  }

  .it-timeline-wrapper
    .col-12:nth-child(odd)
    .it-pin-wrapper
    .pin-text
    > h3
    > span {
    padding-right: 16px !important;
  }

  .it-timeline-wrapper .col-12:nth-child(even) .it-pin-wrapper .pin-text > h3 {
    padding-right: 16px;
  }

  .it-timeline-wrapper
    .col-12:nth-child(even)
    .it-pin-wrapper
    .pin-text
    > h3
    > span {
    padding-left: 16px !important;
  }

  .card .card-body h4.card-title {
    font-size: 1rem;
    line-height: 1.4444444444rem;
    font-weight: 700;
    color: #17324d;
    margin-bottom: 16px;
    transition: all 0.3s;
  }

  .card .card-body h4.card-title + .card-text {
    padding-top: 0;
  }

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
