import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  Crown,
  Loader2,
  LogOut,
  Plus,
  RotateCcw,
  Save,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { claimFirstAdmin } from "@/lib/site-content.functions";
import type { Json, SectionContent, SiteSection } from "@/lib/site-content";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Editor Konten Landing Page | Admin Sultan Barokah Haramain" },
      {
        name: "description",
        content: "Panel admin untuk mengedit konten landing page mitra section per section.",
      },
      { property: "og:title", content: "Editor Konten Landing Page | Admin" },
      { property: "og:description", content: "Kelola konten landing page mitra per bagian." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const LABELS: Record<string, string> = {
  brand: "Nama Brand",
  subtitle: "Sub Judul",
  badge: "Lencana",
  cta: "Teks Tombol",
  eyebrow: "Label Kecil",
  title: "Judul",
  title_highlight: "Judul Sorotan",
  description: "Deskripsi",
  desc: "Deskripsi",
  label: "Label",
  value: "Nilai",
  name: "Nama",
  stats: "Statistik",
  items: "Daftar Item",
  columns: "Kolom",
  districts: "Kecamatan",
  leaders: "Peringkat Agen",
  rows: "Baris Data",
  potential: "Potensi Jemaah",
  rank: "Peringkat",
  jamaah: "Jumlah Jemaah",
  komisi: "Total Komisi",
  reward: "Reward",
  population_label: "Label Populasi",
  population_value: "Angka Populasi",
  population_desc: "Keterangan Populasi",
  lock_title: "Judul Anti-Kanibal",
  lock_desc: "Deskripsi Anti-Kanibal",
  map_title: "Judul Peta",
  note: "Catatan",
  app_title: "Judul Aplikasi",
  app_desc: "Deskripsi Aplikasi",
  app_items: "Fitur Aplikasi",
  academy_title: "Judul Akademi",
  academy_desc: "Deskripsi Akademi",
  academy_items: "Modul Akademi",
  copyright: "Teks Copyright",
};

function labelFor(key: string) {
  return LABELS[key] ?? key.replace(/_/g, " ");
}

function blankLike(sample: Json | undefined): Json {
  if (typeof sample === "string") return "";
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  if (Array.isArray(sample)) return [];
  if (sample && typeof sample === "object") {
    const out: Record<string, Json> = {};
    for (const k of Object.keys(sample)) out[k] = blankLike(sample[k]);
    return out;
  }
  return "";
}

function FieldEditor({
  name,
  value,
  onChange,
}: {
  name: string;
  value: Json;
  onChange: (next: Json) => void;
}) {
  if (typeof value === "string") {
    const long = value.length > 70;
    return (
      <label className="block">
        <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {labelFor(name)}
        </span>
        {long ? (
          <textarea
            rows={3}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 w-full rounded-xl border border-border bg-background/60 px-3 py-2 text-sm text-foreground outline-none focus:border-gold/60"
          />
        ) : (
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 w-full rounded-xl border border-border bg-background/60 px-3 py-2 text-sm text-foreground outline-none focus:border-gold/60"
          />
        )}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <label className="block">
        <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {labelFor(name)}
        </span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="mt-1 w-full rounded-xl border border-border bg-background/60 px-3 py-2 text-sm text-foreground outline-none focus:border-gold/60"
        />
      </label>
    );
  }

  if (Array.isArray(value)) {
    const sample = value[0];
    return (
      <div className="rounded-2xl border border-border bg-background/30 p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.18em] text-gold">
            {labelFor(name)}
          </span>
          <button
            type="button"
            onClick={() => onChange([...value, blankLike(sample)])}
            className="inline-flex items-center gap-1 rounded-full border border-gold/40 px-3 py-1 text-xs text-gold"
          >
            <Plus className="h-3 w-3" /> Tambah
          </button>
        </div>
        <div className="space-y-3">
          {value.map((item, i) => (
            <div key={i} className="rounded-xl border border-border/70 bg-background/40 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">#{i + 1}</span>
                <button
                  type="button"
                  onClick={() => onChange(value.filter((_, j) => j !== i))}
                  className="text-muted-foreground transition-colors hover:text-destructive"
                  aria-label={`Hapus item ${i + 1}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <FieldEditor
                name={name}
                value={item}
                onChange={(next) => onChange(value.map((v, j) => (j === i ? next : v)))}
              />
            </div>
          ))}
          {value.length === 0 ? (
            <p className="text-xs text-muted-foreground">Belum ada item.</p>
          ) : null}
        </div>
      </div>
    );
  }

  if (value && typeof value === "object") {
    const obj = value as Record<string, Json>;
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {Object.keys(obj).map((k) => (
          <div key={k} className={Array.isArray(obj[k]) ? "sm:col-span-2" : ""}>
            <FieldEditor
              name={k}
              value={obj[k] ?? ""}
              onChange={(next) => onChange({ ...obj, [k]: next })}
            />
          </div>
        ))}
      </div>
    );
  }

  return null;
}

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const claim = useServerFn(claimFirstAdmin);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [draft, setDraft] = useState<SectionContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [claiming, setClaiming] = useState(false);

  const rolesQuery = useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return { isAdmin: false, email: "" };
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userData.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (error) throw error;
      return { isAdmin: Boolean(data), email: userData.user.email ?? "" };
    },
  });

  const sectionsQuery = useQuery({
    queryKey: ["site-sections"],
    queryFn: async (): Promise<SiteSection[]> => {
      const { data, error } = await supabase
        .from("site_sections")
        .select("section_key, label, sort_order, is_visible, content")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []).map((r) => ({
        section_key: r.section_key,
        label: r.label,
        sort_order: r.sort_order,
        is_visible: r.is_visible,
        content: (r.content ?? {}) as SectionContent,
      }));
    },
  });

  const sections = useMemo(() => sectionsQuery.data ?? [], [sectionsQuery.data]);
  const active = sections.find((s) => s.section_key === activeKey) ?? sections[0];

  useEffect(() => {
    if (!activeKey && sections.length > 0) setActiveKey(sections[0]!.section_key);
  }, [sections, activeKey]);

  useEffect(() => {
    if (active) setDraft(active.content);
  }, [active?.section_key, active?.content]);

  async function handleSave() {
    if (!active || !draft) return;
    setSaving(true);
    const { error } = await supabase
      .from("site_sections")
      .update({ content: draft as never })
      .eq("section_key", active.section_key);
    setSaving(false);
    if (error) {
      toast.error("Gagal menyimpan: " + error.message);
      return;
    }
    toast.success(`Bagian "${active.label}" tersimpan.`);
    queryClient.invalidateQueries({ queryKey: ["site-sections"] });
  }

  async function toggleVisible() {
    if (!active) return;
    const { error } = await supabase
      .from("site_sections")
      .update({ is_visible: !active.is_visible })
      .eq("section_key", active.section_key);
    if (error) {
      toast.error("Gagal mengubah status: " + error.message);
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["site-sections"] });
  }

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  async function handleClaim() {
    setClaiming(true);
    try {
      const res = await claim({ data: undefined });
      if (res.granted) {
        toast.success("Anda kini menjadi admin.");
        rolesQuery.refetch();
      } else {
        toast.error("Admin sudah ada. Minta akses ke admin yang terdaftar.");
      }
    } catch {
      toast.error("Gagal menetapkan admin.");
    } finally {
      setClaiming(false);
    }
  }

  if (rolesQuery.isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-gold" />
      </div>
    );
  }

  if (!rolesQuery.data?.isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-4">
        <div className="max-w-md rounded-3xl border border-gold/30 panel-gradient p-7 text-center">
          <Crown className="mx-auto h-7 w-7 text-gold" />
          <h1 className="mt-4 font-display text-xl text-foreground">Akses Admin Diperlukan</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Akun {rolesQuery.data?.email} belum memiliki hak admin. Jika ini pemasangan pertama,
            Anda dapat mengklaim posisi admin pertama.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={handleClaim}
              disabled={claiming}
              className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/15 px-5 py-2.5 text-sm font-bold text-gold disabled:opacity-60"
            >
              {claiming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Crown className="h-4 w-4" />}
              Klaim Admin Pertama
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-muted-foreground"
            >
              <LogOut className="h-4 w-4" /> Keluar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-gold/40 bg-gold/10">
              <Crown className="h-4.5 w-4.5 text-gold" />
            </div>
            <div>
              <p className="font-display text-sm text-foreground">Editor Landing Page</p>
              <p className="text-[11px] text-muted-foreground">{rolesQuery.data.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Lihat Situs
            </a>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground"
            >
              <LogOut className="h-3.5 w-3.5" /> Keluar
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr]">
        <nav className="h-max rounded-2xl border border-gold/25 panel-gradient p-3">
          <p className="px-2 pb-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Bagian Halaman
          </p>
          <ul className="space-y-1">
            {sections.map((s) => (
              <li key={s.section_key}>
                <button
                  type="button"
                  onClick={() => setActiveKey(s.section_key)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                    active?.section_key === s.section_key
                      ? "border border-gold/50 bg-gold/10 text-gold"
                      : "text-muted-foreground hover:bg-background/50"
                  }`}
                >
                  <span className="truncate">{s.label}</span>
                  {s.is_visible ? null : <EyeOff className="h-3.5 w-3.5 shrink-0" />}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <section className="rounded-2xl border border-gold/25 panel-gradient p-5 sm:p-6">
          {sectionsQuery.isLoading || !active || !draft ? (
            <div className="grid h-48 place-items-center">
              <Loader2 className="h-5 w-5 animate-spin text-gold" />
            </div>
          ) : (
            <>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <h2 className="font-display text-lg text-foreground">{active.label}</h2>
                  <p className="text-[11px] text-muted-foreground">{active.section_key}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleVisible}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground"
                  >
                    {active.is_visible ? (
                      <>
                        <Eye className="h-3.5 w-3.5" /> Tampil
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-3.5 w-3.5" /> Disembunyikan
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDraft(active.content)}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Batalkan
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/15 px-5 py-2 text-xs font-bold text-gold disabled:opacity-60"
                  >
                    {saving ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Save className="h-3.5 w-3.5" />
                    )}
                    Simpan
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {Object.keys(draft).map((key) => (
                  <FieldEditor
                    key={key}
                    name={key}
                    value={draft[key] as Json}
                    onChange={(next) => setDraft({ ...draft, [key]: next })}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}