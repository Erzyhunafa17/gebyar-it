# Product Requirements Document (PRD)
Project: Website Laboratorium dan Peminatan Program Studi Teknik Informatika (UIKA Bogor)
Competition: Lomba Website Gebyar IT 2026
Design System Reference: DESIGN.md (Resend Aesthetic — Black Velvet with Violet Neon & Terminal Luxury)

## 1. Tech Stack & Libraries
- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 (strictly configured with `@theme` tokens from `DESIGN.md`)
- **Animations:** 
  - `motion` (Framer Motion) for page transitions, 150ms ease-out micro-interactions, staggered reveals, and layout animations.
  - `gsap` + `@gsap/react` (ScrollTrigger) for scroll-driven storytelling and timeline animations.
  - `lenis` (`@studio-freight/lenis`) for smooth inertial scrolling.
- **3D & WebGL:** `three`, `@react-three/fiber`, `@react-three/drei` (for interactive 3D geometric black cubes/meshes in Hero sections).
- **Icons:** `lucide-react` (1px–1.5px stroke width, colored `#f0f0f0` or `#a1a4a5`).
- **Fonts (`next/font/google`):**
  - `Playfair_Display` (substitute for Domaine — Hero Display 77px/96px, tracking `-0.01em`)
  - `Inter` (Body copy, UI labels, navigation, and section headings with `-0.05em` tracking at 56px)
  - `JetBrains_Mono` (substitute for Commit Mono — code blocks, terminal badges, metadata, roles)

## 2. Strict Design Rules (Must Follow `DESIGN.md`)
- **Canvas:** Pure `#000000` (`--color-void-black`). NEVER use gradient background washes or colored section backgrounds.
- **Borders & Elevation:** All cards, terminals, and containers use `#000000` background with `1px solid #292d30` (`--color-graphite-hairline`). NO drop shadows. Add a subtle interactive mouse-tracking spotlight border effect on cards.
- **Border Radius Discipline:** ONLY use `6px` for buttons, badges, and inputs; ONLY use `16px` for cards and code/terminal windows.
- **Buttons:** Primary buttons are always Ghost on Black (`transparent` bg, `1px solid #292d30`, `#ffffff` text, `6px` radius, hover border `#ffffff`).
- **Semantic Lab Accents (Used ONLY on 2-3px status dots, code strings, and terminal badges):**
  - SE / RPL: Iris Violet (`#9281f7`)
  - CSN / NCC: Sky Blue (`#70b8ff`)
  - GIT: Pulse Green (`#3ad389`)
  - KERIS: Amber (`#ffca16`)
- **Documentation / Photo Gallery Presentation:** Wrap all activity documentation in a "Terminal Asset Inspector Window" (`#000000` frame, `1px solid #292d30`, `16px` radius, top-left traffic-light dots, monospace metadata footer) to preserve the dark terminal luxury aesthetic.

## 3. Mandatory Pages & Architecture
1. **Navbar (Global):** Sticky `#000000f2` with `backdrop-filter: blur(25px)`. Left: `TI.UIKA // LABS` wordmark. Center: Links (`Beranda`, `SE / RPL`, `CSN`, `GIT`, `KERIS`). Right: `Cmd + K` Quick Search button & Ghost CTA.
2. **Beranda (`/`):**
   - **Hero Section:** Pill badge (`Gebyar IT 2026`), 96px serif display headline, brief introduction to Program Studi Teknik Informatika UIKA Bogor, Ghost CTAs, and an interactive **WebGL 3D Black Cube** on the right (`#000000` surface with `#292d30` wireframe/edge highlights).
   - **Prodi Overview Terminal:** Interactive code/terminal window showcasing Informatics Engineering core identity, smart campus vision, and industry/government partners.
   - **4 Labs Summary Bento Grid:** 4 interactive Spotlight Cards summarizing SE, CSN, GIT, and KERIS with status dots, lab mottos, head of lab, and direct links.
   - **Interactive CLI Lab Recommender:** A terminal widget where students pick their interest and receive an animated recommendation for the right Lab & career path.
