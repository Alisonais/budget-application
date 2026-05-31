import { FormData } from '@/pages/AllSteps';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { BudgetLaborPaymentData } from '../BudgetLaborPaymentData';
import { BudgetPartPaymentData } from '../BudgetPartPaymentData';
import { StepHeader } from "../StepHeader";
import { StepperFoter, StepperNextButton, StepperPreviousButton } from "../Stepper";
import { useStepper } from '../Stepper/useStepper';
import { SubTotal } from "../SubTotal";

export function PaymentData() {
  const { nextStep } = useStepper();

  const form = useFormContext<FormData>();
  const paymentLaborItem = useFieldArray({
    control: form.control,
    name: 'paymentDataStep.laborpayment',
  });


  function handleNextStep() {
    localStorage.setItem('formValues', JSON.stringify(form.getValues()));
    nextStep();
  };

  return (
    <div>
      <StepHeader
        title="Dados de Pagamento"
        description="Insira como será o Pagamento"
      />

      <BudgetPartPaymentData
      form={form}
      title='Forma de pagamento peças'
     />

      <BudgetLaborPaymentData
        budgetItem={paymentLaborItem}
        form={form}
        title='Forma de pagamento mão de obra'
      />



      <SubTotal />

      <StepperFoter>
        <StepperPreviousButton />
        <StepperNextButton onClick={handleNextStep} />
      </StepperFoter>
    </div>
  );
}
