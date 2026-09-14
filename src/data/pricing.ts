/**
 * Tarifs B2C. Une seule source de vérité : modifiez ici, tout le site suit
 * (section Tarifs, simulateur partenaire, données structurées).
 */

export type PricingOption = {
  id: string;
  label: string;
  /** Durée en minutes */
  minutes: number;
  /** Prix TTC en euros. `null` = pas encore défini (non affiché). */
  price: number | null;
  highlight?: boolean;
  note?: string;
};

export type Pricing = {
  currency: string;
  sessions: PricingOption[];
  /** Formules à venir : passent à l'affichage dès qu'un prix est renseigné. */
  passes: PricingOption[];
  included: string[];
  disclaimer: string;
  /** Panier moyen par défaut utilisé par le simulateur partenaire (€ TTC). */
  defaultAverageBasket: number;
};

export const pricing: Pricing = {
  currency: "EUR",
  sessions: [
    { id: "30min", label: "30 min", minutes: 30, price: 10 },
    { id: "1h", label: "1 h", minutes: 60, price: 15, highlight: true, note: "Le plus choisi" },
    { id: "2h", label: "2 h", minutes: 120, price: 20 },
  ],
  passes: [
    { id: "famille", label: "Pass famille", minutes: 0, price: null },
    { id: "semaine", label: "Pass semaine", minutes: 0, price: null },
  ],
  included: ["Planche", "Pagaie", "Gilet"],
  disclaimer: "Les tarifs peuvent varier selon les stations.",
  defaultAverageBasket: 15,
};

export function formatPrice(value: number, currency: string = pricing.currency) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
