import { Pitcher, resourceRowToPitcher } from "@/app/_models/Pitcher";
import { readFileSync } from "fs";

export const loadPitchers = (year: string): Pitcher[] => {
  const data = readFileSync(`./app/_resources/${year}/pitchers.csv`, "utf-8");
  const rows = data.split("\n").map((row) => row.split(","));

  // todo: Can probably just do this in the resource file?
  // removes the header row
  rows.shift();

  // todo: Filter players with 0 ABs?
  const pitcherRows = rows.map(resourceRowToPitcher);

  const pitcherGroups = pitcherRows.reduce<Record<string, Pitcher[]>>(
    (acc, pitcher) => {
      const existingPitcher = acc[pitcher.name];
      if (existingPitcher) {
        existingPitcher.push(pitcher);
        acc[pitcher.name] = existingPitcher;
      } else {
        acc[pitcher.name] = [pitcher];
      }
      return acc;
    },
    {},
  );

  return Object.values(pitcherGroups).reduce<Pitcher[]>((acc, pitcherGroup) => {
    if (pitcherGroup.length === 1) {
      acc.push(pitcherGroup[0]);
    } else {
      const totalPlayer = pitcherGroup.find(({ team }) => team === "TOT");
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
