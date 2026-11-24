# Dashboard Monitoraggio Accessibilità

Il progetto ha l'obiettivo di implementare una dashboard dove è possibile
analizzare i dati del monitoraggio dei siti della Pubblica Amministrazione
effettuato da [Mauve++](https://mauve.isti.cnr.it/) e di esporre i dati delle
Dichiarazioni di accessibilità raccolte tramite AGID Form.

## Tecnologie utilizzate

- [Node.js](https://nodejs.org/) (v20.x)
- [Svelte](https://svelte.dev/) (5.41.3)
- [Vite](https://vitejs.dev/) (7.1.12)
- [Routify](https://routify.dev/) (3.6.4)
- [Playwright](https://playwright.dev/) (^1.52.0)
- [Bootstrap Italia](https://italia.github.io/bootstrap-italia/) (2.0.9)

## Procedura di installazione

1. installare [git](https://git-scm.com/downloads)
2. installare [Node.js](https://nodejs.org/) (v20.x).
3. eseguire i seguenti comandi da console:

```shell
git clone https://github.com/AgID/accessibilita-dashboard.git
cd accessibilita-dashboard
npm install
npm run dev
```

## Configurazione per ambiente

I valori che cambiano tra collaudo e produzione non sono inseriti nella build:
sono letti a runtime da `window.APP_CONFIG`, definito in `public/config.js`.

- `public/config.js` contiene i valori di sviluppo (collaudo) e viene usato da
  `npm run dev` e `npm run preview`;
- `public/config.js.j2` è il template che la pipeline di deploy compila per
  l'ambiente di destinazione e pubblica come `config.js`.

Per aggiungere un valore: aggiungerlo in entrambi i file e in
`src/lib/utils/runtimeConfig.ts`.

## Build e deploy (Devops-AWS)

Il sito viene rilasciato con il deploy di tipo `static` di Devops-AWS:

- la build (`docker compose build`) produce l'immagine `site`, che contiene
  solo i file di `dist/client/` in `/site`; la stessa immagine viene usata per
  collaudo e produzione;
- il deploy compila `config.js.j2`, pubblica i file su S3 e invalida la cache
  CloudFront; le impostazioni di cache sono in `static_deploy.yml`.

Anteprima locale dell'immagine con nginx:

```shell
printf 'IMAGE_REPOSITORY_BASE_URL=local\nAPP_VERSION=0.0.0\n' > .env
docker compose --profile preview up --build
# http://localhost:8080
```
