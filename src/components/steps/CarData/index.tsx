
import { CarDataInput } from "@/components/CarDataInput";
import { StepHeader } from "@/components/StepHeader";
import { StepperFoter, StepperNextButton, StepperPreviousButton } from "@/components/Stepper";
import { useStepper } from "@/components/Stepper/useStepper";
import { carInputTypes } from "@/components/types/carDataTypes";
import { FormData } from "@/pages/AllSteps";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export function CarData() {

  const { nextStep } = useStepper();
  const form = useFormContext<FormData>();

  useEffect(()=> {
    localStorage.setItem('formValues', JSON.stringify(form.getValues()));
  }, []);

  async function handlenextStep() {
    const isValid = await form.trigger('carDataStep');
    if (isValid) {
      localStorage.setItem('formValues', JSON.stringify(form.getValues()));
      nextStep();
    };
  };
  return (
        <div>
        <StepHeader
          title="Dados do veiculo"
          description="Insira os dados do Veiculo"
        />

        <div className="grid grid-cols-2 gap-2" >

          {carInputTypes.map((item) => (
            <CarDataInput id={item.id} label={item.label} type={item.type} key={item.id} />
          ))}

        </div>

        <StepperFoter>
          <StepperPreviousButton />
          <StepperNextButton onClick={handlenextStep} />
        </StepperFoter>
      </div>
  );
}
