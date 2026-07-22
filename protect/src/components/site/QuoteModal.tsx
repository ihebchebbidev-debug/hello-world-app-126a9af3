import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { submitQuoteRequest } from "@/lib/leads.functions";
import { sendLeadToPhp } from "@/lib/php-api";

const schema = z.object({
  insurance_type: z.string().min(2),
  full_name: z.string().trim().min(2, "Nom requis").max(120),
  email: z.string().trim().email("Email invalide"),
  phone: z.string().trim().min(6, "Téléphone requis").max(32),
  age: z.string().optional(),
  city: z.string().trim().max(80).optional(),
  postal_code: z
    .string()
    .trim()
    .max(5)
    .optional()
    .refine((v) => !v || /^[0-9]{4,5}$/.test(v), "Code postal invalide"),
  age_bracket: z.string().optional(),
  family_status: z.string().optional(),
  current_insurer: z.string().trim().max(80).optional(),
  budget_max: z.string().optional(),
  preferred_contact: z.enum(["phone", "email", "sms", "whatsapp"]).optional(),
  preferred_time: z.string().optional(),
  coverage_priorities: z.array(z.string()).optional(),
  message: z.string().trim().max(2000).optional(),
  gdpr_consent: z.literal(true, {
    errorMap: () => ({ message: "Veuillez accepter pour continuer" }),
  }),
  marketing_consent: z.boolean().optional(),
});
type FormVals = z.infer<typeof schema>;

