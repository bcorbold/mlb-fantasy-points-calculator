"use client";

import { Batter, BatterWithPoints } from "@/models/Batter";
import { ColumnDef } from "@tanstack/table-core";
import { DataTable } from "@/components/DataTable";
import { SortableHeaderCell } from "@/components/SortableHeaderCell";

type Props = {
  batters: BatterWithPoints[];
};

const columns: ColumnDef<BatterWithPoints>[] = [
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
    header: (props) => <SortableHeaderCell {...props}>R</SortableHeaderCell>,
    accessorKey: "runs",
  },
  {
    header: (props) => <SortableHeaderCell {...props}>1B</SortableHeaderCell>,
    accessorKey: "singles",
  },
  {
    header: (props) => <SortableHeaderCell {...props}>2B</SortableHeaderCell>,
    accessorKey: "doubles",
  },
  {
    header: (props) => <SortableHeaderCell {...props}>3B</SortableHeaderCell>,
    accessorKey: "triples",
  },
  {
    header: (props) => <SortableHeaderCell {...props}>HR</SortableHeaderCell>,
    accessorKey: "homeRuns",
  },
  {
    header: (props) => <SortableHeaderCell {...props}>SB</SortableHeaderCell>,
    accessorKey: "stolenBases",
  },
  {
    header: (props) => <SortableHeaderCell {...props}>BB</SortableHeaderCell>,
    accessorKey: "walks",
  },
  {
    header: (props) => <SortableHeaderCell {...props}>HBP</SortableHeaderCell>,
    accessorKey: "hitByPitch",
  },
];

export const BatterTable = ({ batters }: Props) => (
  <DataTable data={batters} columns={columns} />
);
