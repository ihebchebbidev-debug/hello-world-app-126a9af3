// PHP backend hosted at luccibyey.com.tn/protectlanding/
export const PHP_API_BASE = "https://draminesaid.com/directadmin/protectlanding";

export type LeadPayload = {
  full_name: string;
  vorname?: string;
  phone: string;
  email?: string;
  age?: number;
  marital_status?: string;
  city?: string;
  postal_code?: string;
  insurance_type?: string;
  current_insurer?: string;
  budget_max?: number;
  preferred_contact?: string;
  preferred_time?: string;
  coverage_priorities?: string[] | string;
  message?: string;
  source_page?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

// Fire-and-forget — never block UX on the external PHP endpoint.
export function sendLeadToPhp(payload: LeadPayload) {
  try {
    void fetch(`${PHP_API_BASE}/submit_form.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      mode: "cors",
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* ignore */
  }
}

export type LeadRow = {
  id: number;
  full_name: string;
  vorname: string | null;
  phone: string;
  email: string | null;
  age: number | null;
  marital_status: string | null;
  city: string | null;
  postal_code: string | null;
  insurance_type: string | null;
  current_insurer: string | null;
  budget_max: string | null;
  preferred_contact: string | null;
  preferred_time: string | null;
  coverage_priorities: string | null;
  message: string | null;
  source_page: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
};

export async function fetchAllLeads(): Promise<LeadRow[]> {
  const res = await fetch(`${PHP_API_BASE}/get_all_submissions.php`, {
    method: "GET",
    mode: "cors",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (!json?.success) throw new Error(json?.error || "Failed");
  return json.data as LeadRow[];
}