export function QuoteModal({
  open,
  onOpenChange,
  defaultType = "Mutuelle santé senior",
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  defaultType?: string;
}) {
  const submit = useServerFn(submitQuoteRequest);
  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm<FormVals>({
    resolver: zodResolver(schema),
    defaultValues: { insurance_type: defaultType, coverage_priorities: [], gdpr_consent: false as unknown as true, marketing_consent: true },
  });

  React.useEffect(() => {
    if (open) reset({ insurance_type: defaultType, coverage_priorities: [], gdpr_consent: false as unknown as true, marketing_consent: true });
  }, [open, defaultType, reset]);

  const onSubmit = async (data: FormVals) => {
    try {
      const ageNum = data.age && data.age.trim() !== "" ? Number(data.age) : undefined;
      const budgetNum = data.budget_max && data.budget_max.trim() !== "" ? Number(data.budget_max) : undefined;
      const source_page =
        typeof window !== "undefined" ? window.location.pathname : undefined;
      const referrer =
        typeof document !== "undefined" ? document.referrer || undefined : undefined;
      const params =
        typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const payload = {
        ...data,
        age: Number.isFinite(ageNum) ? (ageNum as number) : undefined,
        budget_max: Number.isFinite(budgetNum) ? (budgetNum as number) : undefined,
        source_page,
        referrer,
        utm_source: params?.get("utm_source") || undefined,
        utm_medium: params?.get("utm_medium") || undefined,
        utm_campaign: params?.get("utm_campaign") || undefined,
      };
      const res = await submit({ data: payload });
      // Also push to external PHP backend (fire-and-forget)
      sendLeadToPhp({
        full_name: data.full_name,
        phone: data.phone,
        email: data.email,
        age: Number.isFinite(ageNum) ? (ageNum as number) : undefined,
        marital_status: data.family_status,
        city: data.city,
        postal_code: data.postal_code,
        insurance_type: data.insurance_type,
        current_insurer: data.current_insurer,
        budget_max: Number.isFinite(budgetNum) ? (budgetNum as number) : undefined,
        preferred_contact: data.preferred_contact,
        preferred_time: data.preferred_time,
        coverage_priorities: data.coverage_priorities,
        message: data.message,
        source_page,
        referrer,
        utm_source: params?.get("utm_source") || undefined,
        utm_medium: params?.get("utm_medium") || undefined,
        utm_campaign: params?.get("utm_campaign") || undefined,
      });
      if (res?.ok) {
        toast.success("Demande envoyée ! Un conseiller vous rappelle sous 24h.");
        onOpenChange(false);
        reset();
      } else {
        toast.error(res?.error ?? "Une erreur est survenue.");
      }
    } catch {
      toast.error("Erreur réseau. Merci de réessayer.");
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-navy/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[101] w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-background p-6 md:p-8 shadow-elegant max-h-[92vh] overflow-y-auto">
          <Dialog.Title className="sr-only">Demander un devis gratuit</Dialog.Title>
          <button
            onClick={() => onOpenChange(false)}
            aria-label="Fermer"
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-accent"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Devis gratuit en 2 minutes</h2>
              <p className="text-sm text-muted-foreground">Un conseiller vous rappelle sous 24h.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label className="text-xs font-medium text-foreground/70">Type d'assurance</label>
              <select {...register("insurance_type")} className="mt-1 flex h-12 w-full rounded-xl border border-input bg-background px-3 text-sm">
                <option>Mutuelle santé senior</option>
                <option>Assurance emprunteur</option>
                <option>Prévoyance & obsèques</option>
                <option>Assurance dépendance</option>
                <option>Autre</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Nom complet *" {...register("full_name")} aria-invalid={!!errors.full_name} />
              <select {...register("age_bracket")} className="flex h-12 w-full rounded-xl border border-input bg-background px-3 text-sm">
                <option value="">Tranche d'âge</option>
                <option>- de 55 ans</option>
                <option>55 - 59 ans</option>
                <option>60 - 64 ans</option>
                <option>65 - 69 ans</option>
                <option>70 - 74 ans</option>
                <option>75 - 79 ans</option>
                <option>80 ans et +</option>
              </select>
            </div>
            <Input placeholder="Email *" type="email" {...register("email")} aria-invalid={!!errors.email} />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Téléphone *" type="tel" {...register("phone")} aria-invalid={!!errors.phone} />
              <Input placeholder="Code postal" inputMode="numeric" maxLength={5} {...register("postal_code")} aria-invalid={!!errors.postal_code} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Ville" {...register("city")} />
              <select {...register("family_status")} className="flex h-12 w-full rounded-xl border border-input bg-background px-3 text-sm">
                <option value="">Situation</option>
                <option>Célibataire</option>
                <option>En couple</option>
                <option>Marié(e) / Pacsé(e)</option>
                <option>Veuf(ve)</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Mutuelle actuelle (optionnel)" {...register("current_insurer")} />
              <Input placeholder="Budget max / mois (€)" type="number" min={0} {...register("budget_max")} />
            </div>

            <div className="rounded-xl border border-input bg-muted/30 p-3">
              <p className="text-xs font-medium text-foreground/70 mb-2">Vos priorités de couverture</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {[
                  "Hospitalisation",
                  "Optique",
                  "Dentaire",
                  "Audioprothèse",
                  "Médecines douces",
                  "Spécialistes",
                ].map((c) => (
                  <label key={c} className="flex items-center gap-2">
                    <input type="checkbox" value={c} {...register("coverage_priorities")} className="h-4 w-4 rounded border-input" />
                    <span>{c}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <select {...register("preferred_contact")} className="flex h-12 w-full rounded-xl border border-input bg-background px-3 text-sm">
                <option value="">Préférence de contact</option>
                <option value="phone">Appel téléphonique</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
              <select {...register("preferred_time")} className="flex h-12 w-full rounded-xl border border-input bg-background px-3 text-sm">
                <option value="">Créneau préféré</option>
                <option>Matin (9h - 12h)</option>
                <option>Midi (12h - 14h)</option>
                <option>Après-midi (14h - 18h)</option>
                <option>Soir (18h - 20h)</option>
              </select>
            </div>
            <Textarea placeholder="Votre message (optionnel)" {...register("message")} />

            <label className="flex items-start gap-2 text-xs text-foreground/80">
              <input type="checkbox" {...register("gdpr_consent")} className="mt-0.5 h-4 w-4 rounded border-input" />
              <span>
                J'accepte d'être recontacté(e) et que mes données soient traitées pour
                ma demande de devis, conformément à la politique de confidentialité. *
              </span>
            </label>
            {errors.gdpr_consent && (
              <p className="text-xs text-destructive">{errors.gdpr_consent.message as string}</p>
            )}
            <label className="flex items-start gap-2 text-xs text-foreground/70">
              <input type="checkbox" defaultChecked {...register("marketing_consent")} className="mt-0.5 h-4 w-4 rounded border-input" />
              <span>Je souhaite recevoir des conseils et offres adaptés aux seniors par email.</span>
            </label>

            <Button type="submit" variant="premium" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Envoi…" : "Recevoir mon devis gratuit"}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              🔒 Données 100% confidentielles. Sans engagement.
            </p>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// React context for global access
const QuoteCtx = React.createContext<{ open: (t?: string) => void } | null>(null);
export const useQuote = () => {
  const c = React.useContext(QuoteCtx);
  if (!c) throw new Error("useQuote must be inside QuoteProvider");
  return c;
};

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState("Mutuelle santé senior");
  return (
    <QuoteCtx.Provider value={{ open: (t) => { if (t) setType(t); setOpen(true); } }}>
      {children}
      <QuoteModal open={open} onOpenChange={setOpen} defaultType={type} />
    </QuoteCtx.Provider>
  );
}
