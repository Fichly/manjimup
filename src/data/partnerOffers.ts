/**
 * Offres commerciales partenaires.
 * ⚠️ Les prix et conditions sont encore susceptibles d'évoluer :
 * tout est centralisé ici, rien n'est écrit en dur dans les composants.
 */

export type PartnerOfferId = "manjimup_invests" | "partner_invests";

export type PartnerOffer = {
  id: PartnerOfferId;
  eyebrow: string;
  title: string;
  /** Investissement du partenaire, texte affiché */
  investment: { value: string; detail?: string };
  /** Part des recettes de location revenant au partenaire (0–1) */
  partnerShare: number;
  /** Part des recettes revenant à MANJIM'UP (0–1) */
  manjimupShare: number;
  bullets: string[];
  cta: string;
  featured?: boolean;
};

export const partnerOffers: PartnerOffer[] = [
  {
    id: "manjimup_invests",
    eyebrow: "Offre 1",
    title: "MANJIM'UP investit",
    investment: { value: "0 €", detail: "Aucun investissement de votre part" },
    partnerShare: 0.2,
    manjimupShare: 0.8,
    bullets: [
      "MANJIM'UP installe et exploite la station",
      "Matériel, maintenance et support pris en charge",
      "Vous touchez 20 % des recettes de location",
    ],
    cta: "Accueillir une station",
    featured: true,
  },
  {
    id: "partner_invests",
    eyebrow: "Offre 2",
    title: "Vous investissez",
    investment: { value: "à partir de 4 450 € HT", detail: "Prix actuellement envisagé" },
    partnerShare: 0.8,
    manjimupShare: 0.2,
    bullets: [
      "Vous achetez votre station",
      "Vous conservez 80 % des recettes de location",
      "MANJIM'UP : 20 % des recettes + éventuels services / redevance",
    ],
    cta: "Acheter ma station",
  },
];

export const partnerOffersDisclaimer =
  "Prix et conditions commerciales indicatifs, susceptibles d'évoluer. Chaque projet fait l'objet d'une proposition personnalisée.";

export const partnerPitch =
  "Un modèle conçu pour générer une nouvelle source de revenus sans créer une activité nautique complète.";

/** Paramètres du simulateur partenaire */
export const simulatorConfig = {
  paddleOptions: [4, 6],
  rentalsPerPaddlePerDay: { min: 0.5, max: 3, step: 0.5, default: 1.5 },
  operatingDays: { min: 30, max: 180, step: 5, default: 90 },
  averageBasket: { min: 5, max: 40, step: 1 },
  disclaimer:
    "Simulation indicative basée sur les hypothèses sélectionnées. Les résultats réels dépendent notamment de la fréquentation, de la météo, de l'emplacement et de la saison.",
};

export const partnerAudience = [
  "Campings",
  "Bases de loisirs",
  "Guinguettes",
  "Hôtels",
  "Collectivités",
  "Domaines touristiques",
  "Restaurants au bord de l'eau",
];

export const establishmentTypes = [
  "Camping",
  "Base de loisirs",
  "Guinguette",
  "Hôtel",
  "Collectivité",
  "Domaine touristique",
  "Restaurant / bar au bord de l'eau",
  "Autre",
] as const;

export type EstablishmentType = (typeof establishmentTypes)[number];
