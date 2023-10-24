<script>
  import Icon from "./Icon.svelte";
</script>

<div class="container my-5">
  <div class="my-5">
    <h2 class="lead">
      Il monitoraggio automatizzato dell'accessibilità dei siti delle PA
    </h2>
    <p class="display5">
      Il sito espone i dati relativi al monitoraggio semplificato
      dell'accessibilità e gli errori riscontrati con maggiore frequenza
    </p>
  </div>

  <p>
    Rendere i servizi della Pubblica Amministrazione più accessibili e inclusivi
    per tutti i cittadini, anche per chi si trova in condizioni di disabilità
    temporanea o permanente, è uno degli obiettivi della misura 1.4.2 del PNRR
    in cui si inserisce la pubblicazione della nuova dashboard che presenta, per
    la prima volta in Italia, i dati di monitoraggio dell’accessibilità dei siti
    web della Pubblica Amministrazione.
  </p>

  <p class="h3 greyText my-4">Il progetto sull’accessibilità</p>

  <p>
    L’Agenzia per l’Italia Digitale è soggetto attuatore della misura 1.4.2 del
    Piano Nazionale di Ripresa e Resilienza, per un investimento pari a 80
    milioni di euro, che ha come obiettivo il miglioramento dell’accessibilità
    dei servizi pubblici digitali per tutti i cittadini e la promozione e
    diffusione del tema dell’accessibilità all’interno della Pubblica
    amministrazione e per i privati.
    <br /> Il sito permette di consultare l’elenco degli errori più frequenti
    relativi a 14.483 siti estratti da
    <a
      title="Il link si apre in una nuova finestra"
      target="_blank"
      rel="noreferrer"
      href="https://indicepa.gov.it/ipa-portale/"
      >IndicePA<Icon
        name="it it-external-link"
        variant="primary"
        size="xs"
        customClass="mb-1"
      /></a
    >, analizzati con sistemi automatizzati nel primo trimestre dell’anno.
  </p>

  <div class="col-lg-6 mx-auto my-5">
    <blockquote class="blockquote-card">
      <p class="mb-0 fst-italic">
        “Si tratta di un passo avanti nella giusta direzione per garantire pari
        diritti di accesso ai servizi della Pubblica Amministrazione - ha
        dichiarato il Sottosegretario di Stato con delega all’Innovazione
        tecnologica, Alessio Butti – affinché nessun cittadino sia escluso dai
        benefici che la nuova tecnologia è in grado di portare nelle vite di
        tutti noi.”
      </p>
    </blockquote>
  </div>

  <p class="h3 greyText my-4">
    Collaborazione con il CNR e lo strumento MAUVE++
  </p>
  <p>
    Tramite un sistema automatizzato chiamato <a
      title="Il link si apre in una nuova finestra"
      target="_blank"
      rel="noreferrer"
      href="https://mauve.isti.cnr.it/"
      >MAUVE++<Icon
        name="it it-external-link"
        variant="primary"
        size="xs"
        customClass="mb-1"
      /></a
    >, realizzato in collaborazione con il CNR, vengono analizzati 31 dei 50
    criteri previsti dalle
    <a
      href="https://www.w3.org/Translations/WCAG21-it/"
      title="Il link si apre in una nuova finestra"
      target="_blank"
      rel="noreferrer"
      >Linee Guida e i Principi delle WCAG 2.1.<Icon
        name="it it-external-link"
        variant="primary"
        size="xs"
        customClass="mb-1"
      /></a
    > sull’accessibilità pubblicati dal World Wide Web Consortium (W3C). Grazie a
    questo strumento, che fotografa lo stato attuale dei siti della PA, sarà possibile
    anche monitorarne i cambiamenti nel tempo, in un’ottica di trasparenza e di miglioramento
    continuo dei servizi digitali.
  </p>
</div>
