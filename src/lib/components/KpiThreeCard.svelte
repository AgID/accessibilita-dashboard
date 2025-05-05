<script lang="ts">
  import { t } from "../utils/i18n";
  export let periodoMonitoraggio: string = "";
  export let firstImg: string = "";
  export let firstLabel: string = "";
  export let firstKpi: string = "";
  export let secondImg: string = "";
  export let secondLabel: string = "";
  export let secondKpi: string = "";
  export let thirdImg: string = "";
  export let thirdLabel: string = "";
  export let thirdKpi: string = "";
</script>

<div class="card-box mt-0 pt-5 pb-4">
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
