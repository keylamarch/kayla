# Keyla Marcelianti — Portofolio

Situs portofolio statis satu halaman. Tanpa framework, tanpa proses build saat deploy, dan **tanpa CDN** — semua CSS, JavaScript, font, dan gambar disimpan di dalam repo sehingga situs tetap tampil meski dibuka luring.

Sudah diuji:

- **W3C HTML Validator** — 0 error, 0 warning (`index.html` dan `404.html`)
- **Lighthouse** — Accessibility 100, Best Practices 100, SEO 100, tanpa temuan yang gagal
- Semua tautan internal, gambar, font, dan anchor (`#profil`, `#process`, `#contact`, `#top`) mengarah ke berkas/bagian yang benar
- Ukuran total repo ± 0,7 MB (gambar sudah dikompresi)

---

## 1. Struktur berkas

```
keyla-portfolio/
├── index.html              ← halaman utama
├── 404.html                ← halaman "tidak ditemukan" (otomatis dipakai GitHub Pages)
├── favicon.svg             ← ikon tab browser
├── .nojekyll               ← WAJIB agar GitHub Pages tidak memproses situs lewat Jekyll
├── .gitignore
├── README.md
├── package.json            ← hanya untuk build ulang CSS (opsional)
├── tailwind.config.js      ← konfigurasi desain (opsional, untuk build ulang CSS)
├── src/
│   └── input.css           ← sumber CSS Tailwind (opsional)
└── assets/
    ├── css/styles.css      ← CSS final yang dipakai situs (sudah dikompilasi & diminifikasi)
    ├── js/main.js          ← menu seluler, salin email, form, status navigasi
    ├── fonts/              ← Bebas Neue + Plus Jakarta Sans (self-hosted)
    └── img/
        ├── portrait.jpg
        ├── karya-mockup.jpg
        ├── karya-fotografi.jpg
        └── karya-3d.jpg
```

> **Penting:** `index.html` harus berada di **root repo** (bukan di dalam subfolder), supaya GitHub Pages langsung menemukannya.

---

## 2. Cara upload ke GitHub (tanpa Git / lewat browser)

1. Buka <https://github.com/new>.
2. Isi **Repository name**: `keyla-portfolio` (boleh nama lain, tanpa spasi).
3. Pilih **Public** → klik **Create repository**.
4. Di halaman repo yang masih kosong, klik **uploading an existing file**.
5. Buka folder `keyla-portfolio` di komputer, lalu **seret seluruh isi folder** (bukan folder induknya) ke area upload:
   `index.html`, `404.html`, `favicon.svg`, `assets`, `src`, dan berkas lainnya.
6. Klik **Commit changes**.

Jika berkas titik seperti `.nojekyll` dan `.gitignore` tidak ikut terunggah (sebagian browser menyembunyikan berkas titik):

- Klik **Add file → Create new file**
- Nama berkas: `.nojekyll`
- Biarkan isinya kosong → **Commit changes**

### Mengaktifkan GitHub Pages

1. Masuk ke repo → **Settings** → **Pages**.
2. Pada **Build and deployment → Source**, pilih **Deploy from a branch**.
3. **Branch:** `main`, **Folder:** `/ (root)` → **Save**.
4. Tunggu 1–2 menit, lalu buka:
   `https://USERNAME.github.io/keyla-portfolio/`

Ganti `USERNAME` dengan nama pengguna GitHub Anda. Setiap kali Anda mengubah berkas di branch `main`, situs diperbarui otomatis dalam beberapa menit.

---

## 3. Cara upload dengan Git

```bash
cd keyla-portfolio
git init
git add .
git commit -m "Portofolio Keyla Marcelianti"
git branch -M main
git remote add origin https://github.com/USERNAME/keyla-portfolio.git
git push -u origin main
```

Setelah itu aktifkan GitHub Pages seperti langkah 2 di atas. Alternatif tanpa terminal: **GitHub Desktop** → *Add local repository* → *Publish repository*.

