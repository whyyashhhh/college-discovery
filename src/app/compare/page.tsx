import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CompareTable, type CompareCollege } from "@/components/compare/CompareTable";

const DEFAULT_LIMIT = 3;

type ComparePageProps = {
  searchParams?: Promise<{ ids?: string }>;
};

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const params = (await searchParams) ?? {};
  const ids = params.ids?.split(",").map((id) => id.trim()).filter(Boolean) ?? [];

  const colleges: CompareCollege[] = ids.length
    ? await prisma.college.findMany({
        where: { OR: [{ id: { in: ids } }, { slug: { in: ids } }] },
        include: {
          placements: { orderBy: { year: "desc" } },
          courses: true,
          examCutoffs: true,
        },
        orderBy: { rating: "desc" },
      })
    : await prisma.college.findMany({
        take: DEFAULT_LIMIT,
        orderBy: { rating: "desc" },
        include: {
          placements: { orderBy: { year: "desc" } },
          courses: true,
          examCutoffs: true,
        },
      });

  return (
    <main className="min-h-screen px-6 py-16 text-slate-100 sm:px-10 lg:px-16">
      <section className="mx-auto max-w-7xl space-y-6">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
            Comparison
          </p>
          <h1 className="text-3xl font-semibold sm:text-5xl">Compare colleges side by side</h1>
          <p className="max-w-3xl text-slate-300">
            Pick colleges from the listing page and compare their fees, placements, cutoffs, and course options.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
            Selected: {ids.length || colleges.length}
          </span>
          <Link className="rounded-full border border-white/10 px-3 py-1 hover:bg-white/10" href="/colleges">
            Add colleges
          </Link>
          <Link className="rounded-full border border-white/10 px-3 py-1 hover:bg-white/10" href="/predictor">
            Rank predictor
          </Link>
        </div>

        {colleges.length ? (
          <CompareTable colleges={colleges} />
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-slate-300">
            No colleges were found for comparison. Go back to the <Link className="text-cyan-300 underline" href="/colleges">colleges page</Link> and add at least one college to the compare tray.
          </div>
        )}
      </section>
    </main>
  );
}