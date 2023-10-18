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
import { Button } from "@/components/ui/button";
import { PointsConfig } from "@/models/PointsConfig";
import { pointsConfigToFormValues } from "@/lib/pointsConfigToFormValues";
import { usePointConfigStore } from "@/stores/usePointConfigStore";
import { formValuesToPointsConfig } from "@/lib/formValuesToPointsConfig";
import { MouseEvent } from "react";
import { useToast } from "@/components/ui/use-toast";

const batterFields: InputFieldConfig<BatterFields>[] = [
  {
    name: "batters_R",
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
    name: "batters_HR",
    label: "Home Runs (HR)",
  },
  {
    name: "batters_RBI",
    label: "Runs Batted In (RBI)",
  },
  {
    name: "batters_SB",
    label: "Stolen Bases (SB)",
  },
  {
    name: "batters_BB",
    label: "Walks (BB)",
  },
  {
    name: "batters_HBP",
    label: "Hit By Pitch (HBP)",
  },
];

const pitcherFields: InputFieldConfig<PitcherFields>[] = [
  {
    name: "pitchers_W",
    label: "Wins (W)",
  },
  {
    name: "pitchers_SV",
    label: "Saves (SV)",
  },
  {
    name: "pitchers_OUT",
    label: "Outs (OUT)",
  },
  {
    name: "pitchers_H",
    label: "Hits (H)",
  },
  {
    name: "pitchers_ER",
    label: "Earned Runs (ER)",
  },
  {
    name: "pitchers_BB",
    label: "Walks (BB)",
  },
  {
    name: "pitchers_HBP",
    label: "Hit Batters (HBP)",
  },
  {
    name: "pitchers_SO",
    label: "Strikeouts (K)",
  },
];

type Props = {
  initialConfig: PointsConfig;
};

export const PointsConfigForm = ({ initialConfig }: Props) => {
  const pointsConfig = usePointConfigStore((state) => state.pointsConfig);
  const setPointsConfig = usePointConfigStore((state) => state.setPointsConfig);
  const originalPointsConfig = pointsConfigToFormValues(initialConfig);

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<PointsConfigFormSchema>({
    resolver: zodResolver(pointsConfigFormSchema),
    mode: "onTouched",
    defaultValues: pointsConfigToFormValues(pointsConfig),
  });

  const onSubmit = (values: PointsConfigFormSchema) =>
    setPointsConfig(formValuesToPointsConfig(values));

  const onReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset(pointsConfigToFormValues(initialConfig));
    setPointsConfig(initialConfig);
  };

  const onShare = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const shareUrl = `${window.location.href}?${new URLSearchParams(
      pointsConfigToFormValues(formValuesToPointsConfig(watch())) as any,
    ).toString()}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast({
        title: "Copied!",
        description: "Shareable link copied to clipboard.",
        variant: "info",
      });
    });
  };

  return (
    <div className="bg-slate-100 p-4 rounded-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 py-2"
      >
        <div className="flex-grow grid grid-cols-5 gap-2">
          <h2 className="col-span-5 prose-lg">Adjust Batter Points</h2>
          {batterFields.map(({ name, label }) => (
            <PointConfigInput
              key={name}
              name={name}
              label={label}
              errors={errors}
              register={register}
              originalValues={originalPointsConfig}
              watch={watch}
            />
          ))}
        </div>
        <div className="flex-grow grid grid-cols-5 gap-2">
          <h2 className="col-span-5 prose-lg">Adjust Pitcher Points</h2>
          {pitcherFields.map(({ name, label }) => (
            <PointConfigInput
              key={name}
              name={name}
              label={label}
              errors={errors}
              register={register}
              originalValues={originalPointsConfig}
              watch={watch}
            />
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={onShare} variant="outline">
            Share
          </Button>
          <Button variant="destructive" type="reset" onClick={onReset}>
            Reset All
          </Button>
          <Button type="submit">Update Table</Button>
        </div>
      </form>
    </div>
  );
};
