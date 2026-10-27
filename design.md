# DESIGN.md — ductingkitchen.id

**Versi:** 1.0
**Tanggal:** 26 Oktober 2026
**Acuan:** PRD v1.1 (`prd.md`)
**Stack:** Bootstrap 5.3, HTML5, CSS3, JavaScript vanilla

---

## 1. Arah Desain

Website layanan B2B untuk dapur komersial. Tampilan harus sederhana, mudah dipahami, dan enak dilihat. Warna dasar **lightskyblue** dan **beige**, dengan navy gelap hanya untuk teks. Kesan yang dituju: rapi, teknis, dan dapat dipercaya, bukan tampilan template yang seragam.

### 1.1 Data bisnis yang dipakai di desain

| Data | Nilai |
|------|-------|
| WhatsApp (tampilan) | 0852-1062-0252 |
| WhatsApp (tautan) | `https://wa.me/6285210620252` |
| Alamat | Jl. Gramapuri Persada Blok H9 No.2, Cibitung, Bekasi |
| Tautan peta | `https://www.google.com/maps/search/?api=1&query=Jl.+Gramapuri+Persada+Blok+H9+No.2+Cibitung+Bekasi` |

Peta tidak ditanam (embed) agar halaman tetap ringan; cukup tautan ke Google Maps.

### 1.2 Prinsip

1. **Sederhana dulu.** Satu tindakan utama per layar. Hindari elemen yang hanya mengisi ruang.
2. **Foto asli lebih penting daripada dekorasi.** Ruang visual diisi foto pekerjaan, bukan ilustrasi umum.
3. **Warna dipakai dengan hemat.** Lightskyblue untuk navbar, footer, dan aksen; beige sebagai warna dasar halaman; navy untuk teks.
4. **Teks rata kiri.** Hanya judul bagian tertentu yang boleh di tengah.
5. **Konsisten.** Satu radius, satu gaya ikon, satu gaya tombol utama.

### 1.3 Yang dihindari (agar tidak terkesan template AI)

- Emoji di mana pun (judul, tombol, daftar, teks isi).
- Ikon panah pada tombol dan tautan teks (lihat 5.3 untuk satu-satunya pengecualian).
- Gradien warna, gradien pada teks, bentuk blob dekoratif, glassmorphism, dan efek glow.
- Baris tiga kartu identik berisi ikon dan judul yang diulang di setiap bagian.
- Ikon bergaya "sparkle"/bintang kilau sebagai penanda fitur.
- Foto stok orang berjabat tangan atau ilustrasi vektor generik.
- Slogan klise seperti "solusi terdepan" dan "terpercaya nomor satu" (juga dilarang PRD).
- Bayangan tebal dan sudut sangat bulat (pill) pada semua elemen.
- Animasi masuk saat scroll, parallax, dan carousel otomatis.

---

## 2. Warna

### 2.1 Token

| Token | Nilai | Peran |
|-------|-------|-------|
| `--sky` | `#87CEFA` (lightskyblue) | Latar navbar, footer, aksen |
| `--sky-deep` | `#1F6FA8` | Tombol utama, tautan, teks aksen pada latar terang |
| `--sky-soft` | `#E3F3FD` | Latar seksi selang-seling, latar page banner |
| `--beige` | `#F5EFE0` | Latar halaman, tombol CTA navbar, tombol kembali ke atas |
| `--beige-deep` | `#E6DAC0` | Latar blok sekunder, label |
| `--white` | `#FFFFFF` | Kartu, kolom input, teks pada latar gelap |
| `--ink` | `#10283A` | Teks utama dan judul |
| `--ink-soft` | `#3E5566` | Teks sekunder, keterangan |
| `--line` | `#D9CFB8` | Garis pembatas dan border kartu |
| `--line-strong` | `#8A7F63` | Border kolom formulir |
| `--wa` | `#1DA851` | Tombol WhatsApp melayang |
| `--error` | `#B3261E` | Pesan galat |
| `--success` | `#2E7D4F` | Pesan berhasil |

### 2.2 Pemakaian

- Latar halaman: `--beige`. Seksi selang-seling: `--sky-soft`. Kartu: `--white` dengan border `--line`.
- Navbar dan footer: `--sky`.
- Teks isi: `--ink`. Keterangan: `--ink-soft`.
- Tautan dalam isi: `--sky-deep`, bergaris bawah.
- Navy hanya untuk teks dan garis tipis, bukan sebagai blok warna besar.

### 2.3 Peringatan kontras navbar

Navbar sesuai permintaan: latar lightskyblue dengan teks putih atau beige. Kombinasi ini **tidak lolos WCAG AA**:

| Kombinasi | Rasio kontras | Batas AA (teks normal) |
|-----------|---------------|------------------------|
| Putih di atas `--sky` | sekitar 1,7 : 1 | 4,5 : 1 |
| Beige di atas `--sky` | sekitar 1,5 : 1 | 4,5 : 1 |
| Navy `--ink` di atas `--sky` | sekitar 8,8 : 1 | lolos |
| Putih di atas `--sky-deep` | sekitar 5,4 : 1 | lolos |
| Beige di atas `--sky-deep` | sekitar 4,7 : 1 | lolos |

