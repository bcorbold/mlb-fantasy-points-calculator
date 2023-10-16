import { z } from "zod";

const nanToZero = (value: number) => (Number.isNaN(value) ? 0 : value);

export const stringyInputToInt = z.preprocess(
  (value) => nanToZero(parseInt(z.string().parse(value), 10)),
  z.number().int(),
);

export const stringyInputToNumber = z.preprocess(
  (value) => nanToZero(parseFloat(z.string().parse(value))),
  z.number(),
);

export const leaguesSchema = z.enum(["NL", "AL", "MLB"]);

export const teamsSchema = z.enum([
  "ARI",
  "ATL",
  "BAL",
  "BOS",
  "CHC",
  "CHW",
  "CIN",
  "CLE",
  "COL",
  "DET",
  "HOU",
  "KCR",
  "LAA",
  "LAD",
  "MIA",
  "MIL",
  "MIN",
  "NYM",
  "NYY",
  "OAK",
  "PHI",
  "PIT",
  "SDP",
  "SEA",
  "SFG",
  "STL",
  "TBR",
  "TEX",
  "TOR",
  "TOT",
  "WSN",
]);
