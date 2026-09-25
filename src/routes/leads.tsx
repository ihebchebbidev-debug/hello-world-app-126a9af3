import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";

export const Route = createFileRoute("/leads")({
  head: () => ({
    meta: [
      { title: "Leads – Admin" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: LeadsPage,
});

const API_BASE = "https://luccibyey.com.tn/neoassure";
const AUTH_KEY = "neoassure_admin_auth";
const ADMIN_USER = "AmineAdmin";
const ADMIN_PASS = "Admin@2026";

type Lead = Record<string, string | number | null>;

const COLUMNS: { key: string; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "created_at", label: "Date" },
  { key: "full_name", label: "Nom" },
  { key: "vorname", label: "Prénom" },
  { key: "phone", label: "Téléphone" },
  { key: "email", label: "Email" },
  { key: "age", label: "Âge" },
  { key: "marital_status", label: "Situation" },
  { key: "city", label: "Ville" },
  { key: "postal_code", label: "CP" },
  { key: "insurance_type", label: "Type" },
  { key: "current_insurer", label: "Assureur actuel" },
  { key: "budget_max", label: "Budget" },
  { key: "preferred_contact", label: "Contact préféré" },
  { key: "preferred_time", label: "Moment" },
  { key: "coverage_priorities", label: "Garanties" },
  { key: "message", label: "Message" },
  { key: "source_page", label: "Page" },
  { key: "referrer", label: "Referrer" },
  { key: "utm_source", label: "UTM source" },
  { key: "utm_medium", label: "UTM medium" },
  { key: "utm_campaign", label: "UTM campagne" },
  { key: "ip_address", label: "IP" },
];

function LeadsPage() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(AUTH_KEY) === "1") {
      setAuthed(true);
    }
  }, []);

  if (!authed) return <Login onOk={() => setAuthed(true)} />;
  return <Dashboard onLogout={() => { localStorage.removeItem(AUTH_KEY); setAuthed(false); }} />;
}

function Login({ onOk }: { onOk: () => void }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (u === ADMIN_USER && p === ADMIN_PASS) {
      localStorage.setItem(AUTH_KEY, "1");
      onOk();
    } else {
      setErr("Identifiants invalides");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Espace Admin</h1>
        <p className="mt-1 text-sm text-slate-500">Connexion requise pour consulter les leads.</p>
        <div className="mt-6 space-y-3">
          <input
            value={u} onChange={(e) => setU(e.target.value)}
            placeholder="Nom d'utilisateur" autoComplete="username"
            className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-slate-500"
          />
          <input
            value={p} onChange={(e) => setP(e.target.value)}
            type="password" placeholder="Mot de passe" autoComplete="current-password"
            className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-slate-500"
          />
        </div>
        {err && <p className="mt-3 text-sm text-red-600">{err}</p>}
        <button type="submit" className="mt-5 w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
          Se connecter
        </button>
      </form>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [selected, setSelected] = useState<Lead | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/get_all_submissions.php`);
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Erreur");
      setLeads(data.data || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    if (!q.trim()) return leads;
    const needle = q.toLowerCase();
    return leads.filter((l) =>
      Object.values(l).some((v) => v != null && String(v).toLowerCase().includes(needle))
    );
  }, [leads, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const slice = filtered.slice(start, start + pageSize);

  function exportExcel() {
    const rows = filtered.map((l) => {
      const obj: Record<string, unknown> = {};
      COLUMNS.forEach((c) => { obj[c.label] = l[c.key] ?? ""; });
      return obj;
    });
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    const date = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `leads-neoassure-${date}.xlsx`);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-lg font-bold text-slate-900">Leads NEOASSUR</h1>
            <p className="text-xs text-slate-500">{filtered.length} résultat(s) — {leads.length} total</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={load} className="rounded-md border px-3 py-2 text-sm hover:bg-slate-50">Rafraîchir</button>
            <button onClick={exportExcel} className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
              Exporter Excel
            </button>
            <button onClick={onLogout} className="rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              Déconnexion
            </button>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(1); }}
            placeholder="Rechercher (nom, email, téléphone, ville…)"
            className="w-full max-w-md rounded-md border bg-white px-3 py-2 text-sm outline-none focus:border-slate-500"
          />
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>Par page :</span>
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
              className="rounded-md border bg-white px-2 py-1"
            >
              {[10, 25, 50, 100, 200].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        {loading && <p className="text-sm text-slate-500">Chargement…</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {!loading && !error && (
          <>
            <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    {COLUMNS.slice(0, 9).map((c) => (
                      <th key={c.key} className="whitespace-nowrap px-3 py-2 font-semibold">{c.label}</th>
                    ))}
                    <th className="px-3 py-2 font-semibold">Détails</th>
                  </tr>
                </thead>
                <tbody>
                  {slice.length === 0 && (
                    <tr><td colSpan={10} className="px-3 py-8 text-center text-slate-400">Aucun lead.</td></tr>
                  )}
                  {slice.map((l) => (
                    <tr key={String(l.id)} className="border-t hover:bg-slate-50">
                      {COLUMNS.slice(0, 9).map((c) => (
                        <td key={c.key} className="whitespace-nowrap px-3 py-2 text-slate-700">
                          {l[c.key] != null && String(l[c.key]) !== "" ? String(l[c.key]) : "—"}
                        </td>
                      ))}
                      <td className="px-3 py-2">
                        <button onClick={() => setSelected(l)} className="rounded-md border px-2 py-1 text-xs hover:bg-slate-100">Voir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-slate-500">Page {safePage} / {totalPages}</span>
              <div className="flex items-center gap-1">
                <button
                  disabled={safePage <= 1}
                  onClick={() => setPage(1)}
                  className="rounded border px-2 py-1 disabled:opacity-40"
                >«</button>
                <button
                  disabled={safePage <= 1}
                  onClick={() => setPage(safePage - 1)}
                  className="rounded border px-2 py-1 disabled:opacity-40"
                >‹ Préc.</button>
                <button
                  disabled={safePage >= totalPages}
                  onClick={() => setPage(safePage + 1)}
                  className="rounded border px-2 py-1 disabled:opacity-40"
                >Suiv. ›</button>
                <button
                  disabled={safePage >= totalPages}
                  onClick={() => setPage(totalPages)}
                  className="rounded border px-2 py-1 disabled:opacity-40"
                >»</button>
              </div>
            </div>
          </>
        )}
      </main>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelected(null)}>
          <div className="max-h-[85vh] w-full max-w-2xl overflow-auto rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-bold text-slate-900">Lead #{String(selected.id)}</h3>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>
            <dl className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              {COLUMNS.map((c) => (
                <div key={c.key}>
                  <dt className="text-xs font-semibold uppercase text-slate-500">{c.label}</dt>
                  <dd className="break-words text-slate-800">
                    {selected[c.key] != null && String(selected[c.key]) !== "" ? String(selected[c.key]) : "—"}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