Teks tebal membantu keterbacaan, tetapi tidak mengubah rasio ini. Dampaknya: teks menu sulit dibaca di bawah sinar matahari atau layar redup, dan audit aksesibilitas Lighthouse akan menandai kontras warna (PRD mensyaratkan skor Accessibility ≥ 90).

Spesifikasi default mengikuti permintaan. Perpindahan ke alternatif cukup mengubah variabel di bagian 14:

- **Alternatif A (disarankan):** latar navbar tetap `--sky`, teks menu dan logo memakai `--ink`. Tampilan masih lightskyblue dan penanda halaman aktif (tebal) tetap berfungsi.
- **Alternatif B:** latar navbar memakai `--sky-deep`, teks putih atau beige. Lightskyblue tetap dipakai di footer dan seksi.

---

## 3. Tipografi

**Font:** IBM Plex Sans. Dua weight saja: 400 (isi) dan 700 (judul, tombol, penanda halaman aktif). Di-host sendiri dalam format `woff2` (subset Latin) dengan `font-display: swap`.

**Cadangan:** `system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`.

| Elemen | Mobile | Desktop (≥ 992 px) | Weight | Line-height |
|--------|--------|---------------------|--------|-------------|
| H1 | 2rem | 2.75rem | 700 | 1.2 |
| H2 | 1.5rem | 2rem | 700 | 1.25 |
| H3 | 1.25rem | 1.375rem | 700 | 1.3 |
| Isi | 1rem | 1rem | 400 | 1.65 |
| Teks kecil / keterangan | 0.875rem | 0.875rem | 400 | 1.5 |
| Tombol | 1rem | 1rem | 700 | 1.2 |

- Lebar baris teks panjang (artikel blog) maksimal sekitar 70 karakter.
- Tidak memakai huruf kapital semua untuk judul atau menu.
- Teks tebal dipakai untuk penekanan fungsional, bukan untuk seluruh paragraf.

---

## 4. Spasi, Grid, Radius, Bayangan

- **Skala spasi (basis 4 px):** 4, 8, 12, 16, 24, 32, 48, 64, 96.
- **Padding vertikal seksi:** 64 px di mobile, 96 px di desktop.
- **Kontainer:** lebar maksimal 1140 px (Bootstrap `xl`), gutter 24 px.
- **Breakpoint:** bawaan Bootstrap. Navbar berubah menjadi menu hamburger di bawah `lg` (992 px).
- **Radius:** 8 px untuk tombol, kartu, kolom input, dan gambar. Lingkaran penuh hanya untuk tombol melayang.
- **Bayangan:** kartu tidak memakai bayangan, cukup border `--line`. Satu bayangan lembut hanya untuk tombol melayang: `0 2px 8px rgba(16, 40, 58, 0.25)`.
- **Tinggi navbar:** 72 px di desktop, 64 px di mobile.

---

## 5. Ikon

### 5.1 Aturan

- Pakai ikon hanya bila membantu pengunjung memahami konten. Jangan menaruh ikon di setiap judul.
- Satu set ikon yang konsisten: SVG inline dari **Bootstrap Icons** (lisensi MIT), disalin satu per satu, bukan memuat seluruh font ikon (sesuai PRD 7.1).
- Warna mengikuti `currentColor`. Ukuran 20 px di dalam teks/tombol, 24 px di dalam kotak ikon kartu.
- Ikon dekoratif memakai `aria-hidden="true"`. Tombol yang hanya berisi ikon wajib punya `aria-label`.

### 5.2 Pemetaan ikon (verifikasi nama di icons.getbootstrap.com)

| Kebutuhan | Ikon yang disarankan |
|-----------|----------------------|
| WhatsApp | `whatsapp` |
| Telepon | `telephone` |
| Email | `envelope` |
| Alamat | `geo-alt` |
| Jam operasional | `clock` |
| Menu hamburger | `list` |
| Tutup menu | `x-lg` |
| Layanan ducting | `wind` |
| Layanan kitchen hood | `funnel` |
| Layanan exhaust system | `speedometer2` |
| Layanan cleaning | `brush` |
| Layanan desain dan konsultasi | `rulers` |
| Pesan galat formulir | `exclamation-circle` |
| Pesan berhasil formulir | `check-circle` |
| FAQ buka/tutup | `plus` dan `dash` |

Jika tidak ada ikon yang cocok, gunakan SVG garis sederhana yang konsisten, atau tanpa ikon.

### 5.3 Panah

Tidak ada ikon panah pada tombol, tautan teks, kartu, accordion, maupun pemisah breadcrumb (pakai garis miring `/`). **Satu-satunya pengecualian** adalah tombol kembali ke atas (bagian 10), sesuai permintaan, memakai ikon `arrow-up`.

---

## 6. Tombol dan Tautan

