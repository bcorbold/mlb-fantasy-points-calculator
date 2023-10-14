import { PageParams } from "@/app/_models/PageParams";
import { YearParams } from "@/app/[year]/page";
import { loadBatters } from "@/app/_utils/loadBatters";
import { BatterTable } from "@/app/_components/BatterTable";

export default async function BattersPage({
  params: { year },
}: PageParams<YearParams>) {
  const batters = await loadBatters(year);

  return (
    <div className="grid grid-rows-[auto,auto,1fr] gap-2 h-full">
      <h1 className="prose-2xl">{year} Batter Stats</h1>
      <div className="bg-blue-400">Settings</div>
      <div className="h-full w-full overflow-auto">
        <BatterTable batters={batters} />
      </div>
    </div>
  );
}
