'use client';

import { useState } from 'react';

export default function ClientForm() {
  const [name, setName] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    const res = await fetch('/api/worlds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      setName('');
      // サーバーレンダの一覧を最新化
      // CSRなら再フェッチ、SSRならページ遷移/リフレッシュ
      if (typeof window !== 'undefined') {
        window.location.assign('/worlds');
      }
    } else {
      console.error('Create failed', await res.text());
      alert('作成に失敗しました');
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ margin: '16px 0', display: 'flex', gap: 8 }}>
      <input
        placeholder="新しい World 名"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ flex: 1, padding: 8, fontSize: 16 }}
      />
      <button style={{ padding: '8px 14px', fontSize: 16 }}>追加</button>
    </form>
  );
}