| Jenis | Tampilan | Dipakai untuk |
|-------|----------|---------------|
| Utama (`.btn-dk`) | Latar `--sky-deep`, teks putih tebal, border 1,5 px `--sky-deep` | Konsultasi Proyek, Minta Estimasi Penawaran, Kirim Permintaan |
| Sekunder (`.btn-dk--outline`) | Latar transparan, teks `--sky-deep` tebal, border 1,5 px `--sky-deep` | Lihat Portofolio, Lihat Layanan |
| Navbar (`.btn-dk--nav`) | Latar `--beige`, teks `--ink` tebal, border 1,5 px `--sky-deep` | Hubungi Kami di navbar |
| WhatsApp (`.btn-dk--wa`) | Latar `--wa`, teks putih tebal, ikon WhatsApp di kiri label | Chat WhatsApp di dalam isi halaman |

- Tinggi minimal 44 px, padding horizontal 20 px, radius 8 px.
- Hover: warna latar sedikit lebih gelap; tanpa pergeseran posisi atau bayangan.
- Fokus keyboard: outline 3 px `--ink`, offset 2 px (putih di atas foto gelap).
- **Label tombol** memakai Title Case, singkat, dan tanpa tanda seru: Hubungi Kami, Konsultasi Proyek, Minta Estimasi Penawaran, Lihat Layanan, Lihat Portofolio, Kirim Permintaan, Chat WhatsApp.
- **Tautan teks** (mis. "Pelajari layanan"): tebal, warna `--sky-deep`, bergaris bawah saat hover, tanpa ikon.

---

## 7. Navbar

### 7.1 Tata letak (desktop, ≥ 992 px)

Tiga zona dalam satu baris:

| Kiri | Tengah | Kanan |
|------|--------|-------|
| Logo | Menu teks | Tombol beige "Hubungi Kami" |

- Latar `--sky`, sticky di atas, border bawah 1 px `rgba(16, 40, 58, 0.12)`.
- Zona tengah benar-benar di tengah halaman (grid `1fr auto 1fr`), bukan sekadar di sisa ruang antara logo dan tombol.
- **Menu (5 item):** Beranda, Layanan, Portofolio, Blog, Tentang. Portofolio hanya muncul setelah memenuhi syarat terbit di PRD Bagian 15. Industri dan Kebijakan Privasi ada di footer. "Kontak" tidak diulang di menu karena sudah diwakili tombol Hubungi Kami.
- **Tombol Hubungi Kami** menuju `/kontak/` (formulir dan WhatsApp ada di sana). Event tracking: `click_cta_quote`, `location=header`.
- Teks menu dan logo mengikuti spesifikasi permintaan: putih (atau beige) di atas `--sky`. Lihat peringatan kontras di 2.3.

### 7.2 Penanda halaman aktif

- Menu biasa: weight 400. **Halaman aktif: weight 700 (tebal)** dengan `aria-current="page"`.
- Perpindahan ke tebal tidak boleh menggeser posisi menu. Lebar tebal dicadangkan lewat pseudo-element tersembunyi (lihat CSS).
- Hover: garis bawah 2 px dengan offset 6 px.
- Atribut `aria-current="page"` dipasang manual pada tiap berkas HTML (sesuai PRD 7.5). Untuk halaman turunan (mis. detail layanan), menu induk yang ditandai.

### 7.3 Mobile (< 992 px)

- Baris atas: logo di kiri, tombol hamburger di kanan (ukuran sentuh minimal 44 × 44 px, `aria-label="Buka menu"`).
- Menu terbuka sebagai panel di bawah navbar dengan latar `--sky`. Tautan bertumpuk, tinggi sentuh 48 px, teks 18 px. Halaman aktif tebal.
- Tombol Hubungi Kami berada di bagian bawah panel dengan lebar penuh.
- Panel menutup saat tautan dipilih atau tombol hamburger ditekan lagi.

### 7.4 Logo

- Posisi kiri, tinggi 40 px di desktop dan 32 px di mobile, lebar menyesuaikan.
- Format SVG (cadangan WebP/PNG). Tersedia versi yang terbaca di atas `--sky`.
- File logo belum tersedia: **[KONFIRMASI: file logo dan versi di atas latar lightskyblue]**. Sementara, gunakan teks "Ducting Kitchen" tebal sebagai pengganti sementara.

### 7.5 Kerangka HTML

```html
<header class="site-nav navbar navbar-expand-lg">
  <div class="container site-nav__bar">
    <a class="site-nav__brand" href="/">
      <img src="/assets/img/umum/logo-ducting-kitchen.svg" alt="Ducting Kitchen" width="160" height="40">
    </a>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#menu-utama" aria-controls="menu-utama"
            aria-expanded="false" aria-label="Buka menu">
      <!-- SVG bi-list -->
    </button>

    <div class="collapse navbar-collapse" id="menu-utama">
      <ul class="site-nav__links">
        <li><a href="/" data-label="Beranda" aria-current="page">Beranda</a></li>
        <li><a href="/layanan/" data-label="Layanan">Layanan</a></li>
        <li><a href="/portofolio/" data-label="Portofolio">Portofolio</a></li>
        <li><a href="/blog/" data-label="Blog">Blog</a></li>
        <li><a href="/tentang/" data-label="Tentang">Tentang</a></li>
      </ul>
      <a class="btn-dk btn-dk--nav site-nav__cta" href="/kontak/"
         data-track="click_cta_quote" data-location="header">Hubungi Kami</a>
    </div>
  </div>
</header>
```

