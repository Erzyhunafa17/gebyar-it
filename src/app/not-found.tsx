import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-slate-950 text-slate-100">
      <span className="font-mono text-xs px-2.5 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 mb-4">
        STATUS 404 // NOT_FOUND
      </span>
      <h1 className="text-4xl sm:text-5xl font-mono font-bold tracking-tight text-white mb-3">
        Halaman Tidak Ditemukan
      </h1>
      <p className="max-w-md text-sm text-slate-400 mb-6">
        Rute atau modul laboratorium yang Anda cari tidak terdaftar dalam indeks sistem TI.UIKA.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}

