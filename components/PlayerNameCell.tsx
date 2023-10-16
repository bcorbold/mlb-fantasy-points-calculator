import { CellContext } from "@tanstack/table-core";
import { BatterWithPoints, isBatter } from "@/models/Batter";
import { PitcherWithPoints } from "@/models/Pitcher";
import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import { BatterCardContent } from "@/components/BatterCardContent";
import { PitcherCardContent } from "@/components/PitcherCardContent";

export const PlayerNameCell = ({
  row: { original: player },
}: CellContext<BatterWithPoints | PitcherWithPoints, unknown>) => {
  const { Name, brId } = player;
  const batter = isBatter(player);
  return (
    <div className="flex gap-2 items-center justify-start">
      <HoverCard>
        <HoverCardTrigger>
          <BarChart3 className="w-6 h-6 hover:bg-slate-200 transition-colors rounded p-1" />
          {batter ? (
            <BatterCardContent player={player} />
          ) : (
            <PitcherCardContent player={player} />
          )}
        </HoverCardTrigger>
      </HoverCard>
      <Link
        className="text-blue-600 underline visited:text-purple-900"
        href={`https://www.baseball-reference.com/players/${
          batter ? "a" : "d"
        }/${brId}.shtml`}
        target="_blank"
      >
        {Name}
      </Link>
    </div>
  );
};
