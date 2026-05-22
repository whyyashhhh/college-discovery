import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-16 sm:px-10 lg:px-16">
      <section className="mx-auto flex max-w-6xl flex-col gap-10 rounded-[2rem] border border-white/10 bg-[#0f172a] px-8 py-14 text-white shadow-2xl shadow-slate-950/20 sm:px-12 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
            College Discovery
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Explore colleges, compare outcomes, and predict rank fit.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            A structured starter for discovery, authentication, comparisons, and
            prediction workflows.
          </p>
        </div>
        <div className="grid gap-3 text-sm sm:grid-cols-3 lg:w-[30rem]">
          <div className="rounded-2xl bg-white/5 p-4">
            <div className="text-slate-400">Routes</div>
            <div className="mt-1 font-medium">Auth, colleges, compare, predict</div>
          </div>
          <div className="rounded-2xl bg-white/5 p-4">
            <div className="text-slate-400">UI</div>
            <div className="mt-1 font-medium">Reusable primitives</div>
          </div>
          <div className="rounded-2xl bg-white/5 p-4">
            <div className="text-slate-400">Data</div>
            <div className="mt-1 font-medium">Prisma-ready lib layer</div>
          </div>
        </div>
      </section>
    </main>
  );
}