### 7.6 Kerangka CSS

```css
.site-nav {
  position: sticky; top: 0; z-index: 1030;
  background: var(--nav-bg); color: var(--nav-fg);
  border-bottom: 1px solid rgba(16, 40, 58, 0.12);
  padding: 0;
}
.site-nav__bar { min-height: 64px; display: flex; align-items: center; justify-content: space-between; }
.site-nav__brand { display: inline-flex; align-items: center; }
.site-nav__links { display: flex; gap: 32px; margin: 0; padding: 0; list-style: none; }
.site-nav__links a {
  display: inline-flex; flex-direction: column; align-items: center;
  color: var(--nav-fg); font-weight: 400; text-decoration: none;
}
/* Mencadangkan lebar teks tebal agar menu tidak bergeser saat aktif */
.site-nav__links a::after {
  content: attr(data-label); font-weight: 700;
  height: 0; overflow: hidden; visibility: hidden;
}
.site-nav__links a[aria-current="page"] { font-weight: 700; }
.site-nav__links a:hover {
  text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 6px;
}

@media (min-width: 992px) {
  .site-nav__bar { display: grid; grid-template-columns: 1fr auto 1fr; gap: 24px; min-height: 72px; }
  .site-nav .navbar-collapse { display: contents !important; }  /* link dan CTA menjadi anak grid */
  .site-nav__brand { justify-self: start; }
  .site-nav__links { justify-self: center; }
  .site-nav__cta { justify-self: end; }
  .site-nav .navbar-toggler { display: none; }
}

@media (max-width: 991.98px) {
  #menu-utama { flex-basis: 100%; padding: 8px 0 16px; }
  .site-nav__links { flex-direction: column; gap: 0; }
  .site-nav__links a { flex-direction: row; min-height: 48px; font-size: 1.125rem; align-items: center; }
  .site-nav__links a::after { display: none; }
  .site-nav__cta { width: 100%; justify-content: center; margin-top: 12px; }
}
```

Kerangka ini perlu diuji ulang saat implementasi, terutama perilaku `display: contents` pada Bootstrap collapse.

---

## 8. Page Banner dan Hero

### 8.1 Pembagian

- **Beranda** memakai **hero** (bagian 8.4), bukan page banner.
- **Semua halaman lain** memakai **page banner** tepat di bawah navbar: layanan (indeks dan detail), portofolio (indeks dan detail), industri, blog (daftar dan artikel), tentang, kontak, dan kebijakan privasi. Halaman 404 tidak memakai banner.

### 8.2 Isi banner

Urutan di dalam banner (rata kiri):

1. Breadcrumb dengan pemisah `/`.
2. **H1** halaman (satu H1 per halaman; banner adalah tempat H1).
3. Satu kalimat deskripsi, maksimal sekitar 140 karakter.
4. Opsional: tombol CTA (hanya di halaman layanan: "Minta Estimasi Penawaran").

Banner artikel blog menampilkan byline (penulis, tanggal terbit, tanggal diperbarui) sebagai pengganti deskripsi.

### 8.3 Dua varian

| Varian | Tampilan | Dipakai saat |
|--------|----------|--------------|
| `page-banner` (polos) | Latar `--sky-soft`, teks `--ink`, border bawah 1 px `--line`, padding vertikal 40 px (mobile) / 56 px (desktop) | Default, dan selama foto asli belum tersedia |
| `page-banner--photo` | Foto asli sebagai latar dengan lapisan navy `rgba(16, 40, 58, 0.7)`, teks putih, tinggi minimal 200 px (mobile) / 260 px (desktop) | Halaman yang memiliki foto asli relevan |

- Foto banner memakai tag `<img>` (bukan CSS background), `object-fit: cover`, ukuran sumber 1600 × 500, format WebP, `fetchpriority="high"` karena menjadi kandidat LCP, `width` dan `height` terisi.
- Foto dekoratif memakai `alt=""`. Foto yang membawa informasi memakai alt deskriptif.
- Tanpa foto stok yang menyiratkan proyek tertentu (PRD Bagian 15).
- Warna latar banner sengaja berbeda dari navbar (`--sky-soft` melawan `--sky`) agar keduanya tidak menyatu.

### 8.4 Hero beranda

- Dua kolom di desktop: teks di kiri (± 55%), foto asli di kanan (rasio 4 : 3, radius 8 px). Di mobile: teks dahulu, foto setelahnya.
- Latar `--beige`.
- Isi: H1, deskripsi 2–3 kalimat, dua tombol: **Konsultasi Proyek** (utama) dan **Lihat Portofolio** (sekunder; berganti **Lihat Layanan** jika portofolio belum terbit).
- Di bawah tombol: satu baris keterangan kecil yang benar dan terverifikasi (mis. jenis dapur yang dilayani). Tidak ada angka atau klaim tanpa bukti.
- Tanpa video latar, gradien, atau elemen dekoratif.

