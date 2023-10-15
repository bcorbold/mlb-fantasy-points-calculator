import { PageParams } from "@/app/_models/PageParams";
import { YearParams } from "@/app/[year]/page";
import { loadPitchers } from "@/app/_utils/loadPitchers";
import { PitchersTable } from "@/app/_components/PitchersTable";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

// todo: https://www.baseball-reference.com/leagues/majors/2023-standard-pitching.shtml
export default function PitchersPage({
  params: { year },
}: PageParams<YearParams>) {
  const pitchers = loadPitchers(year);

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
        <PitchersTable pitchers={pitchers} />
      </div>
    </div>
  );
}
