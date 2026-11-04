// ─────────────────────────────────────────────────────────────
//  Source unique du contenu du site.
//  Sources : CV « Stanley_JOMIE_CV » (septembre 2026) et, pour le projet phare,
//  le prototype « Flight Arbitrator » du mémoire de fin d'études.
//  Modifiez ce fichier pour mettre à jour le site.
// ─────────────────────────────────────────────────────────────

const base = import.meta.env.BASE_URL
// En mode « artifact » (page hébergée en bac à sable), les téléchargements directs sont bloqués :
// le CV s'ouvre alors dans un nouvel onglet.
export const isSandboxed = import.meta.env.VITE_SANDBOX === '1'

export const profile = {
  firstName: 'Stanley',
  lastName: 'Jomie',
  title: 'Business Analyst — Data & Finance',
  subtitle: 'MSc AI Applied to Business · Eugenia School',
  tagline:
    "Je mets la donnée, le Machine Learning et l'analyse financière au service des décisions du transport aérien.",
  // Photo principale de la homepage. Déposez votre fichier dans /public/images/.
  portrait: `${base}images/portrait.webp`,
  // true si la photo est détourée (PNG à fond transparent) : désactive le fondu radial.
  portraitCutout: true,
  cv: `${base}cv/Stanley_JOMIE_CV.pdf`,
  location: 'Paris, France',
  email: 'stanley.jomie971@gmail.com',
  phone: '+33 6 24 08 75 45',
  phoneHref: 'tel:+33624087545',
  linkedin: 'https://www.linkedin.com/in/stanley-jomie/',
  linkedinLabel: 'linkedin.com/in/stanley-jomie',
}

export const cvLinkProps = isSandboxed
  ? { target: '_blank', rel: 'noreferrer' }
  : { download: 'Stanley_JOMIE_CV.pdf' }

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export const about = {
  intro:
    "Cinq années d'alternance au cœur de deux compagnies aériennes m'ont appris à relier la donnée aux décisions qui font voler un réseau : budget, revenus, coûts opérationnels et performance commerciale.",
  paragraphs: [
    "Chez Air France-KLM, au sein de l'AMOA Finance, je traite et réconcilie les données financières consolidées du groupe, suis le chiffre d'affaires et le budget prévisionnel à N+2, et j'ai conçu un modèle de Machine Learning qui prédit les coûts d'annulation de vols pour éclairer les décisions de délestage.",
    "Auparavant, chez Air Caraïbes, rattaché au Directeur Général Délégué, j'ai piloté le reporting mensuel Power BI, la commercialisation B2B de l'offre Flexil Pro et les opérations commerciales estivales — une immersion complète dans la réalité commerciale d'une compagnie.",
    "Mon MSc AI Applied to Business à Eugenia School et l'Executive Program de HEC Paris en finance d'entreprise internationale complètent ce double ancrage : technique et business.",
  ],
  pillars: [
    { label: 'Data Science', text: 'Python, SQL, Machine Learning, Dataiku' },
    { label: 'Finance', text: 'Budget, forecast, IFRS 18, SAP BPC / BW' },
    { label: 'Aérien', text: 'Air France-KLM · Air Caraïbes · French Bee' },
  ],
}

export const education = [
  {
    period: '2024 — 2026',
    school: 'Eugenia School',
    place: 'Paris',
    degree: 'MSc AI Applied to Business',
    detail: 'Business Analytics, Data Viz, CRM, NoCode, Marketing Analytics',
  },
  {
    period: '2023 — 2025',
    school: 'HEC Paris',
    place: 'Jouy-en-Josas',
    degree: 'Executive Program',
    detail: 'Strategy & International Corporate Finance',
  },
  {
    period: '2021 — 2024',
    school: 'PPA Business School',
    place: 'Paris',
    degree: 'Bachelor Management Commercial',
    detail: 'Techniques de vente, Négociation, Macroéconomie, Comptabilité',
  },
  {
    period: '2020 — 2021',
    school: 'Université des Antilles',
    place: 'Guadeloupe',
    degree: 'P.A.S.S (Médecine)',
    detail: 'Mineure Science Politique',
  },
]

