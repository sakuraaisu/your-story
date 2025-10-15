// app/worlds/ui/ClientForm.jsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function ClientForm() {
  const [name, setName] = useState("");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function onSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    const res = await fetch("/api/worlds", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim() }),
    });

    if (res.ok) {
      setName("");
      startTransition(() => router.refresh()); // 一覧を更新
    } else {
      console.error("POST /api/worlds failed");
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ margin: "16px 0", display: "flex", gap: 8 }}>
      <input
        placeholder="新しい World 名"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ flex: 1, padding: 8, fontSize: 16 }}
      />
      <button disabled={isPending || !name.trim()} style={{ padding: "8px 14px", fontSize: 16 }}>
        {isPending ? "追加中…" : "追加"}
      </button>
    </form>
  );
}
