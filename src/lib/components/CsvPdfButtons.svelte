<svelte:options />

<script lang="ts">
  import { t } from "../utils/i18n";
  interface Props {
    columns: any[];
    rows: any[];
    title?: string;
    downloadFilename?: string;
    searchingName?: string;
  }

  let {
    columns,
    rows,
    title = "",
    downloadFilename = "",
    searchingName = "",
  }: Props = $props();

  function jsonToCSV() {
    const items = rows;
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
    hiddenElement.download = `${title}.csv`;
    hiddenElement.click();
  }

  function downloadPDF() {
    var pdf = document.createElement("a");
    pdf.href = "/pdf/" + `${searchingName ? searchingName : title}` + ".pdf";
    pdf.target = "_blank";
    pdf.download = `${downloadFilename ? downloadFilename : title}.pdf`;
    pdf.click();
  }

  export { columns, rows, title, downloadFilename, searchingName };
</script>

<div class="d-flex justify-content-end">
  <div style="border-bottom-width: 0 !important">
    <div class="text-end download-text hover fw-normal">
      <button
        class="ms-2 download-buttons"
        onclick={downloadCSV}
        aria-hidden="false"
        title="{$t('download.general')}{`${title}.csv`}"
      >
        CSV
        <img
          class="download-icon"
          alt={$t("download.csv")}
          src="/icons/icon-arrow-down-1.png"
        />
      </button>
      <button
        class="ms-2 download-buttons"
        onclick={downloadPDF}
        aria-hidden="false"
        title="{$t('download.general')}{`${title}.pdf`}"
      >
        PDF
        <img
          class="download-icon"
          alt={$t("download.pdf")}
          src="/icons/icon-arrow-down-1.png"
        />
      </button>
    </div>
  </div>
</div>

<style lang="scss">
  .hover {
    &:hover {
      cursor: pointer;
    }
  }
  .download-text {
    font-size: 20px;
    color: #0066cc;
  }

  @media screen and (max-width: 991px) {
    .download-text {
      font-size: 14px;
      color: #0066cc;
    }
  }

  img.download-icon {
    width: 15px;
    vertical-align: middle;
  }
</style>
