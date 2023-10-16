import { create } from "zustand";
import { PointsConfig } from "@/models/PointsConfig";

type State = {
  pointsConfig?: PointsConfig;
};

type Actions = {
  setPointsConfig: (pointsConfig: PointsConfig) => void;
};

export const usePointConfigStore = create<State & Actions>((set) => ({
  pointsConfig: undefined,
  setPointsConfig: (pointsConfig: PointsConfig) => set({ pointsConfig }),
}));
