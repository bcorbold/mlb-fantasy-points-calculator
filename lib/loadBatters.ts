import { readFileSync } from "fs";
import { Batter, batterRowToBatter, toBatterRow } from "@/models/Batter";
import path from "path";

export const loadBatters = (year: string): Batter[] => {
  const data = readFileSync(
    path.resolve(`./public/resources/${year}/batters.csv`),
    "utf-8",
  );
  const rows = data.split("\n").map((row) => row.split(","));

  const headerRow = rows.shift()!;
  const batterRows: Batter[] = rows
    .map((row) => batterRowToBatter(toBatterRow(headerRow)(row)))
    .filter(({ AB }) => AB > 0);

  const batterGroups = batterRows.reduce<Record<string, Batter[]>>(
    (acc, batter) => {
      const existingBatter = acc[batter.brId];
      if (existingBatter) {
        existingBatter.push(batter);
        acc[batter.brId] = existingBatter;
      } else {
        acc[batter.brId] = [batter];
      }
      return acc;
    },
    {},
  );

  return Object.values(batterGroups).reduce<Batter[]>((acc, batterGroup) => {
    if (batterGroup.length === 1) {
      acc.push(batterGroup[0]);
    } else {
      const totalPlayer = batterGroup.find(({ Tm }) => Tm === "TOT");
      if (!totalPlayer) {
        // Players with the same name shouldn't be grouped together
        acc.push(...batterGroup);
      } else {
        acc.push(totalPlayer);
      }
    }
    return acc;
  }, []);
};
