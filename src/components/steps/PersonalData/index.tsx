import type { FormData } from '@/AllSteps';
import { Input } from "@/components/Input";
import { StepHeader } from "@/components/StepHeader";
import { StepperFoter, StepperNextButton } from "@/components/Stepper";
import { useStepper } from "@/components/Stepper/useStepper";
import { Label } from "@radix-ui/react-label";
import { useFormContext } from "react-hook-form";

export function PersonalData() {

  const { nextStep } = useStepper();
  const form = useFormContext<FormData>();

  function formatName(string: string) {
    return string.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, (l: any) => l.toUpperCase());
  };

  async function handleNextStep() {
    const isValid = await form.trigger('personalDataStep');
    if (isValid) {
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
            <div className="space-y-2" >
              <Label htmlFor="name" >
                Nome
              </Label>
              <Input id="name" {...form.register('personalDataStep.name', {
                onChange: ((value => (
                  value.target.value = formatName(value.target.value)
                )))
              })} />
              {form.formState.errors.personalDataStep?.name?.message && (
                <small className="text-destructive" >
                  {form.formState.errors.personalDataStep.name.message}
                </small>
              )}
            </div>

            <div className="space-y-2" >
              <Label htmlFor="phone" >
                Telefone
              </Label>
              <Input id="phone" type="tel" {...form.register('personalDataStep.phone')} />
              {form.formState.errors.personalDataStep?.phone?.message && (
                <small className="text-destructive" >
                  {form.formState.errors.personalDataStep.phone.message}
                </small>
              )}
            </div>

            <div className="space-y-2" >
              <Label htmlFor="adress" >
                Endereço
              </Label>
              <Input id="adress" {...form.register('personalDataStep.adress', {
                onChange: (value) => (
                  value.target.value = formatName(value.target.value)
                )
              })} />
              {form.formState.errors.personalDataStep?.adress?.message && (
                <small className="text-destructive" >
                  {form.formState.errors.personalDataStep.adress.message}
                </small>
              )}
            </div>

            <div className="space-y-2" >
              <Label htmlFor="neighborhood" >
                Bairro
              </Label>
              <Input id="neighborhood" {...form.register('personalDataStep.neighborhood', {
                onChange: (value) => (
                  value.target.value = formatName(value.target.value)
                )
              })} />
              {form.formState.errors.personalDataStep?.neighborhood?.message && (
                <small className="text-destructive" >
                  {form.formState.errors.personalDataStep.neighborhood.message}
                </small>
              )}
            </div>

            <div className="space-y-2" >
              <Label htmlFor="city" >
                Cidade
              </Label>
              <Input id="city" {...form.register('personalDataStep.city', {
                onChange: (value) => (
                  value.target.value = formatName(value.target.value)
                )
              })} />
              {form.formState.errors.personalDataStep?.city?.message && (
                <small className="text-destructive" >
                  {form.formState.errors.personalDataStep.city.message}
                </small>
              )}
            </div>
          </div>

          <StepperFoter>
            <StepperNextButton onClick={handleNextStep} />
          </StepperFoter>
        </div>
    </div>
  );
};
