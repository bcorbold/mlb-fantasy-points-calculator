export type Batter = {
  name: string;
  runs: number;
  hits: number;
  singles: number; // todo: computed
  doubles: number;
  triples: number;
  homeRuns: number;
  runsBattedIn: number;
  stolenBases: number;
  walks: number;
  hitByPitch: number;
  team: string;
};

const resourceIndexLookup = {
  name: 1,
  team: 3,
  runs: 8,
  hits: 9,
  doubles: 10,
  triples: 11,
  homeRuns: 12,
  runsBattedIn: 13,
  stolenBases: 14,
  walks: 16,
  hitByPitch: 25,
};

export const resourceRowToBatter = (row: string[]): Batter => {
  const hits = Number(row[resourceIndexLookup["hits"]]);
  const doubles = Number(row[resourceIndexLookup["doubles"]]);
  const triples = Number(row[resourceIndexLookup["triples"]]);
  const homeRunes = Number(row[resourceIndexLookup["homeRuns"]]);

  return {
    name: row[resourceIndexLookup["name"]],
    team: row[resourceIndexLookup["team"]],
    hits,
    singles: hits - doubles - triples - homeRunes,
    doubles,
    triples,
    homeRuns: homeRunes,
    walks: Number(row[resourceIndexLookup["walks"]]),
    hitByPitch: Number(row[resourceIndexLookup["hitByPitch"]]),
    runs: Number(row[resourceIndexLookup["runs"]]),
    runsBattedIn: Number(row[resourceIndexLookup["runsBattedIn"]]),
    stolenBases: Number(row[resourceIndexLookup["stolenBases"]]),
  };
};
