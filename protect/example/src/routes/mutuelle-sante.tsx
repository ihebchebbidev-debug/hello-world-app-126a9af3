import { createFileRoute } from "@tanstack/react-router";
import {
  ShieldCheck, Percent, CreditCard, Leaf, HeartPulse, CalendarClock,
} from "lucide-react";
import { ProductPage, buildProductJsonLd, type ProductPageData } from "@/components/ProductPage";
import { getRequestOrigin } from "@/lib/site-url";
import productImage from "@/assets/product-sante.jpg";

const data: ProductPageData = {
  eyebrow: "Mutuelle Santé",
  title: "Une mutuelle pensée pour les +60 ans",
  subtitle:
    "Garanties renforcées sur l'optique, le dentaire, l'audition et l'hospitalisation. Sans questionnaire médical.",
  keywords: [
    "mutuelle santé senior",
    "mutuelle +60 ans",
    "mutuelle sans questionnaire médical",
    "comparateur mutuelle senior",
    "remboursement dentaire optique audition",
    "meilleure mutuelle retraité",
    "complémentaire santé senior pas chère",
    "devis mutuelle senior gratuit",
    "mutuelle hospitalisation",
    "tiers payant mutuelle",
  ],
  image: productImage,

  introTitle: "Une couverture santé complète, sans mauvaise surprise",
  introText:
    "Avec l'âge, les besoins en soins évoluent. Notre mutuelle senior couvre les postes les plus coûteux — prothèses dentaires, audioprothèses, hospitalisation — avec des remboursements jusqu'à 400% du tarif de la Sécurité sociale.",
  advantages: [
    { icon: ShieldCheck, title: "Sans questionnaire médical", text: "Aucune sélection ni surprime liée à l'âge ou aux antécédents." },
    { icon: Percent, title: "Remboursements jusqu'à 400%", text: "Dentaire, optique, audition : couverture haut de gamme." },
    { icon: CreditCard, title: "Tiers payant généralisé", text: "Pas d'avance de frais chez +90% des professionnels de santé." },
    { icon: Leaf, title: "Médecines douces incluses", text: "Ostéopathie, acupuncture, sophrologie remboursées." },
    { icon: HeartPulse, title: "Assistance 24/7", text: "Aide-ménagère, garde-malade, téléconsultation incluses." },
    { icon: CalendarClock, title: "Résiliable à tout moment", text: "Loi Châtel et résiliation infra-annuelle, sans frais." },
  ],
  coverageTitle: "Ce qui est couvert",
  coverage: [
    "Hospitalisation : forfait journalier, chambre particulière, dépassements d'honoraires",
    "Dentaire : prothèses, implants, orthodontie adulte",
    "Optique : lunettes, verres progressifs, lentilles, chirurgie réfractive",
    "Audition : appareils auditifs, piles, entretien",
    "Médecine courante : consultations, analyses, radiologie",
    "Pharmacie : médicaments prescrits remboursés ou non par la Sécu",
    "Cures thermales conventionnées",
    "Médecines douces : ostéo, chiro, acupuncture, sophrologie",
  ],
  reasonsTitle: "Pourquoi choisir NEOASSUR ?",
  reasons: [
    { title: "Comparateur indépendant", text: "+25 assureurs partenaires comparés en temps réel selon votre profil." },
    { title: "Conseiller dédié", text: "Un expert humain pour décoder les garanties et négocier votre tarif." },
    { title: "Économies prouvées", text: "En moyenne 312€/an d'économies sur la cotisation annuelle." },
  ],
  faqs: [
    { q: "Quel âge pour souscrire ?", a: "Nos mutuelles seniors sont accessibles dès 55 ans et sans limite d'âge maximum." },
    { q: "Y a-t-il un délai de carence ?", a: "Aucun délai sur les soins courants, l'hospitalisation et l'optique. Le dentaire peut être soumis à 3 mois selon la formule choisie." },
    { q: "Puis-je garder mes médecins habituels ?", a: "Oui, vous gardez une totale liberté de praticien. Nous gérons le tiers payant avec votre carte de mutuelle." },
    { q: "Que se passe-t-il en cas d'hospitalisation ?", a: "Prise en charge directe : aucune avance de frais. La chambre particulière et les dépassements sont couverts selon la formule." },
  ],
};

export const Route = createFileRoute("/mutuelle-sante")({
  loader: async () => ({ origin: await getRequestOrigin() }),
  head: ({ loaderData }) => ({
    meta: [
      { title: "Mutuelle Santé Senior — Garanties renforcées | NEOASSUR" },
      { name: "description", content: "Mutuelle senior +60 ans sans questionnaire médical. Remboursements jusqu'à 400% sur le dentaire, l'optique, l'audition et l'hospitalisation. Devis gratuit en 2 min." },
      { name: "keywords", content: data.keywords!.join(", ") },
      { property: "og:title", content: "Mutuelle Santé Senior — Garanties renforcées | NEOASSUR" },
      { property: "og:description", content: "Couverture santé complète sans questionnaire médical, jusqu'à 400% de remboursement. Devis gratuit." },
      { property: "og:type", content: "product" },
      { property: "og:url", content: "/mutuelle-sante" },
      { property: "og:image", content: productImage },
      { name: "twitter:image", content: productImage },
    ],
    links: [{ rel: "canonical", href: "/mutuelle-sante" }],
    scripts: buildProductJsonLd(data, "/mutuelle-sante", loaderData?.origin ?? ""),
  }),
  component: () => <ProductPage data={data} />,

});