export const associative = [
  { org: 'J.A. Guadeloupe', role: 'Chef de patrouille', period: '2016 — 2021', note: 'Club paramilitaire proche du scoutisme' },
  { org: 'Arsenal Football Club', role: 'U-17 · Milieu offensif', period: '2016', note: '' },
]

export const interests = ['Éloquence', 'Théâtre', 'Football', 'Art sartorial']

export const experiences = [
  {
    code: 'AF-KLM',
    company: 'Air France-KLM',
    role: 'Business Analyst AMOA Finance',
    contract: 'Alternance · 2 ans',
    period: 'Sep 2024 — Sep 2026',
    location: 'Groupe Air France-KLM',
    missions: [
      {
        title: 'Analyse de données',
        text: "Traitement et réconciliation des données financières consolidées du groupe pour les clôtures budgétaires et le suivi du chiffre d'affaires / budget prévisionnel à N+2.",
      },
      {
        title: 'Modélisation prédictive',
        text: "Conception d'un modèle de Machine Learning prédisant les coûts d'annulation de vols, pour éclairer les décisions de délestage — plusieurs heures de traitement gagnées chaque mois.",
      },
      {
        title: 'Data management',
        text: 'Ingestion des données IFRS 18 et contrôles de cohérence (Forecast, Budget, Update).',
      },
      {
        title: 'Coordination projet',
        text: 'Interface entre les équipes IT et Contrôle de Gestion pour la migration S/4HANA (spécifications fonctionnelles multi-onglets).',
      },
      {
        title: 'Transmission',
        text: "Animation d'ateliers de formation aux outils d'analyse financière pour les équipes métier.",
      },
    ],
    stack: ['SAP BPC', 'SAP BW', 'Power BI', 'AFO', 'Machine Learning', 'S/4HANA', 'IFRS 18'],
  },
  {
    code: 'TX',
    company: 'Air Caraïbes',
    role: 'Business Analyst',
    contract: 'Alternance · 3 ans',
    period: 'Jul 2021 — Sep 2024',
    location: 'Rattaché au Directeur Général Délégué',
    missions: [
      {
        title: 'Analyse & reporting',
        text: "Construction et pilotage du cycle de reporting mensuel Power BI, analyse des tendances de performance des agences de voyages et des clients entreprises.",
      },
      {
        title: 'Responsabilité commerciale',
        text: "Commercialisation du produit Flexil Pro (Air Caraïbes / French Bee) en France, en Europe et aux États-Unis (B2B).",
      },
      {
        title: 'Management',
        text: 'Pilotage des opérations commerciales estivales 2022 et 2023 — 29 collaborateurs sur 3 zones géographiques.',
      },
      {
        title: 'Partenariats',
        text: "Gestion des partenariats diplomatiques (Consulats, Assemblée nationale, Sénat) et du portefeuille associatif France-Europe.",
      },
      {
        title: 'Représentation',
        text: 'Salons, workshops, webconférences, événements partenaires et interviews médias (BFM, télévisions locales).',
      },
    ],
    stack: ['Power BI', 'B2B', 'Management', 'Partenariats', 'Relations médias'],
  },
]

