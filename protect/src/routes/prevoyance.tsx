import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ProductLanding } from "@/components/site/ProductLanding";
import { SITE } from "@/lib/utils";
import img from "@/assets/cat-prevoyance.jpg";

export const Route = createFileRoute("/prevoyance")({
  head: () => ({
    meta: [
      { title: `Prévoyance & Obsèques Senior — ${SITE.name} | Protégez vos proches` },
      { name: "description", content: "Assurance prévoyance et contrat obsèques senior : capital décès garanti, rente conjoint, sans questionnaire médical. Devis gratuit dès 60, 70, 80 ans." },
      { name: "keywords", content: "prévoyance senior, assurance prévoyance senior, assurance obsèques, contrat obsèques senior, assurance décès senior, capital décès, rente conjoint survivant, garantie obsèques, assurance obsèques sans questionnaire médical, contrat obsèques prestations, meilleure assurance obsèques, tarif assurance obsèques, assurance obsèques 70 ans, assurance obsèques 80 ans, protection famille senior" },
      { property: "og:title", content: "Prévoyance Senior" },
      { property: "og:description", content: "Capital décès et obsèques : épargnez vos proches d'un fardeau financier." },
      { property: "og:url", content: "/prevoyance" },
      { property: "og:image", content: img },
    ],
    links: [{ rel: "canonical", href: "/prevoyance" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Service",
            serviceType: "Prévoyance & Obsèques Senior",
            name: "Assurance prévoyance et obsèques senior",
            description: "Capital décès, assurance obsèques et rente conjoint pour protéger vos proches.",
            provider: { "@type": "InsuranceAgency", name: SITE.name },
            areaServed: { "@type": "Country", name: "France" },
            audience: { "@type": "PeopleAudience", suggestedMinAge: 50 },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Accueil", item: "/" },
              { "@type": "ListItem", position: 2, name: "Prévoyance", item: "/prevoyance" },
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
      <PageHero eyebrow="Prévoyance" title="Protégez ceux qui comptent pour vous" subtitle="Capital décès, assurance obsèques, rente conjoint : anticipez pour préserver votre famille des charges financières." crumbs={[{ label: "Prévoyance" }]} />
      <ProductLanding
        title="Une prévoyance senior simple et sereine"
        intro="En France, des obsèques coûtent en moyenne 4 500 €. Une assurance prévoyance permet de protéger vos proches : capital versé rapidement, organisation prise en charge, formalités allégées dans un moment difficile."
        image={img}
        quoteType="Prévoyance & obsèques"
        benefits={[
          { title: "Capital garanti à vie", desc: "Versement immédiat aux bénéficiaires désignés, sans succession." },
          { title: "Sans questionnaire médical", desc: "Acceptation garantie jusqu'à 85 ans selon les formules." },
          { title: "Cotisations fixées à vie", desc: "Aucune augmentation liée à l'âge ou à votre état de santé." },
          { title: "Organisation des obsèques", desc: "Service d'assistance dédié, 24h/24, pour soulager la famille." },
          { title: "Rente conjoint", desc: "Capital ou rente mensuelle pour maintenir le niveau de vie du conjoint." },
          { title: "Fiscalité avantageuse", desc: "Capital exonéré jusqu'à 152 500 € par bénéficiaire (art. 990 I CGI)." },
        ]}
        coverage={[
          "Capital décès toutes causes (de 3 000 € à 50 000 €)",
          "Prise en charge intégrale des frais d'obsèques",
          "Rapatriement du corps en France ou à l'étranger",
          "Accompagnement administratif des proches",
          "Garantie doublée en cas d'accident",
          "Rente éducation pour les petits-enfants (option)",
        ]}
        whyUs={[
          { title: "Conseil personnalisé", desc: "Nous calculons le capital nécessaire selon votre situation familiale." },
          { title: "Comparaison transparente", desc: "Tableau clair des garanties, exclusions et délais de carence." },
          { title: "Suivi à vie", desc: "Modifications de bénéficiaires, ajustements de capital : sans frais." },
        ]}
        faq={[
          { q: "À quel âge souscrire ?", a: "Plus tôt = moins cher. Dès 50-55 ans, vous bénéficiez de cotisations très avantageuses, fixées à vie." },
          { q: "Y a-t-il un délai de carence ?", a: "En général 1 an pour le décès par maladie. Aucun délai pour le décès accidentel." },
          { q: "Que devient le capital si je n'ai pas désigné de bénéficiaire ?", a: "Il rejoint la succession et perd l'avantage fiscal. Nous vous aidons à rédiger une clause optimale." },
        ]}
      />
    </>
  );
}
