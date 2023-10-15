"use client";

import { Pitcher } from "@/app/_models/Pitcher";
import { ColumnDef } from "@tanstack/table-core";
import { DataTable } from "@/app/_components/DataTable";
import { SortableHeaderCell } from "@/app/_components/SortableHeaderCell";

type Props = {
  pitchers: Pitcher[];
};

const columns: ColumnDef<Pitcher>[] = [
  {
    header: (props) => (
      <SortableHeaderCell {...props}>Player</SortableHeaderCell>
    ),
    accessorKey: "name",
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
