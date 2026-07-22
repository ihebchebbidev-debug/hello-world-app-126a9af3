import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/HomePage";
import { SITE } from "@/lib/utils";
import heroUrl from "@/assets/hero-family.jpg";

const SITE_URL = "https://www.pro-tection.fr";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.name} — Mutuelle Senior, Assurance Emprunteur & Prévoyance après 60 ans` },
      { name: "description", content: "Courtier spécialiste mutuelle senior, assurance emprunteur loi Lemoine, prévoyance obsèques et dépendance. +10 000 seniors accompagnés depuis 2013. Devis gratuit en 2 min, économies jusqu'à 40%." },
      { name: "keywords", content: "mutuelle senior, mutuelle santé senior, mutuelle 60 ans, mutuelle 65 ans, mutuelle 70 ans, comparateur mutuelle senior, meilleure mutuelle senior, mutuelle senior pas chère, complémentaire santé senior, assurance emprunteur senior, loi Lemoine, assurance prêt immobilier senior, prévoyance senior, assurance obsèques, contrat obsèques, capital décès, assurance dépendance, perte d'autonomie, courtier assurance senior, devis mutuelle gratuit, résiliation infra-annuelle" },
      { property: "og:title", content: `${SITE.name} — Mutuelle Senior & Assurance après 60 ans` },
      { property: "og:description", content: "Le courtier spécialiste de l'assurance santé, emprunteur et prévoyance après 60 ans. Devis gratuit en 2 min." },
      { property: "og:url", content: `${SITE_URL}/` },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
      { rel: "preload", as: "image", href: heroUrl, fetchpriority: "high" },
    ],
  }),
  component: HomePage,
});
