import { NextResponse } from "next/server";
import { getAllViews } from "@/lib/blog-views";

export async function GET() {
  const views = await getAllViews();
  return NextResponse.json(views);
}
