import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const college = await prisma.college.findFirst({
    where: { OR: [{ id }, { slug: id }] },
    include: {
      courses: true,
      placements: { orderBy: { year: "desc" } },
      reviews: {
        include: { user: { select: { name: true, image: true } } },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
      examCutoffs: true,
    },
  });

  if (!college) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(college);
}

export async function PATCH() {
  return NextResponse.json({ error: "Not implemented." }, { status: 501 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Not implemented." }, { status: 501 });
}