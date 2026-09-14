/**
 * Configuration globale du site MANJIM'UP.
 * Tout ce qui est marqué "À compléter" doit être renseigné avant la mise en ligne.
 */

export const site = {
  name: "MANJIM'UP",
  legalName: "MANJIM'UP", // À compléter : raison sociale exacte
  tagline: "Le paddle en libre-service, simplement.",
  slogan: "Plus d'eau dans les vies.",
  description:
    "Location de paddle en libre-service au bord des lacs et plages du Sud-Ouest. Scannez le QR code de la station, réservez, récupérez votre planche, pagaie et gilet. Sans appli, sans comptoir.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://manjimup.fr", // À confirmer : nom de domaine
  locale: "fr_FR",
  launch: {
    region: "Sud-Ouest de la France",
    label: "Été 2027", // Période de lancement affichée dans l'état vide de la carte
  },
  contact: {
    email: "bonjour@manjimup.fr", // À compléter
    phone: "", // Optionnel
    address: "", // À compléter : adresse du siège
    siret: "", // À compléter
  },
  social: {
    instagram: "https://www.instagram.com/manjimup", // À confirmer
    linkedin: "https://www.linkedin.com/company/manjimup", // À confirmer
  },
  /**
   * Fond de carte MapLibre sans clé API (OpenFreeMap, données OpenStreetMap).
   * Remplaçable par n'importe quel style MapLibre.
   */
  map: {
    styleUrl: "https://tiles.openfreemap.org/styles/bright",
    // Centre par défaut : Sud-Ouest (Landes / Gironde)
    center: { lng: -0.9, lat: 44.4 },
    zoom: 7,
    attribution:
      '© <a href="https://openfreemap.org" target="_blank" rel="noreferrer">OpenFreeMap</a> · © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>',
  },
  nav: [
    { label: "Le concept", href: "#concept" },
    { label: "Tarifs", href: "#tarifs" },
    { label: "Où nous trouver", href: "#stations" },
    { label: "Devenir partenaire", href: "#partenaire" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: {
    findStation: { label: "Trouver une station", href: "#stations" },
    becomePartner: { label: "Devenir partenaire", href: "#partenaire" },
    notifyLaunch: { label: "Être informé du lancement", href: "#stations" },
    studySpot: { label: "Étudier mon emplacement", href: "#contact-partenaire" },
  },
} as const;

export type Site = typeof site;
