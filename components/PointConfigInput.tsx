import {
  PointsConfigFieldNames,
  PointsConfigFormSchema,
} from "@/models/PointsConfigFormSchema";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/cn";

type Props = {
  name: PointsConfigFieldNames;
  register: UseFormRegister<PointsConfigFormSchema>;
  errors: FieldErrors<PointsConfigFormSchema>;
  label: string;
};

export const PointConfigInput = ({ name, label, register, errors }: Props) => (
  <div className="flex flex-col">
    <div className="flex flex-col-reverse gap-[3px]">
      <Input
        {...register(name, { valueAsNumber: true, required: true })}
        type="number"
        step="0.1"
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
  </div>
);
