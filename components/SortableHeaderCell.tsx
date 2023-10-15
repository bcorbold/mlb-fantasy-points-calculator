import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { WithChildren } from "@/models/WithChildren";
import { HeaderContext } from "@tanstack/table-core";

export const SortableHeaderCell = ({
  children,
  column,
}: WithChildren & HeaderContext<any, any>) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {children}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
);
