'use client';
import { useState, useEffect, useCallback } from "react";
import CollegeCard from "@/components/colleges/CollegeCard";
import CollegeFilters from "@/components/colleges/CollegeFilters";
import { useRouter } from "next/navigation";

const DEFAULT_FILTERS = {
  search: "",
  type: "",
  state: "",
  maxFees: 5000000,
  minRating: 0,
  sort: "rating",
};

export default function CollegesPage() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [colleges, setColleges] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [compareList, setCompareList] = useState<string[]>([]);
  const router = useRouter();

  const fetchColleges = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      ...filters,
      page: String(page),
      maxFees: String(filters.maxFees),
      minRating: String(filters.minRating),
    });
    const res = await fetch(`/api/colleges?${params}`);
    const data = await res.json();
    setColleges(data.colleges);
    setTotal(data.total);
    setLoading(false);
  }, [filters, page]);

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  const toggleCompare = (id: string) => {
    setCompareList((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Discover Colleges</h1>
        <p className="text-gray-500 text-sm mt-1">{total} colleges found</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <CollegeFilters
            filters={filters}
            onChange={(f) => {
              setFilters(f);
              setPage(1);
            }}
          />
        </div>

        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-xl h-48 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {colleges.map((college: any) => (
                <CollegeCard key={college.id} college={college} onCompare={toggleCompare} isInCompare={compareList.includes(college.id)} />
              ))}
            </div>
          )}

          <div className="flex justify-center gap-2 mt-8">
            {[...Array(Math.ceil(total / 12))].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-9 h-9 rounded-lg text-sm ${
                  page === i + 1 ? "bg-blue-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-4 z-50">
          <span className="text-sm">{compareList.length} colleges selected</span>
          <button
            onClick={() => router.push(`/compare?ids=${compareList.join(",")}`)}
            className="bg-blue-500 hover:bg-blue-400 text-white text-sm px-4 py-1.5 rounded-full"
          >
            Compare Now →
          </button>
          <button onClick={() => setCompareList([])} className="text-gray-400 hover:text-white text-sm">
            Clear
          </button>
        </div>
      )}
    </div>
  );
}