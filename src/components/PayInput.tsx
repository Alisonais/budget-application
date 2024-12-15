import { safeSessionStorageGetItem } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "./Label";
import { Textarea } from "./textarea";

const schema = z.object({
  onTimePay: z.string(),
  creditPay: z.string()
});

export type FormDataPayment = z.infer<typeof schema>;

export function PayInput() {

  const initialvalue = safeSessionStorageGetItem<FormDataPayment>('pay-format');

  const form = useForm<FormDataPayment>({
    defaultValues: {
      onTimePay: initialvalue?.onTimePay ?? '',
      creditPay: initialvalue?.creditPay ?? '',
    }
  });

  return (
    <div className="flex flex-col gap-4" >
      <div>
        <div className="space-x-2" >
          <Label htmlFor="onTimePay" >
            Pagamento á Vista
          </Label>
        </div>
        <Textarea id="onTimePay" placeholder="desceva a forma de pagamento" {...form.register('onTimePay', {
          onBlur: () => {
            sessionStorage.setItem('pay-format', JSON.stringify(form.getValues()));
          },
        })} />
      </div>

      <div>
        <div className="space-x-2">
          <Label htmlFor="creditPay" >
            Pagamento via Cartão
          </Label>
        </div>
        <Textarea id="creditPay" placeholder="desceva a forma de pagamento" {...form.register('creditPay', {
          onBlur: () => {
            sessionStorage.setItem('pay-format', JSON.stringify(form.getValues()));
          }
        })} />
      </div>
    </div>
  );
};
