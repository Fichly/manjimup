/**
 * Contenu éditorial du site. Tous les textes visibles sont ici.
 * Ton : tutoiement côté vacancier, vouvoiement chaleureux côté partenaire.
 */

export const hero = {
  eyebrow: "Paddle en libre-service · Sud-Ouest",
  title: ["Un paddle.", "Un QR code.", "Et vous êtes sur l'eau."],
  subtitle:
    "Loue ton paddle en libre-service, directement au bord de l'eau. Sans appli. Sans comptoir. Sans prise de tête.",
  annotation: "Scanne. Loue. Pagaie.",
  note: "Disponible 7j/7 sur nos spots partenaires.",
  /** Photo/vidéo réelle à placer ici quand disponible (chemin dans /public). */
  image: null as string | null,
  imageAlt:
    "Une personne en stand-up paddle sur un lac calme, lumière de fin de journée",
};

export const howItWorks = {
  eyebrow: "Le concept",
  title: "De la rive à l'eau en quelques minutes.",
  subtitle: "Plus simple, ça va être compliqué.",
  steps: [
    {
      n: "01",
      title: "Scanne",
      text: "Scanne le QR code de la station avec ton téléphone.",
      icon: "qr" as const,
    },
    {
      n: "02",
      title: "Réserve",
      text: "Choisis ta durée et paie en ligne, en quelques secondes.",
      icon: "timer" as const,
    },
    {
      n: "03",
      title: "Récupère",
      text: "Reçois ton code et ouvre ta cellule.",
      icon: "lock" as const,
    },
    {
      n: "04",
      title: "Pagaie",
      text: "Prends la planche, la pagaie et le gilet. À toi l'eau.",
      icon: "waves" as const,
    },
  ],
  after: "Une fois rentré, tu remets simplement le matériel dans la station.",
};

export const benefits = {
  eyebrow: "Pourquoi MANJIM'UP ?",
  title: "Le paddle, sans rien prévoir.",
  items: [
    {
      title: "Toujours là où il faut",
      text: "Directement sur ton lieu de vacances ou ton spot préféré.",
      icon: "pin" as const,
    },
    {
      title: "Sans application",
      text: "Un smartphone et un QR code suffisent.",
      icon: "phone" as const,
    },
    {
      title: "Tout est inclus",
      text: "Planche, pagaie et gilet t'attendent dans la cellule.",
      icon: "check" as const,
    },
    {
      title: "Plus de liberté",
      text: "Pas besoin d'attendre l'ouverture d'un comptoir.",
      icon: "sun" as const,
    },
  ],
  photoLabel: "Photo : planche, pagaie et gilet devant une station MANJIM'UP",
};

export const pricingSection = {
  eyebrow: "Tarifs",
  title: "Choisis ta session.",
  subtitle: "Tout est inclus. Tu paies en ligne, tu pars sur l'eau.",
  comingSoonLabel: "Bientôt",
};

export const stationsSection = {
  eyebrow: "Où nous trouver",
  title: "Un paddle jamais très loin.",
  subtitle:
    "Nos stations s'installent dans les campings, bases de loisirs, guinguettes et plages du Sud-Ouest.",
  filters: [
    { id: "all", label: "Toutes" },
    { id: "open", label: "Ouvertes" },
    { id: "coming_soon", label: "Bientôt disponibles" },
  ] as const,
  empty: {
    title: "Les premières stations MANJIM'UP arrivent pour l'été 2027.",
    text: "Laisse-nous ton email : on te prévient dès l'ouverture des premiers spots dans le Sud-Ouest.",
    placeholder: "ton@email.fr",
    cta: "Être informé du lancement",
    success: "C'est noté ! On te tient au courant dès que les premières stations ouvrent.",
  },
  noResult: "Aucune station ne correspond à ce filtre pour le moment.",
  rentHere: "Louer ici",
  comingSoon: "Bientôt disponible",
};

