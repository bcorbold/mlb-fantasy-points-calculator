"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BatterFields,
  InputFieldConfig,
  PitcherFields,
  pointsConfigFormSchema,
} from "@/models/PointsConfigFormSchema";
import { PointConfigInput } from "@/components/PointConfigInput";
import { PointsConfigFormSchema } from "@/models/PointsConfigFormSchema";

const batterFields: InputFieldConfig<BatterFields>[] = [
  {
    name: "batters_runs",
    label: "Runs (R)",
  },
  {
    name: "batters_singles",
    label: "Singles (1B)",
  },
  {
    name: "batters_doubles",
    label: "Doubles (2B)",
  },
  {
    name: "batters_triples",
    label: "Triples (3B)",
  },
  {
    name: "batters_homeRuns",
    label: "Home Runs (HR)",
  },
  {
    name: "batters_runsBattedIn",
    label: "Runs Batted In (RBI)",
  },
  {
    name: "batters_stolenBases",
    label: "Stolen Bases (SB)",
  },
  {
    name: "batters_walks",
    label: "Walks (BB)",
  },
  {
    name: "batters_hitByPitch",
    label: "Hit By Pitch (HBP)",
  },
];

const pitcherFields: InputFieldConfig<PitcherFields>[] = [
  {
    name: "pitchers_wins",
    label: "Wins (W)",
  },
  {
    name: "pitchers_saves",
    label: "Saves (SV)",
  },
  {
    name: "pitchers_outs",
    label: "Outs (OUT)",
  },
  {
    name: "pitchers_hits",
    label: "Hits (H)",
  },
  {
    name: "pitchers_earnedRuns",
    label: "Earned Runs (ER)",
  },
  {
    name: "pitchers_walks",
    label: "Walks (BB)",
  },
  {
    name: "pitchers_hitBatters",
    label: "Hit Batters (HBP)",
  },
  {
    name: "pitchers_strikeouts",
    label: "Strikeouts (K)",
  },
];

export const PointsConfigForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PointsConfigFormSchema>({
    resolver: zodResolver(pointsConfigFormSchema),
    mode: "onTouched",
  });

  return (
    <form
      onSubmit={handleSubmit((d) => console.log(d))}
      className="p-4 rounded-lg flex flex-col border"
    >
      <div className="flex-grow grid grid-cols-3 gap-2">
        <h2 className="col-span-3 prose-lg">Batters</h2>
        {batterFields.map(({ name, label }) => (
          <PointConfigInput
            key={name}
            name={name}
            label={label}
            errors={errors}
            register={register}
          />
        ))}
      </div>
      <div className="flex-grow grid grid-cols-4 gap-2">
        <h2 className="col-span-4 prose-lg">Pitchers</h2>
        {pitcherFields.map(({ name, label }) => (
          <PointConfigInput
            key={name}
            name={name}
            label={label}
            errors={errors}
            register={register}
          />
        ))}
      </div>
    </form>
  );
};
