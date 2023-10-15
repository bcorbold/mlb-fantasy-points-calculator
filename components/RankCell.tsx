import { CellContext } from "@tanstack/table-core";
import { BatterWithPoints } from "@/models/Batter";
import { PitcherWithPoints } from "@/models/Pitcher";
import { cn } from "@/lib/cn";

export const RankCell = ({
  row: {
    original: { rank, adjustedRank },
  },
}: CellContext<BatterWithPoints | PitcherWithPoints, unknown>) => (
  <div className="flex gap-2">
    <div className="rounded px-2 py-1 flex items-center justify-center">
      <p className="text-xs">{adjustedRank}</p>
    </div>
    {rank !== adjustedRank && (
      <div
        className={cn(
          "rounded px-2 py-1 flex items-center justify-center",
          adjustedRank < rank
            ? "text-green-600 bg-green-100"
            : "text-red-600 bg-red-100",
        )}
      >
        <p className="text-xs rounded">
          {adjustedRank < rank && "+"}
          {rank - adjustedRank}
        </p>
      </div>
    )}
  </div>
);
