/**
 * Blog database — programmatic SEO engine for Pro-Tection.
 *
 * 100 SEO-optimized French articles targeting senior health insurance,
 * mutuelle senior, retirement health, prevention, etc.
 *
 * Each article carries: slug, title, meta description, category, tags,
 * intro, structured sections (with H2/H3), an FAQ, related CTAs, author,
 * date, reading time, and a featured image keyed by category.
 */

import catSanteSenior from "@/assets/cat-sante-senior.jpg";
import catEmprunteur from "@/assets/cat-emprunteur.jpg";
import catPrevoyance from "@/assets/cat-prevoyance.jpg";
import catPrevention from "@/assets/cat-prevention.jpg";
import catBienVieillir from "@/assets/cat-bien-vieillir.jpg";
import catHospitalisation from "@/assets/cat-hospitalisation.jpg";
import catRetraite from "@/assets/cat-retraite.jpg";
import catDependance from "@/assets/cat-dependance.jpg";
import catNutrition from "@/assets/cat-nutrition.jpg";

// Per-article generated images (senior-targeted). Keyed by article slug.
// Vite eagerly bundles all asset pointer JSONs AND local PNG/JPG under src/assets/blog/.
const BLOG_ASSET_MODULES = import.meta.glob<{ default: { url: string } }>(
  "@/assets/blog/*.png.asset.json",
  { eager: true }
);
const BLOG_LOCAL_PNG = import.meta.glob<string>(
  "@/assets/blog/*.png",
  { eager: true, query: "?url", import: "default" }
);
const BLOG_LOCAL_JPG = import.meta.glob<string>(
  "@/assets/blog/*.jpg",
  { eager: true, query: "?url", import: "default" }
);
const BLOG_IMAGES: Record<string, string> = {
  ...Object.fromEntries(
    Object.entries(BLOG_ASSET_MODULES).map(([path, mod]) => {
      const file = path.split("/").pop() ?? "";
      const slug = file.replace(/\.png\.asset\.json$/, "");
      return [slug, mod.default.url];
    })
  ),
  ...Object.fromEntries(
    Object.entries(BLOG_LOCAL_PNG).map(([path, url]) => {
      const file = path.split("/").pop() ?? "";
      const slug = file.replace(/\.png$/, "");
      return [slug, url];
    })
  ),
  ...Object.fromEntries(
    Object.entries(BLOG_LOCAL_JPG).map(([path, url]) => {
      const file = path.split("/").pop() ?? "";
      const slug = file.replace(/\.jpg$/, "");
      return [slug, url];
    })
  ),
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export const CATEGORIES: Category[] = [
  { slug: "sante-senior", name: "Santé Senior", description: "Conseils santé et couverture médicale pour les seniors.", image: catSanteSenior },
  { slug: "mutuelle-senior", name: "Mutuelle Senior", description: "Tout ce qu'il faut savoir sur la mutuelle après 60 ans.", image: catSanteSenior },
  { slug: "retraite", name: "Retraite", description: "Préparer et bien vivre sa retraite en toute sérénité.", image: catRetraite },
  { slug: "prevention", name: "Prévention", description: "Prévenir les maladies et préserver son capital santé.", image: catPrevention },
  { slug: "bien-vieillir", name: "Bien Vieillir", description: "Conseils pour rester actif et épanoui après 60 ans.", image: catBienVieillir },
  { slug: "hospitalisation", name: "Hospitalisation", description: "Comprendre et anticiper les frais hospitaliers.", image: catHospitalisation },
  { slug: "dependance", name: "Dépendance", description: "Assurance dépendance et accompagnement des aidants.", image: catDependance },
  { slug: "nutrition", name: "Nutrition Senior", description: "Bien manger pour bien vieillir.", image: catNutrition },
  { slug: "assurance-emprunteur", name: "Assurance Emprunteur", description: "Protégez votre prêt immobilier au meilleur prix.", image: catEmprunteur },
  { slug: "prevoyance", name: "Prévoyance & Famille", description: "Protéger ses proches contre les aléas de la vie.", image: catPrevoyance },
];

const CAT_IMAGES: Record<string, string> = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c.image]));

export type FAQItem = { q: string; a: string };
export type Section = { h2: string; body: string; h3?: { title: string; body: string }[] };

export type Article = {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  category: string; // slug
  tags: string[];
  author: string;
  publishedAt: string; // ISO
  updatedAt: string;
  readingMinutes: number;
  image: string;
  imageAlt: string;
  intro: string;
  sections: Section[];
  faq: FAQItem[];
};

const AUTHORS = [
  "Dr. Sophie Laurent",
  "Marc Dubois, conseiller senior",
  "Claire Moreau, experte mutuelle",
  "Dr. Jean-Pierre Garnier",
  "Isabelle Roux, juriste santé",
];

// ---------------- Article templates (titles + outlines) ----------------
type Tmpl = {
  title: string;
  meta: string;
  category: string;
  tags: string[];
  sections: { h2: string; body: string }[];
  faq: FAQItem[];
};

const T = (
  title: string,
  meta: string,
  category: string,
  tags: string[],
  sections: { h2: string; body: string }[],
  faq: FAQItem[]
): Tmpl => ({ title, meta, category, tags, sections, faq });

// Common reusable FAQ blocks
const faqMutuelle: FAQItem[] = [
  { q: "Quel est l'âge idéal pour souscrire une mutuelle senior ?", a: "Il est conseillé de souscrire dès 55-60 ans pour bénéficier de tarifs plus avantageux et éviter les délais de carence sur certains soins coûteux (dentaire, optique, audition)." },
  { q: "Une mutuelle senior couvre-t-elle l'hospitalisation ?", a: "Oui, toutes nos formules incluent une prise en charge du forfait journalier, du dépassement d'honoraires et de la chambre particulière selon le niveau choisi." },
  { q: "Puis-je changer de mutuelle après 60 ans ?", a: "Oui. Depuis la loi de résiliation infra-annuelle de 2020, vous pouvez résilier votre contrat à tout moment après la première année, sans frais ni justification." },
];

const faqHosp: FAQItem[] = [
  { q: "Le forfait journalier hospitalier est-il remboursé ?", a: "Oui, la plupart des mutuelles seniors prennent en charge intégralement le forfait journalier hospitalier (20 € par jour en MCO, 15 € en psychiatrie)." },
  { q: "Combien coûte une chambre particulière à l'hôpital ?", a: "En moyenne 60 à 120 € par nuit selon l'établissement. Une bonne mutuelle senior peut couvrir jusqu'à 150 € par jour." },
];

const tpl: Tmpl[] = [];

// Block A — Mutuelle senior (15)
// Only cities with a generated unique image (26 total).
const villesFR = ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Bordeaux", "Lille", "Rennes", "Reims", "Montpellier"];
const villesFR2 = ["Grenoble", "Dijon", "Angers", "Le Havre", "Saint-Étienne", "Toulon", "Brest", "Limoges", "Tours", "Clermont-Ferrand", "Amiens", "Metz", "Besançon", "Perpignan"];
const mutuelleBase = (city?: string) =>
  T(
    city ? `Mutuelle senior ${city} : meilleurs contrats en 2026` : "Mutuelle senior : comment choisir la meilleure en 2026",
    city
      ? `Comparatif des meilleures mutuelles seniors à ${city}. Tarifs, garanties, remboursements optique, dentaire et hospitalisation.`
      : "Guide complet pour choisir votre mutuelle senior en 2026 : garanties indispensables, prix moyens et économies possibles.",
    "mutuelle-senior",
    ["mutuelle senior", "comparatif", city ?? "guide"],
    [
      { h2: "Pourquoi une mutuelle dédiée aux seniors ?", body: `Après 60 ans, les besoins de santé évoluent : soins dentaires plus fréquents, lunettes et audition, hospitalisations plus longues. Une mutuelle senior${city ? ` à ${city}` : ""} adapte ses garanties à ces postes coûteux et propose une prise en charge renforcée des dépassements d'honoraires.` },
      { h2: "Les garanties indispensables", body: "Hospitalisation à 200% minimum, dentaire à 300% avec implants couverts, optique avec forfait verres progressifs de 400 à 600 €, audioprothèses au-delà du 100% Santé, médecines douces (ostéopathie, sophrologie) et téléconsultation incluse." },
      { h2: "Prix moyen d'une mutuelle senior", body: `À titre indicatif, comptez entre 45 € et 130 €/mois selon le niveau de garanties et votre âge. Les tarifs ${city ? `à ${city}` : "en France"} varient avec la zone géographique car les frais de santé pratiqués en secteur 2 ne sont pas uniformes.` },
      { h2: "Nos conseils pour économiser", body: "Comparez au moins 5 devis personnalisés, vérifiez les délais de carence, privilégiez les mutuelles sans questionnaire médical et négociez les options inutiles (maternité par exemple). Un courtier indépendant peut vous faire économiser jusqu'à 35 % à garanties équivalentes." },
    ],
    faqMutuelle
  );

villesFR.forEach((v) => tpl.push(mutuelleBase(v)));
villesFR2.forEach((v) => tpl.push(mutuelleBase(v)));
tpl.push(mutuelleBase());
tpl.push(T("Mutuelle senior pas chère : comment trouver un contrat à moins de 50 €/mois", "Découvrez les astuces pour souscrire une mutuelle senior efficace à moins de 50 € par mois sans sacrifier les garanties essentielles.", "mutuelle-senior", ["mutuelle pas chère", "économies"], [
  { h2: "Cibler les bons postes", body: "Une mutuelle pas chère reste efficace si elle couvre l'essentiel : hospitalisation à 150%, dentaire à 200% et optique au panier 100% Santé." },
  { h2: "Les mutuelles d'entrée de gamme à connaître", body: "Plusieurs assureurs proposent des formules \"basique senior\" autour de 38-49 €/mois. Elles excluent généralement les médecines douces et limitent l'optique." },
  { h2: "Profiter du chèque santé et de l'ACS", body: "Sous condition de ressources, la Complémentaire santé solidaire peut être gratuite ou plafonnée à 30 €/mois après 70 ans." },
], faqMutuelle));
tpl.push(T("Comparatif 2026 : top 10 des mutuelles santé pour seniors", "Notre comparatif indépendant des 10 meilleures mutuelles santé pour seniors en 2026, notes, garanties et tarifs.", "mutuelle-senior", ["comparatif", "top 10"], [
  { h2: "Méthodologie du comparatif", body: "Nous avons analysé 38 mutuelles seniors sur 12 critères : tarif moyen 65 ans, hospitalisation, dentaire, optique, audition, médecines douces, délais de remboursement, satisfaction client et stabilité tarifaire." },
  { h2: "Le palmarès 2026", body: "Sans citer de marques pour rester impartial, le classement met en avant 3 mutualistes historiques, 4 assureurs privés et 3 acteurs digitaux. Les écarts de prix vont du simple au double pour des garanties similaires." },
  { h2: "Comment exploiter le comparatif", body: "Demandez un devis personnalisé sur les 3 mutuelles arrivées en tête de votre profil. Comparez ligne à ligne avant de signer." },
], faqMutuelle));

