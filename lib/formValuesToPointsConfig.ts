import { PointsConfigFormSchema } from "@/models/PointsConfigFormSchema";
import {
  BattersPointsConfig,
  PitchersPointsConfig,
  PointsConfig,
} from "@/models/PointsConfig";

export const formValuesToPointsConfig = (
  values: PointsConfigFormSchema,
): PointsConfig => ({
  batters: Object.entries(values)
    .filter(([key]) => key.includes("batters_"))
    .reduce<BattersPointsConfig>((acc, [key, value]) => {
      const configKey: keyof BattersPointsConfig = key.replace(
        "batters_",
        "",
      ) as unknown as keyof BattersPointsConfig;
      acc[configKey] = value;
      return acc;
    }, {} as BattersPointsConfig),
  pitchers: Object.entries(values)
    .filter(([key]) => key.includes("pitchers_"))
    .reduce<PitchersPointsConfig>((acc, [key, value]) => {
      const configKey: keyof PitchersPointsConfig = key.replace(
        "pitchers_",
        "",
      ) as unknown as keyof PitchersPointsConfig;
      acc[configKey] = value;
      return acc;
    }, {} as PitchersPointsConfig),
});
