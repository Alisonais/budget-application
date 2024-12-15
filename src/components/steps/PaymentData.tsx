import { PayInput } from '../PayInput';
import { StepHeader } from "../StepHeader";
import { StepperFoter, StepperNextButton, StepperPreviousButton } from "../Stepper";
import { SubTotal } from "../SubTotal";

export function PaymentData() {
  return (
    <div>
      <StepHeader
        title="Dados de Pagamento"
        description="Insira como será o Pagamento"
      />

      <PayInput />

      <SubTotal />

      <StepperFoter>
        <StepperPreviousButton type='button' />
        <StepperNextButton
          type='button'
        />
      </StepperFoter>
    </div>
  );
}
