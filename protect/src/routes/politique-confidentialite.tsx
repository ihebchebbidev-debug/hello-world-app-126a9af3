import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/lib/utils";

export const Route = createFileRoute("/politique-confidentialite")({
  head: () => ({
    meta: [
      { title: `Politique de confidentialité — ${SITE.name}` },
      { name: "description", content: `Politique de confidentialité ${SITE.name} : finalités, base légale, durée de conservation, droits RGPD, sécurité, DPO, recours CNIL.` },
      { property: "og:title", content: `Politique de confidentialité — ${SITE.name}` },
      { property: "og:description", content: `Comment ${SITE.name} traite et protège vos données personnelles. Vos droits RGPD.` },
      { property: "og:url", content: "/politique-confidentialite" },
    ],
    links: [{ rel: "canonical", href: "/politique-confidentialite" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero title="Politique de confidentialité" crumbs={[{ label: "Confidentialité" }]} />
      <section className="container mx-auto px-4 lg:px-8 max-w-3xl pb-24 text-foreground/90 leading-relaxed">
        <p className="text-sm text-muted-foreground mt-6">Dernière mise à jour : 1er juin 2026</p>

        <p className="mt-4">
          {SITE.name} s'engage à protéger vos données personnelles et à respecter votre vie privée.
          La présente politique de confidentialité définit et vous informe de la manière dont {SITE.name}
          utilise et protège les informations que vous nous transmettez, le cas échéant, lorsque vous
          utilisez le présent site (ci-après le « Site »).
        </p>
        <p className="mt-3">
          Veuillez noter que cette politique est susceptible d'être modifiée ou complétée à tout moment
          par {SITE.name}, notamment en vue de se conformer à toute évolution législative, règlementaire,
          jurisprudentielle ou technologique. La date de mise à jour sera clairement identifiée en tête
          de la présente politique.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-3">Sommaire</h2>
        <ol className="list-decimal pl-6 space-y-1">
          <li><a href="#donnees-personnelles" className="text-primary hover:underline">Données personnelles</a></li>
          <li><a href="#base-legale" className="text-primary hover:underline">Base légale des traitements</a></li>
          <li><a href="#securite" className="text-primary hover:underline">Sécurité et hébergement</a></li>
          <li><a href="#dpo" className="text-primary hover:underline">Délégué à la protection des données (DPO)</a></li>
          <li><a href="#demarchage" className="text-primary hover:underline">Démarchage téléphonique (Bloctel)</a></li>
          <li><a href="#mineurs" className="text-primary hover:underline">Données des mineurs</a></li>
          <li><a href="#profilage" className="text-primary hover:underline">Profilage et décisions automatisées</a></li>
          <li><a href="#cookies" className="text-primary hover:underline">Politique relative aux cookies</a></li>
        </ol>

        <h2 id="donnees-personnelles" className="text-2xl font-bold mt-12 mb-3">I. Données personnelles</h2>
        <p>
          D'une manière générale, il vous est possible de visiter le Site de {SITE.name} sans communiquer
          aucune information personnelle vous concernant. Vous n'êtes en aucune manière obligé de transmettre
          ces informations à {SITE.name}.
        </p>
        <p className="mt-3">
          Néanmoins, en cas de refus, il se peut que vous ne puissiez pas bénéficier de certaines informations
          ou services que vous avez demandés. {SITE.name} peut être amené à vous demander de renseigner vos nom,
          prénom, adresse email, numéro de téléphone, âge, ville, type d'assurance recherchée (ci-après vos
          « Informations Personnelles »). En fournissant ces informations, vous acceptez expressément qu'elles
          soient traitées par {SITE.name}, aux fins indiquées au point 2 ci-dessous ainsi qu'aux fins rappelées
          à la fin de chaque formulaire.
        </p>
        <p className="mt-3">
          Conformément au Règlement Général sur la Protection des Données (RGPD) adopté par le Parlement
          européen le 14 avril 2016, et à la Loi Informatique et Libertés du 6 janvier 1978 modifiée,
          {" "}{SITE.name} vous informe des points suivants.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-2">1. Identité du responsable du traitement</h3>
        <p>
          Le responsable du traitement est {SITE.name}, dont le siège social est situé au {SITE.address}.
          <br />Téléphone : {SITE.phoneDisplay}
          <br />Email : {SITE.email}
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-2">2. Finalités du traitement</h3>
        <p>{SITE.name} est susceptible de traiter vos Informations Personnelles :</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>aux fins de vous fournir les informations ou services demandés (établissement de devis personnalisés en assurance santé, emprunteur, prévoyance et dépendance, rappel téléphonique, envoi de la newsletter) ;</li>
          <li>aux fins de recueillir des informations nous permettant d'améliorer notre Site, nos produits et services (notamment par le biais de cookies) ;</li>
          <li>aux fins de pouvoir vous contacter à propos de différents évènements relatifs à {SITE.name}, incluant notamment la mise à jour de nos offres et le suivi client ;</li>
          <li>aux fins de respecter nos obligations légales et réglementaires en tant qu'intermédiaire en assurance (DDA, LCB-FT, devoir de conseil).</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-2">3. Destinataires</h3>
        <p>
          {SITE.name} est destinataire de vos Informations Personnelles. Celles-ci peuvent être transmises
          à nos compagnies d'assurance partenaires aux seules fins d'établir un devis ou un contrat
          correspondant à votre demande, ainsi qu'à nos sous-traitants techniques (hébergement, envoi
          d'emails, outils d'analyse — voir point 7). Ni {SITE.name}, ni l'un quelconque de ses
          sous-traitants, ne procèdent à la commercialisation des données personnelles des visiteurs et
          Utilisateurs de son Site.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-2">4. Durée de conservation</h3>
        <p>
          Vos Informations Personnelles sont conservées uniquement pour le temps correspondant à la finalité
          de la collecte :
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>3 ans à compter du dernier contact pour les prospects ;</li>
          <li>Durée du contrat majorée des délais de prescription légaux (5 ans) pour les clients souscripteurs ;</li>
          <li>Durées plus longues lorsque des obligations légales l'imposent (notamment LCB-FT : 5 ans).</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-2">5. Droits Informatique et Libertés</h3>
        <p>
          Vous disposez des droits suivants concernant vos Informations Personnelles, que vous pouvez exercer
          en nous écrivant à l'adresse postale mentionnée au point 1 ou par email à {SITE.email}.
        </p>

        <h4 className="font-semibold mt-4">Droit d'accès et de communication des données</h4>
        <p>
          Vous avez la faculté d'accéder aux Informations Personnelles qui vous concernent. En raison de
          l'obligation de sécurité et de confidentialité qui incombe à {SITE.name}, votre demande sera traitée
          sous réserve que vous rapportiez la preuve de votre identité, notamment par la production d'une
          copie signée de votre titre d'identité valide.
        </p>
        <p className="mt-2">
          Modèle de courrier CNIL :{" "}
          <a href="https://www.cnil.fr/fr/modele/courrier/exercer-son-droit-dacces" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            cnil.fr/exercer-son-droit-dacces
          </a>.
        </p>

        <h4 className="font-semibold mt-4">Droit de rectification des données</h4>
        <p>
          Vous pouvez demander la rectification, la mise à jour, le verrouillage ou l'effacement des données
          vous concernant qui peuvent s'avérer inexactes, erronées, incomplètes ou obsolètes. Vous pouvez
          également définir des directives relatives au sort des données après votre décès.
        </p>

        <h4 className="font-semibold mt-4">Droit d'opposition</h4>
        <p>L'exercice de ce droit n'est possible que dans l'une des deux situations suivantes :</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Lorsque l'exercice de ce droit est fondé sur des motifs légitimes ;</li>
          <li>Lorsque l'exercice de ce droit vise à faire obstacle à ce que les données recueillies soient utilisées à des fins de prospection commerciale.</li>
        </ul>

        <h4 className="font-semibold mt-4">Droit à l'effacement et à la portabilité</h4>
        <p>
          Vous pouvez demander l'effacement de vos données dans les limites prévues par la loi, ainsi que la
          portabilité de celles que vous nous avez communiquées, dans un format structuré et couramment utilisé.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-2">6. Délais de réponse</h3>
        <p>
          {SITE.name} s'engage à répondre à votre demande d'accès, de rectification, d'opposition ou toute
          autre demande complémentaire d'informations dans un délai raisonnable qui ne saurait dépasser
          1 mois à compter de la réception de votre demande.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-2">7. Transfert de données hors de l'Union Européenne</h3>
        <p>
          Les données collectées sont traitées prioritairement au sein de l'Union Européenne (UE). Toutefois,
          certains de nos prestataires techniques (hébergement, outils d'envoi d'emails ou d'analyse) peuvent
          transférer des données en dehors de l'UE. Dans ce cas, {SITE.name} garantit que ces transferts sont
          encadrés par des mécanismes de protection juridique validés par la réglementation :
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Soit vers un pays reconnu par la Commission Européenne comme offrant un niveau de protection adéquat ;</li>
          <li>Soit encadrés par la signature des Clauses Contractuelles Types (CCT) de la Commission Européenne, garantissant un niveau de sécurité et de confidentialité équivalent à celui de l'UE.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-2">8. Plainte auprès de l'autorité compétente</h3>
        <p>
          Si vous considérez que {SITE.name} ne respecte pas ses obligations au regard de vos Informations
          Personnelles, vous pouvez adresser une plainte ou une demande auprès de la CNIL :{" "}
          <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            cnil.fr/plaintes
          </a>.
        </p>

        <h2 id="base-legale" className="text-2xl font-bold mt-12 mb-3">II. Base légale des traitements</h2>
        <p>Chaque traitement repose sur l'une des bases légales prévues à l'article 6 du RGPD :</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li><strong>Consentement</strong> (art. 6.1.a) : abonnement à la newsletter, dépôt de cookies non essentiels, communications marketing.</li>
          <li><strong>Mesures précontractuelles</strong> (art. 6.1.b) : établissement d'un devis, demande de rappel, souscription d'un contrat.</li>
          <li><strong>Obligation légale</strong> (art. 6.1.c) : devoir de conseil DDA, LCB-FT, conservation comptable.</li>
          <li><strong>Intérêt légitime</strong> (art. 6.1.f) : amélioration du site, prévention de la fraude, sécurité informatique.</li>
        </ul>

        <h2 id="securite" className="text-2xl font-bold mt-12 mb-3">III. Sécurité et hébergement</h2>
        <p>
          {SITE.name} met en œuvre des mesures techniques et organisationnelles appropriées pour
          protéger vos données contre la perte, l'accès non autorisé, la divulgation ou l'altération :
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>chiffrement TLS 1.2+ pour toutes les communications avec le site ;</li>
          <li>cloisonnement strict des bases de données et des sauvegardes chiffrées ;</li>
          <li>politique de mots de passe forts et authentification renforcée des collaborateurs ;</li>
          <li>journalisation des accès et revue régulière des habilitations ;</li>
          <li>contrôle d'accès des sous-traitants par contrats de sous-traitance conformes à l'art. 28 RGPD.</li>
        </ul>
        <p className="mt-3">
          Les serveurs hébergeant le site sont localisés au sein de l'Union européenne (Cloudflare —
          réseau européen). Les bases de données opérationnelles sont également hébergées dans l'UE.
        </p>

        <h2 id="dpo" className="text-2xl font-bold mt-12 mb-3">IV. Délégué à la protection des données</h2>
        <p>
          Pour toute question relative au traitement de vos données ou pour exercer vos droits,
          contactez notre Délégué à la Protection des Données :
        </p>
        <p className="mt-2">
          <strong>Email :</strong>{" "}
          <a href={`mailto:dpo@${SITE.email.split("@")[1]}`} className="text-primary hover:underline">
            dpo@{SITE.email.split("@")[1]}
          </a><br />
          <strong>Courrier :</strong> DPO {SITE.name} — {SITE.address}
        </p>
        <p className="mt-2">
          Nous répondons à toute demande dans un délai d'un mois, prolongeable de deux mois en cas
          de complexité particulière.
        </p>

        <h2 id="demarchage" className="text-2xl font-bold mt-12 mb-3">V. Démarchage téléphonique — Bloctel</h2>
        <p>
          Conformément à l'article L.223-1 du Code de la consommation, vous avez la possibilité de
          vous inscrire gratuitement sur la liste d'opposition au démarchage téléphonique sur{" "}
          <a href="https://www.bloctel.gouv.fr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            bloctel.gouv.fr
          </a>. Cette inscription ne s'applique pas aux relations contractuelles préexistantes ni aux
          demandes de rappel que vous nous adressez.
        </p>
        <p className="mt-3">
          {SITE.name} respecte strictement la réglementation sur le démarchage en assurance (loi
          n° 2023-379 du 19 mai 2023) : appels uniquement après recueil de votre consentement
          préalable, exprès et spécifique, et dans les plages horaires autorisées.
        </p>

        <h2 id="mineurs" className="text-2xl font-bold mt-12 mb-3">VI. Données des mineurs</h2>
        <p>
          Le site et nos services s'adressent exclusivement à des personnes majeures. Nous ne
          collectons pas sciemment de données concernant des mineurs de moins de 15 ans. Si vous
          constatez qu'un mineur nous a transmis des données, contactez-nous afin que nous procédions
          à leur suppression sans délai.
        </p>

        <h2 id="profilage" className="text-2xl font-bold mt-12 mb-3">VII. Profilage et décisions automatisées</h2>
        <p>
          Pour vous proposer un devis adapté, {SITE.name} peut être amené à analyser certaines
          informations que vous nous transmettez (âge, code postal, situation familiale, besoins de
          couverture). Cette analyse n'aboutit jamais à une décision entièrement automatisée produisant
          des effets juridiques à votre égard au sens de l'article 22 du RGPD : un conseiller humain
          intervient systématiquement avant toute proposition contractuelle. Vous pouvez à tout moment
          demander un réexamen humain ou contester l'analyse réalisée.
        </p>

        <h2 id="cookies" className="text-2xl font-bold mt-12 mb-3">VIII. Politique relative aux cookies</h2>
        <p>
          Lors de votre première connexion sur le site de {SITE.name}, vous êtes averti par un bandeau que
          des informations relatives à votre navigation sont susceptibles d'être enregistrées dans des
          fichiers dénommés « cookies ». Notre politique d'utilisation des cookies vous permet de mieux
          comprendre les dispositions que nous mettons en œuvre en matière de navigation.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-2">1. Informations générales sur les cookies</h3>
        <p>
          Les « cookies » sont des petits fichiers texte de taille limitée qui nous permettent de reconnaître
          votre ordinateur, votre tablette ou votre mobile aux fins de personnaliser les services que nous
          vous proposons. Les informations recueillies par le biais des cookies ne permettent en aucune
          manière de vous identifier nominativement. Elles sont utilisées exclusivement pour nos besoins
          propres afin d'améliorer l'interactivité et la performance de notre site.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-2">2. Configuration de vos préférences</h3>
        <h4 className="font-semibold mt-4">a. Cookies exemptés de consentement</h4>
        <p>
          Conformément aux recommandations de la CNIL, certains cookies sont dispensés du recueil préalable
          de votre consentement dans la mesure où ils sont strictement nécessaires au fonctionnement du site
          (identifiant de session, authentification, équilibrage de charge, personnalisation de votre interface).
        </p>

        <h4 className="font-semibold mt-4">b. Cookies nécessitant le recueil préalable de votre consentement</h4>
        <p>
          Cette exigence concerne les cookies de mesure d'audience et les cookies de partage de réseaux sociaux.
          De tels cookies étant émis par des tiers, leur utilisation et leur dépôt sont soumis à leurs propres
          politiques de confidentialité.
        </p>

        <h4 className="font-semibold mt-4">c. Paramétrage de votre navigateur</h4>
        <p>
          Chaque navigateur Internet propose ses propres paramètres de gestion des cookies :
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li><a href="https://support.google.com/chrome/answer/95647?hl=fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Chrome</a></li>
          <li><a href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Firefox</a></li>
          <li><a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
          <li><a href="https://support.microsoft.com/fr-fr/microsoft-edge" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Edge</a></li>
        </ul>
        <p className="mt-3">
          Pour de plus amples informations :{" "}
          <a href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            cnil.fr/cookies-les-outils-pour-les-maitriser
          </a>.
        </p>

        <p className="mt-8 text-sm text-muted-foreground">
          Le refus du dépôt de cookies sur votre terminal est susceptible d'altérer votre expérience
          d'utilisateur ainsi que votre accès à certains services ou fonctionnalités du présent site.
        </p>
      </section>
    </>
  );
}
