import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-8 sm:px-10 lg:px-16">
      <section className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm text-slate-300 backdrop-blur">
        <div>
          <p className="font-semibold uppercase tracking-[0.35em] text-cyan-300">
            College Discovery
          </p>
          <p className="mt-1 text-xs text-slate-400">
            A multi-route college explorer, not just a landing page.
          </p>
        </div>
        <div className="hidden gap-4 sm:flex">
          <Link className="hover:text-white" href="/colleges">
            Colleges
          </Link>
          <Link className="hover:text-white" href="/compare">
            Compare
          </Link>
          <Link className="hover:text-white" href="/predictor">
            Predictor
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.24),_transparent_38%),linear-gradient(135deg,_#081120,_#0f172a_55%,_#111827)] px-8 py-12 text-white shadow-2xl shadow-slate-950/30 sm:px-10 sm:py-14">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
            Discover, compare, decide
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
            Explore colleges with search, comparison, and rank prediction.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Use the actual app routes below to browse colleges, compare options,
            and estimate fit for your exam rank. This homepage now acts as a
            launchpad into the product.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/colleges"
              className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Browse colleges
            </Link>
            <Link
              href="/predictor"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Open predictor
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          {[
            ["/colleges", "College search", "Filter by fees, state, type, and rating."],
            ["/compare", "Compare view", "Review shortlisted colleges side by side."],
            ["/predictor", "Rank predictor", "Check admission fit from your rank."],
            ["/login", "Auth screens", "Starter login and signup routes are ready."],
          ].map(([href, title, description]) => (
            <Link
              key={title}
              href={href}
              className="group rounded-3xl border border-white/10 bg-white/5 p-5 text-white transition hover:-translate-y-0.5 hover:border-cyan-300/50 hover:bg-white/10"
            >
              <div className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                Open route
              </div>
              <div className="mt-3 text-xl font-semibold">{title}</div>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {description}
              </p>
              <div className="mt-4 text-sm font-medium text-cyan-200 group-hover:text-cyan-100">
                Go to page →
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-4 md:grid-cols-3">
        {[
          ["Data-driven", "Prisma-backed endpoints and seeded demo data."],
          ["Multi-page", "Separate routes for browse, compare, predict, and auth."],
          ["Deployment-ready", "Built for Vercel with Neon/Postgres."],
        ].map(([title, description]) => (
          <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-lg font-semibold text-white">{title}</div>
            <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
