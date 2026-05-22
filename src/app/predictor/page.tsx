"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type PredictorResult = {
  id: string;
  name: string;
  slug: string;
  location: string;
  rating: number;
  totalFees: number;
  cutoffRank: number;
  chanceLabel: "High" | "Medium" | "Low";
};

const EXAMS = ["JEE Advanced", "JEE Main", "BITSAT", "CAT"];
const CATEGORIES = ["General", "OBC", "SC", "ST"];

export default function PredictorPage() {
  const [examName, setExamName] = useState("JEE Advanced");
  const [rank, setRank] = useState("1000");
  const [category, setCategory] = useState("General");
  const [results, setResults] = useState<PredictorResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examName, rank: Number(rank), category }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error ?? "Prediction failed");
      }

      setResults(data);
    } catch (submitError) {
      setResults([]);
      setError(submitError instanceof Error ? submitError.message : "Prediction failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen px-6 py-16 text-slate-100 sm:px-10 lg:px-16">
      <section className="mx-auto max-w-7xl space-y-6">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
            Rank predictor
          </p>
          <h1 className="text-3xl font-semibold sm:text-5xl">Estimate your admission fit</h1>
          <p className="max-w-3xl text-slate-300">
            Enter your exam, rank, and category to see colleges with matching cutoffs from the seeded data.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="space-y-4">
              <label className="block space-y-2 text-sm">
                <span className="text-slate-300">Exam name</span>
                <select
                  value={examName}
                  onChange={(event) => setExamName(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none ring-0"
                >
                  {EXAMS.map((exam) => (
                    <option key={exam} value={exam}>
                      {exam}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block space-y-2 text-sm">
                <span className="text-slate-300">Rank</span>
                <input
                  type="number"
                  min="1"
                  value={rank}
                  onChange={(event) => setRank(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none"
                />
              </label>

              <label className="block space-y-2 text-sm">
                <span className="text-slate-300">Category</span>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none"
                >
                  {CATEGORIES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="submit"
                className="w-full rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Predicting..." : "Predict colleges"}
              </button>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Seeded exams: {EXAMS.join(", ")}</span>
                <Link className="text-cyan-300 hover:text-cyan-200" href="/colleges">
                  Browse colleges
                </Link>
              </div>
            </div>
          </form>

          <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_40%),rgba(255,255,255,0.04)] p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-white">Results</h2>
                <p className="text-sm text-slate-400">Matching colleges ordered by cutoff rank.</p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                {results.length} found
              </span>
            </div>

            {error ? (
              <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 p-4 text-sm text-rose-100">
                {error}
              </div>
            ) : results.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/40 p-8 text-sm leading-6 text-slate-400">
                Run a prediction to see colleges that match your exam rank. The seeded dataset includes IIT Bombay, IIT Delhi, NIT Trichy, BITS Pilani, and IIM Ahmedabad.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {results.map((college) => (
                  <article key={college.id} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{college.name}</h3>
                        <p className="mt-1 text-sm text-slate-400">{college.location}</p>
                      </div>
                      <span className="rounded-full bg-cyan-300/15 px-3 py-1 text-xs font-semibold text-cyan-200">
                        {college.chanceLabel}
                      </span>
                    </div>

                    <dl className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-300">
                      <div>
                        <dt className="text-slate-500">Cutoff rank</dt>
                        <dd className="font-medium text-white">{college.cutoffRank}</dd>
                      </div>
                      <div>
                        <dt className="text-slate-500">Rating</dt>
                        <dd className="font-medium text-white">{college.rating.toFixed(1)}</dd>
                      </div>
                      <div>
                        <dt className="text-slate-500">Fees</dt>
                        <dd className="font-medium text-white">₹{(college.totalFees / 100000).toFixed(1)}L</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}