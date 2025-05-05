# Dashboard Monitoraggio Accessibilità

Il progetto ha l'obiettivo di implementare una dashboard dove è possibile
analizzare i dati del monitoraggio dei siti della Pubblica Amministrazione
effettuato da [Mauve++](https://mauve.isti.cnr.it/) e di esporre i dati delle
Dichiarazioni di accessibilità raccolte tramite AGID Form.

## Tecnologie utilizzate

[Node.js](https://nodejs.org/) (v19.4.x).
[Svelte](https://kit.svelte.dev/) (3.52.x).
[Yarn](https://yarnpkg.com/)(1.22.x)
[Boostrap Italia](https://italia.github.io/bootstrap-italia/)

## Procedura di installazione

1. installare [git](https://git-scm.com/downloads)
2. installare [Node.js](https://nodejs.org/) (v19.4.x).
3. installare [Yarn](https://yarnpkg.com/)(1.22.x)
4. eseguire i seguenti comandi da console:

```shell
git clone https://github.com/AgID/accessibilita-dashboard.git
cd accessibilita-dashboard
npm install -g yarn
yarn dev
```

Creare nuovo file .env con la copia dei file coll.env e prod.env a seconda dell'ambiente di rilascio.