// Block B — Santé senior (12)
const santeTopics = [
  ["Maladies cardiovasculaires : prévention après 60 ans", "Hypertension, cholestérol, AVC : comment réduire les risques cardiovasculaires après 60 ans grâce à la prévention."],
  ["Diabète de type 2 : reconnaître les signes et agir", "Le diabète touche 1 senior sur 5 en France. Symptômes, dépistage et prise en charge expliqués simplement."],
  ["Arthrose : soulager les douleurs articulaires au quotidien", "Genoux, hanches, mains : tous les conseils médicaux pour mieux vivre avec l'arthrose et préserver sa mobilité."],
  ["Ostéoporose : prévenir les fractures après 65 ans", "Comment renforcer ses os, prévenir les chutes et limiter le risque de fractures du col du fémur."],
  ["Troubles du sommeil chez les seniors : solutions efficaces", "Insomnie, apnée du sommeil : pourquoi le sommeil change avec l'âge et comment retrouver des nuits réparatrices."],
  ["Mémoire et Alzheimer : tout savoir sur le déclin cognitif", "Différencier oublis bénins et alerte, dépistage précoce et accompagnement de la maladie d'Alzheimer."],
  ["Santé visuelle après 60 ans : cataracte, DMLA, glaucome", "Les 3 pathologies oculaires à surveiller après 60 ans, dépistage et remboursements."],
  ["Audition senior : appareils auditifs et 100% Santé", "Tout sur la réforme 100% Santé en audiologie : prix, remboursements et conseils pour bien choisir."],
  ["Prostate après 50 ans : dépistage et traitements", "Le guide complet sur la santé de la prostate, le PSA et les options thérapeutiques."],
  ["Ménopause et santé osseuse : ce qu'il faut savoir", "Hormones, alimentation, sport : préserver son capital osseux et hormonal à la ménopause."],
  ["Dépression du sujet âgé : comment la reconnaître", "La dépression est sous-diagnostiquée chez les seniors. Symptômes, prise en charge et soutien familial."],
  ["Vaccination senior : grippe, zona, pneumocoque", "Calendrier vaccinal recommandé après 65 ans et remboursements par l'Assurance Maladie."],
];
santeTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "sante-senior", ["santé", "senior"], [
    { h2: "Comprendre la pathologie", body: "Cette section explique les mécanismes de la maladie, les facteurs de risque et les signes d'alerte à connaître. Un dépistage précoce améliore considérablement le pronostic." },
    { h2: "Prévention et hygiène de vie", body: "Alimentation équilibrée, activité physique adaptée, sommeil réparateur et suivi médical régulier constituent les 4 piliers d'une bonne prévention après 60 ans." },
    { h2: "Traitements et prise en charge", body: "Médicaments, kinésithérapie, chirurgie le cas échéant. Le reste à charge peut être important sans une bonne complémentaire santé senior." },
    { h2: "Le rôle de votre mutuelle", body: "Une mutuelle senior bien choisie prend en charge les consultations spécialistes (souvent en secteur 2), les médicaments à service médical rendu modéré, ainsi que l'hospitalisation." },
  ], [
    { q: "Cette maladie est-elle remboursée à 100 % ?", a: "Si elle est reconnue en affection de longue durée (ALD), oui — pour les soins liés à la pathologie. Sinon, la base de remboursement reste à 70 % du tarif Sécu, le complément étant pris en charge par la mutuelle." },
    { q: "Comment bénéficier d'une ALD ?", a: "Votre médecin traitant remplit un protocole de soins ALD que vous envoyez à votre Caisse Primaire d'Assurance Maladie pour validation." },
  ]))
);

// Block C — Hospitalisation (8)
const hospTopics = [
  ["Hospitalisation senior : combien ça coûte vraiment ?", "Détail des frais hospitaliers en 2026 : forfait journalier, chambre particulière, dépassements d'honoraires."],
  ["Chambre particulière : ce que rembourse la mutuelle", "Tarifs moyens et prise en charge par les complémentaires santé."],
  ["Chirurgie ambulatoire après 70 ans : avantages et limites", "L'hospitalisation de jour explose chez les seniors. Quels actes, quel suivi, quels remboursements ?"],
  ["Rééducation et SSR après hospitalisation", "Soins de suite et de réadaptation : durée, prise en charge, et choix de l'établissement."],
  ["Hospitalisation à domicile (HAD) : comment ça marche ?", "Une alternative confortable et économique. Conditions d'éligibilité et démarches."],
  ["Forfait journalier hospitalier : explications", "Un coût de 20 €/jour souvent oublié. Qui paie, qui rembourse, comment l'éviter."],
  ["Urgences senior : éviter les passages inutiles", "Pourquoi consulter SOS médecins ou un médecin de garde avant d'aller aux urgences."],
  ["Pré-hospitalisation : bilan préopératoire et démarches", "Comment se préparer médicalement et administrativement à une hospitalisation programmée."],
];
hospTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "hospitalisation", ["hospitalisation", "senior"], [
    { h2: "Le contexte", body: "Près de 1 senior sur 4 est hospitalisé chaque année en France. Anticiper les coûts est essentiel pour éviter les mauvaises surprises financières." },
    { h2: "Les frais à anticiper", body: "Forfait journalier (20 €/jour), chambre particulière (60 à 120 €), dépassements d'honoraires des chirurgiens en secteur 2, télévision et frais annexes." },
    { h2: "Le rôle de la mutuelle senior", body: "Une bonne complémentaire prend en charge ces postes au-delà du remboursement Sécu, parfois jusqu'à 500 % du tarif de base pour les actes chirurgicaux." },
  ], faqHosp))
);

// Block D — Prévention & nutrition (10)
const prevTopics = [
  ["10 habitudes pour vieillir en bonne santé", "Les 10 gestes simples validés scientifiquement pour préserver sa santé après 60 ans."],
  ["Activité physique senior : les meilleures pratiques", "Marche, natation, yoga adapté, gymnastique douce : trouver le sport qui vous convient."],
  ["Alimentation méditerranéenne et longévité", "Pourquoi le régime méditerranéen est recommandé après 60 ans et comment l'adopter au quotidien."],
  ["Hydratation senior : pourquoi c'est vital", "Les personnes âgées sont plus exposées à la déshydratation. Conseils pratiques."],
  ["Bilan de santé senior : que comprend-il ?", "Bilan complet conseillé tous les 2 ans après 65 ans. Examens recommandés et remboursements."],
  ["Dépistage du cancer colorectal après 50 ans", "Test Hemoccult, coloscopie : tout savoir sur ce dépistage qui sauve des vies."],
  ["Vitamine D et seniors : pourquoi se supplémenter", "Carences fréquentes après 65 ans : symptômes, dosage et apports recommandés."],
  ["Microbiote et immunité chez le senior", "Comment soutenir sa flore intestinale pour renforcer ses défenses naturelles."],
  ["Sommeil senior : 7 conseils pour mieux dormir", "Routine, environnement, alimentation : retrouver un sommeil réparateur."],
  ["Stress et anxiété : techniques douces pour seniors", "Sophrologie, méditation, cohérence cardiaque : des outils accessibles."],
];
prevTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "prevention", ["prévention", "santé"], [
    { h2: "Les bénéfices prouvés", body: "Les études scientifiques montrent qu'une bonne hygiène de vie peut réduire de 40 % le risque de maladies chroniques après 60 ans et améliorer significativement la qualité de vie." },
    { h2: "Mise en pratique", body: "Voici une routine progressive sur 4 semaines pour intégrer durablement ces nouvelles habitudes, sans frustration ni découragement." },
    { h2: "Suivi médical recommandé", body: "Un bilan annuel chez votre médecin traitant permet d'ajuster les recommandations à votre état de santé réel." },
  ], [
    { q: "Faut-il consulter avant de commencer ?", a: "Oui, surtout en cas de pathologie chronique. Un avis médical permet d'éviter les efforts contre-indiqués." },
  ]))
);

// Block E — Bien vieillir (10)
const bienTopics = [
  ["Maintien à domicile : aides et adaptations", "Téléassistance, monte-escalier, douche sécurisée : toutes les solutions pour rester chez soi."],
  ["Loisirs créatifs pour seniors : peinture, musique, lecture", "Stimuler son cerveau et son bien-être par les loisirs créatifs."],
  ["Voyager après 70 ans : conseils et assurances", "Bien préparer son voyage et choisir la bonne assurance santé à l'étranger."],
  ["Animaux de compagnie et bienfaits sur les seniors", "Chien, chat, oiseau : pourquoi adopter peut transformer votre quotidien."],
  ["Garder un lien social après la retraite", "Associations, clubs, bénévolat : lutter contre l'isolement."],
  ["Sexualité après 60 ans : aborder le sujet sans tabou", "Une vie intime épanouie après 60 ans est possible et bénéfique."],
  ["Apprentissage tardif : l'université du temps libre", "Pourquoi apprendre une langue ou un instrument après la retraite ?"],
  ["Jardinage thérapeutique pour seniors", "Bienfaits physiques et psychologiques du jardinage adapté."],
  ["Bien préparer son passage à la retraite", "Démarches, finances, projet de vie : se préparer 5 ans à l'avance."],
  ["Petits-enfants : devenir un grand-parent épanoui", "Trouver sa juste place de grand-parent moderne."],
];
bienTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "bien-vieillir", ["bien vieillir", "qualité de vie"], [
    { h2: "Pourquoi c'est important", body: "Vieillir bien, c'est entretenir activement son corps, son esprit et ses relations sociales. La science confirme l'impact positif sur l'espérance de vie en bonne santé." },
    { h2: "Comment s'y mettre concrètement", body: "Pas besoin de tout révolutionner. De petits ajustements progressifs apportent des bénéfices durables." },
  ], [
    { q: "Existe-t-il des aides financières ?", a: "Oui, l'APA, le crédit d'impôt service à la personne, les caisses de retraite et certaines mutuelles proposent des aides." },
  ]))
);

