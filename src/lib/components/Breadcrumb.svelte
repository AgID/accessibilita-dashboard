<script lang="ts">
  export let currentPage: string = "";
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
