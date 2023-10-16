import { BatterWithPoints } from "@/models/Batter";
import { HoverCardContent } from "@/components/ui/hover-card";

type Props = {
  player: BatterWithPoints;
};

type StatConfig = {
  key: keyof BatterWithPoints;
  label?: string; // defaults to key
};

const stats: StatConfig[] = [
  { key: "AB" },
  { key: "H" },
  { key: "singles", label: "1B" },
  { key: "doubles", label: "2B" },
  { key: "triples", label: "3B" },
  { key: "HR" },
  { key: "BA" },
  { key: "R" },
  { key: "RBI" },
  { key: "SB" },
  { key: "OBP" },
  { key: "SLG" },
  { key: "OPS" },
  { key: "opsPlus", label: "OPS+" },
];

export const BatterCardContent = ({ player }: Props) => {
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