// Block F — Retraite (8)
const retraiteTopics = [
  ["Calculer sa retraite : simulateurs et démarches", "Comment estimer sa pension et anticiper son passage à la retraite."],
  ["Cumul emploi-retraite : règles et avantages", "Travailler tout en touchant sa retraite : conditions et plafonds 2026."],
  ["Retraite progressive : mode d'emploi", "Réduire son temps de travail tout en commençant à percevoir sa pension."],
  ["Pension de réversion : qui peut en bénéficier ?", "Conjoint survivant, conditions, montant et démarches."],
  ["Préparer sa retraite financièrement : 5 piliers", "Immobilier, PER, assurance vie, livrets : diversifier son patrimoine."],
  ["Retraite à l'étranger : Portugal, Maroc, Espagne", "Avantages fiscaux, santé, coût de la vie : guide complet."],
  ["Réforme des retraites 2025-2026 : ce qui change", "Synthèse des nouvelles règles applicables aux futurs retraités."],
  ["Minimum vieillesse (ASPA) : montant et conditions", "L'allocation de solidarité aux personnes âgées expliquée."],
];
retraiteTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "retraite", ["retraite", "pension"], [
    { h2: "Le contexte 2026", body: "La législation française évolue régulièrement. Voici les règles à connaître pour préparer votre retraite dans les meilleures conditions." },
    { h2: "Les démarches à effectuer", body: "Demande à effectuer 6 mois avant la date souhaitée. Plusieurs documents sont à rassembler en amont." },
    { h2: "Les pièges à éviter", body: "Oublier des trimestres, mal déclarer un cumul, négliger sa complémentaire santé : les erreurs fréquentes et leurs conséquences." },
  ], [
    { q: "Où faire mes démarches retraite ?", a: "Sur info-retraite.fr, un guichet unique permet de faire toutes vos demandes en ligne, tous régimes confondus." },
  ]))
);

// Block G — Dépendance & aidants (8)
const depTopics = [
  ["Assurance dépendance : pourquoi et comment souscrire ?", "Anticiper la perte d'autonomie pour préserver son patrimoine et soulager ses proches."],
  ["GIR 1 à 6 : comprendre la grille AGGIR", "L'outil officiel d'évaluation de la dépendance et les aides associées."],
  ["APA : Allocation Personnalisée d'Autonomie", "Montants, conditions et démarches pour obtenir l'APA."],
  ["Aidants familiaux : droits, congés et indemnisation", "Le congé proche aidant et l'AJPA expliqués simplement."],
  ["EHPAD : comment choisir et financer", "Tarifs, aides, qualité des soins : un guide pour bien choisir."],
  ["Accueil familial : alternative à l'EHPAD", "Vivre chez un accueillant familial agréé : avantages et contraintes."],
  ["Téléassistance : choisir le bon dispositif", "Bracelet, médaillon, application : comparer les solutions du marché."],
  ["Adapter son logement : aides Ma Prime Adapt'", "L'aide nationale pour adapter son logement aux contraintes de l'âge."],
];
depTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "dependance", ["dépendance", "aidants"], [
    { h2: "Le contexte de la perte d'autonomie", body: "En France, 1,5 million de personnes âgées sont en perte d'autonomie. Anticiper évite des situations financières et émotionnelles très difficiles." },
    { h2: "Les solutions disponibles", body: "Aides publiques, assurance privée, solidarité familiale : un dispositif équilibré combine plusieurs solutions." },
    { h2: "Combien ça coûte ?", body: "Le coût mensuel moyen d'un EHPAD en France est de 2 200 €, mais peut dépasser 3 500 € en Île-de-France. Le maintien à domicile coûte en moyenne 1 800 €/mois." },
  ], [
    { q: "À quel âge souscrire une assurance dépendance ?", a: "Idéalement entre 50 et 65 ans. Plus tôt vous souscrivez, plus la prime est faible." },
    { q: "Comment évaluer le degré de dépendance ?", a: "Avec la grille AGGIR qui classe la dépendance du GIR 1 (totale) au GIR 6 (autonome). Le GIR conditionne les aides accordées." },
  ]))
);

// Block H — Emprunteur (7)
const empTopics = [
  ["Assurance emprunteur après 60 ans : les solutions", "Continuer à emprunter après 60 ans : conditions, surprimes et alternatives."],
  ["Délégation d'assurance : économiser sur son prêt", "La loi Lemoine et comment changer d'assurance emprunteur à tout moment."],
  ["Convention AERAS : prêt avec un risque aggravé de santé", "Obtenir une assurance emprunteur malgré une pathologie : les démarches."],
  ["Questionnaire médical : ce qu'il faut déclarer", "Obligations, conséquences d'une fausse déclaration et conseils."],
  ["Garanties décès, PTIA, IPT, ITT : décryptage", "Comprendre les sigles et choisir les bonnes garanties pour son crédit."],
  ["Taux d'assurance emprunteur 2026 : moyennes du marché", "Combien coûte une assurance de prêt en 2026 selon l'âge et le profil."],
  ["Renégocier son assurance prêt : économies à la clé", "Étapes pour faire baisser le coût de votre assurance crédit."],
];
empTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "assurance-emprunteur", ["emprunteur", "crédit"], [
    { h2: "Le cadre légal", body: "Depuis la loi Lemoine de 2022, vous pouvez changer d'assurance emprunteur à tout moment, sans frais et sans questionnaire médical sous certaines conditions." },
    { h2: "Les économies possibles", body: "En passant d'une assurance bancaire à une délégation, les économies moyennes sur la durée d'un prêt avoisinent 10 000 à 20 000 €." },
  ], [
    { q: "Puis-je changer mon assurance emprunteur quand je veux ?", a: "Oui, depuis la loi Lemoine du 1er juin 2022, à tout moment et sans frais, à conditions de garanties équivalentes." },
  ]))
);

// Block I — Prévoyance & famille (7)
const prevoyTopics = [
  ["Assurance obsèques : pourquoi anticiper ?", "Soulager financièrement et émotionnellement ses proches en organisant ses obsèques."],
  ["Capital décès : ce que verse l'Assurance Maladie", "Montant 2026, bénéficiaires et démarches."],
  ["Donation entre époux : protéger son conjoint", "La donation au dernier vivant : avantages, coût, démarches notariales."],
  ["Succession : préparer sa transmission", "Réduire les droits de succession et organiser la transmission de son patrimoine."],
  ["Mandat de protection future", "Anticiper sa propre éventuelle incapacité avec un mandat notarié ou sous seing privé."],
  ["Assurance vie : un outil de prévoyance puissant", "Bénéficiaires, fiscalité, transmission : tout ce qu'il faut savoir."],
  ["Procuration bancaire et habilitation familiale", "Aider un proche fragilisé sans passer par la tutelle."],
];
prevoyTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "prevoyance", ["prévoyance", "famille"], [
    { h2: "Pourquoi anticiper", body: "Anticiper ces sujets sensibles évite aux proches des démarches lourdes dans des moments de deuil ou de difficulté." },
    { h2: "Les solutions à connaître", body: "Plusieurs dispositifs existent en parallèle : assurance, donation, mandat, testament. Un conseiller patrimonial peut vous aider à les combiner intelligemment." },
  ], [
    { q: "À quel âge faut-il y penser ?", a: "Il n'y a pas d'âge ! Plus on anticipe, plus on a de marges de manœuvre et d'options à coûts maîtrisés." },
  ]))
);

// Block J — Nutrition (10)
const nutriTopics = [
  ["Protéines après 60 ans : combien et lesquelles ?", "Les besoins en protéines augmentent avec l'âge. Sources et quantités recommandées."],
  ["Diabétique senior : menu type sur 7 jours", "Un menu équilibré pour gérer son diabète au quotidien."],
  ["Cholestérol élevé : aliments à privilégier et à éviter", "Réguler son cholestérol par l'alimentation, sans privation."],
  ["Hypertension : régime DASH expliqué", "Le régime DASH, scientifiquement prouvé, pour réduire la pression artérielle."],
  ["Constipation senior : solutions naturelles", "Fibres, hydratation, activité : retrouver un transit confortable."],
  ["Régime sans gluten après 60 ans : utile ou pas ?", "Pour qui le sans-gluten a-t-il un sens médical ?"],
  ["Compléments alimentaires seniors : utiles ?", "Vitamines, oméga-3, probiotiques : faire le tri."],
  ["Petit déjeuner idéal pour seniors", "Composer un petit déjeuner équilibré et protéiné."],
  ["Manger moins et mieux : éviter la dénutrition", "Le piège silencieux de la dénutrition après 70 ans."],
  ["Cuisiner équilibré quand on vit seul", "Idées simples, rapides et économiques pour seniors solos."],
];
nutriTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "nutrition", ["nutrition", "alimentation"], [
    { h2: "Les bases nutritionnelles", body: "Avec l'âge, les besoins évoluent : moins de calories, mais plus de protéines, de calcium et de vitamine D. L'équilibre passe par la variété et la qualité des aliments." },
    { h2: "Mise en pratique", body: "Des recettes simples, des courses bien pensées, et 4 repas par jour suffisent à équilibrer durablement son alimentation senior." },
  ], [
    { q: "Faut-il consulter un nutritionniste ?", a: "Recommandé en cas de pathologie chronique (diabète, hypercholestérolémie, insuffisance rénale). Certaines mutuelles remboursent les consultations." },
  ]))
);

