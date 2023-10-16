import { z } from "zod";

export const pointsConfigFormSchema = z.object({
  batters_R: z.number().positive(),
  batters_singles: z.number().positive(),
  batters_doubles: z.number().positive(),
  batters_triples: z.number().positive(),
  batters_HR: z.number().positive(),
  batters_RBI: z.number().positive(),
  batters_SB: z.number().positive(),
  batters_BB: z.number().positive(),
  batters_HBP: z.number().positive(),

  pitchers_W: z.number().positive(),
  pitchers_SV: z.number().positive(),
  pitchers_OUT: z.number().positive(),
  pitchers_H: z.number().negative(),
  pitchers_ER: z.number().negative(),
  pitchers_BB: z.number().negative(),
  pitchers_HBP: z.number().negative(),
  pitchers_SO: z.number().positive(),
});

export type PointsConfigFormSchema = z.infer<typeof pointsConfigFormSchema>;

export type PointsConfigFieldNames = keyof PointsConfigFormSchema;

export type BatterFields = PointsConfigFieldNames & `batters_${string}`;

export type PitcherFields = PointsConfigFieldNames & `pitchers_${string}`;

export type InputFieldConfig<T extends PointsConfigFieldNames> = {
  name: T;
  label: string;
};
