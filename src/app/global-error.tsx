"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <body className="bg-slate-950 text-slate-100 flex min-h-screen flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold font-mono text-rose-500">System Exception</h2>
        <p className="mt-2 text-sm text-slate-400 font-mono">{error.message || "An unexpected system interrupt occurred."}</p>
        <button
          onClick={() => reset()}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm font-medium transition-colors"
        >
          Muat Ulang
        </button>
      </body>
    </html>
  );
}

