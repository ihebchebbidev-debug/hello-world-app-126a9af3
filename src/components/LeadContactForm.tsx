import { useState, type FormEvent } from "react";

const EMPTY_LEAD_FIELDS = {
  age: "",
  marital_status: "",
  city: "",
  postal_code: "",
  insurance_type: "",
  current_insurer: "",
  budget_max: "",
  preferred_contact: "",
  preferred_time: "",
  message: "",
};

const field =
  "w-full rounded-md border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30";

export function LeadContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload: Record<string, unknown> = { ...EMPTY_LEAD_FIELDS };
    fd.forEach((v, k) => {
      payload[k] = v;
    });
    const fullName = String(payload.full_name ?? "").trim();
    const firstName = String(payload.first_name ?? "").trim();
    const phone = String(payload.phone ?? "").trim();
    const email = String(payload.email ?? "").trim();
    if (fullName.length < 2) {
      setError("Veuillez indiquer votre nom.");
      return;
    }
    if (firstName.length < 2) {
      setError("Veuillez indiquer votre prénom.");
      return;
    }
    if (!/^[+0-9 ().-]{6,30}$/.test(phone)) {
      setError("Numéro de téléphone invalide.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Adresse email invalide.");
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
      form.reset();
      if (typeof window !== "undefined") {
        window.location.href = "/thankyou/";
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'envoi");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-brand-soft p-6 sm:p-8 shadow-sm">
      <h3 className="text-lg font-bold tracking-wide text-brand-dark">CONTACTEZ-NOUS</h3>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input name="full_name" required aria-label="Nom" placeholder="Nom *" className={field} />
        <input name="first_name" required aria-label="Prénom" placeholder="Prénom *" className={field} />
        <input name="phone" type="tel" required aria-label="Téléphone" placeholder="Téléphone *" className={field} />
        <input name="email" type="email" required aria-label="Email" placeholder="Email *" className={field} />
      </div>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {success && (
        <p className="mt-4 text-sm text-green-700">
          Merci ! Votre demande a bien été envoyée. Nous vous rappelons rapidement.
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 rounded-md bg-brand-red px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 disabled:opacity-60"
      >
        {loading ? "Envoi…" : "Envoyer ma demande"}
      </button>
    </form>
  );
}
