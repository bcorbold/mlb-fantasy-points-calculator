import { z } from "zod";

export const battersPointsSchema = z.object({
  R: z.number().gt(0),
  singles: z.number().gt(0),
  doubles: z.number().gt(0),
  triples: z.number().gt(0),
  HR: z.number().gt(0),
  RBI: z.number().gt(0),
  SB: z.number().gt(0),
  BB: z.number().gt(0),
  HBP: z.number().gt(0),
});

export type BattersPointsConfig = z.infer<typeof battersPointsSchema>;

export const pitchersPointsSchema = z.object({
  W: z.number().gt(0),
  SV: z.number().gt(0),
  OUT: z.number().gt(0),
  H: z.number().lt(0),
  ER: z.number().lt(0),
  BB: z.number().lt(0),
  HBP: z.number().lt(0),
  SO: z.number().gt(0),
});

export type PitchersPointsConfig = z.infer<typeof pitchersPointsSchema>;

export const pointsConfigSchema = z.object({
  batters: battersPointsSchema,
  pitchers: pitchersPointsSchema,
});

export type PointsConfig = z.infer<typeof pointsConfigSchema>;
