<svelte:options accessors />

<script lang="ts">
  export let columns: any[];
  export let rows: any[];
  export let title: string = "";
  export let downloadFilename: string = "";
  export let searchingName: string = "";
  import { t } from "../utils/i18n";

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
</script>

<tr class="d-flex justify-content-end">
  <td style="border-bottom-width: 0 !important" colspan={columns.length}>
    <div class="text-end download-text hover fw-normal">
      <button
        class="ms-2 download-buttons"
        on:click={downloadCSV}
        aria-hidden="false"
        title={$t("download.general")}{`${title}.csv`}
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
        on:click={downloadPDF}
        aria-hidden="false"
        title={$t("download.general")}{`${title}.pdf`}
      >
        PDF
        <img
          class="download-icon"
          alt={$t("download.pdf")}
          src="/icons/icon-arrow-down-1.png"
        />
      </button>
    </div>
  </td>
</tr>

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
