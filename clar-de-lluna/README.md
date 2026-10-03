# Clar de Lluna — menu digital

Carte digitale (QR) pour **Clar de Lluna**, coffee shop à Boumhel, Ben Arous.
Site 100 % statique : HTML + CSS + JavaScript, aucune dépendance, aucun serveur.

```
site/          ← le site à mettre en ligne (c'est le seul dossier à publier)
  index.html   ← structure + dessins vectoriels (générés)
  styles.css
  app.js       ← carte, catégories, recherche, ciel étoilé
  menu.js      ← TOUT le menu : noms, ingrédients, prix
  favicon.svg, icon-*.png, manifest.webmanifest
tools/         ← scripts de vérification (non publiés)
reference/     ← photos de la carte imprimée
screenshots/   ← captures de contrôle (360, 375, 390, 430, 1280 px)
```

## Modifier un prix

Ouvrez `site/menu.js` et changez le nombre `price` (point décimal : `4.5` s'affiche « 4,5 DT »).
`sig: true` ajoute l'article aux « Signatures de la maison ».

## Voir en local

```bash
cd clar-de-lluna/site && python3 -m http.server 8765
# → http://localhost:8765
```

## Mettre en ligne gratuitement

**Netlify (le plus simple)**
1. Créez un compte gratuit sur netlify.com (sinon un déploiement anonyme expire au bout d'une heure).
2. Allez sur **app.netlify.com/drop** et glissez-déposez le dossier **`clar-de-lluna/site`**.
3. *Site configuration → Change site name* → `clar-de-lluna` → l'adresse devient `https://clar-de-lluna.netlify.app`.
4. Pour une mise à jour, refaites un glisser-déposer dans l'onglet *Deploys*.

**Vercel (alternative)**
```bash
cd clar-de-lluna/site && npx vercel --prod
```

## Le QR code

Une fois l'adresse en ligne :
```bash
npx qrcode -t svg -o clar-de-lluna-qr.svg "https://clar-de-lluna.netlify.app"
```
Le SVG s'imprime net à n'importe quelle taille (ou utilisez un générateur de QR gratuit en ligne).
Imprimez-le en au moins 3 × 3 cm, sombre sur fond clair, et testez-le avec deux téléphones avant l'impression finale.

## Vérifications (pour les développeurs)

```bash
node tools/check-data.cjs                    # 14 catégories, 59 articles, total 529,8 DT
node tools/build-svg.mjs                     # regénère le logo, le disque et le favicon
(cd site && python3 -m http.server 8765) &
node tools/verify.cjs                        # Playwright : débordements, logo, chips, scroll-spy, recherche + captures
node tools/icons.cjs                         # regénère les icônes PNG
```