3. **Dedicated Lab Pages (`/lab/se`, `/lab/csn`, `/lab/git`, `/lab/keris`):**
   - Each page features a custom 3D/Canvas geometric visual, Lab Profile & Motto, Organization Structure (Head of Lab + Lecturers with monospace specializations), Career Prospects matrix, Research/Courses, Highlighted Achievements/Projects/Hardware Specs in Terminal UI, and Activity Documentation Gallery.
4. **Footer (Global — Mandatory Contact Info):**
   - Styled as a clean dark architectural footer with `1px solid #292d30` top border. Contains: Official Address of Prodi Teknik Informatika UIKA Bogor, Email (`#9281f7` Commit Mono badge), Phone/Social Links, Quick Lab Links, and system status indicator (`● All 4 Research Labs Operational` in `#3ad389`).

---

## 4. Complete Content Specification (Single Source of Truth)

### LAB 1: Software Engineering (SE / RPL) — `/lab/se`
- **Identity:** Research Name: **InnSoft / RISE Center** | Motto: `"Build Your Skill, Build Your Product"`
- **Profile:** Berfokus pada pengembangan keilmuan dan rekayasa perangkat lunak (web, mobile, serta kecerdasan buatan) sesuai kaidah dan prinsip RPL guna mewujudkan ekosistem smart campus.
- **Organization Structure:**
  - **Kepala Laboratorium:** Berlina Wulandari, S.T, M.Kom. (Spesialisasi: System Analyst)
  - **Dosen Anggota:**
    1. Safaruddin Hidayat Al Ikhsan, S.Kom, M.Kom. (System Analyst)
    2. Hersanto Fajri, S.Ds, M.MD. (Multimedia Design)
    3. Fitrah Satrya Fajar Kusumah, S.Kom, M.Kom. (Mobile Programming)
    4. Freza Riana, S.Si, M.Si. (Math & Statistic)
- **Career Prospects:** Fullstack Web Developer, Frontend Developer, Backend Developer, Mobile Developer (Android/iOS), System Analyst, UI/UX Designer, Software Tester, Database Developer, IT Quality Assurance, Konsultan/Wirausahawan IT.
- **Signature Courses & Research:** Pemrograman Web, Pemrograman Perangkat Bergerak/Android, UI/UX, Rekayasa Perangkat Lunak, Augmented Reality, Desain & Analisis Algoritma, Big Data, Decision Support System.
- **Achievements & Portfolio:**
  - **Muhammad Rizki:** Pendanaan Rp 140 Juta untuk Best Capstone Project Bangkit Academy by Google, Distinction Graduate Bangkit, dan Mahasiswa Teladan Fakultas Teknik & Sains UIKA 2024.
  - **Lulusan Terbaik Tingkat Prodi:** Wisuda 79, 80, 81, dan 82 (termasuk Amirul Mubarok IPK 3.94 dan Muhammad Rizki IPK 3.91).
  - **Tim INNOSOFT:** Memborong Juara I, II, dan III Lomba Inovasi Kabupaten Bogor 2020, 5 Besar Nasional BIOS Hackathon 2020, 10 Besar Hackathon Nasional EDSEN 2022, dan Juara 2 Website Gebyar IT.
  - **Hanif Hidayaturrahman:** 13 Besar Mahasiswa Berprestasi Nasional / Finalis Mahasiswa Berprestasi Tingkat Jawa Barat.
  - **Magang Merdeka (MSIB):**
    - *PT TalentHub Digital Indonesia:* Dwi Larasati (Best Presenter & Best Project Cybers Academy), Regina Aprillia (Best Project), Adinda Dwi Suryani (UI/UX Designer), Shafira Putri Ardita (Fullstack Dev).
    - *BPS Kabupaten Bogor:* Alvano Hastagina.
    - *Kementerian Dalam Negeri & Bapanas:* Azka Fadillah.
  - **Real-World Projects:** SIAKAD UIKA, SIMPEG UIKA, Dashboard Support PMB UIKA, Sistem Informasi BPS Kabupaten Bogor, proyek riset bersama Korlantas POLRI, dan kerja sama regional tingkat ASEAN.
