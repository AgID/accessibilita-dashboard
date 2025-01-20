<script lang="ts">
  export let title: string;
  export let kpi: string;
  export let smallerKpi: string = "";
  export let height: string = "";

  $: mainHeight = height ? `height:${height};` : "";
</script>

<div class="card-box mt-0" style={`${mainHeight}`}>
  <div class="text-left py-4 px-3 px-md-0" class:vertical-align={height}>
    <div class="mx-lg-3 px-xl-3 py-3">
      <div class="display4 d-inline-flex">
        {title}
      </div>
      <div class="cardMainData mt-4">
        {kpi}
        {#if smallerKpi}
          <span class="cardSmallData">
            {smallerKpi}
          </span>
        {/if}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .vertical-align {
    padding-top: 1.2em;
  }

  .kpi-footer a:hover {
    color: white;
  }

  .cursor {
    cursor: pointer;
  }

  @media (max-width: 400px) {
    .svgImage {
      padding-left: 0 !important;
    }
  }

  .customBoxIcon {
    padding-top: 8px;
  }

  @media screen and (max-width: 400px) {
    .customBoxIcon {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }
</style>
