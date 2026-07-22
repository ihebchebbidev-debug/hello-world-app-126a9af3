// Server functions for capturing leads. Public — no auth required.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Lead data is captured via the PHP backend (see src/lib/php-api.ts).
// These server functions are kept as no-ops to preserve any legacy callers
// without requiring Supabase to be connected.

const QuoteSchema = z.object({
  insurance_type: z.string().min(2).max(60),
  full_name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(6).max(32),
  age: z.number().int().min(0).max(120).optional(),
  city: z.string().trim().max(80).optional(),
  message: z.string().trim().max(2000).optional(),
  postal_code: z.string().trim().regex(/^[0-9]{4,5}$/).optional().or(z.literal("").transform(() => undefined)),
  age_bracket: z.string().trim().max(20).optional(),
  family_status: z.string().trim().max(40).optional(),
  current_insurer: z.string().trim().max(80).optional(),
  current_premium: z.number().nonnegative().max(10000).optional(),
  budget_max: z.number().nonnegative().max(10000).optional(),
  coverage_priorities: z.array(z.string().max(40)).max(10).optional(),
  smoker: z.boolean().optional(),
  preferred_contact: z.enum(["phone", "email", "sms", "whatsapp"]).optional(),
  preferred_time: z.string().trim().max(80).optional(),
  source_page: z.string().trim().max(200).optional(),
  utm_source: z.string().trim().max(80).optional(),
  utm_medium: z.string().trim().max(80).optional(),
  utm_campaign: z.string().trim().max(80).optional(),
  referrer: z.string().trim().max(300).optional(),
  gdpr_consent: z.boolean().optional(),
  marketing_consent: z.boolean().optional(),
});

export const submitQuoteRequest = createServerFn({ method: "POST" })
  .inputValidator((input) => QuoteSchema.parse(input))
  .handler(async (): Promise<{ ok: boolean; error?: string }> => ({ ok: true }));

const CallbackSchema = z.object({
  full_name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(6).max(32),
  preferred_time: z.string().trim().max(80).optional(),
  email: z.string().trim().email().max(160).optional().or(z.literal("").transform(() => undefined)),
  insurance_type: z.string().trim().max(60).optional(),
  postal_code: z.string().trim().regex(/^[0-9]{4,5}$/).optional().or(z.literal("").transform(() => undefined)),
  source_page: z.string().trim().max(200).optional(),
  gdpr_consent: z.boolean().optional(),
});

export const submitCallbackRequest = createServerFn({ method: "POST" })
  .inputValidator((input) => CallbackSchema.parse(input))
  .handler(async (): Promise<{ ok: boolean; error?: string }> => ({ ok: true }));

const NewsletterSchema = z.object({
  email: z.string().trim().email().max(160),
  first_name: z.string().trim().max(80).optional(),
  interest: z.string().trim().max(60).optional(),
  source_page: z.string().trim().max(200).optional(),
  gdpr_consent: z.boolean().optional(),
});

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((input) => NewsletterSchema.parse(input))
  .handler(async (): Promise<{ ok: boolean; error?: string }> => ({ ok: true }));
