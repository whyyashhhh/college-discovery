import { College } from "@prisma/client";
import { MapPin, Star } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

interface Props {
  college: College & { placements?: any[] };
  onCompare?: (id: string) => void;
  isInCompare?: boolean;
}

export default function CollegeCard({ college, onCompare, isInCompare }: Props) {
  const placement = college.placements?.[0];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <Link href={`/colleges/${college.slug}`}>
            <h3 className="font-semibold text-gray-900 hover:text-blue-600 truncate">{college.name}</h3>
          </Link>
          <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
            <MapPin size={13} />
            <span>{college.location}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-lg text-sm font-medium shrink-0">
          <Star size={13} fill="currentColor" />
          {college.rating.toFixed(1)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500">Total Fees</p>
          <p className="font-semibold text-gray-800">{formatCurrency(college.totalFees)}</p>
        </div>
        {placement && (
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Avg Package</p>
            <p className="font-semibold text-gray-800">{formatCurrency(placement.avgSalary)}</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium">{college.type}</span>
        {onCompare && (
          <button
            onClick={() => onCompare(college.id)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
              isInCompare ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-600 hover:border-blue-400"
            }`}
          >
            {isInCompare ? "✓ Added" : "+ Compare"}
          </button>
        )}
      </div>
    </div>
  );
}