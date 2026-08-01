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
import g1 from "@/assets/Jamaah_Sultan_Haramain_Gresik.jpg.asset.json";
import g2 from "@/assets/Umrah_Murah_di_Gresik.jpg.asset.json";
import g3 from "@/assets/Sultan_Haramain_Gresik_Raya.jpg.asset.json";
import g4 from "@/assets/Agen_Travel_Umrah_Resmi_Gresik.jpg.asset.json";
import g5 from "@/assets/Jasa_Umrah_Surabaya.jpg.asset.json";
import g6 from "@/assets/Ibadah_Jamaah_Sultan_Haramain_Gresik.jpg.asset.json";
import g7 from "@/assets/Umrah_Terpercaya_Lamongan.jpg.asset.json";
import g8 from "@/assets/Agen_Umrah_Resmi_Tuban.jpg.asset.json";

const WA =
  "https://wa.me/6281131077070?text=" +
  encodeURIComponent(
    "Assalamualaikum, saya tertarik menjadi Mitra Travelpreneur PT Sultan Barokah Haramain Cabang Gresik. Mohon informasinya.",
  );

export const Route = createFileRoute("/")({
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

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:grid-cols-[auto_1fr_auto] lg:gap-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold/40 panel-gradient">
            <Crown className="h-5 w-5 text-gold" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-display text-sm text-foreground sm:text-base">
              Sultan Barokah Haramain
            </p>
            <p className="truncate text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Kantor Cabang Gresik
            </p>
          </div>
        </div>
        <div className="col-span-2 order-3 flex justify-center lg:order-none lg:col-span-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-[10px] font-semibold text-gold sm:text-xs">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
            Resmi Berizin Kemenag PPIU: 0404230002256000
          </span>
        </div>
        <WhatsAppButton className="shrink-0 px-4 py-2 text-xs sm:text-sm">
          <MessageCircle className="h-4 w-4" /> Daftar Mitra
        </WhatsAppButton>
      </div>
    </header>
  );
}

