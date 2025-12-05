<script lang="ts">
  import { t } from "../utils/i18n";
  interface Props {
    periodoMonitoraggio?: string;
    firstImg?: string;
    firstLabel?: string;
    firstKpi?: string;
    secondImg?: string;
    secondLabel?: string;
    secondKpi?: string;
    thirdImg?: string;
    thirdLabel?: string;
    thirdKpi?: string;
  }

  let {
    periodoMonitoraggio = "",
    firstImg = "",
    firstLabel = "",
    firstKpi = "",
    secondImg = "",
    secondLabel = "",
    secondKpi = "",
    thirdImg = "",
    thirdLabel = "",
    thirdKpi = ""
  }: Props = $props();
</script>

<div class="card-box m-0 pt-5 pb-4">
  <div class="px-3 ms-xl-3 me-xl-3">
    <p class="periodoLabel mb-4">
      {$t("layout.periodoMonitoraggio")}
      <span class="periodoDate">
        {periodoMonitoraggio}
      </span>
    </p>
    <div class="row pt-2 mb-2">
      <div class="col-3 customMonBox my-auto">
        <img
          src={"/images/" + firstImg + ".svg"}
          alt=""
          class="ps-0 ps-sm-2"
          aria-hidden="true"
        />
      </div>
      <div class="col-9 ps-3">
        <p class="display4">
          {firstLabel}
        </p>
        <p class="cardMainData" style="color: #0066cc">
          {firstKpi}
        </p>
      </div>
    </div>
    <hr class="mt-2 mb-4 mx-auto text-muted" />
    <div class="row">
      <div class="col-3 customMonBox my-auto">
        <img
          src={"/images/" + secondImg + ".svg"}
          alt=""
          class="ps-0 ps-sm-2"
          aria-hidden="true"
        />
      </div>
      <div class="col-9 ps-3">
        <p class="display4">
          {secondLabel}
        </p>
        <p class="cardMainData" style="color: #0066cc">
          {secondKpi}
        </p>
      </div>
    </div>
    <hr class="mt-2 mb-4 mx-auto text-muted" />
    <div class="row">
      <div class="col-3 customMonBox my-auto">
        <img
          src={"/images/" + thirdImg + ".svg"}
          alt=""
          class="ps-0 ps-sm-2"
          aria-hidden="true"
        />
      </div>
      <div class="col-9 ps-3">
        <p class="display4">
          {thirdLabel}
        </p>
        <p class="cardMainData" style="color: #0066cc">
          {thirdKpi}
        </p>
      </div>
    </div>
  </div>
</div>
