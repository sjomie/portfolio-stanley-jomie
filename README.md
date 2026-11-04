# Portfolio — Stanley Jomie

Portfolio personnel en **React + Vite + Tailwind CSS + Framer Motion + Lucide React**.

## Lancer le site en local

Prérequis : Node.js 18 ou plus.

```bash
npm install
npm run dev        # http://localhost:5173
```

Build de production :

```bash
npm run build      # génère /dist
npm run preview    # sert /dist sur http://localhost:4173
```

Le dossier `dist/` peut être déployé tel quel sur Vercel, Netlify ou GitHub Pages
(chemins relatifs : il fonctionne aussi dans un sous-dossier).

## Auto-hébergement (Docker)

```bash
docker build -t portfolio-sjomie .
docker run -d -p 8080:80 --restart unless-stopped portfolio-sjomie
```

Le site est servi par nginx sur http://localhost:8080 (ou l'IP de votre serveur).

## Version page unique (artifact)

`node scripts/build-artifact.mjs` génère `artifact/` : une page autonome (CSS et JS intégrés)
plus les images et le CV, pour un hébergement en bac à sable. Dans ce mode, le CV s'ouvre dans un
nouvel onglet et le formulaire copie le message au lieu d'ouvrir la messagerie.

## Portrait (homepage)

Le portrait est intégré et détouré : `public/images/portrait.webp` (fond transparent, utilisé sur la
homepage) et `public/images/portrait.jpg` (original, utilisé comme image de partage Open Graph).
Le site ajoute un halo de contre-jour, une lumière de contour bleu électrique, un fondu à mi-corps
et un effet de profondeur qui suit la souris. Les traits du visage ne sont pas retouchés.

Pour changer de photo (idéalement sur fond uni) :

```bash
python3 scripts/cutout.py public/images/nouvelle.jpg public/images/portrait.png
```

puis convertissez en WebP (voir l'en-tête du script). Pour une photo non détourée, mettez
`portraitCutout: false` dans `src/data/profile.js` : un fondu et un étalonnage bleu nuit sont alors
appliqués automatiquement.

## Modifier le contenu

Tout le texte du site se trouve dans **`src/data/profile.js`** (profil, expériences, projets,
compétences, formation, contact), rédigé à partir de votre CV. Le CV téléchargeable se trouve dans
`public/cv/Stanley_JOMIE_CV.pdf` : remplacez ce fichier pour le mettre à jour.

## Architecture

```
portfolio/
├── index.html                 # SEO : title, description, Open Graph, JSON-LD Person
├── public/
│   ├── cv/Stanley_JOMIE_CV.pdf
│   ├── images/                # portrait.webp (détouré) + portrait.jpg (original)
│   ├── favicon.svg
│   └── robots.txt
├── scripts/cutout.py        # détourage automatique d'une photo sur fond uni
└── src/
    ├── main.jsx               # MotionConfig (respecte « réduire les animations »)
    ├── App.jsx
    ├── index.css              # Tailwind + masques du portrait, grain, utilitaires
    ├── data/profile.js        # ← tout le contenu
    ├── hooks/useActiveSection.js
    └── components/
        ├── Navbar.jsx         # menu fixe semi-transparent, section active, barre de progression, menu mobile
        ├── Hero.jsx           # homepage : composition asymétrique, parallaxe souris + scroll
        ├── Portrait.jsx       # traitement de la photo (fondu, étalonnage, lumière, profondeur 3D)
        ├── AviationBackdrop.jsx # grille de navigation, route PTP → CDG animée, rose des vents
        ├── About.jsx          # parcours, formation, engagements
        ├── Experience.jsx     # timeline animée au scroll
        ├── Projects.jsx       # projet phare + liste filtrable
        ├── ProjectModal.jsx   # étude de cas détaillée (Échap pour fermer)
        ├── Skills.jsx         # compétences façon tableau des départs + langues (CECRL)
        ├── Contact.jsx        # coordonnées, copie de l'email, formulaire mailto
        ├── Footer.jsx
        ├── SectionHeader.jsx
        └── Reveal.jsx         # apparition progressive au scroll
```
