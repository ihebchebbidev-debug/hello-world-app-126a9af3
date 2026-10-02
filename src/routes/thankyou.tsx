import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/thankyou")({
  component: ThankYou,
});

function ThankYou() {
  React.useEffect(() => {
    // Fire Meta Pixel Lead event
    if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "Lead");
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
