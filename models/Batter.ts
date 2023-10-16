import { z } from "zod";
import { omit } from "ramda";
import { WithPoints } from "@/models/WithPoints";
import {
  leaguesSchema,
  stringyInputToInt,
  stringyInputToNumber,
  teamsSchema,
} from "@/models/Schemas";
import { BattersPointsConfig } from "@/models/PointsConfig";

const batterRowSchema = z.object({
  Rk: stringyInputToInt,
  Name: z.string(),
  Age: stringyInputToInt,
  Tm: teamsSchema,
  Lg: leaguesSchema,
  G: stringyInputToInt,
  PA: stringyInputToInt,
  AB: stringyInputToInt,
  R: stringyInputToInt,
  H: stringyInputToInt,
  "2B": stringyInputToInt,
  "3B": stringyInputToInt,
  HR: stringyInputToInt,
  RBI: stringyInputToInt,
  SB: stringyInputToInt,
  CS: stringyInputToInt,
  BB: stringyInputToInt,
  SO: stringyInputToInt,
  BA: stringyInputToNumber,
  OBP: stringyInputToNumber,
  SLG: stringyInputToNumber,
  OPS: stringyInputToNumber,
  "OPS+": stringyInputToInt,
  TB: stringyInputToInt,
  GDP: stringyInputToInt,
  HBP: stringyInputToInt,
  SH: stringyInputToInt,
  SF: stringyInputToInt,
  IBB: stringyInputToInt,
  "Pos Summary": z.string(),
  "Name-additional": z.string(),
});

type BatterRow = z.infer<typeof batterRowSchema>;

export const toBatterRow =
  (headerRow: string[]) =>
  (batterRow: string[]): BatterRow =>
    batterRowSchema.parse(
      headerRow.reduce<Record<string, unknown>>((batter, key, i) => {
        batter[key] = batterRow[i];
        return batter;
      }, {}),
    );

export type Batter = Omit<
  BatterRow,
  "Rk" | "Pos Summary" | "Name-additional" | "2B" | "3B" | "OPS+"
> & {
  singles: number;
  doubles: number;
  triples: number;
  opsPlus: number;
  position: string;
  brId: string;
};

export type BatterWithPoints = Batter & WithPoints;

export const batterRowToBatter = (batter: BatterRow): Batter => ({
  ...omit(["Rk", "Pos Summary", "Name-additional", "2B", "3B", "OPS+"], batter),
  position: batter["Pos Summary"],
  brId: batter["Name-additional"],
  singles: batter.H - batter["2B"] - batter["3B"] - batter.HR,
  doubles: batter["2B"],
  triples: batter["3B"],
  opsPlus: batter["OPS+"],
});

export const isBatter = (player: unknown): player is Batter =>
  !!player && typeof player === "object" && "Name" in player && "OPS" in player;
