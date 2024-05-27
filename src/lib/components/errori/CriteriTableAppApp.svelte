<script lang="ts">
  import { onMount } from "svelte";
  import { nf, pm, nf2d } from "../../utils";
  import DataTable from "../DataTable.svelte";
  import { t, locale } from "../../utils/i18n";
  import type { IconaErrori } from "../../../model/IconeErrori";

  let response;
  let loading = true;
  let appRef;
  let innerWidth;
  let columns;

  let linksArray: Array<IconaErrori> = [
    {
      id: "1.1.1",
      icon: "file-earmark-image",
      href_en: "https://www.w3.org/TR/WCAG21/#non-text-content",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#non-text-content",
    },
    {
      id: "1.2.1",
      icon: "collection-play",
      href_en:
        "https://www.w3.org/TR/WCAG21/#audio-only-and-video-only-prerecorded",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#audio-only-and-video-only-prerecorded",
    },
    {
      id: "1.2.2",
      icon: "badge-cc",
      href_en: "https://www.w3.org/TR/WCAG21/#captions-prerecorded",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#captions-prerecorded",
    },
    {
      id: "1.2.3",
      icon: "soundwave",
      href_en:
        "https://www.w3.org/TR/WCAG21/#audio-description-or-media-alternative-prerecorded",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#audio-description-or-media-alternative-prerecorded",
    },
    {
      id: "1.2.4",
      icon: "cc-circle",
      href_en: "https://www.w3.org/TR/WCAG21/#captions-live",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#captions-live",
    },
    {
      id: "1.2.5",
      icon: "cassette",
      href_en: "https://www.w3.org/TR/WCAG21/#audio-description-prerecorded",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#audio-description-prerecorded",
    },
    {
      id: "1.3.1",
      icon: "info-lg",
      href_en: "https://www.w3.org/TR/WCAG21/#info-and-relationships",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#info-and-relationships",
    },
    {
      id: "1.3.2",
      icon: "ui-checks",
      href_en: "https://www.w3.org/TR/WCAG21/#meaningful-sequence",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#meaningful-sequence",
    },
    {
      id: "1.3.3",
      icon: "person-workspace",
      href_en: "https://www.w3.org/TR/WCAG21/#sensory-characteristics",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#sensory-characteristics",
    },
    {
      id: "1.3.4",
      icon: "arrows-move",
      href_en: "https://www.w3.org/TR/WCAG21/#orientation",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#orientation",
    },
    {
      id: "1.3.5",
      icon: "input-cursor-text",
      href_en: "https://www.w3.org/TR/WCAG21/#identify-input-purpose",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#identify-input-purpose",
    },
    {
      id: "1.4.1",
      icon: "brush",
      href_en: "https://www.w3.org/TR/WCAG21/#use-of-color",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#use-of-color",
    },
    {
      id: "1.4.2",
      icon: "volume-up",
      href_en: "https://www.w3.org/TR/WCAG21/#audio-control",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#audio-control",
    },
    {
      id: "1.4.3",
      icon: "fonts",
      href_en: "https://www.w3.org/TR/WCAG21/#contrast-minimum",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#contrast-minimum",
    },
    {
      id: "1.4.4",
      icon: "type",
      href_en: "https://www.w3.org/TR/WCAG21/#resize-text",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#resize-text",
    },
    {
      id: "1.4.5",
      icon: "image",
      href_en: "https://www.w3.org/TR/WCAG21/#images-of-text",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#images-of-text",
    },
    {
      id: "1.4.10",
      icon: "diagram-3",
      href_en: "https://www.w3.org/TR/WCAG21/#reflow",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#reflow",
    },
    {
      id: "1.4.11",
      icon: "palette",
      href_en: "https://www.w3.org/TR/WCAG21/#non-text-contrast",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#non-text-contrast",
    },
    {
      id: "1.4.12",
      icon: "text-wrap",
      href_en: "https://www.w3.org/TR/WCAG21/#text-spacing",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#text-spacing",
    },
    {
      id: "1.4.13",
      icon: "intersect",
      href_en: "https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#content-on-hover-or-focus",
    },
    {
      id: "2.1.1",
      icon: "keyboard",
      href_en: "https://www.w3.org/TR/WCAG21/#keyboard",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#keyboard",
    },
    {
      id: "2.1.2",
      icon: "impedimento-tastiera",
      href_en: "https://www.w3.org/TR/WCAG21/#no-keyboard-trap",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#no-keyboard-trap",
    },
    {
      id: "2.1.4",
      icon: "command",
      href_en: "https://www.w3.org/TR/WCAG21/#character-key-shortcuts",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#character-key-shortcuts",
    },
    {
      id: "2.2.1",
      icon: "2x",
      href_en: "https://www.w3.org/TR/WCAG21/#timing-adjustable",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#timing-adjustable",
    },
    {
      id: "2.2.2",
      icon: "animation",
      href_en: "https://www.w3.org/TR/WCAG21/#pause-stop-hide",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#pause-stop-hide",
    },
    {
      id: "2.3.1",
      icon: "brightness-alt-high",
      href_en: "https://www.w3.org/TR/WCAG21/#three-flashes-or-below-threshold",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#three-flashes-or-below-threshold",
    },
    {
      id: "2.4.1",
      icon: "columns-gap",
      href_en: "https://www.w3.org/TR/WCAG21/#bypass-blocks",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#bypass-blocks",
    },
    {
      id: "2.4.3",
      icon: "list-ol",
      href_en: "https://www.w3.org/TR/WCAG21/#focus-order",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#focus-order",
    },
    {
      id: "2.4.4",
      icon: "link",
      href_en: "https://www.w3.org/TR/WCAG21/#link-purpose-in-context",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#link-purpose-in-context",
    },
    {
      id: "2.4.5",
      icon: "gear-wide-connected",
      href_en: "https://www.w3.org/TR/WCAG21/#multiple-ways",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#multiple-ways",
    },
    {
      id: "2.4.6",
      icon: "type-h1",
      href_en: "https://www.w3.org/TR/WCAG21/#headings-and-labels",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#headings-and-labels",
    },
    {
      id: "2.4.7",
      icon: "fullscreen",
      href_en: "https://www.w3.org/TR/WCAG21/#focus-visible",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#focus-visible",
    },
    {
      id: "2.4.2",
      icon: "window",
      href_en: "https://www.w3.org/TR/WCAG21/#page-titled",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#page-titled",
    },
    {
      id: "2.5.1",
      icon: "cursor",
      href_en: "https://www.w3.org/TR/WCAG21/#pointer-gestures",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#pointer-gestures",
    },
    {
      id: "2.5.2",
      icon: "arrow-counterclockwise",
      href_en: "https://www.w3.org/TR/WCAG21/#pointer-cancellation",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#pointer-cancellation",
    },
    {
      id: "2.5.3",
      icon: "tag",
      href_en: "https://www.w3.org/TR/WCAG21/#label-in-name",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#label-in-name",
    },
    {
      id: "2.5.5",
      icon: "joystick",
      href_en: "https://www.w3.org/TR/WCAG21/#motion-actuation",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#motion-actuation",
    },
    {
      id: "3.1.1",
      icon: "translate",
      href_en: "https://www.w3.org/TR/WCAG21/#language-of-page",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#language-of-page",
    },
    {
      id: "3.1.2",
      icon: "parti-lingua",
      href_en: "https://www.w3.org/TR/WCAG21/#language-of-parts",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#language-of-parts",
    },
    {
      id: "3.2.1",
      icon: "bullseye",
      href_en: "https://www.w3.org/TR/WCAG21/#on-focus",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#on-focus",
    },
    {
      id: "3.2.2",
      icon: "input-cursor",
      href_en: "https://www.w3.org/TR/WCAG21/#on-input",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#on-input",
    },
    {
      id: "3.2.3",
      icon: "signpost-split",
      href_en: "https://www.w3.org/TR/WCAG21/#consistent-navigation",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#consistent-navigation",
    },
    {
      id: "3.2.4",
      icon: "search",
      href_en: "https://www.w3.org/TR/WCAG21/#consistent-identification",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#consistent-identification",
    },
    {
      id: "3.3.1",
      icon: "patch-exclamation",
      href_en: "https://www.w3.org/TR/WCAG21/#error-identification",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#error-identification",
    },
    {
      id: "3.3.2",
      icon: "tags",
      href_en: "https://www.w3.org/TR/WCAG21/#labels-or-instructions",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#labels-or-instructions",
    },
    {
      id: "3.3.3",
      icon: "chat-quote",
      href_en: "https://www.w3.org/TR/WCAG21/#error-suggestion",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#error-suggestion",
    },
    {
      id: "3.3.4",
      icon: "shield-shaded",
      href_en:
        "https://www.w3.org/TR/WCAG21/#error-prevention-legal-financial-data",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#error-prevention-legal-financial-data",
    },
    {
      id: "4.1.1",
      icon: "diagram-2",
      href_en: "https://www.w3.org/TR/WCAG21/#parsing",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#parsing",
    },
    {
      id: "4.1.3",
      icon: "question-diamond",
      href_en: "https://www.w3.org/TR/WCAG21/#status-messages",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#status-messages",
    },
    {
      id: "4.1.2",
      icon: "bookmarks",
      href_en: "https://www.w3.org/TR/WCAG21/#name-role-value",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#name-role-value",
    },
  ];

  onMount(async () => {
    const rs = await fetch("/data/mona_app_errori_distr_conformita.json");
    response = await rs.json();
    loading = false;

    setTimeout(() => {
    if (window.location.hash === "#app" && appRef) {
      appRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 50);

    for (let i = 0; i < response.data.length; i++) {
      for (let z = 0; z < linksArray.length; z++) {
        if (
          response.data[i].des_success_criteria_it
            .substring(3, 9)
            .trim() == linksArray[z].id
        ) {
          response.data[i].link = linksArray[z][`href_${$locale}`];
        }
      }
    }
    return response;
  });

  $: innerWidth < 768 ? (columns = smallColumns) : (columns = bigColumns);

  const bigColumns = [
    {
      field: `des_success_criteria_${$locale}`,
      label: $t("erroriTableApp.criterio"),
    },
    {
      field: "cod_livello_conformita",
      label: $t("erroriTableApp.livello")
    },
    {
      field: "num_perc_errori",
      label: $t("erroriTableApp.percentuale"),
      format: (value: any) => nf2d(value) + "%",
      align: "right",
    },
  ];

  const smallColumns = [
    {
      field: `des_success_criteria_${$locale}`,
      label: $t("erroriTableApp.criterio"),
      format: (value: any) => value.substring(0, 9),
    },
    {
      field: "cod_livello_conformita",
      label: $t("erroriTableApp.livello")
    },
    {
      field: "num_perc_errori",
      label: $t("erroriTableApp.percentuale"),
      format: (value: any) => nf2d(value) + "%",
      align: "right",
    },
    ]
</script>

<svelte:window bind:innerWidth />
  <div bind:this={appRef} class="my-3">
    {#if !loading}
    <DataTable
      {columns}
      rows={response?.data}
      title={$t("erroriTableApp.titleApp")}
      didascalia={true}
      defaultSortBy="num_perc_errori"
      periodoMonitoraggio={pm(response?.intestazione?.periodo_monitoraggio)}
      tooltipClasses="mx-1"
    >
      <div slot="didascaliaSlot" class="didascalia">
        {$t("erroriTableApp.descriptionApp")}
      </div>
    </DataTable>
    {/if}
  </div>
