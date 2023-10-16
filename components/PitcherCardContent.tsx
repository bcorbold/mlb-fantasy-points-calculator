import { PitcherWithPoints } from "@/models/Pitcher";
import { HoverCardContent } from "@/components/ui/hover-card";

type Props = {
  player: PitcherWithPoints;
};

type StatConfig = {
  key: keyof PitcherWithPoints;
  label?: string; // defaults to key
};

const stats: StatConfig[] = [
  { key: "W" },
  { key: "L" },
  { key: "ERA" },
  { key: "eraPlus", label: "ERA+" },
  { key: "G" },
  { key: "SV" },
  { key: "IP" },
  { key: "SO" },
  { key: "WHIP" },
  { key: "FIP" },
  { key: "H" },
  { key: "BB" },
  { key: "HBP" },
];

export const PitcherCardContent = ({ player }: Props) => {
  return (
    <HoverCardContent className="w-[800px]">
      <h2 className="prose-lg">{player.Name}</h2>
      <div className="grid grid-cols-6 gap-2">
        {stats.map(({ key, label }) => (
          <div key={key}>
            <p className="font-bold">{label ?? key}</p>
            <p className="text-sm">{player[key]}</p>
          </div>
        ))}
      </div>
    </HoverCardContent>
  );
};
