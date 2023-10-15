import { PointsConfig } from "@/models/PointsConfig";
import {
  BatterFields,
  PitcherFields,
  PointsConfigFormSchema,
} from "@/models/PointsConfigFormSchema";

export const pointsConfigToFormValues = ({
  batters,
  pitchers,
}: PointsConfig): PointsConfigFormSchema =>
  ({
    ...Object.entries(batters).reduce<Record<BatterFields, number>>(
      (acc, [key, value]) => {
        // @ts-ignore
        acc[`batters_${key}`] = value;
        return acc;
      },
      {} as Record<BatterFields, number>,
    ),
    ...Object.entries(pitchers).reduce<Record<PitcherFields, number>>(
      (acc, [key, value]) => {
        // @ts-ignore
        acc[`pitchers_${key}`] = value;
        return acc;
      },
      {} as Record<PitcherFields, number>,
    ),
  }) as unknown as PointsConfigFormSchema;
