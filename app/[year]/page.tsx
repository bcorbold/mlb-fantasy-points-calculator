import { PageParams } from "@/models/PageParams";
import { loadBatters } from "@/lib/loadBatters";
import { loadPitchers } from "@/lib/loadPitchers";
import { loadPointsConfig } from "@/lib/loadPointsConfig";
import Link from "next/link";
import { LeagueTable } from "@/components/LeagueTable";
import { PointsConfigForm } from "@/components/PointsConfigForm";
import { InitializePointConfigStore } from "@/stores/InitializePointConfigStore";

type YearParams = {
  year: string;
};

export default function YearPage({ params: { year } }: PageParams<YearParams>) {
  const batters = loadBatters(year);
  const pitchers = loadPitchers(year);
  const config = loadPointsConfig(year);

  return (
    <InitializePointConfigStore
      config={config}
      fallback={<div>Loading...</div>}
    >
      <div className="grid grid-rows-[auto,auto,1fr] gap-2 h-full">
        <h1 className="prose-2xl">{year} League Stats</h1>
        <p className="text-sm">
          All player stats exported from{" "}
          <Link
            href={`https://www.baseball-reference.com/leagues/majors/${year}-standard-batting.shtml`}
            className="text-blue-600 underline"
            target="_blank"
          >
            BR Batters Page
          </Link>{" "}
          and{" "}
          <Link
            href={`https://www.baseball-reference.com/leagues/majors/${year}-standard-pitching.shtml`}
            className="text-blue-600 underline"
            target="_blank"
          >
            BR Pitchers Page
          </Link>
        </p>
        <div className="h-full w-full overflow-auto">
          <PointsConfigForm initialConfig={config} />
          <LeagueTable batters={batters} pitchers={pitchers} config={config} />
        </div>
      </div>
    </InitializePointConfigStore>
  );
}