// Block K — Mutuelle & remboursements (10)
const mutTopics = [
  ["Mutuelle senior : comment bien comparer en 2026", "Garanties, tarifs, délais : la méthode pour choisir sans se tromper."],
  ["Reste à charge zéro : ce qui est vraiment couvert", "Lunettes, dentaire, audio : décryptage du 100% santé en 2026."],
  ["Hospitalisation : quels frais reste-t-il à payer ?", "Forfait journalier, chambre particulière, dépassements : les vrais coûts."],
  ["Mutuelle ou surcomplémentaire : que choisir ?", "Quand une surcomplémentaire fait la différence sur votre budget santé."],
  ["Délai de carence d'une mutuelle senior", "Comprendre les périodes d'attente avant remboursement et comment les éviter."],
  ["Résilier sa mutuelle : loi Châtel & infra-annuelle", "Les démarches pour changer de mutuelle à tout moment depuis 2020."],
  ["Mutuelle pour couple senior : économies à la clé", "Pourquoi un contrat couple peut faire baisser la cotisation de 15%."],
  ["Tiers payant : ne plus avancer les frais", "Comment activer le tiers payant intégral chez tous vos professionnels."],
  ["Médecines douces remboursées : ostéo, acupuncture", "La liste des mutuelles qui remboursent vraiment les médecines alternatives."],
  ["Garantie assistance : un atout sous-estimé", "Aide ménagère, garde d'enfant, rapatriement : ce que couvre l'assistance."],
];
mutTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "sante-senior", ["mutuelle", "remboursement"], [
    { h2: "Ce qu'il faut comprendre", body: "Une mutuelle senior efficace combine un bon niveau de remboursement, des services pratiques et une cotisation maîtrisée. Les comparateurs ne montrent qu'une partie de la vérité." },
    { h2: "Notre méthode de comparaison", body: "Nous analysons systématiquement les garanties hospitalisation, optique, dentaire et auditif, mais aussi les délais de carence et les exclusions médicales." },
  ], [
    { q: "Quelle mutuelle pour un senior de 70 ans ?", a: "Privilégiez les garanties hospitalisation 200% et optique/dentaire renforcées. Notre comparateur identifie les 3 meilleures offres selon votre profil." },
  ]))
);

// Block L — Démarches & droits (8)
const droitTopics = [
  ["Carte Vitale : perte, vol, mise à jour", "Démarches simples pour récupérer ou actualiser votre Carte Vitale."],
  ["ALD : Affection Longue Durée et prise en charge à 100%", "Comment bénéficier du protocole de soins et du remboursement intégral."],
  ["CSS : Complémentaire Santé Solidaire", "Conditions de ressources et démarches pour bénéficier de la CSS en 2026."],
  ["Médecin traitant : déclarer, changer, conséquences", "Pourquoi et comment bien choisir son médecin traitant après 60 ans."],
  ["Mon espace santé : utiliser le DMP en 2026", "Centraliser ses ordonnances et résultats dans un dossier médical unique."],
  ["Refus de soins : vos recours en tant que senior", "Que faire si un professionnel refuse de vous soigner ? Vos droits."],
  ["Téléconsultation senior : mode d'emploi", "Consulter un médecin par visio : étapes, remboursement, limites."],
  ["Dépassements d'honoraires : comprendre et négocier", "Secteur 1, 2, OPTAM : décoder votre feuille de soins."],
];
droitTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "sante-senior", ["démarches", "droits"], [
    { h2: "Vos droits expliqués", body: "Le système de santé français protège fortement les seniors, à condition de bien connaître ses droits et les démarches associées." },
    { h2: "Les démarches concrètes", body: "La plupart se font désormais en ligne sur ameli.fr ou via Mon espace santé. Comptez 10 à 15 minutes par démarche." },
  ], [
    { q: "Suis-je automatiquement en ALD ?", a: "Non, votre médecin traitant doit établir un protocole de soins qui est validé par le médecin-conseil de l'Assurance Maladie." },
  ]))
);

// Block M — Optique & dentaire (8)
const optDentTopics = [
  ["Lunettes senior : verres progressifs et remboursements", "Tout savoir sur le prix, le choix des verres progressifs et les remboursements en 2026."],
  ["Implants dentaires senior : coût et prise en charge", "Combien coûte un implant dentaire et quelles mutuelles le remboursent vraiment."],
  ["Prothèses dentaires : panier 100% Santé décrypté", "Couronnes, bridges, dentiers : ce qui est gratuit avec le 100% Santé."],
  ["Cataracte : opération, remboursement et suites", "Préparation, déroulement, prix des implants premium et rôle de la mutuelle."],
  ["DMLA : symptômes, traitements et accompagnement", "Reconnaître la dégénérescence maculaire et accéder aux meilleurs traitements."],
  ["Lentilles de contact senior : avantages et limites", "Pour qui les lentilles restent une bonne option après 60 ans."],
  ["Orthodontie adulte senior : est-ce possible ?", "Aligneurs invisibles et appareils : quand et comment se faire poser à 60+."],
  ["Parodontite : préserver ses gencives après 60 ans", "Détection, traitement et coûts d'une maladie parodontale chez le senior."],
];
optDentTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "sante-senior", ["optique", "dentaire"], [
    { h2: "Comprendre le besoin", body: "Optique et dentaire représentent 40% du reste à charge senior. Une mutuelle bien dimensionnée fait toute la différence." },
    { h2: "Tarifs moyens en 2026", body: "Un implant dentaire coûte 1 800 € à 2 500 €, une paire de verres progressifs 400 à 800 €. Sans mutuelle adaptée, le reste à charge dépasse souvent 70%." },
    { h2: "Bien choisir sa couverture", body: "Privilégiez les forfaits annuels élevés et vérifiez l'absence de plafonds bas sur 2 ans." },
  ], faqMutuelle))
);

// Block N — Médecines douces & bien-être (7)
const wellTopics = [
  ["Ostéopathie senior : bienfaits et remboursement", "Quand consulter un ostéo, à quelle fréquence et comment se faire rembourser."],
  ["Acupuncture pour seniors : indications validées", "Douleurs chroniques, stress, sommeil : les vertus prouvées de l'acupuncture."],
  ["Sophrologie senior : retrouver calme et sommeil", "Une discipline douce, accessible et de plus en plus remboursée."],
  ["Cures thermales : remboursement et indications", "Rhumatologie, veines, voies respiratoires : 3 semaines pour aller mieux."],
  ["Réflexologie plantaire : ce qu'elle peut apporter", "Bienfaits, limites et remboursements possibles par votre mutuelle."],
  ["Yoga doux pour seniors : démarrer en sécurité", "Postures adaptées, bénéfices articulaires et respiratoires."],
  ["Méditation pleine conscience : 10 minutes par jour", "Un outil simple pour réduire le stress, l'anxiété et améliorer le sommeil."],
];
wellTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "bien-vieillir", ["médecines douces", "bien-être"], [
    { h2: "Une approche complémentaire", body: "Les médecines douces ne remplacent pas la médecine conventionnelle mais peuvent l'enrichir efficacement sur la douleur, le stress et le sommeil." },
    { h2: "Le rôle de la mutuelle", body: "De plus en plus de mutuelles seniors remboursent ostéo, acupuncture, sophrologie. Comptez 25 à 60 € par séance avec un forfait annuel de 150 à 400 €." },
  ], [
    { q: "Combien de séances par an sont remboursées ?", a: "Selon les contrats, entre 3 et 10 séances par an, avec un plafond par séance souvent compris entre 25 et 60 €." },
  ]))
);

// Block O — Santé numérique & téléconsultation (6)
const digitalTopics = [
  ["Téléconsultation senior : étapes simples", "Comment consulter par vidéo : équipement, démarches, remboursement."],
  ["Applications santé recommandées pour seniors", "Tension, sommeil, médicaments : les apps fiables et faciles à utiliser."],
  ["Objets connectés santé : tensiomètres, montres", "Bien choisir un objet connecté santé adapté aux seniors."],
  ["Mon espace santé : tout centraliser en 2026", "Ordonnances, examens, vaccins : un coffre-fort numérique pour votre santé."],
  ["Pharmacies en ligne : sécurité et fiabilité", "Comment commander des médicaments en ligne en toute sécurité."],
  ["Dossier médical partagé (DMP) : utilité et accès", "Pourquoi activer son DMP change le suivi médical après 65 ans."],
];
digitalTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "prevention", ["numérique", "téléconsultation"], [
    { h2: "Le contexte 2026", body: "La santé numérique s'impose dans le quotidien des seniors. Bien utilisée, elle simplifie le suivi médical et réduit les déplacements." },
    { h2: "Démarches pas à pas", body: "Activer Mon espace santé prend 5 minutes avec sa carte Vitale. La téléconsultation est remboursée comme une consultation classique." },
  ], [
    { q: "La téléconsultation est-elle remboursée ?", a: "Oui, à 70% par l'Assurance Maladie, et le reste par votre mutuelle, comme une consultation en cabinet." },
  ]))
);

// Block P — Vie pratique & finances senior (8)
const practTopics = [
  ["Crédit d'impôt service à la personne pour seniors", "50% de réduction d'impôts sur l'aide à domicile : conditions et plafond."],
  ["Allocation logement (APL) après 65 ans", "Conditions pour percevoir l'APL en EHPAD ou résidence senior."],
  ["Carte senior SNCF : économies et offres", "Tarifs réduits sur le rail : avantages et abonnements."],
  ["Démarche Mon Senior Connecté : aides numériques", "Aides régionales pour s'équiper et se former au numérique."],
  ["Banque pour seniors : comparatif 2026", "Frais, conseillers, services à domicile : les meilleurs établissements."],
  ["Viager : avantages et risques pour le senior", "Vendre en viager : compléter sa retraite tout en restant chez soi."],
  ["Reverse mortgage français : prêt viager hypothécaire", "Une solution méconnue pour mobiliser son patrimoine sans vendre."],
  ["Aides communales pour seniors : que demander ?", "Téléalarme, portage de repas, transport : les aides à connaître."],
];
practTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "retraite", ["aides", "finances"], [
    { h2: "L'enjeu pour les seniors", body: "Bien connaître ses droits et les dispositifs disponibles permet d'améliorer significativement son pouvoir d'achat à la retraite." },
    { h2: "Démarches concrètes", body: "La plupart se font en ligne ou en mairie/CCAS. Comptez 2 à 4 semaines de délai selon l'administration concernée." },
  ], [
    { q: "Où me renseigner sur les aides locales ?", a: "Le CCAS (Centre Communal d'Action Sociale) de votre commune est le premier interlocuteur pour identifier toutes les aides auxquelles vous avez droit." },
  ]))
);

