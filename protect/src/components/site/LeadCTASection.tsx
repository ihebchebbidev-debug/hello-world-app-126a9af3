import { Phone } from "lucide-react";
import { InlineQuoteForm } from "@/components/site/InlineQuoteForm";
import { SITE } from "@/lib/utils";

export function LeadCTASection({
  title = "Recevez votre devis gratuit en 2 minutes",
  subtitle = "Un conseiller dédié vous rappelle sous 24h, sans engagement.",
  insuranceType = "Mutuelle santé senior",
}: {
  title?: string;
  subtitle?: string;
  insuranceType?: string;
}) {
  return (
    <section className="container mx-auto px-4 lg:px-8 max-w-3xl mt-16">
      <div className="rounded-3xl bg-gradient-primary text-primary-foreground p-8 md:p-12 shadow-elegant">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          <p className="mt-2 text-white/85">{subtitle}</p>
        </div>
        <InlineQuoteForm insuranceType={insuranceType} variant="onPrimary" />
        <div className="mt-4 text-center">
          <a
            href={`tel:${SITE.phone}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white"
          >
            <Phone className="h-4 w-4" /> Préférez parler ? {SITE.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}