import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  examName: z.string(),
  rank: z.number(),
  category: z.string().default("General"),
});

export async function POST(req: NextRequest) {
  const body = schema.parse(await req.json());

  const cutoffs = await prisma.examCutoff.findMany({
    where: {
      examName: { contains: body.examName, mode: "insensitive" },
      category: body.category,
      cutoffRank: { gte: body.rank },
    },
    include: {
      college: {
        include: { placements: { orderBy: { year: "desc" }, take: 1 } },
      },
    },
    orderBy: { cutoffRank: "asc" },
    take: 10,
  });

  const results = cutoffs.map((c) => ({
    ...c.college,
    cutoffRank: c.cutoffRank,
    chanceLabel:
      c.cutoffRank <= body.rank * 1.1 ? "High" : c.cutoffRank <= body.rank * 1.3 ? "Medium" : "Low",
  }));

  return NextResponse.json(results);
}