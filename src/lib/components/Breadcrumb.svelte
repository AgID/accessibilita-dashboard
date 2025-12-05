<script lang="ts">
  interface Props {
    currentPage?: string;
  }

  let { currentPage = "" }: Props = $props();
</script>

<div class="breadcrumb my-4">
  <div>
    <a href="/" title="Vai alla Home" class="fw-bold text-decoration-underline"
      >Home</a
    >
    / {currentPage}
  </div>
</div>

<style>
  .breadcrumb,
  .breadcrumb a {
    color: #2f475e !important;
  }
</style>
