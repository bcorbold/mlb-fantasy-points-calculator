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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PointsConfig } from "@/models/PointsConfig";
import { pointsConfigToFormValues } from "@/lib/pointsConfigToFormValues";
import { usePointConfigStore } from "@/lib/usePointConfigStore";
import { formValuesToPointsConfig } from "@/lib/formValuesToPointsConfig";
import { MouseEvent } from "react";

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

type Props = {
  initialConfig: PointsConfig;
};

export const PointsConfigForm = ({ initialConfig }: Props) => {
  const pointsConfig = usePointConfigStore((state) => state.pointsConfig);
  const setPointsConfig = usePointConfigStore((state) => state.setPointsConfig);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PointsConfigFormSchema>({
    resolver: zodResolver(pointsConfigFormSchema),
    mode: "onTouched",
    defaultValues: pointsConfigToFormValues(pointsConfig ?? initialConfig),
  });

  const onSubmit = (values: PointsConfigFormSchema) =>
    setPointsConfig(formValuesToPointsConfig(values));

  const onReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset(pointsConfigToFormValues(initialConfig));
    setPointsConfig(initialConfig);
  };

  return (
    <Collapsible className="p-4 rounded-lg border" defaultOpen>
      <CollapsibleTrigger className="prose-lg">
        Adjust Points
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-4">
          <Separator />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" flex flex-col gap-4 px-1"
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
            <div className="flex justify-end gap-2">
              <Button variant="destructive" type="reset" onClick={onReset}>
                Reset All
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
