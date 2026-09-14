# MANJIM'UP — site vitrine

Site one-page (Next.js 16, TypeScript, Tailwind CSS 4) pour MANJIM'UP, le paddle en libre-service.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
npm run lint
```

Copiez `.env.example` en `.env.local` et renseignez ce qui est nécessaire.

## Où modifier quoi

| Je veux changer…                         | Fichier                          |
| ---------------------------------------- | -------------------------------- |
| Tarifs B2C (30 min / 1 h / 2 h, pass)     | `src/data/pricing.ts`            |
| Stations (carte, liste, pages `/stations/…`) | `src/data/stations.ts`       |
| Offres partenaires, parts, simulateur    | `src/data/partnerOffers.ts`      |
| Tous les textes du site                  | `src/data/content.ts`            |
| FAQ                                      | `src/data/faq.ts`                |
| Nom de domaine, contact, réseaux, carte  | `src/data/site.ts`               |
| Pages légales                            | `src/data/legal.ts`              |
| Couleurs, typos, styles globaux          | `src/app/globals.css`            |

Aucune valeur commerciale n'est écrite en dur dans les composants.

### Stations

`src/data/stations.ts` est **vide au lancement**. Tant qu'il l'est, la section « Où nous trouver » affiche
« Les premières stations arrivent pour l'été 2027 » avec le formulaire « Être informé du lancement ».
Dès qu'une station est ajoutée (statut `open` ou `coming_soon`), le site affiche automatiquement :
la carte interactive (MapLibre + OpenStreetMap, sans clé API), les filtres, la liste, et une page SEO locale
`/stations/<slug>`.

Carte : fond [OpenFreeMap](https://openfreemap.org) (`site.map.styleUrl`, style `bright` par défaut, `positron`
pour une version plus sobre). Le worker MapLibre est copié dans `public/maplibre/` par
`scripts/copy-maplibre-worker.mjs` (postinstall / prebuild) : la résolution automatique du worker via
`import.meta.url` ne survit pas au bundling Next — ne pas supprimer ce script.

### Photos

Les emplacements photos utilisent des placeholders propres (`components/ui/Photo.tsx`). Pour mettre une vraie
image : déposez-la dans `public/images/` et renseignez le chemin (`hero.image` dans `content.ts`, `photo` dans
`stations.ts`, ou la prop `src` du composant `Photo`). `next/image` optimise automatiquement.

### Formulaires et leads

- `POST /api/partner` — formulaire partenaire (validation partagée client/serveur dans `lib/validation.ts`,
  pot de miel, délai minimum de remplissage, limitation de débit par IP).
- `POST /api/notify` — inscription au lancement.

L'acheminement est dans `src/lib/leads.ts` : Resend, Brevo et/ou webhook générique (HubSpot, Supabase…)
selon les variables d'environnement. Sans configuration, les leads sont loggés côté serveur.

### Analytics

`src/lib/analytics.ts` expose `track(event)` et la liste des événements
(`click_find_station`, `click_book_station`, `click_partner`, `partner_form_start`, `partner_form_submit`,
`pricing_view`, `station_view`, `simulator_use`). Il se branche sur Plausible ou GA4 dès que leur script est
chargé (voir le commentaire dans `src/app/layout.tsx`).

## Structure

```
src/
  app/            layout, page, robots, sitemap, icônes, OG image, API, pages légales, /stations/[slug]
  components/
    sections/     Header, Hero, HowItWorks, Benefits, Pricing, StationsSection, StationsMap, StationCard,
                  PartnerSection, PartnerOffers, PartnerSimulator, PartnerBenefits, PartnerForm,
                  Manifesto, FAQ, Footer, MobileCTA
    ui/           Button, Section, SectionHeading, Reveal, Photo, Field, TrackView
    graphics/     Logo, HeroScene (illustration), WaveDivider, Squiggle/SunMark
  data/           site, content, pricing, stations, partnerOffers, faq, legal
  lib/            analytics, validation, leads, rateLimit, utils
```

## Avant la mise en ligne

- [ ] Renseigner `NEXT_PUBLIC_SITE_URL` et les infos de `src/data/site.ts` (email, adresse, SIRET, réseaux).
- [ ] Remplacer les placeholders photo (hero, avantages, partenaire).
- [ ] Brancher un canal de leads (`.env.local`).
- [ ] Faire valider les pages légales, puis passer `legal.published` à `true`.
- [ ] Choisir l'outil analytics et activer son script dans `layout.tsx`.
- [ ] Confirmer les tarifs, les offres partenaires et l'accroche « 7j/7 » du hero.
