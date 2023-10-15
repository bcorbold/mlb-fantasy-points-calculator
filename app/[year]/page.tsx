import { PageParams } from "@/models/PageParams";
import { loadBatters } from "@/lib/loadBatters";
import { loadPitchers } from "@/lib/loadPitchers";
import { loadPointsConfig } from "@/lib/loadPointsConfig";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import dynamic from "next/dynamic";

const PointsConfigForm = dynamic(
  () => import("@/components/PointsConfigForm"),
  {
    ssr: false,
  },
);

const LeagueTable = dynamic(() => import("@/components/LeagueTable"), {
  ssr: false,
});

type YearParams = {
  year: string;
};

export default function YearPage({ params: { year } }: PageParams<YearParams>) {
  const batters = loadBatters(year);
  const pitchers = loadPitchers(year);
  const config = loadPointsConfig(year);

  return (
    <div className="grid grid-rows-[auto,auto,1fr] gap-2 h-full">
      <h1 className="prose-2xl">{year} League Stats</h1>
      <Alert>
        <AlertDescription>
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
        </AlertDescription>
      </Alert>
      <div className="h-full w-full overflow-auto">
        <PointsConfigForm initialConfig={config} />
        <LeagueTable batters={batters} pitchers={pitchers} config={config} />
      </div>
    </div>
  );
}
