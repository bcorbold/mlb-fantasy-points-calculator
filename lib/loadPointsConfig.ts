import { PointsConfig, pointsConfigSchema } from "@/models/PointsConfig";
import { readFileSync } from "fs";
import path from "path";

export const loadPointsConfig = (year: string): PointsConfig => {
  const data = readFileSync(
    path.resolve(`./public/resources/${year}/points-config.json`),
    "utf-8",
  );
  return pointsConfigSchema.parse(JSON.parse(data));
};