### 8.5 Teks banner per halaman

| Halaman | H1 | Deskripsi |
|---------|----|-----------|
| Layanan (indeks) | Layanan Ducting Kitchen untuk Dapur Komersial | Ducting, kitchen hood, exhaust, cleaning, dan desain untuk restoran, hotel, dan dapur komersial. |
| Ducting kitchen | Jasa Pemasangan dan Pembuatan Ducting Kitchen Exhaust | Jalur pembuangan asap dan uap dapur yang dirancang sesuai layout dan peralatan memasak. |
| Kitchen hood | Jasa Pembuatan dan Instalasi Kitchen Hood | Konsultasikan ukuran dan konfigurasi hood untuk dapur Anda. |
| Exhaust system | Jasa Instalasi Exhaust System untuk Dapur Komersial | Pemilihan fan, jalur ducting, dan kapasitas dibahas berdasarkan data proyek. |
| Cleaning | Jasa Cleaning Ducting Kitchen untuk Restoran dan Hotel | Pembersihan ducting, hood, dan komponen exhaust untuk membantu menjaga sistem tetap terawat. |
| Desain | Desain Kitchen Exhaust System untuk Dapur Komersial | Konsultasi kebutuhan, layout, dan jalur sistem exhaust sebelum pemasangan. |
| Portofolio | Portofolio Proyek Ducting Kitchen | Dokumentasi pekerjaan ducting, kitchen hood, dan exhaust. |
| Industri | Solusi Ducting Kitchen untuk Berbagai Industri | Kebutuhan berbeda untuk restoran, hotel, kafe, dan katering. |
| Blog | Blog dan Panduan Ducting Kitchen | Panduan biaya, komponen, dan perawatan sistem exhaust dapur komersial. |
| Artikel blog | (judul artikel) | Byline: penulis, tanggal terbit, tanggal diperbarui |
| Tentang | Mengenal Ducting Kitchen | Profil, layanan, dan cara kerja kami. |
| Kontak | Konsultasikan Kebutuhan Ducting Kitchen Anda | Hubungi lewat WhatsApp atau isi formulir permintaan penawaran. |
| Kebijakan privasi | Kebijakan Privasi | Cara kami mengelola data yang Anda kirim lewat website. |

Deskripsi yang menyatakan fakta bisnis (kemampuan, material, wilayah) mengikuti gerbang konten PRD Bagian 21.

### 8.6 Kerangka HTML banner

```html
<section class="page-banner">
  <div class="container page-banner__inner">
    <nav aria-label="Breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/">Beranda</a></li>
        <li class="breadcrumb-item"><a href="/layanan/">Layanan</a></li>
        <li class="breadcrumb-item active" aria-current="page">Kitchen Hood</li>
      </ol>
    </nav>
    <h1>Jasa Pembuatan dan Instalasi Kitchen Hood</h1>
    <p class="page-banner__lead">Konsultasikan ukuran dan konfigurasi hood untuk dapur Anda.</p>
    <a class="btn-dk" href="/kontak/" data-track="click_cta_quote" data-location="banner">Minta Estimasi Penawaran</a>
  </div>
</section>
```

Varian foto: tambahkan kelas `page-banner--photo` dan `<img class="page-banner__img" src="..." alt="" width="1600" height="500" fetchpriority="high">` sebagai anak pertama `<section>`.

### 8.7 Kerangka CSS banner

```css
.page-banner { background: var(--sky-soft); color: var(--ink); border-bottom: 1px solid var(--line); padding: 40px 0; }
.page-banner h1 { margin: 8px 0 12px; }
.page-banner__lead { max-width: 60ch; margin: 0 0 20px; color: var(--ink-soft); }
.page-banner .breadcrumb { margin: 0; font-size: 0.875rem; --bs-breadcrumb-divider: "/"; }

.page-banner--photo { position: relative; display: flex; align-items: center; min-height: 200px; padding: 0; overflow: hidden; background: var(--ink); color: var(--white); border-bottom: 0; }
.page-banner__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.page-banner--photo::after { content: ""; position: absolute; inset: 0; background: rgba(16, 40, 58, 0.7); }
.page-banner--photo .page-banner__inner { position: relative; z-index: 1; padding-top: 32px; padding-bottom: 32px; }
.page-banner--photo .page-banner__lead,
.page-banner--photo .breadcrumb a,
.page-banner--photo .breadcrumb-item.active { color: var(--white); }
.page-banner--photo :focus-visible { outline-color: var(--white); }

@media (min-width: 992px) {
  .page-banner { padding: 56px 0; }
  .page-banner--photo { min-height: 260px; }
}
```

---

## 9. Komponen Lain

### 9.1 Kartu layanan

