import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "HSTags — Registro",
  description:
    "Bem-vindo ao registro do HSTags. Esta tela ainda será desenvolvida.",
};

export default function Register() {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-zinc-50 px-6 py-16 font-sans dark:bg-zinc-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.18),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.12),transparent_50%)]"
      />
      <main className="relative w-full max-w-lg rounded-3xl border border-zinc-200/80 bg-white/80 px-8 py-12 text-center shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-zinc-900/70 sm:px-12">
        <p className="text-sm font-semibold tracking-[0.22em] text-emerald-700 uppercase dark:text-emerald-400">
          HSTags
        </p>
        <span className="mt-6 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
          Em desenvolvimento
        </span>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
          Bem-vindo ao registro
        </h1>
        <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
          Esta tela de cadastro do HSTags ainda será desenvolvida. Em breve
          você poderá ativar sua tag por aqui.
        </p>
      </main>
    </div>
  );
}
