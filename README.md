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

> Creare nuovo file .env con la copia dei file coll.env e prod.env a seconda dell'ambiente di rilascio.
