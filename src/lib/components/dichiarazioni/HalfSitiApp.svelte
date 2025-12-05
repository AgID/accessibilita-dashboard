<script>
  import { onMount } from "svelte";
  import { t } from "../../utils/i18n";
  import Icon from "../Icon.svelte";
  import { nf } from "../../utils/index";

  let totaleAPP = $state();
  let totaleSITI = $state();

  onMount(async () => {
    const rsAPP = await fetch("/data/dichiarazione_app_intestazione.json");
    const dataAPP = await rsAPP.json();
    totaleAPP = dataAPP.find(
      (d) => d.indicatore == "num_dichiarazioni_app_pub_tot"
    ).valore;

    const rsSITI = await fetch("/data/dichiarazione_intestazione.json");
    const dataSITI = await rsSITI.json();
    totaleSITI = dataSITI.find(
      (d) => d.indicatore == "num_dichiarazioni_pub_tot"
    ).valore;
  });
</script>

<div class="row mx-0 mb-5">
  <div class="col-12 col-lg-6 web py-5">
    <div class="d-flex justify-content-end text-center">
      <div class="container biggerLeft me-lg-0">
        <img
          src="/images/responsive_layout.svg"
          alt=""
          class=""
          aria-hidden="true"
        />
        <p class="h3 py-3 px-lg-5 greyText">{$t("dicMain.goWeb")}</p>
        <p class="cardMainData pb-4">{nf(totaleSITI)}</p>
        <a
          href="/dichiarazione/siti"
          title={$t("dicMain.moreInfoWeb")}
          class="button-text a-button d-inline-flex"
          style="text-decoration: none;"
        >
          {$t("dicMain.moreInfoWeb")}
          <Icon name="it it-arrow-right" variant="white" size="sm" />
        </a>
      </div>
    </div>
  </div>
  <div class="col-12 col-lg-6 app py-5">
    <div class="d-flex justify-content-start text-center">
      <div class="container biggerRight ms-lg-0">
        <img
          src="/images/mobile_friendly.svg"
          alt=""
          class=""
          aria-hidden="true"
        />
        <p class="h3 py-3 px-lg-5 greyText">{$t("dicMain.goApp")}</p>
        <p class="cardMainData pb-4">{nf(totaleAPP)}</p>
        <a
          href="/dichiarazione/app"
          title={$t("dicMain.moreInfoApp")}
          class="button-text a-button d-inline-flex"
          style="text-decoration: none;"
        >
          {$t("dicMain.moreInfoApp")}
          <Icon name="it it-arrow-right" variant="white" size="sm" />
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  .web {
    background-color: #f2f7fc;
  }

  .app {
    background-color: #e8f2fc;
  }

  .a-button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 24px;
    gap: 8px;
    border: none;
    width: 210px;
    height: 52px;
    background: #0066cc;
    border-radius: 4px;
  }

  .a-button:hover {
    background: #004c99;
    color: white;
  }

  .a-button:active {
    background: #003366;
    color: white;
  }

  @media (min-width: 1650px) {
    .biggerLeft {
      width: 80%;
    }
    .biggerRight {
      width: 80%;
    }
  }

  @media (min-width: 1850px) {
    .biggerLeft {
      width: 70%;
    }
    .biggerRight {
      width: 70%;
    }
  }

  @media (min-width: 2050px) {
    .biggerLeft {
      width: 60%;
    }
    .biggerRight {
      width: 60%;
    }
  }

  @media (min-width: 2250px) {
    .biggerLeft {
      width: 55%;
    }
    .biggerRight {
      width: 55%;
    }
  }

  @media (min-width: 2650px) {
    .biggerLeft {
      width: 50%;
    }
    .biggerRight {
      width: 50%;
    }
  }

  @media (min-width: 3500px) {
    .biggerLeft {
      width: 40%;
    }
    .biggerRight {
      width: 40%;
    }
  }

  @media (min-width: 4000px) {
    .biggerLeft {
      width: 35%;
    }
    .biggerRight {
      width: 35%;
    }
  }

  @media (min-width: 5500px) {
    .biggerLeft {
      width: 25%;
    }
    .biggerRight {
      width: 25%;
    }
  }

  @media (min-width: 7000px) {
    .biggerLeft {
      width: 20%;
    }
    .biggerRight {
      width: 20%;
    }
  }
</style>
