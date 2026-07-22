import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const leadSchema = z.object({
  full_name: z.string().trim().min(2).max(100),
  first_name: z.string().trim().max(100).optional().or(z.literal("")),
  phone: z.string().trim().min(6).max(30).regex(/^[+0-9 ().-]+$/, "Téléphone invalide"),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  age: z.coerce.number().int().min(18).max(120).optional().or(z.literal("")),
  marital_status: z.string().max(50).optional().or(z.literal("")),
  city: z.string().max(100).optional().or(z.literal("")),
  postal_code: z.string().max(20).optional().or(z.literal("")),
  insurance_type: z.string().max(100).optional().or(z.literal("")),
  current_insurer: z.string().max(100).optional().or(z.literal("")),
  budget_max: z.coerce.number().nonnegative().max(100000).optional().or(z.literal("")),
  preferred_contact: z.string().max(20).optional().or(z.literal("")),
  preferred_time: z.string().max(50).optional().or(z.literal("")),
  message: z.string().max(2000).optional().or(z.literal("")),
  source_page: z.string().max(500).optional().nullable(),
  referrer: z.string().max(500).optional().nullable(),
});

const ENDPOINT = "https://draminesaid.com/directadmin/neoassure/submit_form.php";

export const Route = createFileRoute("/api/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return Response.json({ success: false, error: "Requête invalide" }, { status: 400 });
        }
        const parsed = leadSchema.safeParse(raw);
        if (!parsed.success) {
          return Response.json(
            { success: false, error: "Validation: " + parsed.error.issues.map((i) => i.message).join(", ") },
            { status: 400 },
          );
        }
        const payload: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(parsed.data)) {
          if (v === "" || v === undefined || v === null) continue;
          payload[k] = v;
        }
        try {
          const upstream = await fetch(ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          const text = await upstream.text();
          let data: { success?: boolean; error?: string } = {};
          try { data = JSON.parse(text); } catch { /* upstream may return non-JSON */ }
          if (!upstream.ok || data.success === false) {
            console.error("Lead upstream error", upstream.status, text);
            return Response.json(
              { success: false, error: data.error || "Service temporairement indisponible." },
              { status: 502 },
            );
          }
          return Response.json({ success: true });
        } catch (err) {
          console.error("Lead network error", err);
          return Response.json(
            { success: false, error: "Service temporairement indisponible." },
            { status: 502 },
          );
        }
      },
    },
  },
});
