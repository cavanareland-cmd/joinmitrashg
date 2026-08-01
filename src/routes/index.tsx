import { createFileRoute } from "@tanstack/react-router";
import {
  Crown,
  ShieldCheck,
  MessageCircle,
  BadgeCheck,
  Car,
  Wallet,
  Sparkles,
  HeartHandshake,
  Users,
  HandCoins,
  MapPinned,
  Lock,
  Trophy,
  Smartphone,
  GraduationCap,
  BookOpenCheck,
  Globe,
  Phone,
  ArrowRight,
  Star,
} from "lucide-react";

import heroBg from "@/assets/hero-bg.jpg";
import g1Raw from "@/assets/Jamaah_Sultan_Haramain_Gresik.jpg.asset.json";
import g2Raw from "@/assets/Umrah_Murah_di_Gresik.jpg.asset.json";
import g3Raw from "@/assets/Sultan_Haramain_Gresik_Raya.jpg.asset.json";
import g4Raw from "@/assets/Agen_Travel_Umrah_Resmi_Gresik.jpg.asset.json";
import g5Raw from "@/assets/Jasa_Umrah_Surabaya.jpg.asset.json";
import g6Raw from "@/assets/Ibadah_Jamaah_Sultan_Haramain_Gresik.jpg.asset.json";
import g7Raw from "@/assets/Umrah_Terpercaya_Lamongan.jpg.asset.json";
import g8Raw from "@/assets/Agen_Umrah_Resmi_Tuban.jpg.asset.json";
import { getSiteSections } from "@/lib/site-content.functions";
import { contentOf, isVisible, list, str, type SectionContent } from "@/lib/site-content";

type AssetJson = { url: string };
const g1 = g1Raw as AssetJson;
const g2 = g2Raw as AssetJson;
const g3 = g3Raw as AssetJson;
const g4 = g4Raw as AssetJson;
const g5 = g5Raw as AssetJson;
const g6 = g6Raw as AssetJson;
const g7 = g7Raw as AssetJson;
const g8 = g8Raw as AssetJson;

const WA =
  "https://wa.me/6281131077070?text=" +
  encodeURIComponent(
    "Assalamualaikum, saya tertarik menjadi Mitra Travelpreneur PT Sultan Barokah Haramain Cabang Gresik. Mohon informasinya.",
  );

