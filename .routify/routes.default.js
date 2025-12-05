// @ts-nocheck


export const routes = {
  "meta": {},
  "id": "_default",
  "name": "",
  "file": {
    "path": "src/routes/_module.svelte",
    "dir": "src/routes",
    "base": "_module.svelte",
    "ext": ".svelte",
    "name": "_module"
  },
  "asyncModule": () => import('../src/routes/_module.svelte'),
  "rootName": "default",
  "routifyDir": import.meta.url,
  "children": [
    {
      "meta": {
        "dynamic": true,
        "order": false,
        "dynamicSpread": true
      },
      "id": "_default_____404__svelte",
      "name": "[...404]",
      "file": {
        "path": "src/routes/[...404].svelte",
        "dir": "src/routes",
        "base": "[...404].svelte",
        "ext": ".svelte",
        "name": "[...404]"
      },
      "asyncModule": () => import('../src/routes/[...404].svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_contatti_svelte",
      "name": "contatti",
      "file": {
        "path": "src/routes/contatti.svelte",
        "dir": "src/routes",
        "base": "contatti.svelte",
        "ext": ".svelte",
        "name": "contatti"
      },
      "asyncModule": () => import('../src/routes/contatti.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_cronologia_svelte",
      "name": "cronologia",
      "file": {
        "path": "src/routes/cronologia.svelte",
        "dir": "src/routes",
        "base": "cronologia.svelte",
        "ext": ".svelte",
        "name": "cronologia"
      },
      "asyncModule": () => import('../src/routes/cronologia.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_dichiarazione",
      "name": "dichiarazione",
      "module": false,
      "file": {
        "path": "src/routes/dichiarazione",
        "dir": "src/routes",
        "base": "dichiarazione",
        "ext": "",
        "name": "dichiarazione"
      },
      "children": [
        {
          "meta": {},
          "id": "_default_dichiarazione_app",
          "name": "app",
          "module": false,
          "file": {
            "path": "src/routes/dichiarazione/app",
            "dir": "src/routes/dichiarazione",
            "base": "app",
            "ext": "",
            "name": "app"
          },
          "children": [
            {
              "meta": {
                "isDefault": true
              },
              "id": "_default_dichiarazione_app_index_svelte",
              "name": "index",
              "file": {
                "path": "src/routes/dichiarazione/app/index.svelte",
                "dir": "src/routes/dichiarazione/app",
                "base": "index.svelte",
                "ext": ".svelte",
                "name": "index"
              },
              "asyncModule": () => import('../src/routes/dichiarazione/app/index.svelte'),
              "children": []
            }
          ]
        },
        {
          "meta": {
            "isDefault": true
          },
          "id": "_default_dichiarazione_index_svelte",
          "name": "index",
          "file": {
            "path": "src/routes/dichiarazione/index.svelte",
            "dir": "src/routes/dichiarazione",
            "base": "index.svelte",
            "ext": ".svelte",
            "name": "index"
          },
          "asyncModule": () => import('../src/routes/dichiarazione/index.svelte'),
          "children": []
        },
        {
          "meta": {},
          "id": "_default_dichiarazione_siti",
          "name": "siti",
          "module": false,
          "file": {
            "path": "src/routes/dichiarazione/siti",
            "dir": "src/routes/dichiarazione",
            "base": "siti",
            "ext": "",
            "name": "siti"
          },
          "children": [
            {
              "meta": {
                "isDefault": true
              },
              "id": "_default_dichiarazione_siti_index_svelte",
              "name": "index",
              "file": {
                "path": "src/routes/dichiarazione/siti/index.svelte",
                "dir": "src/routes/dichiarazione/siti",
                "base": "index.svelte",
                "ext": ".svelte",
                "name": "index"
              },
              "asyncModule": () => import('../src/routes/dichiarazione/siti/index.svelte'),
              "children": []
            }
          ]
        }
      ]
    },
    {
      "meta": {},
      "id": "_default_errori_approfondito_svelte",
      "name": "errori-approfondito",
      "file": {
        "path": "src/routes/errori-approfondito.svelte",
        "dir": "src/routes",
        "base": "errori-approfondito.svelte",
        "ext": ".svelte",
        "name": "errori-approfondito"
      },
      "asyncModule": () => import('../src/routes/errori-approfondito.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_errori_semplificato_svelte",
      "name": "errori-semplificato",
      "file": {
        "path": "src/routes/errori-semplificato.svelte",
        "dir": "src/routes",
        "base": "errori-semplificato.svelte",
        "ext": ".svelte",
        "name": "errori-semplificato"
      },
      "asyncModule": () => import('../src/routes/errori-semplificato.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_guida_alla_piattaforma_svelte",
      "name": "guida-alla-piattaforma",
      "file": {
        "path": "src/routes/guida-alla-piattaforma.svelte",
        "dir": "src/routes",
        "base": "guida-alla-piattaforma.svelte",
        "ext": ".svelte",
        "name": "guida-alla-piattaforma"
      },
      "asyncModule": () => import('../src/routes/guida-alla-piattaforma.svelte'),
      "children": []
    },
    {
      "meta": {
        "isDefault": true
      },
      "id": "_default_index_svelte",
      "name": "index",
      "file": {
        "path": "src/routes/index.svelte",
        "dir": "src/routes",
        "base": "index.svelte",
        "ext": ".svelte",
        "name": "index"
      },
      "asyncModule": () => import('../src/routes/index.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_monitoraggio_approfondito_svelte",
      "name": "monitoraggio-approfondito",
      "file": {
        "path": "src/routes/monitoraggio-approfondito.svelte",
        "dir": "src/routes",
        "base": "monitoraggio-approfondito.svelte",
        "ext": ".svelte",
        "name": "monitoraggio-approfondito"
      },
      "asyncModule": () => import('../src/routes/monitoraggio-approfondito.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_monitoraggio_semplificato_svelte",
      "name": "monitoraggio-semplificato",
      "file": {
        "path": "src/routes/monitoraggio-semplificato.svelte",
        "dir": "src/routes",
        "base": "monitoraggio-semplificato.svelte",
        "ext": ".svelte",
        "name": "monitoraggio-semplificato"
      },
      "asyncModule": () => import('../src/routes/monitoraggio-semplificato.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_note_legali_svelte",
      "name": "note-legali",
      "file": {
        "path": "src/routes/note-legali.svelte",
        "dir": "src/routes",
        "base": "note-legali.svelte",
        "ext": ".svelte",
        "name": "note-legali"
      },
      "asyncModule": () => import('../src/routes/note-legali.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_obiettivi_svelte",
      "name": "obiettivi",
      "file": {
        "path": "src/routes/obiettivi.svelte",
        "dir": "src/routes",
        "base": "obiettivi.svelte",
        "ext": ".svelte",
        "name": "obiettivi"
      },
      "asyncModule": () => import('../src/routes/obiettivi.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_opendata_svelte",
      "name": "opendata",
      "file": {
        "path": "src/routes/opendata.svelte",
        "dir": "src/routes",
        "base": "opendata.svelte",
        "ext": ".svelte",
        "name": "opendata"
      },
      "asyncModule": () => import('../src/routes/opendata.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_privacy_policy_svelte",
      "name": "privacy-policy",
      "file": {
        "path": "src/routes/privacy-policy.svelte",
        "dir": "src/routes",
        "base": "privacy-policy.svelte",
        "ext": ".svelte",
        "name": "privacy-policy"
      },
      "asyncModule": () => import('../src/routes/privacy-policy.svelte'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_progetto_svelte",
      "name": "progetto",
      "file": {
        "path": "src/routes/progetto.svelte",
        "dir": "src/routes",
        "base": "progetto.svelte",
        "ext": ".svelte",
        "name": "progetto"
      },
      "asyncModule": () => import('../src/routes/progetto.svelte'),
      "children": []
    }
  ]
}
export default routes