import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Gift, X } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeNewsletter } from "@/lib/leads.functions";

const STORAGE_KEY = "protection_nl_popup_v1";
const SHOW_AFTER_MS = 25_000;

const schema = z.object({
  first_name: z.string().trim().min(2, "Prénom requis").max(80),
  email: z.string().trim().email("Email invalide").max(160),
  interest: z.string().optional(),
  gdpr_consent: z.literal(true, {
    errorMap: () => ({ message: "Veuillez accepter pour continuer" }),
  }),
});
type Vals = z.infer<typeof schema>;

export function NewsletterPopup() {
  const [open, setOpen] = React.useState(false);
  const submit = useServerFn(subscribeNewsletter);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<Vals>({
      resolver: zodResolver(schema),
      defaultValues: { gdpr_consent: false as unknown as true },
    });

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {}

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setOpen(true);
    };

    const timer = window.setTimeout(show, SHOW_AFTER_MS);

    const onExit = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };
    document.addEventListener("mouseleave", onExit);

    const onScroll = () => {
      const doc = document.documentElement;
      const ratio = (window.scrollY + window.innerHeight) / doc.scrollHeight;
      if (ratio > 0.6) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseleave", onExit);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleClose = (o: boolean) => {
    setOpen(o);
    if (!o) {
      try {
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
      } catch {}
    }
  };

  const onSubmit = async (data: Vals) => {
    try {
      const source_page =
        typeof window !== "undefined" ? window.location.pathname : undefined;
      const res = await submit({ data: { ...data, source_page } });
      if (res?.ok) {
        toast.success("Merci ! Votre guide arrive dans votre boîte mail.");
        try {
          localStorage.setItem(STORAGE_KEY, String(Date.now()));
        } catch {}
        reset();
        setOpen(false);
      } else {
        toast.error(res?.error ?? "Une erreur est survenue.");
      }
    } catch {
      toast.error("Erreur réseau. Merci de réessayer.");
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-navy/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[101] w-[95vw] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-background shadow-elegant">
          <Dialog.Title className="sr-only">Guide gratuit mutuelle senior</Dialog.Title>
          <button
            onClick={() => handleClose(false)}
            aria-label="Fermer"
            className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur hover:bg-accent"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="bg-gradient-primary px-6 pt-7 pb-6 text-primary-foreground">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <Gift className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold leading-tight">
              Votre guide offert : Bien choisir sa mutuelle après 60 ans
            </h2>
            <p className="mt-2 text-sm text-primary-foreground/85">
              28 pages d'analyses, comparatifs et astuces pour économiser jusqu'à
              350 €/an sans perdre en couverture.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-6">
            <Input
              placeholder="Prénom *"
              autoComplete="given-name"
              {...register("first_name")}
              aria-invalid={!!errors.first_name}
            />
            <Input
              placeholder="Votre email *"
              type="email"
              autoComplete="email"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            <select
              {...register("interest")}
              className="flex h-12 w-full rounded-xl border border-input bg-background px-3 text-sm"
            >
              <option value="">Je m'intéresse à... (optionnel)</option>
              <option>Mutuelle santé senior</option>
              <option>Assurance emprunteur</option>
              <option>Prévoyance & obsèques</option>
              <option>Assurance dépendance</option>
            </select>
            <label className="flex items-start gap-2 text-xs text-foreground/80">
              <input
                type="checkbox"
                {...register("gdpr_consent")}
                className="mt-0.5 h-4 w-4 rounded border-input"
              />
              <span>
                J'accepte de recevoir le guide et la newsletter Pro-Tection. Je peux
                me désinscrire à tout moment.
              </span>
            </label>
            {errors.gdpr_consent && (
              <p className="text-xs text-destructive">
                {errors.gdpr_consent.message as string}
              </p>
            )}
            <Button
              type="submit"
              variant="premium"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Envoi…" : "Recevoir mon guide gratuit"}
            </Button>
            <p className="text-center text-[11px] text-muted-foreground">
              🔒 Vos données restent strictement confidentielles.
            </p>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}