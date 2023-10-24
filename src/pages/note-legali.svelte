<script>
  import Icon from "../lib/components/Icon.svelte";
</script>

<svelte:head>
  <title>Note legali - Monitoraggio Accessibilità</title>
</svelte:head>

<section class="container" aria-label="Note Legali">
  <div class="insideContainer mx-auto my-5">
    <h2 class="lead">Note Legali</h2>
    <p class="h3 greyText">Premessa</p>
    <p>
      L’agenzia per l’italia digitale (AgID) ha realizzato il sito
      “accessibilita.agid.gov.it” (di seguito "il sito") con l'obiettivo di
      raccogliere informazioni strutturate dalle varie amministrazioni, tramite
      l'utilizzo di moduli autenticati.
    </p>
    <p>
      Nella presente pagina sono riportate le Note legali relative all’utilizzo
      del sito.
    </p>
    <p>
      Il presente documento potrà essere modificato in qualsiasi momento e senza
      preavviso. l’utente è pertanto invitato a prendere regolarmente visione
      dell’ultima versione aggiornata delle stesse, disponibile e
      permanentemente accessibile da qualunque pagina del sito, cliccando sul
      collegamento “Note legali”.
    </p>
    <br />
    <h4 class="h4 blueText">Copyright</h4>
    <p>
      La visualizzazione, il download e qualunque utilizzo dei dati pubblicati
      sul presente sito comporta l’accettazione delle presenti Note legali e
      delle condizioni della licenza con cui sono pubblicati. Salvo ove
      diversamente indicato, i dati pubblicati sul presente sito sono messi a
      disposizione con licenza cc-by 3.0, il cui testo integrale è disponibile
      al seguente indirizzo: <a
        href="http://creativecommons.org/licenses/by/3.0/it/legalcode"
        title="Il link si apre in una nuova finestra"
        target="_blank"
        rel="noreferrer"
        >http://creativecommons.org/licenses/by/3.0/it/legalcode
        <Icon
          name="it it-external-link"
          variant="primary"
          size="xs"
          customClass="mb-1"
        /></a
      >
    </p>
    <p>
      Questo significa che, ove non diversamente specificato, i contenuti di
      questo sito sono liberamente distribuibili e riutilizzabili, a patto che
      sia sempre citata la fonte e – ove possibile - riportato l'indirizzo web
      della pagina originale.
    </p>
    <br />
    <h4 class="h4 blueText">Utilizzo del sito e download</h4>
    <p>
      Tutti i documenti pubblicati sul presente sito sono conformi e
      corrispondenti agli atti originali.
    </p>
    <p>
      In nessun caso AgID può essere ritenuta responsabile dei danni di
      qualsiasi natura causati direttamente o indirettamente dall'accesso al
      sito, dall'incapacità o impossibilità di accedervi.
    </p>
    <p>
      AgID, inoltre, non potrà essere ritenuta in alcun modo responsabile per i
      servizi di connettività utilizzati dagli utenti per l’accesso al portale.
    </p>
    <p>
      I documenti, quali ad esempio la documentazione tecnica e normativa, ecc.
      e software, salvo diversa indicazione, sono liberamente e gratuitamente
      disponibili, in caso contrario viene prodotto un avviso come premessa
      nell'uso degli stessi.
    </p>
    <br />
    <h4 class="h4 blueText">Accesso a siti esterni collegati</h4>
    <p>
      I collegamenti a siti esterni, indicati nel presente sito, sono forniti
      come semplice servizio agli utenti, con esclusione di ogni responsabilità
      sulla correttezza e sulla completezza dell’insieme dei collegamenti
      indicati.
    </p>
    <p>
      L’indicazione dei collegamenti non implica da parte di AgID alcun tipo di
      approvazione o condivisione di responsabilità in relazione alla
      legittimità, alla completezza e alla correttezza delle informazioni
      contenute nei siti indicati.
    </p>
    <br />
    <h4 class="h4 blueText">Privacy</h4>
    <p>
      La privacy degli utenti è molto importante. per questo motivo è stata
      predisposta un’apposita informativa sulla privacy che l’utente,
      utilizzando il presente sito, accetta.
    </p>
  </div>
</section>

<style>
  @media (min-width: 992px) {
    .insideContainer {
      width: 50%;
    }
  }
</style>
