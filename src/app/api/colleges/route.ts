import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const querySchema = z.object({
  search: z.string().optional(),
  type: z.string().optional(),
  state: z.string().optional(),
  minFees: z.coerce.number().optional(),
  maxFees: z.coerce.number().optional(),
  minRating: z.coerce.number().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(12),
  sort: z.enum(["rating", "fees_asc", "fees_desc", "name"]).default("rating"),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const params = querySchema.parse(Object.fromEntries(searchParams));

  const where: any = {};

  if (params.search) {
    where.OR = [
      { name: { contains: params.search, mode: "insensitive" } },
      { city: { contains: params.search, mode: "insensitive" } },
      { state: { contains: params.search, mode: "insensitive" } },
    ];
  }

  if (params.type) where.type = params.type;
  if (params.state) where.state = { contains: params.state, mode: "insensitive" };
  if (params.minFees || params.maxFees) {
    where.totalFees = {};
    if (params.minFees) where.totalFees.gte = params.minFees;
    if (params.maxFees) where.totalFees.lte = params.maxFees;
  }
  if (params.minRating) where.rating = { gte: params.minRating };

  const orderBy: any =
    params.sort === "rating"
      ? { rating: "desc" }
      : params.sort === "fees_asc"
        ? { totalFees: "asc" }
        : params.sort === "fees_desc"
          ? { totalFees: "desc" }
          : { name: "asc" };

  const [colleges, total] = await Promise.all([
    prisma.college.findMany({
      where,
      orderBy,
      skip: (params.page - 1) * params.limit,
      take: params.limit,
      include: { placements: { orderBy: { year: "desc" }, take: 1 } },
    }),
    prisma.college.count({ where }),
  ]);

  return NextResponse.json({ colleges, total, pages: Math.ceil(total / params.limit) });
}

export async function POST() {
  return NextResponse.json({ error: "Not implemented." }, { status: 501 });
}