---

## 4. Mengubah konten

### Teks
Semua teks ada di `index.html`. Cari bagian yang ingin diubah (judul, deskripsi karya, CTA, footer).

### Email, WhatsApp, Instagram
Ganti **semua** kemunculannya agar konsisten:

| Data | Nilai saat ini | Muncul di |
| --- | --- | --- |
| Email | `keylamarcelianti03@gmail.com` | header, seksi Kontak (2 tombol + teks + form), footer |
| WhatsApp | `6287716792785` / `087716792785` | header, menu seluler, footer |
| Instagram | `https://www.instagram.com/kkylaamarch/` | header, menu seluler, footer |

Gunakan *Find & Replace* di editor agar tidak ada yang terlewat. Angka WhatsApp pada tautan memakai format internasional tanpa `+` (`62…`).

### Gambar
Ganti berkas di `assets/img/` dengan **nama yang sama**:

| Berkas | Dipakai untuk | Ukuran disarankan |
| --- | --- | --- |
| `portrait.jpg` | foto hero & avatar header | 1000 × 1333 px (3:4) |
| `karya-mockup.jpg` | kartu karya 01 | 1200 × 1200 px |
| `karya-fotografi.jpg` | kartu karya 02 | 1200 × 1600 px |
| `karya-3d.jpg` | kartu karya 03 | 1200 × 1200 px |

Jika nama berkas diganti, sesuaikan juga atribut `src` di `index.html`. **Perhatikan huruf besar/kecil** — GitHub Pages membedakan `Karya.JPG` dan `karya.jpg`, sehingga gambar bisa gagal tampil.

### Email formulir
Formulir "cek ketersediaan" membuka aplikasi email pengunjung dengan isian otomatis (tidak memakai server). Jika nanti ingin formulir yang benar-benar mengirim tanpa membuka aplikasi email, gunakan layanan seperti Formspree dan ubah `action` pada `<form id="quick-inquiry">`.

---

## 5. Opsional: mengubah CSS (hanya jika menambah class Tailwind baru)

CSS sudah final dan **tidak perlu di-build untuk deploy**. Build ulang hanya diperlukan bila Anda menambahkan class Tailwind baru di HTML yang belum ada di `assets/css/styles.css`:

```bash
npm install
npm run build:css
```

Hasilnya menimpa `assets/css/styles.css`. Commit berkas tersebut bersama perubahan HTML.

> Tanpa Node.js, Anda bisa memakai Tailwind CLI mandiri, atau cukup memakai class yang sudah ada di halaman.

---

## 6. Opsional setelah situs online

- **Pratinjau tautan (Open Graph):** tambahkan di `<head>` setelah mengetahui URL final:
  ```html
  <meta property="og:url" content="https://USERNAME.github.io/keyla-portfolio/">
  <meta property="og:image" content="https://USERNAME.github.io/keyla-portfolio/assets/img/portrait.jpg">
  <link rel="canonical" href="https://USERNAME.github.io/keyla-portfolio/">
  ```
- **Domain sendiri:** Settings → Pages → Custom domain, lalu buat berkas `CNAME` berisi nama domain.
- **Ganti favicon:** timpa `favicon.svg`.

---

## 7. Catatan teknis

- Tidak ada permintaan ke domain pihak ketiga; font Google sudah di-host lokal di `assets/fonts/`.
- Menu seluler tetap bisa dibuka tanpa JavaScript (fallback `<noscript>`).
- Animasi dinonaktifkan otomatis bila pengunjung mengaktifkan *reduce motion*.
- `404.html` berdiri sendiri (CSS inline) sehingga tetap tampil benar dari kedalaman URL mana pun.
- Semua tautan eksternal memakai `rel="noopener noreferrer"`.

---

## Lisensi

Kode boleh dipelajari dan digunakan kembali. Foto, karya, dan isi portofolio adalah milik Keyla Marcelianti dan tidak boleh dipakai ulang tanpa izin.
