import { prisma } from "@/lib/db";
import ClientForm from "./ui/ClientForm.jsx";

export const dynamic = "force-dynamic";

export default async function WorldsPage() {
  const worlds = await prisma.world.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <main style={{ padding: 24 }}>
      <h1>Worlds</h1>
      <ClientForm />
      <ul>
        {worlds.map(w => (<li key={w.id}>{w.name}</li>))}
      </ul>
    </main>
  );
}
