import { FormData } from "@/pages/AllSteps";
import { Label } from "@radix-ui/react-label";
import { useFormContext } from "react-hook-form";
import { Input } from "./Input";
import { InputColorSelect } from "./steps/CarData/InputColorSelect";
import { carItemType } from "./types/carDataTypes";

type CarDataInputProps = {
  label: carItemType[0]['label'];
  id: carItemType[0]['id'];
  type: React.HTMLInputTypeAttribute | undefined;
  formatFn: (string: string) => string | number;
}

export function CarDataInput({

  label,
  id,
  type,
  formatFn,
}: CarDataInputProps) {

  const form = useFormContext<FormData>();

  return (

    <div className="space-y-2" >
      <Label htmlFor={id} >
        {label}
      </Label>
      {
        label === 'Cor'? (
          <InputColorSelect form={form} />
        )
        :
        <Input id={id} type={type} {...form.register(`carDataStep.${id}`, {
        onChange: (e: any) => {
          form.setValue(`carDataStep.${id}`, formatFn(e.target.value))
        }
      })} />
      }
      {form.formState.errors.carDataStep?.[id]?.message && (
        <small className="text-destructive" >
          {form.formState.errors.carDataStep[id]?.message}
        </small>
      )}
    </div>
  )
}

