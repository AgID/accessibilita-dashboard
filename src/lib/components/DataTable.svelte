<svelte:options accessors />

<script lang="ts">
  import { df, dp } from "../utils";
  import Icon from "./Icon.svelte";
  import Tooltip from "./Tooltip.svelte";
  import type { TooltipData } from "../../model/TooltipData";
  import { locale, t } from "../utils/i18n";

  import { onMount } from "svelte";
  export let columns: any[];
  export let rows: any[];
  export let csvRows: any[] = [];
  export let title: string = "";
  export let periodoMonitoraggio = "";
  export let defaultSortBy = "";
  export let descending = false;
  export let tooltipClasses = "";
  export let tooltipData: TooltipData = null;
  export let rowsLimit: number = 0;
  export let downloadFilename: string = "";
  export let searchingName: string = "";
  export let canDownload: boolean = true;
  export let didascalia: boolean = false;

  let innerWidth;
  let rowsToShow;

  let sortBy = { col: defaultSortBy, ascending: !descending };
  $: keyCol = columns.find((c) => c.key);

  $: sort = (column) => {
    if (sortBy.col == column) {
      sortBy.ascending = !sortBy.ascending;
    } else {
      sortBy.col = column;
      sortBy.ascending = true;
    }
    let sortModifier = sortBy.ascending ? -1 : 1;
    let sort = (a, b) =>
      a[column] < b[column]
        ? -1 * sortModifier
        : a[column] > b[column]
          ? 1 * sortModifier
          : 0;
    rowsToShow = rowsToShow.sort(sort);
  };

  const successCriteriaSort = (column) => {
    if (sortBy.col == column) {
      sortBy.ascending = !sortBy.ascending;
    } else {
      sortBy.col = column;
      sortBy.ascending = true;
    }
    let sortModifier = sortBy.ascending ? -1 : 1;
    let sort = (a, b) => {
      const splittedA = a[column].split(".");
      const splittedB = b[column].split(".");
      const lastANumber = +splittedA[2].split(" ")[0];
      const lastBNumber = +splittedB[2].split(" ")[0];

      if (+splittedA[0] < +splittedB[0]) {
        return -1 * sortModifier;
      } else if (+splittedA[0] > +splittedB[0]) {
        return 1 * sortModifier;
      } else if (+splittedA[1] < +splittedB[1]) {
        return -1 * sortModifier;
      } else if (+splittedA[1] > +splittedB[1]) {
        return 1 * sortModifier;
      } else if (lastANumber < lastBNumber) {
        return -1 * sortModifier;
      } else if (lastANumber > lastBNumber) {
        return 1 * sortModifier;
      } else return 0;
    };

    rowsToShow = rowsToShow.sort(sort);
  };

  function format(col: any, row: any, formatDownload?: boolean) {
    if (formatDownload) {
      return col.formatDownload(row[col.field]);
    } else if (col.format) {
      return col.format(row[col.field]) ? col.format(row[col.field]) : "";
    } else {
      return row[col.field] ? row[col.field] : "";
    }
  }
  function jsonToCSV() {
    const items = csvRows.length > 0 ? csvRows : rows;
    const replacer = (key, value) => (value === null ? "" : value);
    const header = columns.map((c) => c.label);
    const csv = [
      header.join(","),
      ...items.map((row) =>
        columns
          .map((col) =>
            JSON.stringify(
              col.formatDownload
                ? col.formatDownload(row[col.field])
                : col.format
                  ? col.format(row[col.field])
                  : row[col.field],
              replacer
            )
          )
          .join(",")
      ),
    ].join("\r\n");

    return csv;
  }

  function downloadCSV() {
    const csv = jsonToCSV();
    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    hiddenElement.target = "_blank";
    hiddenElement.download = `${
      downloadFilename ? downloadFilename : title
    }.csv`;
    hiddenElement.click();
  }

  function getMappedName(name) {
    const mapping = {
      monitoraggio_it: ["monitoraggio"],
      monitoraggio_en: ["monitoring"],
      dichiarazioni_it: ["dichiarazioni"],
      dichiarazioni_en: ["statement"],
      errori_it: ["errori"],
      errori_en: ["errors"],
      enti_monitorati_it: ["Pa_valutate"],
      enti_monitorati_en: ["evaluated_Pa"],
      obiettivi_it: ["obiettivi"],
      obiettivi_en: ["objectives"],
    };

    for (const key in mapping) {
      if (mapping[key].includes(name)) {
        return key;
      }
    }

    return name;
  }

  async function openDataDownload(filename, ext, downloadFilename) {
    const name = getMappedName(filename);
    const rs = await fetch(`/data/opendata/${name}.${ext}`);
    const data = await rs.blob();
    var hiddenElement = document.createElement("a");
    hiddenElement.href = window.URL.createObjectURL(data);
    hiddenElement.target = "_blank";
    hiddenElement.download = `${downloadFilename}.${ext}`;
    hiddenElement.click();
  }

  async function downloadPDF() {
    var pdf = document.createElement("a");
    pdf.href = "/pdf/" + `${searchingName ? searchingName : title}` + ".pdf";
    pdf.target = "_blank";
    pdf.download = `${downloadFilename ? downloadFilename : title}.pdf`;
    pdf.click();
  }

  function filename(name) {
    if (name == "Monitoraggio semplificato") return "monitoraggio";
    else if (name == "Simplified monitoring") return "monitoring";
    else if (name == "Dichiarazione di accessibilità") return "dichiarazioni";
    else if (name == "Accessibility statement") return "statement";
    else if (name == "Errori") return "errori";
    else if (name == "Errors") return "errors";
    else if (name == "Elenco PA valutate da MAUVE++") return "Pa_valutate";
    else if (name == "List of PAs evaluated by MAUVE++") return "evaluated_Pa";
    else if (name == "Obiettivi di accessibilità") return "obiettivi";
    else if (name == "Accessibility objectives") return "objectives";
    else return "file_non_trovato";
  }

  onMount(() => {
    if (rowsLimit) rowsToShow = rows.slice(0, rowsLimit);
    else rowsToShow = rows;
  });
