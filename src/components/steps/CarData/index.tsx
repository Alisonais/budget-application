import { FormData } from "@/AllSteps";
import { Input } from "@/components/Input";
import { StepHeader } from "@/components/StepHeader";
import { StepperFoter, StepperNextButton, StepperPreviousButton } from "@/components/Stepper";
import { useStepper } from "@/components/Stepper/useStepper";
import { Label } from "@radix-ui/react-label";
import { useFormContext } from "react-hook-form";

export function CarData() {

  const { nextStep } = useStepper();
  const form = useFormContext<FormData>();

  function toUpperCase(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  async function handlenextStep() {
    const isValid = await form.trigger('carDataStep');
    if (isValid) {
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

          <div className="space-y-2" >
            <Label htmlFor="model" >
              Modelo
            </Label>
            <Input id="model" {...form.register('carDataStep.model', {
              onChange: (value) => (
                value.target.value = toUpperCase(value.target.value)
              )
            }
            )} />
            {form.formState.errors.carDataStep?.model?.message && (
              <small className="text-destructive" >
                {form.formState.errors.carDataStep.model.message}
              </small>
            )}
          </div>

          <div className="space-y-2" >
            <Label htmlFor="brand" >
              Marca
            </Label>
            <Input id="brand" {...form.register('carDataStep.brand', {
              onChange: (value) => (
                value.target.value = toUpperCase(value.target.value)
              )
            }
            )} />
            {form.formState.errors.carDataStep?.brand?.message && (
              <small className="text-destructive" >
                {form.formState.errors.carDataStep.brand.message}
              </small>
            )}
          </div>



          <div className="space-y-2" >
            <Label htmlFor="plate" >
              Placa
            </Label>
            <Input id="plate" {...form.register('carDataStep.plate')} />
            {form.formState.errors.carDataStep?.plate?.message && (
              <small className="text-destructive" >
                {form.formState.errors.carDataStep.plate.message}
              </small>
            )}
          </div>

          <div className="space-y-2" >
            <Label htmlFor="year" >
              Ano
            </Label>
            <Input id="year" type="number" {...form.register('carDataStep.year',
              { setValueAs: value => value > 0 ? Number(value) : null}
            )}
            />
            {form.formState.errors.carDataStep?.year?.message && (
              <small className="text-destructive" >
                {form.formState.errors.carDataStep.year.message}
              </small>
            )}
          </div>

          <div className="space-y-2" >
            <Label htmlFor="color" >
              Cor
            </Label>
            <Input id="color" {...form.register('carDataStep.color', {
              onChange: (value) => (
                value.target.value = toUpperCase(value.target.value)
              )
            }
            )} />
            {form.formState.errors.carDataStep?.color?.message && (
              <small className="text-destructive" >
                {form.formState.errors.carDataStep.color.message}
              </small>
            )}
          </div>

        </div>

        <StepperFoter>
          <StepperPreviousButton />
          <StepperNextButton onClick={handlenextStep} />
        </StepperFoter>
      </div>
  );
}
