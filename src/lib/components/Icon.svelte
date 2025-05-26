<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { visibleTooltip, isFocus } from "../../store/tooltip";
  export let id: string = Math.floor(Math.random() * 200000).toString();
  export let name: string = "";
  export let size: string = "";
  export let variant: string = "";
  export let bgColor: string = "";
  export let customClass: string = "";
  export let ariaLabel: string = "";
  export let ariaHidden: boolean = false;
  export let isImg: boolean = false;

  let iconHref: string = "";
  let role = isImg ? "img" : "";

  let tabindex = -1;
  const dispatch = createEventDispatcher();

  $: {
    const tokens = name.split(" ");
    iconHref =
      tokens.length == 2 ? `/icons/${tokens[0]}.svg#${tokens[1]}` : name;
  }
  $: iconSize = size ? `icon-${size}` : "";
  $: iconVariant = variant ? `icon-${variant}` : "";
  $: iconBgColor = bgColor ? `bg-${bgColor}` : "";
  $: iconCustomClass = customClass ? `${customClass}` : "";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<svg
  {id}
  {role}
  {tabindex}
  on:focus={() => {
    $isFocus = true;
    $visibleTooltip = id;
  }}
  on:blur={() => {
    $isFocus = false;
    $visibleTooltip = "";
  }}
  on:keydown={(e) => {
    if (e.code == "Escape") {
      $isFocus = false;
      $visibleTooltip = "";
    }
  }}
  aria-label={ariaLabel}
  aria-hidden={ariaHidden}
  class="icon {iconSize} {iconVariant} {iconBgColor} {iconCustomClass}"
  on:click><use style="stroke-width:5" href={iconHref} /></svg
>
