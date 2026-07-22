import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Users,
  Phone,
  Mail,
  MapPin,
  Search,
  RefreshCw,
  Download,
  LogOut,
  Eye,
  TrendingUp,
  Calendar,
  Filter,
  X,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Shield,
} from "lucide-react";
import { fetchAllLeads, type LeadRow } from "@/lib/php-api";

const ADMIN_USER = "AmineAdmin";
const ADMIN_PASS = "Admin@2026";
const SESSION_KEY = "leads_admin_ok_v1";

export const Route = createFileRoute("/leads")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin · Leads" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: LeadsPage,
});

type SortKey = "full_name" | "email" | "insurance_type" | "created_at";

function LeadsPage() {
  const [authed, setAuthed] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "1") {
      setAuthed(true);
    }
  }, []);

  if (!authed) return <LoginGate onSuccess={() => setAuthed(true)} />;
  return (
    <LeadsDashboard
      onLogout={() => {
        sessionStorage.removeItem(SESSION_KEY);
        setAuthed(false);
      }}
    />
  );
}

function LoginGate({ onSuccess }: { onSuccess: () => void }) {
  const [u, setU] = React.useState("");
  const [p, setP] = React.useState("");
  const [err, setErr] = React.useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (u === ADMIN_USER && p === ADMIN_PASS) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onSuccess();
    } else {
      setErr("Identifiants invalides");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-muted/40 via-background to-muted/20 p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-3xl bg-background p-8 shadow-elegant border space-y-5"
      >
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="size-12 rounded-2xl bg-primary/10 text-primary grid place-items-center">
            <Shield className="size-6" />
          </div>
          <h1 className="text-xl font-bold">Espace administrateur</h1>
          <p className="text-sm text-muted-foreground">Accès restreint et sécurisé</p>
        </div>
        <Input
          placeholder="Identifiant"
          value={u}
          onChange={(e) => setU(e.target.value)}
          autoComplete="username"
        />
        <Input
          placeholder="Mot de passe"
          type="password"
          value={p}
          onChange={(e) => setP(e.target.value)}
          autoComplete="current-password"
        />
        {err && (
          <p className="text-sm text-destructive bg-destructive/5 border border-destructive/20 rounded-lg px-3 py-2">
            {err}
          </p>
        )}
        <Button type="submit" className="w-full" variant="premium">
          Se connecter
        </Button>
      </form>
    </div>
  );
}

