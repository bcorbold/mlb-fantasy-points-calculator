import { CellContext } from "@tanstack/table-core";
import { BatterWithPoints } from "@/models/Batter";
import { PitcherWithPoints } from "@/models/Pitcher";
import { formatPoints } from "@/lib/formatPoints";
import { cn } from "@/lib/cn";

export const PointsCell = ({
  row: {
    original: { adjustedPoints, points },
  },
}: CellContext<BatterWithPoints | PitcherWithPoints, unknown>) => {
  const pointsDiff = adjustedPoints - points;

  return (
    <div className="flex gap-2">
      <div className="rounded px-2 py-1 flex items-center justify-center">
        <p>{formatPoints(adjustedPoints)}</p>
      </div>
      {pointsDiff !== 0 && (
        <div
          className={cn(
            "rounded px-2 py-1 flex items-center justify-center",
            pointsDiff > 0
              ? "text-green-600 bg-green-100"
              : "text-red-600 bg-red-100",
          )}
        >
          <p>
            {pointsDiff > 0 && "+"}
            {formatPoints(adjustedPoints - points)}
          </p>
        </div>
      )}
    </div>
  );
};