- **Activity Documentation:** Penyambutan mahasiswa angkatan 2018–2022, tradisi perayaan kelulusan seminar/sidang skripsi, penyusunan proposal PKM, buka puasa bersama, dan makan bareng ngaliwet.

### LAB 2: Computing System & Network (CSN) — `/lab/csn`
- **Identity:** Alternate Name: **Lab Net-Centric Computing (NCC)**
- **Profile:** Berfokus pada infrastruktur IT modern, menghubungkan perangkat dan sistem komputasi, transmisi data jaringan berkabel dan nirkabel, arsitektur cloud, komputasi terdistribusi, serta pertahanan keamanan digital.
- **Organization Structure:**
  - **Kepala Laboratorium:** Ritzkal, S.Kom., M.Kom.
  - **Dosen Anggota:**
    1. Ade Hendri H., S.Kom., M.Kom.
    2. Yuggo Afrianto, S.T., M.Kom.
    3. Bayu Adhi P., S.Kom., M.T.
- **Career Prospects:** Network Engineer, Cloud Architect, Cybersecurity Specialist, IoT System Designer, Field Engineer, Computer Architecture Engineer, Test Engineer.
- **Research Areas & Competencies:**
  - Perancangan topologi jaringan (Cisco, GNS3, Packet Tracer).
  - Pengelolaan infrastruktur komputasi awan (AWS, Azure, OpenStack).
  - Keamanan jaringan dan informasi (Firewall, VPN, IDS/IPS, mitigasi serangan MITM).
  - Wireless Sensor Network (WSN), Embedded System, dan otomatisasi IoT.
- **Student Projects & Activities:** Hands-on proyek integrasi simulasi industri, Hybrid Cloud Networking, komunikasi drone swarm, Smart Meter berbasis LoRa/NB-IoT, monitoring jaringan real-time, dan partisipasi pada Pameran Gelar Inovasi Daerah Kabupaten Bogor.

### LAB 3: Geospatial Information Technology (GIT) — `/lab/git`
- **Identity:** Slogan: `"Dari Coding Data Peta → Analisis → AI Solusi Dunia Nyata"`
- **Profile:** Bidang keilmuan yang memadukan teknologi informasi, data spasial, analisis keruangan, penginderaan jauh (remote sensing), pemrograman spasial, dan kecerdasan buatan (GeoAI) untuk menghasilkan model visual dan sistem pendukung keputusan (Spatial Decision Support System).
- **Organization Structure:**
  - **Kepala Laboratorium:** Dr. Erwin Hermawan, S.Si, M.Sc. (Pemodelan Spasial Dinamik)
  - **Dosen Anggota:**
    1. Iksal Yanuarsyah, S.Hut, MSc, Ph.D. (Aplikasi Penginderaan Jauh)
    2. Sahid Agustian H, S.T, M.Kom. (Pemrograman Spasial)
    3. Nurul Kamilah, S.Kom, M.Kom. (Perancangan Sistem Informasi Geospasial)
    4. Mohammad Aftaf Muhajir, S.Si., M.Kom. (Pemrograman Spasial)
    5. Fety Fatimah, S.Kom., M.Kom. (Perancangan Sistem Informasi Geospasial)
- **Career Prospects:** GIS Analyst, GIS Specialist, Spatial Data Analyst, Remote Sensing Analyst, GIS / WebGIS Developer, Geospatial Application Developer, Spatial Database Developer, Geospatial Data Scientist, GeoAI Engineer, Digital Twin Specialist.
- **Graduate User Sectors:**
  - *Pemerintah:* BIG, Bappeda, Kementerian ATR/BPN, PUPR, KLHK, BNPB.
  - *Swasta:* Perusahaan perkebunan kelapa sawit, pertambangan, properti, logistik, telekomunikasi, dan konsultan pemetaan.
