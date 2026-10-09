import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { loadMetaPixel } from "@/components/CookieConsent";

export const Route = createFileRoute("/thankyou")({
  component: ThankYou,
});

function ThankYou() {
  React.useEffect(() => {
    // Only fire Lead event if user has consented to cookies
    const consent = localStorage.getItem("neo_cookie_consent");
    if (consent !== "accepted") return;

    // Ensure the pixel is loaded (might not be if user navigated directly)
    loadMetaPixel();

    // Wait for fbevents.js to fully load, then fire Lead
    const fire = () => {
      if (typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "Lead");
      }
    };

    // If fbq is already available, fire immediately; otherwise poll briefly
    if (typeof (window as any).fbq === "function") {
      fire();
    } else {
      const interval = setInterval(() => {
        if (typeof (window as any).fbq === "function") {
          clearInterval(interval);
          fire();
        }
      }, 100);
      // Stop polling after 5 seconds
      setTimeout(() => clearInterval(interval), 5000);
    }
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Merci&nbsp;!</h1>
      <p className="mt-4 text-lg text-foreground/80">Votre demande a bien été envoyée. Nous vous rappelons rapidement.</p>
      <div className="mt-8">
        <Link to="/" className="rounded-md bg-brand-red px-6 py-3 text-white">Retour à l'accueil</Link>
      </div>
    </main>
  );
}
