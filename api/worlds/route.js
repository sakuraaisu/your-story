// app/api/worlds/route.js
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db"; // ルートの lib/db.js への相対パス

export const dynamic = "force-dynamic"; // キャッシュせず毎回実行

export async function GET() {
  // 初回は空なので、デモ用に1件だけ自動作成して返す
  const worlds = await prisma.world.findMany();
  if (worlds.length === 0) {
    const w = await prisma.world.create({ data: { name: "World 1" } });
    return NextResponse.json([w]);
  }
  return NextResponse.json(worlds);
}

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const name = body?.name?.trim?.();
  if (!name) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }
  const w = await prisma.world.create({ data: { name } });
  return NextResponse.json(w, { status: 201 });
}
