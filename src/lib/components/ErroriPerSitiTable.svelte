<script lang="ts">
  import { pm } from "../utils";
  import { nf5d } from "../utils";
  import { onMount } from "svelte";
  import DataTable from "./DataTable.svelte";
  import Icon from "./Icon.svelte";
  import type { IconaErrori } from "../../model/IconeErrori";
  let innerWidth;
  let response;
  let columns = [];
  let loading = true;

  $: innerWidth < 768 ? (columns = smallColumns) : (columns = bigColumns);
  const bigColumns = [
    {
      field: "criterio_di_successo",
      label: "Criterio di successo",
    },
    {
      field: "cod_livello_conformita",
      label: "Livello di conformità",
    },
    {
      align: "right",
      field: "perc_round",
      label: "Distribuzione errori",
      format: (value: any) => nf5d(value) + "%",
      formatDownload: (value: any) => nf5d(value) + "%",
    },
  ];

  const smallColumns = [
    {
      field: "criterio_di_successo",
      label: "Criterio di successo",
      format: (value: any) => value.substring(0, 6),
    },
    {
      field: "cod_livello_conformita",
      label: "Livello di conformità",
    },
    {
      field: "perc_round",
      label: "Distribuzione errori",
      format: (value: any) => nf5d(value) + "%",
      formatDownload: (value: any) => nf5d(value) + "%",
    },
  ];

  let arrayIcone: Array<IconaErrori> = [
    {
      id: "1.1.1",
      icon: "file-earmark-image",
      href_eng: "https://www.w3.org/TR/WCAG21/#non-text-content",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#non-text-content",
    },
    {
      id: "1.2.1",
      icon: "collection-play",
      href_eng:
        "https://www.w3.org/TR/WCAG21/#audio-only-and-video-only-prerecorded",
      href_ita:
        "https://www.w3.org/Translations/WCAG21-it/#audio-only-and-video-only-prerecorded",
    },
    {
      id: "1.2.2",
      icon: "badge-cc",
      href_eng: "https://www.w3.org/TR/WCAG21/#captions-prerecorded",
      href_ita:
        "https://www.w3.org/Translations/WCAG21-it/#captions-prerecorded",
    },
    {
      id: "1.2.3",
      icon: "soundwave",
      href_eng:
        "https://www.w3.org/TR/WCAG21/#audio-description-or-media-alternative-prerecorded",
      href_ita:
        "https://www.w3.org/Translations/WCAG21-it/#audio-description-or-media-alternative-prerecorded",
    },
    {
      id: "1.2.4",
      icon: "cc-circle",
      href_eng: "https://www.w3.org/TR/WCAG21/#captions-live",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#captions-live",
    },
    {
      id: "1.2.5",
      icon: "cassette",
      href_eng: "https://www.w3.org/TR/WCAG21/#audio-description-prerecorded",
      href_ita:
        "https://www.w3.org/Translations/WCAG21-it/#audio-description-prerecorded",
    },
    {
      id: "1.3.1",
      icon: "info-lg",
      href_eng: "https://www.w3.org/TR/WCAG21/#info-and-relationships",
      href_ita:
        "https://www.w3.org/Translations/WCAG21-it/#info-and-relationships",
    },
    {
      id: "1.3.2",
      icon: "ui-checks",
      href_eng: "https://www.w3.org/TR/WCAG21/#meaningful-sequence",
      href_ita:
        "https://www.w3.org/Translations/WCAG21-it/#meaningful-sequence",
    },
    {
      id: "1.3.3",
      icon: "person-workspace",
      href_eng: "https://www.w3.org/TR/WCAG21/#sensory-characteristics",
      href_ita:
        "https://www.w3.org/Translations/WCAG21-it/#sensory-characteristics",
    },
    {
      id: "1.3.4",
      icon: "arrows-move",
      href_eng: "https://www.w3.org/TR/WCAG21/#orientation",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#orientation",
    },
    {
      id: "1.3.5",
      icon: "input-cursor-text",
      href_eng: "https://www.w3.org/TR/WCAG21/#identify-input-purpose",
      href_ita:
        "https://www.w3.org/Translations/WCAG21-it/#identify-input-purpose",
    },
    {
      id: "1.4.1",
      icon: "brush",
      href_eng: "https://www.w3.org/TR/WCAG21/#use-of-color",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#use-of-color",
    },
    {
      id: "1.4.2",
      icon: "volume-up",
      href_eng: "https://www.w3.org/TR/WCAG21/#audio-control",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#audio-control",
    },
    {
      id: "1.4.3",
      icon: "fonts",
      href_eng: "https://www.w3.org/TR/WCAG21/#contrast-minimum",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#contrast-minimum",
    },
    {
      id: "1.4.4",
      icon: "type",
      href_eng: "https://www.w3.org/TR/WCAG21/#resize-text",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#resize-text",
    },
    {
      id: "1.4.5",
      icon: "image",
      href_eng: "https://www.w3.org/TR/WCAG21/#images-of-text",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#images-of-text",
    },
    {
      id: "1.4.10",
      icon: "diagram-3",
      href_eng: "https://www.w3.org/TR/WCAG21/#reflow",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#reflow",
    },
    {
      id: "1.4.11",
      icon: "palette",
      href_eng: "https://www.w3.org/TR/WCAG21/#non-text-contrast",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#non-text-contrast",
    },
    {
      id: "1.4.12",
      icon: "text-wrap",
      href_eng: "https://www.w3.org/TR/WCAG21/#text-spacing",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#text-spacing",
    },
    {
      id: "1.4.13",
      icon: "intersect",
      href_eng: "https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus",
      href_ita:
        "https://www.w3.org/Translations/WCAG21-it/#content-on-hover-or-focus",
    },
    {
      id: "2.1.1",
      icon: "keyboard",
      href_eng: "https://www.w3.org/TR/WCAG21/#keyboard",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#keyboard",
    },
    {
      id: "2.1.2",
      icon: "impedimento-tastiera",
      href_eng: "https://www.w3.org/TR/WCAG21/#no-keyboard-trap",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#no-keyboard-trap",
    },
    {
      id: "2.1.4",
      icon: "command",
      href_eng: "https://www.w3.org/TR/WCAG21/#character-key-shortcuts",
      href_ita:
        "https://www.w3.org/Translations/WCAG21-it/#character-key-shortcuts",
    },
    {
      id: "2.2.1",
      icon: "2x",
      href_eng: "https://www.w3.org/TR/WCAG21/#timing-adjustable",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#timing-adjustable",
    },
    {
      id: "2.2.2",
      icon: "animation",
      href_eng: "https://www.w3.org/TR/WCAG21/#pause-stop-hide",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#pause-stop-hide",
    },
    {
      id: "2.3.1",
      icon: "brightness-alt-high",
      href_eng:
        "https://www.w3.org/TR/WCAG21/#three-flashes-or-below-threshold",
      href_ita:
        "https://www.w3.org/Translations/WCAG21-it/#three-flashes-or-below-threshold",
    },
    {
      id: "2.4.1",
      icon: "columns-gap",
      href_eng: "https://www.w3.org/TR/WCAG21/#bypass-blocks",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#bypass-blocks",
    },
    {
      id: "2.4.3",
      icon: "list-ol",
      href_eng: "https://www.w3.org/TR/WCAG21/#focus-order",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#focus-order",
    },
    {
      id: "2.4.4",
      icon: "link",
      href_eng: "https://www.w3.org/TR/WCAG21/#link-purpose-in-context",
      href_ita:
        "https://www.w3.org/Translations/WCAG21-it/#link-purpose-in-context",
    },
    {
      id: "2.4.5",
      icon: "gear-wide-connected",
      href_eng: "https://www.w3.org/TR/WCAG21/#multiple-ways",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#multiple-ways",
    },
    {
      id: "2.4.6",
      icon: "type-h1",
      href_eng: "https://www.w3.org/TR/WCAG21/#headings-and-labels",
      href_ita:
        "https://www.w3.org/Translations/WCAG21-it/#headings-and-labels",
    },
    {
      id: "2.4.7",
      icon: "fullscreen",
      href_eng: "https://www.w3.org/TR/WCAG21/#focus-visible",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#focus-visible",
    },
    {
      id: "2.4.2",
      icon: "window",
      href_eng: "https://www.w3.org/TR/WCAG21/#page-titled",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#page-titled",
    },
    {
      id: "2.5.1",
      icon: "cursor",
      href_eng: "https://www.w3.org/TR/WCAG21/#pointer-gestures",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#pointer-gestures",
    },
    {
      id: "2.5.2",
      icon: "arrow-counterclockwise",
      href_eng: "https://www.w3.org/TR/WCAG21/#pointer-cancellation",
      href_ita:
        "https://www.w3.org/Translations/WCAG21-it/#pointer-cancellation",
    },
    {
      id: "2.5.3",
      icon: "tag",
      href_eng: "https://www.w3.org/TR/WCAG21/#label-in-name",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#label-in-name",
    },
    {
      id: "2.5.5",
      icon: "joystick",
      href_eng: "https://www.w3.org/TR/WCAG21/#motion-actuation",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#motion-actuation",
    },
    {
      id: "3.1.1",
      icon: "translate",
      href_eng: "https://www.w3.org/TR/WCAG21/#language-of-page",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#language-of-page",
    },
    {
      id: "3.1.2",
      icon: "parti-lingua",
      href_eng: "https://www.w3.org/TR/WCAG21/#language-of-parts",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#language-of-parts",
    },
    {
      id: "3.2.1",
      icon: "bullseye",
      href_eng: "https://www.w3.org/TR/WCAG21/#on-focus",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#on-focus",
    },
    {
      id: "3.2.2",
      icon: "input-cursor",
      href_eng: "https://www.w3.org/TR/WCAG21/#on-input",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#on-input",
    },
    {
      id: "3.2.3",
      icon: "signpost-split",
      href_eng: "https://www.w3.org/TR/WCAG21/#consistent-navigation",
      href_ita:
        "https://www.w3.org/Translations/WCAG21-it/#consistent-navigation",
    },
    {
      id: "3.2.4",
      icon: "search",
      href_eng: "https://www.w3.org/TR/WCAG21/#consistent-identification",
      href_ita:
        "https://www.w3.org/Translations/WCAG21-it/#consistent-identification",
    },
    {
      id: "3.3.1",
      icon: "patch-exclamation",
      href_eng: "https://www.w3.org/TR/WCAG21/#error-identification",
      href_ita:
        "https://www.w3.org/Translations/WCAG21-it/#error-identification",
    },
    {
      id: "3.3.2",
      icon: "tags",
      href_eng: "https://www.w3.org/TR/WCAG21/#labels-or-instructions",
      href_ita:
        "https://www.w3.org/Translations/WCAG21-it/#labels-or-instructions",
    },
    {
      id: "3.3.3",
      icon: "chat-quote",
      href_eng: "https://www.w3.org/TR/WCAG21/#error-suggestion",
      href_ita: "",
    },
    {
      id: "3.3.4",
      icon: "shield-shaded",
      href_eng:
        "https://www.w3.org/TR/WCAG21/#error-prevention-legal-financial-data",
      href_ita:
        "https://www.w3.org/Translations/WCAG21-it/#error-prevention-legal-financial-data",
    },
    {
      id: "4.1.1",
      icon: "diagram-2",
      href_eng: "https://www.w3.org/TR/WCAG21/#parsing",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#parsing",
    },
    {
      id: "4.1.3",
      icon: "question-diamond",
      href_eng: "https://www.w3.org/TR/WCAG21/#status-messages",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#status-messages",
    },
    {
      id: "4.1.2",
      icon: "bookmarks",
      href_eng: "https://www.w3.org/TR/WCAG21/#name-role-value",
      href_ita: "https://www.w3.org/Translations/WCAG21-it/#name-role-value",
    },
  ];

  let data;

  onMount(async () => {
    const rs = await fetch("/data/errori_riscontrati.json");
    response = await rs.json();
    loading = false;

    for (let i = 0; i < response.data.length; i++) {
      for (let z = 0; z < arrayIcone.length; z++) {
        if (
          response.data[i].criterio_di_successo.substring(0, 6).trim() ==
          arrayIcone[z].id
        ) {
          response.data[i].link = arrayIcone[z].href_ita;
        }
      }
    }
    return response;
  });
</script>

<svelte:window bind:innerWidth />
{#if !loading}
  <DataTable
    {columns}
    rows={response?.data}
    defaultSortBy="perc_round"
    periodoMonitoraggio={pm(response?.intestazione?.periodo_monitoraggio)}
    title="Gli errori rilevati dal monitoraggio automatizzato"
    downloadFilename="Criteri di successo per frequenza di errori"
    didascalia={true}
  >
    <div slot="didascaliaSlot" class="didascalia">
      La tabella riporta la distribuzione degli errori relativa a ognuno dei criteri di successo valutati con il sistema automatizzato.
      10 criteri di successo hanno rilevato una percentuale significativa di errori su tutte le ricorrenze. 
      <a
        title="Il link si apre in una nuova finestra"
        target="_blank"
        rel="noreferrer"
        href="https://www.w3.org/Translations/WCAG21-it/#cc1"
        >Livello di Conformità <Icon
          name="it it-external-link"
          variant="primary"
          size="xs"
          customClass="mb-1"
        /></a
      >: ricordiamo che è obbligatorio rispettare i livelli di conformità A e AA.
    </div>
  </DataTable>
{/if}
