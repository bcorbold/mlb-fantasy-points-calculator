import { z } from "zod";

export const pointsConfigFormSchema = z.object({
  batters_runs: z.number().positive(),
  batters_singles: z.number().positive(),
  batters_doubles: z.number().positive(),
  batters_triples: z.number().positive(),
  batters_homeRuns: z.number().positive(),
  batters_runsBattedIn: z.number().positive(),
  batters_stolenBases: z.number().positive(),
  batters_walks: z.number().positive(),
  batters_hitByPitch: z.number().positive(),

  pitchers_wins: z.number().positive(),
  pitchers_saves: z.number().positive(),
  pitchers_outs: z.number().positive(),
  pitchers_hits: z.number().negative(),
  pitchers_earnedRuns: z.number().negative(),
  pitchers_walks: z.number().negative(),
  pitchers_hitBatters: z.number().negative(),
  pitchers_strikeouts: z.number().positive(),
});

export type PointsConfigFormSchema = z.infer<typeof pointsConfigFormSchema>;

export type PointsConfigFieldNames = keyof PointsConfigFormSchema;

export type BatterFields = PointsConfigFieldNames & `batters_${string}`;

export type PitcherFields = PointsConfigFieldNames & `pitchers_${string}`;

export type InputFieldConfig<T extends PointsConfigFieldNames> = {
  name: T;
  label: string;
};
