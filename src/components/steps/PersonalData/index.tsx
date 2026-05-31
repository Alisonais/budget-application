import { PersonalDataInput } from "@/components/PersonalDataInput";
import { StepHeader } from "@/components/StepHeader";
import { StepperFoter, StepperNextButton } from "@/components/Stepper";
import { useStepper } from "@/components/Stepper/useStepper";
import { personalInputTypes } from "@/components/types/personalDataTypes";
import type { FormData } from '@/pages/AllSteps';
import { useFormContext } from "react-hook-form";

export function PersonalData() {

  const { nextStep } = useStepper();
  const form = useFormContext<FormData>();

  async function handleNextStep() {
    const isValid = await form.trigger('personalDataStep');
    if (isValid) {
      localStorage.setItem('formValues', JSON.stringify(form.getValues()));
      nextStep();
    };
  };

  return (

    <div>
      <div>
        <StepHeader
          title="Dados do Cliente"
          description="Insira os dados do Cliente"
        />

        <div className="space-y-2" >
          {
            personalInputTypes.map((item) => (
              <PersonalDataInput key={item.id} id={item.id} label={item.label} type={item.type} />
            ))
          }
        </div>

        <StepperFoter>
          <StepperNextButton onClick={handleNextStep} />
        </StepperFoter>
      </div>
    </div>
  );
};