// Block Q — Cardiologie senior (6)
const cardioTopics = [
  ["Tension artérielle : valeurs normales après 65 ans", "Comprendre votre tension, l'auto-mesure et quand consulter."],
  ["Fibrillation auriculaire : un trouble fréquent du senior", "Symptômes, risques d'AVC et traitements anticoagulants."],
  ["Insuffisance cardiaque : vivre avec au quotidien", "Diagnostic, traitement, hygiène de vie et accompagnement."],
  ["Cholestérol LDL : objectifs après 60 ans", "Statines, alimentation, sport : la stratégie complète."],
  ["AVC : reconnaître les signes et agir vite", "FAST : visage, bras, parole, temps — chaque minute compte."],
  ["Pacemaker et défibrillateur : ce qu'il faut savoir", "Indications, pose, vie quotidienne et suivi."],
];
cardioTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "sante-senior", ["cardiologie", "coeur"], [
    { h2: "Comprendre la pathologie", body: "La pathologie cardiovasculaire reste la première cause de mortalité après 65 ans. Bien la connaître permet d'agir tôt et efficacement." },
    { h2: "Suivi et traitements", body: "Consultations cardiologiques régulières, ECG annuel et observance médicamenteuse sont les piliers d'une bonne prise en charge." },
    { h2: "Hygiène de vie", body: "Activité physique modérée, alimentation méditerranéenne, arrêt du tabac et gestion du stress réduisent jusqu'à 50% le risque d'événement cardiaque." },
  ], [
    { q: "À quelle fréquence consulter un cardiologue après 65 ans ?", a: "Au moins une fois par an en l'absence de pathologie, et tous les 3 à 6 mois en cas de suivi pour HTA, arythmie ou insuffisance cardiaque." },
  ]))
);

// Block R — Cancer & oncologie senior (5)
const oncoTopics = [
  ["Cancer du sein après 60 ans : dépistage et traitements", "Le dépistage organisé jusqu'à 74 ans et au-delà : modalités et bénéfices."],
  ["Cancer de la prostate : dépister sans sur-traiter", "PSA, IRM, biopsie : la stratégie raisonnée du dépistage senior."],
  ["Cancer colorectal : le test immunologique sauve des vies", "Tous les 2 ans entre 50 et 74 ans : un test simple, gratuit, à domicile."],
  ["Cancer du poumon : dépistage par scanner low-dose", "Les nouvelles recommandations 2025-2026 pour les anciens fumeurs."],
  ["Vivre après un cancer : suivi post-traitement", "Surveillance, soins de support, retour à la vie active et mutuelle dédiée."],
];
oncoTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "sante-senior", ["cancer", "dépistage"], [
    { h2: "L'enjeu du dépistage", body: "Détecté tôt, un cancer se soigne dans 9 cas sur 10. Les programmes nationaux de dépistage organisé sont gratuits et performants." },
    { h2: "Parcours de soins", body: "RCP, oncologue référent, soins de support : un parcours coordonné autour du patient, en partie pris en charge à 100% via l'ALD." },
    { h2: "Le rôle de votre mutuelle", body: "Au-delà de l'ALD, votre mutuelle couvre la chambre particulière, les médecines de support (psychologue, nutritionniste) et les dépassements d'honoraires." },
  ], [
    { q: "Le dépistage est-il vraiment gratuit ?", a: "Oui, pour les programmes nationaux (sein, côlon, col de l'utérus). Vous recevez une invitation par courrier ou via votre médecin traitant." },
  ]))
);

// Block S — Maladies chroniques & ALD (6)
const aldTopics = [
  ["BPCO : une maladie pulmonaire sous-diagnostiquée", "Reconnaître les signes, ralentir l'évolution et bien respirer."],
  ["Insuffisance rénale chronique : surveiller sa créatinine", "Dépistage, suivi néphrologique et dialyse expliqués."],
  ["Parkinson : les premiers signes et la prise en charge", "Tremblement, lenteur, raideur : quand consulter un neurologue."],
  ["Sclérose en plaques après 60 ans : moins connue, bien réelle", "Formes tardives, traitements et accompagnement."],
  ["Polyarthrite rhumatoïde : nouveaux traitements biologiques", "Une révolution thérapeutique au service des seniors."],
  ["Maladie de Crohn et MICI chez le senior", "Diagnostic plus rare mais possible : symptômes et traitements."],
];
aldTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "sante-senior", ["ALD", "maladie chronique"], [
    { h2: "Diagnostic et suivi", body: "Le diagnostic précoce améliore considérablement la qualité de vie. Un suivi spécialisé régulier est indispensable." },
    { h2: "ALD : la prise en charge à 100%", body: "Reconnue en Affection de Longue Durée, votre maladie ouvre droit au remboursement à 100% des soins liés (consultations, examens, médicaments)." },
    { h2: "Rôle de la mutuelle complémentaire", body: "Même en ALD, le forfait journalier hospitalier, la chambre particulière et certains dispositifs restent à la charge du patient ou de sa mutuelle." },
  ], [
    { q: "L'ALD couvre-t-elle 100% de tous les soins ?", a: "Uniquement les soins en rapport direct avec la pathologie ALD. Les autres soins sont remboursés selon le régime classique de la Sécu." },
  ]))
);

// Block T — Mutuelle par profil (6)
const profilTopics = [
  ["Mutuelle pour senior actif de 55-65 ans", "Tarifs préférentiels et garanties évolutives pour les pré-retraités."],
  ["Mutuelle senior 70 ans : que privilégier ?", "Hospitalisation renforcée, optique-dentaire-audio et médecines douces."],
  ["Mutuelle senior 80 ans et plus : sans questionnaire médical", "Les contrats accessibles à tout âge, sans formalité de santé."],
  ["Mutuelle pour senior fonctionnaire retraité", "Spécificités, MFP, MGEN : ce qui change pour les anciens fonctionnaires."],
  ["Mutuelle pour senior travailleur indépendant retraité", "Sortie de la Sécu indépendants : choisir sa complémentaire santé."],
  ["Mutuelle pour senior expatrié de retour en France", "Réaffiliation Sécu, CFE, et choix de la mutuelle au retour."],
];
profilTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "mutuelle-senior", ["profil", "personnalisation"], [
    { h2: "Vos besoins spécifiques", body: "Chaque profil senior a des priorités différentes : budget, garanties, services associés. Un contrat sur-mesure est presque toujours plus avantageux qu'un contrat standard." },
    { h2: "Notre méthode de sélection", body: "Nous analysons votre âge, votre état de santé déclaré, vos consommations passées et vos projets pour identifier la mutuelle qui maximise votre rapport garanties/prix." },
  ], faqMutuelle))
);

// Block U — Témoignages clients fictifs (4)
const storyTopics = [
  ["Comment Martine a économisé 540€/an sur sa mutuelle", "Le récit d'une retraitée de 68 ans qui a changé de mutuelle avec Pro-Tection."],
  ["Témoignage : 14 000€ économisés sur l'assurance emprunteur", "Un couple de 62 ans qui a renégocié son prêt grâce à la loi Lemoine."],
  ["Comment Jean a obtenu une mutuelle malgré son diabète", "Une histoire de courtage personnalisé pour un profil dit \"complexe\"."],
  ["Famille Bernard : assurer 4 générations avec un contrat famille", "La stratégie d'un couple de jeunes seniors pour couvrir parents et enfants."],
];
storyTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "mutuelle-senior", ["témoignage", "client"], [
    { h2: "Le contexte initial", body: "Avant de nous contacter, le client cumulait des garanties inadaptées et une cotisation élevée. Une situation très fréquente après quelques années de fidélité à la même compagnie." },
    { h2: "Notre analyse", body: "En 30 minutes d'échange, nous identifions les vrais postes de dépense et les garanties superflues. L'analyse comparative porte sur 25 mutuelles partenaires." },
    { h2: "Le résultat concret", body: "Économie annuelle significative, garanties renforcées sur les postes critiques, et zéro démarche administrative côté client : nous gérons la résiliation et la souscription." },
  ], [
    { q: "Combien de temps prend un changement de mutuelle ?", a: "Compter 2 à 4 semaines entre la signature et la prise d'effet du nouveau contrat. Nous gérons la résiliation de l'ancien contrat à la date qui vous arrange." },
  ]))
);



// Block V — Aidants familiaux (6)
const aidTopics: [string, string][] = [
  ["Aidant familial : 10 droits à connaître en 2026", "Congé proche aidant, AJPA, droit au répit, formation : tous les droits des aidants en France."],
  ["Burn-out de l'aidant : reconnaître et prévenir l'épuisement", "Signes d'alerte, solutions de répit et accompagnement psychologique pour aidants familiaux."],
  ["Accueil de jour pour personnes âgées : mode d'emploi", "Une solution de répit pour les aidants et de socialisation pour le senior. Tarifs et aides."],
  ["Baluchonnage et relayage à domicile", "Un nouvel outil de répit pour les aidants : principe, coût et déploiement en France."],
  ["Formation gratuite des aidants : où s'inscrire ?", "Associations et plateformes pour se former à l'accompagnement d'un proche dépendant."],
  ["Plateforme de répit : trouver de l'aide près de chez soi", "Annuaire des plateformes d'accompagnement et de répit pour aidants familiaux."],
];
aidTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "dependance", ["aidants", "répit"], [
    { h2: "Le contexte", body: "On compte 11 millions d'aidants familiaux en France. Pourtant, la majorité ignore ses droits et ses solutions de répit." },
    { h2: "Solutions concrètes", body: "Aide financière (AJPA, APA), congés (proche aidant, solidarité familiale), répit (accueil de jour, hébergement temporaire, baluchonnage), formation gratuite." },
    { h2: "Le rôle de la mutuelle", body: "Certaines mutuelles seniors incluent un service d'écoute aidants, des heures d'aide ménagère ou la prise en charge de l'accueil de jour." },
  ], [
    { q: "L'AJPA est-elle imposable ?", a: "Oui, l'Allocation Journalière du Proche Aidant est soumise à l'impôt sur le revenu et aux prélèvements sociaux." },
  ]))
);

// Block W — Médicaments & pharmacie senior (6)
const medTopics: [string, string][] = [
  ["Polymédication senior : limiter les interactions", "Au-delà de 5 médicaments, le risque d'interaction explose. Comment auditer son ordonnance."],
  ["Génériques : pourquoi les accepter sans crainte", "Efficacité, prix, remboursement : tordre le cou aux idées reçues sur les génériques."],
  ["Médicaments déremboursés en 2026 : la liste", "Quels médicaments sont sortis du remboursement Sécu et quelles alternatives existent."],
  ["Préparation de pilulier : qui peut le faire ?", "Pharmacien, infirmier, aidant : le cadre légal et les bons réflexes."],
  ["Automédication senior : précautions essentielles", "Paracétamol, ibuprofène, somnifères : les pièges de l'auto-prescription après 65 ans."],
  ["Tiers payant en pharmacie : ne plus avancer un centime", "Comment activer le tiers payant intégral chez votre pharmacien grâce à votre mutuelle."],
];
medTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "sante-senior", ["médicaments", "pharmacie"], [
    { h2: "Le bon usage des médicaments", body: "Après 65 ans, l'organisme métabolise différemment les médicaments. Une vigilance accrue est indispensable." },
    { h2: "Le rôle du pharmacien", body: "Bilan partagé de médication, conciliation médicamenteuse, conseils sur les interactions : votre pharmacien est un vrai allié santé." },
    { h2: "Couverture par la mutuelle", body: "Médicaments à service médical rendu modéré (SMR), vaccins non remboursés, phytothérapie : selon la formule choisie, votre mutuelle complète intelligemment." },
  ], [
    { q: "Comment savoir si deux médicaments interagissent ?", a: "Demandez à votre pharmacien ou utilisez l'application Mon espace santé qui détecte automatiquement les interactions à risque." },
  ]))
);

