/**
 * Pages légales. Contenu à valider par un juriste avant mise en ligne.
 * `published: false` → pages en noindex et absentes du sitemap.
 */
import { site } from "./site";

export type LegalSection = { title: string; paragraphs: string[] };
export type LegalDoc = { slug: string; title: string; updated: string; intro?: string; sections: LegalSection[] };

export const legal: { published: boolean; updated: string; documents: { mentions: LegalDoc; cgv: LegalDoc; privacy: LegalDoc } } = {
  published: false,
  updated: "À compléter",
  documents: {
    mentions: {
      slug: "mentions-legales",
      title: "Mentions légales",
      updated: "À compléter",
      sections: [
        {
          title: "Éditeur du site",
          paragraphs: [
            `${site.legalName} — [forme juridique et capital à compléter]`,
            `Siège social : ${site.contact.address || "[adresse à compléter]"}`,
            `SIRET : ${site.contact.siret || "[à compléter]"} — RCS : [à compléter]`,
            `Directeur de la publication : [à compléter]`,
            `Contact : ${site.contact.email}`,
          ],
        },
        {
          title: "Hébergement",
          paragraphs: ["[Nom de l'hébergeur, adresse et téléphone à compléter — ex. Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA]"],
        },
        {
          title: "Propriété intellectuelle",
          paragraphs: [
            "L'ensemble des contenus du site (textes, visuels, logo, marque MANJIM'UP) est protégé par le droit de la propriété intellectuelle. Toute reproduction sans autorisation écrite préalable est interdite.",
          ],
        },
        {
          title: "Données cartographiques",
          paragraphs: ["Fond de carte : © OpenFreeMap, données © les contributeurs OpenStreetMap (ODbL)."],
        },
      ],
    },
    cgv: {
      slug: "cgv",
      title: "Conditions générales de vente",
      updated: "À compléter",
      intro: "Ces conditions encadrent la location de paddles en libre-service via les stations MANJIM'UP. Version de travail : à valider avant l'ouverture des premières stations.",
      sections: [
        { title: "1. Objet", paragraphs: ["Les présentes conditions régissent la location de matériel de stand-up paddle (planche, pagaie, gilet) en libre-service, réservée et payée en ligne depuis une station MANJIM'UP."] },
        { title: "2. Réservation et paiement", paragraphs: ["La réservation s'effectue en scannant le QR code de la station. Le paiement est exigible en ligne au moment de la réservation. Les tarifs applicables sont ceux affichés sur la station et le site au moment de la commande ; ils peuvent varier selon les stations."] },
        { title: "3. Durée et restitution", paragraphs: ["La durée de location court à compter de l'ouverture de la cellule. Le matériel doit être restitué complet dans la cellule d'origine avant la fin de la durée réservée. [Conditions de dépassement à compléter.]"] },
        { title: "4. Conditions de pratique et sécurité", paragraphs: ["L'utilisateur déclare savoir nager et pratique sous sa propre responsabilité. Le port du gilet est fortement recommandé. La navigation est interdite en cas de conditions dangereuses ou d'interdiction en vigueur sur le plan d'eau. [Âge minimum et conditions d'encadrement des mineurs à compléter.]"] },
        { title: "5. Annulation, météo", paragraphs: ["[Politique d'annulation et de report en cas de mauvais temps à compléter.]"] },
        { title: "6. Responsabilité et dommages", paragraphs: ["[Conditions en cas de perte, casse ou non-restitution du matériel à compléter.]"] },
        { title: "7. Droit applicable", paragraphs: ["Les présentes conditions sont soumises au droit français. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. Plateforme européenne de règlement en ligne des litiges : https://ec.europa.eu/consumers/odr"] },
      ],
    },
    privacy: {
      slug: "confidentialite",
      title: "Politique de confidentialité",
      updated: "À compléter",
      sections: [
        { title: "Responsable du traitement", paragraphs: [`${site.legalName} — ${site.contact.email}`] },
        {
          title: "Données collectées",
          paragraphs: [
            "Formulaire partenaire : prénom, nom, établissement, type d'établissement, ville, email, téléphone, site internet, message. Finalité : étudier votre projet et vous recontacter. Base légale : mesures précontractuelles / intérêt légitime.",
            "Inscription au lancement : adresse email. Finalité : vous informer de l'ouverture des stations. Base légale : consentement.",
            "Données techniques : adresse IP et navigateur, utilisées uniquement pour la sécurité (anti-spam, limitation de débit).",
          ],
        },
        { title: "Durée de conservation", paragraphs: ["Données de contact partenaire : 3 ans après le dernier échange. Inscriptions au lancement : jusqu'à désinscription ou 3 ans. [À ajuster.]"] },
        { title: "Destinataires et sous-traitants", paragraphs: ["[À compléter selon les outils réellement branchés : hébergeur, service d'emailing (ex. Resend, Brevo), CRM (ex. HubSpot).]"] },
        { title: "Mesure d'audience", paragraphs: ["[À compléter selon l'outil retenu. Plausible (sans cookie) ne nécessite pas de consentement ; GA4 nécessite un bandeau de consentement.]"] },
        { title: "Vos droits", paragraphs: [`Vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition et de portabilité. Écrivez-nous à ${site.contact.email}. Vous pouvez également saisir la CNIL (www.cnil.fr).`] },
      ],
    },
  },
};
