"use client";

import { BatterWithPoints } from "@/models/Batter";
import { PitcherWithPoints } from "@/models/Pitcher";
import { ColumnDef } from "@tanstack/table-core";
import { SortableHeaderCell } from "@/components/SortableHeaderCell";
import { DataTable } from "@/components/DataTable";
import { PlayerTypeChip } from "@/components/PlayerTypeChip";

type Props = {
  players: (BatterWithPoints | PitcherWithPoints)[];
};

const columns: ColumnDef<BatterWithPoints | PitcherWithPoints>[] = [
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
    accessorKey: "points",
    cell: ({ getValue }) => (
      <>
        {new Intl.NumberFormat("en-CA", { minimumFractionDigits: 2 }).format(
          getValue<number>(),
        )}
      </>
    ),
  },
];

export const LeagueTable = ({ players }: Props) => (
  <DataTable data={players} columns={columns} />
);