- **Facilities, Assets & Field Projects:**
  - **Perangkat Drone Canggih:** Unit drone DJI Phantom 4 Pro (video 4K 60fps, sensor 20MP) dan DJI Phantom 4 Multispectral yang terhubung langsung dengan D-RTK 2 Mobile Station Combo (akurasi posisi hingga level sentimeter untuk survei vegetasi pertanian).
  - **Proyek Lapangan Nyata:** Pengambilan data spasial dan ortofoto lahan persawahan resolusi tinggi menggunakan drone + RTK di Kecamatan Leuwiliang, Kabupaten Bogor.
  - **Contoh Topik Skripsi:** WebGIS persebaran fasilitas publik, Disaster GIS (pemetaan dan pemodelan risiko banjir), analisis perubahan tutupan lahan multi-tahun (Sentinel/Landsat), optimasi lokasi fasilitas publik, serta GeoAI deteksi bangunan dari citra satelit melalui Deep Learning.
- **Activity Documentation:** Praktik lapangan pemasangan titik kontrol RTK, family gathering, dan sesi diskusi/sharing mahasiswa.

### LAB 4: Knowledge Engineering and Reliable Intelligent Systems (KERIS) — `/lab/keris`
- **Identity:** Vision: `"Menjadi pusat riset sistem cerdas terkemuka di Bogor Raya pada tahun 2030"`
- **Profile:** Kelompok riset keilmuan yang berfokus pada rekayasa sistem cerdas, pengembangan produk berbasis AI, sistem pakar berbasis pengetahuan (Knowledge-Based Systems), ontologi/semantic web, serta analisis mendalam terhadap data (Data Mining dan Machine Learning).
- **Organization Structure:**
  - **Kepala Laboratorium:** Dr. Puspa Eosina, S.Si, M.Kom. (Data Mining & Machine Learning)
  - **Dosen Anggota:**
    1. Dr. Foni Agus Setiawan (Semantic Web & Knowledge Engineering)
    2. Gibtha Fitri Laxmi, S.Kom., M.Kom. (Computer Vision & Pengenalan Pola)
    3. Andi Eko K., S.Si., M.T. (IoT & Big Data)
    4. Dewi Primasari, S.Kom., M.M. (Bidang Pengabdian Kepada Masyarakat)
- **Career Prospects:** AI & Machine Learning Specialist, Data Scientist, Knowledge Engineer, Data Quality Engineer, Business Intelligence Analyst, Peneliti AI.
- **Laboratory Facilities:** High-Performance Workstation dengan prosesor AMD Ryzen 9 5950X (up to 4.9 GHz), RAM 64 GB DDR4, penyimpanan NVMe SSD 1 TB + HDD 3 TB, dan kartu grafis NVIDIA GeForce RTX 3060 12GB untuk komputasi pelatihan model AI.
- **Achievements & Research Grants:**
  - **Google Student Ambassador (GSA) 2025:** 2 mahasiswa dari lab KERIS terpilih menjadi perwakilan resmi Google untuk literasi AI di kampus.
  - **Hibah Penelitian LLDIKTI - Belmawa:**
    - `2019`: Model Prediksi Cancer Menggunakan Metode Autoencoder.
    - `2020`: K-Nearest Neighbor dalam Pemetaan UMKM Sektor Kuliner.
    - `2022`: Cellular Automata dalam Menentukan Koefisien Penyebaran COVID-19.
    - `2024`: Optimasi Rute Angkutan Kota Bogor Berbasis Artificial Intelligence.
  - **Program MBKM:** Pengiriman mahasiswa ke Bangkit Academy (Batch 4, 5, dan 6), Magang IoT di PT Telkom Bandung, Magang Data di PT Telkom Jakarta, AI Mastery Orbit Future Academy, KKN Nasional, serta Magang Internasional di UNISEL Malaysia.
- **Activity Documentation:** Pertemuan rutin diskusi progres ide skripsi setiap hari Kamis, sharing session bersama alumni lab, dan sosialisasi program kelulusan.