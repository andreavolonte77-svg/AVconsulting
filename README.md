# Advance Vector Consulting — sito web

Sito vetrina di Advance Vector Consulting · *Growth. Strategy. Execution.*

Sito statico: HTML + CSS + JS minimo, nessun framework, nessuna build.
Per vederlo in locale basta aprire `index.html` nel browser.

## Struttura

```
index.html               Home: hero e sintesi delle sezioni
chi-sono.html            Biografia e percorso
approccio.html           Approccio e punti di forza
servizi.html             Tre aree: Growth, Strategy, Execution
settori.html             Settori di specializzazione
risultati.html           Risultati e numeri chiave
metodo.html              Metodo di lavoro in cinque fasi
a-chi-mi-rivolgo.html    Profili dei clienti ideali
contatti.html            Modulo di contatto
privacy.html             Informativa privacy (bozza da completare)
css/style.css            Unico foglio di stile, palette in :root
js/main.js               Menu mobile, animazioni, invio form
assets/img/              Logo, illustrazione hero, foto, favicon, immagine social
tools/hero_svg.py        Script che rigenera l'illustrazione dell'hero
robots.txt, sitemap.xml  File per i motori di ricerca
```

Header e footer sono ripetuti in ogni pagina: per aggiungere una voce di
menu va modificata in tutti i file `.html`.

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
  `https://www.advancevector.it/` (cercare e sostituire se diverso)
- Dopo la pubblicazione: registrare il sito su Google Search Console
  e inviare `sitemap.xml`
