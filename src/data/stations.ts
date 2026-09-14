/**
 * Stations MANJIM'UP.
 *
 * ⚠️ N'ajoutez ici que des stations réelles (ouvertes ou signées).
 * Le site n'affiche que ce qui est présent dans ce tableau :
 * - tableau vide  → état "Les premières stations arrivent pour l'été 2027"
 * - ≥ 1 station   → carte interactive + liste + page /stations/[slug]
 */

export type StationStatus = "open" | "coming_soon";

export type Station = {
  /** Identifiant URL, ex. "lacanau" → /stations/lacanau */
  slug: string;
  name: string;
  city: string;
  /** Code postal (utile pour le SEO local) */
  postalCode?: string;
  latitude: number;
  longitude: number;
  address: string;
  /** Établissement partenaire (camping, base de loisirs…) */
  partner: string;
  paddles: number;
  status: StationStatus;
  /** Lien vers la réservation (le même que le QR code de la station) */
  bookingUrl?: string;
  /** Chemin d'une photo dans /public (ex. "/images/stations/lacanau.jpg") */
  photo?: string;
  /** Horaires d'accès à la station, texte libre */
  hours?: string;
  /** Description courte, utilisée sur la page locale */
  description?: string;
};

export const stationStatusLabel: Record<StationStatus, string> = {
  open: "Ouvert",
  coming_soon: "Bientôt disponible",
};

export const stations: Station[] = [
  // Exemple de structure (à décommenter et adapter quand une station est réelle) :
  // {
  //   slug: "lacanau",
  //   name: "Station Lac de Lacanau",
  //   city: "Lacanau",
  //   postalCode: "33680",
  //   latitude: 45.0007,
  //   longitude: -1.0785,
  //   address: "Plage du Moutchic, 33680 Lacanau",
  //   partner: "Camping Les Pins",
  //   paddles: 6,
  //   status: "coming_soon",
  //   bookingUrl: "https://app.manjimup.fr/s/lacanau",
  //   photo: "/images/stations/lacanau.jpg",
  //   hours: "Accès de 9h à 20h",
  //   description: "Au bord du lac, à deux pas de la plage du Moutchic.",
  // },
];

export const openStations = stations.filter((s) => s.status === "open");
export const comingSoonStations = stations.filter((s) => s.status === "coming_soon");

export function getStation(slug: string) {
  return stations.find((s) => s.slug === slug);
}
