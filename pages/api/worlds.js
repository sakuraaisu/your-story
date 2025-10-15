// pages/api/worlds.js
import { prisma } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const worlds = await prisma.world.findMany({ orderBy: { id: "asc" } });
    return res.status(200).json(worlds);
  }

  if (req.method === "POST") {
    const { name } = req.body ?? {};
    if (!name || typeof name !== "string") {
      return res.status(400).json({ error: "name is required" });
    }
    const world = await prisma.world.create({ data: { name } });
    return res.status(201).json(world);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end("Method Not Allowed");
}
