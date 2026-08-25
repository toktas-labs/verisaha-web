import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center bg-white">
      <div className="mx-auto w-full max-w-3xl px-4 py-20 text-center">
        <p className="text-sm font-semibold tracking-widest text-brand-teal">404</p>
        <h1 className="mt-3 text-3xl font-bold text-brand-navy md:text-5xl">
          Sayfa bulunamadı
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-600">
          Aradığınız sayfa kaldırılmış, taşınmış veya adresi değişmiş olabilir.
        </p>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
          The page you are looking for may have been moved, removed or renamed.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Ana Sayfa / Home
          </Link>
          <Link
            href="/demo"
            className="rounded-full border border-brand-teal px-5 py-2.5 text-sm font-semibold text-brand-navy transition hover:bg-brand-teal hover:text-white"
          >
            Modbus Demo
          </Link>
        </div>
      </div>
    </main>
  );
}
