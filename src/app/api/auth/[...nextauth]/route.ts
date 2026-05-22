import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const demoAuthSchema = z.object({
  mode: z.enum(["login", "signup"]).default("login"),
  name: z.string().min(1).optional(),
  email: z.string().email(),
});

export async function GET() {
  return NextResponse.json({ demo: true, authenticated: false });
}

export async function POST(req: NextRequest) {
  const body = demoAuthSchema.parse(await req.json());

  return NextResponse.json({
    demo: true,
    authenticated: true,
    user: {
      id: body.email,
      name: body.name ?? body.email.split("@")[0],
      email: body.email,
      mode: body.mode,
    },
  });
}