- Latar `--white`, border 1 px `--line`, radius 8 px, padding 24 px, tanpa bayangan.
- Isi: kotak ikon 44 px (latar `--sky-soft`, ikon `--sky-deep`), H3, satu kalimat ringkasan, tautan teks "Pelajari layanan" (tanpa ikon panah).
- Grid: 1 kolom di mobile, 2 kolom di tablet, 3 kolom di desktop. Karena ada lima layanan, kartu terakhir boleh lebih lebar atau dibiarkan rata kiri; jangan memaksakan jumlah kolom yang membuat kartu kosong.
- Jangan membuat semua kartu identik di seluruh halaman; halaman layanan detail memakai penjelasan berbentuk teks dan foto, bukan baris kartu.

### 9.2 Kartu portofolio

- Foto 4 : 3 di atas, lalu jenis fasilitas (label kecil `--beige-deep`), judul proyek, lingkup satu baris. Seluruh kartu dapat diklik.
- Hanya ditampilkan jika proyek nyata sesuai PRD Bagian 15.

### 9.3 Kartu blog

- Foto 16 : 9, tanggal terbit (teks kecil `--ink-soft`), judul H3, ringkasan maksimal dua baris. Seluruh kartu dapat diklik.

### 9.4 FAQ (accordion Bootstrap)

- Tanpa bayangan, hanya garis pemisah `--line`. Judul pertanyaan tebal.
- Indikator buka/tutup memakai ikon plus dan minus (bukan chevron).

### 9.5 Formulir

- Kolom input: latar `--white`, border 1 px `--line-strong`, radius 8 px, tinggi minimal 44 px, label di atas kolom (tebal, 0,875 rem).
- Fokus: outline 3 px `--sky-deep`, offset 2 px.
- Galat: border `--error`, pesan di bawah kolom dengan ikon `exclamation-circle` (bukan hanya warna), `aria-live="polite"`.
- Berhasil: blok `--sky-soft` dengan ikon `check-circle`, teks konfirmasi, dan tombol Chat WhatsApp untuk mengirim layout/foto (PRD 14.3).
- Kotak persetujuan data dengan tautan ke `/kebijakan-privasi/`.
- Tombol kirim: gaya utama; teks berubah menjadi "Mengirim..." dan dinonaktifkan selama proses.

### 9.6 CTA band

- Blok di akhir halaman, latar `--sky-soft`, teks rata kiri: satu judul pendek, satu kalimat, dua tombol (Minta Estimasi Penawaran dan Chat WhatsApp).

### 9.7 Footer

- Latar `--sky`, teks `--ink`, tautan `--ink` bergaris bawah saat hover. Garis pemisah atas 1 px `rgba(16, 40, 58, 0.15)` untuk baris hak cipta.
- Empat kolom di desktop (satu kolom di mobile):
  1. **Merek:** logo, satu kalimat deskripsi netral, alamat (Jl. Gramapuri Persada Blok H9 No.2, Cibitung, Bekasi) dengan tautan "Lihat di Google Maps".
  2. **Layanan:** lima halaman layanan.
  3. **Halaman:** Tentang, Portofolio (jika terbit), Industri, Blog, Kontak, Kebijakan Privasi.
  4. **Kontak:** WhatsApp 0852-1062-0252 (ikon `whatsapp`), email **[KONFIRMASI: email]**, jam operasional **[KONFIRMASI: jam operasional]**.
- Padding bawah tambahan di mobile (sekitar 88 px) agar tombol melayang tidak menutupi baris hak cipta.

---

## 10. Tombol Melayang

Dua tombol tetap di pojok kanan bawah, muncul di **setiap halaman**, ditumpuk vertikal:

| Posisi | Tombol |
|--------|--------|
| Atas | Kembali ke atas (ikon `arrow-up`) |
| Bawah | WhatsApp 0852-1062-0252 |

### 10.1 WhatsApp

- Lingkaran 56 px, latar `--wa`, ikon putih 28 px, bayangan lembut.
- Tautan: `https://wa.me/6285210620252?text=...`. Pesan awal memuat halaman asal (PRD 14.2).
- `target="_blank"`, `rel="noopener noreferrer"`, `aria-label="Chat WhatsApp Ducting Kitchen"`.
- Atribut tracking: `data-track="click_whatsapp" data-location="floating"`.
- Selalu terlihat.

### 10.2 Kembali ke atas

- Lingkaran 44 px, latar `--beige`, ikon `arrow-up` berwarna `--ink`, border 1,5 px `--sky-deep`.
- Berupa `<button type="button" aria-label="Kembali ke atas">`.
- Tersembunyi di bagian atas halaman; muncul dengan fade 200 ms setelah menggulir lebih dari 400 px.
- Klik menggulir ke atas dengan halus, kecuali pengguna memilih `prefers-reduced-motion` (maka langsung).

### 10.3 Aturan

- Jarak ke tepi: 16 px di mobile, 24 px di desktop; ditambah `env(safe-area-inset-bottom)`.
- Jarak antar tombol 12 px.
- `z-index: 1040` (di atas navbar Bootstrap).
- Tidak boleh menutupi kolom formulir, tombol kirim, atau baris hak cipta footer; setiap halaman memberi padding bawah yang cukup.

### 10.4 Kerangka

