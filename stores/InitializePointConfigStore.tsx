"use client";

import { ReactNode, useEffect } from "react";
import { WithChildren } from "@/models/WithChildren";
import { useSearchParams } from "next/navigation";
import { PointsConfig } from "@/models/PointsConfig";
import { pointsConfigToFormValues } from "@/lib/pointsConfigToFormValues";
import {
  pointsConfigFormSchema,
  PointsConfigFormSchema,
} from "@/models/PointsConfigFormSchema";
import { usePointConfigStore } from "@/stores/usePointConfigStore";
import { formValuesToPointsConfig } from "@/lib/formValuesToPointsConfig";

type Props = {
  fallback: ReactNode;
  config: PointsConfig;
} & WithChildren;

export const InitializePointConfigStore = ({
  children,
  fallback,
  config,
}: Props) => {
  const currentParams = useSearchParams();
  const defaultValues = pointsConfigToFormValues(config);
  const setPointsConfig = usePointConfigStore((state) => state.setPointsConfig);
  const loaded = usePointConfigStore((state) => state.loaded);

  useEffect(() => {
    const rawFormState = Array.from(currentParams.entries()).reduce<
      Record<string, unknown>
    >((acc, [k, v]) => {
      const parsed = parseFloat(v);
      acc[k] = Number.isNaN(parsed)
        ? defaultValues[k as keyof PointsConfigFormSchema]
        : parsed;
      return acc;
    }, {});

    const result = pointsConfigFormSchema.safeParse(rawFormState);

    if (result.success) {
      setPointsConfig(formValuesToPointsConfig(result.data));
    } else {
      setPointsConfig(config);
    }
  }, []);

  return <>{loaded ? children : fallback}</>;
};