</script>

<svelte:window bind:innerWidth />
<div class="mb-lg-5">
  <div class="card-box pt-4 pb-2 px-2 px-sm-4">
    <div class="row justify-content-between">
      {#if title}
        <div
          class="col-xl-10 cardTitle mb-2 justify-content-start d-inline-flex greyText"
        >
          {title}
          {#if tooltipData?.id}
            <Tooltip
              id={tooltipData.id}
              tooltip={tooltipData.content}
              classes={tooltipClasses}
            />
          {/if}
        </div>
      {/if}
      {#if canDownload}
        <div
          class="col-xl-2 text-xl-end download-text fw-normal mb-2 d-inline-block"
        >
          <button
            class="download-buttons"
            on:click={downloadCSV}
            title="{$t('dataTable.generalDownload')}{`${title}.csv`}"
          >
            CSV
            <img
              class="download-icon"
              alt={$t("dataTable.csvDownload")}
              src="/icons/icon-arrow-down-1.png"
            />
          </button>
          <button
            class="download-buttons"
            on:click={downloadPDF}
            title="{$t('dataTable.generalDownload')}{`${title}.pdf`}"
          >
            PDF
            <img
              class="download-icon"
              alt={$t("dataTable.pdfDownload")}
              src="/icons/icon-arrow-down-1.png"
            />
          </button>
        </div>
      {/if}
    </div>
    <div class="d-flex justify-content-between">
      {#if periodoMonitoraggio}
        <p class="periodoLabel text-start d-inline-block">
          {$t("layout.periodoMonitoraggio")}
          <span class="periodoDate">
            {periodoMonitoraggio}
          </span>
        </p>
      {/if}
    </div>
    {#if didascalia}
      <div class="mt-2">
        <p class="mb-2"><slot name="didascaliaSlot" /></p>
      </div>
    {/if}

    <div class="table-responsive mt-3">
      <table class="table mb-4" aria-rowcount={rows.length}>
        <thead>
          <tr>
            {#each columns as c}
              {#if c.label != "Formato file"}
                <th
                  aria-sort={sortBy.col == c.field && sortBy.ascending
                    ? "ascending"
                    : sortBy.col == c.field && !sortBy.ascending
                      ? "descending"
                      : "none"}
                  class="head caption tableHeader align-middle selectableColumns"
                  scope="col"
                  style="text-align: {c.align ||
                    'start'} !important; height: 2em !important; white-space: wrap;"
                  on:click={() => {
                    if (
                      c.field == `criterio_di_successo_${$locale}` ||
                      c.field == `criterio_di_successo_norm_e_${$locale}`
                    )
                      successCriteriaSort(c.field);
                    else sort(c.field);
                  }}
                >
                  <div
                    class="flex-nowrap d-flex justify-content-between"
                    style="justify-content: {c.align || 'start'}"
                  >
                    <button
                      style="width: 100% !important; all: unset;"
                      class="d-flex justify-content-{c.position || 'between'}"
                    >
                      <div class="show-mobile">
                        {c.label}
                      </div>
                      <div class="d-inline-block">
                        {#if sortBy.col == c.field}
                          {#if sortBy.ascending}
                            <img
                              src="/icons/Decrescente.svg"
                              alt=""
                              class="mx-2 iconaOrdinamento"
                              aria-hidden="true"
                            />
                          {:else}
                            <img
                              src="/icons/Crescente.svg"
                              alt=""
                              class="mx-2 iconaOrdinamento"
                              aria-hidden="true"
                            />
                          {/if}
                        {:else}
                          <img
                            src="/icons/Null.svg"
                            alt=""
                            class="mx-2 iconaOrdinamento"
                            aria-hidden="true"
                          />
                        {/if}
                      </div>
                    </button>
                  </div>
                </th>
              {:else}
                <th
                  aria-sort={sortBy.col == c.field && sortBy.ascending
                    ? "ascending"
                    : sortBy.col == c.field && !sortBy.ascending
                      ? "descending"
                      : "none"}
                  class="head caption tableHeader align-middle"
                  scope="col"
                  style="text-align: {c.align ||
                    'start'} !important; height: 2em !important; white-space: wrap;"
                >
                  <div
                    class="flex-nowrap d-flex justify-content-between"
                    style="justify-content: {c.align || 'start'}"
                  >
                    <div class="show-mobile">
                      {c.label}
                    </div>
                  </div>
                </th>
              {/if}
            {/each}
          </tr>
        </thead>

        {#if rowsToShow?.length}
          <tbody class="caption tableBody">
            {#each rowsToShow as row, i (keyCol ? row[keyCol] : JSON.stringify(row))}
              <tr>
                {#each columns as col}
                  {#if col.field == "action"}
                    <td style="width: {window.innerWidth < 768 ? 25 : 14}%">
                      <button
                        class="download-buttons"
                        on:click={() =>
                          openDataDownload(
                            filename(row[`nome_${$locale}`]),
                            "csv",
                            `${filename(row[`nome_${$locale}`])}_${row[`periodo_${$locale}`]}`
                          )}
                        aria-hidden="false"
                        title={`${filename(row[`nome_${$locale}`])}_${row[`periodo_${$locale}`]}`}
                      >
                        <span
                          style="font-size: 16px; text-decoration: underline"
                          >csv</span
                        >
                      </button>
                      <button
                        class="download-buttons"
                        on:click={() =>
                          openDataDownload(
                            filename(row[`nome_${$locale}`]),
                            "xml",
                            `${filename(row[`nome_${$locale}`])}_${row[`periodo_${$locale}`]}`
                          )}
                        on:mousedown={() => {}}
                        aria-hidden="false"
                        title={`${filename(row[`nome_${$locale}`])}_${row[`periodo_${$locale}`]}`}
                      >
                        <span
                          style="font-size: 16px; text-decoration: underline"
                          >xml</span
                        >
                      </button>
                      <button
                        class="download-buttons"
                        on:click={() =>
                          openDataDownload(
                            filename(row[`nome_${$locale}`]),
                            "json",
                            `${filename(row[`nome_${$locale}`])}_${row[`periodo_${$locale}`]}`
                          )}
                        aria-hidden="false"
                        title={`${filename(row[`nome_${$locale}`])}_${row[`periodo_${$locale}`]}`}
                      >
                        <span
                          style="font-size: 16px; text-decoration: underline"
                          >json</span
                        >
                      </button>
                    </td>
                  {:else}
                    <td role="cell" align={col.align || "left"}>
                      {#if (col.field == `criterio_di_successo_${$locale}` || col.field == `criterio_di_successo_norm_e_${$locale}` || col.field == `des_success_criteria_${$locale}`) && rows[i].link}
                        <a
                          title={$t("layout.externalLink")}
                          target="_blank"
                          rel="noreferrer"
                          href={rows[i].link}
                          >{format(col, row)}<Icon
                            name="it it-external-link"
                            variant="primary"
                            size="sm"
                            customClass="ms-1 mb-1"
                          /></a
                        >
                      {:else}{format(col, row)}
                      {/if}</td
                    >
                  {/if}
                {/each}
              </tr>
            {/each}
          </tbody>
        {/if}
      </table>
    </div>
  </div>
</div>

<style lang="scss">
  .selectableColumns:hover {
    background-color: #0066cc;
    color: white;
    cursor: pointer;
    & img.iconaOrdinamento {
      filter: invert(99%) sepia(71%) saturate(1%) hue-rotate(203deg)
        brightness(111%) contrast(100%);
    }
  }

  .selectableColumns:focus-within {
    background-color: #0066cc;
    color: white;
    & img.iconaOrdinamento {
      filter: invert(99%) sepia(71%) saturate(1%) hue-rotate(203deg)
        brightness(111%) contrast(100%);
    }
  }

  .download-text {
    font-size: 20px;
    color: #0066cc;
  }

  .download-buttons {
    background-color: white;
    color: #0066cc;
    border: none;
  }

  .button-table {
    color: black;
    font-weight: 600;
    background-color: white;
    border: none;
    padding: 0;
    margin: 0;
  }

  img.download-icon {
    width: 15px;
    vertical-align: middle;
  }

  @media screen and (max-width: 991px) {
    .download-text {
      font-size: 14px;
      color: #0066cc;
    }
  }
  @media screen and (min-width: 992px) {
    .show-mobile {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    td {
      padding-left: 18px !important;
    }
  }
</style>
