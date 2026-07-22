// Sitemap dynamic route — serves XML at /sitemap.xml
import { createFileRoute } from "@tanstack/react-router";
import { ARTICLES } from "@/lib/blog-data";

const STATIC_PATHS = [
  "/", "/a-propos", "/contact", "/assurance-sante", "/assurance-emprunteur",
  "/prevoyance", "/dependance", "/devis", "/faq", "/temoignages",
  "/partenaires", "/blog",
  "/mentions-legales", "/politique-confidentialite", "/cookies",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const base = `${url.protocol}//${url.host}`;
        const today = new Date().toISOString().split("T")[0];
        const urls = [
          ...STATIC_PATHS.map((p) => {
            const legal = p === "/mentions-legales" || p === "/politique-confidentialite" || p === "/cookies";
            const changefreq = p === "/" ? "daily" : p === "/blog" ? "daily" : legal ? "yearly" : "weekly";
            return { loc: base + p, lastmod: today, changefreq, priority: p === "/" ? "1.0" : legal ? "0.3" : "0.8" };
          }),
          ...ARTICLES.map((a) => ({ loc: `${base}/blog/${a.slug}`, lastmod: a.updatedAt.split("T")[0], changefreq: "monthly", priority: "0.6" })),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority><xhtml:link rel="alternate" hreflang="fr-FR" href="${u.loc}"/></url>`).join("\n")}
</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
      },
    },
  },
});
