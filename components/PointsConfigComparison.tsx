import {
  BattersPointsConfig,
  PitchersPointsConfig,
  PointsConfig,
} from "@/models/PointsConfig";

type Props = {
  beforeConfig: PointsConfig;
  afterConfig: PointsConfig;
};

type StatConfig<T extends BattersPointsConfig | PitchersPointsConfig> = {
  key: keyof T;
  label?: string;
};

const batterStats: StatConfig<BattersPointsConfig>[] = [
  { key: "R" },
  { key: "singles", label: "1B" },
  { key: "doubles", label: "2B" },
  { key: "triples", label: "3B" },
  { key: "HR" },
  { key: "RBI" },
  { key: "SB" },
  { key: "BB" },
  { key: "HBP" },
];

const pitcherStats: StatConfig<PitchersPointsConfig>[] = [
  { key: "W" },
  { key: "SV" },
  { key: "OUT" },
  { key: "H" },
  { key: "ER" },
  { key: "BB" },
  { key: "HBP" },
  { key: "SO" },
];

export const PointsConfigComparison = ({
  beforeConfig,
  afterConfig,
}: Props) => {
  return (
    <>
      <h3>Batters Comparison</h3>
      <div className="text-sm">
        {batterStats.map(({ key, label }) => (
          <div key={key}>
            <p>{label ?? key}</p>
          </div>
        ))}
      </div>
      <h3>Pitchers Comparison</h3>
      <div className="text-sm">
        {pitcherStats.map(({ key, label }) => (
          <div key={key}>
            <p>{label ?? key}</p>
          </div>
        ))}
      </div>
    </>
  );
};
