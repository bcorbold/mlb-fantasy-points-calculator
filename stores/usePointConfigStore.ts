import { create } from "zustand";
import { PointsConfig } from "@/models/PointsConfig";

type State = {
  loaded: boolean;
  pointsConfig: PointsConfig;
};

type Actions = {
  setPointsConfig: (pointsConfig: PointsConfig) => void;
};

export const usePointConfigStore = create<State & Actions>((set) => ({
  // Note: this will be set by InitializePointConfigStore
  pointsConfig: undefined as unknown as PointsConfig,
  loaded: false,
  setPointsConfig: (pointsConfig: PointsConfig) =>
    set({ pointsConfig, loaded: true }),
}));
