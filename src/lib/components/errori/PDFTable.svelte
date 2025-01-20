<script lang="ts">
  import { onMount } from "svelte";
  import { pm, nf1d, nf5d } from "../../utils";
  import DataTable from "../DataTable.svelte";
  import { t, locale } from "../../utils/i18n";
  import type { IconaErrori } from "../../../model/IconeErrori";
  import Icon from "../Icon.svelte";

  let response;
  let loading = true;
  let pdfRef;
  let innerWidth;
  let columns;
  let criteriTotali;
  let slicedResp;

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
      id: "1.2.6",
      icon: "",
      href_en: "https://www.w3.org/TR/WCAG21/#sign-language-prerecorded",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#sign-language-prerecorded",
    },
    {
      id: "1.2.7",
      icon: "",
      href_en:
        "https://www.w3.org/TR/WCAG21/#extended-audio-description-prerecorded",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#extended-audio-description-prerecorded",
    },
    {
      id: "1.2.8",
      icon: "",
      href_en: "https://www.w3.org/TR/WCAG21/#media-alternative-prerecorded",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#media-alternative-prerecorded",
    },
    {
      id: "1.2.9",
      icon: "",
      href_en: "https://www.w3.org/TR/WCAG21/#audio-only-live",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#audio-only-live",
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
      id: "1.3.6",
      icon: "",
      href_en: "https://www.w3.org/TR/WCAG21/#identify-purpose",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#identify-purpose",
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
      id: "1.4.6",
      icon: "",
      href_en: "https://www.w3.org/TR/WCAG21/#contrast-enhanced",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#contrast-enhanced",
    },
    {
      id: "1.4.7",
      icon: "",
      href_en: "https://www.w3.org/TR/WCAG21/#low-or-no-background-audio",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#low-or-no-background-audio",
    },
    {
      id: "1.4.8",
      icon: "",
      href_en: "https://www.w3.org/TR/WCAG21/#visual-presentation",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#visual-presentation",
    },
    {
      id: "1.4.9",
      icon: "",
      href_en: "https://www.w3.org/TR/WCAG21/#images-of-text-no-exception",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#images-of-text-no-exception",
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
      id: "2.1.3",
      icon: "",
      href_en: "https://www.w3.org/TR/WCAG21/#keyboard-no-exception",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#keyboard-no-exception",
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
      id: "2.2.3",
      icon: "",
      href_en: "https://www.w3.org/TR/WCAG21/#no-timing",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#no-timing",
    },
    {
      id: "2.2.4",
      icon: "",
      href_en: "https://www.w3.org/TR/WCAG21/#interruptions",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#interruptions",
    },
    {
      id: "2.2.5",
      icon: "",
      href_en: "https://www.w3.org/TR/WCAG21/#re-authenticating",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#re-authenticating",
    },
    {
      id: "2.2.6",
      icon: "",
      href_en: "https://www.w3.org/TR/WCAG21/#timeouts",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#timeouts",
    },
    {
      id: "2.3.1",
      icon: "brightness-alt-high",
      href_en: "https://www.w3.org/TR/WCAG21/#three-flashes-or-below-threshold",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#three-flashes-or-below-threshold",
    },
    {
      id: "2.3.2",
      icon: "",
      href_en: "https://www.w3.org/TR/WCAG21/#three-flashes",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#three-flashes",
    },
    {
      id: "2.3.3",
      icon: "",
      href_en: "https://www.w3.org/TR/WCAG21/#animation-from-interactions",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#animation-from-interactions",
    },
    {
      id: "2.4.1",
      icon: "columns-gap",
      href_en: "https://www.w3.org/TR/WCAG21/#bypass-blocks",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#bypass-blocks",
    },
    {
      id: "2.4.2",
      icon: "window",
      href_en: "https://www.w3.org/TR/WCAG21/#page-titled",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#page-titled",
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
      id: "2.4.8",
      icon: "",
      href_en: "https://www.w3.org/TR/WCAG21/#location",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#location",
    },
    {
      id: "2.4.9",
      icon: "",
      href_en: "https://www.w3.org/TR/WCAG21/#link-purpose-link-only",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#link-purpose-link-only",
    },
    {
      id: "2.4.10",
      icon: "",
      href_en: "https://www.w3.org/TR/WCAG21/#section-headings",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#section-headings",
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
      id: "2.5.4",
      icon: "",
      href_en: "https://www.w3.org/TR/WCAG21/#motion-actuation",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#motion-actuation",
    },
    {
      id: "2.5.5",
      icon: "joystick",
      href_en: "https://www.w3.org/TR/WCAG21/#motion-actuation",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#motion-actuation",
    },
    {
      id: "2.5.6",
      icon: "",
      href_en: "https://www.w3.org/TR/WCAG21/#concurrent-input-mechanisms",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#concurrent-input-mechanisms",
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
      id: "3.1.3",
      icon: "",
      href_en: "https://www.w3.org/TR/WCAG21/#unusual-words",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#unusual-words",
    },
    {
      id: "3.1.4",
      icon: "",
      href_en: "https://www.w3.org/TR/WCAG21/#abbreviations",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#abbreviations",
    },
    {
      id: "3.1.5",
      icon: "",
      href_en: "https://www.w3.org/TR/WCAG21/#reading-level",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#reading-level",
    },
    {
      id: "3.1.6",
      icon: "",
      href_en: "https://www.w3.org/TR/WCAG21/#pronunciation",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#pronunciation",
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
      id: "3.2.5",
      icon: "",
      href_en: "https://www.w3.org/TR/WCAG21/#change-on-request",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#change-on-request",
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
      id: "3.3.5",
      icon: "",
      href_en: "https://www.w3.org/TR/WCAG21/#help",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#help",
    },
    {
      id: "3.3.6",
      icon: "",
      href_en: "https://www.w3.org/TR/WCAG21/#error-prevention-all",
      href_it:
        "https://www.w3.org/Translations/WCAG21-it/#error-prevention-all",
    },
    {
      id: "4.1.1",
      icon: "diagram-2",
      href_en: "https://www.w3.org/TR/WCAG21/#parsing",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#parsing",
    },
    {
      id: "4.1.2",
      icon: "bookmarks",
      href_en: "https://www.w3.org/TR/WCAG21/#name-role-value",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#name-role-value",
    },
    {
      id: "4.1.3",
      icon: "question-diamond",
      href_en: "https://www.w3.org/TR/WCAG21/#status-messages",
      href_it: "https://www.w3.org/Translations/WCAG21-it/#status-messages",
    },
  ];

  onMount(async () => {
    const rs = await fetch("/data/errori_pdf_riscontrati.json");
    response = await rs.json();
    loading = false;

    criteriTotali = response.data.length;

    setTimeout(() => {
      if (window.location.hash === "#pdf" && pdfRef) {
        pdfRef.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);

    response.data.forEach((item) => {
      const targetId = item.criterio_di_successo_norm_e_it
        .substring(3, 9)
        .trim();
      const matchingLink = linksArray.find((link) => link.id === targetId);
      if (matchingLink) {
        item.link = matchingLink[`href_${$locale}`];
      }
    });

    slicedResp = response.data.slice(0, 10);

    return response;
  });

  $: innerWidth < 768 ? (columns = smallColumns) : (columns = bigColumns);

  const bigColumns = [
    {
      field: `criterio_di_successo_norm_e_${$locale}`,
      label: $t("errPdfTable.criterio"),
    },
    {
      field: "perc_errori_su_tot_errori",
      label: $t("errPdfTable.errori"),
      format: (value: any) => nf1d(value) + "%",
      formatDownload: (value: any) => nf5d(value) + "%",
      align: "right",
    },
  ];

  const smallColumns = [
    {
      field: `criterio_di_successo_norm_e_${$locale}`,
      label: $t("errPdfTable.criterio"),
      format: (value: any) => value.substring(0, 9),
    },
    {
      field: "perc_errori_su_tot_errori",
      label: $t("errPdfTable.errori"),
      format: (value: any) => nf1d(value) + "%",
      formatDownload: (value: any) => nf5d(value) + "%",
      align: "right",
    },
  ];
</script>

<svelte:window bind:innerWidth />
<div bind:this={pdfRef} class="my-3">
  {#if !loading}
    <DataTable
      {columns}
      rows={slicedResp}
      csvRows={response.data}
      title={$t("errPdfTable.title")}
      didascalia={true}
      defaultSortBy="perc_errori_su_tot_errori"
      periodoMonitoraggio={pm(response?.intestazione?.periodo_monitoraggio)}
      tooltipClasses="mx-1"
    >
      <div slot="didascaliaSlot" class="didascalia">
        {@html $t("errPdfTable.description1", {
          numero: criteriTotali,
          break: "<br/>",
        })}
        <a
          href="https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf"
          title={$t("layout.externalLink")}
          target="_blank"
          rel="noreferrer"
          >UNI EN 301 549<Icon
            name="it it-external-link"
            variant="primary"
            size="sm"
            customClass="ms-1 mb-1"
          /></a
        >{@html $t("errPdfTable.description2", { numero: criteriTotali })}
      </div>
    </DataTable>
  {/if}
</div>
