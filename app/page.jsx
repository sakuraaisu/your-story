Set-Location "C:\Users\aisu1\Downloads\your-story (1)\your-story"

@'
export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Your Story</h1>
      <p>トップページ</p>
    </main>
  );
}
'@ | Set-Content -Encoding utf8 .\app\page.jsx
