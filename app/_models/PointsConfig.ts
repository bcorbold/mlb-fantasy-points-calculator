import { z } from "zod";

export const battersPointsSchema = z.object({
  runs: z.number().gt(0),
  singles: z.number().gt(0),
  doubles: z.number().gt(0),
  triples: z.number().gt(0),
  homeRuns: z.number().gt(0),
  runsBattedIn: z.number().gt(0),
  stolenBases: z.number().gt(0),
  walks: z.number().gt(0),
  hitByPitch: z.number().gt(0),
});

export type BattersPointsConfig = z.infer<typeof battersPointsSchema>;

export const pitchersPointsSchema = z.object({
  wins: z.number().gt(0),
  saves: z.number().gt(0),
  outs: z.number().gt(0),
  hits: z.number().lt(0),
  earnedRuns: z.number().lt(0),
  walks: z.number().lt(0),
  hitBatters: z.number().lt(0),
  strikeouts: z.number().gt(0),
});

export type PitchersPointsConfig = z.infer<typeof pitchersPointsSchema>;

export const pointsConfigSchema = z.object({
  batters: battersPointsSchema,
  pitchers: pitchersPointsSchema,
});

export type PointsConfig = z.infer<typeof pointsConfigSchema>;
