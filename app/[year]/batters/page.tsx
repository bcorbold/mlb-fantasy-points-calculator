import { PageParams } from "@/app/_models/PageParams";
import { YearParams } from "@/app/[year]/page";
import { loadBatters } from "@/app/_utils/loadBatters";
import { BatterTable } from "@/app/_components/BatterTable";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { calculateBatterPoints } from "@/app/_utils/calculatePlayerPoints";
import { loadPointsConfig } from "@/app/_utils/loadPointsConfig";

export default function BattersPage({
  params: { year },
}: PageParams<YearParams>) {
  const batters = loadBatters(year);
  const { batters: config } = loadPointsConfig(year);

  return (
    <div className="grid grid-rows-[auto,auto,1fr] gap-2 h-full">
      <h1 className="prose-2xl">{year} Batter Stats</h1>
      <Alert>
        <AlertDescription>
          All stats exported from{" "}
          <Link
            href={`https://www.baseball-reference.com/leagues/majors/${year}-standard-batting.shtml`}
            className="text-blue-600 underline"
            target="_blank"
          >
            Baseball Reference
          </Link>
        </AlertDescription>
      </Alert>
      <div className="bg-blue-400">Settings</div>
      <div className="h-full w-full overflow-auto">
        <BatterTable
          batters={batters.map((batter) => ({
            ...batter,
            points: calculateBatterPoints(batter, config),
          }))}
        />
      </div>
    </div>
  );
}