export const partnerSection = {
  eyebrow: "Partenaires",
  title: "Et si MANJIM'UP s'installait chez vous ?",
  subtitle:
    "Proposez une activité paddle à vos clients sans gérer une base nautique.",
  weHandleTitle: "MANJIM'UP peut gérer",
  weHandle: [
    "L'installation de la station",
    "La réservation et le paiement en ligne",
    "L'accès par code",
    "Le matériel",
    "La maintenance",
    "Le support client",
  ],
  youBringTitle: "Vous apportez",
  youBring: [
    "Un bon emplacement",
    "Un accès adapté à l'eau",
    "De la visibilité auprès de vos clients",
  ],
  photoLabel: "Photo : station MANJIM'UP installée au bord d'un lac, devant un camping",
};

export const partnerOffersSection = {
  eyebrow: "Deux formules",
  title: "Choisissez votre formule.",
};

export const simulatorSection = {
  eyebrow: "Simulateur",
  title: "Quel potentiel pour votre établissement ?",
  subtitle: "Ajustez les hypothèses, l'estimation se met à jour en direct.",
  labels: {
    offer: "Formule",
    paddles: "Nombre de paddles",
    rentals: "Locations par paddle et par jour",
    days: "Jours d'exploitation",
    basket: "Panier moyen (€ TTC)",
    revenue: "CA location estimé",
    partnerShare: "Part partenaire estimée",
    manjimupShare: "Part MANJIM'UP estimée",
    perSeason: "sur la saison",
  },
};

export const partnerBenefits = {
  eyebrow: "Pourquoi ça marche pour vous ?",
  title: "Une activité en plus. Pas une base nautique à gérer.",
  items: [
    {
      title: "Une activité supplémentaire",
      text: "Offrez davantage de services à vos visiteurs, sans personnel dédié.",
      icon: "sparkles" as const,
    },
    {
      title: "Une nouvelle source de revenus",
      text: "Une partie des locations revient au partenaire, chaque saison.",
      icon: "coins" as const,
    },
    {
      title: "Une gestion simplifiée",
      text: "MANJIM'UP prend en charge une grande partie de l'exploitation.",
      icon: "wrench" as const,
    },
  ],
  photoLabel: "Photo : station MANJIM'UP devant un camping, vue sur le lac",
};

export const partnerForm = {
  eyebrow: "Contact",
  title: "Parlons de votre spot.",
  subtitle:
    "Décrivez-nous votre établissement en deux minutes. On étudie l'emplacement et on revient vers vous rapidement.",
  submit: "Étudier mon emplacement",
  submitting: "Envoi en cours…",
  success: {
    title: "Merci !",
    text: "On regarde votre spot et on revient vers vous rapidement.",
  },
  error:
    "Oups, l'envoi n'a pas fonctionné. Réessayez dans un instant ou écrivez-nous directement par email.",
  waterAccessOptions: [
    { value: "yes", label: "Oui" },
    { value: "no", label: "Non" },
    { value: "nearby", label: "À proximité" },
  ] as const,
  consent:
    "En envoyant ce formulaire, vous acceptez que MANJIM'UP utilise vos coordonnées pour vous recontacter au sujet de votre projet.",
};

export const manifesto = {
  title: "Plus d'eau dans les vies.",
  paragraphs: [
    "MANJIM'UP est né d'une idée simple : rendre les activités nautiques plus faciles d'accès.",
    "Pas besoin de posséder son matériel. Pas besoin de prévoir trois jours à l'avance. Pas besoin d'une application supplémentaire.",
  ],
  closing: ["Un plan d'eau.", "Une planche.", "Quelques minutes.", "Et on y va."],
};

export const footer = {
  slogan: "Plus d'eau dans les vies.",
  closing: "À bientôt sur l'eau.",
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "CGV", href: "/cgv" },
    { label: "Politique de confidentialité", href: "/confidentialite" },
  ],
};
