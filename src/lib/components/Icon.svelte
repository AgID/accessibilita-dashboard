<script lang="ts">
  import { createBubbler } from "svelte/legacy";

  const bubble = createBubbler();
  import { visibleTooltip, isFocus } from "../../store/tooltip";
  interface Props {
    id?: string;
    name?: string;
    size?: string;
    variant?: string;
    bgColor?: string;
    customClass?: string;
    ariaLabel?: string;
    ariaHidden?: boolean;
    isImg?: boolean;
  }

  let {
    id = Math.floor(Math.random() * 200000).toString(),
    name = "",
    size = "",
    variant = "",
    bgColor = "",
    customClass = "",
    ariaLabel = "",
    ariaHidden = false,
    isImg = false,
  }: Props = $props();

  let iconHref: string = $state("");
  let role = isImg ? "img" : "";

  let tabindex = -1;

  $effect(() => {
    const tokens = name.split(" ");
    iconHref =
      tokens.length == 2 ? `/icons/${tokens[0]}.svg#${tokens[1]}` : name;
  });
  let iconSize = $derived(size ? `icon-${size}` : "");
  let iconVariant = $derived(variant ? `icon-${variant}` : "");
  let iconBgColor = $derived(bgColor ? `bg-${bgColor}` : "");
  let iconCustomClass = $derived(customClass ? `${customClass}` : "");
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<svg
  {id}
  {role}
  {tabindex}
  onfocus={() => {
    $isFocus = true;
    $visibleTooltip = id;
  }}
  onblur={() => {
    $isFocus = false;
    $visibleTooltip = "";
  }}
  onkeydown={(e) => {
    if (e.code == "Escape") {
      $isFocus = false;
      $visibleTooltip = "";
    }
  }}
  aria-label={ariaLabel}
  aria-hidden={ariaHidden}
  class="icon {iconSize} {iconVariant} {iconBgColor} {iconCustomClass}"
  onclick={bubble("click")}><use style="stroke-width:5" href={iconHref} /></svg
>
