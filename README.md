# AV Consulting — sito web

Sito vetrina di AV Consulting · *Growth. Strategy. Execution.*

Sito statico: HTML + CSS + JS minimo, nessun framework, nessuna build.
Per vederlo in locale basta aprire `index.html` nel browser.

## Struttura

```
index.html            Home (pagina unica a sezioni)
privacy.html          Informativa privacy (bozza da completare)
css/style.css         Unico foglio di stile, palette in :root
js/main.js            Menu mobile, animazioni, invio form
assets/img/           Logo, favicon e icona per iOS
```

## Attivare il modulo contatti (Formspree)

1. Crea un account gratuito su https://formspree.io e un nuovo modulo
   con destinazione `andrea@avconsulting.it`.
2. Copia il codice del modulo (es. `xabcdefg` da `https://formspree.io/f/xabcdefg`).
3. In `index.html` sostituisci `IL_TUO_ID` nell'attributo `action` del form.

Finché il codice non è inserito, il modulo non finge l'invio: mostra un
messaggio con l'indirizzo email da usare in alternativa.

## Da completare prima della pubblicazione

- P.IVA nel footer di `index.html` e `privacy.html`
- Campi `[...]` in `privacy.html`, da far verificare a un consulente privacy
- Nome nella meta description (oggi "Andrea Verderio": verificare)
