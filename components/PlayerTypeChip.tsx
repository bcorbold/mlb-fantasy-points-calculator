import { Batter, isBatter } from "@/models/Batter";
import { Pitcher } from "@/models/Pitcher";

type Props = {
  player: Batter | Pitcher;
};

export const PlayerTypeChip = ({ player }: Props) =>
  isBatter(player) ? (
    <p className="prose-sm rounded-full bg-blue-100 border border-blue-600 text-blue-600 w-fit px-4">
      Batter
    </p>
  ) : (
    <p className="prose-sm rounded-full w-fit px-4 bg-green-100 border border-green-600 text-green-600">
      Pitcher
    </p>
  );
