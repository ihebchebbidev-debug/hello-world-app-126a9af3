import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Phone, Mail, Facebook, Twitter, Linkedin, Instagram,
  HelpCircle, User, Sparkles, Shield, HandCoins, Flower2, CheckCircle2,
  FileText, HandHeart, DollarSign, Headphones, BadgeCheck, ChevronRight,
  Quote, Menu, X, Clock, Users, Handshake, UserCheck,
} from "lucide-react";
import logo from "@/assets/logo.png";
import aboutCouple from "@/assets/about-couple.jpg";
import aboutFamily from "@/assets/about-family.jpg";
import serviceDevis from "@/assets/service-devis.jpg";
import serviceConseiller from "@/assets/service-conseiller.jpg";
import serviceEconomies from "@/assets/service-economies.jpg";
import testimonialAvatar from "@/assets/testimonial-avatar.jpg";
import avisMarie from "@/assets/avis-marie.jpg";
import avisPhilippe from "@/assets/avis-philippe.jpg";
import avisSophie from "@/assets/avis-sophie.jpg";
import avisLaurent from "@/assets/avis-laurent.jpg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import heroMobile1 from "@/assets/hero-mobile-1.jpg";
import heroMobile2 from "@/assets/hero-mobile-2.jpg";
import heroMobile3 from "@/assets/hero-mobile-3.jpg";
import neolianeLogo from "@/assets/partners/neoliane.png";
import aprilLogo from "@/assets/partners/april.png";
import fmaLogo from "@/assets/partners/fma.png";
import c2gLogo from "@/assets/partners/c2g.png";
import assureaLogo from "@/assets/partners/assurea.png";
import spvieLogo from "@/assets/partners/spvie.png";
import ogDefault from "@/assets/og-default.jpg";

const HERO_IMAGES = [hero1, hero2, hero3];
const HERO_MOBILE_IMAGES = [heroMobile1, heroMobile2, heroMobile3];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEOASSUR — Mutuelle santé, assurance emprunteur & obsèques | Devis gratuit" },
      {
        name: "description",
        content:
          "Comparez et économisez jusqu'à 40 % sur votre mutuelle santé, assurance emprunteur et prévoyance obsèques. Devis gratuit en 2 minutes avec un conseiller expert NEOASSUR.",
      },
      {
        name: "keywords",
        content:
          "mutuelle santé, comparateur mutuelle, assurance emprunteur, loi Lemoine, assurance obsèques, prévoyance, complémentaire santé, devis mutuelle gratuit, NEOASSUR",
      },
      { name: "author", content: "NEOASSUR" },
      { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1" },
      { property: "og:title", content: "NEOASSUR — Mutuelle santé & assurance sur mesure" },
      {
        property: "og:description",
        content:
          "Devis gratuit en 2 minutes. Économisez jusqu'à 40 % sur votre mutuelle santé, assurance emprunteur et obsèques avec NEOASSUR.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:site_name", content: "NEOASSUR" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:image", content: ogDefault },
      { property: "og:image:width", content: "1216" },
      { property: "og:image:height", content: "640" },
      { property: "og:image:alt", content: "NEOASSUR — Comparateur mutuelle santé et assurances" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "NEOASSUR — Mutuelle santé & assurance sur mesure" },
      {
        name: "twitter:description",
        content: "Devis gratuit en 2 minutes. Économisez jusqu'à 40 % sur votre mutuelle.",
      },
      { name: "twitter:image", content: ogDefault },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "/#organization",
              name: "NEOASSUR",
              url: "/",
              logo: "/logo.png",
              description:
                "Courtier en assurances spécialisé en mutuelle santé, assurance emprunteur et prévoyance obsèques.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+33-1-78-96-45-92",
                contactType: "customer service",
                areaServed: "FR",
                availableLanguage: ["French"],
              },
            },
            {
              "@type": "WebSite",
              "@id": "/#website",
              url: "/",
              name: "NEOASSUR",
              inLanguage: "fr-FR",
              publisher: { "@id": "/#organization" },
            },
            {
              "@type": "InsuranceAgency",
              name: "NEOASSUR",
              url: "/",
              image: "/logo.png",
              telephone: "+33-1-78-96-45-92",
              priceRange: "€€",
              areaServed: "FR",
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Combien coûte un devis NEOASSUR ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Le devis est 100 % gratuit et sans engagement. Vous l'obtenez en moins de 2 minutes en ligne ou par téléphone.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Combien puis-je économiser sur ma mutuelle santé ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Nos clients économisent en moyenne jusqu'à 40 % sur leur cotisation annuelle en comparant les offres de nos partenaires.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Puis-je changer d'assurance emprunteur à tout moment ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Oui, grâce à la loi Lemoine, vous pouvez résilier et changer votre assurance emprunteur à tout moment, sans frais.",
                  },
                },
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <TopBar />
      <Header />
      <main>
        <Hero />
        <ServicesStrip />
        <About />
        <Stats />
        <ServicesGrid />
        <HowItWorks />
        <Partners />
        <Testimonials />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

