import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { PaymentStepSchema } from "./components/PayInput/schema";
import { Stepper } from "./components/Stepper";
import { BudgetData } from "./components/steps/BudgetData";
import { budgetStepSchema } from "./components/steps/BudgetData/schema";
import { CarData } from "./components/steps/CarData";
import { carStepSchema } from "./components/steps/CarData/schema";
import { PaymentData } from "./components/steps/PaymentData";
import { PersonalData } from "./components/steps/PersonalData";
import { personalStepSchema } from "./components/steps/PersonalData/schema";
import { Review } from "./components/steps/Review";
import { subTotalDataSchema } from "./components/SubTotal/schema";
import { safeSessionStorageGetItem } from "./lib/utils";

const schema = z.object({
  personalDataStep: personalStepSchema,
  carDataStep: carStepSchema,
  budgetDataStep: budgetStepSchema,
  subTotalData: subTotalDataSchema,
  paymentDataStep: PaymentStepSchema,

});


export type FormData = z.infer<typeof schema>;

export function AllSteps() {

  const initialvalue = safeSessionStorageGetItem<FormData>('formValues');

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      personalDataStep: {
        name: initialvalue?.personalDataStep.name ?? '',
        phone: initialvalue?.personalDataStep.phone ?? '',
        adress: initialvalue?.personalDataStep.adress ?? '',
        neighborhood: initialvalue?.personalDataStep.neighborhood ?? '',
        city: initialvalue?.personalDataStep.city ?? ''
      },
      carDataStep: {
        model: initialvalue?.carDataStep.model ?? '',
        brand: initialvalue?.carDataStep.brand ?? '',
        plate: initialvalue?.carDataStep.plate ?? '',
        year: initialvalue?.carDataStep.year ?? undefined,
        color: initialvalue?.carDataStep.color ?? ''
      },
      budgetDataStep: {
        description: initialvalue?.budgetDataStep.description ?? '',
        LaborCost: initialvalue?.budgetDataStep?.LaborCost.map((item) => ({
          carPart: item.carPart ?? '',
          price: item.price ?? null,
        })),
        PartCost: initialvalue?.budgetDataStep.PartCost.map((item) => ({
          carPartChange: item.carPartChange ?? '',
          priceChange: item.priceChange ?? undefined,
        })),
      },
      subTotalData: {
        laborPrice: initialvalue?.subTotalData.laborPrice ?? 0,
        partPrice: initialvalue?.subTotalData.partPrice ?? 0,
        totalValue: initialvalue?.subTotalData.totalValue ?? 0,
      },
      paymentDataStep: {
        onTimePay: initialvalue?.paymentDataStep.onTimePay ?? '',
        creditPay: initialvalue?.paymentDataStep.creditPay ?? '',
      }
    }
  });

  return (

      <div className="w-full flex justify-center items-center p-4 pt-20" >
      <FormProvider {...form}>
          <form >
            <Stepper
              steps={[
                {
                  label: 'Cliente',
                  content: <PersonalData />
                },
                {
                  label: 'Veiculo',
                  content: <CarData />
                },
                {
                  label: 'Orçamento',
                  content: <BudgetData />
                },
                {
                  label: 'Pagamento',
                  content: <PaymentData />
                },
                {
                  label: 'Revisar',
                  content: <Review />
                },
              ]}
            />
          </form>
      </FormProvider>
    </div>
  );
}
