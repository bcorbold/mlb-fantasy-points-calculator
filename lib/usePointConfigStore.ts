import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PointsConfig } from "@/models/PointsConfig";

type State = {
  pointsConfig?: PointsConfig;
};

type Actions = {
  setPointsConfig: (pointsConfig: PointsConfig) => void;
};

export const usePointConfigStore = create<State & Actions>()(
  persist(
    (set) => ({
      pointsConfig: undefined,
      setPointsConfig: (pointsConfig: PointsConfig) => set({ pointsConfig }),
    }),
    {
      name: "point-config-store",
    },
  ),
);
