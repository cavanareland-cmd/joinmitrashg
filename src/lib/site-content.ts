export type Json = string | number | boolean | null | Json[] | { [k: string]: Json };
export type SectionContent = Record<string, Json>;

export type SiteSection = {
  section_key: string;
  label: string;
  sort_order: number;
  is_visible: boolean;
  content: SectionContent;
};

export const DEFAULT_CONTENT: Record<string, SectionContent> = {
  header: {
    brand: "Sultan Barokah Haramain",
    subtitle: "Kantor Cabang Gresik",
    badge: "Resmi Berizin Kemenag PPIU: 0404230002256000",
    cta: "Daftar Mitra",
    logo_url: "/__l5e/assets-v1/f179f998-317a-4834-a016-e4ff2c7b511b/sultan-haramain-logo.png",
  },
  hero: {
    eyebrow: "Biar orang lain hanya wacana",
    title_highlight: "ANDA YANG BUKTIKAN!",
    title:
      "Raih Komisi Jutaan, Bonus Kendaraan, & Gengsi Positif Sebagai Travelpreneur Resmi PT Sultan Barokah Haramain Gresik",
    description: "",
    cta: "Ambil Posisi Mitra Sekarang — WhatsApp 0811-3107-707",
    stats: [],
  },
  audience: { eyebrow: "Untuk Anda di Gresik", title: "Target Mitra", items: [] },
  two_sides: { eyebrow: "Dual Benefit", title: "Dua Sisi Kekuatan Mitra", columns: [] },
  territory: {
    eyebrow: "Live Territory Data",
    title: "Data Teritorial & Potensi Wilayah Kabupaten Gresik",
    population_label: "Statistik Populasi",
    population_value: "1.304.203 Jiwa",
    population_desc: "",
    lock_title: "Sistem Anti-Kanibal Antar Agen",
    lock_desc: "",
    map_title: "Peta Teritorial & Estimasi Potensi Pasar",
    note: "",
    districts: [],
  },
  hall_of_fame: { eyebrow: "Hall of Fame", title: "Leaderboard Top 3 Agen Terbaik", leaders: [] },
  tools: {
    eyebrow: "Dikasih Kemudahan",
    title: "Aplikasi Mitra Center & Akademi Kemitraan",
    app_title: "Aplikasi Mitra Center",
    app_desc: "",
    app_items: [],
    academy_title: "Akademi Kemitraan",
    academy_desc: "",
    academy_items: [],
  },
  gallery: { eyebrow: "Dokumentasi Lapangan", title: "Galeri Aksi Nyata Mitra & Jemaah Kami" },
  legality: { eyebrow: "Legalitas", title: "Kepercayaan Mutlak, Bukan Sekadar Janji", rows: [] },
  final_cta: { title: "Amankan Kuota Wilayah Anda", description: "", cta: "DAFTAR SEKARANG" },
  footer: { brand: "PT Sultan Barokah Haramain", copyright: "" },
};

export function contentOf(sections: SiteSection[] | undefined, key: string): SectionContent {
  const found = sections?.find((s) => s.section_key === key);
  return { ...(DEFAULT_CONTENT[key] ?? {}), ...(found?.content ?? {}) };
}

export function isVisible(sections: SiteSection[] | undefined, key: string): boolean {
  const found = sections?.find((s) => s.section_key === key);
  return found ? found.is_visible : true;
}

export function str(content: SectionContent, key: string, fallback = ""): string {
  const v = content[key];
  return typeof v === "string" && v.length > 0 ? v : fallback;
}

export function list<T = Record<string, Json>>(content: SectionContent, key: string): T[] {
  const v = content[key];
  return Array.isArray(v) ? (v as T[]) : [];
}