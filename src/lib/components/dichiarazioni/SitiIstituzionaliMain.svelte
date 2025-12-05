<script>
  import KpiSimpleCard from "../KpiSimpleCard.svelte";
  import { onMount } from "svelte";
  import { dp, df, nf } from "../../utils";
  import { t } from "../../utils/i18n";
  import Icon from "../Icon.svelte";

  let numDichiarazioniIstituzionali = $state();
  let date;
  let formattedDate;

  onMount(async () => {
    const rs = await fetch(
      "/data/dichiarazione_istituzionali_intestazione.json"
    );
    const data = await rs.json();
    numDichiarazioniIstituzionali = data.find(
      (d) => d.indicatore == "num_enti_con_dich_istituzionali_tutti_anni"
    ).valore;

    date = data[0].dat_ult_agg_dichiarazione;
    formattedDate = df(dp(date));
  });
</script>

<div class="mt-5">
  <h2 class="lead">{$t("dicIstMain.title")}</h2>
  <div class="row pt-3">
    <div class="col-12 col-lg-7 pe-lg-5">
      <p>
        {$t("dicIstMain.description1")}<a
          href="https://www.indicepa.gov.it/ipa-portale/"
          title={$t("layout.externalLink")}
          target="_blank"
          rel="noreferrer"
          >{$t("dicIstMain.ipa")}<Icon
            name="it it-external-link"
            variant="primary"
            size="sm"
            customClass="ms-1 mb-1"
          /></a
        >{@html $t("dicIstMain.description2", {
          break: "<br/>",
          doubleBreak: "<br/><br/>",
        })}
      </p>
    </div>
    <div class="col-12 mx-lg-0 col-lg-5">
      <KpiSimpleCard
        title={$t("dicIstMain.cardOneTitle")}
        kpi={nf(numDichiarazioniIstituzionali)}
      ></KpiSimpleCard>
    </div>
  </div>
</div>
