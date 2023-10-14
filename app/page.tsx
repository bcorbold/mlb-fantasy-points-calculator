import { loadBatters } from "@/app/_utils/loadBatters";
import { BatterTable } from "@/app/_components/BatterTable";

export default async function Home() {
  const batters = await loadBatters("2023");

  return (
    <main className="min-h-screen p-12">
      <BatterTable batters={batters} />
    </main>
  );
}
