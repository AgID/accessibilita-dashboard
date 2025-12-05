<script lang="ts">
  interface Props {
    title: string;
    kpi: string;
    smallerKpi?: string;
    height?: string;
  }

  let { title, kpi, smallerKpi = "", height = "" }: Props = $props();

  let mainHeight = $derived(height ? `height:${height};` : "");
</script>

<div class="card-box mt-0" style={`${mainHeight}`}>
  <div class="text-left py-4 px-3 px-lg-0" class:vertical-align={height}>
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

<style>
  .vertical-align {
    padding-top: 1.2em;
  }
</style>
