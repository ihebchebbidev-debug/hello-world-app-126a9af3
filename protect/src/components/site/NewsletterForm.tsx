import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeNewsletter } from "@/lib/leads.functions";

const schema = z.object({
  email: z.string().trim().email("Email invalide"),
  first_name: z.string().trim().max(80).optional(),
});
type Vals = z.infer<typeof schema>;

export function NewsletterForm() {
  const submit = useServerFn(subscribeNewsletter);
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm<Vals>({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (data: Vals) => {
    try {
      const source_page =
        typeof window !== "undefined" ? window.location.pathname : undefined;
      const res = await submit({
        data: { ...data, source_page, gdpr_consent: true },
      });
      if (res?.ok) {
        toast.success("Merci, votre inscription est confirmée.");
        setSubmitted(true);
        reset();
      } else toast.error(res?.error ?? "Une erreur est survenue.");
    } catch {
      toast.error("Erreur réseau. Merci de réessayer.");
    }
  };
  if (submitted) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white" role="status" aria-live="polite">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-white" aria-hidden="true" />
        <span>Merci, votre inscription à la newsletter est confirmée.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 sm:flex-row" aria-label="Inscription newsletter">
      <Input
        type="text"
        autoComplete="given-name"
        placeholder="Prénom"
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        {...register("first_name")}
      />
      <Input
        type="email"
        autoComplete="email"
        placeholder="Votre email"
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        {...register("email")}
        aria-invalid={!!errors.email}
      />
      <Button type="submit" size="default" variant="secondary" disabled={isSubmitting}>
        {isSubmitting ? "…" : "S'inscrire"}
      </Button>
    </form>
  );
}
