"use client";

import { Batter } from "@/app/_models/Batter";
import { ColumnDef, getCoreRowModel } from "@tanstack/table-core";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender, useReactTable } from "@tanstack/react-table";

type Props = {
  batters: Batter[];
};

// todo: https://ui.shadcn.com/docs/components/data-table#sorting
const columns: ColumnDef<Batter>[] = [
  {
    header: "Player",
    accessorKey: "name",
  },
  {
    header: "Runs (R)",
    accessorKey: "runs",
  },
  {
    header: "Singles (1B)",
    accessorKey: "singles",
  },
  {
    header: "Doubles (2B)",
    accessorKey: "doubles",
  },
  {
    header: "Triples (3B)",
    accessorKey: "triples",
  },
  {
    header: "Home Runes (HR)",
    accessorKey: "homeRuns",
  },
  {
    header: "Stole Bases (SB)",
    accessorKey: "stolenBases",
  },
  {
    header: "Walks (BB)",
    accessorKey: "walks",
  },
  {
    header: "Hit By Pitch (HBP)",
    accessorKey: "hitByPitch",
  },
];

export const BatterTable = ({ batters }: Props) => {
  const table = useReactTable({
    data: batters,
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
