import { FormData } from "@/AllSteps";
import { Label } from "@radix-ui/react-label";
import { useFormContext } from "react-hook-form";
import { Textarea } from "../textarea";

export function PayInput() {

  const form = useFormContext<FormData>();

  return (
    <div className="flex flex-col gap-4" >
      <div>
        <div className="space-x-2" >
          <Label htmlFor="onTimePay" >
            Pagamento á Vista
          </Label>
        </div>
        <Textarea id="onTimePay" placeholder="desceva a forma de pagamento" {...form.register('paymentDataStep.onTimePay', {
          onBlur: (e)=> {
            form.setValue('paymentDataStep.onTimePay', e.target.value)
          }
        })} />
      </div>

      <div>
        <div className="space-x-2">
          <Label htmlFor="creditPay" >
            Pagamento via Cartão
          </Label>
        </div>
        <Textarea id="creditPay" placeholder="desceva a forma de pagamento" {...form.register('paymentDataStep.creditPay', {
          onBlur: (e)=> {
            form.setValue('paymentDataStep.creditPay', e.target.value)
          }})} />
      </div>
    </div>
  );
};
