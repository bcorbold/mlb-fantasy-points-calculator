import { WithPoints } from "@/models/WithPoints";
import { z } from "zod";
import {
  leaguesSchema,
  stringyInputToInt,
  stringyInputToNumber,
  teamsSchema,
} from "@/models/Schemas";
import { omit } from "ramda";

const pitcherRowSchema = z.object({
  Rk: stringyInputToInt,
  Name: z.string(),
  Age: stringyInputToInt,
  Tm: teamsSchema,
  Lg: leaguesSchema,
  W: stringyInputToInt,
  L: stringyInputToInt,
  "W-L%": stringyInputToNumber,
  ERA: stringyInputToNumber,
  G: stringyInputToInt,
  GS: stringyInputToInt,
  GF: stringyInputToInt,
  CG: stringyInputToInt,
  SHO: stringyInputToInt,
  SV: stringyInputToInt,
  IP: stringyInputToNumber,
  H: stringyInputToInt,
  R: stringyInputToInt,
  ER: stringyInputToInt,
  HR: stringyInputToInt,
  BB: stringyInputToInt,
  IBB: stringyInputToInt,
  SO: stringyInputToInt,
  HBP: stringyInputToInt,
  BK: stringyInputToInt,
  WP: stringyInputToInt,
  BF: stringyInputToInt,
  "ERA+": stringyInputToInt,
  FIP: stringyInputToNumber,
  WHIP: stringyInputToNumber,
  H9: stringyInputToNumber,
  HR9: stringyInputToNumber,
  BB9: stringyInputToNumber,
  SO9: stringyInputToNumber,
  "SO/W": stringyInputToNumber,
  "Name-additional": z.string(),
});

type PitcherRow = z.infer<typeof pitcherRowSchema>;

export const toPitcherRow =
  (headerRow: string[]) =>
  (pitcherRow: string[]): PitcherRow =>
    pitcherRowSchema.parse(
      headerRow.reduce<Record<string, unknown>>((pitcher, key, i) => {
        pitcher[key] = pitcherRow[i];
        return pitcher;
      }, {}),
    );

export type Pitcher = Omit<
  PitcherRow,
  "W-L%" | "SO/W" | "Name-additional" | "ERA+"
> & {
  winPercentage: number;
  eraPlus: number;
  strikeoutsPerWin: number;
  brId: string;
  OUT: number;
};

export type PitcherWithPoints = Pitcher & WithPoints;

export const pitcherRowToPitcher = (pitcher: PitcherRow): Pitcher => ({
  ...omit(["W-L%", "SO/W", "Name-additional", "ERA+"], pitcher),
  winPercentage: pitcher["W-L%"],
  eraPlus: pitcher["ERA+"],
  strikeoutsPerWin: pitcher["SO/W"],
  brId: pitcher["Name-additional"],
  OUT: inningsPitchedToOuts(pitcher.IP),
});

const inningsPitchedToOuts = (inningsPitched: number): number => {
  const parsed = `${inningsPitched}`.split(".");
  return Number(parsed[0]) * 3 + Number(parsed[1]);
};