// Projets : chacun correspond à une réalisation décrite dans le CV.
export const projects = [
  {
    id: 'cancellation-cost',
    index: '01',
    featured: true,
    category: 'Data Science aéronautique · Machine Learning',
    tags: ['Machine Learning', 'Coûts opérationnels', 'Opérations aériennes'],
    title: "Prédiction des coûts d'annulation de vols",
    company: 'Air France-KLM',
    period: '2024 — 2026',
    summary:
      "Un modèle de Machine Learning qui anticipe le coût d'une annulation de vol pour éclairer les décisions de délestage.",
    context:
      "Lorsqu'une compagnie doit délester des vols, chaque annulation a un coût. Disposer rapidement d'une estimation fiable permet d'arbitrer entre plusieurs scénarios.",
    role:
      "Conception du modèle de Machine Learning prédisant les coûts d'annulation de vols, utilisé pour éclairer les décisions de délestage.",
    impact: "Plusieurs heures de traitement économisées chaque mois et une aide directe à la décision de délestage.",
    stack: ['Machine Learning', 'Random Forest', 'Validation croisée', 'SHAP', 'IA agentique'],
    demo: {
      name: 'Flight Arbitrator',
      label: "Prototype du mémoire de fin d'études",
      src: `${base}demos/flight-arbitrator/index.html`,
      preview: `${base}demos/flight-arbitrator/preview.webp`,
      description:
        "Le tableau de bord imaginé pour mettre le modèle entre les mains des équipes : explorer le réseau long-courrier, lire la décomposition prédictive du coût d'une annulation et arbitrer entre deux vols à délester.",
      features: [
        'Globe 3D du réseau long-courrier au départ de CDG',
        "Décomposition prédictive des coûts d'irrégularité par vol",
        'Arbitrage de délestage entre deux vols, avec fiche d’analyse de ligne',
        'Analyses du réseau, méthodologie du modèle et ROI',
      ],
      metrics: [
        { k: 'R² · validation croisée 5 plis', v: '0,705' },
        { k: 'Erreur absolue moyenne', v: '12 916 €' },
        { k: 'Annulations à coût observé', v: '321' },
      ],
      note: 'Prototype académique, outil non officiel. Coûts affichés : estimations calibrées, non consolidées.',
    },
  },
  {
    id: 'n2-budget',
    index: '02',
    category: 'Finance · Prévision',
    tags: ['Finance', 'Prévision', 'Données consolidées'],
    title: "Suivi du chiffre d'affaires et du budget à N+2",
    company: 'Air France-KLM',
    period: '2024 — 2026',
    summary:
      "Traitement et réconciliation des données financières consolidées du groupe pour les clôtures budgétaires et le suivi prévisionnel à N+2.",
    context:
      "À l'échelle d'un groupe comme Air France-KLM, les cycles de clôture budgétaire reposent sur des données consolidées issues de multiples sources, qui doivent être fiables et réconciliées.",
    role:
      "Traitement, réconciliation et suivi des données de chiffre d'affaires et de budget prévisionnel N+2 dans l'écosystème SAP et Power BI.",
    impact: 'Des données consolidées fiables pour les cycles de clôture budgétaire du groupe.',
    stack: ['SAP BPC', 'SAP BW', 'Power BI', 'AFO'],
  },
  {
    id: 'ifrs18',
    index: '03',
    category: 'Finance · Data management',
    tags: ['Finance', 'Qualité des données'],
    title: 'Ingestion IFRS 18 & contrôles de cohérence',
    company: 'Air France-KLM',
    period: '2024 — 2026',
    summary: 'Ingestion des données IFRS 18 et contrôles de cohérence sur les versions Forecast, Budget et Update.',
    context:
      "La norme IFRS 18 fait évoluer la présentation des états financiers : les données doivent être intégrées et contrôlées sur chaque version de planification.",
    role: 'Ingestion des données IFRS 18 et mise en place des contrôles de cohérence entre Forecast, Budget et Update.',
    impact: 'Des versions de planification cohérentes et contrôlées sous le nouveau référentiel.',
    stack: ['IFRS 18', 'SAP BPC', 'Contrôles de cohérence'],
  },
  {
    id: 's4hana',
    index: '04',
    category: 'Finance · Transformation SI',
    tags: ['Finance', 'Gestion de projet'],
    title: 'Migration S/4HANA',
    company: 'Air France-KLM',
    period: '2024 — 2026',
    summary: "Interface entre l'IT et le Contrôle de Gestion pour la migration S/4HANA.",
    context:
      "Une migration S/4HANA impose de traduire précisément les besoins du Contrôle de Gestion en exigences techniques.",
    role: "Rédaction de spécifications fonctionnelles multi-onglets et coordination entre les équipes IT et Contrôle de Gestion. Animation d'ateliers de formation aux outils d'analyse financière.",
    impact: 'Un langage commun entre métier et IT, et des équipes métier formées à leurs outils.',
    stack: ['S/4HANA', 'Spécifications fonctionnelles', 'Formation'],
  },
  {
    id: 'powerbi-reporting',
    index: '05',
    category: 'Commercial · Business Intelligence',
    tags: ['Commercial', 'Reporting'],
    title: 'Reporting commercial mensuel Power BI',
    company: 'Air Caraïbes',
    period: '2021 — 2024',
    summary:
      "Construction et pilotage du reporting mensuel analysant la performance des agences de voyages et des clients entreprises.",
    context:
      "Pour piloter la distribution, la direction a besoin d'une lecture mensuelle claire de la performance par canal : agences de voyages et clients entreprises.",
    role: 'Construction du cycle de reporting Power BI, analyse des tendances et restitution auprès du Directeur Général Délégué.',
    impact: 'Un rendez-vous mensuel de pilotage de la performance commerciale.',
    stack: ['Power BI', 'Analyse de performance'],
  },
  {
    id: 'flexil-pro',
    index: '06',
    category: 'Commercial · B2B',
    tags: ['Commercial', 'B2B'],
    title: 'Commercialisation de Flexil Pro',
    company: 'Air Caraïbes / French Bee',
    period: '2021 — 2024',
    summary: "Commercialisation de l'offre corporate Flexil Pro en France, en Europe et aux États-Unis.",
    context:
      "Flexil Pro est l'offre destinée aux entreprises d'Air Caraïbes et French Bee, sur les marchés France-Europe et USA.",
    role: "Responsabilité de la commercialisation B2B, représentation de la compagnie lors de salons, workshops et événements partenaires.",
    impact: "Le développement d'un portefeuille corporate sur trois marchés.",
    stack: ['Vente B2B', 'Négociation', 'Événementiel'],
  },
  {
    id: 'summer-ops',
    index: '07',
    category: 'Opérations · Management',
    tags: ['Opérations aériennes', 'Management'],
    title: 'Opérations commerciales estivales 2022 & 2023',
    company: 'Air Caraïbes',
    period: '2022 — 2023',
    summary: "Pilotage de l'opération estivale pour l'ensemble de la compagnie — 29 collaborateurs sur 3 zones.",
    context:
      "L'été concentre une part décisive de l'activité : la coordination commerciale doit être irréprochable sur plusieurs territoires.",
    role: "Pilotage de l'opération et management de 29 collaborateurs répartis sur 3 zones géographiques.",
    impact: 'Deux saisons estivales consécutives pilotées.',
    stack: ['Management', 'Coordination multi-sites'],
  },
]

