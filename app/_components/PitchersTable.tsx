"use client";

import { Pitcher } from "@/app/_models/Pitcher";
import { ColumnDef, getCoreRowModel } from "@tanstack/table-core";
import { flexRender, useReactTable } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  pitchers: Pitcher[];
};

// todo: https://ui.shadcn.com/docs/components/data-table#sorting
const columns: ColumnDef<Pitcher>[] = [
  {
    header: "Player",
    accessorKey: "name",
  },
  {
    header: "Wins (W)",
    accessorKey: "wins",
  },
  {
    header: "Saves (SV)",
    accessorKey: "saves",
  },
  {
    header: "Outs (OUT)",
    accessorKey: "outs",
  },
  {
    header: "Hits (H)",
    accessorKey: "hits",
  },
  {
    header: "Earned Runs (ER)",
    accessorKey: "earnedRuns",
  },
  {
    header: "Walks (BB)",
    accessorKey: "walks",
  },
  {
    header: "Hit Batters (HBP)",
    accessorKey: "hitByPitch",
  },
  {
    header: "Strikeouts (K)",
    accessorKey: "strikeOuts",
  },
];

export const PitchersTable = ({ pitchers }: Props) => {
  const table = useReactTable({
    data: pitchers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
