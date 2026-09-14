export type FaqItem = { q: string; a: string };

export const faq: { users: FaqItem[]; partners: FaqItem[] } = {
  users: [
    {
      q: "Comment récupérer mon paddle ?",
      a: "Scanne le QR code de la station, choisis ta durée et paie en ligne. Tu reçois aussitôt un code qui ouvre ta cellule. À l'intérieur : la planche, la pagaie et le gilet.",
    },
    {
      q: "Le gilet est-il fourni ?",
      a: "Oui. Chaque cellule contient une planche gonflable, une pagaie et un gilet d'aide à la flottabilité. Le port du gilet est fortement recommandé.",
    },
    {
      q: "Faut-il télécharger une application ?",
      a: "Non. Tout se passe depuis le navigateur de ton téléphone, en scannant le QR code. Rien à installer, rien à créer.",
    },
    {
      q: "Que se passe-t-il en cas de mauvais temps ?",
      a: "La sécurité passe avant tout : en cas de vent fort, d'orage ou d'interdiction de navigation, ne va pas sur l'eau. Les conditions d'annulation ou de report sont précisées au moment de la réservation.",
    },
    {
      q: "Puis-je réserver plusieurs paddles ?",
      a: "Oui, dans la limite des cellules disponibles à la station. Chaque paddle réservé ouvre sa propre cellule.",
    },
    {
      q: "Que faire en cas de problème ?",
      a: "Un numéro de support est affiché sur chaque station et rappelé dans ta confirmation de réservation. On est là pour t'aider, même un dimanche.",
    },
  ],
  partners: [
    {
      q: "Qui entretient le matériel ?",
      a: "MANJIM'UP prend en charge l'entretien, le remplacement du matériel et la maintenance de la station. Les modalités précises (fréquence des passages, petites vérifications sur place) sont définies ensemble dans le contrat.",
    },
    {
      q: "Qui encaisse les locations ?",
      a: "Le paiement se fait en ligne via la plateforme MANJIM'UP. La part revenant au partenaire est ensuite reversée selon la périodicité prévue au contrat.",
    },
    {
      q: "De combien d'espace ai-je besoin ?",
      a: "Une station occupe l'emprise au sol d'une petite remise, à quelques mètres de l'eau. Les dimensions exactes dépendent du modèle (4 ou 6 paddles) : on vous les communique lors de l'étude de votre emplacement.",
    },
    {
      q: "La station doit-elle être raccordée à l'électricité ?",
      a: "Un raccordement électrique simple est privilégié. Des options d'alimentation autonome sont à l'étude pour les sites isolés. On vérifie ce point avec vous dès le premier échange.",
    },
    {
      q: "Peut-on personnaliser la station ?",
      a: "Oui, dans une certaine mesure : habillage aux couleurs de votre établissement, signalétique sur place. Les possibilités sont précisées lors de l'étude du projet.",
    },
    {
      q: "Comment devenir partenaire ?",
      a: "Remplissez le formulaire « Parlons de votre spot ». On étudie votre emplacement, on vous rappelle, et si le site s'y prête, on vous propose la formule la plus adaptée.",
    },
  ],
};
