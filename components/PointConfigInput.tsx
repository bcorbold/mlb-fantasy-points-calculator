import {
  PointsConfigFieldNames,
  PointsConfigFormSchema,
} from "@/models/PointsConfigFormSchema";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/cn";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatPoints } from "@/lib/formatPoints";

type Props = {
  name: PointsConfigFieldNames;
  register: UseFormRegister<PointsConfigFormSchema>;
  errors: FieldErrors<PointsConfigFormSchema>;
  label: string;
  originalValues: PointsConfigFormSchema;
  watch: UseFormWatch<PointsConfigFormSchema>;
};

export const PointConfigInput = ({
  name,
  label,
  register,
  errors,
  originalValues,
  watch,
}: Props) => {
  const pointsDif = watch(name) - originalValues[name];
  return (
    <div className="flex w-full px-2 gap-1">
      <div className="flex flex-col-reverse w-full gap-[3px]">
        <Input
          {...register(name, { valueAsNumber: true, required: true })}
          type="number"
          step="0.1"
          className="rounded-r-none"
        />
        <Label
          htmlFor={name}
          className={cn(
            "text-xs pl-2",
            !!errors[name]?.message && "text-red-600",
          )}
        >
          {label}
          {errors[name]?.message && (
            <span> - {errors[name]?.message as string}</span>
          )}
        </Label>
      </div>
      <div className="flex pt-[19px] gap-1">
        <TooltipProvider>
          <div className="border border-input px-2 flex items-center bg-input/30">
            <Tooltip>
              <TooltipTrigger>
                <p className="text-sm">{originalValues[name]}</p>
              </TooltipTrigger>
              <TooltipContent>Original config value</TooltipContent>
            </Tooltip>
          </div>
          <div
            className={cn(
              "border border-input rounded-r-md px-2 flex items-center bg-input/30",
              pointsDif > 0 && "bg-green-200 border-green-600 text-green-600",
              pointsDif < 0 && "bg-red-200 border-red-600 text-red-600",
            )}
          >
            <p className="text-sm">
              {pointsDif > 0 && "+"}
              {pointsDif === 0 ? "-" : formatPoints(pointsDif)}
            </p>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};
