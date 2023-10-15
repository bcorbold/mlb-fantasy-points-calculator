"use client";

import { Batter, BatterWithPoints } from "@/models/Batter";
import { Pitcher, PitcherWithPoints } from "@/models/Pitcher";
import { ColumnDef } from "@tanstack/table-core";
import { SortableHeaderCell } from "@/components/SortableHeaderCell";
import { DataTable } from "@/components/DataTable";
import { PlayerTypeChip } from "@/components/PlayerTypeChip";
import { PointsCell } from "@/components/PointsCell";
import { PointsConfig } from "@/models/PointsConfig";
import {
  calculateBatterPoints,
  calculatePitcherPoints,
  calculatePlayerPoints,
} from "@/lib/calculatePlayerPoints";
import { usePointConfigStore } from "@/lib/usePointConfigStore";
import { useMemo } from "react";
import { formatPoints } from "@/lib/formatPoints";
import { RankCell } from "@/components/RankCell";

type Props = {
  batters: Batter[];
  pitchers: Pitcher[];
  config: PointsConfig;
};

const columns: ColumnDef<BatterWithPoints | PitcherWithPoints>[] = [
  {
    header: (props) => <SortableHeaderCell {...props}>Rank</SortableHeaderCell>,
    accessorKey: "adjustedRank",
    cell: RankCell,
  },
  {
    header: (props) => (
      <SortableHeaderCell {...props}>Player</SortableHeaderCell>
    ),
    accessorKey: "name",
  },
  {
    header: "Player Type",
    cell: ({
      cell: {
        row: { original },
      },
    }) => <PlayerTypeChip player={original} />,
  },
  {
    header: (props) => (
      <SortableHeaderCell {...props}>Points</SortableHeaderCell>
    ),
    accessorKey: "adjustedPoints",
    cell: PointsCell,
  },
];

type FormatDataOptions = Props & { adjustedConfig?: PointsConfig };
const formatData = ({
  batters,
  pitchers,
  config,
  adjustedConfig,
}: FormatDataOptions): (BatterWithPoints | PitcherWithPoints)[] =>
  [...batters, ...pitchers]
    .map((player) => {
      const points = calculatePlayerPoints(player, config);
      return {
        ...player,
        points,
        adjustedPoints: adjustedConfig
          ? calculatePlayerPoints(player, adjustedConfig)
          : points,
      };
    })
    .sort((a, b) => (a.points > b.points ? -1 : 1))
    .map((player, rank) => ({
      ...player,
      rank: rank + 1,
    }))
    .sort((a, b) => (a.adjustedPoints > b.adjustedPoints ? -1 : 1))
    .map((player, rank) => ({
      ...player,
      adjustedRank: rank + 1,
    }));

export const LeagueTable = (props: Props) => {
  const adjustedConfig = usePointConfigStore((state) => state.pointsConfig);
  const data = useMemo(
    () =>
      formatData({
        ...props,
        adjustedConfig,
      }),
    [adjustedConfig, props],
  );

  return <DataTable data={data} columns={columns} />;
};
