import { FormData } from "@/pages/AllSteps";
import { formatName } from "@/utils/formatName";
import { formatPhoneNumber } from "@/utils/formatNumberPhone";
import { safelocalStorageGetItem } from "@/utils/utils";
import { Label } from "@radix-ui/react-label";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "./Input";
import { InputSelect } from "./InputSelect";
import { listBudgetItem } from "./types/budgetTypes";
import { personalItemType } from "./types/personalDataTypes";

type PersonalDataInputProps = {
  label: personalItemType[0]['label'];
  id: personalItemType[0]['id'];
  type?: React.HTMLInputTypeAttribute | undefined
}

export function PersonalDataInput({
  label,
  id,
}: PersonalDataInputProps) {

  const itemsData: listBudgetItem[] = useMemo(()=>{
    return safelocalStorageGetItem('budgets') || []
  },[]);

  const form = useFormContext<FormData>();

  return (

    <>
      {
        label === 'Telefone' && (
          <div className="space-y-2" >
            <Label htmlFor={id} >
              {label}
            </Label>
            <Input id={id} {...form.register(`personalDataStep.${id}`, {
              onChange: ((value => (
                value.target.value = formatPhoneNumber(value.target.value)
              )))
            })} />
            {form.formState.errors.personalDataStep?.[id]?.message && (
              <small className="text-destructive" >
                {form.formState.errors.personalDataStep[id]?.message}
              </small>
            )}
          </div>
        )
      }

      {
        (label !== 'Telefone' && label === 'Nome') && (
          <div className="space-y-2" >
            <Label htmlFor={id} >
              {label}
            </Label>
            <InputSelect items={itemsData} form={form}/>
            {form.formState.errors.personalDataStep?.[id]?.message && (
              <small className="text-destructive" >
                {form.formState.errors.personalDataStep[id]?.message}
              </small>
            )}
          </div>
        )
      }

      {
        (label !== 'Telefone' && label !== 'Nome') && (
          <div className="space-y-2" >
            <Label htmlFor={id} >
              {label}
            </Label>
            <Input id={id} {...form.register(`personalDataStep.${id}`, {
              onChange: ((value => (
                value.target.value = formatName(value.target.value)
              )))
            })} />
            {form.formState.errors.personalDataStep?.[id]?.message && (
              <small className="text-destructive" >
                {form.formState.errors.personalDataStep[id]?.message}
              </small>
            )}
          </div>
        )
      }
    </>

  )
}

