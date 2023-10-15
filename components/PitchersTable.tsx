"use client";

import { Pitcher, PitcherWithPoints } from "@/models/Pitcher";
import { ColumnDef } from "@tanstack/table-core";
import { DataTable } from "@/components/DataTable";
import { SortableHeaderCell } from "@/components/SortableHeaderCell";

type Props = {
  pitchers: PitcherWithPoints[];
};

const columns: ColumnDef<PitcherWithPoints>[] = [
  {
    header: (props) => (
      <SortableHeaderCell {...props}>Player</SortableHeaderCell>
    ),
    accessorKey: "name",
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
  {
    header: (props) => <SortableHeaderCell {...props}>W</SortableHeaderCell>,
    accessorKey: "wins",
  },
  {
    header: (props) => <SortableHeaderCell {...props}>SV</SortableHeaderCell>,
    accessorKey: "saves",
  },
  {
    header: (props) => <SortableHeaderCell {...props}>OUT</SortableHeaderCell>,
    accessorKey: "outs",
  },
  {
    header: (props) => <SortableHeaderCell {...props}>H</SortableHeaderCell>,
    accessorKey: "hits",
  },
  {
    header: (props) => <SortableHeaderCell {...props}>ER</SortableHeaderCell>,
    accessorKey: "earnedRuns",
  },
  {
    header: (props) => <SortableHeaderCell {...props}>BB</SortableHeaderCell>,
    accessorKey: "walks",
  },
  {
    header: (props) => <SortableHeaderCell {...props}>HBP</SortableHeaderCell>,
    accessorKey: "hitBatters",
  },
  {
    header: (props) => <SortableHeaderCell {...props}>K</SortableHeaderCell>,
    accessorKey: "strikeouts",
  },
];

export const PitchersTable = ({ pitchers }: Props) => {
  return <DataTable data={pitchers} columns={columns} />;
};
