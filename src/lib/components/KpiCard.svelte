<script lang="ts">
  import type { TooltipData } from "../../model/TooltipData";
  import Icon from "./Icon.svelte";
  import Tooltip from "./Tooltip.svelte";

  export let title: string;
  export let caption: string = "";
  export let kpi: string;
  export let imgLink: string = "";
  export let linkText: string = "";
  export let href: string = "";
  export let height: string = "";
  export let customStyle: string = "";
  export let tooltipData: TooltipData = null;

  $: mainHeight = height ? `height:${height};` : "";
</script>

<div class="card-box mt-0" style={`${mainHeight}; ${customStyle}`}>
  <div class="{imgLink ? "" : "text-center"} py-4 px-3 px-md-0" class:vertical-align={height}>
    {#if imgLink}
      <div class="row">
        <div class="col-3 customMonBox">
          <img
            src={imgLink}
            alt=""
            class="ps-2 ps-sm-3 ps-md-4 ps-lg-2 ps-xl-4 svgImage"
            aria-hidden="true"
          />
        </div>
        <div class="col-9 ps-md-0 pe-md-3 ps-lg-1">
          <p class="cardTitle greyText pe-md-5">
            {title}
            {#if tooltipData?.id}
              <Tooltip id={tooltipData.id} tooltip={tooltipData.content} />
            {/if}
          </p>
          <p class="cardMainData py-2" style="color: #0066cc">{kpi}</p>
          <div class="captionUpdateDarker">
            {caption}
          </div>
        </div>
      </div>
    {:else}
      <div class="cardTitle mx-lg-3 px-xl-3 py-3 d-inline-flex greyText">
        {title}
        {#if tooltipData?.id}
          <Tooltip id={tooltipData.id} tooltip={tooltipData.content} />
        {/if}
      </div>
      <div class="cardMainData py-1">{kpi}</div>
      <div
        class="captionUpdateDarker pt-0 pt-sm-4 px-1 px-sm-5 mx-md-5 px-lg-5 mx-lg-2"
      >
        {caption}
      </div>
    {/if}
  </div>
  {#if linkText && href}
    <div class="kpi-footer cursor">
      <a {href}
        ><span class="text"
          >{linkText}
          <Icon name="it it-arrow-right" variant="white" size="sm" /></span
        ></a
      >
    </div>
  {/if}
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
</style>
