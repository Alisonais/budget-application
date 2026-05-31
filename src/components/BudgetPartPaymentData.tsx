import { FormData } from "@/pages/AllSteps";
import { Controller, UseFormReturn } from "react-hook-form";
import { CompositionTextArea } from "./RadioGroup";

type BudgetPartPaymentDataParams = {
  form: UseFormReturn<FormData>;
  title: string;
}



export function BudgetPartPaymentData({ form, title }: BudgetPartPaymentDataParams) {

  return (
    <>
      <h2 className="text-xl font-semibold tracking-tighter" >{title}</h2>

      <div className="space-y-4">

        <Controller
          control={form.control}
          name={`paymentDataStep.partpayment`}
          render={({ field }) => (
            <CompositionTextArea
              label="Descriçao do pagamento"
              value={field.value ?? ''}
              setValue={value => {
                field.onChange(value);
                form.trigger(`paymentDataStep.partpayment`);
              }}
            />
          )}
        />
      </div>
    </>
  )
}

