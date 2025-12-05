<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {
    let stopTabFunction = function (e) {
      if (e.keyCode == 9) {
        e.preventDefault();
      }
    };

    document.addEventListener("keyup", function (event) {
      if (
        document.getElementById("resumeTabButton") === document.activeElement
      ) {
        document.addEventListener("keydown", stopTabFunction);
      }
    });

    document.getElementById("resumeTabButton").onclick = function () {
      document.removeEventListener("keydown", stopTabFunction);
    };
  });

  function onAcceptClick(e) {
    e.srcElement.blur();
    document.getElementById("skipContentuto").focus();
  }
</script>

<section class="cookiebar fade" aria-label="Gestione dei cookies" id="cookie">
  <p>
    Questo sito utilizza cookie tecnici, analytics e di terze parti. Proseguendo
    nella navigazione accetti l'utilizzo dei cookie.
  </p>
  <div class="cookiebar-buttons">
    <!-- svelte-ignore a11y_invalid_attribute -->
    <!-- <a href="#" class="cookiebar-btn">Preferenze<span class="visually-hidden">cookies</span></a> -->
    <button
      data-bs-accept="cookiebar"
      class="cookiebar-btn cookiebar-confirm"
      id="resumeTabButton"
      onclick={onAcceptClick}
      >Accetto<span class="visually-hidden"> i cookies</span></button
    >
  </div>
</section>

<style>
  #resumeTabButton:focus {
    border: 2px solid orange !important;
  }
</style>