function LeadsDashboard({ onLogout }: { onLogout: () => void }) {
  const [rows, setRows] = React.useState<LeadRow[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState<string | null>(null);
  const [q, setQ] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState<string>("all");
  const [periodFilter, setPeriodFilter] = React.useState<string>("all");
  const [selected, setSelected] = React.useState<LeadRow | null>(null);
  const [sortKey, setSortKey] = React.useState<SortKey>("created_at");
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("desc");
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(25);

  const toggleSort = (k: SortKey) => {
    if (sortKey === k) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(k);
      setSortDir(k === "created_at" ? "desc" : "asc");
    }
  };

  const load = React.useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const data = await fetchAllLeads();
      setRows(data);
    } catch (e: any) {
      setErr(e?.message || "Erreur réseau");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const insuranceTypes = React.useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => r.insurance_type && set.add(r.insurance_type));
    return Array.from(set).sort();
  }, [rows]);

  const filtered = React.useMemo(() => {
    const now = Date.now();
    const periodMs: Record<string, number> = {
      "24h": 86400000,
      "7d": 7 * 86400000,
      "30d": 30 * 86400000,
    };
    return rows.filter((r) => {
      if (typeFilter !== "all" && r.insurance_type !== typeFilter) return false;
      if (periodFilter !== "all") {
        const t = new Date(r.created_at).getTime();
        if (now - t > periodMs[periodFilter]) return false;
      }
      if (!q.trim()) return true;
      const s = q.toLowerCase();
      return [r.full_name, r.phone, r.email, r.city, r.postal_code, r.insurance_type]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(s));
    });
  }, [rows, q, typeFilter, periodFilter]);

  const sorted = React.useMemo(() => {
    const arr = [...filtered];
    const mult = sortDir === "asc" ? 1 : -1;
    arr.sort((a, b) => {
      let av: any = (a as any)[sortKey];
      let bv: any = (b as any)[sortKey];
      if (sortKey === "created_at") {
        av = new Date(av).getTime();
        bv = new Date(bv).getTime();
      } else {
        av = (av ?? "").toString().toLowerCase();
        bv = (bv ?? "").toString().toLowerCase();
      }
      if (av < bv) return -1 * mult;
      if (av > bv) return 1 * mult;
      return 0;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paged = React.useMemo(
    () => sorted.slice((safePage - 1) * pageSize, safePage * pageSize),
    [sorted, safePage, pageSize],
  );

  React.useEffect(() => {
    setPage(1);
  }, [q, typeFilter, periodFilter, pageSize, sortKey, sortDir]);

  const stats = React.useMemo(() => {
    const now = Date.now();
    const today = rows.filter(
      (r) => now - new Date(r.created_at).getTime() < 86400000,
    ).length;
    const week = rows.filter(
      (r) => now - new Date(r.created_at).getTime() < 7 * 86400000,
    ).length;
    const withEmail = rows.filter((r) => r.email).length;
    return { total: rows.length, today, week, withEmail };
  }, [rows]);

  const exportCsv = () => {
    const headers = [
      "id","created_at","full_name","phone","email","age","marital_status",
      "city","postal_code","insurance_type","current_insurer","budget_max",
      "preferred_contact","preferred_time","coverage_priorities","message",
      "source_page","referrer","utm_source","utm_medium","utm_campaign","ip_address",
    ];
    const escape = (v: any) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [
      headers.join(","),
      ...sorted.map((r) => headers.map((h) => escape((r as any)[h])).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetFilters = () => {
    setQ("");
    setTypeFilter("all");
    setPeriodFilter("all");
  };
  const hasFilters = q || typeFilter !== "all" || periodFilter !== "all";

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <header className="border-b bg-background sticky top-0 z-10">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary/10 text-primary grid place-items-center">
              <Users className="size-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">Leads collectés</h1>
              <p className="text-xs text-muted-foreground">
                Tableau de bord administrateur
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={load}
              disabled={loading}
              className="gap-1.5"
            >
              <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Actualiser</span>
            </Button>
            <Button variant="outline" size="sm" onClick={exportCsv} className="gap-1.5">
              <Download className="size-4" />
              <span className="hidden sm:inline">Export CSV</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout} className="gap-1.5">
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard
            icon={<Users className="size-4" />}
            label="Total"
            value={stats.total}
            tone="primary"
          />
          <StatCard
            icon={<Calendar className="size-4" />}
            label="Aujourd'hui"
            value={stats.today}
            tone="success"
          />
          <StatCard
            icon={<TrendingUp className="size-4" />}
            label="7 derniers jours"
            value={stats.week}
            tone="accent"
          />
          <StatCard
            icon={<Mail className="size-4" />}
            label="Avec email"
            value={stats.withEmail}
            tone="muted"
          />
        </div>

        {/* Filters */}
        <div className="rounded-2xl border bg-background p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Filter className="size-4 text-muted-foreground" />
            <span>Filtres</span>
            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="ml-auto h-7 gap-1 text-xs"
              >
                <X className="size-3" /> Réinitialiser
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Nom, téléphone, email, ville…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type d'assurance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                {insuranceTypes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={periodFilter} onValueChange={setPeriodFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les périodes</SelectItem>
                <SelectItem value="24h">Dernières 24h</SelectItem>
                <SelectItem value="7d">7 derniers jours</SelectItem>
                <SelectItem value="30d">30 derniers jours</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-xs text-muted-foreground">
            {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
            {rows.length !== filtered.length && ` sur ${rows.length}`}
          </p>
        </div>

        {err && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
            {err}
          </div>
        )}

        {/* Table (desktop) */}
        <div className="hidden md:block overflow-hidden rounded-2xl border bg-background shadow-sm">
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <SortTh label="Date" k="created_at" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                  <SortTh label="Nom" k="full_name" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                  <SortTh label="Email" k="email" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                  <Th>Localisation</Th>
                  <SortTh label="Type" k="insurance_type" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
                  <Th>Âge</Th>
                  <Th>Source</Th>
                  <Th className="text-right">Action</Th>
                </tr>
              </thead>
              <tbody>
                {loading && rows.length === 0 && (
                  <>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} className="border-t">
                        {Array.from({ length: 8 }).map((__, j) => (
                          <td key={j} className="px-3 py-3">
                            <div className="h-4 bg-muted/60 rounded animate-pulse" />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                )}
                {paged.map((r) => (
                  <tr
                    key={r.id}
                    className="border-t hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => setSelected(r)}
                  >
                    <Td>
                      <div className="font-medium">
                        {new Date(r.created_at).toLocaleDateString("fr-FR")}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(r.created_at).toLocaleTimeString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </Td>
                    <Td>
                      <div className="font-medium">{r.full_name}</div>
                      <a
                        href={`tel:${r.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <Phone className="size-3" /> {r.phone}
                      </a>
                    </Td>
                    <Td>
                      {r.email ? (
                        <a
                          href={`mailto:${r.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                        >
                          <Mail className="size-3" /> {r.email}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </Td>
                    <Td>
                      {r.city || r.postal_code ? (
                        <span className="inline-flex items-center gap-1 text-sm">
                          <MapPin className="size-3 text-muted-foreground" />
                          {[r.city, r.postal_code].filter(Boolean).join(" · ")}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </Td>
                    <Td>
                      {r.insurance_type ? (
                        <Badge variant="secondary" className="font-normal">
                          {r.insurance_type}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </Td>
                    <Td>{r.age ?? "—"}</Td>
                    <Td className="text-xs text-muted-foreground max-w-[180px] truncate">
                      {r.source_page ?? "—"}
                    </Td>
                    <Td className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(r);
                        }}
                      >
                        <Eye className="size-4" />
                      </Button>
                    </Td>
                  </tr>
                ))}
                {!loading && sorted.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-12 text-center">
                      <Users className="size-10 mx-auto text-muted-foreground/40 mb-3" />
                      <p className="text-muted-foreground">Aucun lead trouvé</p>
                      {hasFilters && (
                        <Button
                          variant="link"
                          size="sm"
                          onClick={resetFilters}
                          className="mt-1"
                        >
                          Réinitialiser les filtres
                        </Button>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {sorted.length > 0 && (
            <PaginationBar
              page={safePage}
              totalPages={totalPages}
              pageSize={pageSize}
              total={sorted.length}
              onPage={setPage}
              onPageSize={setPageSize}
            />
          )}
        </div>

        {/* Cards (mobile) */}
        <div className="md:hidden space-y-3">
          {loading && rows.length === 0 && (
            <>
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-32 rounded-2xl bg-background border animate-pulse"
                />
              ))}
            </>
          )}
          {paged.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelected(r)}
              className="w-full text-left rounded-2xl border bg-background p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="font-semibold truncate">{r.full_name}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(r.created_at).toLocaleString("fr-FR")}
                  </div>
                </div>
                {r.insurance_type && (
                  <Badge variant="secondary" className="shrink-0 font-normal">
                    {r.insurance_type}
                  </Badge>
                )}
              </div>
              <div className="mt-3 space-y-1.5 text-sm">
                <a
                  href={`tel:${r.phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 text-primary"
                >
                  <Phone className="size-3.5" /> {r.phone}
                </a>
                {r.email && (
                  <a
                    href={`mailto:${r.email}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-muted-foreground truncate"
                  >
                    <Mail className="size-3.5 shrink-0" />
                    <span className="truncate">{r.email}</span>
                  </a>
                )}
                {(r.city || r.postal_code) && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="size-3.5" />
                    {[r.city, r.postal_code].filter(Boolean).join(" · ")}
                  </div>
                )}
              </div>
            </button>
          ))}
          {!loading && sorted.length === 0 && (
            <div className="rounded-2xl border bg-background p-12 text-center">
              <Users className="size-10 mx-auto text-muted-foreground/40 mb-3" />
              <p className="text-muted-foreground">Aucun lead trouvé</p>
            </div>
          )}
          {sorted.length > 0 && (
            <div className="rounded-2xl border bg-background p-3">
              <PaginationBar
                page={safePage}
                totalPages={totalPages}
                pageSize={pageSize}
                total={sorted.length}
                onPage={setPage}
                onPageSize={setPageSize}
                compact
              />
            </div>
          )}
        </div>
      </main>

      {/* Detail dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.full_name}</DialogTitle>
                <DialogDescription>
                  Reçu le {new Date(selected.created_at).toLocaleString("fr-FR")}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <Section title="Contact">
                  <Field label="Téléphone">
                    <a href={`tel:${selected.phone}`} className="text-primary hover:underline">
                      {selected.phone}
                    </a>
                  </Field>
                  <Field label="Email">
                    {selected.email ? (
                      <a
                        href={`mailto:${selected.email}`}
                        className="text-primary hover:underline"
                      >
                        {selected.email}
                      </a>
                    ) : "—"}
                  </Field>
                  <Field label="Âge">{selected.age ?? "—"}</Field>
                  <Field label="Situation">{selected.marital_status ?? "—"}</Field>
                </Section>
                <Section title="Localisation">
                  <Field label="Ville">{selected.city ?? "—"}</Field>
                  <Field label="Code postal">{selected.postal_code ?? "—"}</Field>
                </Section>
                <Section title="Assurance">
                  <Field label="Type">{selected.insurance_type ?? "—"}</Field>
                  <Field label="Assureur actuel">{selected.current_insurer ?? "—"}</Field>
                  <Field label="Budget max">
                    {selected.budget_max ? `${selected.budget_max} €` : "—"}
                  </Field>
                  <Field label="Contact préféré">
                    {selected.preferred_contact ?? "—"}
                  </Field>
                  <Field label="Horaire préféré">{selected.preferred_time ?? "—"}</Field>
                  <Field label="Priorités de couverture" full>
                    {selected.coverage_priorities ?? "—"}
                  </Field>
                </Section>
                {selected.message && (
                  <Section title="Message">
                    <div className="col-span-2 rounded-lg bg-muted/40 p-3 text-sm whitespace-pre-wrap">
                      {selected.message}
                    </div>
                  </Section>
                )}
                <Section title="Tracking">
                  <Field label="Source">{selected.source_page ?? "—"}</Field>
                  <Field label="Referrer">{selected.referrer ?? "—"}</Field>
                  <Field label="UTM source">{selected.utm_source ?? "—"}</Field>
                  <Field label="UTM medium">{selected.utm_medium ?? "—"}</Field>
                  <Field label="UTM campaign">{selected.utm_campaign ?? "—"}</Field>
                  <Field label="IP">{selected.ip_address ?? "—"}</Field>
                </Section>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  tone: "primary" | "success" | "accent" | "muted";
}) {
  const tones: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    accent: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    muted: "bg-muted text-muted-foreground",
  };
  return (
    <div className="rounded-2xl border bg-background p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
        <span className={`size-7 rounded-lg grid place-items-center ${tones[tone]}`}>
          {icon}
        </span>
      </div>
      <div className="mt-2 text-2xl font-bold">{value.toLocaleString("fr-FR")}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">{children}</div>
    </div>
  );
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-medium break-words">{children}</div>
    </div>
  );
}

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <th
      className={`px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground ${className}`}
    >
      {children}
    </th>
  );
}
function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`px-3 py-3 align-top ${className}`}>{children}</td>;
}

function SortTh({
  label,
  k,
  sortKey,
  sortDir,
  onSort,
}: {
  label: string;
  k: SortKey;
  sortKey: SortKey;
  sortDir: "asc" | "desc";
  onSort: (k: SortKey) => void;
}) {
  const active = sortKey === k;
  const Icon = !active ? ArrowUpDown : sortDir === "asc" ? ArrowUp : ArrowDown;
  return (
    <th className="px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
      <button
        type="button"
        onClick={() => onSort(k)}
        className={`inline-flex items-center gap-1 hover:text-foreground transition-colors ${
          active ? "text-foreground" : ""
        }`}
      >
        {label}
        <Icon className={`size-3.5 ${active ? "opacity-100" : "opacity-50"}`} />
      </button>
    </th>
  );
}

function PaginationBar({
  page,
  totalPages,
  pageSize,
  total,
  onPage,
  onPageSize,
  compact,
}: {
  page: number;
  totalPages: number;
  pageSize: number;
  total: number;
  onPage: (p: number) => void;
  onPageSize: (n: number) => void;
  compact?: boolean;
}) {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 ${
        compact ? "" : "border-t px-4 py-3"
      }`}
    >
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>
          {start}–{end} sur {total}
        </span>
        <span className="hidden sm:inline">·</span>
        <Select
          value={String(pageSize)}
          onValueChange={(v) => onPageSize(Number(v))}
        >
          <SelectTrigger className="h-8 w-[110px] text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[10, 25, 50, 100].map((n) => (
              <SelectItem key={n} value={String(n)} className="text-xs">
                {n} / page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => onPage(1)}
          disabled={page <= 1}
        >
          <ChevronsLeft className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => onPage(page - 1)}
          disabled={page <= 1}
        >
          <ChevronLeft className="size-4" />
        </Button>
        <span className="px-2 text-xs text-muted-foreground tabular-nums">
          {page} / {totalPages}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => onPage(page + 1)}
          disabled={page >= totalPages}
        >
          <ChevronRight className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => onPage(totalPages)}
          disabled={page >= totalPages}
        >
          <ChevronsRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
