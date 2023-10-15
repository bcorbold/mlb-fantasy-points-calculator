import { PageParams } from "@/models/PageParams";
import { YearParams } from "@/app/[year]/page";
import { loadBatters } from "@/lib/loadBatters";
import { BatterTable } from "@/components/BatterTable";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { calculateBatterPoints } from "@/lib/calculatePlayerPoints";
import { loadPointsConfig } from "@/lib/loadPointsConfig";

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
          batters={batters
            .map((batter) => ({
              ...batter,
              points: calculateBatterPoints(batter, config),
            }))
            .sort((a, b) => (a.points > b.points ? -1 : 1))}
        />
      </div>
    </div>
  );
}
