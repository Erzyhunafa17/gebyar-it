// src/data/labsData.ts
// Single source of truth for all 4 lab data
// Content sourced directly from PRD.md — zero omissions

export type LabAccent = 'violet' | 'blue' | 'green' | 'amber';

export interface LabMember {
  name: string;
  degree: string;
  specialization: string;
  isHead?: boolean;
  image?: string;
}

export interface LabData {
  id: 'se' | 'csn' | 'git' | 'keris';
  slug: string;
  name: string;
  fullName: string;
  altName: string;
  motto: string;
  accent: LabAccent;
  accentColor: string;
  profile: string;
  facilityImage: string;
  facilityTitle: string;
  facilityDescription: string;
  facilityTags?: string[];
  head: LabMember;
  members: LabMember[];
  careers: string[];
  courses: string[];
  researchAreas: string[];
  achievements: Achievement[];
  activities: string[];
  hardware?: HardwareSpec[];
  fieldProjects?: string[];
  thesisTopics?: string[];
  sectors?: { govt: string[]; private: string[] };
}

export interface Achievement {
  title: string;
  items: string[];
}

export interface HardwareSpec {
  name: string;
  specs: string;
}

export const labsData: LabData[] = [
  {
    id: 'se',
    slug: 'se',
    name: 'SE / RPL',
    fullName: 'Software Engineering',
    altName: 'InnSoft / RISE Center',
    motto: 'Build Your Skill, Build Your Product',
    accent: 'violet',
    accentColor: '#9281f7',
    profile:
      'Berfokus pada pengembangan keilmuan dan rekayasa perangkat lunak (web, mobile, serta kecerdasan buatan) sesuai kaidah dan prinsip RPL guna mewujudkan ekosistem smart campus.',
    facilityImage: '/images/labs/lab_se.webp',
    facilityTitle: 'Laboratorium Rekayasa Perangkat Lunak (InnSoft)',
    facilityDescription:
      'Studio pengembangan software kolaboratif terintegrasi dengan deretan workstation modern, proyektor presentasi arsitektur sistem, dan area pengujian aplikasi web serta mobile.',
    facilityTags: ['Workstations', 'Web & Mobile Dev', 'Smart Campus Testbed', 'Code Review Space'],
    head: {
      name: 'Berlina Wulandari, S.T, M.Kom.',
      degree: 'S.T, M.Kom.',
      specialization: 'System Analyst',
      isHead: true,
      image: '/images/lecturers/BU_Berlin.jpg',
    },
    members: [
      {
        name: 'Safaruddin Hidayat Al Ikhsan, S.Kom, M.Kom.',
        degree: 'S.Kom, M.Kom.',
        specialization: 'System Analyst',
        image: '/images/lecturers/Pak_safar.jpg',
      },
      {
        name: 'Hersanto Fajri, S.Ds, M.MD.',
        degree: 'S.Ds, M.MD.',
        specialization: 'Multimedia Design',
        image: '/images/lecturers/Pak_Hersanto.jpg',
      },
      {
        name: 'Fitrah Satrya Fajar Kusumah, S.Kom, M.Kom.',
        degree: 'S.Kom, M.Kom.',
        specialization: 'Mobile Programming',
        image: '/images/lecturers/Pak_FItrah.jpg',
      },
      {
        name: 'Freza Riana, S.Si, M.Si.',
        degree: 'S.Si, M.Si.',
        specialization: 'Math & Statistic',
        image: '/images/lecturers/Bu_Freza.jpg',
      },
    ],
    careers: [
      'Fullstack Web Developer',
      'Frontend Developer',
      'Backend Developer',
      'Mobile Developer (Android/iOS)',
      'System Analyst',
      'UI/UX Designer',
      'Software Tester',
      'Database Developer',
      'IT Quality Assurance',
      'Konsultan/Wirausahawan IT',
    ],
    courses: [
      'Pemrograman Web',
      'Pemrograman Perangkat Bergerak/Android',
      'UI/UX',
      'Rekayasa Perangkat Lunak',
      'Augmented Reality',
      'Desain & Analisis Algoritma',
      'Big Data',
      'Decision Support System',
    ],
    researchAreas: [
      'Web & Mobile Development',
      'Software Engineering Principles',
      'Smart Campus Systems',
      'AI-driven Applications',
    ],
    achievements: [
      {
        title: 'Muhammad Rizki',
        items: [
          'Pendanaan Rp 140 Juta — Best Capstone Project Bangkit Academy by Google',
          'Distinction Graduate Bangkit Academy',
          'Mahasiswa Teladan Fakultas Teknik & Sains UIKA 2024',
        ],
      },
      {
        title: 'Lulusan Terbaik Tingkat Prodi',
        items: [
          'Wisuda 79, 80, 81, dan 82',
          'Amirul Mubarok — IPK 3.94',
          'Muhammad Rizki — IPK 3.91',
        ],
      },
      {
        title: 'Tim INNOSOFT',
        items: [
          'Juara I, II, dan III Lomba Inovasi Kabupaten Bogor 2020',
          '5 Besar Nasional BIOS Hackathon 2020',
          '10 Besar Hackathon Nasional EDSEN 2022',
          'Juara 2 Website Gebyar IT',
        ],
      },
      {
        title: 'Hanif Hidayaturrahman',
        items: [
          '13 Besar Mahasiswa Berprestasi Nasional',
          'Finalis Mahasiswa Berprestasi Tingkat Jawa Barat',
        ],
      },
      {
        title: 'Magang Merdeka (MSIB)',
        items: [
          'PT TalentHub Digital Indonesia: Dwi Larasati (Best Presenter & Best Project Cybers Academy)',
          'PT TalentHub Digital Indonesia: Regina Aprillia (Best Project)',
          'PT TalentHub Digital Indonesia: Adinda Dwi Suryani (UI/UX Designer)',
          'PT TalentHub Digital Indonesia: Shafira Putri Ardita (Fullstack Dev)',
          'BPS Kabupaten Bogor: Alvano Hastagina',
          'Kementerian Dalam Negeri & Bapanas: Azka Fadillah',
        ],
      },
      {
        title: 'Proyek Nyata',
        items: [
          'SIAKAD UIKA',
          'SIMPEG UIKA',
          'Dashboard Support PMB UIKA',
          'Sistem Informasi BPS Kabupaten Bogor',
          'Riset bersama Korlantas POLRI',
          'Kerja sama regional tingkat ASEAN',
        ],
      },
    ],
    activities: [
      'Penyambutan mahasiswa angkatan 2018-2022',
      'Tradisi perayaan kelulusan seminar/sidang skripsi',
      'Penyusunan proposal PKM',
      'Buka puasa bersama',
      'Makan bareng ngaliwet',
    ],
  },

  {
    id: 'csn',
    slug: 'csn',
    name: 'CSN',
    fullName: 'Computing System & Network',
    altName: 'Lab Net-Centric Computing (NCC)',
    motto: 'Connecting Systems, Securing Networks',
    accent: 'blue',
    accentColor: '#70b8ff',
    profile:
      'Berfokus pada infrastruktur IT modern, menghubungkan perangkat dan sistem komputasi, transmisi data jaringan berkabel dan nirkabel, arsitektur cloud, komputasi terdistribusi, serta pertahanan keamanan digital.',
    facilityImage: '/images/labs/lab_csn.webp',
    facilityTitle: 'Laboratorium Net-Centric Computing & Jaringan (CSN / NCC)',
    facilityDescription:
      'Pusat praktikum infrastruktur jaringan berkecepatan tinggi, dilengkapi meja konfigurasi router Cisco, switch manageable, patch panel fiber optic, server cloud testbed, dan workstation monitoring.',
    facilityTags: ['Cisco Routers', 'Fiber Optic Patch', 'Cloud Testbed', 'Cybersecurity CTF'],
    head: {
      name: 'Ritzkal, S.Kom., M.Kom.',
      degree: 'S.Kom., M.Kom.',
      specialization: 'Network Architecture',
      isHead: true,
      image: '/images/lecturers/Pak_Ritzkal.jpg',
    },
    members: [
      {
        name: 'Ade Hendri H., S.Kom., M.Kom.',
        degree: 'S.Kom., M.Kom.',
        specialization: 'Network Engineering',
        image: '/images/lecturers/Pak_Ade.jpg',
      },
      {
        name: 'Yuggo Afrianto, S.T., M.Kom.',
        degree: 'S.T., M.Kom.',
        specialization: 'Cloud Computing',
        image: '/images/lecturers/Pak_Yugo.jpg',
      },
      {
        name: 'Bayu Adhi P., S.Kom., M.T.',
        degree: 'S.Kom., M.T.',
        specialization: 'Cybersecurity',
        image: '/images/lecturers/Pak_Bayu.jpg',
      },
    ],
    careers: [
      'Network Engineer',
      'Cloud Architect',
      'Cybersecurity Specialist',
      'IoT System Designer',
      'Field Engineer',
      'Computer Architecture Engineer',
      'Test Engineer',
    ],
    courses: [
      'Perancangan Topologi Jaringan (Cisco, GNS3, Packet Tracer)',
      'Pengelolaan Infrastruktur Cloud (AWS, Azure, OpenStack)',
      'Keamanan Jaringan dan Informasi',
      'Wireless Sensor Network (WSN)',
      'Embedded System',
      'Otomatisasi IoT',
    ],
    researchAreas: [
      'Perancangan topologi jaringan (Cisco, GNS3, Packet Tracer)',
      'Pengelolaan infrastruktur komputasi awan (AWS, Azure, OpenStack)',
      'Keamanan jaringan dan informasi (Firewall, VPN, IDS/IPS, mitigasi serangan MITM)',
      'Wireless Sensor Network (WSN), Embedded System, dan otomatisasi IoT',
    ],
    achievements: [
      {
        title: 'Proyek Mahasiswa',
        items: [
          'Hybrid Cloud Networking — simulasi integrasi industri',
          'Komunikasi drone swarm — distributed wireless protocol',
          'Smart Meter berbasis LoRa/NB-IoT',
          'Monitoring jaringan real-time',
          'Pameran Gelar Inovasi Daerah Kabupaten Bogor',
        ],
      },
    ],
    activities: [
      'Hands-on proyek integrasi simulasi industri',
      'Workshop Cisco Networking',
      'Praktikum Cloud Infrastructure',
      'Sesi Cybersecurity Capture The Flag (CTF)',
    ],
  },

  {
    id: 'git',
    slug: 'git',
    name: 'GIT',
    fullName: 'Geospatial Information Technology',
    altName: 'GIT Lab',
    motto: 'Dari Coding Data Peta ke Analisis ke AI Solusi Dunia Nyata',
    accent: 'green',
    accentColor: '#3ad389',
    profile:
      'Bidang keilmuan yang memadukan teknologi informasi, data spasial, analisis keruangan, penginderaan jauh (remote sensing), pemrograman spasial, dan kecerdasan buatan (GeoAI) untuk menghasilkan model visual dan sistem pendukung keputusan (Spatial Decision Support System).',
    facilityImage: '/images/labs/lab_git.webp',
    facilityTitle: 'Studio Geospatial Information Technology & Remote Sensing (GIT)',
    facilityDescription:
      'Studio geospasial mutakhir dilengkapi dinding peta tematik satelit resolusi tinggi, workstation pengolahan citra GeoAI, display monitor mobile, dan base station drone DJI Multispectral.',
    facilityTags: ['Satellite Thematic Maps', 'Workstation GeoAI', 'Mobile 4K Display', 'DJI Drone Base'],
    head: {
      name: 'Dr. Erwin Hermawan, S.Si, M.Sc.',
      degree: 'S.Si, M.Sc.',
      specialization: 'Pemodelan Spasial Dinamik',
      isHead: true,
      image: '/images/lecturers/Pak_Erwin.jpg',
    },
    members: [
      {
        name: 'Iksal Yanuarsyah, S.Hut, MSc, Ph.D.',
        degree: 'S.Hut, MSc, Ph.D.',
        specialization: 'Aplikasi Penginderaan Jauh',
        image: '/images/lecturers/Pak_Iksal.jpg',
      },
      {
        name: 'Sahid Agustian H, S.T, M.Kom.',
        degree: 'S.T, M.Kom.',
        specialization: 'Pemrograman Spasial',
        image: '/images/lecturers/Pak_Sahid.jpg',
      },
      {
        name: 'Nurul Kamilah, S.Kom, M.Kom.',
        degree: 'S.Kom, M.Kom.',
        specialization: 'Perancangan Sistem Informasi Geospasial',
      },
      {
        name: 'Mohammad Aftaf Muhajir, S.Si., M.Kom.',
        degree: 'S.Si., M.Kom.',
        specialization: 'Pemrograman Spasial',
        image: '/images/lecturers/Pak_Aftaf.jpg',
      },
      {
        name: 'Fety Fatimah, S.Kom., M.Kom.',
        degree: 'S.Kom., M.Kom.',
        specialization: 'Perancangan Sistem Informasi Geospasial',
        image: '/images/lecturers/Bu_Fety.jpg',
      },
    ],
    careers: [
      'GIS Analyst',
      'GIS Specialist',
      'Spatial Data Analyst',
      'Remote Sensing Analyst',
      'GIS / WebGIS Developer',
      'Geospatial Application Developer',
      'Spatial Database Developer',
      'Geospatial Data Scientist',
      'GeoAI Engineer',
      'Digital Twin Specialist',
    ],
    courses: [
      'Pemrograman Spasial',
      'Penginderaan Jauh',
      'Perancangan Sistem Informasi Geospasial',
      'Analisis Keruangan',
      'GeoAI & Deep Learning',
      'WebGIS Development',
    ],
    researchAreas: [
      'Pemodelan spasial dinamik',
      'Remote sensing & citra satelit (Sentinel/Landsat)',
      'GeoAI deteksi bangunan dari citra satelit melalui Deep Learning',
      'Spatial Decision Support System',
      'WebGIS persebaran fasilitas publik',
      'Disaster GIS (pemetaan dan pemodelan risiko banjir)',
    ],
    achievements: [
      {
        title: 'Perangkat Drone Canggih',
        items: [
          'DJI Phantom 4 Pro — video 4K 60fps, sensor 20MP',
          'DJI Phantom 4 Multispectral + D-RTK 2 Mobile Station Combo',
          'Akurasi posisi hingga level sentimeter untuk survei vegetasi pertanian',
        ],
      },
      {
        title: 'Proyek Lapangan',
        items: [
          'Ortofoto lahan persawahan resolusi tinggi di Kecamatan Leuwiliang, Kabupaten Bogor',
          'Pengambilan data spasial menggunakan drone + RTK',
        ],
      },
    ],
    hardware: [
      {
        name: 'DJI Phantom 4 Pro',
        specs: 'Video 4K 60fps, sensor 20MP — survei udara presisi tinggi',
      },
      {
        name: 'DJI Phantom 4 Multispectral + D-RTK 2 Mobile Station Combo',
        specs: 'Akurasi posisi level sentimeter — survei vegetasi pertanian',
      },
    ],
    fieldProjects: [
      'Ortofoto lahan persawahan resolusi tinggi di Kecamatan Leuwiliang, Kabupaten Bogor',
    ],
    thesisTopics: [
      'WebGIS persebaran fasilitas publik',
      'Disaster GIS — pemetaan dan pemodelan risiko banjir',
      'Analisis perubahan tutupan lahan multi-tahun (Sentinel/Landsat)',
      'Optimasi lokasi fasilitas publik',
      'GeoAI deteksi bangunan dari citra satelit melalui Deep Learning',
    ],
    sectors: {
      govt: ['BIG', 'Bappeda', 'Kementerian ATR/BPN', 'PUPR', 'KLHK', 'BNPB'],
      private: [
        'Perusahaan perkebunan kelapa sawit',
        'Pertambangan',
        'Properti',
        'Logistik',
        'Telekomunikasi',
        'Konsultan pemetaan',
      ],
    },
    activities: [
      'Praktik lapangan pemasangan titik kontrol RTK',
      'Family gathering',
      'Sesi diskusi dan sharing mahasiswa',
    ],
  },

  {
    id: 'keris',
    slug: 'keris',
    name: 'KERIS',
    fullName: 'Knowledge Engineering and Reliable Intelligent Systems',
    altName: 'KERIS Lab',
    motto:
      'Menjadi pusat riset sistem cerdas terkemuka di Bogor Raya pada tahun 2030',
    accent: 'amber',
    accentColor: '#ffca16',
    profile:
      'Kelompok riset keilmuan yang berfokus pada rekayasa sistem cerdas, pengembangan produk berbasis AI, sistem pakar berbasis pengetahuan (Knowledge-Based Systems), ontologi/semantic web, serta analisis mendalam terhadap data (Data Mining dan Machine Learning).',
    facilityImage: '/images/labs/lab_keris.webp',
    facilityTitle: 'Ruang Riset Knowledge Engineering & Intelligent Systems (KERIS)',
    facilityDescription:
      'Ruang kolaborasi riset sistem cerdas & kecerdasan buatan terpadu dengan smart display interaktif, whiteboard diagram ontologi & flow data, serta meja konferensi evaluasi model AI.',
    facilityTags: ['Smart TV Interactive', 'Ontology Whiteboard', 'Sprint Conference Table', 'GPU AI Workstation'],
    head: {
      name: 'Dr. Puspa Eosina, S.Si, M.Kom.',
      degree: 'S.Si, M.Kom.',
      specialization: 'Data Mining & Machine Learning',
      isHead: true,
      image: '/images/lecturers/Bu_Puspa.jpg',
    },
    members: [
      {
        name: 'Dr. Foni Agus Setiawan',
        degree: 'Dr.',
        specialization: 'Semantic Web & Knowledge Engineering',
      },
      {
        name: 'Gibtha Fitri Laxmi, S.Kom., M.Kom.',
        degree: 'S.Kom., M.Kom.',
        specialization: 'Computer Vision & Pengenalan Pola',
        image: '/images/lecturers/Bu_gibtha.jpg',
      },
      {
        name: 'Andi Eko K., S.Si., M.T.',
        degree: 'S.Si., M.T.',
        specialization: 'IoT & Big Data',
        image: '/images/lecturers/Pak_Andik.jpg',
      },
      {
        name: 'Dewi Primasari, S.Kom., M.M.',
        degree: 'S.Kom., M.M.',
        specialization: 'Bidang Pengabdian Kepada Masyarakat',
        image: '/images/lecturers/Bu_Dewi.jpg',
      },
    ],
    careers: [
      'AI & Machine Learning Specialist',
      'Data Scientist',
      'Knowledge Engineer',
      'Data Quality Engineer',
      'Business Intelligence Analyst',
      'Peneliti AI',
    ],
    courses: [
      'Data Mining & Machine Learning',
      'Semantic Web & Knowledge Engineering',
      'Computer Vision & Pengenalan Pola',
      'IoT & Big Data',
      'Deep Learning',
      'Natural Language Processing',
    ],
    researchAreas: [
      'Rekayasa sistem cerdas',
      'Pengembangan produk berbasis AI',
      'Knowledge-Based Systems',
      'Ontologi dan semantic web',
      'Data Mining dan Machine Learning',
    ],
    achievements: [
      {
        title: 'Google Student Ambassador (GSA) 2025',
        items: [
          '2 mahasiswa dari lab KERIS terpilih menjadi perwakilan resmi Google untuk literasi AI di kampus',
        ],
      },
      {
        title: 'Hibah Penelitian LLDIKTI - Belmawa',
        items: [
          '2019: Model Prediksi Cancer Menggunakan Metode Autoencoder',
          '2020: K-Nearest Neighbor dalam Pemetaan UMKM Sektor Kuliner',
          '2022: Cellular Automata dalam Menentukan Koefisien Penyebaran COVID-19',
          '2024: Optimasi Rute Angkutan Kota Bogor Berbasis Artificial Intelligence',
        ],
      },
      {
        title: 'Program MBKM',
        items: [
          'Bangkit Academy Batch 4, 5, dan 6',
          'Magang IoT di PT Telkom Bandung',
          'Magang Data di PT Telkom Jakarta',
          'AI Mastery Orbit Future Academy',
          'KKN Nasional',
          'Magang Internasional di UNISEL Malaysia',
        ],
      },
    ],
    hardware: [
      {
        name: 'High-Performance Workstation',
        specs:
          'AMD Ryzen 9 5950X (up to 4.9 GHz), RAM 64 GB DDR4, NVMe SSD 1 TB + HDD 3 TB, NVIDIA GeForce RTX 3060 12GB',
      },
    ],
    activities: [
      'Pertemuan rutin diskusi progres ide skripsi setiap hari Kamis',
      'Sharing session bersama alumni lab',
      'Sosialisasi program kelulusan',
    ],
  },
];

/** Quick lookup by lab id */
export function getLabById(id: LabData['id']): LabData | undefined {
  return labsData.find((l) => l.id === id);
}

/** Accent color class name for Tailwind (used in conditional styling) */
export function getAccentColorValue(accent: LabAccent): string {
  const map: Record<LabAccent, string> = {
    violet: '#9281f7',
    blue: '#70b8ff',
    green: '#3ad389',
    amber: '#ffca16',
  };
  return map[accent];
}
