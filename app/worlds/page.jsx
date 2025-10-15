Set-Location "C:\Users\aisu1\Downloads\your-story (1)\your-story"

@'
import { prisma } from "@/lib/db";
import ClientForm from "./ui/ClientForm.jsx";

export const dynamic = "force-dynamic";

export default async function WorldsPage() {
  const worlds = await prisma.world.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <main style={{ padding: 24 }}>
      <h1>Worlds</h1>
      <ClientForm />
      <ul>
        {worlds.map(w => (
          <li key={w.id}>{w.name}</li>
        ))}
      </ul>
    </main>
  );
}
'@ | Set-Content -Encoding utf8 .\app\worlds\page.jsx
