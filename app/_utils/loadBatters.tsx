import { readFileSync } from "fs";
import { Batter, resourceRowToBatter } from "@/app/_models/Batter";

export const loadBatters = async (year: string): Promise<Batter[]> => {
  const data = readFileSync(`./app/_resources/batters-${year}.csv`, "utf-8");
  const rows = data.split("\n").map((row) => row.split(","));

  // todo: Can probably just do this in the resource file?
  // removes the header row
  rows.shift();

  // todo: Filter players with 0 ABs?
  const batterRows = rows.map(resourceRowToBatter);

  const batterGroups = batterRows.reduce<Record<string, Batter[]>>(
    (acc, batter) => {
      const existingBatter = acc[batter.name];
      if (existingBatter) {
        existingBatter.push(batter);
        acc[batter.name] = existingBatter;
      } else {
        acc[batter.name] = [batter];
      }
      return acc;
    },
    {},
  );

  return Object.values(batterGroups).reduce<Batter[]>((acc, batterGroup) => {
    if (batterGroup.length === 1) {
      acc.push(batterGroup[0]);
    } else {
      const totalPlayer = batterGroup.find(({ team }) => team === "TOT");
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