// Block X — Spécial femmes seniors (5)
const womenTopics: [string, string][] = [
  ["Ostéoporose post-ménopause : prévenir les fractures", "Densitométrie osseuse, calcium, vitamine D : la stratégie complète après 55 ans."],
  ["Incontinence urinaire féminine : briser le tabou", "Rééducation périnéale, traitements et accessoires remboursés."],
  ["Cancer du sein : dépistage organisé jusqu'à 74 ans", "Mammographie tous les 2 ans : pourquoi y aller et comment se faire rembourser au-delà."],
  ["Sécheresse vaginale et hormonothérapie locale", "Sortir du silence : solutions efficaces et bien tolérées après la ménopause."],
  ["Sport adapté pour femmes seniors : Pilates, aquagym", "Les disciplines les plus bénéfiques après 60 ans pour les femmes."],
];
womenTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "sante-senior", ["femmes", "santé féminine"], [
    { h2: "Spécificités féminines", body: "Après 60 ans, les femmes font face à des enjeux de santé spécifiques liés à la ménopause, au plancher pelvien et à la prévention des cancers féminins." },
    { h2: "Suivi recommandé", body: "Gynécologue tous les 1 à 2 ans, mammographie tous les 2 ans entre 50 et 74 ans, densitométrie osseuse au moindre facteur de risque." },
    { h2: "Mutuelle dédiée", body: "Vérifiez la prise en charge de la rééducation périnéale, de l'ostéodensitométrie hors ALD et des consultations gynécologiques en secteur 2." },
  ], [
    { q: "Le dépistage du cancer du sein est-il gratuit ?", a: "Oui, dans le cadre du dépistage organisé entre 50 et 74 ans, mammographie et examen clinique sont pris en charge à 100% par l'Assurance Maladie." },
  ]))
);

// Block Y — Spécial hommes seniors (5)
const menTopics: [string, string][] = [
  ["Andropause : mythe ou réalité médicale ?", "Baisse de testostérone après 50 ans : symptômes, dosage et prise en charge."],
  ["Hypertrophie bénigne de la prostate (HBP)", "Symptômes urinaires, traitements médicamenteux et chirurgicaux."],
  ["Troubles érectiles : solutions médicales en 2026", "Causes, médicaments et accompagnement après 60 ans, sans gêne."],
  ["Cardio-prévention chez l'homme senior", "Un homme sur deux ignore son risque cardiovasculaire. Le bilan à faire."],
  ["Sport masculin senior : préserver muscle et tendons", "Musculation douce, vélo, natation : la routine idéale après 60 ans."],
];
menTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "sante-senior", ["hommes", "santé masculine"], [
    { h2: "Spécificités masculines", body: "Les hommes consultent moins et plus tard que les femmes. Pourtant, les enjeux après 60 ans sont majeurs : prostate, cœur, sarcopénie." },
    { h2: "Suivi recommandé", body: "Consultation médecin traitant annuelle, dosage PSA après discussion bénéfices/risques, bilan cardiovasculaire tous les 2 à 5 ans selon profil." },
    { h2: "Mutuelle dédiée", body: "Privilégiez les contrats prenant en charge l'urologie en secteur 2, la chirurgie ambulatoire et la téléconsultation pour les sujets sensibles." },
  ], [
    { q: "Le dosage du PSA est-il systématique ?", a: "Non, il fait l'objet d'une discussion individuelle avec votre médecin traitant en fonction de votre âge, vos antécédents familiaux et votre état de santé." },
  ]))
);

// Block Z — Assurance voyage senior (5)
const travelTopics: [string, string][] = [
  ["Assurance voyage senior : que couvre-t-elle vraiment ?", "Frais médicaux, rapatriement, annulation : les garanties indispensables après 65 ans."],
  ["Carte Européenne d'Assurance Maladie : limites pour seniors", "La CEAM ne couvre pas tout. Pourquoi une assurance complémentaire reste essentielle."],
  ["Voyage longue durée senior : assurance et précautions", "Croisière, road-trip, expatriation temporaire : bien se couvrir au-delà de 90 jours."],
  ["Assurance annulation voyage senior : pertinence", "Pour quel type de voyage l'annulation est rentable après 70 ans."],
  ["Santé en croisière : précautions et couverture", "Coût d'une évacuation médicale en haute mer et garanties à exiger."],
];
travelTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "bien-vieillir", ["voyage", "assurance"], [
    { h2: "Les risques à anticiper", body: "Un rapatriement sanitaire depuis l'Asie ou l'Amérique peut dépasser 80 000 €. Sans assurance dédiée, c'est la catastrophe financière assurée." },
    { h2: "Bien choisir sa formule", body: "Plafond frais médicaux 1 M€ minimum, franchise, exclusions liées aux pathologies préexistantes et limite d'âge du contrat : les points à vérifier." },
    { h2: "Notre conseil", body: "Demandez un devis voyage senior dédié plutôt qu'une carte bancaire haut de gamme : les garanties sont presque toujours supérieures pour un coût comparable." },
  ], [
    { q: "Mon assurance habitation couvre-t-elle mes voyages ?", a: "Très partiellement. La garantie villégiature couvre vos biens, pas votre santé. Une assurance voyage spécifique est indispensable." },
  ]))
);

// Block AA — Comparatifs régionaux (6)
const regionTopics: [string, string][] = [
  ["Mutuelle senior Île-de-France : spécificités régionales", "Tarifs, secteur 2, hôpitaux APHP : pourquoi la mutuelle senior coûte plus cher en IDF."],
  ["Mutuelle senior Provence-Alpes-Côte d'Azur (PACA)", "Comparatif des contrats les plus adaptés aux seniors résidant en PACA."],
  ["Mutuelle senior Bretagne : meilleurs contrats 2026", "Tour d'horizon des mutuelles régionales et nationales en Bretagne."],
  ["Mutuelle senior Nouvelle-Aquitaine : guide complet", "Tarifs, hôpitaux, dépassements : tout savoir pour bien choisir."],
  ["Mutuelle senior Auvergne-Rhône-Alpes", "Comparer les mutuelles dans une des plus grandes régions de France."],
  ["Mutuelle senior DOM-TOM : Réunion, Antilles, Guyane", "Spécificités d'une mutuelle santé senior outre-mer : conventionnement, plafonds, évacuations."],
];
regionTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "mutuelle-senior", ["région", "comparatif"], [
    { h2: "Les particularités régionales", body: "Tarifs et pratiques médicales varient fortement selon la région : densité de spécialistes en secteur 2, hôpitaux universitaires, parcours de soins." },
    { h2: "Le bon choix selon votre profil", body: "Selon votre âge, vos consommations et votre zone, certaines mutuelles régionales offrent un rapport garanties/prix supérieur aux contrats nationaux." },
  ], faqMutuelle))
);

// Block AB — Glossaire & lexique (5)
const lexTopics: [string, string][] = [
  ["BR, TM, PMSS : décoder le jargon de la mutuelle", "Glossaire des sigles que vous croisez sur vos garanties de complémentaire santé."],
  ["OPTAM et OPTAM-CO : ce que ça change pour vous", "Les dispositifs limitant les dépassements d'honoraires des spécialistes."],
  ["Tiers payant intégral vs partiel : la différence", "Comprendre ce que vous avancez ou pas chez le médecin et le pharmacien."],
  ["Reste à charge zéro : panier 100% Santé en détail", "Optique, dentaire, audiologie : ce qui est vraiment couvert sans débours."],
  ["Parcours de soins coordonnés : règles et sanctions", "Médecin traitant, spécialistes : éviter les pénalités de remboursement."],
];
lexTopics.forEach(([title, meta]) =>
  tpl.push(T(title, meta, "sante-senior", ["lexique", "glossaire"], [
    { h2: "Comprendre pour mieux choisir", body: "La complémentaire santé utilise un vocabulaire technique qui peut désorienter. Maîtriser ces notions, c'est faire les bons choix." },
    { h2: "À retenir absolument", body: "Le ticket modérateur, le panier 100% Santé, le secteur OPTAM et le parcours de soins coordonnés sont les 4 notions clés pour optimiser vos remboursements." },
  ], [
    { q: "Que veut dire TM dans ma garantie ?", a: "TM = Ticket Modérateur, soit la part non remboursée par la Sécurité sociale. Une mutuelle 100% TM rembourse intégralement ce reste à charge." },
  ]))
);

