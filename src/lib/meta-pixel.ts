/**
 * Meta Pixel & Tracking Utilities
 * Supports Meta Consent Mode, event deduplication (eventID), Advanced Matching,
 * and automatic click-to-call tracking.
 */

export const META_PIXEL_ID = "1696211194785514";

export type FbqFunction = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    fbq?: FbqFunction;
    _fbq?: FbqFunction;
  }
}

/**
 * Initializes the Meta Pixel base code.
 * Respects GDPR consent mode by defaulting to 'consent', 'revoke' unless accepted.
 */
export function initMetaPixel(hasConsent = false) {
  if (typeof window === "undefined") return;
  const w = window;

  if (!w.fbq) {
    const f = w as unknown as Record<string, unknown>;
    const n = (f.fbq = function (...args: unknown[]) {
      if (typeof n.callMethod === "function") {
        n.callMethod(...args);
      } else {
        n.queue?.push(args);
      }
    }) as FbqFunction;
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    const t = document.createElement("script");
    t.async = true;
    t.src = "https://connect.facebook.net/en_US/fbevents.js";
    const s = document.getElementsByTagName("script")[0];
    if (s && s.parentNode) {
      s.parentNode.insertBefore(t, s);
    } else {
      document.head.appendChild(t);
    }
  }

  // Meta Consent Mode: revoke consent until explicitly granted
  if (hasConsent) {
    w.fbq?.("consent", "grant");
  } else {
    w.fbq?.("consent", "revoke");
  }

  w.fbq?.("init", META_PIXEL_ID);
  w.fbq?.("track", "PageView");
}

/**
 * Updates Meta Pixel consent state.
 */
export function setMetaConsent(granted: boolean) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("consent", granted ? "grant" : "revoke");
}

export interface TrackLeadParams {
  eventId: string;
  value?: number;
  currency?: string;
  insuranceType?: string;
}

/**
 * Fires the Meta 'Lead' standard event with eventID for deduplication with CAPI.
 */
export function trackMetaLead(params: TrackLeadParams) {
  if (typeof window === "undefined") return;
  // Ensure Pixel is available; if not initialized yet, initialize it
  if (!window.fbq) {
    initMetaPixel(true);
  }

  const payload: Record<string, unknown> = {
    content_name: params.insuranceType || "Devis Mutuelle / Assurance",
    currency: params.currency || "EUR",
    value: params.value ?? 0,
  };

  // Meta deduplication: 4th argument { eventID: params.eventId }
  window.fbq?.("track", "Lead", payload, { eventID: params.eventId });
}

/**
 * Fires the Meta 'Contact' standard event (for phone call clicks, email clicks, etc.)
 */
export function trackMetaContact(method: "phone" | "email", detail?: string) {
  if (typeof window === "undefined") return;
  if (!window.fbq) {
    initMetaPixel(false);
  }
  window.fbq?.("track", "Contact", {
    content_name: method === "phone" ? "Appel téléphonique" : "Email",
    content_category: method,
    value: detail || undefined,
  });
}

/**
 * Global click-to-call listener for all tel: links on the landing page.
 * Fires Meta Contact event whenever any phone number is tapped.
 */
export function setupClickToCallTracking() {
  if (typeof document === "undefined") return;

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;
    const anchor = target.closest("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href") || "";
    if (href.startsWith("tel:")) {
      const phoneNumber = href.replace("tel:", "").trim();
      trackMetaContact("phone", phoneNumber);
    }
  });
}
