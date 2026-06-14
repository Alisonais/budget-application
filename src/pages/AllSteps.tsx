import { PaymentStepSchema } from "@/components/PayInput/schema";
import { Stepper } from "@/components/Stepper";
import { BudgetData } from "@/components/steps/BudgetData";
import { budgetStepSchema } from "@/components/steps/BudgetData/schema";
import { CarData } from "@/components/steps/CarData";
import { carStepSchema } from "@/components/steps/CarData/schema";
import { PaymentData } from "@/components/steps/PaymentData";
import { PersonalData } from "@/components/steps/PersonalData";
import { personalStepSchema } from "@/components/steps/PersonalData/schema";
import { Review } from "@/components/steps/Review";
import { subTotalDataSchema } from "@/components/SubTotal/schema";
import { initialValues } from "@/utils/initialValues";
import { safelocalStorageGetItem } from "@/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from 'motion/react';
import { FormProvider, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { z } from "zod";


const schema = z.object({
  personalDataStep: personalStepSchema,
  carDataStep: carStepSchema,
  budgetDataStep: budgetStepSchema,
  subTotalData: subTotalDataSchema,
  paymentDataStep: PaymentStepSchema,
  id: z.string(),
  status: z.enum(['APROVADO', 'PENDENTE']),
  createdAt: z.date()
});

export type FormData = z.infer<typeof schema>;

export function AllSteps() {
  const location = useLocation();
  location.state && localStorage.setItem('formValues', JSON.stringify(location.state));
  const initialvalue = safelocalStorageGetItem('formValues') as any;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialValues(initialvalue),
  });

  return (

    <AnimatePresence mode="popLayout">
      <div className="w-full flex justify-center items-center p-4 pt-20">
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
    </AnimatePresence>
  );
}
