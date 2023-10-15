import { PageParams } from "@/models/PageParams";
import { isSupportedYear } from "@/models/SupportedYear";
import Link from "next/link";
import { loadPointsConfig } from "@/lib/loadPointsConfig";
import { PointsConfigSummary } from "@/components/PointsConfigSummary";

export type YearParams = {
  year: string;
};

export default function YearPage({ params: { year } }: PageParams<YearParams>) {
  if (!isSupportedYear(year)) {
    return <h1 className="prose-2xl">Sorry no data for this year</h1>;
  }
  const config = loadPointsConfig(year);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-2 items-start px-2">
        <h1 className="prose-2xl">{year} Player Stats</h1>
        <Link href={`/${year}/league`}>League Stats</Link>
        <Link href={`/${year}/batters`}>Batter Stats</Link>
        <Link href={`/${year}/pitchers`}>Pitcher Stats</Link>
      </div>
      <div className="bg-slate-200 flex flex-col gap-2 items-start px-2 rounded-lg">
        <h1 className="prose-2xl">{year} Points Breakdown</h1>
        <PointsConfigSummary config={config} />
      </div>
    </div>
  );
}