```html
<div class="float-actions">
  <button class="float-top" type="button" aria-label="Kembali ke atas">
    <!-- SVG bi-arrow-up -->
  </button>
  <a class="float-wa" href="https://wa.me/6285210620252?text=Halo%20Ducting%20Kitchen%2C%20saya%20ingin%20konsultasi."
     target="_blank" rel="noopener noreferrer" aria-label="Chat WhatsApp Ducting Kitchen"
     data-track="click_whatsapp" data-location="floating">
    <!-- SVG bi-whatsapp -->
  </a>
</div>
```

```css
.float-actions {
  position: fixed; right: 16px; bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  z-index: 1040; display: flex; flex-direction: column; align-items: center; gap: 12px;
}
.float-wa {
  display: grid; place-items: center; width: 56px; height: 56px; border-radius: 50%;
  background: var(--wa); color: var(--white); box-shadow: 0 2px 8px rgba(16, 40, 58, 0.25);
}
.float-top {
  display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%;
  background: var(--beige); color: var(--ink); border: 1.5px solid var(--sky-deep); cursor: pointer;
  opacity: 0; visibility: hidden; transform: translateY(8px);
  transition: opacity 0.2s, transform 0.2s, visibility 0.2s;
}
.float-top.is-visible { opacity: 1; visibility: visible; transform: none; }

@media (min-width: 992px) {
  .float-actions { right: 24px; bottom: calc(24px + env(safe-area-inset-bottom, 0px)); }
}
@media (prefers-reduced-motion: reduce) {
  .float-top { transition: none; transform: none; }
}
```

```js
// Modul tambahan untuk main.js (PRD 7.6)
const topBtn = document.querySelector('.float-top');
if (topBtn) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = () => topBtn.classList.toggle('is-visible', window.scrollY > 400);
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
  topBtn.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: reduce.matches ? 'auto' : 'smooth' }));
}
```

---

## 11. Gambar

| Penggunaan | Rasio / ukuran sumber | Format |
|------------|-----------------------|--------|
| Hero beranda | 4 : 3, 1200 × 900 | WebP |
| Page banner | 1600 × 500 | WebP |
| Kartu layanan / portofolio | 4 : 3, 800 × 600 | WebP |
| Kartu / gambar utama blog | 16 : 9, 1200 × 675 | WebP |
| Open Graph | 1200 × 630 | JPG |

- Foto asli pekerjaan diutamakan. Foto ilustrasi diberi keterangan jelas dan tidak dipakai sebagai bukti proyek (PRD Bagian 15).
- Perlakuan seragam: pemotongan (crop) konsisten, tanpa filter warna, tanpa bingkai dekoratif.
- `width` dan `height` selalu terisi; gambar di bawah fold memakai `loading="lazy"`.
- Alt text deskriptif dan faktual, tanpa keyword stuffing.
- Nama berkas: kebab-case deskriptif (contoh: `kitchen-hood-restoran-01.webp`).

---

## 12. Gerak dan Interaksi

- Transisi hanya untuk warna dan opasitas, 150–200 ms.
- Tanpa animasi masuk saat scroll, parallax, atau carousel otomatis.
- `scroll-behavior: smooth` hanya bila pengguna tidak memilih `prefers-reduced-motion`.
- Hover tombol dan tautan hanya mengubah warna atau garis bawah; tidak ada pergeseran, pembesaran, atau bayangan.
- Tidak ada mode gelap pada v1 (`color-scheme: light`).

---

## 13. Aksesibilitas

- Kontras teks isi dan tombol memenuhi WCAG AA, kecuali menu navbar default (lihat 2.3).
- Rasio kontras pasangan warna utama:

| Pasangan | Rasio |
|----------|-------|
| `--ink` di atas `--beige` | sekitar 13 : 1 |
| `--ink` di atas `--sky` | sekitar 8,8 : 1 |
| `--ink-soft` di atas `--beige` | sekitar 6,8 : 1 |
| `--sky-deep` di atas `--beige` | sekitar 4,7 : 1 |
| Putih di atas `--sky-deep` | sekitar 5,4 : 1 |
| Putih di atas lapisan navy 70% (foto banner) | sekitar 5 : 1 atau lebih |
| Putih pada `--wa` (ikon, elemen grafis) | sekitar 3,1 : 1 (batas 3 : 1) |
| `--line-strong` di atas putih (border input) | sekitar 4 : 1 (batas 3 : 1) |
| `--error` di atas putih | sekitar 6,5 : 1 |

- Fokus keyboard selalu terlihat. Urutan tab mengikuti urutan visual.
- Ukuran sentuh minimal 44 × 44 px.
- Informasi tidak disampaikan hanya lewat warna (galat selalu disertai ikon dan teks).
- Struktur heading logis, satu H1 per halaman (berada di banner/hero).
- Tautan lewati navigasi ("Lewati ke konten utama") di awal halaman.
- Formulir: label terhubung ke input, pesan galat di `aria-live`.

---

## 14. Pemetaan ke Bootstrap (`assets/css/custom.css`)