// ---------------- Block Z — Featured pillar articles (2026) ----------------
// High-search-volume French queries, unique AI-generated hero images stored in src/assets/blog/.
tpl.push(
  T(
    "Prix mutuelle senior 65 ans : combien prévoir en 2026 ?",
    "Prix moyen d'une mutuelle senior à 65 ans en 2026 : fourchettes de tarifs, exemples de devis, garanties incluses et astuces pour payer moins cher.",
    "mutuelle-senior",
    ["prix mutuelle senior", "65 ans", "tarif 2026", "cotisation"],
    [
      { h2: "Le tarif moyen à 65 ans en 2026", body: "En 2026, une mutuelle senior à 65 ans coûte en moyenne entre 68 € et 145 €/mois. Le prix dépend de trois facteurs principaux : le niveau de garanties (entrée de gamme, intermédiaire, haut de gamme), votre lieu de résidence (les tarifs sont plus élevés à Paris et sur la Côte d'Azur) et l'assureur choisi (mutualiste historique, assureur privé ou pure player digital)." },
      { h2: "Ce qui fait varier le prix", body: "L'âge est le premier facteur : passer de 60 à 70 ans peut faire grimper la cotisation de 25 à 40 %. Le renforcement du dentaire (implants), de l'optique (verres progressifs) et de l'audition tire la facture vers le haut. À l'inverse, choisir une formule modulable ou renoncer aux médecines douces peut réduire la note de 15 à 30 €/mois." },
      { h2: "Trois exemples concrets de devis", body: "Formule essentielle (65 €/mois) : hospitalisation 150 %, dentaire 200 %, optique panier 100 % Santé. Formule confort (95 €/mois) : hospitalisation 300 %, dentaire 300 %, optique 350 €/an, médecines douces 200 €/an. Formule premium (135 €/mois) : hospitalisation 500 %, dentaire 400 % avec implants, optique 600 €/an, audition au-delà du 100 % Santé, chambre particulière illimitée." },
      { h2: "Comment payer moins cher sans sacrifier les garanties", body: "Trois leviers font systématiquement baisser la facture : comparer au moins 5 devis personnalisés, passer par un courtier indépendant (économies moyennes de 25 %), et supprimer les options inutiles (maternité, cure thermale rare). Vérifiez aussi les délais de carence et privilégiez les contrats sans questionnaire médical." },
    ],
    [
      { q: "Le prix augmente-t-il chaque année ?", a: "Oui, en moyenne de 3 à 5 % par an à cause de l'inflation médicale et du vieillissement. Une hausse supérieure à 8 % justifie de comparer d'autres offres." },
      { q: "Peut-on payer moins de 50 €/mois à 65 ans ?", a: "Oui, sur des formules basiques limitées à l'hospitalisation et au ticket modérateur, mais avec un reste à charge élevé sur le dentaire, l'optique et l'audition." },
      { q: "Les femmes paient-elles plus cher que les hommes ?", a: "Non. Depuis la directive européenne de 2012, la tarification unisexe est obligatoire en mutuelle santé." },
    ]
  )
);

tpl.push(
  T(
    "Meilleure mutuelle senior sans questionnaire médical : comparatif 2026",
    "Comparatif des meilleures mutuelles seniors sans questionnaire médical en 2026 : acceptation garantie, tarifs, garanties, délais de carence.",
    "mutuelle-senior",
    ["sans questionnaire médical", "acceptation garantie", "comparatif", "2026"],
    [
      { h2: "Pourquoi choisir une mutuelle sans questionnaire médical ?", body: "Après 60 ans, un questionnaire médical peut conduire à des surprimes voire à un refus d'affiliation. Les mutuelles sans questionnaire médical garantissent une acceptation totale, sans exclusion liée à vos antécédents (cancer, diabète, cardiopathie). C'est la solution la plus sûre pour toute personne ayant une ALD ou un traitement de longue durée." },
      { h2: "Les garanties à comparer", body: "Toutes les mutuelles sans questionnaire ne se valent pas. Comparez le forfait hospitalier (200 % minimum), les remboursements dentaires (idéalement 300 %), le forfait optique annuel (au moins 400 €), la prise en charge de l'audition au-delà du 100 % Santé et la présence de médecines douces (ostéopathie, sophrologie)." },
      { h2: "Les délais de carence à surveiller", body: "Sans questionnaire médical, les assureurs se protègent avec des délais de carence sur les postes les plus coûteux : 3 à 6 mois pour le dentaire et l'optique, 9 mois pour l'hospitalisation programmée. Vérifiez systématiquement ces délais avant de signer." },
      { h2: "Notre méthodologie 2026", body: "Nous avons évalué 22 mutuelles seniors sans questionnaire médical sur 10 critères : tarif à 65 ans, garanties, délais de carence, satisfaction client, stabilité tarifaire, qualité du service client et rapidité des remboursements. Le classement met en avant des acteurs mutualistes et digitaux offrant le meilleur rapport garanties-prix." },
    ],
    [
      { q: "Puis-je être refusé ?", a: "Non. Une mutuelle sans questionnaire médical vous accepte quel que soit votre état de santé, votre âge ou vos antécédents." },
      { q: "Les tarifs sont-ils plus élevés ?", a: "Légèrement, de 5 à 15 % en moyenne. Mais l'écart est vite comblé si vous avez une pathologie qui aurait généré une surprime ailleurs." },
      ...faqMutuelle,
    ]
  )
);

tpl.push(
  T(
    "Loi Lemoine 2026 : changer d'assurance emprunteur après 60 ans",
    "Loi Lemoine et assurance emprunteur senior en 2026 : conditions, économies possibles, démarches, questionnaire médical supprimé. Guide complet.",
    "assurance-emprunteur",
    ["loi Lemoine", "assurance emprunteur senior", "changer assurance", "2026"],
    [
      { h2: "Ce que change la loi Lemoine pour les seniors", body: "Depuis le 1er septembre 2022, la loi Lemoine autorise la résiliation à tout moment de l'assurance emprunteur, sans attendre la date anniversaire du contrat. Elle supprime aussi le questionnaire médical pour les prêts inférieurs à 200 000 € remboursés avant 60 ans — un vrai plus quand vous êtes emprunteur senior en délégation." },
      { h2: "Combien peut-on économiser après 60 ans ?", body: "L'assurance bancaire pratiquée par les banques est particulièrement chère après 60 ans (jusqu'à 0,60 % du capital emprunté par an). En passant par une délégation d'assurance externe, l'économie moyenne atteint 8 000 à 15 000 € sur la durée restante du prêt, à garanties équivalentes." },
      { h2: "Les 4 étapes pour changer", body: "1. Demandez la fiche standardisée d'information à votre banque. 2. Comparez au moins 3 devis de délégation d'assurance senior. 3. Vérifiez que les garanties sont équivalentes (décès, PTIA, IPT, ITT). 4. Envoyez la demande de substitution à votre banque, qui a 10 jours ouvrés pour répondre." },
      { h2: "Les pièges à éviter", body: "Attention aux garanties DIT (invalidité temporaire) exclues chez les seniors, aux exclusions liées aux affections déjà déclarées, et aux quotités mal réparties dans les couples. Un courtier spécialisé senior sécurise l'opération et négocie les meilleures garanties." },
    ],
    [
      { q: "La loi Lemoine s'applique-t-elle si j'ai plus de 65 ans ?", a: "Oui, sans limite d'âge. Vous pouvez changer d'assurance emprunteur à tout moment du prêt, quel que soit votre âge." },
      { q: "Le questionnaire médical est-il vraiment supprimé ?", a: "Uniquement pour les prêts inférieurs à 200 000 € (par emprunteur) remboursés avant vos 60 ans. Au-delà, un questionnaire simplifié reste demandé." },
      { q: "Combien de temps prend la démarche ?", a: "Comptez 2 à 4 semaines entre la demande de devis et la substitution effective. La banque ne peut pas refuser si les garanties sont équivalentes." },
    ]
  )
);

tpl.push(
  T(
    "Complémentaire santé solidaire (CSS) senior : qui y a droit ?",
    "Complémentaire santé solidaire (ex-CMU-C, ACS) pour les seniors en 2026 : plafonds de ressources, prestations, démarches et alternatives.",
    "sante-senior",
    ["CSS", "complémentaire santé solidaire", "aide financière", "senior"],
    [
      { h2: "Qu'est-ce que la Complémentaire santé solidaire (CSS) ?", body: "La CSS a remplacé la CMU-C et l'ACS en 2019. Elle offre une couverture santé sans reste à charge (consultations, hôpital, dentaire, optique panier 100 % Santé) aux personnes aux revenus modestes. Selon vos ressources, elle est totalement gratuite ou coûte moins de 30 €/mois après 70 ans." },
      { h2: "Les plafonds de ressources en 2026", body: "Pour une personne seule : gratuite jusqu'à 9 719 €/an de revenus, payante entre 9 719 € et 13 121 €/an. Pour un couple : gratuite jusqu'à 14 578 €, payante jusqu'à 19 682 €. Les pensions de retraite et minima sociaux (ASPA, ASI) sont comptés dans les ressources." },
      { h2: "Combien coûte la CSS après 60 ans ?", body: "Elle est gratuite si vous êtes en dessous du premier plafond. Sinon, la participation mensuelle est de 8 € (60-69 ans), 14 € (70-79 ans) et 30 € (80 ans et plus). C'est bien moins cher qu'une mutuelle classique, et le remboursement est intégral sur les soins courants." },
      { h2: "Comment en faire la demande", body: "Le dossier se dépose auprès de votre CPAM ou en ligne sur ameli.fr. Il faut joindre l'avis d'imposition, les justificatifs de pension et un RIB. La réponse arrive sous 2 mois. En cas de refus, une mutuelle senior classique reste la meilleure alternative." },
    ],
    [
      { q: "Peut-on cumuler CSS et mutuelle privée ?", a: "Non, la CSS est exclusive : elle remplace toute autre complémentaire santé." },
      { q: "La CSS couvre-t-elle les prothèses dentaires ?", a: "Oui, intégralement pour les prothèses inscrites au panier 100 % Santé. Les autres restent partiellement à charge." },
      { q: "Puis-je choisir ma mutuelle CSS ?", a: "Oui, vous choisissez un organisme dans la liste des mutuelles CSS agréées par votre département." },
    ]
  )
);

tpl.push(
  T(
    "Aidants familiaux 2026 : congé, AJPA et rémunération",
    "Aidants familiaux en 2026 : congé de proche aidant, AJPA, montant, démarches et droits à la retraite. Guide complet pour aider un parent âgé.",
    "dependance",
    ["aidants", "AJPA", "congé proche aidant", "aide famille"],
    [
      { h2: "Qui est reconnu aidant familial en 2026 ?", body: "Est aidant familial toute personne qui accompagne un proche en perte d'autonomie (parent, conjoint, ascendant, descendant, jusqu'au 4e degré). En France, 11 millions de personnes aident un proche, dont 60 % de femmes. La reconnaissance ouvre droit à des congés, une allocation et une majoration retraite." },
      { h2: "Le congé de proche aidant", body: "D'une durée maximale de 3 mois renouvelables (1 an sur toute la carrière), il permet de suspendre ou réduire son activité pour aider un proche. Il est accessible à tous les salariés du privé et de la fonction publique après un an d'ancienneté. Aucun motif de refus n'est possible." },
      { h2: "L'AJPA : l'allocation journalière proche aidant", body: "En 2026, l'AJPA versée par la CAF s'élève à 65,80 €/jour (temps plein) ou 32,90 €/demi-journée. Le plafond est de 22 jours par mois et 66 jours sur toute la carrière. Elle est cumulable avec l'APA du parent aidé et n'est pas soumise à condition de ressources." },
      { h2: "L'impact sur la retraite et la fiscalité", body: "Les périodes de congé aidant sont validées gratuitement au titre de l'assurance vieillesse (AVA — Assurance Vieillesse des Aidants). L'AJPA est exonérée d'impôt sur le revenu jusqu'à 66 jours. Un vrai coup de pouce pour ne pas se ruiner en aidant un proche." },
    ],
    [
      { q: "Peut-on cumuler AJPA et salaire ?", a: "Oui à temps partiel. Vous percevez l'AJPA au prorata des jours de congé effectivement pris." },
      { q: "L'aidant peut-il être rémunéré par le parent aidé ?", a: "Oui, si le parent perçoit l'APA (dépendance) : celle-ci peut financer la rémunération d'un enfant aidant (sauf conjoint), déclaré via le CESU." },
      { q: "Le congé est-il obligatoirement accepté ?", a: "Oui, l'employeur ne peut pas le refuser. Il peut seulement en négocier la date." },
    ]
  )
);

