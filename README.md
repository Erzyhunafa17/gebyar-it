<div align="center">

# 🏛️ TI.UIKA // LABS
### Portal Interaktif Laboratorium Peminatan Teknik Informatika  
**Universitas Ibn Khaldun Bogor**

[![Next.js](https://img.shields.io/badge/Next.js-16.4.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.1-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.0+-FF0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

<p align="center">
  Platform visual dan interaktif untuk mengenalkan profil, struktur organisasi, prospek karir, dokumentasi kegiatan, serta riset unggulan di 4 Laboratorium Peminatan Program Studi Teknik Informatika UIKA Bogor.
</p>

</div>

---

## 📌 Gambaran Umum
Website **TI.UIKA // LABS** dirancang untuk memberikan pengalaman eksplorasi yang informatif dan imersif bagi mahasiswa, calon mahasiswa, dan akademisi dalam memilih bidang spesialisasi di Program Studi Teknik Informatika Universitas Ibn Khaldun Bogor.

Platform ini mengintegrasikan estetika modern **Cyber Terminal** dengan kemudahan navigasi, simulasi interaktif, dan performa tinggi berbasis *Server-Side Rendering* & *Static Generation* Next.js App Router.

---

## 🔬 4 Laboratorium Peminatan

| Lab / Peminatan | Fokus Bidang & Kajian Utama | Aksen Warna |
| :--- | :--- | :---: |
| **SE / RPL** *(Software Engineering)* | Rekayasa Perangkat Lunak, Full-stack Web/Mobile Architecture, Clean Code, CI/CD | `Blue / Cyan` |
| **CSN** *(Computer System & Network)* | Infrastruktur Jaringan Komputer, Keamanan Siber (Cybersecurity), Cloud, IoT, Server Admin | `Emerald` |
| **GIT** *(Geospatial Information Tech)* | Sistem Informasi Geografis (GIS), WebGIS, Remote Sensing, Pemetaan Spasial Satelit | `Amber / Orange` |
| **KERIS** *(Knowledge Eng. & Reliable Intelligent Sys)* | Artificial Intelligence, Machine Learning, Data Science, NLP, Computer Vision | `Purple / Violet` |

---

## ✨ Fitur-Fitur Utama

- 🌗 **Dual Theme System (Dark & Light Mode):**
  - **Cyber Terminal (Dark):** Nuansa terminal modern gelap dengan aksen neon fungsional.
  - **Technical Blueprint (Light):** Nuansa dokumentasi teknis bersih dengan kontras tinggi (WCAG compliant) dan latar jaring/mesh responsif.
  - **Circular Reveal Transition:** Animasi transisi sirkular lembut berporos pada tombol switch tema.
- ⚡ **Interactive Command Palette (`Ctrl + K` / `⌘ + K`):**
  - Mesin pencari instan (Spotlight Search) mencakup 4 laboratorium, daftar dosen/pembina, jalur karir, serta aksi cepat (quick actions).
  - Navigasi penuh menggunakan keyboard (`↑`, `↓`, `Enter`, `Esc`).
- 🤖 **Interactive Terminal & Lab Recommender (`lab-recommender`):**
  - Kuesioner peminatan cerdas berbasis terminal interaktif langsung di halaman beranda.
  - Rekomendasi laboratorium otomatis berdasarkan minat teknologi dan gaya belajar pengguna.
- 📸 **Lab Facility Showcase & Interactive Viewfinder:**
  - Galeri fasilitas dan ruang laboratorium dengan reticle viewfinder sudut, efek scanline sweep, dan zoom interaktif.
- 👥 **Profil Dosen & Struktur Organisasi:**
  - Penjabaran Ketua Laboratorium, Dosen Anggota, dan fokus riset masing-masing dosen.
- 🎯 **Profil Lulusan & Prospek Karir:**
  - Rincian profesi industri relevan dari setiap peminatan lengkap dengan stack teknologi yang dipelajari.
- 🏆 **Dokumentasi Kegiatan & Prestasi:**
  - Log kegiatan praktikum, sertifikasi, bootcamp, proyek kolaboratif industri, dan capaian kompetisi mahasiswa.

---

## 🛠️ Tech Stack & Pustaka

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Webpack Compiler)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) dengan CSS Variables Design Tokens
- **Animasi:** [Framer Motion](https://www.framer.com/motion/) & CSS Hardware-Accelerated Animations
- **Ikon:** [Lucide React](https://lucide.dev/)
- **Bahasa:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)

---

## 🚀 Memulai (Panduan Instalasi Lokal)

### 1. Clone Repository
```bash
git clone https://github.com/Erzyhunafa17/gebyar-it.git
cd gebyar-it
```

### 2. Install Dependensi
```bash
npm install
```

### 3. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat hasilnya.

### 4. Build untuk Produksi
```bash
npm run build
npm run start
```

---

## 📂 Struktur Direktori Proyek

```plaintext
web_uika/
├── public/                 # Asset statis, logo, favicon, foto fasilitas
├── src/
│   ├── app/                # Next.js App Router (Halaman Utama & Rute Lab)
│   │   ├── lab/            # Dynamic route halaman peminatan (/lab/se, /lab/csn, dll)
│   │   ├── globals.css     # Design tokens & styling Tailwind CSS v4
│   │   ├── layout.tsx      # Root layout & providers
│   │   └── page.tsx        # Halaman Beranda (Hero, Lab Cards, Recommender, dll)
│   ├── components/
│   │   ├── lab/            # Komponen Lab (Showcase fasilitas, kurikulum, karir)
│   │   ├── providers/      # ThemeProvider (Dark / Light mode)
│   │   └── ui/             # Navbar, Footer, CommandPalette, Terminal, ThemeToggle
│   └── data/               # Dataset laboratorium, dosen, karir, & pencarian
├── package.json
└── tsconfig.json
```

---

## 🏛️ Penyelenggara & Afiliasi
- **Program Studi:** S1 Teknik Informatika (Fakultas Teknik dan Sains)
- **Institusi:** Universitas Ibn Khaldun Bogor
- **Acara:** Gebyar IT 2026 - Lomba Web Design

---

<div align="center">
  <sub>Dibuat dengan dedikasi untuk kemajuan teknologi dan pendidikan di Program Studi Teknik Informatika UIKA Bogor.</sub>
</div>