Kustomisasi tanpa Sass: timpa variabel CSS Bootstrap 5.3 dan buat kelas komponen sendiri (`.btn-dk*`) alih-alih menimpa seluruh `.btn-primary`.

```css
:root {
  /* Token warna */
  --sky: #87CEFA;
  --sky-deep: #1F6FA8;
  --sky-soft: #E3F3FD;
  --beige: #F5EFE0;
  --beige-deep: #E6DAC0;
  --white: #FFFFFF;
  --ink: #10283A;
  --ink-soft: #3E5566;
  --line: #D9CFB8;
  --line-strong: #8A7F63;
  --wa: #1DA851;
  --error: #B3261E;
  --success: #2E7D4F;

  /* Navbar — default sesuai permintaan (lihat 2.3 untuk kontras) */
  --nav-bg: var(--sky);
  --nav-fg: var(--white);
  /* Alternatif A (disarankan): --nav-fg: var(--ink); */
  /* Alternatif B:              --nav-bg: var(--sky-deep); */

  /* Pemetaan ke Bootstrap */
  --bs-body-bg: var(--beige);
  --bs-body-color: var(--ink);
  --bs-body-font-family: "IBM Plex Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  --bs-body-line-height: 1.65;
  --bs-heading-color: var(--ink);
  --bs-link-color: var(--sky-deep);
  --bs-link-color-rgb: 31, 111, 168;
  --bs-link-hover-color: #185A89;
  --bs-link-hover-color-rgb: 24, 90, 137;
  --bs-border-color: var(--line);
  --bs-border-radius: 8px;
  --bs-secondary-color: var(--ink-soft);
}

:root { color-scheme: light; }
:focus-visible { outline: 3px solid var(--ink); outline-offset: 2px; }

/* Tombol */
.btn-dk {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  min-height: 44px; padding: 10px 20px;
  border: 1.5px solid var(--sky-deep); border-radius: 8px;
  background: var(--sky-deep); color: var(--white);
  font-weight: 700; line-height: 1.2; text-decoration: none;
  transition: background-color 0.15s, color 0.15s, border-color 0.15s;
}
.btn-dk:hover { background: #185A89; border-color: #185A89; color: var(--white); }
.btn-dk--outline { background: transparent; color: var(--sky-deep); }
.btn-dk--outline:hover { background: var(--sky-soft); color: #185A89; border-color: #185A89; }
.btn-dk--nav { background: var(--beige); color: var(--ink); }
.btn-dk--nav:hover { background: var(--white); color: var(--ink); border-color: var(--sky-deep); }
.btn-dk--wa { background: var(--wa); border-color: var(--wa); color: var(--white); }
.btn-dk--wa:hover { background: #178A42; border-color: #178A42; color: var(--white); }
```

Komponen Bootstrap yang dipakai: grid, navbar (collapse), accordion (indikator diganti plus/minus), breadcrumb (pemisah `/`), dan utilitas spasi. Komponen carousel, tooltip, dan popover tidak dipakai.

---

## 15. Checklist QA Desain

- [ ] Navbar tiga zona di desktop: logo kiri, menu tengah, tombol beige Hubungi Kami kanan.
- [ ] Halaman aktif ditandai tebal dan menu tidak bergeser saat berpindah halaman.
- [ ] Menu mobile berfungsi (buka, tutup, tombol penuh di bawah).
- [ ] Page banner ada di semua halaman selain beranda dan 404; H1 hanya satu per halaman.
- [ ] Beranda memakai hero dengan foto asli.
- [ ] Tidak ada emoji dan tidak ada ikon panah pada tombol atau tautan.
- [ ] Ikon konsisten dan hanya dipakai bila fungsional.
- [ ] Tombol WhatsApp melayang tampil di setiap halaman dan membuka `wa.me/6285210620252`.
- [ ] Tombol kembali ke atas muncul setelah menggulir dan berfungsi.
- [ ] Tombol melayang tidak menutupi formulir atau footer di layar 360 px.
- [ ] Alamat dan tautan peta benar di footer dan halaman kontak.
- [ ] Kontras diperiksa; keputusan alternatif navbar (A, B, atau default) dicatat.
- [ ] Fokus keyboard terlihat di semua elemen interaktif.
- [ ] Tampilan diuji di 360, 768, 1024, dan 1440 px tanpa scroll horizontal.

---

## 16. Yang Masih Perlu Dikonfirmasi

| Item | Dampak |
|------|--------|
| File logo, termasuk versi yang terbaca di atas lightskyblue | Navbar, footer, schema `Organization` |
| Pilihan kontras navbar: default, Alternatif A, atau B | Navbar, footer, skor Accessibility |
| Email dan jam operasional | Footer, halaman kontak |
| Apakah alamat di Cibitung, Bekasi adalah kantor/bengkel yang boleh dikunjungi dan dipublikasikan | Footer, kontak, schema `LocalBusiness` |
| Foto asli untuk hero beranda dan banner | Varian banner foto; tanpa foto, banner polos dipakai |
| Nomor WhatsApp 0852-1062-0252 aktif dan diuji di perangkat mobile | Semua tombol WhatsApp |