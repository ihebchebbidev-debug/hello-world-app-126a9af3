import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/lib/utils";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: `Mentions légales — ${SITE.name}` },
      { name: "description", content: `Mentions légales du site ${SITE.name}, courtier en assurance.` },
      { name: "robots", content: "noindex, follow" },
      { property: "og:url", content: "/mentions-legales" },
    ],
    links: [{ rel: "canonical", href: "/mentions-legales" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero title="Mentions légales" crumbs={[{ label: "Mentions légales" }]} />
      <section className="container mx-auto px-4 lg:px-8 max-w-3xl pb-24 text-foreground/90 leading-relaxed">
        <p className="mt-6 text-muted-foreground">
          Informations légales et réglementaires concernant le site {SITE.name}.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-3">1. Informations sur le site</h2>
        <p>
          Le site est édité par la société <strong>{SITE.legalName}</strong>, {SITE.legalForm} au capital de{" "}
          <strong>{SITE.capital}</strong>, immatriculée au Registre du Commerce et des Sociétés de {SITE.rcsCity}{" "}
          sous le n° <strong>{SITE.rcs}</strong> (n° de gestion {SITE.rcsNumber}, EUID {SITE.euid}),
          dont le siège social est situé au <strong>{SITE.address}</strong>. Nom commercial : <strong>{SITE.tradeName}</strong>.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Coordonnées</h3>
        <p>
          Adresse : {SITE.address}<br />
          Téléphone : <a href={`tel:${SITE.phone}`} className="text-primary hover:underline">{SITE.phoneDisplay}</a><br />
          Email : <a href={`mailto:${SITE.email}`} className="text-primary hover:underline">{SITE.email}</a>
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Directeur de la publication</h3>
        <p>M. {SITE.president}, Président de {SITE.legalName}.</p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Hébergement</h3>
        <p>
          Le site est hébergé par <strong>Cloudflare, Inc.</strong> — 101 Townsend Street,
          San Francisco, CA 94107, USA.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Informations réglementaires</h3>
        <p>
          {SITE.legalName} est immatriculée au <strong>Registre unique des Intermédiaires en Assurance, Banque et Finance (ORIAS)</strong> sous
          le n° <strong>{SITE.orias}</strong> en qualité de <strong>{SITE.oriasCapacity}</strong> depuis le {SITE.oriasSince} (le registre peut être consulté
          sur{" "}
          <a href="https://www.orias.fr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            le site de l'ORIAS
          </a>
          ) et exerce sous le contrôle de l'<strong>Autorité de Contrôle Prudentiel et de Résolution (ACPR)</strong>{" "}
          — 4 place de Budapest, CS 92459, 75436 Paris Cedex 09.
        </p>
        <p className="mt-3">
          La société est régie par le <strong>Code des Assurances</strong>, sous la classification de
          courtier « dit b », au titre de l'art. L.521-2 du Code des Assurances (la société n'est pas en
          mesure de fonder son analyse sur un nombre suffisant de contrats d'assurance offerts sur le
          marché).
        </p>
        <p className="mt-3">
          <strong>SIREN :</strong> {SITE.siren}<br />
          <strong>Code NAF :</strong> {SITE.naf}<br />
          <strong>Activité :</strong> Courtage d'assurance et intermédiation, gestion de contrats d'assurance
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Assurances et garanties</h3>
        <p>
          La société a souscrit une <strong>assurance responsabilité civile professionnelle</strong> et une{" "}
          <strong>garantie financière</strong> en application des articles L.512-6 et L.512-7 du Code des
          Assurances.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Médiation de la consommation</h3>
        <p>
          Conformément aux articles L.611-1 et suivants du Code de la consommation, en cas de litige non
          résolu de manière amiable avec nos services, le client peut saisir gratuitement le{" "}
          <strong>Médiateur de l'Assurance</strong> — La Médiation de l'Assurance, TSA 50110, 75441 Paris
          Cedex 09 —{" "}
          <a href="https://www.mediation-assurance.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            mediation-assurance.org
          </a>.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-3">2. Propriété intellectuelle</h2>
        <p>
          La présentation et le contenu du site sont protégés par les conventions internationales et toute
          législation applicable en matière de propriété intellectuelle notamment au titre du droit d'auteur
          et du droit des marques ainsi qu'en matière de concurrence déloyale.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Marque et droits</h3>
        <p>
          La dénomination <strong>{SITE.name}</strong> est une marque détenue par la SAS {SITE.name}.
          Le Site et tous les éléments qui le composent (images, logos, textes, charte graphique, etc.)
          sont la propriété exclusive de {SITE.name} et tous les droits de propriété intellectuelle qui y
          sont attachés, y compris le droit de reproduction, appartiennent à {SITE.name}.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">⚠️ Avertissement</h3>
        <p>
          Toute utilisation, reproduction, téléchargement, affichage, mise en ligne, transmission,
          représentation, totale ou partielle, sous quelque forme et par quelque moyen que ce soit, du Site
          ou de l'un quelconque de ses éléments, à des fins et dans des conditions autres que celles
          prévues à l'article L.122-5 du Code de la Propriété Intellectuelle est <strong>interdite</strong>,
          sauf autorisation expresse et préalable de {SITE.name}.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-3">Nous contacter</h2>
        <p>
          Adresse : {SITE.address}<br />
          Téléphone : <a href={`tel:${SITE.phone}`} className="text-primary hover:underline">{SITE.phoneDisplay}</a><br />
          Email : <a href={`mailto:${SITE.email}`} className="text-primary hover:underline">{SITE.email}</a><br />
          ORIAS : n° {SITE.orias} —{" "}
          <a href="https://www.orias.fr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            consulter le registre
          </a>
        </p>
      </section>
    </>
  );
}
