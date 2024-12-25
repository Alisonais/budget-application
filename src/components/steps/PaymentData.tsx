import { PayInput } from '../PayInput';
import { StepHeader } from "../StepHeader";
import { StepperFoter, StepperNextButton, StepperPreviousButton } from "../Stepper";
import { useStepper } from '../Stepper/useStepper';
import { SubTotal } from "../SubTotal";

export function PaymentData() {
  const { nextStep } = useStepper();

  function handleNextStep() {
    nextStep();
  };

  return (
        <div>
        <StepHeader
          title="Dados de Pagamento"
          description="Insira como será o Pagamento"
        />

        <PayInput />

        <SubTotal />

        <StepperFoter>
          <StepperPreviousButton />
          <StepperNextButton onClick={handleNextStep} />
        </StepperFoter>
      </div>
  );
}
