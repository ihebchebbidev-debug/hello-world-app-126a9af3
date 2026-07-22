import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { PHP_API_BASE } from "@/lib/php-api";

const IGNORED_PREFIXES = ["/visitors", "/leads"];

/**
 * Fires once per page view:
 *  - POST /track_visit.php on entry (upserts the visitor, logs the page view)
 *  - navigator.sendBeacon /track_duration.php on exit (records time on page)
 */
export function VisitorTracker() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (IGNORED_PREFIXES.some((p) => pathname.startsWith(p))) return;

    let pageViewId: number | null = null;
    let finished = false;
    const start = Date.now();

    const payload = {
      page_url: window.location.pathname + window.location.search,
      page_title: document.title,
      referrer: document.referrer || null,
    };

    fetch(`${PHP_API_BASE}/track_visit.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    })
      .then((r) => r.json())
      .then((d) => {
        if (d && d.success) pageViewId = d.page_view_id ?? null;
      })
      .catch(() => {});

    const flushDuration = () => {
      if (finished || pageViewId == null) return;
      finished = true;
      const duration = Math.round((Date.now() - start) / 1000);
      const body = JSON.stringify({ page_view_id: pageViewId, duration });
      const url = `${PHP_API_BASE}/track_duration.php`;
      if (navigator.sendBeacon) {
        navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
      } else {
        fetch(url, { method: "POST", body, keepalive: true }).catch(() => {});
      }
    };

    const onHidden = () => {
      if (document.visibilityState === "hidden") flushDuration();
    };

    window.addEventListener("pagehide", flushDuration);
    document.addEventListener("visibilitychange", onHidden);

    return () => {
      flushDuration();
      window.removeEventListener("pagehide", flushDuration);
      document.removeEventListener("visibilitychange", onHidden);
    };
  }, [pathname]);

  return null;
}
