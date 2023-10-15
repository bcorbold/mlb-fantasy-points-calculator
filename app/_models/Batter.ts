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

export type BatterWithPoints = Batter & {
  points: number;
};

const lookupTable = {
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
  const hits = Number(row[lookupTable["hits"]]);
  const doubles = Number(row[lookupTable["doubles"]]);
  const triples = Number(row[lookupTable["triples"]]);
  const homeRunes = Number(row[lookupTable["homeRuns"]]);

  return {
    name: row[lookupTable["name"]],
    team: row[lookupTable["team"]],
    hits,
    singles: hits - doubles - triples - homeRunes,
    doubles,
    triples,
    homeRuns: homeRunes,
    walks: Number(row[lookupTable["walks"]]),
    hitByPitch: Number(row[lookupTable["hitByPitch"]]),
    runs: Number(row[lookupTable["runs"]]),
    runsBattedIn: Number(row[lookupTable["runsBattedIn"]]),
    stolenBases: Number(row[lookupTable["stolenBases"]]),
  };
};

export const isBatter = (player: unknown): player is Batter =>
  !!player &&
  typeof player === "object" &&
  "name" in player &&
  "homeRuns" in player;