tpl.push(
  T(
    "Résiliation mutuelle senior : modèle de lettre gratuit 2026",
    "Résilier votre mutuelle senior en 2026 : modèle de lettre de résiliation, loi Chatel, loi Hamon, résiliation infra-annuelle, délais et démarches.",
    "mutuelle-senior",
    ["résiliation mutuelle", "modèle lettre", "loi Chatel", "résiliation infra-annuelle"],
    [
      { h2: "Quand résilier votre mutuelle senior ?", body: "Depuis la loi de résiliation infra-annuelle (décembre 2020), vous pouvez résilier votre mutuelle à tout moment après la première année de souscription, sans frais ni justification. Avant un an, la résiliation reste possible à l'échéance annuelle (loi Chatel, préavis de 2 mois) ou en cas de changement de situation (retraite, déménagement, mariage)." },
      { h2: "Les étapes pour résilier", body: "1. Vérifiez la date anniversaire du contrat et l'ancienneté (plus ou moins d'un an). 2. Souscrivez d'abord une nouvelle mutuelle qui prendra en charge la résiliation. 3. Envoyez la lettre de résiliation en recommandé avec accusé de réception (ou via l'espace client si prévu). 4. La résiliation prend effet 1 mois après réception par l'assureur." },
      { h2: "Modèle de lettre gratuit", body: "Madame, Monsieur,\\n\\nJe soussigné(e) [Nom Prénom], adhérent(e) au contrat n° [XXX] depuis le [date], vous informe par la présente de ma décision de résilier mon contrat de mutuelle santé, conformément à la loi n° 2019-733 du 14 juillet 2019 (résiliation infra-annuelle).\\n\\nJe vous prie de bien vouloir cesser tout prélèvement à compter du [date + 1 mois] et de me confirmer par écrit la prise en compte de cette résiliation.\\n\\nJe reste à votre disposition et vous prie d'agréer, Madame, Monsieur, mes salutations distinguées.\\n\\n[Signature]" },
      { h2: "Les erreurs à éviter", body: "Ne résiliez jamais sans avoir souscrit une nouvelle mutuelle : vous risqueriez de rester sans couverture pendant plusieurs semaines. Vérifiez également les délais de carence de la nouvelle mutuelle sur le dentaire et l'optique pour aligner les dates de bascule." },
    ],
    [
      { q: "Faut-il justifier la résiliation ?", a: "Non, si le contrat a plus d'un an. La résiliation infra-annuelle ne demande aucun motif." },
      { q: "Puis-je résilier par email ?", a: "La loi impose un écrit avec preuve de dépôt : recommandé postal, recommandé électronique ou formulaire en ligne certifié par l'assureur." },
      { q: "Combien de temps met la résiliation ?", a: "Elle prend effet 1 mois après réception de la demande par votre assureur." },
    ]
  )
);

tpl.push(
  T(
    "Reste à charge zéro : dentaire, optique, audition en 2026",
    "Réforme 100 % Santé (reste à charge zéro) en 2026 : équipements dentaires, optiques et auditifs intégralement remboursés. Guide senior complet.",
    "sante-senior",
    ["reste à charge zéro", "100% Santé", "dentaire", "optique", "audition"],
    [
      { h2: "Le 100 % Santé, comment ça marche ?", body: "Depuis 2021, la réforme 100 % Santé permet un remboursement intégral (Sécurité sociale + mutuelle) sur une sélection d'équipements dentaires, optiques et auditifs. Aucun reste à charge pour le patient, à condition de choisir un équipement du panier 100 % Santé et d'être couvert par un contrat responsable (99 % des mutuelles le sont)." },
      { h2: "Le panier dentaire", body: "Le panier 100 % Santé couvre les couronnes céramo-métalliques sur les dents visibles, les couronnes métalliques sur les molaires, les bridges céramo-métalliques sur les incisives, et les prothèses amovibles. Les implants ne sont pas inclus mais restent partiellement remboursés par les bonnes mutuelles seniors." },
      { h2: "Le panier optique", body: "Une paire complète de lunettes (monture + verres, y compris progressifs) est proposée sans reste à charge. Les montures sont limitées à 30 € et les verres respectent des critères de qualité (indice, traitements). Le renouvellement est possible tous les 2 ans (1 an après 55 ans en cas d'évolution)." },
      { h2: "Le panier audition", body: "Un appareil auditif de classe 1 est proposé à 950 € au maximum, intégralement remboursé. Les appareils rechargeables sont inclus, avec 4 ans de garantie et suivi audioprothésiste. Les modèles plus sophistiqués (classe 2) restent partiellement à charge, une bonne mutuelle senior peut couvrir l'essentiel." },
    ],
    [
      { q: "Suis-je obligé de choisir le 100 % Santé ?", a: "Non. Vous pouvez opter pour un équipement plus haut de gamme (classe 2), mais avec un reste à charge selon votre mutuelle." },
      { q: "Ma mutuelle senior propose-t-elle le 100 % Santé ?", a: "Oui, si elle est \"responsable\" (99 % des contrats). Vérifiez la mention sur votre tableau de garanties." },
      { q: "Peut-on cumuler 100 % Santé et surcomplémentaire ?", a: "Oui, une surcomplémentaire peut prendre en charge le reste à charge des équipements hors panier 100 % Santé (implants, verres haut de gamme)." },
    ]
  )
);

tpl.push(
  T(
    "Assurance obsèques : capital ou prestations, comment choisir ?",
    "Assurance obsèques 2026 : contrat en capital vs contrat en prestations, tarifs, garanties, comparatif pour bien protéger vos proches.",
    "prevoyance",
    ["assurance obsèques", "contrat obsèques", "capital", "prestations", "prévoyance senior"],
    [
      { h2: "Pourquoi souscrire une assurance obsèques ?", body: "Le coût moyen d'obsèques en France s'élève à 4 500 € (inhumation) ou 4 000 € (crémation) en 2026. Une assurance obsèques évite à vos proches d'avancer cette somme dans un moment déjà difficile. Elle permet aussi d'organiser vos volontés (cérémonie, sépulture, musique)." },
      { h2: "Contrat en capital : la liberté financière", body: "Vous cotisez pour constituer un capital (souvent 3 000 à 8 000 €) versé à un bénéficiaire désigné à votre décès. Il utilise cette somme comme il le souhaite pour organiser les obsèques. Avantage : souplesse totale. Inconvénient : le capital doit couvrir l'inflation funéraire (+2 à 3 %/an)." },
      { h2: "Contrat en prestations : les obsèques organisées", body: "Vous choisissez à l'avance chaque prestation (cercueil, transport, cérémonie, sépulture) auprès d'un opérateur funéraire partenaire. À votre décès, tout est pris en charge sans intervention financière de la famille. Avantage : sécurité totale. Inconvénient : moins de flexibilité, changement d'opérateur difficile." },
      { h2: "Comment choisir en 2026 ?", body: "Pour une transmission simple à un proche de confiance, choisissez le contrat en capital. Pour tout organiser à l'avance et soulager entièrement votre famille, préférez le contrat en prestations. Dans tous les cas, comparez les tarifs (30 à 80 €/mois selon l'âge), vérifiez l'absence de questionnaire médical et privilégiez les contrats à prime unique ou à cotisations limitées dans le temps." },
    ],
    [
      { q: "À partir de quel âge souscrire ?", a: "Dès 50 ans idéalement. Après 75 ans, les tarifs augmentent fortement et certains assureurs refusent la souscription." },
      { q: "Le capital est-il soumis aux droits de succession ?", a: "Non, comme l'assurance-vie il est transmis hors succession dans la limite de 152 500 € par bénéficiaire (versements avant 70 ans)." },
      { q: "Peut-on changer de bénéficiaire ?", a: "Oui, à tout moment via un simple courrier à l'assureur." },
    ]
  )
);

// ---------------- Generate full Article objects ----------------
const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const BASE_DATE = new Date("2026-01-15T10:00:00Z").getTime();
const DAY = 86_400_000;

// Branded category images (bundled assets) — fast, relevant, on-brand.
const imageFor = (category: string) => CAT_IMAGES[category] ?? CAT_IMAGES["sante-senior"];
const imageForArticle = (slug: string, category: string) =>
  BLOG_IMAGES[slug] ?? imageFor(category);

const ARTICLE_LIMIT = 120;
export const ARTICLES: Article[] = tpl.slice(0, ARTICLE_LIMIT).map((t, i) => {
  const slug = slugify(t.title);
  const pub = new Date(BASE_DATE - i * DAY * 2).toISOString();
  const upd = new Date(BASE_DATE - i * DAY).toISOString();
  return {
    slug,
    title: t.title,
    metaDescription: t.meta,
    excerpt: t.meta,
    category: t.category,
    tags: t.tags,
    author: AUTHORS[i % AUTHORS.length],
    publishedAt: pub,
    updatedAt: upd,
    readingMinutes: 5 + ((i * 3) % 8),
    image: imageForArticle(slug, t.category),
    imageAlt: t.title,
    intro: `${t.meta} Dans ce guide, les experts ${"Pro-Tection"} décryptent les enjeux concrets, les démarches à connaître et les solutions adaptées à votre profil de senior.`,
    sections: t.sections,
    faq: t.faq,
  };
});

export const getArticleBySlug = (slug: string) => ARTICLES.find((a) => a.slug === slug);
export const getArticlesByCategory = (cat: string) => ARTICLES.filter((a) => a.category === cat);
export const getRelated = (slug: string, limit = 3) => {
  const a = getArticleBySlug(slug);
  if (!a) return [];
  return ARTICLES.filter((x) => x.slug !== slug && x.category === a.category).slice(0, limit);
};
export const getCategoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
