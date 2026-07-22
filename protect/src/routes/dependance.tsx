import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ProductLanding } from "@/components/site/ProductLanding";
import { SITE } from "@/lib/utils";
import img from "@/assets/cat-dependance.jpg";

export const Route = createFileRoute("/dependance")({
  head: () => ({
    meta: [
      { title: `Assurance Dépendance Senior — ${SITE.name} | Rente à vie en cas de perte d'autonomie` },
      { name: "description", content: "Assurance dépendance senior : rente mensuelle à vie en cas de perte d'autonomie totale ou partielle, capital équipement, aménagement du logement, assistance aidants. Devis gratuit." },
      { name: "keywords", content: "assurance dépendance, assurance dépendance senior, contrat dépendance, perte d'autonomie senior, rente dépendance, GIR 1 2 3 4, APA, aide aux aidants, maintien à domicile senior, EHPAD financement, aménagement logement senior, allocation dépendance, prévoyance dépendance, assurance Alzheimer, assurance longue durée" },
      { property: "og:title", content: "Assurance Dépendance Senior" },
      { property: "og:description", content: "Rente à vie en cas de perte d'autonomie totale ou partielle." },
      { property: "og:url", content: "/dependance" },
      { property: "og:image", content: img },
    ],
    links: [{ rel: "canonical", href: "/dependance" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Service",
            serviceType: "Assurance Dépendance",
            name: "Assurance dépendance senior",
            description: "Rente à vie en cas de perte d'autonomie, capital équipement, assistance aidants.",
            provider: { "@type": "InsuranceAgency", name: SITE.name },
            areaServed: { "@type": "Country", name: "France" },
            audience: { "@type": "PeopleAudience", suggestedMinAge: 55 },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Accueil", item: "/" },
              { "@type": "ListItem", position: 2, name: "Dépendance", item: "/dependance" },
            ],
          },
        ],
      }),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Dépendance" title="Préservez votre autonomie financière" subtitle="Une rente mensuelle versée à vie pour couvrir les frais d'EHPAD, d'aide à domicile ou d'aménagement du logement." crumbs={[{ label: "Dépendance" }]} />
      <ProductLanding
        title="L'assurance dépendance, un filet de sécurité indispensable"
        intro="Le coût moyen d'un EHPAD en France est de 2 200 €/mois, et l'aide à domicile peut atteindre 3 000 €/mois. L'assurance dépendance verse une rente à vie pour ne pas peser sur vos proches et préserver votre patrimoine."
        image={img}
        quoteType="Assurance dépendance"
        benefits={[
          { title: "Rente versée à vie", desc: "De 300 € à 3 000 €/mois selon la formule choisie." },
          { title: "Dépendance totale ET partielle", desc: "Couverture dès les premiers signes (GIR 4 selon formule)." },
          { title: "Capital équipement", desc: "Jusqu'à 5 000 € pour adapter votre logement." },
          { title: "Services d'assistance", desc: "Aide-ménagère, portage de repas, garde de nuit." },
          { title: "Accompagnement des aidants", desc: "Soutien psychologique et formation pour les proches." },
          { title: "Cotisations garanties", desc: "Tarif fixé à la souscription, non revalorisé avec l'âge." },
        ]}
        coverage={[
          "Rente mensuelle à vie en cas de dépendance totale",
          "Demi-rente en cas de dépendance partielle (GIR 3-4)",
          "Capital équipement immédiat (5 000 €)",
          "Services d'assistance à domicile",
          "Aide juridique et administrative",
          "Accompagnement psychologique des proches",
        ]}
        whyUs={[
          { title: "Diagnostic personnalisé", desc: "Nous évaluons votre besoin de rente selon votre patrimoine." },
          { title: "Sélection rigoureuse", desc: "Uniquement des assureurs solides avec versement garanti." },
          { title: "Suivi famille", desc: "Accompagnement de vos proches en cas de déclenchement." },
        ]}
        faq={[
          { q: "À quel âge souscrire ?", a: "Idéalement entre 55 et 70 ans. Plus tard, les tarifs grimpent et certains assureurs refusent." },
          { q: "Comment est évaluée la dépendance ?", a: "Sur la base de la grille AGGIR (GIR 1 à 6) par un médecin-conseil indépendant." },
          { q: "Et si je ne deviens jamais dépendant ?", a: "Selon les formules, les cotisations peuvent être perdues (assurance) ou récupérées partiellement (épargne dépendance)." },
        ]}
      />
    </>
  );
}
