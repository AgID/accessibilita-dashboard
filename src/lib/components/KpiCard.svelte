<script lang="ts">
  import Icon from "./Icon.svelte";
  import { t } from "../utils/i18n";

  interface Props {
    title: string;
    periodoMonitoraggio?: string;
    kpi: string;
    imgLink?: string;
    linkText?: string;
    href?: string;
    height?: string;
    customStyle?: string;
    cardWithIcon?: boolean;
    iconName?: string;
    iconSize?: string;
  }

  let {
    title,
    periodoMonitoraggio = "",
    kpi,
    imgLink = "",
    linkText = "",
    href = "",
    height = "",
    customStyle = "",
    cardWithIcon = false,
    iconName = "",
    iconSize = ""
  }: Props = $props();

  let mainHeight = $derived(height ? `height:${height};` : "");
</script>

<div class="card-box mt-0" style={`${mainHeight}; ${customStyle}`}>
  <div
    class="{imgLink ? '' : 'text-left'} py-4 px-3 mx-lg-3"
    class:vertical-align={height}
  >
    {#if imgLink}
      <div class="row">
        <div class="col-3 customBoxIcon">
          <img
            src={imgLink}
            alt=""
            class="ps-2 ps-sm-3 ps-md-4 ps-lg-2 ps-xl-4 svgImage"
            aria-hidden="true"
          />
        </div>
        <div class="col-9 ps-md-0 pe-md-3 ps-lg-1">
          <p class="display4 pe-md-4">
            {title}
          </p>
          <div class="cardMainData py-1" style="color: #0066cc">{kpi}</div>
        </div>
      </div>
    {:else if cardWithIcon}
      <div class="row mx-0">
        <div class="col-3 p-0 customBoxIcon">
          <Icon name={iconName} variant="primary" size={iconSize} />
        </div>
        <div class="col-9 p-0 pe-xl-4">
          <p class="cardTitle greyText text-start">{title}</p>
          <p class="cardMainData my-2 text-start" style="color: #0066cc">
            {kpi}
          </p>
        </div>
      </div>
    {:else}
      <div class="display4 pb-2 d-inline-flex">
        {title}
      </div>
      {#if periodoMonitoraggio}
        <div class="periodoLabel p-0 m-0">
          {$t("layout.periodoMonitoraggio")}
          <span class="periodoDate">
            {periodoMonitoraggio}
          </span>
        </div>
      {/if}
      <div class="cardMainData pt-4 pb-3">{kpi}</div>
    {/if}
  </div>
  {#if linkText && href}
    <div class="kpi-footer cursor">
      <a {href}
        ><span class="ps-3"
          >{linkText}
          <Icon name="it it-arrow-right" variant="white" size="sm" /></span
        ></a
      >
    </div>
  {/if}
</div>

<style>
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
