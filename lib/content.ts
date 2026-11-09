// Contenu repris de https://dalibi.wearekarfi.dev/ (accents rétablis).
export const SITE_URL = "https://dalibi.wearekarfi.dev";
export const GITHUB_URL = "https://github.com/wearedalibi/dalibi";
export const DEMO_MAILTO =
  "mailto:contact@dalibi.app?subject=Demande%20de%20d%C3%A9mo%20Dalibi";

export const NAV_LINKS = [
  { label: "Fonctionnalités", href: "/fonctionnalites" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Documentation", href: "/documentation" },
];

export const PAGE_SECTIONS = [
  { id: "accueil", label: "Accueil" },
  { id: "numerique", label: "Passez au numérique" },
  { id: "modules", label: "Sept modules" },
  { id: "automatisation", label: "Automatisation" },
  { id: "pour-qui", label: "Pour qui" },
  { id: "pilotage", label: "Statistiques" },
  { id: "securite", label: "Sécurité" },
  { id: "open-source", label: "Open source" },
  { id: "faq", label: "Questions" },
];

export const BENEFITS = [
  {
    title: "Gagnez un temps précieux",
    text: "Bulletins, reçus et documents générés automatiquement, en quelques clics.",
  },
  {
    title: "Fini les erreurs de calcul",
    text: "Moyennes pondérées et mentions fiables, calculées automatiquement.",
  },
  {
    title: "Des finances sous contrôle",
    text: "Paiements tracés, reçus à code-barres et soldes en temps réel.",
  },
  {
    title: "Des parents rassurés",
    text: "Notes, présences et scolarité accessibles depuis le portail famille.",
  },
  {
    title: "Une image moderne",
    text: "Une école digitale, organisée et sereine, qui inspire confiance.",
  },
];

export const MODULES = [
  {
    id: "eleves",
    title: "Élèves & Inscriptions",
    category: "Vie scolaire",
    points: [
      "Dossier élève complet avec photo et pièces justificatives",
      "Import CSV, passage de classe en masse, réaffectation",
      "Effectifs, statistiques et emploi du temps par classe",
    ],
  },
  {
    id: "bulletins",
    title: "Bulletins & Évaluations",
    category: "Pédagogie",
    points: [
      "Saisie des notes par trimestre ou semestre (par type de classe)",
      "Bulletins figés : mentions configurables, PDF par élève ou toute la classe",
      "Évaluations par classe et examens officiels (CEPD, BEPC, BAC)",
    ],
  },
  {
    id: "tresorerie",
    title: "Trésorerie & Écolage",
    category: "Finances",
    points: [
      "Structures de frais et plans de paiement en tranches",
      "Bourses, caisses et journal des transactions",
      "Reçus à code-barres avec vérification anti-falsification",
    ],
  },
  {
    id: "presences",
    title: "Présences & Permissions",
    category: "Suivi quotidien",
    points: [
      "Appel par classe, date et séance (matin / après-midi)",
      "Demandes de permission avec auto-excusement des absences",
      "Statistiques de présence par élève et par période",
    ],
  },
  {
    id: "paie",
    title: "Personnel & Paie",
    category: "Ressources humaines",
    points: [
      "Fiches employés, grilles salariales et primes tracées",
      "Cycles de paie mensuels : bulletins PDF, validation et décaissement en caisse",
      "Ancienneté, CNSS et ITS calculés automatiquement (paramétrables)",
    ],
  },
  {
    id: "documents",
    title: "Documents & Archives",
    category: "Administration",
    points: [
      "Modèles de documents PDF (certificats, attestations)",
      "Archivage documentaire avec tags et recherche",
      "Stockage local ou S3/R2 et sauvegardes planifiées",
    ],
  },
  {
    id: "securite-module",
    title: "Sécurité & Accès",
    category: "Rôles & permissions",
    points: [
      "Contrôle d’accès fin par permissions et par module",
      "Cinq rôles préconfigurés, ajustables sans toucher au code",
      "Authentification à deux facteurs (2FA) et multi-établissements",
    ],
  },
] as const;

export type ModuleId = (typeof MODULES)[number]["id"];

export const AUTOMATIONS = [
  {
    title: "Bulletins en PDF",
    text: "Générés pour toute une classe en un clic, fidèles au format officiel.",
  },
  {
    title: "Moyennes calculées",
    text: "Pondération par coefficients et mentions, sans calcul manuel.",
  },
  {
    title: "Reçus numérotés",
    text: "Code-barres et vérification anti-falsification automatiques.",
  },
  {
    title: "Présences consolidées",
    text: "Appels agrégés en statistiques par élève et par période.",
  },
  {
    title: "Sauvegardes planifiées",
    text: "Quotidiennes ou hebdomadaires, avec rétention automatique.",
  },
  {
    title: "Documents officiels",
    text: "Certificats et attestations générés depuis des modèles.",
  },
];

export const ROLES = [
  {
    id: "direction",
    title: "Direction & établissement",
    tagline: "Piloter l’école en temps réel",
    points: [
      "Tableau de bord : effectifs, présences, finances",
      "Alertes sur les retards de paiement",
      "Bulletins validés et statistiques par classe",
    ],
  },
  {
    id: "enseignants",
    title: "Enseignants",
    tagline: "La saisie des notes, simplifiée",
    points: [
      "Tableau de bord personnalisé : emploi du temps du jour, notes à saisir",
      "Moyennes pondérées calculées automatiquement",
      "Examens officiels et réclamations de notes",
    ],
  },
  {
    id: "administration",
    title: "Secrétariat & comptabilité",
    tagline: "Inscriptions et trésorerie maîtrisées",
    points: [
      "Inscriptions, dossiers élèves et imports CSV",
      "Frais, tranches de paiement et reçus à code-barres",
      "Documents et certificats PDF en un clic",
    ],
  },
  {
    id: "familles",
    title: "Parents & élèves",
    tagline: "Un portail dédié aux familles",
    points: [
      "Synthèse par enfant : moyenne, assiduité, écolage, dernier bulletin",
      "Notes, bulletins PDF, présences et solde en temps réel",
      "Accès sécurisé par compte parent ou élève",
    ],
  },
];

export const INDICATORS = [
  {
    title: "Parité & équité",
    text: "Indice de parité (IPS), part des filles, redoublement, abandon et sur-âge suivis en un coup d'œil.",
  },
  {
    title: "Réussite & examens officiels",
    text: "Mentions, taux de réussite interne et résultats aux examens officiels (CEPD, BEPC, BAC).",
  },
  {
    title: "Recouvrement & Mobile Money",
    text: "Taux de recouvrement de l’écolage et répartition par mode de paiement (Flooz, T-Money…).",
  },
  {
    title: "Encadrement & assiduité",
    text: "Ratio élèves/enseignant, classes pléthoriques et absentéisme, par classe et par période.",
  },
  {
    title: "Rapports officiels prêts à l’emploi",
    text: "Export PDF & Excel, comparaisons pluriannuelles, alignés sur l’annuaire statistique (MEPSTA).",
  },
];

export const SECURITY_ITEMS = [
  {
    title: "Permissions par module",
    text: "Contrôle d’accès fin : chaque action (voir, créer, modifier, supprimer) est gouvernée par une permission, du menu jusqu’à la base.",
  },
  {
    title: "Cinq rôles préconfigurés",
    text: "Administrateur, directeur, enseignant, comptabilité, secrétariat : ajustables à la volée, sans toucher au code.",
  },
  {
    title: "Authentification à deux facteurs",
    text: "2FA pour les comptes sensibles, limitation des tentatives de connexion et inscription publique désactivée.",
  },
  {
    title: "Fichiers sensibles privés",
    text: "Photos d’élèves et pièces du dossier stockées hors du dossier public, servies uniquement via des routes authentifiées.",
  },
  {
    title: "Sauvegardes & restauration",
    text: "Export JSON/SQL planifié, stockage local ou S3/R2, et restauration de la base depuis l’interface.",
  },
  {
    title: "Données souveraines",
    text: "Auto-hébergement complet sur PostgreSQL : vos données restent dans votre établissement, sans dépendance propriétaire.",
  },
];

export const OPEN_SOURCE_POINTS = [
  {
    title: "Licence GPL v3",
    text: "Code source ouvert, auditable et librement réutilisable.",
  },
  {
    title: "Données souveraines",
    text: "Auto-hébergé sur votre serveur : vos données restent chez vous.",
  },
  {
    title: "Sans dépendance propriétaire",
    text: "Aucun éditeur ne vous enferme : vous gardez le contrôle.",
  },
  {
    title: "Communauté & contributions",
    text: "Améliorations, traductions locales et corrections ouvertes à tous.",
  },
];

export const TECH_STACK = [
  "Laravel 12",
  "PHP 8.3",
  "React 19",
  "TypeScript",
  "Inertia.js",
  "PostgreSQL",
  "Tailwind CSS 4",
  "Docker",
];

export const FAQ_ITEMS = [
  {
    id: "prix",
    question: "Combien coûte Dalibi ?",
    answer:
      "Dalibi est open source sous licence GPL v3 : gratuit et illimité en auto-hébergement, avec tous les modules inclus. Un accompagnement (déploiement, migration des données, formation, support prioritaire) est proposé sur devis pour les établissements et réseaux scolaires.",
  },
  {
    id: "hors-ligne",
    question: "Dalibi fonctionne-t-il sans connexion internet permanente ?",
    answer:
      "Oui. Dalibi peut être déployé sur un serveur local de l’école pour un usage en réseau interne, avec des sauvegardes planifiées (quotidiennes ou hebdomadaires) vers le cloud lorsque la connexion est disponible.",
  },
  {
    id: "cycles",
    question: "Peut-on gérer à la fois des trimestres et des semestres ?",
    answer:
      "Oui. Le découpage trimestre/semestre est configurable par type de classe : un même établissement peut faire fonctionner le primaire en trimestres et le lycée en semestres. Le calcul des moyennes est paramétrable (coefficients, seuils, mentions).",
  },
  {
    id: "multi",
    question: "Peut-on gérer plusieurs établissements ?",
    answer:
      "Oui. Dalibi est multi-écoles (primaire, collège, lycée). Chaque établissement a son paramétrage propre : nom, code, devise, logo, années académiques, types de classes et niveaux.",
  },
  {
    id: "familles",
    question: "Les parents et les élèves ont-ils un espace dédié ?",
    answer:
      "Oui. Un portail donne aux familles l’accès aux notes, bulletins (PDF), présences, scolarité/solde et calendrier. L’accès est strictement cloisonné : un tuteur ne voit que ses enfants.",
  },
  {
    id: "ecolage",
    question: "Comment fonctionne la gestion de l’écolage ?",
    answer:
      "Vous définissez des structures de frais par catégorie et par classe, avec des tranches de paiement. Chaque paiement génère un reçu numéroté avec code-barres et code de vérification anti-falsification.",
  },
  {
    id: "prerequis",
    question: "Quels sont les prérequis pour l’installer ?",
    answer:
      "Dalibi repose sur Laravel 12 (PHP 8.3+), React 19 + Inertia.js et PostgreSQL 12+. Il faut Composer et Node.js/npm pour l’installation. Un déploiement Docker est également disponible.",
  },
];

export const FOOTER_COLUMNS = [
  {
    title: "Produit",
    links: [
      { label: "Fonctionnalités", href: "/fonctionnalites" },
      { label: "Tarifs", href: "/tarifs" },
      { label: "Sécurité", href: "/#securite" },
      { label: "Open source", href: "/#open-source" },
    ],
  },
  {
    title: "Pour qui",
    links: [
      { label: "Direction", href: "/#pour-qui" },
      { label: "Enseignants", href: "/#pour-qui" },
      { label: "Parents & élèves", href: "/#pour-qui" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Documentation", href: "/documentation" },
      { label: "FAQ", href: `${SITE_URL}/faq` },
      { label: "Contact", href: "/contact" },
      { label: "API Reference", href: "/documentation#api" },
      { label: "GitHub", href: GITHUB_URL },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Licence GPL v3", href: "/documentation#licence" },
      // Le site actuel n’a pas de section dédiée : renvoi vers la section la plus proche
      { label: "Confidentialité", href: "/documentation#securite" },
    ],
  },
];

/* ---------- Page Fonctionnalités ---------- */

export const FEATURE_CHAPTERS = [
  {
    id: "pilotage",
    eyebrow: "Pilotage",
    title: "Pilotez votre école en temps réel",
    accent: ["temps", "réel"],
    intro: "Un tableau de bord clair qui réunit l’essentiel : décidez vite, sur des données fiables.",
    points: [
      "Indicateurs clés en un coup d’œil : effectifs, inscriptions, encaissements",
      "Évolution des paiements mois par mois et derniers règlements",
      "Alertes automatiques sur les élèves en retard de paiement",
      "Contenu et statistiques adaptés au rôle de chaque utilisateur",
      "Filtrage par année académique",
    ],
  },
  {
    id: "statistiques",
    eyebrow: "Statistiques & pilotage",
    title: "Décidez avec des statistiques, pas à l’aveugle",
    accent: ["statistiques,"],
    intro: "Un menu Statistiques complet, filtrable et exportable, aligné sur les indicateurs de l’annuaire statistique (MEPSTA).",
    points: [
      "Parité (IPS), redoublement, abandon et sur-âge (retard scolaire)",
      "Recouvrement de l’écolage et répartition Mobile Money",
      "Réussite interne et examens officiels (CEPD, BEPC, BAC)",
      "Ratio élèves/enseignant, assiduité et absentéisme",
      "Comparaisons pluriannuelles et origine par préfecture",
      "Export PDF (en-tête d’école) et Excel de chaque section",
    ],
  },
  {
    id: "pedagogie",
    eyebrow: "Pédagogie",
    title: "Notes, bulletins et examens, sans effort",
    accent: ["sans", "effort"],
    intro: "De la saisie des notes au bulletin officiel, Dalibi automatise toute la chaîne pédagogique.",
    points: [
      "Saisie des notes par trimestre ou semestre, selon le type de classe",
      "Moyennes pondérées par coefficients, mentions et seuils paramétrables",
      "Bulletins PDF fidèles au format togolais, configurables (colonnes, groupes)",
      "Modèles d’évaluation déployés vers les classes, planning et export PDF",
      "Examens officiels (CEPD, BEPC, Baccalauréat) : inscriptions et résultats",
      "Réclamations sur les notes et suivi des performances",
    ],
  },
  {
    id: "finances",
    eyebrow: "Finances",
    title: "Une trésorerie maîtrisée, des paiements fiables",
    accent: ["paiements", "fiables"],
    intro: "Structurez les frais, encaissez en toute sécurité et gardez une vision nette de vos finances.",
    points: [
      "Structures de frais par catégorie, classe et année académique",
      "Tranches de paiement (échéancier) contrôlées côté serveur",
      "Reçus numérotés à code-barres avec vérification anti-falsification",
      "Caisses, bourses, journal des transactions et situation par classe",
      "Réplication des frais d’une année à l’autre, sans doublons",
      "Garde-fou anti trop-perçu et alertes impayés",
    ],
  },
  {
    id: "familles",
    eyebrow: "Familles",
    title: "Un portail dédié aux parents et aux élèves",
    accent: ["parents", "élèves"],
    intro: "Impliquez les familles : elles suivent la scolarité en toute autonomie, en toute sécurité.",
    points: [
      "Accès aux notes, bulletins PDF, présences, scolarité et calendrier",
      "Comptes tuteurs créés par invitation e-mail, élèves connectés par matricule",
      "Isolation stricte : un tuteur ne voit que ses enfants",
      "API REST sécurisée par token, prête pour une application mobile",
    ],
  },
  {
    id: "securite",
    eyebrow: "Sécurité",
    title: "Gouverné par les permissions, sécurisé par conception",
    accent: ["permissions,"],
    intro: "Des données scolaires sensibles méritent une défense en profondeur, du menu à la base.",
    points: [
      "5 rôles préconfigurés et permissions fines par module",
      "Authentification à deux facteurs (2FA)",
      "Fichiers sensibles privés, servis via des routes authentifiées",
      "Journal d’audit des actions sensibles",
      "Limitation des tentatives de connexion",
    ],
  },
] as const;

export const COVERAGE = [
  { title: "Statistiques & pilotage", points: ["7 tableaux : parité, réussite, finances…", "Filtres année / classe / sexe", "Export PDF & Excel"] },
  { title: "Élèves & inscriptions", points: ["Fiche complète avec photo et dossier privé", "Import CSV en masse", "Promotion & réaffectation de classe", "Effectifs et listes en PDF"] },
  { title: "Établissements", points: ["Multi-écoles (primaire, collège, lycée)", "Paramétrage, logo et devise", "Années, périodes et types de classes"] },
  { title: "Emploi du temps", points: ["Grille hebdomadaire par classe", "Créneaux (matière, enseignant)", "Export PDF imprimable"] },
  { title: "Présences", points: ["Appel par classe, date et séance", "Statuts présent / absent / retard / excusé", "Actions groupées, saisie idempotente"] },
  { title: "Permissions d’absence", points: ["Demandes avec motif et justification", "Validation par le directeur ou l’admin", "Auto-excusement des absences couvertes"] },
  { title: "Statistiques de présence", points: ["Taux d’absence par élève", "Résumé journalier par séance", "Tableau de bord par classe et période"] },
  { title: "Documents officiels", points: ["Modèles PDF personnalisables", "Éditeur d’en-tête glisser-déposer + filigrane", "Code-barres de vérification anti-falsification"] },
  { title: "Archives documentaires", points: ["Tout document avec référence automatique", "Tags colorés et filtrage multi-tags", "Corbeille, rétention et liaison élève/classe"] },
  { title: "Calendrier académique", points: ["Événements de l’année active", "Vue par type d’événement", "Partagé sur le portail des familles"] },
  { title: "Stockage des fichiers", points: ["Local ou cloud S3 / R2 / MinIO", "Bascule sans redéploiement", "Disque privé pour les fichiers sensibles"] },
  { title: "Sauvegardes & restauration", points: ["Export JSON et SQL", "Planification et rétention automatiques", "Restauration depuis l’interface"] },
  { title: "Déploiement & open source", points: ["Laravel 12, PostgreSQL, Docker", "Auto-hébergé, données souveraines", "Open source sous licence GPL v3"] },
];

export const FEATURE_SECTIONS = [
  ...FEATURE_CHAPTERS.map((c) => ({ id: c.id as string, label: c.eyebrow as string })),
  { id: "couverture", label: "Et bien plus encore" },
];

/* ---------- Page Tarifs ---------- */

export const FREE_POINTS = [
  "Code source ouvert, auditable et librement réutilisable",
  "Tous les modules inclus, sans limite d’élèves ni d’établissements",
  "Auto-hébergeable : vos données restent chez vous",
  "Aucun frais de licence, aujourd’hui comme demain",
];

export const PLANS = {
  self: {
    title: "Auto-déploiement",
    subtitle: "Vous installez et configurez vous-même",
    price: "Gratuit",
    points: [
      "Code source complet sur GitHub",
      "Documentation d’installation et déploiement Docker",
      "Réalisable par tout développeur / ingénieur maîtrisant Laravel & PostgreSQL",
      "Support communautaire (issues, contributions)",
    ],
  },
  support: {
    title: "Accompagnement",
    subtitle: "Nous déployons et configurons pour vous",
    price: "Sur devis",
    points: [
      "Installation et mise en production",
      "Configuration : frais, classes, rôles, années académiques",
      "Migration de vos données existantes",
      "Formation des équipes (direction, secrétariat, enseignants)",
      "Support prioritaire de lancement",
    ],
  },
};

/** `true` : inclus, sinon le libellé à afficher. */
export const COMPARISON: { label: string; self: string | true; support: string | true }[] = [
  { label: "Tous les modules, sans limite", self: true, support: true },
  { label: "Code source complet", self: true, support: true },
  { label: "Frais de licence", self: "Aucun", support: "Aucun" },
  { label: "Installation et mise en production", self: "Par vos équipes", support: "Par notre équipe" },
  { label: "Configuration", self: "Par vos équipes", support: "Par notre équipe" },
  { label: "Migration des données", self: "Par vos équipes", support: true },
  { label: "Formation des équipes", self: "Non incluse", support: true },
  { label: "Support", self: "Communautaire", support: "Prioritaire au lancement" },
];

export const PRICING_SECTIONS = [
  { id: "libre", label: "Un logiciel libre" },
  { id: "demarrer", label: "Deux façons de démarrer" },
  { id: "comparatif", label: "Comparatif" },
  { id: "questions", label: "Questions" },
];
