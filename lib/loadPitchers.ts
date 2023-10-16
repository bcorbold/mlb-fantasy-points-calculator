import { Pitcher, pitcherRowToPitcher, toPitcherRow } from "@/models/Pitcher";
import { readFileSync } from "fs";
import path from "path";

export const loadPitchers = (year: string): Pitcher[] => {
  const data = readFileSync(
    path.resolve(`./public/resources/${year}/pitchers.csv`),
    "utf-8",
  );
  const rows = data.split("\n").map((row) => row.split(","));

  const headerRow = rows.shift()!;
  const pitcherRows: Pitcher[] = rows.map((row) =>
    pitcherRowToPitcher(toPitcherRow(headerRow)(row)),
  );

  const pitcherGroups = pitcherRows.reduce<Record<string, Pitcher[]>>(
    (acc, pitcher) => {
      const existingPitcher = acc[pitcher.brId];
      if (existingPitcher) {
        existingPitcher.push(pitcher);
        acc[pitcher.brId] = existingPitcher;
      } else {
        acc[pitcher.brId] = [pitcher];
      }
      return acc;
    },
    {},
  );

  return Object.values(pitcherGroups).reduce<Pitcher[]>((acc, pitcherGroup) => {
    if (pitcherGroup.length === 1) {
      acc.push(pitcherGroup[0]);
    } else {
      const totalPlayer = pitcherGroup.find(({ Tm }) => Tm === "TOT");
      if (!totalPlayer) {
        // Players with the same name shouldn't be grouped together
        acc.push(...pitcherGroup);
      } else {
        acc.push(totalPlayer);
      }
    }
    return acc;
  }, []);
};
