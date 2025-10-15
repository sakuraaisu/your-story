// lib/db.js
import { PrismaClient } from "@prisma/client";

let prismaGlobal = globalThis._prisma || null;

export const prisma =
  prismaGlobal ??
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis._prisma = prisma;
}
