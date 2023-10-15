import { PointsConfig } from "@/models/PointsConfig";

type Props = {
  config: PointsConfig;
};

export const PointsConfigSummary = ({
  config: { batters, pitchers },
}: Props) => {
  return (
    <div className="flex gap-2 justify-between w-full">
      <div className="flex-grow">
        <h2 className="prose-xl">Batters Points</h2>
        <p className="prose-base">
          Runs (R) <code>{batters.runs}</code>
        </p>
        <p className="prose-base">
          Singles (1B) <code>{batters.singles}</code>
        </p>
        <p className="prose-base">
          Doubles (2B) <code>{batters.doubles}</code>
        </p>
        <p className="prose-base">
          Triples (3B) <code>{batters.triples}</code>
        </p>
        <p className="prose-base">
          Home Runs (HR) <code>{batters.homeRuns}</code>
        </p>
        <p className="prose-base">
          Runs Batted In (RBI) <code>{batters.runsBattedIn}</code>
        </p>
        <p className="prose-base">
          Stolen Bases (SB) <code>{batters.stolenBases}</code>
        </p>
        <p className="prose-base">
          Walks (BB) <code>{batters.walks}</code>
        </p>
        <p className="prose-base">
          Hit By Pitch (HBP) <code>{batters.hitByPitch}</code>
        </p>
      </div>
      <div className="flex-grow">
        <h2 className="prose-lg">Pitchers Points</h2>
        <p className="prose-base">
          Wins (W) <code>{pitchers.wins}</code>
        </p>
        <p className="prose-base">
          Saves (SV) <code>{pitchers.saves}</code>
        </p>
        <p className="prose-base">
          Outs (OUT) <code>{pitchers.outs}</code>
        </p>
        <p className="prose-base">
          Hits (H) <code>{pitchers.hits}</code>
        </p>
        <p className="prose-base">
          Earned Runs (ER) <code>{pitchers.earnedRuns}</code>
        </p>
        <p className="prose-base">
          Walks (W) <code>{pitchers.walks}</code>
        </p>
        <p className="prose-base">
          Hit Batters (HBP) <code>{pitchers.hitBatters}</code>
        </p>
        <p className="prose-base">
          Strikeouts (K) <code>{pitchers.strikeouts}</code>
        </p>
      </div>
    </div>
  );
};
