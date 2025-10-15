// app/worlds/page.jsx
export const dynamic = "force-dynamic"; // 追加後の反映を確実に

import { prisma } from "../../lib/db";
import ClientForm from "./ui/ClientForm";

export default async function WorldsPage() {
  const worlds = await prisma.world.findMany({ orderBy: { id: "asc" } });

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif", maxWidth: 720 }}>
      <h1 style={{ marginBottom: 8 }}>Worlds</h1>
      <p style={{ color: "#666", marginTop: 0 }}>一覧と追加テスト用の最小UI（サーバー描画）</p>

      <ClientForm />

      <ul style={{ padding: 0, listStyle: "none", display: "grid", gap: 8 }}>
        {worlds.length === 0 && <li>（まだ何もありません）</li>}
        {worlds.map((w) => (
          <li key={w.id} style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
            <div style={{ fontWeight: 600 }}>{w.name}</div>
            <div style={{ color: "#888", fontSize: 12 }}>
              id: {w.id} / createdAt: {new Date(w.createdAt).toLocaleString("ja-JP")}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

