<script>
  import Icon from "../lib/components/Icon.svelte";
</script>

<svelte:head>
  <title>Privacy Policy - Monitoraggio Accessibilità</title>
</svelte:head>

<section class="container" aria-label="Privacy Policy">
  <div class="insideContainer mx-auto my-5">
    <h2 class="lead">Informativa sul trattamento dei dati personali</h2>
    <p>
      Ai sensi degli artt. 13-14 del Regolamento (UE) 2016/679 del Parlamento
      europeo e del Consiglio.
    </p>
    <p>
      Questa pagina descrive le modalità di trattamento dei dati personali degli
      utenti che consultano il presente sito web.
    </p>
    <p>
      Le informazioni rese non riguardano altri siti, pagine o servizi online
      raggiungibili tramite link ipertestuali riferiti a risorse esterne al
      dominio del presente sito web.
    </p>
    <br />
    <h4 class="h4 blueText">
      Titolare del Trattamento dei Dati <br /> AgID – Agenzia per l’Italia Digitale
    </h4>
    <p>Indirizzo: Via Liszt 21 - 00144 Roma</p>
    <p>
      Indirizzo PEC: <a
        href="mailto:protocollo@pec.agid.gov.it"
        title="Il link aprirà l'applicazione predefinita di posta elettronica"
        >protocollo@pec.agid.gov.it</a
      >
    </p>
    <br />
    <h4 class="h4 blueText">
      Contatti del responsabile della protezione dei dati
    </h4>
    <p>Indirizzo: Via Liszt 21 - 00144 Roma presso AGID</p>
    <p>
      Indirizzo e-mail: <a
        href="mailto:responsabileprotezionedati@agid.gov.it"
        title="Il link aprirà l'applicazione predefinita di posta elettronica"
        >responsabileprotezionedati@agid.gov.it</a
      >
    </p>
    <br />
    <h4 class="h4 blueText">Autorità di controllo</h4>
    <p>Garante per la protezione dei dati personali.</p>
    <p>
      Sito web: <a
        href="https://www.garanteprivacy.it"
        title="Il link si apre in una nuova finestra"
        target="_blank"
        rel="noreferrer"
        >www.garanteprivacy.it <Icon
          name="it it-external-link"
          variant="primary"
          size="xs"
          customClass="mb-1"
        /></a
      >
    </p>
    <br />
    <h4 class="h4 blueText">
      Categorie e fonti dei dati personali, finalità e base giuridica del
      trattamento
    </h4>
    <ul>
      <li>
        <b>Dati di navigazione:</b> I sistemi informatici e le procedure software
        preposte al funzionamento del sito acquisiscono, nel corso del loro normale
        esercizio, alcuni dati personali la cui trasmissione è implicita nell’uso
        dei protocolli di comunicazione di Internet. Il trattamento di tali dati
        è necessario per la gestione tecnica del sito web e la corretta fruizione
        dei relativi servizi.
      </li>
      <li>
        <b>Dati forniti dall’interessato:</b> I dati personali forniti dall’interessato
        ineriscono le comunicazioni inoltrate all’indirizzo di contatto e sono trattati
        per consentire la gestione delle relative comunicazioni. Si specifica che
        l’invio di comunicazioni all’indirizzo di contatto comporta l’acquisizione
        di ogni dato personale incluso volontariamente dal mittente nel testo della
        propria comunicazione.
      </li>
    </ul>
    <p>
      I dati personali sono trattati da AGID nell’esecuzione dei compiti
      istituzionali di interesse pubblico e/o comunque connessi all’esercizio
      dei propri pubblici poteri e doveri istituzionali, con specifico
      riferimento all’art. 9, comma 7 del D.L. 179/2012 e nel correlato
      paragrafo 4.2. delle Linee guida sull’accessibilità degli strumenti
      informatici, adottate e aggiornate con Determinazioni AGID n. 437 del
      20.12.2019, n. 396 del 10.9.2020 e n. 354 del 22.12.2022.
    </p>
    <br />
    <h4 class="h4 blueText">Categorie di destinatari dei dati personali</h4>
    <p>
      AGID tratterà autonomamente i dati personali mediante il proprio
      personale. <br />
      Non è trasferito alcun dato personale a Paesi terzi o a organizzazioni internazionali.
    </p>

    <br />
    <h4 class="h4 blueText">Periodo di conservazione dei dati personali</h4>
    <p>
      I dati di navigazione sono cancellati subito dopo la relativa elaborazione
      e, in ogni caso, non vengono conservati per oltre 7 giorni dal momento
      della raccolta. I dati personali forniti dagli interessati sono conservati
      per il tempo necessario al riscontro delle comunicazioni pervenute e poi
      cancellati.
    </p>

    <br />
    <h4 class="h4 blueText">Diritti degli interessati</h4>
    <p>
      Gli interessati hanno il diritto di ottenere da AGID l’accesso ai propri
      dati personali, la rettifica o la cancellazione degli stessi, la
      limitazione del relativo trattamento, il diritto di opporvisi e il diritto
      alla portabilità dei dati, laddove ne ricorrano i presupposti.
    </p>
    <p>
      Fatto salvo ogni altro ricorso amministrativo o giurisdizionale, è diritto
      degli interessati proporre reclamo al Garante per la protezione dei dati
      personali qualora ritengano che il trattamento dei propri dati violi il
      Regolamento. AGID garantisce che non è prevista alcuna forma di processo
      decisionale esclusivamente automatizzato che comporti effetti giuridici
      sull’interessato.
    </p>

    <br />
    <h4 class="h4 blueText">Cookie Policy</h4>
    <p>
      Sono in uso cookie tecnici di sessione non persistenti in modo
      strettamente limitato a quanto necessario per la navigazione sicura ed
      efficiente del sito. <br /> Non viene fatto uso di cookie per la profilazione
      degli utenti.
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