function Hero() {
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
          Biar orang lain hanya wacana
        </p>
        <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl">
          <span className="text-gradient-gold">ANDA YANG BUKTIKAN!</span> Raih Komisi Jutaan, Bonus
          Kendaraan, & Gengsi Positif Sebagai Travelpreneur Resmi PT Sultan Barokah Haramain Gresik
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Jangan cuma jadi penonton saat rekan atau tetangga mulai sukses berpenghasilan dari rumah.
          Saatnya ambil peran utama, buktikan kapasitas Anda, dan raih apresiasi setara Sultan yang
          membuat orang lain berdecak kagum.
        </p>
        <div className="mt-9 flex justify-center">
          <WhatsAppButton className="px-7 py-4 text-sm sm:text-base">
            <MessageCircle className="h-5 w-5" />
            Ambil Posisi Mitra Sekarang — WhatsApp 0811-3107-707
          </WhatsAppButton>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 text-left sm:grid-cols-4">
          {[
            ["Komisi Tunai", "Jutaan / Jemaah"],
            ["Reward", "Motor & Mobil"],
            ["Wilayah", "Anti-Kanibal"],
            ["Legalitas", "PPIU Kemenag"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-gold/25 panel-gradient px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{k}</p>
              <p className="mt-1 text-sm font-semibold text-gold">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const AUDIENCE = [
  { icon: BookOpenCheck, title: "Guru Ngaji", desc: "Amanah ilmu Anda kini bernilai penghasilan." },
  { icon: GraduationCap, title: "Ustadzah TPQ", desc: "Dipercaya wali santri, mudah dipercaya jemaah." },
  { icon: Users, title: "Guru Sekolah", desc: "Jaringan rekan guru & orang tua adalah aset." },
  { icon: HeartHandshake, title: "Kader PKK", desc: "Aktif di masyarakat, dekat dengan warga." },
  { icon: Star, title: "Ketua Majelis Taklim", desc: "Punya jamaah setia yang merindukan tanah suci." },
  { icon: Sparkles, title: "Ibu Rumah Tangga", desc: "Usia 25–55 tahun, ingin mandiri finansial." },
];

function Audience() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
      <SectionTitle
        eyebrow="Untuk Anda di Gresik"
        title="Kami Menyapa Hangat Para Perempuan Tangguh & Tokoh Umat"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {AUDIENCE.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-2xl border border-gold/30 panel-gradient p-6 transition-colors hover:border-gold/60"
          >
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-gold/30 bg-gold/10">
              <Icon className="h-5 w-5 text-gold" />
            </div>
            <h3 className="text-lg text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TwoSides() {
  const cols = [
    {
      badge: "Sisi Prestige & Pembuktian Diri",
      items: [
        { icon: Wallet, t: "Komisi Tunai Jutaan Rupiah", d: "Dibayarkan per jemaah yang berangkat, transparan dan tercatat rapi." },
        { icon: Car, t: "Bonus Reward Kendaraan", d: "Motor hingga mobil untuk mitra dengan pencapaian terbaik." },
        { icon: Crown, t: "Status Wanita Berdikari", d: "Transformasi status sosial menjadi sosok mandiri yang disegani." },
      ],
    },
    {
      badge: "Sisi Amal Jariyah & Manfaat Sosial",
      items: [
        { icon: Sparkles, t: "Ladang Pahala Tanpa Batas", d: "Menjadi perantara berangkatnya para tamu Allah ke tanah suci." },
        { icon: HeartHandshake, t: "Keberkahan Keluarga", d: "Rezeki halal yang membawa ketenangan bagi rumah tangga." },
        { icon: Users, t: "Ukhuwah Islamiyah Meluas", d: "Silaturahmi bertambah, jaringan dakwah semakin kuat." },
      ],
    },
  ];
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <SectionTitle eyebrow="Dual Benefit" title="Dua Sisi Kekuatan Mitra" />
        <div className="grid gap-6 lg:grid-cols-2">
          {cols.map((col) => (
            <div key={col.badge} className="rounded-3xl border border-gold/30 panel-gradient p-6 sm:p-8">
              <span className="inline-block rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
                {col.badge}
              </span>
              <ul className="mt-6 space-y-5">
                {col.items.map(({ icon: Icon, t, d }) => (
                  <li key={t} className="flex gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-gold/25 bg-gold/5">
                      <Icon className="h-4.5 w-4.5 text-gold" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground">{t}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const KECAMATAN = [
  ["Manyar", "13.200"],
  ["Kebomas", "11.850"],
  ["Menganti", "15.500"],
  ["Driyorejo", "12.400"],
  ["Cerme", "9.300"],
  ["Duduksampeyan", "7.100"],
];

function Territory() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
      <SectionTitle
        eyebrow="Live Territory Data"
        title="Data Teritorial & Potensi Wilayah Kabupaten Gresik"
      />
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-gold/30 panel-gradient p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Statistik Populasi
            </p>
            <p className="mt-3 text-3xl font-bold text-gold sm:text-4xl">1.304.203 Jiwa</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Total populasi Kabupaten Gresik (sumber: BPS) — pasar jemaah umrah yang sangat luas.
            </p>
          </div>
          <div className="rounded-2xl border border-accent/40 bg-accent/10 p-6">
            <div className="flex items-center gap-2 text-accent-foreground">
              <Lock className="h-4 w-4 shrink-0 text-gold" />
              <p className="font-semibold text-gold">Sistem Anti-Kanibal Antar Agen</p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Wilayah garapan setiap mitra dikunci dan dilindungi. Tidak ada perebutan prospek antar
              sesama agen — Anda bekerja tenang di teritori sendiri.
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-gold/30 panel-gradient p-6">
          <div className="mb-5 flex items-center gap-2">
            <MapPinned className="h-4 w-4 text-gold" />
            <p className="text-sm font-semibold text-foreground">
              Peta Teritorial & Estimasi Potensi Pasar
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {KECAMATAN.map(([name, val]) => (
              <div
                key={name}
                className="rounded-xl border border-border bg-background/50 px-4 py-3"
              >
                <p className="text-sm font-semibold text-foreground">Kecamatan {name}</p>
                <p className="mt-1 text-xs text-gold">± {val} potensi jemaah</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            Kuota mitra per kecamatan dibatasi untuk menjaga kualitas layanan dan penghasilan mitra.
          </p>
        </div>
      </div>
    </section>
  );
}

const LEADERS = [
  { rank: 2, name: "Ustadzah Nur Aini", jamaah: 96, komisi: "Rp 184 Juta", reward: "Motor Matic Premium" },
  { rank: 1, name: "Hj. Siti Maryam", jamaah: 152, komisi: "Rp 312 Juta", reward: "Mobil Keluarga" },
  { rank: 3, name: "Bu Rohmah Kader PKK", jamaah: 74, komisi: "Rp 141 Juta", reward: "Umrah Gratis" },
];

function HallOfFame() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <SectionTitle eyebrow="Hall of Fame" title="Leaderboard Top 3 Agen Terbaik" />
        <div className="grid gap-5 md:grid-cols-3 md:items-end">
          {LEADERS.map((l) => (
            <div
              key={l.rank}
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

function Tools() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
      <SectionTitle eyebrow="Dikasih Kemudahan" title="Aplikasi Mitra Center & Akademi Kemitraan" />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-gold/30 panel-gradient p-6 sm:p-8">
          <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-gold/30 bg-gold/10">
            <Smartphone className="h-5 w-5 text-gold" />
          </div>
          <h3 className="text-xl text-foreground">Aplikasi Mitra Center</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Buku saku digital terpusat: kelola data jemaah, pantau progres keberangkatan, dan lihat
            pencatatan komisi secara real-time dari genggaman Anda.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            {["Manajemen data jemaah", "Pencatatan & rekap komisi", "Status dokumen dan jadwal"].map(
              (i) => (
                <li key={i} className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 shrink-0 text-gold" /> {i}
                </li>
              ),
            )}
          </ul>
        </div>
        <div className="rounded-3xl border border-gold/30 panel-gradient p-6 sm:p-8">
          <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-gold/30 bg-gold/10">
            <GraduationCap className="h-5 w-5 text-gold" />
          </div>
          <h3 className="text-xl text-foreground">Akademi Kemitraan</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Modul kursus online interaktif yang membentuk Anda jadi travelpreneur profesional.
          </p>
          <ul className="mt-5 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            {[
              "Product Knowledge Paket November 2026",
              "Riset Market Wilayah",
              "Soft Skill Komunikasi",
              "Teknik Closing Lembut Jemaah Senior",
              "Panduan Fiqih Umrah",
              "Sertifikasi Mitra Resmi",
            ].map((i) => (
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

function Gallery() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <SectionTitle
          eyebrow="Dokumentasi Lapangan"
          title="Galeri Aksi Nyata Mitra & Jemaah Kami"
        />
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

function Legality() {
  const rows = [
    { icon: Crown, label: "Badan Hukum", value: "PT Sultan Barokah Haramain (Kantor Cabang Gresik)" },
    { icon: ShieldCheck, label: "Nomor Izin PPIU (Kemenag)", value: "0404230002256000" },
    { icon: Globe, label: "Website Resmi", value: "sultanharamaingresik.com" },
    { icon: Phone, label: "WhatsApp Resmi", value: "0811-3107-707" },
  ];
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-24">
      <SectionTitle eyebrow="Legalitas" title="Kepercayaan Mutlak, Bukan Sekadar Janji" />
      <div className="rounded-3xl border border-gold/40 panel-gradient p-6 sm:p-8">
        <dl className="grid gap-4 sm:grid-cols-2">
          {rows.map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-2xl border border-border bg-background/40 p-5">
              <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                <Icon className="h-4 w-4 shrink-0 text-gold" /> {label}
              </dt>
              <dd className="mt-2 font-semibold text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="border-t border-gold/30 bg-surface">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <HandCoins className="mx-auto h-8 w-8 text-gold" />
        <h2 className="mt-5 text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">
          Jangan Tunggu Sampai Tetangga Anda Duluan yang Mengamankan Kuota Wilayah Kecamatan Anda!
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
          Kuota mitra per kecamatan terbatas. Amankan teritori Anda hari ini juga.
        </p>
        <div className="mt-8 flex justify-center">
          <WhatsAppButton className="px-8 py-4 text-base">
            <MessageCircle className="h-5 w-5" /> DAFTAR SEKARANG — KLIK DISINI
            <ArrowRight className="h-4 w-4" />
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 text-center sm:px-6">
        <div className="flex items-center justify-center gap-2 text-gold">
          <Crown className="h-4 w-4" />
          <span className="font-display text-sm">PT Sultan Barokah Haramain</span>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Copyright © 2026 PT Sultan Barokah Haramain — Kantor Cabang Gresik. Semua Hak Dilindungi.
        </p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Audience />
        <TwoSides />
        <Territory />
        <HallOfFame />
        <Tools />
        <Gallery />
        <Legality />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
