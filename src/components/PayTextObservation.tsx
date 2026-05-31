import { FormData } from "@/pages/AllSteps";
import { Label } from "@radix-ui/react-label";
import { useFormContext } from "react-hook-form";
import { Textarea } from "./textarea";

type PayTextObservationProps = {
  label: 'Pagamento das Peças' | 'Pagamento da Mão de Obra';
  id: 'partpayment' | 'creditPay';
  placeHolder?: string;
  formToRegister: 'paymentDataStep.partpayment' | 'paymentDataStep.laborpayment';
}

export function PayTextObservation({
  label,
  id,
  placeHolder = "Descreva a forma de pagamento",
  formToRegister,
}: PayTextObservationProps) {

  const form = useFormContext<FormData>();

  return (
    <div>
      <div className="space-x-2" >
        <Label htmlFor={id} >
          {label}
        </Label>
      </div>
      <Textarea id={id} placeholder={placeHolder} {...form.register(formToRegister, {
        onBlur: (e) => {
          form.setValue(formToRegister, e.target.value)
        }
      })} />
    </div>
  )
}
