import { Batter, isBatter } from "@/models/Batter";
import { Pitcher } from "@/models/Pitcher";

type Props = {
  player: Batter | Pitcher;
};

export const PlayerTypeChip = ({ player }: Props) =>
  isBatter(player) ? (
    <p className="text-sm rounded bg-blue-100 text-blue-600 w-fit px-4 py-1">
      Batter
    </p>
  ) : (
    <p className="text-sm rounded w-fit px-4 bg-purple-100 text-purple-600 py-1">
      Pitcher
    </p>
  );
