<script lang="ts">
  import { onMount } from "svelte";
  import { visibleTooltip } from "../../store/tooltip";
  export let id: string;
  export let variant: string = "primary";
  export let tooltip: any = {};
  import Icon from "./Icon.svelte";
  let coordsIcon: any;
  let height: any;
  let width: any;

  let offset: any;
  let transform: any = "-100";
  let transformX: any = "0";
  export let classes: string = "";

  let innerWidth: any;
  onMount(() => {});
  visibleTooltip.subscribe((value) => {
    if (value == id) {
      if (innerWidth >= 992) {
        if (coordsIcon?.getBoundingClientRect()?.y <= height) {
          transform = "30px";
        } else {
          transform = "-100%";
        }
      } else {
        transformX = "-55%";
      }
    }
  });
</script>

<svelte:window bind:innerWidth />
<div class="d-flex justify-content-center ps-sm-2 my-auto {classes}">
  <div
    id="icona_{id}"
    bind:this={coordsIcon}
  >
    <Icon ariaLabel="Informazioni {tooltip.header}" {id} name="it it-info-circle" size={"sm"} {variant} isButton={true}/>
  </div>
  
  <div
    role="tooltip"
    id="id_{id}"
    class="shadow p-3 translate custom-tooltip"
    class:show={$visibleTooltip == id}
    style="--transformY:{transform}; --transformX:{transformX}"
    bind:clientHeight={height}
    bind:clientWidth={width}
    bind:offsetHeight={offset}
  >
    <div 
    style="font-weight: 600; line-height: 1.6; font-size: 16px;">
      {tooltip.header}
    </div>
    <div>
      {tooltip.body}
    </div>
  </div>
</div>

<style>
  .custom-tooltip {
    position: absolute;
    margin-bottom: 5px;
    padding: 7px;
    width: 100%;
    min-width: 70px;
    max-width: 250px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    background-color: rgb(23, 50, 77) !important;
    color: #fff;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.2;
    transition: 0.2s ease-out;
    visibility: var(--showTooltip);
    z-index: 999;
    display: none
  }
  .translate {
    transform: translate(0%, var(--transformY));
  }
  @media (max-width: 992px) {
    .translate {
      transform: translate(var(--transformX), -45%);
    }
  }

  .show {
    display: block;
  }
</style>
