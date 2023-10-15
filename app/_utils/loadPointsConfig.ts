import { PointsConfig, pointsConfigSchema } from "@/app/_models/PointsConfig";
import { readFileSync } from "fs";

export const loadPointsConfig = (year: string): PointsConfig => {
  const data = readFileSync(
    `./app/_resources/${year}/points-config.json`,
    "utf-8",
  );
  return pointsConfigSchema.parse(JSON.parse(data));
};
