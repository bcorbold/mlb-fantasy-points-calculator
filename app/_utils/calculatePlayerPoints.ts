import { Batter, isBatter } from "@/app/_models/Batter";
import { Pitcher } from "@/app/_models/Pitcher";
import {
  BattersPointsConfig,
  PitchersPointsConfig,
  PointsConfig,
} from "@/app/_models/PointsConfig";

const roundDecimals = (value: number) =>
  Math.round((value + Number.EPSILON) * 100) / 100;

export const calculateBatterPoints = (
  batter: Batter,
  config: BattersPointsConfig,
): number =>
  roundDecimals(
    Object.entries(config).reduce(
      (acc, [stat, statValue]) =>
        acc + batter[stat as keyof BattersPointsConfig] * statValue,
      0,
    ),
  );

export const calculatePitcherPoints = (
  pitcher: Pitcher,
  config: PitchersPointsConfig,
): number =>
  roundDecimals(
    Object.entries(config).reduce(
      (acc, [stat, statValue]) =>
        acc + pitcher[stat as keyof PitchersPointsConfig] * statValue,
      0,
    ),
  );

export const calculatePlayerPoints = (
  player: Batter | Pitcher,
  config: PointsConfig,
): number =>
  isBatter(player)
    ? calculateBatterPoints(player, config.batters)
    : calculatePitcherPoints(player, config.pitchers);
