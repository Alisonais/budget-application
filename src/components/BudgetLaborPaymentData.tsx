import { FormData } from "@/pages/AllSteps";
import { Controller, UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { RadioAddItem, RadioButtonIcon, RadioGroup, RadioGroupContainer, RadioGroupItem, RadioGroupLabelNumber, RadioGroupLabelString } from "./RadioGroup";
import { type } from "./types/budgetTypes";

type budgetLaborPaymentDataParams = {
  budgetItem: UseFieldArrayReturn<FormData>;
  form: UseFormReturn<FormData>;
  title: string;
}

export function BudgetLaborPaymentData({ budgetItem, form, title }: budgetLaborPaymentDataParams) {



  return (
    <>
      <h2 className="text-xl font-semibold tracking-tighter" >{title}</h2>

      <div className="pb-2" >

        {
          budgetItem?.fields.map((item, index: number) => (

            <div
              className="pt-4"
              key={item.id || index}
            >
              <Controller
                control={form.control}
                name={`paymentDataStep.laborpayment.${index}.type`}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value ?? type.CREDIT}
                    onChangeValue={value => {
                      field.onChange(value);
                      form.trigger(`paymentDataStep.laborpayment`)
                    }}
                  >
                    <RadioGroupContainer
                      label="Tipo do pagamento"
                    >
                      <RadioGroupItem value={type.PIX}>
                        Pix
                      </RadioGroupItem>
                      <RadioGroupItem value={type.CREDIT}>
                        Crédito
                      </RadioGroupItem>
                      <RadioGroupItem value={type.CASH}>
                        Dinheiro
                      </RadioGroupItem>
                    </RadioGroupContainer>
                  </RadioGroup>
                )}
              />

              <Controller
                control={form.control}
                name={`paymentDataStep.laborpayment.${index}.createdAt`}
                render={({ field }) => (
                  <RadioGroupLabelString
                    label="Data do pagamento"
                    type="date"
                    value={field.value}
                    setValue={value => {
                      field.onChange(value);
                      form.trigger(`paymentDataStep.laborpayment.${index}.createdAt`);
                    }}
                  />
                )}
              />

              <div className="flex gap-4 items-end">
                <Controller
                  control={form.control}
                  name={`paymentDataStep.laborpayment.${index}.value`}
                  render={({ field }) => (
                    <RadioGroupLabelNumber
                      label="Valor do pagamento"
                      type="number"
                      value={field.value ?? undefined}
                      setValue={value => {
                        field.onChange(Number(value));
                        form.trigger(`paymentDataStep.laborpayment.${index}.value`);
                      }}
                    />
                  )}
                />


                <RadioButtonIcon
                  variant="destructive"
                  item={budgetItem}
                  index={index}
                />
              </div>

            </div>
          ))
        }

      </div>

      <RadioAddItem
        label='Adicionar novo pagamento'
        item={budgetItem}
        form={form}
      />
    </>
  )
}

