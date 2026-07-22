import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ProductLanding } from "@/components/site/ProductLanding";
import { SITE } from "@/lib/utils";
import img from "@/assets/cat-emprunteur.jpg";

export const Route = createFileRoute("/assurance-emprunteur")({
  head: () => ({
    meta: [
      { title: `Assurance Emprunteur Senior — ${SITE.name} | Économisez jusqu'à 15 000€` },
      { name: "description", content: "Assurance emprunteur après 50, 60, 65 ans : économisez jusqu'à 15 000€ sur votre prêt immobilier grâce à la loi Lemoine. Devis délégation d'assurance gratuit en 2 min." },
      { name: "keywords", content: "assurance emprunteur senior, assurance emprunteur après 50 ans, assurance emprunteur 60 ans, assurance emprunteur 65 ans, assurance prêt immobilier senior, loi Lemoine senior, délégation d'assurance emprunteur, changer assurance emprunteur, assurance de prêt senior, quotité assurance emprunteur, assurance emprunteur avec problème de santé, questionnaire médical prêt, assurance emprunteur pas cher, comparateur assurance emprunteur, résiliation assurance emprunteur" },
      { property: "og:title", content: "Assurance Emprunteur Senior" },
      { property: "og:description", content: "Loi Lemoine : changez d'assurance emprunteur à tout moment et économisez." },
      { property: "og:url", content: "/assurance-emprunteur" },
      { property: "og:image", content: img },
    ],
    links: [{ rel: "canonical", href: "/assurance-emprunteur" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Service",
            serviceType: "Assurance Emprunteur Senior",
            name: "Assurance emprunteur après 50 ans",
            description: "Assurance de prêt immobilier pour seniors : loi Lemoine, économies jusqu'à 15 000 €, garanties renforcées.",
            provider: { "@type": "InsuranceAgency", name: SITE.name },
            areaServed: { "@type": "Country", name: "France" },
            audience: { "@type": "PeopleAudience", suggestedMinAge: 50 },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Accueil", item: "/" },
              { "@type": "ListItem", position: 2, name: "Assurance Emprunteur", item: "/assurance-emprunteur" },
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
      <PageHero eyebrow="Emprunteur" title="Économisez sur votre assurance de prêt" subtitle="Loi Lemoine : changez quand vous voulez et économisez jusqu'à 15 000 € sur la durée totale de votre crédit." crumbs={[{ label: "Assurance Emprunteur" }]} />
      <ProductLanding
        title="L'assurance emprunteur qui s'adapte aux seniors"
        intro="Depuis la loi Lemoine de 2022, vous pouvez résilier votre assurance de prêt à tout moment. Pour les seniors, c'est l'opportunité de diviser par 2 ou 3 le coût de votre couverture, sans toucher à votre crédit."
        image={img}
        quoteType="Assurance emprunteur"
        benefits={[
          { title: "Loi Lemoine", desc: "Changez d'assurance à tout moment, sans frais, sans pénalité." },
          { title: "Sans questionnaire jusqu'à 200k€", desc: "Pour les crédits ≤200k€ remboursés avant 60 ans." },
          { title: "Économies jusqu'à 65%", desc: "Sur la cotisation par rapport à l'assurance bancaire." },
          { title: "Couverture renforcée", desc: "Décès, PTIA, IPT, ITT, perte d'emploi optionnelle." },
          { title: "Acceptation 80 ans", desc: "Garanties maintenues jusqu'à 80, voire 85 ans selon assureur." },
          { title: "Process simplifié", desc: "Nous gérons tous les courriers à votre banque, à votre place." },
        ]}
        coverage={[
          "Décès toutes causes",
          "Perte Totale et Irréversible d'Autonomie (PTIA)",
          "Invalidité Permanente Totale (IPT) et Partielle (IPP)",
          "Incapacité Temporaire de Travail (ITT)",
          "Garantie maladies redoutées (cancer, AVC, infarctus)",
          "Prise en charge des affections de longue durée (ALD)",
        ]}
        whyUs={[
          { title: "Analyse comparative", desc: "Nous chiffrons votre économie potentielle dès l'appel." },
          { title: "Gestion clé en main", desc: "Lettres de résiliation, équivalence de garanties, négociation banque." },
          { title: "Conseil indépendant", desc: "+15 assureurs spécialisés, nous choisissons selon votre profil santé." },
        ]}
        faq={[
          { q: "Puis-je changer même si mon prêt date d'avant 2022 ?", a: "Oui, la loi Lemoine s'applique à tous les contrats en cours, quelle que soit la date de souscription." },
          { q: "Quelle économie peut-on espérer ?", a: "En moyenne entre 5 000 € et 15 000 € sur la durée résiduelle du prêt pour un emprunteur de +55 ans." },
          { q: "La banque peut-elle refuser ?", a: "Non, dès lors que le nouveau contrat présente une équivalence de garanties. La banque a 10 jours pour répondre." },
        ]}
      />
    </>
  );
}
