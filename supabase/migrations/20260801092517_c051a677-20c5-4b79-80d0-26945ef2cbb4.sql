CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.site_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text NOT NULL UNIQUE,
  label text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_sections TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_sections TO authenticated;
GRANT ALL ON public.site_sections TO service_role;
ALTER TABLE public.site_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read sections"
ON public.site_sections FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Admins can insert sections"
ON public.site_sections FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update sections"
ON public.site_sections FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete sections"
ON public.site_sections FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_site_sections_updated_at
BEFORE UPDATE ON public.site_sections
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.site_sections (section_key, label, sort_order, content) VALUES
('header', 'Header', 10, '{"brand":"Sultan Barokah Haramain","subtitle":"Kantor Cabang Gresik","badge":"Resmi Berizin Kemenag PPIU: 0404230002256000","cta":"Daftar Mitra"}'::jsonb),
('hero', 'Hero', 20, '{"eyebrow":"Biar orang lain hanya wacana","title_highlight":"ANDA YANG BUKTIKAN!","title":"Raih Komisi Jutaan, Bonus Kendaraan, & Gengsi Positif Sebagai Travelpreneur Resmi PT Sultan Barokah Haramain Gresik","description":"Jangan cuma jadi penonton saat rekan atau tetangga mulai sukses berpenghasilan dari rumah. Saatnya ambil peran utama, buktikan kapasitas Anda, dan raih apresiasi setara Sultan yang membuat orang lain berdecak kagum.","cta":"Ambil Posisi Mitra Sekarang — WhatsApp 0811-3107-707","stats":[{"label":"Komisi Tunai","value":"Jutaan / Jemaah"},{"label":"Reward","value":"Motor & Mobil"},{"label":"Wilayah","value":"Anti-Kanibal"},{"label":"Legalitas","value":"PPIU Kemenag"}]}'::jsonb),
('audience', 'Target Audiens', 30, '{"eyebrow":"Untuk Anda di Gresik","title":"Kami Menyapa Hangat Para Perempuan Tangguh & Tokoh Umat","items":[{"title":"Guru Ngaji","desc":"Amanah ilmu Anda kini bernilai penghasilan."},{"title":"Ustadzah TPQ","desc":"Dipercaya wali santri, mudah dipercaya jemaah."},{"title":"Guru Sekolah","desc":"Jaringan rekan guru & orang tua adalah aset."},{"title":"Kader PKK","desc":"Aktif di masyarakat, dekat dengan warga."},{"title":"Ketua Majelis Taklim","desc":"Punya jamaah setia yang merindukan tanah suci."},{"title":"Ibu Rumah Tangga","desc":"Usia 25–55 tahun, ingin mandiri finansial."}]}'::jsonb),
('two_sides', 'Dua Sisi Kekuatan', 40, '{"eyebrow":"Dual Benefit","title":"Dua Sisi Kekuatan Mitra","columns":[{"badge":"Sisi Prestige & Pembuktian Diri","items":[{"title":"Komisi Tunai Jutaan Rupiah","desc":"Dibayarkan per jemaah yang berangkat, transparan dan tercatat rapi."},{"title":"Bonus Reward Kendaraan","desc":"Motor hingga mobil untuk mitra dengan pencapaian terbaik."},{"title":"Status Wanita Berdikari","desc":"Transformasi status sosial menjadi sosok mandiri yang disegani."}]},{"badge":"Sisi Amal Jariyah & Manfaat Sosial","items":[{"title":"Ladang Pahala Tanpa Batas","desc":"Menjadi perantara berangkatnya para tamu Allah ke tanah suci."},{"title":"Keberkahan Keluarga","desc":"Rezeki halal yang membawa ketenangan bagi rumah tangga."},{"title":"Ukhuwah Islamiyah Meluas","desc":"Silaturahmi bertambah, jaringan dakwah semakin kuat."}]}]}'::jsonb),
('territory', 'Data Teritorial', 50, '{"eyebrow":"Live Territory Data","title":"Data Teritorial & Potensi Wilayah Kabupaten Gresik","population_label":"Statistik Populasi","population_value":"1.304.203 Jiwa","population_desc":"Total populasi Kabupaten Gresik (sumber: BPS) — pasar jemaah umrah yang sangat luas.","lock_title":"Sistem Anti-Kanibal Antar Agen","lock_desc":"Wilayah garapan setiap mitra dikunci dan dilindungi. Tidak ada perebutan prospek antar sesama agen — Anda bekerja tenang di teritori sendiri.","map_title":"Peta Teritorial & Estimasi Potensi Pasar","note":"Kuota mitra per kecamatan dibatasi untuk menjaga kualitas layanan dan penghasilan mitra.","districts":[{"name":"Manyar","potential":"13.200"},{"name":"Kebomas","potential":"11.850"},{"name":"Menganti","potential":"15.500"},{"name":"Driyorejo","potential":"12.400"},{"name":"Cerme","potential":"9.300"},{"name":"Duduksampeyan","potential":"7.100"}]}'::jsonb),
('hall_of_fame', 'Hall of Fame', 60, '{"eyebrow":"Hall of Fame","title":"Leaderboard Top 3 Agen Terbaik","leaders":[{"rank":2,"name":"Ustadzah Nur Aini","jamaah":"96","komisi":"Rp 184 Juta","reward":"Motor Matic Premium"},{"rank":1,"name":"Hj. Siti Maryam","jamaah":"152","komisi":"Rp 312 Juta","reward":"Mobil Keluarga"},{"rank":3,"name":"Bu Rohmah Kader PKK","jamaah":"74","komisi":"Rp 141 Juta","reward":"Umrah Gratis"}]}'::jsonb),
('tools', 'Tools & Akademi', 70, '{"eyebrow":"Dikasih Kemudahan","title":"Aplikasi Mitra Center & Akademi Kemitraan","app_title":"Aplikasi Mitra Center","app_desc":"Buku saku digital terpusat: kelola data jemaah, pantau progres keberangkatan, dan lihat pencatatan komisi secara real-time dari genggaman Anda.","app_items":["Manajemen data jemaah","Pencatatan & rekap komisi","Status dokumen dan jadwal"],"academy_title":"Akademi Kemitraan","academy_desc":"Modul kursus online interaktif yang membentuk Anda jadi travelpreneur profesional.","academy_items":["Product Knowledge Paket November 2026","Riset Market Wilayah","Soft Skill Komunikasi","Teknik Closing Lembut Jemaah Senior","Panduan Fiqih Umrah","Sertifikasi Mitra Resmi"]}'::jsonb),
('gallery', 'Galeri', 80, '{"eyebrow":"Dokumentasi Lapangan","title":"Galeri Aksi Nyata Mitra & Jemaah Kami"}'::jsonb),
('legality', 'Legalitas', 90, '{"eyebrow":"Legalitas","title":"Kepercayaan Mutlak, Bukan Sekadar Janji","rows":[{"label":"Badan Hukum","value":"PT Sultan Barokah Haramain (Kantor Cabang Gresik)"},{"label":"Nomor Izin PPIU (Kemenag)","value":"0404230002256000"},{"label":"Website Resmi","value":"sultanharamaingresik.com"},{"label":"WhatsApp Resmi","value":"0811-3107-707"}]}'::jsonb),
('final_cta', 'CTA Akhir', 100, '{"title":"Jangan Tunggu Sampai Tetangga Anda Duluan yang Mengamankan Kuota Wilayah Kecamatan Anda!","description":"Kuota mitra per kecamatan terbatas. Amankan teritori Anda hari ini juga.","cta":"DAFTAR SEKARANG — KLIK DISINI"}'::jsonb),
('footer', 'Footer', 110, '{"brand":"PT Sultan Barokah Haramain","copyright":"Copyright © 2026 PT Sultan Barokah Haramain — Kantor Cabang Gresik. Semua Hak Dilindungi."}'::jsonb);