/* ---------------- Top bar ---------------- */
function TopBar() {
  return (
    <div className="bg-brand-dark text-white text-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-4 sm:gap-6">
          <a href="tel:+33187665610" className="flex items-center gap-2 hover:text-brand-blue">
            <Phone className="size-3.5 shrink-0 text-brand-red" aria-hidden="true" />
            <span className="truncate">01 87 66 56 10</span>
          </a>
          <a href="mailto:contact@neo-assur.fr" className="hidden items-center gap-2 hover:text-brand-blue sm:flex">
            <Mail className="size-3.5 shrink-0 text-brand-red" aria-hidden="true" />
            contact@neo-assur.fr
          </a>
        </div>
        <div className="flex shrink-0 items-center gap-4 text-white/80">
          <a href="#" aria-label="Facebook" className="hover:text-white"><Facebook className="size-3.5" /></a>
          <a href="#" aria-label="Twitter" className="hover:text-white"><Twitter className="size-3.5" /></a>
          <a href="#" aria-label="LinkedIn" className="hover:text-white"><Linkedin className="size-3.5" /></a>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Header ---------------- */
function Header() {
  const [open, setOpen] = useState(false);
  const nav = [
    { label: "Qui Sommes-Nous ?", href: "#about" },
    { label: "Témoignages", href: "#testimonials" },
    { label: "Partenaires", href: "#partners" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:py-4">
        <a href="/" aria-label="NEOASSUR — Accueil" className="flex shrink-0 items-center">
          <img src={logo} alt="NEOASSUR" className="h-8 w-auto sm:h-9" />
        </a>
        <nav aria-label="Navigation principale" className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <a key={n.label} href={n.href} className="text-sm font-medium text-foreground/80 transition-colors hover:text-brand-red">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href="tel:+33187665610"
            className="hidden items-center gap-2 rounded-md bg-brand-red px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 sm:inline-flex"
          >
            <Phone className="size-4" aria-hidden="true" />
            Nous Appeler
          </a>
          <a
            href="tel:+33187665610"
            aria-label="Appeler NEOASSUR"
            className="inline-flex size-11 items-center justify-center rounded-md bg-brand-red text-white shadow-sm sm:hidden"
          >
            <Phone className="size-5" />
          </a>
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-md border border-border text-brand-dark lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Navigation mobile" className="border-t border-border bg-white lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {nav.map((n) => (
              <li key={n.label}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-3 text-sm font-medium text-foreground/85 hover:bg-brand-soft hover:text-brand-red"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* Desktop full-bleed images (people on right, white on left) */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {HERO_IMAGES.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden
            width={1920}
            height={896}
            className={`absolute inset-0 size-full object-cover object-right transition-opacity duration-1000 ${
              idx === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* White fade from left so text stays perfectly legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 via-40% to-transparent" />
      </div>

      {/* Mobile full-bleed images (people on bottom, white on top) */}
      <div className="pointer-events-none absolute inset-0 lg:hidden">
        {HERO_MOBILE_IMAGES.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden
            width={1024}
            height={1024}
            className={`absolute inset-0 size-full object-cover object-bottom transition-opacity duration-1000 ${
              idx === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 via-35% to-transparent" />
      </div>

      <div className="relative mx-auto grid min-h-[480px] max-w-7xl content-center px-4 pt-10 pb-[55%] sm:pb-[50%] lg:min-h-[520px] lg:grid-cols-2 lg:gap-12 lg:py-16 lg:pb-16">
        <div className="relative z-10 max-w-xl">
          <h1 className="text-3xl font-bold leading-tight text-brand-dark sm:text-4xl lg:text-[52px] lg:leading-[1.05]">
            Votre situation,<br />
            <span className="text-brand-dark/90">Une mutuelle santé<br />sur mesure.</span>
          </h1>
          <div className="mt-6 flex flex-wrap items-start gap-x-8 gap-y-3 lg:mt-8">
            <HeroPoint icon={<HelpCircle className="size-5 text-brand-blue" />} text={["DES CONSEILLERS EXPERTS", "À VOTRE ÉCOUTE"]} />
            <HeroPoint icon={<User className="size-5 text-brand-blue" />} text={["UN ACCOMPAGNEMENT", "PERSONNALISÉ"]} />
            <HeroPoint icon={<Sparkles className="size-5 text-brand-blue" />} text={["LES MEILLEURES OFFRES", "DU MARCHÉ"]} />
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-red px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-red/20 transition hover:brightness-110 hover:shadow-xl"
            >
              Obtenir mon devis gratuit
              <ChevronRight className="size-4" />
            </a>
            <a
              href="tel:+33187665610"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-dark/15 bg-white/80 px-6 py-3.5 text-sm font-semibold text-brand-dark backdrop-blur transition hover:border-brand-blue hover:text-brand-blue"
            >
              <Phone className="size-4" />
              01 87 66 56 10
            </a>
          </div>
          <p className="mt-3 text-xs text-foreground/60">
            Devis en 2 minutes · Sans engagement · Rappel gratuit
          </p>

          {/* Carousel dots */}
          <div className="mt-6 flex items-center gap-2">
            {HERO_IMAGES.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Image ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-8 bg-brand-blue" : "w-2 bg-brand-dark/20 hover:bg-brand-dark/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroPoint({ icon, text }: { icon: React.ReactNode; text: [string, string] }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5">{icon}</div>
      <div className="text-[11px] font-semibold uppercase tracking-wide text-foreground/70">
        <div>{text[0]}</div>
        <div>{text[1]}</div>
      </div>
    </div>
  );
}

/* ---------------- Services strip card ---------------- */
function ServicesStrip() {
  const items = [
    {
      icon: <Shield className="size-7 text-brand-dark" strokeWidth={1.6} />,
      title: "Mutuelle Santé",
      text: ["Des garantis renforcés pour", "votre santé au meilleur prix"],
      to: "/mutuelle-sante" as const,
    },
    {
      icon: <HandCoins className="size-7 text-brand-dark" strokeWidth={1.6} />,
      title: "Assurance Emprunteur",
      text: ["Payer moins cher,", "économisez des milliers d'euros"],
      to: "/assurance-emprunteur" as const,
    },
    {
      icon: <Flower2 className="size-7 text-brand-dark" strokeWidth={1.6} />,
      title: "Assurance Obsèques",
      text: ["Anticipez pour protéger", "vos proches"],
      to: "/assurance-obseques" as const,
    },
  ];
  return (
    <section className="relative -mt-12 bg-brand-soft pt-20 pb-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 divide-y rounded-2xl bg-white shadow-[0_10px_40px_-15px_rgba(3,38,68,0.18)] md:grid-cols-3 md:divide-x md:divide-y-0">
          {items.map((it) => (
            <div key={it.title} className="flex flex-col items-center gap-3 px-6 py-8 text-center">
              <div>{it.icon}</div>
              <h3 className="text-lg font-bold text-brand-dark">{it.title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {it.text[0]}<br />
                <span className="font-semibold text-brand-red">{it.text[1]}</span>
              </p>
              <Link to={it.to} className="mt-1 text-xs font-semibold text-brand-red underline underline-offset-4 hover:no-underline">
                En savoir plus &gt;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */
function About() {
  return (
    <section id="about" className="bg-brand-soft py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
        <div className="relative">
          <img
            src={aboutCouple}
            alt="Couple heureux"
            width={520}
            height={580}
            loading="lazy"
            className="w-[78%] rounded-2xl object-cover shadow-xl"
          />
          <img
            src={aboutFamily}
            alt="Famille souriante"
            width={420}
            height={300}
            loading="lazy"
            className="absolute bottom-[-30px] right-0 w-[62%] rounded-2xl border-4 border-brand-soft object-cover shadow-2xl"
          />
        </div>
        <div>
          <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-red">
            <span className="inline-block size-2 rounded-full bg-brand-red" />
            À propos de nous
          </div>
          <h2 className="text-3xl font-bold leading-tight text-brand-dark sm:text-4xl">
            Votre confiance est<br />notre plus belle réussite
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Depuis plus de 10 ans, Pro-Tection met son expertise et son engagement
            au service de ses clients. Notre priorité : vous offrir un accompagnement
            complet, humain et transparent.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              "Un suivi personnalisé à chaque étape",
              "Des conseillers disponibles et réactifs",
              "Des partenariats solides avec les meilleures compagnies d'assurances",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-blue" />
                <span className="text-foreground/80">{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-brand-blue/30 bg-brand-soft px-4 py-3 shadow-sm">
            <div className="flex size-9 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue">
              <Shield className="size-5" />
            </div>
            <div className="text-xs font-semibold text-brand-dark">
              Un accompagnement complet<br />et humain à chaque étape
            </div>
          </div>
          <div className="mt-7">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md bg-brand-red px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
            >
              Je souhaite être rappelé gratuitement <ChevronRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Stats ---------------- */
function Stats() {
  const stats = [
    { Icon: Clock, value: "10 ans", label: "À nos côtés depuis" },
    { Icon: Users, value: "+10 000", label: "Clients accompagnés\net satisfaits" },
    { Icon: Handshake, value: "+25", label: "Compagnies d'assurances\npartenaires" },
    { Icon: UserCheck, value: "98 %", label: "Clients qui nous\nrecommandent" },
  ];
  return (
    <section className="bg-brand-navy text-white" aria-label="Chiffres clés">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-12 sm:gap-8 md:grid-cols-4">
        {stats.map(({ Icon, value, label }) => (
          <div key={label} className="flex items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-brand-blue/40 text-brand-blue">
              <Icon className="size-6" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="text-2xl font-bold leading-none text-white sm:text-3xl">{value}</div>
              <div className="mt-2 whitespace-pre-line text-xs text-white/75">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Services grid (cards) ---------------- */
function ServicesGrid() {
  const cards = [
    { img: serviceDevis, icon: <FileText className="size-5" />, label: "JE DEMANDE UN DEVIS\nGRATUIT" },
    { img: serviceConseiller, icon: <HandHeart className="size-5" />, label: "J'AI BESOIN\nD'UN CONSEILLER" },
    { img: serviceEconomies, icon: <DollarSign className="size-5" />, label: "VOIR\nLES ÉCONOMIES" },
  ];
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-red">
          <span className="inline-block size-2 rounded-full bg-brand-red" />
          Nos Services
        </div>
        <h2 className="text-3xl font-bold text-brand-dark sm:text-4xl">
          Une expertise complète<br />pour votre tranquillité
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <a
              key={i}
              href="#contact"
              className="group relative mb-8 block rounded-2xl bg-brand-dark shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <img src={c.img} alt="" loading="lazy" className="h-72 w-full rounded-2xl object-cover opacity-95 transition duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-6 bottom-[-24px] rounded-xl bg-white px-4 py-5 text-center shadow-md">
                <div className="absolute left-1/2 top-[-22px] flex size-11 -translate-x-1/2 items-center justify-center rounded-full bg-brand-red text-white shadow-md">
                  {c.icon}
                </div>
                <div className="mt-2 whitespace-pre-line text-[11px] font-bold tracking-wide text-brand-dark">
                  {c.label}
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-16">
          <a href="#contact" className="inline-flex rounded-md bg-brand-red px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110">
            Je souhaite être rappelé gratuitement
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- How it works ---------------- */
function HowItWorks() {
  const steps = [
    { n: "01", title: "Analyse", text: "Nous analysons vos besoins et votre profil" },
    { n: "02", title: "Proposition", text: "Nous vous présentons une offre personnalisée en 24h" },
    { n: "03", title: "Souscription", text: "Souscrivez en ligne en toute simplicité" },
    { n: "04", title: "Gestion", text: "Gérez vos contrats et déclarations en ligne" },
    { n: "05", title: "Assistance", text: "Nous sommes là pour vous, à chaque étape" },
  ];
  return (
    <section className="bg-white pb-20">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <div className="mx-auto mb-4 h-px w-20 bg-brand-blue/60" />
        <h2 className="text-3xl font-bold text-brand-dark sm:text-4xl">Comment ça marche ?</h2>
        <div className="relative mt-14">
          <div className="absolute left-[10%] right-[10%] top-7 hidden h-px bg-border md:block" />
          <div className="grid grid-cols-2 gap-y-10 md:grid-cols-5">
            {steps.map((s) => (
              <div key={s.n} className="relative flex flex-col items-center px-2 text-center">
                <div className="relative z-10 flex size-14 items-center justify-center rounded-full bg-brand-blue text-base font-bold text-white shadow-md">
                  {s.n}
                </div>
                <div className="mt-4 text-base font-bold text-brand-dark">{s.title}</div>
                <p className="mt-2 max-w-[160px] text-[11px] leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14">
          <a href="#contact" className="inline-flex rounded-md bg-brand-red px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110">
            J'obtiens mon devis gratuit
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Partners ---------------- */

const PARTNERS = [
  { name: "Néoliane", src: neolianeLogo },
  { name: "April", src: aprilLogo },
  { name: "FMA Assurances", src: fmaLogo },
  { name: "C2G Assurances", src: c2gLogo },
  { name: "Assurea", src: assureaLogo },
  { name: "SPVIE Assurances", src: spvieLogo },
];

function Partners() {
  return (
    <section id="partners" className="bg-brand-soft py-20">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-red">
          <span className="inline-block size-2 rounded-full bg-brand-red" />
          Nos Partenaires
        </div>
        <h2 className="text-3xl font-bold text-brand-dark sm:text-4xl">
          Des compagnies d'assurances<br />de confiance à nos côtés
        </h2>
        <div className="mt-12 grid grid-cols-2 items-center gap-6 sm:grid-cols-3 md:grid-cols-6">
          {PARTNERS.map((p) => (
            <div key={p.name} className="flex h-24 items-center justify-center rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md">
              <img src={p.src} alt={p.name} className="max-h-full max-w-full object-contain" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
const AVIS = [
  {
    name: "Marie Dubois",
    role: "Cliente depuis 2022",
    avatar: avisMarie,
    text:
      "Un accompagnement remarquable du début à la fin. L'équipe a su m'écouter, comprendre mes besoins et me proposer la mutuelle parfaitement adaptée à ma situation.",
  },
  {
    name: "Philippe Martin",
    role: "Assurance Emprunteur",
    avatar: avisPhilippe,
    text:
      "Grâce à NEOASSUR, j'ai économisé plus de 8 000 € sur mon assurance emprunteur. Conseillers compétents, procédure simple et rapide. Je recommande vivement.",
  },
  {
    name: "Sophie Laurent",
    role: "Mutuelle Santé",
    avatar: avisSophie,
    text:
      "Excellente expérience ! On m'a proposé une mutuelle santé avec de meilleures garanties pour moins cher que ma précédente. Conseillère à l'écoute et très professionnelle.",
  },
  {
    name: "Jon Doe",
    role: "Client satisfait",
    avatar: testimonialAvatar,
    text:
      "Service impeccable et conseillers très réactifs. Ils ont pris le temps de tout m'expliquer en détail. Je me sens enfin bien protégé et en confiance.",
  },
  {
    name: "Laurent Petit",
    role: "Assurance Obsèques",
    avatar: avisLaurent,
    text:
      "Démarche sensible mais accompagnée avec beaucoup d'humanité. Tout a été clair, transparent et sans pression. Mes proches sont désormais protégés.",
  },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % AVIS.length), 6000);
    return () => clearInterval(id);
  }, []);
  const current = AVIS[i];

  return (
    <section id="testimonials" className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-red">
          <span className="inline-block size-2 rounded-full bg-brand-red" />
          Témoignages
        </div>
        <h2 className="text-3xl font-bold text-brand-dark sm:text-4xl">Ce que disent nos clients</h2>

        <div key={current.name} className="mt-14 animate-in fade-in duration-700">
          <img
            src={current.avatar}
            alt={current.name}
            width={80}
            height={80}
            loading="lazy"
            className="mx-auto size-[80px] rounded-full object-cover ring-4 ring-white shadow-md"
          />
          <div className="relative mx-auto mt-6 max-w-2xl px-10">
            <Quote className="absolute left-0 top-0 size-7 -scale-x-100 text-brand-blue" />
            <Quote className="absolute right-0 bottom-0 size-7 text-brand-blue" />
            <p className="text-base leading-relaxed text-foreground/80">{current.text}</p>
            <div className="mt-5 text-sm font-semibold text-brand-dark">{current.name}</div>
            <div className="text-xs text-muted-foreground">{current.role}</div>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2">
            {AVIS.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Avis ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-8 bg-brand-blue" : "w-2 bg-border"
                }`}
              />
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}

/* ---------------- CTA banner ---------------- */
function CtaBanner() {
  return (
    <section className="cta-gradient">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 text-white md:flex-row md:gap-8">
        <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-white/10 ring-4 ring-white/20">
          <Headphones className="size-9 text-brand-blue" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-bold sm:text-2xl">
            Besoin d'un conseil<br className="hidden sm:block" /> ou d'un devis personnalisé ?
          </h3>
          <p className="mt-2 text-xs text-white/70">
            Nos conseillers sont à votre écoute pour vous aider<br className="hidden sm:block" />
            à trouver la solution la plus adaptée à vos besoins.
          </p>
        </div>
        <div className="flex flex-col items-stretch gap-3 sm:flex-row">
          <a href="tel:0187665610" className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-bold text-brand-navy shadow">
            <Phone className="size-4 text-brand-blue" />
            01 87 66 56 10
          </a>
          <a href="#contact" className="inline-flex items-center justify-center rounded-md border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
            Être rappelé gratuitement
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload: Record<string, unknown> = {};
    fd.forEach((v, k) => {
      if (v === "") return;
      payload[k] = v;
    });
    const fullName = String(payload.full_name ?? "").trim();
    const phone = String(payload.phone ?? "").trim();
    if (fullName.length < 2) {
      setError("Veuillez indiquer votre nom.");
      return;
    }
    if (!/^[+0-9 ().-]{6,30}$/.test(phone)) {
      setError("Numéro de téléphone invalide.");
      return;
    }
    payload.source_page = typeof window !== "undefined" ? window.location.href : null;
    payload.referrer = typeof document !== "undefined" ? document.referrer : null;
    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({ success: false, error: "Réponse invalide" }));
      if (!res.ok || !data.success) throw new Error(data.error || "Erreur lors de l'envoi");
      setSuccess(true);
      form.reset();
      if (typeof window !== "undefined") {
        window.scrollTo({ top: (document.getElementById("contact")?.offsetTop ?? 0) - 20, behavior: "smooth" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'envoi");
    } finally {
      setLoading(false);
    }
  }


  const field = "w-full rounded-md border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30";

  return (
    <section id="contact" className="bg-white py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-brand-dark sm:text-3xl">Demandez votre devis gratuit</h2>
          <p className="mt-3 text-sm text-foreground/70">
            Remplissez le formulaire, un expert vous rappelle rapidement et gratuitement.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            {[
              "Devis personnalisé gratuit",
              "Réponse rapide sous 24h",
              "Experts dédiés à votre dossier",
              "Sans engagement",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <BadgeCheck className="size-5 text-brand-blue" />
                <span className="text-foreground/80">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={onSubmit} className="rounded-2xl bg-brand-soft p-6 sm:p-8 shadow-sm">
          <h3 className="text-lg font-bold tracking-wide text-brand-dark">CONTACTEZ-NOUS</h3>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input name="full_name" required aria-label="Nom" placeholder="Nom *" className={field} />
            <input name="first_name" aria-label="Prénom" placeholder="Prénom" className={field} />
            <input name="phone" type="tel" required aria-label="Téléphone" placeholder="Téléphone *" className={field} />
            <input name="email" type="email" aria-label="Email" placeholder="Email" className={field} />
            <input name="age" type="number" min={18} max={120} aria-label="Âge" placeholder="Âge" className={field} />
            <select name="marital_status" aria-label="Situation familiale" className={field} defaultValue="">
              <option value="" disabled>Situation familiale</option>
              <option>Célibataire</option>
              <option>Marié(e)</option>
              <option>Pacsé(e)</option>
              <option>Divorcé(e)</option>
              <option>Veuf(ve)</option>
            </select>
            <input name="city" aria-label="Ville" placeholder="Ville" className={field} />
            <input name="postal_code" inputMode="numeric" aria-label="Code postal" placeholder="Code postal" className={field} />
            <select name="insurance_type" aria-label="Type d'assurance souhaité" className={`${field} sm:col-span-2`} defaultValue="">
              <option value="" disabled>Type d'assurance souhaité</option>
              <option>Mutuelle santé</option>
              <option>Mutuelle senior</option>
              <option>Assurance emprunteur</option>
              <option>Prévoyance</option>
              <option>Obsèques</option>
              <option>TNS / Indépendant</option>
              <option>Autre</option>
            </select>
            <input name="current_insurer" aria-label="Assureur actuel" placeholder="Assureur actuel" className={field} />
            <input name="budget_max" type="number" step="0.01" aria-label="Budget mensuel maximum en euros" placeholder="Budget mensuel max (€)" className={field} />
            <select name="preferred_contact" aria-label="Contact préféré" className={field} defaultValue="">
              <option value="" disabled>Contact préféré</option>
              <option value="phone">Téléphone</option>
              <option value="email">Email</option>
              <option value="sms">SMS</option>
            </select>
            <select name="preferred_time" aria-label="Moment idéal pour être contacté" className={field} defaultValue="">
              <option value="" disabled>Moment idéal</option>
              <option>Matin (9h-12h)</option>
              <option>Après-midi (12h-17h)</option>
              <option>Soir (17h-19h)</option>
            </select>
            <textarea name="message" aria-label="Votre message" placeholder="Votre message" rows={4} className={`${field} sm:col-span-2`} />
          </div>
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          {success && <p className="mt-4 text-sm text-green-700">Merci ! Votre demande a bien été envoyée. Nous vous rappelons rapidement.</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 rounded-md bg-brand-red px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 disabled:opacity-60"
          >
            {loading ? "Envoi…" : "Envoyer ma demande"}
          </button>
        </form>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-8 md:flex-row md:justify-between">
        <img src={logo} alt="NEOASSUR" className="h-8 w-auto brightness-0 invert" />
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/80">
          <Link to="/mentions-legales" className="hover:text-white">Mentions légales</Link>
          <span className="text-white/20" aria-hidden="true">|</span>
          <Link to="/politique-de-confidentialite" className="hover:text-white">Politique de confidentialité</Link>
          <span className="text-white/20" aria-hidden="true">|</span>
          <Link to="/cgu" className="hover:text-white">CGU</Link>
        </nav>
        <div className="flex items-center gap-3 text-white/80">
          <a href="#" aria-label="Facebook" className="flex size-7 items-center justify-center rounded-full border border-white/30 hover:bg-white/10"><Facebook className="size-3.5" /></a>
          <a href="#" aria-label="Instagram" className="flex size-7 items-center justify-center rounded-full border border-white/30 hover:bg-white/10"><Instagram className="size-3.5" /></a>
          <a href="#" aria-label="Twitter" className="flex size-7 items-center justify-center rounded-full border border-white/30 hover:bg-white/10"><Twitter className="size-3.5" /></a>
          <a href="#" aria-label="LinkedIn" className="flex size-7 items-center justify-center rounded-full border border-white/30 hover:bg-white/10"><Linkedin className="size-3.5" /></a>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-[11px] text-white/60">
        Copyright © 2026 NEOASSUR
      </div>
    </footer>
  );
}
