export type Pitcher = {
  name: string;
  team: string;
  wins: number;
  saves: number;
  outs: number;
  hits: number;
  earnedRuns: number;
  walks: number;
  hitByPitch: number;
  strikeOuts: number;
};

const lookupTable = {
  name: 1,
  team: 3,
  wins: 5,
  saves: 14,
  hits: 16,
  earnedRuns: 18,
  walks: 20,
  hitByPitch: 23,
  strikeOuts: 22,
  inningsPitched: 15,
};

const inningsPitcherToOuts = (inningsPitched: string): number => {
  const parsed = inningsPitched.split(".");
  return Number(parsed[0]) * 3 + Number(parsed[1]);
};

export const resourceRowToPitcher = (row: string[]): Pitcher => ({
  name: row[lookupTable["name"]],
  earnedRuns: Number(row[lookupTable["earnedRuns"]]),
  hitByPitch: Number(row[lookupTable["hitByPitch"]]),
  hits: Number(row[lookupTable["hits"]]),
  outs: inningsPitcherToOuts(row[lookupTable["inningsPitched"]]),
  saves: Number(row[lookupTable["saves"]]),
  strikeOuts: Number(row[lookupTable["strikeOuts"]]),
  team: row[lookupTable["team"]],
  walks: Number(row[lookupTable["walks"]]),
  wins: Number(row[lookupTable["wins"]]),
});
