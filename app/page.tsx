import Link from "next/link";
import { SUPPORTED_YEARS } from "@/models/SupportedYear";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="prose-2xl">Yahoo Fantasy Baseball Points Calculator</h1>
        <p className="prose-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div>
        <h2 className="prose-lg">Yearly Data</h2>
        <ul className="pl-8 list-disc">
          {SUPPORTED_YEARS.map((year) => (
            <li key={year}>
              <Link href={`/${year}`} className="prose-sm">
                {year}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
