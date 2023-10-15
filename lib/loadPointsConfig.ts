import { PointsConfig, pointsConfigSchema } from "@/models/PointsConfig";
import { readFileSync } from "fs";

export const loadPointsConfig = (year: string): PointsConfig => {
  const data = readFileSync(`./resources/${year}/points-config.json`, "utf-8");
  return pointsConfigSchema.parse(JSON.parse(data));
};
