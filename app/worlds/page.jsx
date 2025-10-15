"use client";
import { useEffect, useState } from "react";

export default function WorldsPage() {
  const [worlds, setWorlds] = useState([]);
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setError("");
    try {
      const res = await fetch("/api/worlds", { cache: "no-store" });
      if (!res.ok) throw new Error(`GET /api/worlds -> ${res.status}`);
      const data = await res.json();
      setWorlds(data);
    } catch (e) {
      setError(String(e.message || e));
    }
  }

  async function add(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/worlds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error(`POST /api/worlds -> ${res.status}`);
      setName("");
      await load();
    } catch (e) {
      setError(String(e.message || e));
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif", maxWidth: 720 }}>
      <h1 style={{ marginBottom: 8 }}>Worlds</h1>
      <p style={{ color: "#666", marginTop: 0 }}>一覧と追加テスト用の最小UI</p>

      <form onSubmit={add} style={{ margin: "16px 0", display: "flex", gap: 8 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="新しい World 名"
          style={{ flex: 1, padding: 8, fontSize: 16 }}
        />
        <button disabled={busy} style={{ padding: "8px 14px", fontSize: 16 }}>
          {busy ? "追加中…" : "追加"}
        </button>
      </form>

      {error && (
        <div style={{ color: "crimson", marginBottom: 12 }}>Error: {error}</div>
      )}

      <ul style={{ padding: 0, listStyle: "none", display: "grid", gap: 8 }}>
        {worlds.map((w) => (
          <li key={w.id} style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
            <div style={{ fontWeight: 600 }}>{w.name}</div>
            <div style={{ color: "#888", fontSize: 12 }}>
              id: {w.id} / createdAt: {new Date(w.createdAt).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
