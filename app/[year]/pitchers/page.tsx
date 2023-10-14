import { PageParams } from "@/app/_models/PageParams";
import { YearParams } from "@/app/[year]/page";
import { loadPitchers } from "@/app/_utils/loadPitchers";
import { PitchersTable } from "@/app/_components/PitchersTable";

export default function PitchersPage({
  params: { year },
}: PageParams<YearParams>) {
  const pitchers = loadPitchers(year);

  return (
    <div className="grid grid-rows-[auto,auto,1fr] gap-2 h-full">
      <h1 className="prose-2xl">{year} Pitcher Stats</h1>
      <div className="bg-blue-400">Settings</div>
      <div className="h-full w-full overflow-auto">
        <PitchersTable pitchers={pitchers} />
      </div>
    </div>
  );
}
