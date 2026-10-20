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
assets/img/           Logo, favicon, icona iOS, immagine social (og-image.jpg)
robots.txt, sitemap.xml  File per i motori di ricerca
```

## Modulo contatti (Formspree)

Il form invia a `https://formspree.io/f/mdearajn`. I messaggi arrivano
all'email impostata nel modulo su formspree.io, dove si gestiscono anche
destinatari, filtro spam e storico degli invii.

Per cambiare modulo basta sostituire il codice nell'attributo `action`
del form in `index.html`.

## Da completare prima della pubblicazione

- P.IVA nel footer di `index.html` e `privacy.html`
- Campi `[...]` in `privacy.html`, da far verificare a un consulente privacy
- Dominio: canonical, Open Graph, sitemap e dati strutturati usano
  `https://avconsulting.it/` (cercare e sostituire se diverso)
- Dopo la pubblicazione: registrare il sito su Google Search Console
  e inviare `sitemap.xml`
