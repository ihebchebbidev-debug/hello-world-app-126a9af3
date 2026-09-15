import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitQuoteRequest } from "@/lib/leads.functions";
import { sendLeadToPhp } from "@/lib/php-api";

const schema = z.object({
  full_name: z.string().trim().min(2, "Nom requis").max(120),
  email: z.string().trim().email("Email invalide"),
  phone: z.string().trim().min(6, "Téléphone requis").max(32),
  city: z.string().trim().max(80).optional(),
  postal_code: z
    .string()
    .trim()
    .max(5)
    .optional()
    .refine((v) => !v || /^[0-9]{4,5}$/.test(v), "Code postal invalide"),
  age_bracket: z.string().optional(),
  gdpr_consent: z.literal(true, {
    errorMap: () => ({ message: "Veuillez accepter pour continuer" }),
  }),
});
type Vals = z.infer<typeof schema>;

export function InlineQuoteForm({
  insuranceType = "Mutuelle santé senior",
  variant = "light",
  cta = "Recevoir mon devis gratuit",
}: {
  insuranceType?: string;
  variant?: "light" | "onPrimary";
  cta?: string;
}) {
  const submit = useServerFn(submitQuoteRequest);
  const [submitted, setSubmitted] = React.useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Vals>({
    resolver: zodResolver(schema),
    defaultValues: { gdpr_consent: false as unknown as true },
  });

  const onSubmit = async (data: Vals) => {
    try {
      const source_page =
        typeof window !== "undefined" ? window.location.pathname : undefined;
      const referrer =
        typeof document !== "undefined" ? document.referrer || undefined : undefined;
      const res = await submit({
        data: { ...data, insurance_type: insuranceType, source_page, referrer, marketing_consent: true },
      });
      sendLeadToPhp({
        full_name: data.full_name,
        phone: data.phone,
        email: data.email,
        city: data.city,
        postal_code: data.postal_code,
        insurance_type: insuranceType,
        message: data.age_bracket ? `Tranche d'âge: ${data.age_bracket}` : undefined,
        source_page,
        referrer,
      });
      if (res?.ok) {
        toast.success("Merci, votre demande a bien été envoyée.", {
          description: "Un conseiller NEOASSUR vous rappelle sous 24h.",
        });
        setSubmitted(true);
        reset();
      } else toast.error(res?.error ?? "Une erreur est survenue.");
    } catch {
      toast.error("Erreur réseau. Merci de réessayer.");
    }
  };

  const fieldCls =
    variant === "onPrimary"
      ? "bg-white/95 text-foreground placeholder:text-foreground/50 border-white/30"
      : "";

  if (submitted) {
    return (
      <div className={`flex flex-col items-center justify-center gap-3 rounded-2xl border p-6 text-center ${variant === "onPrimary" ? "border-white/20 bg-white/10 text-white" : "border-primary/20 bg-primary/5 text-foreground"}`} role="status" aria-live="polite">
        <CheckCircle2 className={`h-10 w-10 ${variant === "onPrimary" ? "text-white" : "text-primary"}`} aria-hidden="true" />
        <div>
          <p className="text-lg font-semibold">Merci, votre demande a bien été envoyée.</p>
          <p className={`mt-1 text-sm ${variant === "onPrimary" ? "text-white/80" : "text-muted-foreground"}`}>
            Un conseiller NEOASSUR vous rappelle sous 24h.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 sm:grid-cols-2" aria-label="Demande de devis">
      <Input className={fieldCls} placeholder="Nom complet *" autoComplete="name" {...register("full_name")} aria-invalid={!!errors.full_name} />
      <Input className={fieldCls} placeholder="Email *" type="email" autoComplete="email" {...register("email")} aria-invalid={!!errors.email} />
      <Input className={fieldCls} placeholder="Téléphone *" type="tel" autoComplete="tel" {...register("phone")} aria-invalid={!!errors.phone} />
      <Input className={fieldCls} placeholder="Code postal" inputMode="numeric" maxLength={5} autoComplete="postal-code" {...register("postal_code")} aria-invalid={!!errors.postal_code} />
      <select
        {...register("age_bracket")}
        aria-label="Tranche d'âge"
        className={`flex h-12 w-full rounded-xl border px-3 text-sm sm:col-span-2 ${
          variant === "onPrimary"
            ? "bg-white/95 text-foreground border-white/30"
            : "bg-background border-input"
        }`}
      >
        <option value="">Tranche d'âge (optionnel)</option>
        <option>- de 55 ans</option>
        <option>55 - 59 ans</option>
        <option>60 - 64 ans</option>
        <option>65 - 69 ans</option>
        <option>70 - 74 ans</option>
        <option>75 - 79 ans</option>
        <option>80 ans et +</option>
      </select>
      <label className={`sm:col-span-2 flex items-start gap-2 text-xs ${variant === "onPrimary" ? "text-white/90" : "text-foreground/80"}`}>
        <input type="checkbox" {...register("gdpr_consent")} className="mt-0.5 h-4 w-4 rounded border-input" />
        <span>
          J'accepte d'être recontacté(e) par un conseiller Pro-Tection conformément
          à la politique de confidentialité. *
        </span>
      </label>
      {errors.gdpr_consent && (
        <p className={`sm:col-span-2 -mt-2 text-xs ${variant === "onPrimary" ? "text-white" : "text-destructive"}`}>
          {errors.gdpr_consent.message as string}
        </p>
      )}
      <div className="sm:col-span-2">
        <Button
          type="submit"
          size="lg"
          variant={variant === "onPrimary" ? "secondary" : "premium"}
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Envoi…" : cta}
        </Button>
        <p className={`mt-2 text-xs text-center ${variant === "onPrimary" ? "text-white/80" : "text-muted-foreground"}`}>
          🔒 Sans engagement · Données 100% confidentielles · Réponse sous 24h
        </p>
      </div>
    </form>
  );
}
