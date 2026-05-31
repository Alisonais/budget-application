import { FormData } from "@/pages/AllSteps";
import { formatName } from "@/utils/formatName";
import { Label } from "@radix-ui/react-label";
import { useFormContext } from "react-hook-form";
import { Input } from "./Input";
import { carItemType } from "./types/carDataTypes";

type CarDataInputProps = {
  label: carItemType[0]['label'];
  id: carItemType[0]['id'];
  type?: React.HTMLInputTypeAttribute | undefined
}

export function CarDataInput({
  label,
  id,
}: CarDataInputProps) {

  const form = useFormContext<FormData>();

  return (
    <>
      {label === 'Ano' ? (
        <div className="space-y-2" >
          <Label htmlFor="year" >
            Ano
          </Label>
          <Input id="year" type="number" {...form.register('carDataStep.year',
            { setValueAs: value => value > 0 ? Number(value) : null }
          )}
          />
          {form.formState.errors.carDataStep?.year?.message && (
            <small className="text-destructive" >
              {form.formState.errors.carDataStep.year.message}
            </small>
          )}
        </div>
      )
        : (
          <div className="space-y-2" >
            <Label htmlFor={id} >
              {label}
            </Label>
            <Input id={id} {...form.register(`carDataStep.${id}`, {
              onChange: ((value => (
                value.target.value = formatName(value.target.value)
              )))
            })} />
            {form.formState.errors.carDataStep?.[id]?.message && (
              <small className="text-destructive" >
                {form.formState.errors.carDataStep[id]?.message}
              </small>
            )}
          </div>
        )}

    </>
  )
}

