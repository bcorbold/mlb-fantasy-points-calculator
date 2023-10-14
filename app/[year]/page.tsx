import { PageParams } from "@/app/_models/PageParams";
import { isSupportedYear } from "@/app/_models/SupportedYear";
import Link from "next/link";

export type YearParams = {
  year: string;
};

export default function YearPage({ params: { year } }: PageParams<YearParams>) {
  if (!isSupportedYear(year)) {
    return <h1 className="prose-2xl">Sorry no data for this year</h1>;
  }

  return (
    <div>
      <h1 className="prose-2xl">{year} Stats</h1>
      <Link href={`/${year}/batters`}>Batter Stats</Link>
    </div>
  );
}
