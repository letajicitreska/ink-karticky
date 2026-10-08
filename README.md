# Kartičky pocitů a potřeb · INK

Webová aplikace s kartičkami pocitů a potřeb Institutu nenásilné komunikace. Běží na **https://karty.ink.cz** (GitHub Pages), funguje na mobilu, dá se přidat na plochu a funguje i offline.

## Soubory

| Soubor | Co v něm je |
|---|---|
| `data.js` | **Veškerý obsah**: karty CZ/EN, popisky rozhraní, texty cvičení |
| `index.html`, `style.css`, `app.js` | Aplikace (vzhled podle brand manuálu INK) |
| `sw.js` | Offline režim |
| `manifest.webmanifest`, `img/` | Ikona a název aplikace na ploše telefonu |
| `fonts/` | Haffer (licence INK), jen znaky pro češtinu a angličtinu |
| `CNAME` | Doména karty.ink.cz |

## Jak upravit obsah

1. Změňte texty v `data.js`. Řádky na kartě odděluje znak `|`.
2. V `sw.js` zvyšte číslo verze (`ink-karticky-v1` → `v2`), aby se lidem v telefonech stáhla nová verze.
3. Nahrajte změny:
   ```
   git add . && git commit -m "Úprava karet" && git push
   ```
   Za 1–2 minuty je to na webu.

Pozor: výběr karet se lidem ukládá podle textu karty. Když text karty změníte, zmizí jim tato karta z uloženého výběru (nic jiného se nerozbije).

## Odkazy

- Česká verze: https://karty.ink.cz
- Anglická verze rovnou: https://karty.ink.cz/?lang=en
- Jinak se jazyk řídí nastavením telefonu (čeština a slovenština → CZ, ostatní → EN) a poslední volbou uživatele.

## Licence

Kartičky, cvičení a aplikace: Institut nenásilné komunikace, ink.cz. Texty cvičení: CC BY-SA 4.0.
