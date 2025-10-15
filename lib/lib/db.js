// lib/db.js
import { PrismaClient } from "@prisma/client";

// Next.js (開発時のホットリロード) でクライアントを使い回すためのパターン
let prismaGlobal = globalThis._prisma || null;

export const prisma =
  prismaGlobal ??
  new PrismaClient({
    log: ["error", "warn"], // 必要なら "query" も
  });

if (process.env.NODE_ENV !== "production") {
  globalThis._prisma = prisma;
}
