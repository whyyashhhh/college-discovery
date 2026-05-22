'use client';
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

interface FilterState {
  search: string;
  type: string;
  state: string;
  maxFees: number;
  minRating: number;
  sort: string;
}

interface Props {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const COLLEGE_TYPES = ["ENGINEERING", "MEDICAL", "MANAGEMENT", "ARTS", "SCIENCE", "LAW"];
const STATES = ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat", "Rajasthan"];

export default function CollegeFilters({ filters, onChange }: Props) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const update = (key: keyof FilterState, value: any) => onChange({ ...filters, [key]: value });

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search colleges, cities..."
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        {COLLEGE_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => update("type", filters.type === type ? "" : type)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              filters.type === type
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-200 text-gray-600 hover:border-blue-300"
            }`}
          >
            {type.charAt(0) + type.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <button onClick={() => setShowAdvanced(!showAdvanced)} className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
        <SlidersHorizontal size={16} />
        {showAdvanced ? "Hide" : "Show"} advanced filters
      </button>

      {showAdvanced && (
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
          <div>
            <label className="text-xs text-gray-500 block mb-1">State</label>
            <select
              value={filters.state}
              onChange={(e) => update("state", e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All states</option>
              {STATES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Sort by</label>
            <select
              value={filters.sort}
              onChange={(e) => update("sort", e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="rating">Top Rated</option>
              <option value="fees_asc">Fees: Low to High</option>
              <option value="fees_desc">Fees: High to Low</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="text-xs text-gray-500 block mb-1">Max Fees: ₹{(filters.maxFees / 100000).toFixed(1)}L</label>
            <input
              type="range"
              min={0}
              max={5000000}
              step={50000}
              value={filters.maxFees}
              onChange={(e) => update("maxFees", Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>
          <div className="col-span-2">
            <label className="text-xs text-gray-500 block mb-1">Min Rating: {filters.minRating}★</label>
            <input
              type="range"
              min={0}
              max={5}
              step={0.5}
              value={filters.minRating}
              onChange={(e) => update("minRating", Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>
        </div>
      )}
    </div>
  );
}