export const Route = createFileRoute("/")({
  loader: async () => {
    try {
      return await getSiteSections();
    } catch {
      return [];
    }
  },
  head: () => ({
    meta: [
      {
        title: "Mitra Travelpreneur Umrah Gresik | Sultan Barokah Haramain",
      },
      {
        name: "description",
        content:
          "Jadi Mitra Travelpreneur resmi PT Sultan Barokah Haramain Cabang Gresik. Komisi jutaan per jemaah, bonus kendaraan, sistem anti-kanibal wilayah. PPIU 0404230002256000.",
      },
      {
        property: "og:title",
        content: "Mitra Travelpreneur Umrah Gresik | Sultan Barokah Haramain",
      },
      {
        property: "og:description",
        content:
          "Raih komisi jutaan, bonus kendaraan, dan amal jariyah sebagai mitra umrah resmi berizin Kemenag di Gresik.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
  errorComponent: () => <Index />,
});

function WhatsAppButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={WA}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-bold text-whatsapp-foreground shadow-[0_18px_45px_-18px_var(--whatsapp)] transition-transform hover:scale-[1.02] ${className}`}
    >
      {children}
    </a>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold">{eyebrow}</p>
      <h2 className="text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">{title}</h2>
    </div>
  );
}

function Header({ c }: { c: SectionContent }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:grid-cols-[auto_1fr_auto] lg:gap-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-gold/40 panel-gradient">
            {str(c, "logo_url") ? (
              <img
                src={str(c, "logo_url")}
                alt={`Logo ${str(c, "brand")}`}
                className="h-9 w-9 object-contain"
                loading="eager"
              />
            ) : (
              <Crown className="h-5 w-5 text-gold" />
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate font-display text-sm text-foreground sm:text-base">
              {str(c, "brand")}
            </p>
            <p className="truncate text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {str(c, "subtitle")}
            </p>
          </div>
        </div>
        <div className="col-span-2 order-3 flex justify-center lg:order-none lg:col-span-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-[10px] font-semibold text-gold sm:text-xs">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
            {str(c, "badge")}
          </span>
        </div>
        <WhatsAppButton className="shrink-0 px-4 py-2 text-xs sm:text-sm">
          <MessageCircle className="h-4 w-4" /> {str(c, "cta")}
        </WhatsAppButton>
      </div>
    </header>
  );
}

function Hero({ c }: { c: SectionContent }) {
  const stats = list<{ label?: string; value?: string }>(c, "stats");
  return (
    <section className="relative overflow-hidden">
      <img
        src={heroBg}
        alt="Siluet Ka'bah dan menara masjid dengan ornamen emas"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,transparent,var(--background))]" />
      <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 md:py-28">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          {str(c, "eyebrow")}
        </p>
        <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl">
          <span className="text-gradient-gold">{str(c, "title_highlight")}</span>{" "}
          {str(c, "title")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {str(c, "description")}
        </p>
        <div className="mt-9 flex justify-center">
          <WhatsAppButton className="px-7 py-4 text-sm sm:text-base">
            <MessageCircle className="h-5 w-5" />
            {str(c, "cta")}
          </WhatsAppButton>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 text-left sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-gold/25 panel-gradient px-4 py-3"
            >
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {s.label}
              </p>
              <p className="mt-1 text-sm font-semibold text-gold">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const AUDIENCE_ICONS = [BookOpenCheck, GraduationCap, Users, HeartHandshake, Star, Sparkles];

function Audience({ c }: { c: SectionContent }) {
  const items = list<{ title?: string; desc?: string }>(c, "items");
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
      <SectionTitle eyebrow={str(c, "eyebrow")} title={str(c, "title")} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const Icon = AUDIENCE_ICONS[i % AUDIENCE_ICONS.length]!;
          return (
            <div
              key={item.title ?? i}
              className="rounded-2xl border border-gold/30 panel-gradient p-6 transition-colors hover:border-gold/60"
            >
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-gold/30 bg-gold/10">
                <Icon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="text-lg text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const SIDE_ICONS = [
  [Wallet, Car, Crown],
  [Sparkles, HeartHandshake, Users],
];

function TwoSides({ c }: { c: SectionContent }) {
  const cols = list<{ badge?: string; items?: { title?: string; desc?: string }[] }>(c, "columns");
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <SectionTitle eyebrow={str(c, "eyebrow")} title={str(c, "title")} />
        <div className="grid gap-6 lg:grid-cols-2">
          {cols.map((col, ci) => (
            <div
              key={col.badge ?? ci}
              className="rounded-3xl border border-gold/30 panel-gradient p-6 sm:p-8"
            >
              <span className="inline-block rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
                {col.badge}
              </span>
              <ul className="mt-6 space-y-5">
                {(col.items ?? []).map((it, ii) => {
                  const group = SIDE_ICONS[ci % SIDE_ICONS.length]!;
                  const Icon = group[ii % group.length]!;
                  return (
                    <li key={it.title ?? ii} className="flex gap-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-gold/25 bg-gold/5">
                        <Icon className="h-4.5 w-4.5 text-gold" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground">{it.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {it.desc}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Territory({ c }: { c: SectionContent }) {
  const districts = list<{ name?: string; potential?: string }>(c, "districts");
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
      <SectionTitle eyebrow={str(c, "eyebrow")} title={str(c, "title")} />
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-gold/30 panel-gradient p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {str(c, "population_label")}
            </p>
            <p className="mt-3 text-3xl font-bold text-gold sm:text-4xl">
              {str(c, "population_value")}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{str(c, "population_desc")}</p>
          </div>
          <div className="rounded-2xl border border-accent/40 bg-accent/10 p-6">
            <div className="flex items-center gap-2 text-accent-foreground">
              <Lock className="h-4 w-4 shrink-0 text-gold" />
              <p className="font-semibold text-gold">{str(c, "lock_title")}</p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {str(c, "lock_desc")}
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-gold/30 panel-gradient p-6">
          <div className="mb-5 flex items-center gap-2">
            <MapPinned className="h-4 w-4 text-gold" />
            <p className="text-sm font-semibold text-foreground">{str(c, "map_title")}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {districts.map((d, i) => (
              <div
                key={d.name ?? i}
                className="rounded-xl border border-border bg-background/50 px-4 py-3"
              >
                <p className="text-sm font-semibold text-foreground">Kecamatan {d.name}</p>
                <p className="mt-1 text-xs text-gold">± {d.potential} potensi jemaah</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-muted-foreground">{str(c, "note")}</p>
        </div>
      </div>
    </section>
  );
}

function HallOfFame({ c }: { c: SectionContent }) {
  const leaders = list<{
    rank?: number;
    name?: string;
    jamaah?: string;
    komisi?: string;
    reward?: string;
  }>(c, "leaders");
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <SectionTitle eyebrow={str(c, "eyebrow")} title={str(c, "title")} />
        <div className="grid gap-5 md:grid-cols-3 md:items-end">
          {leaders.map((l, i) => (
            <div
              key={l.name ?? i}
              className={`rounded-3xl border p-6 text-center panel-gradient ${
                l.rank === 1 ? "border-gold shadow-[var(--shadow-gold)] md:pb-10" : "border-gold/25"
              }`}
            >
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-gold/50 bg-gold/10">
                <Trophy className="h-8 w-8 text-gold" />
              </div>
              <p className="mt-4 inline-block rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-bold text-gold">
                Juara {l.rank}
              </p>
              <h3 className="mt-3 text-lg text-foreground">{l.name}</h3>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between border-b border-border pb-2">
                  <dt className="text-muted-foreground">Jemaah Berangkat</dt>
                  <dd className="font-semibold text-foreground">{l.jamaah}</dd>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <dt className="text-muted-foreground">Total Komisi</dt>
                  <dd className="font-semibold text-gold">{l.komisi}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Reward</dt>
                  <dd className="font-semibold text-foreground">{l.reward}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tools({ c }: { c: SectionContent }) {
  const appItems = list<string>(c, "app_items");
  const academyItems = list<string>(c, "academy_items");
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
      <SectionTitle eyebrow={str(c, "eyebrow")} title={str(c, "title")} />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-gold/30 panel-gradient p-6 sm:p-8">
          <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-gold/30 bg-gold/10">
            <Smartphone className="h-5 w-5 text-gold" />
          </div>
          <h3 className="text-xl text-foreground">{str(c, "app_title")}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{str(c, "app_desc")}</p>
          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            {appItems.map((i) => (
              <li key={i} className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 shrink-0 text-gold" /> {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-gold/30 panel-gradient p-6 sm:p-8">
          <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-gold/30 bg-gold/10">
            <GraduationCap className="h-5 w-5 text-gold" />
          </div>
          <h3 className="text-xl text-foreground">{str(c, "academy_title")}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {str(c, "academy_desc")}
          </p>
          <ul className="mt-5 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            {academyItems.map((i) => (
              <li key={i} className="flex items-start gap-2">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const GALLERY = [
  [g1, "Pelepasan rombongan jemaah umrah Sultan Haramain di bandara"],
  [g2, "Jemaah Sultan Haramain di depan Ka'bah Masjidil Haram"],
  [g3, "Rombongan jemaah di Masjid Quba Madinah"],
  [g4, "Jemaah perempuan di pelataran Masjid Nabawi"],
  [g5, "Jemaah pria berihram di koridor masjid"],
  [g6, "Jemaah Sultan Haramain berfoto di Masjid Nabawi"],
  [g7, "Pendampingan jemaah di dalam Masjidil Haram"],
  [g8, "Jemaah bersama pembimbing di Madinah"],
] as const;

function Gallery({ c }: { c: SectionContent }) {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <SectionTitle eyebrow={str(c, "eyebrow")} title={str(c, "title")} />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {GALLERY.map(([img, alt]) => (
            <figure
              key={img.url}
              className="overflow-hidden rounded-2xl border border-gold/25 bg-background"
            >
              <img
                src={img.url}
                alt={alt}
                loading="lazy"
                width={1024}
                height={1024}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const LEGALITY_ICONS = [Crown, ShieldCheck, Globe, Phone];

function Legality({ c }: { c: SectionContent }) {
  const rows = list<{ label?: string; value?: string }>(c, "rows");
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-24">
      <SectionTitle eyebrow={str(c, "eyebrow")} title={str(c, "title")} />
      <div className="rounded-3xl border border-gold/40 panel-gradient p-6 sm:p-8">
        <dl className="grid gap-4 sm:grid-cols-2">
          {rows.map((row, i) => {
            const Icon = LEGALITY_ICONS[i % LEGALITY_ICONS.length]!;
            return (
              <div
                key={row.label ?? i}
                className="rounded-2xl border border-border bg-background/40 p-5"
              >
                <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  <Icon className="h-4 w-4 shrink-0 text-gold" /> {row.label}
                </dt>
                <dd className="mt-2 font-semibold text-foreground">{row.value}</dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

function FinalCta({ c }: { c: SectionContent }) {
  return (
    <section className="border-t border-gold/30 bg-surface">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <HandCoins className="mx-auto h-8 w-8 text-gold" />
        <h2 className="mt-5 text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">
          {str(c, "title")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
          {str(c, "description")}
        </p>
        <div className="mt-8 flex justify-center">
          <WhatsAppButton className="px-8 py-4 text-base">
            <MessageCircle className="h-5 w-5" /> {str(c, "cta")}
            <ArrowRight className="h-4 w-4" />
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

function Footer({ c }: { c: SectionContent }) {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 text-center sm:px-6">
        <div className="flex items-center justify-center gap-2 text-gold">
          <Crown className="h-4 w-4" />
          <span className="font-display text-sm">{str(c, "brand")}</span>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{str(c, "copyright")}</p>
      </div>
    </footer>
  );
}

function Index() {
  const sections = Route.useLoaderData();
  const show = (key: string) => isVisible(sections, key);

  return (
    <div className="min-h-screen bg-background">
      {show("header") ? <Header c={contentOf(sections, "header")} /> : null}
      <main>
        {show("hero") ? <Hero c={contentOf(sections, "hero")} /> : null}
        {show("audience") ? <Audience c={contentOf(sections, "audience")} /> : null}
        {show("two_sides") ? <TwoSides c={contentOf(sections, "two_sides")} /> : null}
        {show("territory") ? <Territory c={contentOf(sections, "territory")} /> : null}
        {show("hall_of_fame") ? <HallOfFame c={contentOf(sections, "hall_of_fame")} /> : null}
        {show("tools") ? <Tools c={contentOf(sections, "tools")} /> : null}
        {show("gallery") ? <Gallery c={contentOf(sections, "gallery")} /> : null}
        {show("legality") ? <Legality c={contentOf(sections, "legality")} /> : null}
        {show("final_cta") ? <FinalCta c={contentOf(sections, "final_cta")} /> : null}
      </main>
      {show("footer") ? <Footer c={contentOf(sections, "footer")} /> : null}
    </div>
  );
}