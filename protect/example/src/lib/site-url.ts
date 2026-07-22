import { createIsomorphicFn } from "@tanstack/react-start";

/**
 * Resolves the absolute origin of the current request.
 *
 * Uses `createIsomorphicFn` so the server implementation (and its server-only
 * import) is stripped from the client bundle:
 *  - On the client it returns `window.location.origin`.
 *  - During SSR it reads the incoming request URL (honouring
 *    `x-forwarded-proto` / `x-forwarded-host` behind proxies) so that Open
 *    Graph / canonical tags and share links are emitted as absolute URLs.
 *    This is what allows social networks and messaging apps to render rich
 *    link previews when a blog post URL is shared.
 */
export const getRequestOrigin = createIsomorphicFn()
  .client(() => window.location.origin)
  .server(async () => {
    try {
      const { getRequestUrl } = await import("@tanstack/react-start/server");
      return new URL(getRequestUrl()).origin;
    } catch {
      return "";
    }
  });

/** Prefix a root-relative path with an origin to produce an absolute URL. */
export function toAbsoluteUrl(origin: string, path: string): string {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  if (!origin) return path;
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Build BreadcrumbList structured data (schema.org) for a route.
 *
 * Pass the request origin (from `getRequestOrigin`) so every `item` URL is
 * absolute — Google prefers absolute URLs for breadcrumb rich results. Items
 * are ordered from the site root to the current page.
 */
export function buildBreadcrumbLd(
  origin: string,
  items: { name: string; path: string }[],
) {
  return {
    type: "application/ld+json" as const,
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        item: toAbsoluteUrl(origin, it.path),
      })),
    }),
  };
}
