import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { LeadCTASection } from "@/components/site/LeadCTASection";
import { SITE } from "@/lib/utils";
import neoliane from "@/assets/partners/neoliane.png";
import april from "@/assets/partners/april.png";
import fma from "@/assets/partners/fma.png";
import assurea from "@/assets/partners/assurea.png";
import c2g from "@/assets/partners/c2g.png";
import spvie from "@/assets/partners/spvie.png";

const PARTNERS = [
  { name: "Néoliane", logo: neoliane },
  { name: "April", logo: april },
  { name: "FMA Assurances", logo: fma },
  { name: "Assurea", logo: assurea },
  { name: "C2G Assurances", logo: c2g },
  { name: "SPVIE Assurances", logo: spvie },
];

export const Route = createFileRoute("/partenaires")({
  head: () => ({
    meta: [
      { title: `Nos partenaires — ${SITE.name} | +25 compagnies d'assurance` },
      { name: "description", content: "Pro-Tection compare +25 compagnies d'assurance leaders pour trouver la meilleure offre adaptée à votre profil senior." },
      { property: "og:title", content: "Partenaires Pro-Tection" },
      { property: "og:description", content: "+25 assureurs partenaires comparés en temps réel." },
      { property: "og:url", content: "/partenaires" },
    ],
    links: [{ rel: "canonical", href: "/partenaires" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Partenaires" title="Nos compagnies d'assurance partenaires" subtitle="Nous comparons en temps réel les meilleurs assureurs pour vous proposer une offre 100% adaptée à votre profil." crumbs={[{ label: "Partenaires" }]} />
      <section className="container mx-auto px-4 lg:px-8 max-w-6xl pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {PARTNERS.map((p) => (
            <div key={p.name} className="rounded-2xl border bg-card p-8 shadow-card grid place-items-center hover:shadow-elegant transition h-40">
              <img src={p.logo} alt={`Logo ${p.name}`} loading="lazy" className="max-h-24 max-w-full object-contain" />
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-foreground/60 mt-8">
          {SITE.name} est immatriculé à l'ORIAS en tant que courtier d'assurance indépendant.
        </p>
      </section>
      <LeadCTASection
        title="Comparez nos partenaires en 2 minutes"
        subtitle="Recevez gratuitement les meilleures offres adaptées à votre profil."
      />
    </>
  );
}
