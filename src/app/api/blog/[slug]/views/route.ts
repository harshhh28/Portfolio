import { NextResponse } from "next/server";
import { getViews, incrementViews } from "@/lib/blog-views";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }
  const views = await getViews(slug);
  return NextResponse.json({ views }, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }
  const views = await incrementViews(slug);
  return NextResponse.json({ views }, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
