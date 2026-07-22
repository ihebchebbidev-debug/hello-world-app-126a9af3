import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/lib/utils";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: `Gestion des cookies — ${SITE.name}` },
      { name: "description", content: "Politique cookies Pro-Tection : types de cookies utilisés, finalités, durée de conservation, gestion de votre consentement et paramétrage du navigateur." },
      { property: "og:title", content: `Politique des cookies — ${SITE.name}` },
      { property: "og:description", content: "Tout savoir sur les cookies déposés par Pro-Tection et gérer votre consentement." },
      { property: "og:url", content: "/cookies" },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero title="Gestion des cookies" crumbs={[{ label: "Cookies" }]} />
      <section className="container mx-auto px-4 lg:px-8 max-w-3xl pb-24 text-foreground/90 leading-relaxed">
        <p className="text-sm text-muted-foreground mt-6">Dernière mise à jour : 1er juin 2026</p>

        <p className="mt-4">
          La présente politique vous informe sur l'utilisation des cookies et traceurs sur le site
          {" "}{SITE.name}, conformément à la directive ePrivacy, au RGPD et aux recommandations de la
          CNIL (délibération n° 2020-091 du 17 septembre 2020).
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-3">1. Qu'est-ce qu'un cookie ?</h2>
        <p>
          Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette,
          smartphone) lors de la consultation d'un site internet. Il permet au site de mémoriser des
          informations relatives à votre navigation (préférences, identifiant de session, statistiques
          d'utilisation).
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-3">2. Cookies déposés sur ce site</h2>

        <h3 className="text-xl font-semibold mt-6 mb-2">a. Cookies strictement nécessaires (exemptés de consentement)</h3>
        <div className="overflow-x-auto">
          <table className="w-full border text-sm mt-2">
            <thead className="bg-muted/50 text-left">
              <tr><th className="p-2 border">Nom</th><th className="p-2 border">Finalité</th><th className="p-2 border">Durée</th></tr>
            </thead>
            <tbody>
              <tr><td className="p-2 border">session_id</td><td className="p-2 border">Identifiant de session technique</td><td className="p-2 border">Session</td></tr>
              <tr><td className="p-2 border">consent_v1</td><td className="p-2 border">Mémorisation de votre choix de cookies</td><td className="p-2 border">6 mois</td></tr>
              <tr><td className="p-2 border">leads_admin_ok_v1</td><td className="p-2 border">Session de l'espace administrateur (uniquement /leads)</td><td className="p-2 border">Session</td></tr>
              <tr><td className="p-2 border">cf_clearance / __cf_bm</td><td className="p-2 border">Sécurité anti-bot (Cloudflare)</td><td className="p-2 border">30 min – 1 an</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-2">b. Cookies de mesure d'audience (anonymisés)</h3>
        <p>
          Nous utilisons des statistiques d'audience configurées en mode « exempté » (IP anonymisée,
          pas de croisement avec d'autres traitements, pas de transfert hors UE non encadré).
          Ces cookies n'ont pas besoin de votre consentement préalable.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">c. Cookies soumis à consentement</h3>
        <p>
          Aucun cookie publicitaire tiers ni traceur de réseau social n'est déposé sans votre
          consentement explicite et préalable. En l'absence d'action de votre part lors de votre
          première visite, seuls les cookies dispensés de consentement sont déposés.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-3">3. Vos choix : retirer ou modifier votre consentement</h2>
        <p>
          Vous pouvez à tout moment retirer votre consentement aussi facilement que vous l'avez donné,
          en effaçant les cookies de votre navigateur ou en nous écrivant à {" "}
          <a href={`mailto:${SITE.email}`} className="text-primary hover:underline">{SITE.email}</a>.
          Le retrait du consentement n'affecte pas la licéité du traitement effectué avant ce retrait.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-3">4. Paramétrer votre navigateur</h2>
        <p>Chaque navigateur dispose de ses propres paramètres pour gérer les cookies :</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li><a href="https://support.google.com/chrome/answer/95647?hl=fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Apple Safari</a></li>
          <li><a href="https://support.microsoft.com/fr-fr/microsoft-edge" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-3">5. Pour en savoir plus</h2>
        <p>
          Consultez le site de la CNIL :{" "}
          <a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            cnil.fr/cookies-et-autres-traceurs
          </a>.
        </p>
        <p className="mt-3">
          Pour toute question relative à cette politique cookies, contactez-nous à{" "}
          <a href={`mailto:${SITE.email}`} className="text-primary hover:underline">{SITE.email}</a>.
        </p>

        <p className="mt-8 text-sm text-muted-foreground">
          Le refus du dépôt de cookies peut altérer votre expérience d'utilisateur ainsi que l'accès à
          certaines fonctionnalités du site.
        </p>
      </section>
    </>
  );
}
