import { PageParams } from "@/models/PageParams";
import { YearParams } from "@/app/[year]/page";
import { loadPitchers } from "@/lib/loadPitchers";
import { PitchersTable } from "@/components/PitchersTable";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { calculatePitcherPoints } from "@/lib/calculatePlayerPoints";
import { loadPointsConfig } from "@/lib/loadPointsConfig";

// todo: https://www.baseball-reference.com/leagues/majors/2023-standard-pitching.shtml
export default function PitchersPage({
  params: { year },
}: PageParams<YearParams>) {
  const pitchers = loadPitchers(year);
  const { pitchers: config } = loadPointsConfig(year);

  return (
    <div className="grid grid-rows-[auto,auto,1fr] gap-2 h-full">
      <h1 className="prose-2xl">{year} Pitcher Stats</h1>
      <Alert>
        <AlertDescription>
          All stats exported from{" "}
          <Link
            href={`https://www.baseball-reference.com/leagues/majors/${year}-standard-pitching.shtml`}
            className="text-blue-600 underline"
            target="_blank"
          >
            Baseball Reference
          </Link>
        </AlertDescription>
      </Alert>
      <div className="bg-blue-400">Settings</div>
      <div className="h-full w-full overflow-auto">
        <PitchersTable
          pitchers={pitchers.map((pitcher) => ({
            ...pitcher,
            points: calculatePitcherPoints(pitcher, config),
          }))}
        />
      </div>
    </div>
  );
}
