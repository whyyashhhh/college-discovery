import { formatCurrency, formatSalary } from "@/lib/utils";

export type CompareCollege = {
  id: string;
  name: string;
  slug: string;
  location: string;
  city: string;
  state: string;
  type: string;
  rating: number;
  totalFees: number;
  website?: string | null;
  imageUrl?: string | null;
  description?: string | null;
  placements?: Array<{
    year: number;
    avgSalary: number;
    highestSalary: number;
    recruitingCompanies: number;
    placementRate: number;
  }>;
  examCutoffs?: Array<{
    examName: string;
    category: string;
    cutoffRank: number;
    year: number;
  }>;
  courses?: Array<{
    name: string;
    degree: string;
    duration: number;
    fees: number;
    seats: number;
  }>;
};

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs uppercase tracking-[0.3em] text-slate-500">{label}</div>
      <div className="mt-2 text-sm font-medium text-white">{value}</div>
    </div>
  );
}

export function CompareTable({ colleges }: { colleges: CompareCollege[] }) {
  const topPlacements = colleges.map((college) => college.placements?.[0]);

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_1.1fr]">
      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
        {colleges.map((college) => (
          <article key={college.id} className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">{college.type}</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{college.name}</h2>
                <p className="mt-2 text-sm text-slate-300">{college.location}</p>
              </div>
              <div className="rounded-full bg-cyan-300/15 px-3 py-1 text-sm font-semibold text-cyan-200">
                {college.rating.toFixed(1)}
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              <InfoCard label="Total fees" value={formatCurrency(college.totalFees)} />
              <InfoCard label="Top placement package" value={formatSalary(topPlacements[colleges.indexOf(college)]?.highestSalary ?? 0)} />
              <InfoCard label="Courses" value={`${college.courses?.length ?? 0} available`} />
              <InfoCard label="Cutoffs" value={`${college.examCutoffs?.length ?? 0} records`} />
            </div>

            {college.description && <p className="mt-4 text-sm leading-6 text-slate-400">{college.description}</p>}
          </article>
        ))}
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-slate-950/50 p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold text-white">Comparison matrix</h3>
        <p className="mt-2 text-sm text-slate-400">A concise view of the most useful signals.</p>

        <table className="mt-6 min-w-full border-separate border-spacing-y-3 text-left text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="px-4 py-2 font-medium">Metric</th>
              {colleges.map((college) => (
                <th key={college.id} className="px-4 py-2 font-medium">{college.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="rounded-l-2xl bg-white/5 px-4 py-3 text-slate-400">Location</td>
              {colleges.map((college, index) => (
                <td key={college.id} className={`bg-white/5 px-4 py-3 ${index === colleges.length - 1 ? "rounded-r-2xl" : ""}`}>
                  {college.city}, {college.state}
                </td>
              ))}
            </tr>
            <tr>
              <td className="rounded-l-2xl bg-white/5 px-4 py-3 text-slate-400">Average package</td>
              {colleges.map((college, index) => (
                <td key={college.id} className={`bg-white/5 px-4 py-3 ${index === colleges.length - 1 ? "rounded-r-2xl" : ""}`}>
                  {formatSalary(college.placements?.[0]?.avgSalary ?? 0)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="rounded-l-2xl bg-white/5 px-4 py-3 text-slate-400">Highest package</td>
              {colleges.map((college, index) => (
                <td key={college.id} className={`bg-white/5 px-4 py-3 ${index === colleges.length - 1 ? "rounded-r-2xl" : ""}`}>
                  {formatSalary(college.placements?.[0]?.highestSalary ?? 0)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="rounded-l-2xl bg-white/5 px-4 py-3 text-slate-400">Placement rate</td>
              {colleges.map((college, index) => (
                <td key={college.id} className={`bg-white/5 px-4 py-3 ${index === colleges.length - 1 ? "rounded-r-2xl" : ""}`}>
                  {college.placements?.[0] ? `${college.placements[0].placementRate}%` : "N/A"}
                </td>
              ))}
            </tr>
            <tr>
              <td className="rounded-l-2xl bg-white/5 px-4 py-3 text-slate-400">Website</td>
              {colleges.map((college, index) => (
                <td key={college.id} className={`bg-white/5 px-4 py-3 ${index === colleges.length - 1 ? "rounded-r-2xl" : ""}`}>
                  {college.website ? (
                    <a className="text-cyan-300 hover:text-cyan-200" href={college.website} target="_blank" rel="noreferrer">
                      Open site
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}