export const projectFilters = ['Tous', 'Machine Learning', 'Opérations aériennes', 'Finance', 'Commercial']

export const skills = [
  {
    code: 'DATA',
    title: 'Data Science & IA',
    items: ['Python', 'SQL', 'Machine Learning', 'Dataiku', 'RAG', 'IA agentique'],
  },
  {
    code: 'BI',
    title: 'Business Intelligence',
    items: ['Power BI', 'Tableau', 'Data Visualisation', 'Business Analytics', 'Marketing Analytics'],
  },
  {
    code: 'FIN',
    title: 'Finance & systèmes',
    items: ['SAP BPC', 'SAP BW', 'AFO', 'S/4HANA', 'IFRS 18', 'Corporate Finance'],
  },
  {
    code: 'AUTO',
    title: 'Automatisation & NoCode',
    items: ['n8n', 'Make', 'NoCode', 'CRM'],
  },
  {
    code: 'BIZ',
    title: 'Business & leadership',
    items: ['Vente B2B', 'Négociation', 'Management d’équipe', 'Partenariats', 'Prise de parole'],
  },
]

export const languages = [
  { name: 'Français', level: 'Natif', value: 6 },
  { name: 'Créole', level: 'Natif', value: 6 },
  { name: 'Anglais', level: 'B2', value: 4 },
]
